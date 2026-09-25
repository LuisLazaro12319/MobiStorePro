import React, { useState } from 'react';
import { ShoppingBag, ArrowLeftRight, Sparkles, Menu, X, Smartphone, Search } from 'lucide-react';
import { ProductBrand } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTradeIn: () => void;
  onSelectBrand: (brand: ProductBrand | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenTradeIn,
  onSelectBrand,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleBrandClick = (brand: ProductBrand | 'all') => {
    onSelectBrand(brand);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 text-gray-900 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gray-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none text-gray-950">
              MobiStore<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold">Pro</span>
            </span>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest leading-none mt-1">
              Smartphones & Celulares
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a
            href="#catalogo"
            onClick={() => handleBrandClick('all')}
            className="hover:text-blue-600 transition-colors font-semibold"
          >
            Catálogo
          </a>

          {/* Quick brand selectors */}
          <div className="flex items-center gap-3 text-xs text-gray-500 border-x border-gray-200 px-4">
            <button
              onClick={() => handleBrandClick('Apple')}
              className="hover:text-black font-semibold transition-colors"
            >
              iPhone
            </button>
            <span>·</span>
            <button
              onClick={() => handleBrandClick('Samsung')}
              className="hover:text-blue-600 font-semibold transition-colors"
            >
              Samsung
            </button>
            <span>·</span>
            <button
              onClick={() => handleBrandClick('Motorola')}
              className="hover:text-indigo-600 font-semibold transition-colors"
            >
              Motorola
            </button>
            <span>·</span>
            <button
              onClick={() => handleBrandClick('Xiaomi')}
              className="hover:text-orange-600 font-semibold transition-colors"
            >
              Xiaomi
            </button>
            <span>·</span>
            <button
              onClick={() => handleBrandClick('Google')}
              className="hover:text-emerald-600 font-semibold transition-colors"
            >
              Pixel
            </button>
          </div>

          <a
            href="#comparador"
            className="text-blue-600 bg-blue-50/90 hover:bg-blue-100/90 px-3 py-1.5 rounded-full border border-blue-200/80 shadow-2xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
            <span>Comparar en vivo</span>
          </a>

          <button
            onClick={onOpenTradeIn}
            className="text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100/90 px-3 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plan Canje</span>
          </button>

          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 bg-pink-50/90 hover:bg-pink-100/90 px-3 py-1.5 rounded-full border border-pink-200/80 shadow-2xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[#fe2c55]">TikTok Live</span>
          </a>

          <a href="#beneficios" className="hover:text-blue-600 transition-colors">
            Garantía & Envíos
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Toggle / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-gray-300 w-44 sm:w-60 transition-all">
                <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar modelo, chip..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-gray-800 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-gray-400 hover:text-gray-600 ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 flex items-center justify-center focus:outline-none cursor-pointer border border-gray-200/60"
                aria-label="Buscar celulares"
                title="Buscar celulares"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-900 flex items-center justify-center focus:outline-none cursor-pointer border border-gray-200/60"
            aria-label="Abrir Carrito de compras"
            title="Ver carrito de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 flex items-center justify-center focus:outline-none cursor-pointer border border-gray-200/60"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 shadow-xl space-y-4">
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar iPhone, Samsung, Motorola..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Marcas Populares</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleBrandClick('Apple')}
                className="text-left px-3 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                 Apple iPhone
              </button>
              <button
                onClick={() => handleBrandClick('Samsung')}
                className="text-left px-3 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                Samsung Galaxy
              </button>
              <button
                onClick={() => handleBrandClick('Motorola')}
                className="text-left px-3 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                Motorola Moto
              </button>
              <button
                onClick={() => handleBrandClick('Xiaomi')}
                className="text-left px-3 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                Xiaomi & POCO
              </button>
              <button
                onClick={() => handleBrandClick('Google')}
                className="text-left px-3 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                Google Pixel
              </button>
              <button
                onClick={() => handleBrandClick('all')}
                className="text-left px-3 py-2 rounded-lg bg-blue-50 text-sm font-bold text-blue-600 hover:bg-blue-100"
              >
                Ver Todos (19)
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTradeIn();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold text-left"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Cotizar Plan Canje de tu Usado</span>
            </button>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 text-pink-700 text-sm font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>TikTok Live & Promociones</span>
            </a>
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Garantía Oficial y Formas de Envío
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
