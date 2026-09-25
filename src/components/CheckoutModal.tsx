import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Building2, CreditCard, ArrowRight, Smartphone, Copy } from 'lucide-react';
import { CartItem, formatARS } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'credit' | 'cash'>('transfer');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Buenos Aires',
    postalCode: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = paymentMethod === 'transfer' ? Math.round(subtotal * 0.10) : 0;
  const finalTotal = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = 'MOBI-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(randomOrder);
    setIsSubmitted(true);
    onOrderSuccess();
  };

  const handleCopyAlias = () => {
    navigator.clipboard.writeText('MOBISTORE.PRO.OFICIAL');
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const handleSendWhatsAppOrder = () => {
    const itemsSummary = items.map((i) => `• ${i.name} (${i.storage} / ${i.color}) x${i.quantity}`).join('\n');
    const msg = encodeURIComponent(
      `¡Hola MobiStore Pro! Acabo de generar el Pedido #${orderNumber}:\n\n` +
      `👤 Cliente: ${formData.fullName}\n` +
      `📞 Teléfono: ${formData.phone}\n` +
      `🚚 Entrega: ${deliveryMethod === 'shipping' ? `Envío a domicilio (${formData.address}, ${formData.city})` : 'Retiro en Sucursal'}\n` +
      `💳 Método de Pago: ${paymentMethod === 'transfer' ? 'Transferencia (10% OFF)' : paymentMethod === 'credit' ? 'Tarjeta de Crédito' : 'Efectivo / Plan Canje'}\n\n` +
      `📦 Productos:\n${itemsSummary}\n\n` +
      `💰 Total: ${formatARS(finalTotal)}\n` +
      `¿Me confirman los datos para coordinar el despacho?`
    );
    window.open(`https://wa.me/5491100000000?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-gray-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-1">
              Finalizar Pedido
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isSubmitted ? '¡Pedido Confirmado con Éxito!' : 'Datos de Envío y Pago'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-800 flex-1">
          {isSubmitted ? (
            /* Success confirmation */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-950">
                  ¡Gracias por tu compra, {formData.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Tu orden <strong className="text-gray-900 font-bold">#{orderNumber}</strong> fue reservada en nuestro sistema. Te enviamos los detalles a {formData.email || 'tu email'}.
                </p>
              </div>

              {/* Transfer Details Card if selected */}
              {paymentMethod === 'transfer' && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left space-y-2 max-w-md mx-auto text-xs">
                  <span className="font-bold text-blue-900 block">Datos Bancarios para Transferencia (10% OFF):</span>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-blue-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block">ALIAS CBU:</span>
                      <strong className="text-blue-700 text-sm font-black">MOBISTORE.PRO.OFICIAL</strong>
                    </div>
                    <button
                      onClick={handleCopyAlias}
                      className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold hover:bg-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedAlias ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Titular: MOBISTORE S.A. | CUIT: 30-71829304-8 | Banco Santander
                  </p>
                </div>
              )}

              {/* Order items recap */}
              <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200 max-w-md mx-auto space-y-2 text-xs">
                <span className="font-bold text-gray-900 block">Resumen del pedido:</span>
                {items.map((i) => (
                  <div key={i.cartItemId} className="flex justify-between text-gray-600">
                    <span>{i.name} ({i.storage} · {i.color}) x{i.quantity}</span>
                    <span className="font-bold text-gray-900 tabular-nums">{formatARS(i.price * i.quantity)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-sm text-gray-950">
                  <span>Total a Pagar:</span>
                  <span className="text-blue-600 tabular-nums">{formatARS(finalTotal)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Enviar Comprobante por WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  Continuar Explorando
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery method toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Método de Entrega:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('shipping')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      deliveryMethod === 'shipping'
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <Truck className={`w-5 h-5 ${deliveryMethod === 'shipping' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Envío a Domicilio</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">Gratis a todo el país</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 ${deliveryMethod === 'pickup' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">Retiro en Sucursal</span>
                      <span className="text-[11px] text-gray-500">Palermo / Belgrano (Inmediato)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal info fields */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Tus Datos de Contacto:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Nombre y Apellido *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Teléfono / WhatsApp *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="email"
                      required
                      placeholder="Correo Electrónico para Factura *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address fields if shipping */}
              {deliveryMethod === 'shipping' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Dirección de Entrega:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        required
                        placeholder="Calle, Número, Piso / Depto *"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Código Postal *"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        required
                        placeholder="Ciudad / Localidad *"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Provincia *"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Método de Pago:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-gray-900 block">Transferencia</span>
                    <span className="text-[11px] font-bold text-emerald-700">10% de Descuento</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-gray-900 block">Tarjeta de Crédito</span>
                    <span className="text-[11px] text-gray-500">Hasta 12 cuotas fijas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-gray-900 block">Efectivo / Plan Canje</span>
                    <span className="text-[11px] text-gray-500">En mano en tienda</span>
                  </button>
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal productos:</span>
                  <span className="font-bold tabular-nums">{formatARS(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Descuento por Transferencia (10%):</span>
                    <span className="tabular-nums">-{formatARS(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Costo de envío:</span>
                  <span className="text-emerald-700 font-bold">¡GRATIS!</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-sm">
                  <span className="font-black text-gray-900">Total a Pagar:</span>
                  <span className="text-xl font-black text-blue-600 tabular-nums">
                    {formatARS(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>Confirmar Pedido y Reservar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
