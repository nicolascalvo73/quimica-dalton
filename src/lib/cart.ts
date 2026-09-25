export interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  qty: number;
}

export const MAX_QTY = 99;

const clamp = (qty: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));

/** Suma `qty` unidades; si el producto ya está, incrementa su cantidad. */
export const addItem = (items: CartItem[], item: Omit<CartItem, 'qty'>, qty = 1): CartItem[] => {
  const existing = items.find((i) => i.id === item.id);
  if (!existing) return [...items, { ...item, qty: clamp(qty) }];
  return items.map((i) => (i.id === item.id ? { ...i, qty: clamp(i.qty + qty) } : i));
};

/** Fija la cantidad; con 0 o menos quita el producto. */
export const setQty = (items: CartItem[], id: string, qty: number): CartItem[] =>
  clamp(qty) === 0 ? removeItem(items, id) : items.map((i) => (i.id === id ? { ...i, qty: clamp(qty) } : i));

export const removeItem = (items: CartItem[], id: string): CartItem[] => items.filter((i) => i.id !== id);

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.qty, 0);

export const cartTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);

/** Valida lo leído de localStorage: descarta cualquier entrada con forma inesperada. */
export const parseCart = (raw: unknown): CartItem[] => {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((r) => {
    const ok =
      r && typeof r.id === 'string' && typeof r.name === 'string' && typeof r.unit === 'string' &&
      typeof r.image === 'string' && Number.isFinite(r.price) && r.price >= 0 && Number.isInteger(r.qty) && r.qty > 0;
    return ok ? [{ id: r.id, name: r.name, price: r.price, unit: r.unit, image: r.image, qty: clamp(r.qty) }] : [];
  });
};

/** Texto del pedido para enviar por WhatsApp. */
export const buildOrderMessage = (items: CartItem[], branchName: string, formatPrice: (n: number) => string) => {
  const lines = items.map((i) => `• ${i.qty} x ${i.name} (${i.unit}) — ${formatPrice(i.price * i.qty)}`);
  return [
    `Hola Química Dalton (${branchName}), quiero hacer este pedido:`,
    '',
    ...lines,
    '',
    `Total estimado: ${formatPrice(cartTotal(items))}`,
    'Necesito confirmar stock, precio final y forma de entrega.',
  ].join('\n');
};
