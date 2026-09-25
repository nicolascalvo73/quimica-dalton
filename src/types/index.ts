export type TimeRange = [start: string, end: string]; // "HH:MM"
/** 0 = domingo … 6 = sábado. Un día ausente o con lista vacía = cerrado. */
export type Schedule = Partial<Record<number, TimeRange[]>>;

export interface Location {
  id: 'fabrica' | 'centro';
  name: string;
  role: string;
  street: string;
  locality: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
  whatsapp: string; // formato internacional sin "+", ej. 5493515298887
  whatsappLabel: string;
  coords: { lat: number; lng: number };
  schedule: Schedule;
  googleRating: { value: number; count: number };
}

export interface ProductLine {
  id: string;
  name: string;
  tagline: string;
  examples: string[];
  color: string;
  icon: IconName;
}

export interface Product {
  id: string;
  name: string;
  lineId: string;
  description: string;
  image: string; // nombre de archivo en src/assets/images
  imageAlt: string;
  /** Precio ficticio (ARS), sólo para la propuesta. */
  price: number;
  price_is_placeholder: true;
  unit: string;
  badge?: string;
  featured: boolean;
}

export type IconName =
  | 'whatsapp' | 'phone' | 'pin' | 'clock' | 'mail' | 'arrow' | 'check' | 'menu' | 'close'
  | 'factory' | 'drop' | 'spray' | 'car' | 'flask' | 'tank' | 'box' | 'truck' | 'shield' | 'users' | 'star'
  | 'instagram' | 'facebook';
