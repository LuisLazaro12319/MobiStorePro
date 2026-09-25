import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import heroFlagships from '../assets/images/hero_flagship_smartphones_1790310285685.jpg';
import heroTradeIn from '../assets/images/hero_trade_in_plan_1790310330304.jpg';
import heroSamsung from '../assets/images/hero_samsung_galaxy_ultra_1790310301365.jpg';
import heroMoto from '../assets/images/hero_motorola_edge_1790310315110.jpg';
import heroXiaomi from '../assets/images/hero_xiaomi_flagship_1790310341561.jpg';

interface HeroCarouselProps {
  onOpenTradeIn: () => void;
  onExploreCatalog: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenTradeIn,
  onExploreCatalog,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 'tiktok-live',
      badge: 'Directos de TikTok',
      badgeLive: 'En Vivo con el Dueño',
      titleHighlight: 'TikTok Live',
      title: 'Precios Únicos en',
      description: 'Durante los directos el dueño tira rebajas instantáneas y ofertas especiales en el acto. ¡Tocá para entrar a la transmisión en vivo o revisá todo el catálogo acá!',
      pills: ['⚡ Rebajas en el Acto', '🎁 Ofertas Flash del Dueño', '📦 Stock en Vivo'],
      ctaText: 'Entrar al TikTok Live',
      ctaAction: () => window.open('https://www.tiktok.com', '_blank'),
      ctaGradient: 'bg-gradient-to-r from-[#fe2c55] via-pink-500 to-[#00f2fe]',
      image: heroFlagships,
      ambientGlow: 'from-[#00f2fe]/20 to-[#fe2c55]/20',
      tag: '🔴 Transmisión Oficial en Vivo',
    },
    {
      id: 'plan-canje',
      badge: 'Plan Canje Oficial',
      badgeLive: 'Cotización en el Acto',
      titleHighlight: 'Parte de Pago',
      title: 'Aceptamos Equipos como',
      description: 'Entregá tu celular anterior (iPhone, Samsung, Motorola o Xiaomi) y estrená el último modelo pagando solo la diferencia con traspaso seguro en 15 minutos.',
      pills: ['💰 Mejor Cotización', '🛡️ 1 Año de Garantía', '🔄 Traspaso en el Acto'],
      ctaText: 'Cotizar Mi Equipo Ahora',
      ctaAction: onOpenTradeIn,
      ctaGradient: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-950 font-black',
      image: heroTradeIn,
      ambientGlow: 'from-emerald-500/20 to-teal-400/20',
      tag: '♻️ Plan Canje Multimarca',
    },
    {
      id: 'flagships-2026',
      badge: 'Generación 2026',
      badgeLive: 'Titanio & IA',
      titleHighlight: 'Galaxy S25 & Moto',
      title: 'iPhone 17 Pro,',
      description: 'Titanio aeroespacial, Inteligencia Artificial de última generación (Apple Intelligence & Galaxy AI) y sensores de hasta 200MP para fotos cinematográficas.',
      pills: ['💎 Titanio Grado 5', '🧠 Apple & Galaxy AI', '📸 Cámaras de hasta 200MP'],
      ctaText: 'Ver Gama Flagships Pro',
      ctaAction: onExploreCatalog,
      ctaGradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      image: heroSamsung,
      ambientGlow: 'from-blue-600/20 to-indigo-600/20',
      tag: '⚡ Modelos Flagships 2026',
    },
    {
      id: 'originales-garantia',
      badge: 'Equipos Nuevos',
      badgeLive: 'Caja Sellada',
      titleHighlight: 'Nuevos y Sellados',
      title: '100% Originales,',
      description: 'Dispositivos cerrados de fábrica con precinto de seguridad, 12 meses de garantía oficial por escrito y factura de compra. Asesoría técnica personalizada.',
      pills: ['🔒 Precinto de Seguridad', '📄 Factura A o B', '🛡️ Garantía Escrita 1 Año'],
      ctaText: 'Explorar Catálogo Oficial',
      ctaAction: onExploreCatalog,
      ctaGradient: 'bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-black',
      image: heroMoto,
      ambientGlow: 'from-amber-500/20 to-orange-500/20',
      tag: '🛡️ Garantía Oficial 12 Meses',
    },
    {
      id: 'envios-pais',
      badge: 'Logística Express',
      badgeLive: 'Envíos Asegurados',
      titleHighlight: 'Todo el País',
      title: 'Despachos Rápidos a',
      description: 'Envíos 100% asegurados puerta a puerta con número de seguimiento en tiempo real. En CABA y GBA entrega el mismo día o retiro en showroom.',
      pills: ['🚚 Envío Gratis Asegurado', '⏱️ En el Día en CABA/GBA', '📍 Retiro en Showroom'],
      ctaText: 'Comprar con Envío Gratis',
      ctaAction: onExploreCatalog,
      ctaGradient: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white',
      image: heroXiaomi,
      ambientGlow: 'from-purple-600/20 to-blue-600/20',
      tag: '📦 Despachos a Todo el País',
    },
  ];

  // Auto carousel rotation
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="pt-16 sm:pt-20 pb-4 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
      {/* Container: on mobile rounded-none and px-0 to occupy the full width with zero spacing */}
      <div
        className="relative rounded-none sm:rounded-3xl overflow-hidden shadow-2xl bg-gray-950 text-white min-h-[580px] sm:min-h-[560px] flex items-center group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel slides container */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex items-center bg-gray-950 p-5 sm:p-12 lg:p-16 overflow-hidden select-none"
            >
              {/* Vibrant Ambient Glows */}
              <div
                className={`absolute -top-24 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-gradient-to-r ${slide.ambientGlow} opacity-70`}
              />
              <div
                className={`absolute -bottom-24 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-gradient-to-r ${slide.ambientGlow} opacity-60`}
              />

              {/* Background Backdrop with high clarity */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center opacity-30 sm:opacity-25 transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90" />
              </div>

              {/* Main Content Layout (Flex Column on Mobile, Split Row on Desktop) */}
              <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
                {/* Text Info */}
                <div className="w-full lg:max-w-xl space-y-3.5 sm:space-y-4">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">
                      {slide.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      {slide.badgeLive}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
                    {slide.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Pills Grid */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-200 pt-1">
                    {slide.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="bg-white/10 px-2.5 py-1 rounded-xl backdrop-blur-sm border border-white/10 text-[11px] sm:text-xs font-medium"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Prominent Photo Showcase on Mobile (so the photo is clearly visible and not just a faint background!) */}
                  <div className="block lg:hidden w-full pt-1 pb-1">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black max-h-48 sm:max-h-60 w-full group/mobilecard">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-44 sm:h-56 object-cover object-center transform group-hover/mobilecard:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white bg-black/80 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md">
                          {slide.tag}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                          Disponibilidad Inmediata
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Single Action Button (Only the first button, second button removed as requested) */}
                  <div className="pt-2">
                    <button
                      onClick={slide.ctaAction}
                      className={`inline-flex items-center gap-2.5 ${slide.ctaGradient} text-white font-bold px-7 py-3.5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Desktop High-Impact Showcase Photo Card (Right Side) */}
                <div className="hidden lg:flex shrink-0 items-center justify-center">
                  <div className="relative group/card cursor-pointer" onClick={slide.ctaAction}>
                    <div
                      className={`absolute -inset-2 bg-gradient-to-r ${slide.ambientGlow} rounded-3xl blur-md opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition duration-500`}
                    />
                    <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl w-80 h-80 bg-black">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center group-hover/card:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>{slide.tag}</span>
                      </div>

                      {/* Bottom Banner */}
                      <div className="absolute bottom-3 left-3 right-3 bg-black/85 group-hover/card:bg-blue-600/90 backdrop-blur-md p-2 rounded-xl border border-white/20 text-center transition-colors">
                        <p className="text-xs text-white font-bold flex items-center justify-center gap-1.5">
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 transition-all z-20 cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-70 group-hover:opacity-100 transition-all z-20 cursor-pointer"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
