import React, { useState } from 'react';
import { ArrowRight, PawPrint } from 'lucide-react';
import { Product, ProductCategory, Language } from '../types';
import { ProductCard } from './pages/ShopPage';

interface ShopProps {
  lang: Language;
  products: Product[];
  onAddToCart: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onBuyNow?: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onOpenDetail?: (slug?: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  lang,
  products,
  onAddToCart,
  onBuyNow,
  onOpenDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = products
    .filter((prod) => {
      if (activeCategory === 'all') return true;
      return prod.category === activeCategory;
    })
    .slice(0, 8);

  const handleAdd = (product: Product) => {
    onAddToCart(product, 1);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistedIds((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const openProductSlug = (slug: string) => {
    window.history.pushState({}, '', `/cua-hang/${slug}`);
    if (onOpenDetail) onOpenDetail(slug);
  };

  return (
    <section
      id="shop"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--surface-2) 38%, transparent)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Unified 3-Line Section Header */}
        <div className="space-y-2.5 max-w-2xl">
          <span
            className="block uppercase font-bold"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'CỬA HÀNG THÚ CƯNG' : 'PET SHOP'}
          </span>
          <h2
            className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'Cửa hàng cho bé cưng' : 'Shop for your pet'}
          </h2>
          <p
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {lang === 'vi'
              ? 'Thức ăn hữu cơ, đồ chơi và phụ kiện an toàn được tuyển chọn cho từng bé.'
              : 'Organic food, toys, and safe accessories curated for every pet.'}
          </p>
        </div>

        {/* Compact Promo Banner */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xs border lg:h-[188px] flex items-center"
          style={{
            background:
              'linear-gradient(95deg, var(--surface-2) 0%, var(--surface) 52%, color-mix(in srgb, var(--pink) 35%, var(--surface)) 100%)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-8 py-5 gap-6">
            <div className="lg:col-span-8 flex items-center gap-5">
              <div
                aria-hidden="true"
                className="hidden sm:flex w-15 h-15 rounded-2xl items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                <PawPrint className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span
                  className="block text-xs font-extrabold uppercase tracking-[0.16em]"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'ƯU ĐÃI ĐẶC BIỆT' : 'SPECIAL OFFER'}
                </span>
                <h3
                  className="font-heading text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi'
                    ? 'Giảm đến 30% sản phẩm thiết yếu tuyển chọn'
                    : 'Up to 30% off selected pet essentials'}
                </h3>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenDetail) onOpenDetail();
                    }}
                    className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
                  >
                    <span>{lang === 'vi' ? 'Săn ưu đãi' : 'Shop deals'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div
                className="w-34 h-34 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border p-2 flex items-center justify-center"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--surface-2) 60%, var(--surface))',
                  borderColor: 'var(--border)',
                }}
              >
                <img
                  src="/assets/products/nutripet-organic-2kg.png"
                  alt={
                    lang === 'vi'
                      ? 'Hạt NutriPet hữu cơ đa loài (2kg)'
                      : 'NutriPet organic pet food (2kg)'
                  }
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3
                className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Sản phẩm nổi bật' : 'Featured products'}
              </h3>
              <p
                className="text-sm sm:text-[15px] mt-1 font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi'
                  ? 'Những lựa chọn hàng đầu dành cho người bạn nhỏ của gia đình.'
                  : 'Top veterinary-approved picks for your beloved pets.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1 p-1 rounded-full border overflow-x-auto flex-nowrap"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                {[
                  { id: 'all' as const, label: lang === 'vi' ? 'Tất cả' : 'All' },
                  { id: 'food' as const, label: lang === 'vi' ? 'Đồ ăn' : 'Food' },
                  { id: 'toys' as const, label: lang === 'vi' ? 'Đồ chơi' : 'Toys' },
                  { id: 'accessories' as const, label: lang === 'vi' ? 'Phụ kiện' : 'Accessories' },
                  { id: 'care' as const, label: lang === 'vi' ? 'Chăm sóc' : 'Care' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer"
                    style={{
                      backgroundColor:
                        activeCategory === cat.id ? 'var(--primary)' : 'transparent',
                      color:
                        activeCategory === cat.id
                          ? 'var(--on-primary)'
                          : 'var(--text)',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {onOpenDetail && (
                <button
                  type="button"
                  data-testid="home-cta-shop"
                  onClick={() => onOpenDetail()}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold hover:underline cursor-pointer"
                  style={{ color: 'var(--primary)' }}
                >
                  <span>
                    {lang === 'vi' ? 'Xem tất cả sản phẩm' : 'View all products'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                isAdded={Boolean(addedItemIds[product.id])}
                isWishlisted={Boolean(wishlistedIds[product.id])}
                onToggleWishlist={toggleWishlist}
                onAddToCartClick={handleAdd}
                onBuyNowClick={(p) =>
                  onBuyNow ? onBuyNow(p, 1) : handleAdd(p)
                }
                onOpenProductDetail={openProductSlug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
