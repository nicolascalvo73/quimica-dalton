import { STORE } from '../data/site';

/** Prefija rutas internas con `base` (GitHub Pages sirve bajo /quimica-dalton). */
export const withBase = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/** Enlace a la tienda; hasta que exista, cae a un ancla de la landing. */
export const storeHref = (path = '') =>
  STORE.url ? `${STORE.url}${path}` : STORE.fallbackAnchor;

export const isStoreLive = () => STORE.url !== null;
