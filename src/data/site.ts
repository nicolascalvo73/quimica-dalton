import type { Location } from '../types';

export const SITE = {
  name: 'Química Dalton',
  legalTagline: 'Fábrica de productos químicos',
  foundedYear: 1978,
  city: 'Córdoba',
  title: 'Química Dalton | Fábrica de productos químicos en Córdoba desde 1978',
  description:
    'Fabricamos productos químicos industriales, de limpieza, para piscinas y cosmética del automotor en Córdoba desde 1978. Droguería industrial, Descamiva y más de 1000 productos. Pedí tu presupuesto por WhatsApp.',
  email: 'info@quimicadalton.com',
  instagram: 'https://www.instagram.com/quimicadaltoncba',
  instagramHandle: '@quimicadaltoncba',
  facebook: 'https://www.facebook.com/quimicadalton',
  descamivaForum: 'https://www.descamiva.com.ar',
  instagramFollowers: '88K',
  productCount: '+1000',
  promo: { day: 'martes', label: 'Martes 10% de descuento' },
} as const;

/**
 * Tienda Nube: demo reutilizable "Valmō", reskineada con marca de Química Dalton.
 * Sin "www": ese subdominio tiene un error de SSL propio de Tiendanube (ver README).
 */
export const STORE = {
  url: 'https://valmo.mitiendanube.com' as string | null,
  fallbackAnchor: '#destacados',
};

const WEEKDAYS: [number, number] = [1, 5];
const range = (from: number, to: number, value: [string, string][]) =>
  Object.fromEntries(Array.from({ length: to - from + 1 }, (_, i) => [from + i, value]));

// Fuente: Google Maps, 2026-09-25
export const LOCATIONS: Location[] = [
  {
    id: 'fabrica',
    name: 'Casa central y fábrica',
    role: 'Administración, depósito y fábrica',
    street: 'Leopoldo A. Casavega 3089',
    locality: 'Villa Aspasia, Córdoba',
    postalCode: '5011',
    phone: '351 894-9853',
    phoneHref: '+543518949853',
    whatsapp: '5493515557944',
    whatsappLabel: '351 555-7944',
    coords: { lat: -31.4441189, lng: -64.2510785 },
    schedule: {
      ...range(...WEEKDAYS, [['08:00', '13:00'], ['15:00', '18:00']]),
      6: [['09:00', '13:00']],
    },
    googleRating: { value: 4.0, count: 68 },
  },
  {
    id: 'centro',
    name: 'Sucursal Centro',
    role: 'Atención al público en el centro',
    street: 'Rivadavia 695',
    locality: 'esq. Libertad, Córdoba',
    postalCode: '5000',
    phone: '351 421-6691',
    phoneHref: '+543514216691',
    whatsapp: '5493515298887',
    whatsappLabel: '351 529-8887',
    coords: { lat: -31.4084579, lng: -64.1794569 },
    schedule: {
      ...range(...WEEKDAYS, [['08:30', '17:30']]),
      6: [['09:00', '13:00']],
    },
    googleRating: { value: 4.4, count: 1284 },
  },
];

/** WhatsApp por defecto de la web (botón flotante y CTAs generales). */
export const PRIMARY_LOCATION = LOCATIONS.find((l) => l.id === 'centro')!;
