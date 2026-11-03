// Project-site appointments use the project's local calendar, not the
// visitor's device time zone. Formatting from parts avoids locale-specific
// MM/DD/YYYY vs YYYY-MM-DD ambiguities.
export function projectLocalDate(timeZone, at = new Date()) {
  const zone = timeZone === 'Asia/Dubai' ? 'Asia/Dubai' : 'Asia/Kolkata';
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(at);
  const values = Object.fromEntries(parts.map(({type, value}) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function addCalendarDays(date, days) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

// The direct enquiry form allows today, while the dedicated appointment
// form starts tomorrow. Both stop at a 60-day booking horizon.
export function appointmentDateBounds(timeZone, startTomorrow = false) {
  const today = projectLocalDate(timeZone);
  return {min: addCalendarDays(today, startTomorrow ? 1 : 0),
    max: addCalendarDays(today, 60)};
}

// Use the same project time zone to prevent offering same-day slots that
// have already passed. This helper supports both 24-hour and am/pm form values.
export function isFutureAppointmentSlot(date, time, timeZone, at = new Date()) {
  if (!date || !time) return false;
  const today = projectLocalDate(timeZone, at);
  if (date > today) return true;
  if (date < today) return false;
  const match = /^(\d{1,2}):([0-5]\d)(?:\s*(am|pm))?$/i.exec(String(time));
  if (!match) return false;
  let hour = Number(match[1]);
  if (match[3]) {
    if (hour < 1 || hour > 12) return false;
    hour = hour % 12 + (match[3].toLowerCase() === 'pm' ? 12 : 0);
  } else if (hour > 23) return false;
  const selectedMinutes = hour * 60 + Number(match[2]);
  const zone = timeZone === 'Asia/Dubai' ? 'Asia/Dubai' : 'Asia/Kolkata';
  const nowParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, hourCycle: 'h23', hour: '2-digit', minute: '2-digit'
  }).formatToParts(at);
  const current = Object.fromEntries(nowParts.map(({type, value}) => [type, value]));
  const currentMinutes = Number(current.hour) * 60 + Number(current.minute);
  return selectedMinutes > currentMinutes;
}
