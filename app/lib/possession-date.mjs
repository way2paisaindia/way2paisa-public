// PostgreSQL date-only values (YYYY-MM-DD) are not parsed by the display
// formatter that handles descriptive RERA/DLD text. Format them as *targets*,
// not as confirmation that a project has handed over or obtained an OC.
export function formatStoredIsoPossession(value) {
  const raw = String(value ?? '').trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())
    || date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day) return null;

  const monthYear = new Intl.DateTimeFormat('en-GB', {
    month: 'short', year: 'numeric', timeZone: 'UTC'
  }).format(date);
  return `Registered target ${monthYear} · Reconfirm current approvals`;
}
