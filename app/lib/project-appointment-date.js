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
