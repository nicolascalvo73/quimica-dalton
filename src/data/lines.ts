import type { ProductLine } from '../types';

export const PRODUCT_LINES: ProductLine[] = [
  { id: 'industrial', name: 'Industriales', tagline: 'Para planta, obra y mantenimiento.', examples: ['Desmoldante para hormigón', 'Desengrasantes', 'Tratamiento de agua para calderas'], color: '#0B5CAD', icon: 'factory' },
  { id: 'limpieza', name: 'Limpieza', tagline: 'Del hogar a la institución.', examples: ['Lavandinas y desinfectantes', 'Detergentes y jabones', 'Perfumes y suavizantes'], color: '#2FB36D', icon: 'spray' },
  { id: 'piscinas', name: 'Piscinas', tagline: 'Agua cristalina todo el año.', examples: ['Cloro granular', 'Alguicidas', 'Reguladores de pH'], color: '#1FA8D6', icon: 'drop' },
  { id: 'automotor', name: 'Cosmética del automotor', tagline: 'Cuidado y brillo para tu vehículo.', examples: ['Limpiamotores', 'Renovador de gomas', 'Abrillantador de vidrios'], color: '#E5484D', icon: 'car' },
  { id: 'drogueria', name: 'Droguería industrial', tagline: 'Materias primas y solventes.', examples: ['Soda cáustica', 'Alcohol etílico', 'Amoníaco y acetona'], color: '#6B4FBB', icon: 'flask' },
  { id: 'pozos', name: 'Pozos y cámaras sépticas', tagline: 'Descamiva y Daltonbac.', examples: ['Descamiva 20 kg', 'Daltonbac', 'Destapacañerías'], color: '#8A5A2B', icon: 'tank' },
];

export const lineById = (id: string) => PRODUCT_LINES.find((l) => l.id === id);
