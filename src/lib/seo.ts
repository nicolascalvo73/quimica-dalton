import { LOCATIONS, SITE } from '../data/site';
import { toOpeningHoursSpec } from './hours';

/** JSON-LD: una entidad por sede, con horarios y (para Centro) valoración de Google. */
export const buildStructuredData = (siteUrl: string) =>
  LOCATIONS.map((loc) => ({
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${siteUrl}#${loc.id}`,
    name: `${SITE.name} — ${loc.name}`,
    description: SITE.description,
    url: siteUrl,
    telephone: loc.phoneHref,
    email: SITE.email,
    foundingDate: String(SITE.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: 'Córdoba',
      addressRegion: 'Córdoba',
      postalCode: loc.postalCode,
      addressCountry: 'AR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: loc.coords.lat, longitude: loc.coords.lng },
    openingHoursSpecification: toOpeningHoursSpec(loc.schedule),
    sameAs: [SITE.instagram, SITE.facebook],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: loc.googleRating.value,
      reviewCount: loc.googleRating.count,
    },
  }));
