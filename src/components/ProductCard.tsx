import React, { useState } from 'react';
import { ShoppingBag, Cpu, Monitor, Camera, Battery, Sparkles, ArrowLeftRight, Check, Eye } from 'lucide-react';
import { Product, formatARS } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedStorage: string, selectedColor: string, calculatedPrice: number) => void;
  onSelectForCompare: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectForCompare,
  onOpenDetails,
}) => {
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const selectedStorage = product.storageOptions[selectedStorageIndex] || product.storageOptions[0];
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentPrice = product.basePrice + (selectedStorage?.priceAdd || 0);

  const handleAdd = () => {
    onAddToCart(product, selectedStorage.size, selectedColor.name, currentPrice);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const getBrandBadgeColor = (brand: string) => {
    switch (brand) {
      case 'Apple':
        return 'text-gray-900 bg-gray-100';
      case 'Samsung':
        return 'text-blue-700 bg-blue-50';
      case 'Motorola':
        return 'text-indigo-700 bg-indigo-50';
      case 'Xiaomi':
        return 'text-orange-700 bg-orange-50';
      case 'Google':
        return 'text-emerald-700 bg-emerald-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Bar with Tag and Brand info */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${getBrandBadgeColor(product.brand)}`}>
            {product.brand}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {product.category}
          </span>
        </div>

        {product.tag && (
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50/90 px-2 py-0.5 rounded-full border border-blue-200/60">
            {product.tag}
          </span>
        )}
      </div>

      {/* Image Container */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full pt-4 pb-2 px-6 h-56 flex items-center justify-center cursor-pointer overflow-hidden bg-gradient-to-b from-transparent to-gray-50/50"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full max-w-[85%] object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-gray-200 flex items-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ficha Técnica</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <div className="flex items-baseline justify-between gap-2">
            <h3
              onClick={() => onOpenDetails(product)}
              className="font-bold text-gray-900 text-base sm:text-lg hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
            >
              {product.name}
            </h3>
          </div>

          {/* AI Banner if enabled */}
          {product.aiReady && (
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-purple-700">
              <Sparkles className="w-3 h-3 text-purple-600 shrink-0" />
              <span className="truncate">{product.aiDetail.split(':')[0]}</span>
            </div>
          )}

          {/* Storage Options Pills (Interactive) */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-gray-400 mb-1.5 flex items-center justify-between">
              <span>ALMACENAMIENTO:</span>
              <span className="text-gray-600 font-bold">{selectedStorage.size}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.storageOptions.map((st, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setSelectedStorageIndex(sIdx)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedStorageIndex === sIdx
                      ? 'bg-gray-900 text-white shadow-xs ring-2 ring-gray-900/10'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {st.size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatches (Interactive) */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-gray-400 mb-1.5 flex items-center justify-between">
              <span>COLOR:</span>
              <span className="text-gray-600 font-medium">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c, cIdx) => (
                <button
                  key={cIdx}
                  type="button"
                  onClick={() => setSelectedColorIndex(cIdx)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                    selectedColorIndex === cIdx
                      ? 'scale-110 ring-2 ring-blue-600 ring-offset-2'
                      : 'hover:scale-105 border border-gray-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColorIndex === cIdx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specs Summary */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 truncate" title={product.chip}>
              <Cpu className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{product.chip}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={product.screen}>
              <Monitor className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{product.screen.split(' ')[0]} {product.screen.split(' ')[1] || ''}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={product.camera}>
              <Camera className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{product.camera.split('+')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={product.battery}>
              <Battery className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{product.battery}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-black text-gray-950 tabular-nums tracking-tight">
                {formatARS(currentPrice)}
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                10% OFF transf.
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              o 12 cuotas fijas de <strong className="text-gray-700 font-semibold">{formatARS(Math.round(currentPrice / 12 * 1.15))}</strong>
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAddedRecently}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-500/25 active:scale-98'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Añadido al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </>
              )}
            </button>

            {/* Compare Quick Action (Desktop only) */}
            <button
              type="button"
              onClick={() => onSelectForCompare(product)}
              title="Comparar con otro celular"
              className="hidden md:flex w-11 h-11 shrink-0 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
