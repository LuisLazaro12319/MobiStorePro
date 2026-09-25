import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import { Product, ProductBrand, CartItem } from './types';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { TrustMarquee } from './components/TrustMarquee';
import { CatalogSection } from './components/CatalogSection';
import { ComparatorSection } from './components/ComparatorSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { TradeInModal } from './components/TradeInModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mobistore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<ProductBrand | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Comparator selection (Default: iPhone 17 Pro Max vs Samsung Galaxy S25 Ultra)
  const [compareModelAId, setCompareModelAId] = useState<number>(1);
  const [compareModelBId, setCompareModelBId] = useState<number>(7);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mobistore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedStorage: string,
    selectedColor: string,
    calculatedPrice: number
  ) => {
    const cartItemId = `${product.id}-${selectedStorage}-${selectedColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          brand: product.brand,
          name: product.name,
          image: product.image,
          storage: selectedStorage,
          color: selectedColor,
          price: calculatedPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectForCompare = (product: Product) => {
    if (product.id === compareModelAId) {
      // already in A, leave it
    } else {
      setCompareModelBId(product.id);
    }
    const compEl = document.getElementById('comparador');
    if (compEl) {
      compEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCatalog = () => {
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] flex flex-col font-sans">
      {/* Fixed Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onSelectBrand={(b) => setSelectedBrand(b)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel
          onOpenTradeIn={() => setIsTradeInOpen(true)}
          onExploreCatalog={handleExploreCatalog}
        />

        {/* Continuous Trust Marquee */}
        <TrustMarquee />

        {/* Multi-Brand Product Catalog */}
        <CatalogSection
          products={products}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={handleAddToCart}
          onSelectForCompare={handleSelectForCompare}
          onOpenDetails={(p) => setDetailedProduct(p)}
        />

        {/* Side-by-Side Face-to-Face Comparator */}
        <ComparatorSection
          products={products}
          modelAId={compareModelAId}
          modelBId={compareModelBId}
          onChangeModelA={setCompareModelAId}
          onChangeModelB={setCompareModelBId}
          onAddToCart={handleAddToCart}
        />

        {/* Benefits & Warranties Section */}
        <BenefitsSection onOpenTradeIn={() => setIsTradeInOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onSelectBrand={(b) => {
          setSelectedBrand(b);
          handleExploreCatalog();
        }}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Plan Canje (Trade-In) Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        products={products}
      />

      {/* Product Detailed Technical Sheet Modal */}
      <ProductDetailModal
        product={detailedProduct}
        onClose={() => setDetailedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout and Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}
