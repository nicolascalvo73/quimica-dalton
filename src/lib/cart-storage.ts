import { parseCart, type CartItem } from './cart';

const KEY = 'qd-cart-v1';

// localStorage puede no existir o lanzar (modo privado, datos bloqueados): el carrito sigue andando en memoria.
export const loadCart = (): CartItem[] => {
  try {
    return parseCart(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* sin persistencia */
  }
};

export const CART_STORAGE_KEY = KEY;
