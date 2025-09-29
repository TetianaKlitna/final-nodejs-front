import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export function dateInputToUtc(dateStr: string): string {
  if (!dateStr) return '';
  const timezone = getClientTimeZone();
  const utcDate = fromZonedTime(dateStr + 'T00:00:00', timezone);
  return utcDate.toISOString();
}

export function utcToDateInput(iso: string): string {
  if (!iso) return '';
  const timezone = getClientTimeZone();
  const zoned = toZonedTime(iso, timezone);
  return format(zoned, 'yyyy-MM-dd');
}

export function getClientTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
