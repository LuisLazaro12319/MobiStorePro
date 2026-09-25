import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import { CartItem, formatARS } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const transferDiscount = Math.round(subtotal * 0.10);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Tu Carrito</h2>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Tu carrito está vacío</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Agregá los mejores smartphones de Apple, Samsung, Motorola, Xiaomi o Google Pixel a tu pedido.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 py-2 px-4 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="py-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 border border-gray-100 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.storage} · {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-xs sm:text-sm text-blue-600 tabular-nums">
                        {formatARS(item.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="text-gray-600 hover:text-black font-bold p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="text-gray-600 hover:text-black font-bold p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-gray-50/80 space-y-3">
              {/* Free shipping pill */}
              <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200/60">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Envío Gratis Asegurado incluido en tu compra!</span>
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900 tabular-nums">{formatARS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Pago por Transferencia (10% OFF):</span>
                  <span className="font-bold tabular-nums">-{formatARS(transferDiscount)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm">
                  <span className="font-black text-gray-950">Total Final:</span>
                  <span className="text-xl font-black text-gray-950 tabular-nums">
                    {formatARS(subtotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <span>Iniciar Compra / Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={onClearCart}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                  <div className="flex items-center gap-1 text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compra 100% Protegida</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
