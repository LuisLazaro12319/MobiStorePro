import { TradeInOption } from '../types';

export const tradeInOptions: TradeInOption[] = [
  // Apple
  { brand: 'Apple', model: 'iPhone 15 Pro Max (256GB / 512GB)', baseValuation: 1650000 },
  { brand: 'Apple', model: 'iPhone 15 Pro (128GB / 256GB)', baseValuation: 1380000 },
  { brand: 'Apple', model: 'iPhone 15 Plus (128GB / 256GB)', baseValuation: 1050000 },
  { brand: 'Apple', model: 'iPhone 15 (128GB / 256GB)', baseValuation: 920000 },
  { brand: 'Apple', model: 'iPhone 14 Pro Max (128GB / 256GB)', baseValuation: 1150000 },
  { brand: 'Apple', model: 'iPhone 14 Pro (128GB / 256GB)', baseValuation: 980000 },
  { brand: 'Apple', model: 'iPhone 14 Plus / 14 (128GB)', baseValuation: 760000 },
  { brand: 'Apple', model: 'iPhone 13 Pro Max (128GB)', baseValuation: 850000 },
  { brand: 'Apple', model: 'iPhone 13 Pro (128GB)', baseValuation: 720000 },
  { brand: 'Apple', model: 'iPhone 13 (128GB)', baseValuation: 600000 },
  { brand: 'Apple', model: 'iPhone 12 Pro / Pro Max', baseValuation: 520000 },
  { brand: 'Apple', model: 'iPhone 12 (64GB / 128GB)', baseValuation: 410000 },
  { brand: 'Apple', model: 'iPhone 11 (64GB / 128GB)', baseValuation: 320000 },

  // Samsung
  { brand: 'Samsung', model: 'Samsung Galaxy S24 Ultra (256GB / 512GB)', baseValuation: 1550000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S24+ / S24 (256GB)', baseValuation: 1100000 },
  { brand: 'Samsung', model: 'Samsung Galaxy Z Fold 5 / Z Flip 5', baseValuation: 1250000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S23 Ultra (256GB)', baseValuation: 1080000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S23+ / S23 (128GB/256GB)', baseValuation: 820000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S22 Ultra (256GB)', baseValuation: 700000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S22 / S22+ (128GB)', baseValuation: 520000 },
  { brand: 'Samsung', model: 'Samsung Galaxy S21 FE / S21 Ultra', baseValuation: 420000 },
  { brand: 'Samsung', model: 'Samsung Galaxy A55 5G / A54 5G', baseValuation: 320000 },

  // Motorola
  { brand: 'Motorola', model: 'Motorola Razr 40 Ultra (Plegable)', baseValuation: 950000 },
  { brand: 'Motorola', model: 'Motorola Edge 40 Pro (256GB)', baseValuation: 780000 },
  { brand: 'Motorola', model: 'Motorola Edge 50 Pro (256GB)', baseValuation: 850000 },
  { brand: 'Motorola', model: 'Motorola Edge 40 Neo / Edge 40', baseValuation: 480000 },
  { brand: 'Motorola', model: 'Motorola Edge 30 Ultra / Fusion', baseValuation: 490000 },
  { brand: 'Motorola', model: 'Motorola Moto G84 5G / G73', baseValuation: 280000 },

  // Xiaomi & Google
  { brand: 'Xiaomi', model: 'Xiaomi 14 Ultra / 13 Ultra (512GB)', baseValuation: 1350000 },
  { brand: 'Xiaomi', model: 'Xiaomi 13T Pro / 14 (256GB)', baseValuation: 820000 },
  { brand: 'Xiaomi', model: 'POCO F5 Pro / F5 / X6 Pro', baseValuation: 490000 },
  { brand: 'Google', model: 'Google Pixel 8 Pro (128GB/256GB)', baseValuation: 1020000 },
  { brand: 'Google', model: 'Google Pixel 8 / 7 Pro', baseValuation: 680000 }
];

export const conditionMultipliers = [
  {
    id: 'excellent',
    label: 'Impecable (Como Nuevo)',
    desc: 'Sin rayas, batería > 85%, pantalla original intacta y accesorios',
    multiplier: 1.0
  },
  {
    id: 'good',
    label: 'Muy Bueno (Marcas Leves)',
    desc: 'Detalles mínimos de uso estético en bordes, 100% funcional',
    multiplier: 0.88
  },
  {
    id: 'regular',
    label: 'Desgaste Regular',
    desc: 'Marcas visibles de uso o desgaste de batería, pantalla sin roturas',
    multiplier: 0.72
  }
];
