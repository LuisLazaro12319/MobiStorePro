import React, { useState } from 'react';
import { Product, formatARS } from '../types';
import { ArrowLeftRight, Check, Sparkles, Cpu, Monitor, Camera, Battery, Shield, Usb, ThumbsUp, ShoppingBag } from 'lucide-react';

interface ComparatorSectionProps {
  products: Product[];
  modelAId: number;
  modelBId: number;
  onChangeModelA: (id: number) => void;
  onChangeModelB: (id: number) => void;
  onAddToCart: (product: Product, selectedStorage: string, selectedColor: string, calculatedPrice: number) => void;
}

export const ComparatorSection: React.FC<ComparatorSectionProps> = ({
  products,
  modelAId,
  modelBId,
  onChangeModelA,
  onChangeModelB,
  onAddToCart,
}) => {
  const modelA = products.find((p) => p.id === modelAId) || products[0];
  const modelB = products.find((p) => p.id === modelBId) || products[6] || products[1];

  const [addedA, setAddedA] = useState(false);
  const [addedB, setAddedB] = useState(false);

  const handleAddA = () => {
    onAddToCart(modelA, modelA.storageOptions[0].size, modelA.colors[0].name, modelA.basePrice);
    setAddedA(true);
    setTimeout(() => setAddedA(false), 1600);
  };

  const handleAddB = () => {
    onAddToCart(modelB, modelB.storageOptions[0].size, modelB.colors[0].name, modelB.basePrice);
    setAddedB(true);
    setTimeout(() => setAddedB(false), 1600);
  };

  const compareRows = [
    {
      title: 'Procesador & Potencia',
      icon: Cpu,
      valA: `${modelA.chip} — ${modelA.chipDetail}`,
      valB: `${modelB.chip} — ${modelB.chipDetail}`,
    },
    {
      title: 'Pantalla & Tasa de Refresco',
      icon: Monitor,
      valA: `${modelA.screen} (${modelA.screenDetail})`,
      valB: `${modelB.screen} (${modelB.screenDetail})`,
    },
    {
      title: 'Sistema de Cámaras',
      icon: Camera,
      valA: `${modelA.camera} — ${modelA.cameraDetail}`,
      valB: `${modelB.camera} — ${modelB.cameraDetail}`,
    },
    {
      title: 'Batería & Autonomía',
      icon: Battery,
      valA: `${modelA.battery} — ${modelA.batteryDetail}`,
      valB: `${modelB.battery} — ${modelB.batteryDetail}`,
    },
    {
      title: 'Inteligencia Artificial',
      icon: Sparkles,
      valA: modelA.aiReady ? `✅ ${modelA.aiDetail}` : '❌ No optimizado para IA generativa local',
      valB: modelB.aiReady ? `✅ ${modelB.aiDetail}` : '❌ No optimizado para IA generativa local',
    },
    {
      title: 'Materiales & Resistencia',
      icon: Shield,
      valA: `${modelA.material} | Protección ${modelA.water}`,
      valB: `${modelB.material} | Protección ${modelB.water}`,
    },
    {
      title: 'Conector & Extras',
      icon: Usb,
      valA: `${modelA.connector} | ${modelA.controls}`,
      valB: `${modelB.connector} | ${modelB.controls}`,
    },
    {
      title: 'Peso Oficial',
      icon: Shield,
      valA: modelA.weight,
      valB: modelB.weight,
    },
  ];

  return (
    <section id="comparador" className="hidden md:block py-16 bg-gray-100/70 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
            <span>Comparador Cara a Cara</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            ¿Cuál es el Smartphone Ideal Para Vos?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Elegí dos celulares cualesquiera (iPhone vs Samsung, Motorola vs Xiaomi o cualquier combinación) y compará sus especificaciones técnicas reales en vivo.
          </p>
        </div>

        {/* Model Selectors Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          {/* Selector A */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Dispositivo A:
            </label>
            <select
              value={modelAId}
              onChange={(e) => onChangeModelA(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {products.map((p) => (
                <option key={`a-${p.id}`} value={p.id}>
                  {p.brand} - {p.name} ({formatARS(p.basePrice)})
                </option>
              ))}
            </select>
          </div>

          {/* Selector B */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Dispositivo B:
            </label>
            <select
              value={modelBId}
              onChange={(e) => onChangeModelB(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {products.map((p) => (
                <option key={`b-${p.id}`} value={p.id}>
                  {p.brand} - {p.name} ({formatARS(p.basePrice)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Header Row with Images & Action */}
          <div className="grid grid-cols-2 border-b border-gray-200 divide-x divide-gray-200 bg-gray-50/50">
            {/* Model A Card */}
            <div className="p-6 text-center flex flex-col items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                {modelA.brand} · {modelA.category}
              </span>
              <div className="h-44 w-full flex items-center justify-center p-2 mb-3">
                <img
                  src={modelA.image}
                  alt={modelA.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-[85%] object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-950 mb-1">{modelA.name}</h3>
              <p className="text-xl sm:text-2xl font-black text-blue-600 mb-4 tabular-nums">
                {formatARS(modelA.basePrice)}
              </p>
              <button
                onClick={handleAddA}
                disabled={addedA}
                className={`w-full max-w-xs py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  addedA ? 'bg-emerald-600 text-white' : 'bg-gray-900 hover:bg-black text-white'
                }`}
              >
                {addedA ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Elegir {modelA.name.split(' ')[0]}</span>
                  </>
                )}
              </button>
            </div>

            {/* Model B Card */}
            <div className="p-6 text-center flex flex-col items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                {modelB.brand} · {modelB.category}
              </span>
              <div className="h-44 w-full flex items-center justify-center p-2 mb-3">
                <img
                  src={modelB.image}
                  alt={modelB.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-[85%] object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-950 mb-1">{modelB.name}</h3>
              <p className="text-xl sm:text-2xl font-black text-blue-600 mb-4 tabular-nums">
                {formatARS(modelB.basePrice)}
              </p>
              <button
                onClick={handleAddB}
                disabled={addedB}
                className={`w-full max-w-xs py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  addedB ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {addedB ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Elegir {modelB.name.split(' ')[0]}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Comparison Matrix Rows */}
          <div className="divide-y divide-gray-100 text-xs sm:text-sm">
            {compareRows.map((row, idx) => {
              const Icon = row.icon;
              return (
                <div key={idx} className="p-4 sm:p-5 hover:bg-gray-50/70 transition-colors">
                  <div className="flex items-center justify-center gap-2 mb-2 text-gray-500 font-bold text-xs uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{row.title}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="px-2 text-gray-800 leading-relaxed font-medium">
                      {row.valA}
                    </div>
                    <div className="px-2 text-gray-800 leading-relaxed font-medium border-l border-gray-100">
                      {row.valB}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verdicts Footer */}
          <div className="p-6 bg-gradient-to-r from-blue-50/70 via-gray-50 to-indigo-50/70 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-900 font-black text-sm uppercase tracking-wider mb-4">
              <ThumbsUp className="w-4 h-4 text-blue-600" />
              <span>Veredicto & Recomendación de Especialistas</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
                <span className="font-bold text-gray-900 block mb-1">
                  Elegí {modelA.name} si:
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {modelA.verdict}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
                <span className="font-bold text-gray-900 block mb-1">
                  Elegí {modelB.name} si:
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {modelB.verdict}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
