import React from 'react';
import { RefreshCw, Sparkles, ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

interface BenefitsSectionProps {
  onOpenTradeIn: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenTradeIn }) => {
  const benefits = [
    {
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Plan Canje Multimarca',
      desc: 'Entregá tu smartphone actual (iPhone, Samsung, Motorola o Xiaomi) y usalo como parte de pago para llevarte el último modelo en el acto.',
      actionText: 'Cotizar Usado',
      onAction: onOpenTradeIn,
    },
    {
      icon: Sparkles,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      title: 'TikTok Live Shows',
      desc: 'Conectate a nuestras transmisiones en vivo diarias con precios especiales, sorteos de cargadores rápidos y regalos sorpresa en cada compra.',
      actionText: 'Seguir en TikTok',
      onAction: () => window.open('https://www.tiktok.com', '_blank'),
    },
    {
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'Garantía Oficial Escrita',
      desc: '12 meses de cobertura total por escrito en todos los equipos. Solo vendemos dispositivos 100% nuevos, originales y sellados de fábrica.',
      actionText: 'Conocer Cobertura',
      onAction: () => window.open('https://wa.me/5491100000000?text=Hola!%20Quería%20consultar%20por%20la%20garantía%20oficial', '_blank'),
    },
    {
      icon: Truck,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Envíos Rápidos & Seguros',
      desc: 'Despachos express a todo el territorio nacional con seguro contra extravío incluido y número de seguimiento online en tiempo real.',
      actionText: 'Consultar Tiempos',
      onAction: () => window.open('https://wa.me/5491100000000?text=Hola!%20Cuánto%20demora%20el%20envío%20a%20mi%20ciudad?', '_blank'),
    },
    {
      icon: CreditCard,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Múltiples Medios de Pago',
      desc: 'Aboná con transferencia bancaria con 10% de descuento directo, hasta 12 cuotas fijas con tarjeta de crédito o efectivo en nuestro showroom.',
      actionText: 'Ver Promociones',
      onAction: () => window.open('https://wa.me/5491100000000?text=Hola!%20Cuáles%20son%20las%20promociones%20con%20tarjeta?', '_blank'),
    },
    {
      icon: Headphones,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      title: 'Migración y Asesoría 1 a 1',
      desc: 'Te ayudamos a transferir todos tus contactos, fotos, chats de WhatsApp y aplicaciones de tu teléfono viejo al nuevo totalmente gratis.',
      actionText: 'Hablar con Asesor',
      onAction: () => window.open('https://wa.me/5491100000000?text=Hola!%20Necesito%20asesoramiento%20para%20elegir%20mi%20celular', '_blank'),
    },
  ];

  return (
    <section id="beneficios" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
          ¿Por qué elegirnos?
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          La Mejor Experiencia Para Tu Nuevo Celular
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Comprá con absoluta tranquilidad: seguridad, rapidez y el mejor respaldo del mercado.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${b.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={b.onAction}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{b.actionText}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
