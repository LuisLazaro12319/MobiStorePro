import React, { useState, useMemo } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Product, ProductBrand, formatARS } from '../types';
import { tradeInOptions, conditionMultipliers } from '../data/tradeInData';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProductForCart?: (product: Product) => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<ProductBrand | 'all'>('Apple');
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [selectedConditionId, setSelectedConditionId] = useState('excellent');
  const [targetProductId, setTargetProductId] = useState<number>(products[0]?.id || 1);

  // Available models for chosen brand
  const filteredModels = useMemo(() => {
    return tradeInOptions.filter((opt) => opt.brand === selectedBrand);
  }, [selectedBrand]);

  const currentTradeOption = filteredModels[selectedModelIdx] || filteredModels[0] || tradeInOptions[0];
  const currentCondition = conditionMultipliers.find((c) => c.id === selectedConditionId) || conditionMultipliers[0];
  const targetProduct = products.find((p) => p.id === targetProductId) || products[0];

  // Calculated valuation
  const estimatedUsedValue = Math.round(currentTradeOption.baseValuation * currentCondition.multiplier);
  const remainingDifference = Math.max(0, targetProduct.basePrice - estimatedUsedValue);
  const installment12 = Math.round((remainingDifference / 12) * 1.15);

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola MobiStore Pro! Quiero cotizar mi Plan Canje:\n` +
      `📱 Mi equipo actual: ${currentTradeOption.model}\n` +
      `✨ Estado estético: ${currentCondition.label}\n` +
      `💰 Cotización estimada: ${formatARS(estimatedUsedValue)}\n` +
      `🎯 Nuevo equipo deseado: ${targetProduct.name} (${formatARS(targetProduct.basePrice)})\n` +
      `💳 Saldo restante aproximado: ${formatARS(remainingDifference)}\n` +
      `¿Cómo coordinamos la entrega o verificación?`
    );
    window.open(`https://wa.me/5491100000000?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-white" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Plan Canje Multimarca
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Cotizá tu Smartphone Usado al Instante
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md">
            Entregá tu iPhone, Samsung, Motorola o Xiaomi como parte de pago y renová tu celular abonando solo la diferencia.
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-800">
          {/* Step 1: Select Brand */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              1. Marca de tu equipo actual:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Apple', 'Samsung', 'Motorola', 'Xiaomi'] as ProductBrand[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setSelectedBrand(b);
                    setSelectedModelIdx(0);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-gray-900 text-white shadow-xs ring-2 ring-emerald-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Model */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              2. Modelo exacto que entregás:
            </label>
            <select
              value={selectedModelIdx}
              onChange={(e) => setSelectedModelIdx(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              {filteredModels.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.model} (Hasta {formatARS(item.baseValuation)})
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Condition */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              3. Estado estético y funcional:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {conditionMultipliers.map((cond) => {
                const isSelected = selectedConditionId === cond.id;
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setSelectedConditionId(cond.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20 shadow-xs'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-gray-900">{cond.label.split(' ')[0]}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug">{cond.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Target Smartphone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              4. ¿A qué celular querés subir de gama?:
            </label>
            <select
              value={targetProductId}
              onChange={(e) => setTargetProductId(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} - {p.name} ({formatARS(p.basePrice)})
                </option>
              ))}
            </select>
          </div>

          {/* Summary Box */}
          <div className="bg-gray-900 text-white p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-300 pb-2 border-b border-gray-800">
              <span>Valor estimado por tu equipo usado:</span>
              <span className="text-emerald-400 font-bold text-sm tabular-nums">
                +{formatARS(estimatedUsedValue)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300 pb-2 border-b border-gray-800">
              <span>Precio del {targetProduct.name}:</span>
              <span className="text-white font-bold text-sm tabular-nums">
                {formatARS(targetProduct.basePrice)}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs text-gray-400 uppercase font-bold block">
                  Diferencia Final a Pagar:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">
                  {formatARS(remainingDifference)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block">o en 12 cuotas fijas de:</span>
                <span className="text-sm sm:text-base font-bold text-white tabular-nums">
                  {formatARS(installment12)} / mes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verificación técnica rápida en 15 min en tienda oficial.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold cursor-pointer w-full sm:w-auto"
            >
              Cerrar
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/25 cursor-pointer w-full sm:w-auto transition-all"
            >
              <span>Enviar por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
