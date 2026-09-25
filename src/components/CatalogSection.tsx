import React, { useState, useMemo } from 'react';
import { Product, ProductBrand, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, Smartphone, Check } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  selectedBrand: ProductBrand | 'all';
  onSelectBrand: (brand: ProductBrand | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (product: Product, selectedStorage: string, selectedColor: string, calculatedPrice: number) => void;
  onSelectForCompare: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onSelectForCompare,
  onOpenDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all' | 'ai'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const brands: { id: ProductBrand | 'all'; label: string; icon?: string }[] = [
    { id: 'all', label: 'Todos los Celulares' },
    { id: 'Apple', label: 'Apple iPhone' },
    { id: 'Samsung', label: 'Samsung Galaxy' },
    { id: 'Motorola', label: 'Motorola' },
    { id: 'Xiaomi', label: 'Xiaomi & POCO' },
    { id: 'Google', label: 'Google Pixel' },
  ];

  const categories: { id: ProductCategory | 'all' | 'ai'; label: string; icon?: boolean }[] = [
    { id: 'all', label: 'Todos los Modelos' },
    { id: 'Pro / Ultra', label: 'Gama Pro & Ultra' },
    { id: 'Gama Alta', label: 'Gama Alta' },
    { id: 'Plegables', label: 'Plegables' },
    { id: 'Calidad-Precio', label: 'Calidad-Precio' },
    { id: 'ai', label: 'Con Inteligencia Artificial', icon: true },
  ];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Brand
    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Category or AI
    if (selectedCategory === 'ai') {
      list = list.filter((p) => p.aiReady);
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.chip.toLowerCase().includes(q) ||
          p.camera.toLowerCase().includes(q) ||
          p.screen.toLowerCase().includes(q) ||
          p.verdict.toLowerCase().includes(q) ||
          p.aiDetail.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedBrand, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 mb-3">
          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
          <span>Equipos 100% Nuevos y Sellados</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Catálogo Multimarca de Alta Gama
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          iPhones originales, Samsung Galaxy Ultra, Motorola Edge, Xiaomi y Google Pixel con configuración a medida y garantía oficial.
        </p>
      </div>

      {/* Brand Selection Segmented Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 mb-6">
        {brands.map((b) => {
          const isActive = selectedBrand === b.id;
          const count = b.id === 'all'
            ? products.length
            : products.filter((p) => p.brand === b.id).length;

          return (
            <button
              key={b.id}
              onClick={() => onSelectBrand(b.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <span>{b.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Search, Category Filters, Sort */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-8 space-y-4">
        {/* Top row: search & sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por modelo, procesador (A19 Pro, Snapdragon 8 Elite), cámara..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 hover:bg-gray-100/70 focus:bg-white text-xs sm:text-sm text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-500">ORDEN:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-gray-800 rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="featured">Destacados & Novedades</option>
              <option value="price-asc">Menor Precio</option>
              <option value="price-desc">Mayor Precio</option>
              <option value="name">Alfabético (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Bottom row: Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
            CATEGORÍA:
          </span>
          {categories.map((c) => {
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.icon && <Sparkles className="w-3 h-3 text-amber-300" />}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Reset Filter banner */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-6 px-1">
        <span>
          Mostrando <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'celular disponible' : 'celulares disponibles'}
        </span>
        {(selectedBrand !== 'all' || selectedCategory !== 'all' || searchQuery.trim()) && (
          <button
            onClick={() => {
              onSelectBrand('all');
              setSelectedCategory('all');
              onSearchChange('');
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
          >
            Limpiar todos los filtros
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectForCompare={onSelectForCompare}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 max-w-lg mx-auto">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No encontramos coincidencias</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            No se encontraron celulares con el término &ldquo;{searchQuery}&rdquo;. Intentá buscar por otra marca o limpiar los filtros.
          </p>
          <button
            onClick={() => {
              onSelectBrand('all');
              setSelectedCategory('all');
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Restablecer Catálogo
          </button>
        </div>
      )}
    </section>
  );
};
