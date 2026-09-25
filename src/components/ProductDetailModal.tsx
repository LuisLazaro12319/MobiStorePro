import React, { useState } from 'react';
import { X, ShoppingBag, Check, Sparkles, Cpu, Monitor, Camera, Battery, Shield, Box, Usb } from 'lucide-react';
import { Product, formatARS } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedStorage: string, selectedColor: string, calculatedPrice: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const selectedStorage = product.storageOptions[selectedStorageIndex] || product.storageOptions[0];
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentPrice = product.basePrice + (selectedStorage?.priceAdd || 0);

  const handleAdd = () => {
    onAddToCart(product, selectedStorage.size, selectedColor.name, currentPrice);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 border border-gray-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {product.brand} · {product.category}
            </span>
            {product.tag && (
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                {product.tag}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Top section: image + purchase options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="h-64 sm:h-72 w-full flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-[85%] object-contain"
              />
            </div>

            {/* Info & Config */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-gray-950 tracking-tight">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums">
                    {formatARS(currentPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    10% OFF transf.
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Envío gratis a todo el país o retiro inmediato en sucursal oficial.
                </p>
              </div>

              {/* Storage */}
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Memoria / Capacidad:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.storageOptions.map((st, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedStorageIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedStorageIndex === idx
                          ? 'bg-gray-950 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {st.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <span>Color:</span>
                  <span className="text-gray-900 font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                        selectedColorIndex === idx
                          ? 'scale-115 ring-2 ring-blue-600 ring-offset-2'
                          : 'border border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColorIndex === idx && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Technical Specifications */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
              Ficha Técnica Completa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Procesador & Chip</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.chipDetail}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Monitor className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pantalla & Visualización</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.screenDetail}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Camera className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Sistema de Cámaras</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.cameraDetail}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Battery className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Batería & Carga</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.batteryDetail}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Materiales & Resistencia</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.material} ({product.water})</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Inteligencia Artificial</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.aiDetail}</p>
              </div>
            </div>

            {/* In the Box */}
            {product.inTheBox && (
              <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <Box className="w-4 h-4 text-blue-600" />
                  <span>Contenido de la Caja Sellada:</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 pl-5 list-disc">
                  {product.inTheBox.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Purchase CTA */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-400 block font-semibold">Total a pagar:</span>
            <span className="text-xl sm:text-2xl font-black text-gray-950 tabular-nums">
              {formatARS(currentPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold cursor-pointer"
            >
              Volver
            </button>
            <button
              onClick={handleAdd}
              disabled={isAddedRecently}
              className={`py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
