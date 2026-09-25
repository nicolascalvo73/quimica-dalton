import type { Schedule, TimeRange } from '../types';

const DAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAY_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const shortTime = (hhmm: string) => (hhmm.endsWith(':00') ? String(Number(hhmm.slice(0, 2))) : hhmm.replace(/^0/, ''));
const formatRanges = (ranges: TimeRange[]) =>
  ranges.map(([a, b]) => `${shortTime(a)} a ${shortTime(b)} hs`).join(' y ');
const key = (ranges: TimeRange[] = []) => ranges.map((r) => r.join('-')).join('|');

/** Agrupa días consecutivos con el mismo horario: "Lun a Vie · 8 a 13 hs y 15 a 18 hs". */
export const formatSchedule = (schedule: Schedule) => {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { days: string; hours: string }[] = [];
  let i = 0;
  while (i < order.length) {
    const start = order[i];
    let j = i;
    while (j + 1 < order.length && key(schedule[order[j + 1]]) === key(schedule[start])) j++;
    const ranges = schedule[start] ?? [];
    const days = i === j ? DAY_SHORT[start] : `${DAY_SHORT[start]} a ${DAY_SHORT[order[j]]}`;
    rows.push({ days, hours: ranges.length ? formatRanges(ranges) : 'Cerrado' });
    i = j + 1;
  }
  return rows;
};

/** Devuelve el estado "abierto ahora" para una fecha dada (hora de Córdoba, GMT-3). */
export const getOpenStatus = (schedule: Schedule, date: Date) => {
  const local = new Date(date.toLocaleString('en-US', { timeZone: 'America/Argentina/Cordoba' }));
  const minutes = local.getHours() * 60 + local.getMinutes();
  const today = schedule[local.getDay()] ?? [];
  const current = today.find(([a, b]) => minutes >= toMinutes(a) && minutes < toMinutes(b));
  if (current) return { open: true, text: `Abierto ahora · cierra a las ${shortTime(current[1])} hs` };
  const next = today.find(([a]) => minutes < toMinutes(a));
  if (next) return { open: false, text: `Cerrado · abre a las ${shortTime(next[0])} hs` };
  return { open: false, text: 'Cerrado ahora' };
};

export const toOpeningHoursSpec = (schedule: Schedule) =>
  Object.entries(schedule).flatMap(([day, ranges]) =>
    (ranges ?? []).map(([opens, closes]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_SCHEMA[Number(day)],
      opens,
      closes,
    })),
  );
