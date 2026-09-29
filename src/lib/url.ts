import { STORE } from '../data/site';

/** Prefija rutas internas con `base` (GitHub Pages sirve bajo /quimica-dalton). */
export const withBase = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Enlace a la tienda; hasta que exista, cae a un ancla de la landing.
 * Siempre apunta al listado general (`/productos`), nunca a una URL profunda:
 * los slugs de producto/categoría de Tiendanube se autogeneran del nombre en
 * español y no coinciden con los ids internos (`product.id`, `line.id`).
 */
export const storeHref = () => (STORE.url ? `${STORE.url}/productos` : STORE.fallbackAnchor);

export const isStoreLive = () => STORE.url !== null;
