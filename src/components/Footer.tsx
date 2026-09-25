import React from 'react';
import { Smartphone, Mail, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { ProductBrand } from '../types';

interface FooterProps {
  onSelectBrand: (brand: ProductBrand | 'all') => void;
  onOpenTradeIn: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectBrand, onOpenTradeIn }) => {
  return (
    <footer id="contacto" className="bg-gray-950 text-gray-400 text-xs border-t border-gray-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight">
                MobiStore<span className="text-blue-500">Pro</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Tienda especializada en celulares y smartphones de alta gama. Venta de iPhones originales de Apple, Samsung Galaxy Ultra, Motorola Edge y Razr, Xiaomi y Google Pixel. Equipos 100% nuevos en caja sellada con garantía escrita de 12 meses.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-gray-300">
              <span className="inline-flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Garantía Oficial Escrita
              </span>
            </div>
          </div>

          {/* Column: Marcas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Marcas Líderes
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectBrand('Apple')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Apple iPhone (14 al 17 Pro)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Samsung')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Samsung Galaxy (S25 Ultra, Fold)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Motorola')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Motorola (Edge 50 Ultra & Razr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Xiaomi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Xiaomi & POCO (Lentes Leica)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectBrand('Google')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Google Pixel 9 Pro XL & 8a
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Servicios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Servicios & Herramientas
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenTradeIn}
                  className="hover:text-emerald-400 transition-colors cursor-pointer font-semibold text-left"
                >
                  Plan Canje Multimarca
                </button>
              </li>
              <li>
                <a href="#comparador" className="hover:text-blue-400 transition-colors">
                  Comparador Cara a Cara
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>TikTok Live Shows</span>
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Envíos Express a Todo el País
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Facturación A y B Oficial
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Showrooms & Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Atención & Sucursales
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Av. Santa Fe 3240, Palermo, CABA / Av. Cabildo 2040, Belgrano</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Lun a Sáb: 10:00 a 20:00 hs</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>WhatsApp: +54 9 11 0000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>ventas@mobistorepro.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
          <p>© {new Date().getFullYear()} MobiStore Pro. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Medios de Pago:</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-gray-300 font-semibold">Transferencia (10% OFF)</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-gray-300 font-semibold">12 Cuotas</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-gray-300 font-semibold">Efectivo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
