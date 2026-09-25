export type ProductBrand = 'Apple' | 'Samsung' | 'Motorola' | 'Xiaomi' | 'Google';

export type ProductCategory = 'Pro / Ultra' | 'Gama Alta' | 'Plegables' | 'Calidad-Precio';

export interface StorageOption {
  size: string;
  priceAdd: number;
  ram?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  brand: ProductBrand;
  name: string;
  category: ProductCategory;
  tag?: string;
  chip: string;
  chipDetail: string;
  screen: string;
  screenDetail: string;
  camera: string;
  cameraDetail: string;
  battery: string;
  batteryDetail: string;
  video: string;
  material: string;
  connector: string;
  controls: string;
  aiReady: boolean;
  aiDetail: string;
  weight: string;
  water: string;
  verdict: string;
  basePrice: number;
  image: string;
  storageOptions: StorageOption[];
  colors: ColorOption[];
  warranty?: string;
  inTheBox?: string[];
}

export interface CartItem {
  cartItemId: string;
  productId: number;
  brand: ProductBrand;
  name: string;
  image: string;
  storage: string;
  color: string;
  price: number;
  quantity: number;
}

export interface TradeInOption {
  brand: ProductBrand | 'Otra';
  model: string;
  baseValuation: number;
}

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
}

