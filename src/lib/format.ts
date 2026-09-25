export const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

export const formatRating = (value: number) => value.toFixed(1).replace('.', ',');

export const formatCount = (value: number) => new Intl.NumberFormat('es-AR').format(value);
