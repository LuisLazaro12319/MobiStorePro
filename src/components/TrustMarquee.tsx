import React from 'react';
import { ShieldCheck, Truck, CreditCard, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  const items = [
    { icon: ShieldCheck, text: 'Garantía Oficial Escrita 12 Meses', highlight: 'Garantía' },
    { icon: RefreshCw, text: 'Plan Canje Multimarca: iPhone, Samsung & Moto', highlight: 'Plan Canje' },
    { icon: Truck, text: 'Envíos Gratis Asegurados a Todo el País', highlight: 'Envíos Gratis' },
    { icon: CreditCard, text: 'Hasta 12 Cuotas con Tarjetas Seleccionadas', highlight: '12 Cuotas' },
    { icon: CheckCircle2, text: '100% Equipos Nuevos en Caja Sellada', highlight: 'Nuevos y Sellados' },
    { icon: Sparkles, text: 'Promociones Exclusivas en TikTok Live', highlight: 'TikTok Live' }
  ];

  return (
    <div className="w-full bg-gray-950 text-white py-3 overflow-hidden border-y border-gray-800 shadow-inner">
      <div className="trust-marquee-track flex items-center">
        {/* First repetition */}
        <div className="flex items-center gap-10 whitespace-nowrap px-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`track-1-${idx}`} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-300">
                <span className="w-6 h-6 rounded-full bg-gray-800/80 text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span>{item.text}</span>
                <span className="text-gray-600 font-bold ml-6">·</span>
              </div>
            );
          })}
        </div>

        {/* Second repetition for seamless loop */}
        <div className="flex items-center gap-10 whitespace-nowrap px-4" aria-hidden="true">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`track-2-${idx}`} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-300">
                <span className="w-6 h-6 rounded-full bg-gray-800/80 text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span>{item.text}</span>
                <span className="text-gray-600 font-bold ml-6">·</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
