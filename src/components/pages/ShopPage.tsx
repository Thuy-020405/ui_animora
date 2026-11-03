import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag,
  Star,
  Search,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Phone,
  Plus,
  Minus,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Fish,
  PawPrint,
} from 'lucide-react';
import {
  Language,
  Product,
  ProductCategory,
  PageId,
  Pet,
  ShopPetGroup,
} from '../../types';
import {
  SHOP_PRODUCTS,
  PRODUCT_REVIEWS,
  normalizeViText,
  mapSpeciesToShopPetGroup,
  parsePetAgeStage,
  formatVndPrice,
} from '../../data/shopData';
import { CONTACT_INFO } from '../../config/contact';

interface ShopPageProps {
  lang: Language;
  products: Product[];
  pets?: Pet[];
  onAddToCart: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onBuyNow?: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onOpenCart: () => void;
  cartCount: number;
  onNavigate: (page: PageId) => void;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'discount';
type DetailTabId = 'description' | 'ingredients' | 'usage' | 'reviews';

function getShopSlugFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/cua-hang\/([^/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

const PawPlaceholderSVG: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="32" cy="41" rx="11" ry="9" fill="currentColor" fillOpacity="0.28" />
    <circle cx="19" cy="27" r="4.8" fill="currentColor" fillOpacity="0.28" />
    <circle cx="27.5" cy="21.5" r="5" fill="currentColor" fillOpacity="0.28" />
    <circle cx="36.5" cy="21.5" r="5" fill="currentColor" fillOpacity="0.28" />
    <circle cx="45" cy="27" r="4.8" fill="currentColor" fillOpacity="0.28" />
  </svg>
);

/**
 * Returns at most ONE top-left image badge per Section 1:
 * - Priority: "Hết hàng" (Out of stock) > "Giảm {x}%" (Discount) > "Mới" (New) > "Bán chạy" (Best seller).
 * - Show the discount percentage ONLY ONCE: keep the small "-20%" pill next to the price,
 *   and make the image badge show only for products that have no discount (New / Best seller). Do not show both.
 */
function getSingleImageBadge(
  product: Product,
  lang: Language,
  isOutOfStock: boolean,
  discountPercent: number
): { label: string; bg: string; color: string } | null {
  if (isOutOfStock) {
    return {
      label: lang === 'vi' ? 'Hết hàng' : 'Out of stock',
      bg: '#6B7280',
      color: '#FFFFFF',
    };
  }
  // Discount is shown once next to the price, so no image badge when discounted
  if (discountPercent > 0) {
    return null;
  }
  if (product.badges?.includes('new')) {
    return {
      label: lang === 'vi' ? 'Mới' : 'New',
      bg: '#6B1F2E',
      color: '#FFF4E8',
    };
  }
  if (product.badges?.includes('bestseller')) {
    return {
      label: lang === 'vi' ? 'Bán chạy' : 'Best seller',
      bg: '#F4B6C2',
      color: '#3A0F1B',
    };
  }
  return null;
}

interface ProductCardProps {
  product: Product;
  lang: Language;
  isAdded: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCartClick: (product: Product) => void;
  onBuyNowClick?: (product: Product) => void;
  onOpenProductDetail: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  isAdded,
  isWishlisted,
  onToggleWishlist,
  onAddToCartClick,
  onBuyNowClick,
  onOpenProductDetail,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const slug = product.slug || product.id;
  const displayName = lang === 'en' && product.nameEn ? product.nameEn : product.name;
  const displaySpec =
    lang === 'en' && product.specEn
      ? product.specEn
      : product.spec || (lang === 'vi' ? 'Tiêu chuẩn' : 'Standard');
  const isOutOfStock =
    product.stock === 0 || Boolean(product.badges?.includes('out_of_stock'));
  const discountPercent =
    product.discountPercent ||
    (product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0);
  const reviewCount = product.reviewCount ?? 0;

  const singleBadge = getSingleImageBadge(product, lang, isOutOfStock, discountPercent);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenProductDetail(slug);
  };

  return (
    <article
      data-testid={`shop-product-card-${product.id}`}
      className={`group relative flex flex-col h-full rounded-[20px] border p-3 sm:p-4 transition-all duration-300 ${
        isOutOfStock ? '' : 'hover:-translate-y-1 hover:shadow-xl'
      }`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* 1. Square 1:1 Image Frame (consistent light/dark background, object-fit: contain, padding: 16px) */}
      <div className="shop-product-img-frame mb-3">
        {(!imgLoaded || imgError) && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--surface-2)', color: 'var(--primary)' }}
          >
            <PawPlaceholderSVG className="w-14 h-14" />
          </div>
        )}

        <a
          href={`/cua-hang/${slug}`}
          onClick={handleCardClick}
          aria-label={displayName}
          className="w-full h-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-xl cursor-pointer"
        >
          {!imgError && (
            <img
              src={product.image}
              alt={displayName}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isOutOfStock
                  ? 'opacity-60'
                  : 'group-hover:scale-[1.04]'
              } ${imgLoaded ? '' : 'opacity-0'}`}
              referrerPolicy="no-referrer"
            />
          )}
        </a>

        {/* At most ONE top-left badge (height 24px, padding 0 10px, radius 999px, Nunito 13px, weight 700) */}
        {singleBadge && (
          <span
            data-testid={`product-badge-${product.id}`}
            className="absolute top-2.5 left-2.5 z-10 inline-flex items-center justify-center pointer-events-none shadow-xs"
            style={{
              height: '24px',
              padding: '0 10px',
              borderRadius: '999px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              lineHeight: 1,
              backgroundColor: singleBadge.bg,
              color: singleBadge.color,
            }}
          >
            {singleBadge.label}
          </span>
        )}

        {/* Wishlist Heart inside top-right corner of image frame (36px round, glass style) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={
            lang === 'vi'
              ? isWishlisted
                ? `Bỏ yêu thích ${displayName}`
                : `Yêu thích ${displayName}`
              : isWishlisted
              ? `Remove ${displayName} from wishlist`
              : `Add ${displayName} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] shadow-xs cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.86)',
            border: '1px solid rgba(90, 30, 45, 0.12)',
            color: isWishlisted ? '#FF7F6B' : '#5A1E2D',
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#FF7F6B] text-[#FF7F6B]' : ''
            }`}
          />
        </button>
      </div>

      {/* 2. Product Name: Baloo 2, 17px (15px on mobile), weight 600, line-height 1.3, ALWAYS reserve 2 lines */}
      <a
        href={`/cua-hang/${slug}`}
        onClick={handleCardClick}
        className="block focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer"
      >
        <h3
          className="font-heading text-[15px] sm:text-[17px] font-semibold leading-[1.3] line-clamp-2 transition-colors group-hover:opacity-85"
          style={{
            color: 'var(--text)',
            minHeight: '2.6em',
          }}
        >
          {displayName}
        </h3>
      </a>

      {/* 3. Spec line directly under the name, 14px, --text-muted, 4px spacing */}
      <p
        className="text-[13px] sm:text-[14px] font-medium mt-1 truncate"
        style={{ color: 'var(--text-muted)' }}
      >
        {displaySpec}
      </p>

      {/* Bottom-aligned block so price, rating, and button align across every row */}
      <div className="mt-auto pt-2.5 flex flex-col">
        {/* 4. Price row: current price 20px (18px on mobile) weight 800 in --primary, old price struck through, "-20%" pill */}
        <div className="flex flex-wrap items-center gap-1.5 min-h-[26px]">
          <span
            className="text-[18px] sm:text-[20px] font-extrabold leading-none"
            style={{ color: 'var(--primary)' }}
          >
            {formatVndPrice(product.price)}
          </span>
          {!isOutOfStock && product.oldPrice && product.oldPrice > product.price && (
            <>
              <span
                className="text-xs sm:text-[14px] line-through font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {formatVndPrice(product.oldPrice)}
              </span>
              {discountPercent > 0 && (
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    height: '22px',
                    padding: '0 8px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: 1,
                    backgroundColor: '#FF7F6B',
                    color: '#FFFFFF',
                  }}
                >
                  -{discountPercent}%
                </span>
              )}
            </>
          )}
        </div>

        {/* 5. Rating row: show stars + score + count only when reviewCount >= 5; otherwise "Chưa có đánh giá" keeping same height */}
        <div className="flex items-center gap-1.5 mt-1.5 mb-3 min-h-[22px]">
          {reviewCount >= 5 ? (
            <>
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: idx < Math.round(product.rating) ? '#E8A33D' : 'transparent',
                      color: '#E8A33D',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                ({reviewCount})
              </span>
            </>
          ) : (
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi' ? 'Chưa có đánh giá' : 'No reviews yet'}
            </span>
          )}
        </div>

        {/* 6. Add-to-Cart Outline Action + Buy Now Primary Action */}
        {isOutOfStock ? (
          <button
            type="button"
            disabled
            aria-label={lang === 'vi' ? `${displayName} - Hết hàng` : `${displayName} - Out of stock`}
            className="w-full h-[40px] sm:h-[42px] rounded-full text-[13px] sm:text-[14px] font-bold inline-flex items-center justify-center border-2 cursor-not-allowed"
            style={{
              borderColor: '#9CA3AF',
              backgroundColor: 'rgba(156, 163, 175, 0.14)',
              color: '#6B7280',
            }}
          >
            {lang === 'vi' ? 'Hết hàng' : 'Out of stock'}
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              data-testid={`add-to-cart-btn-${product.id}`}
              data-added={isAdded ? 'true' : 'false'}
              aria-label={
                lang === 'vi'
                  ? `Thêm ${displayName} vào giỏ hàng`
                  : `Add ${displayName} to cart`
              }
              onClick={() => onAddToCartClick(product)}
              className="btn-shop-outline sm:flex-[1.15] min-w-0 cursor-pointer"
            >
              {isAdded ? (
                <span>{lang === 'vi' ? 'Đã thêm ✓' : 'Added ✓'}</span>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              data-testid={`buy-now-btn-${product.id}`}
              aria-label={
                lang === 'vi'
                  ? `Mua hàng ${displayName}`
                  : `Buy ${displayName} now`
              }
              onClick={() =>
                onBuyNowClick
                  ? onBuyNowClick(product)
                  : onAddToCartClick(product)
              }
              className="btn-shop-buy sm:flex-1 min-w-0 cursor-pointer"
            >
              <span>{lang === 'vi' ? 'Mua hàng' : 'Buy now'}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export const ShopPage: React.FC<ShopPageProps> = ({
  lang,
  products: propProducts,
  pets = [],
  onAddToCart,
  onBuyNow,
  onOpenCart,
  onNavigate,
}) => {
  const catalogProducts = useMemo(() => {
    return propProducts.length >= SHOP_PRODUCTS.length ? propProducts : SHOP_PRODUCTS;
  }, [propProducts]);

  // URL slug state for /cua-hang/{slug}
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() =>
    getShopSlugFromPath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setSelectedSlug(getShopSlugFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToProductSlug = (slug: string | null) => {
    const nextUrl = slug ? `/cua-hang/${slug}` : '/cua-hang';
    if (window.location.pathname !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Search States
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [activePetGroup, setActivePetGroup] = useState<ShopPetGroup | 'all'>('all');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [onlyOnSale, setOnlyOnSale] = useState(false);

  // Pagination ("Xem thêm" loads 12 at a time)
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Wishlist & Add-to-cart feedback states
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('animora_wishlist');
    return saved ? JSON.parse(saved) : {};
  });

  // Pet profile recommendation state
  const [selectedPetId, setSelectedPetId] = useState<string>(() =>
    pets.length > 0 ? pets[0].id : ''
  );

  useEffect(() => {
    if (pets.length > 0 && !pets.some((p) => p.id === selectedPetId)) {
      setSelectedPetId(pets[0].id);
    }
  }, [pets, selectedPetId]);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('animora_wishlist', JSON.stringify(wishlistedIds));
  }, [wishlistedIds]);

  // Product Detail Page local states
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSpecIdx, setSelectedSpecIdx] = useState(0);
  const [detailQty, setDetailQty] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTabId>('description');
  const [reviewStarFilter, setReviewStarFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedSpecIdx(0);
    setDetailQty(1);
    setActiveDetailTab('description');
    setReviewStarFilter('all');
  }, [selectedSlug]);

  const gridSectionRef = useRef<HTMLDivElement>(null);

  const toggleWishlist = (productId: string) => {
    setWishlistedIds((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleAddProduct = (
    product: Product,
    quantity = 1,
    customSpec?: string
  ) => {
    onAddToCart(product, quantity, customSpec);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
    onOpenCart();
  };

  const handleBuyNowProduct = (
    product: Product,
    quantity = 1,
    customSpec?: string
  ) => {
    if (onBuyNow) {
      onBuyNow(product, quantity, customSpec);
    } else {
      onAddToCart(product, quantity, customSpec);
      onNavigate('checkout');
    }
  };

  const categoryLabels: Record<ProductCategory | 'all', { vi: string; en: string }> = {
    all: { vi: 'Tất cả', en: 'All' },
    food: { vi: 'Đồ ăn', en: 'Food' },
    toys: { vi: 'Đồ chơi', en: 'Toys' },
    accessories: { vi: 'Phụ kiện', en: 'Accessories' },
    care: { vi: 'Chăm sóc', en: 'Care' },
  };

  const petGroupOptions: {
    id: ShopPetGroup | 'all';
    labelVi: string;
    labelEn: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', labelVi: 'Tất cả', labelEn: 'All', icon: <PawPrint className="w-3.5 h-3.5" /> },
    { id: 'dog', labelVi: 'Chó', labelEn: 'Dogs', icon: <Dog className="w-3.5 h-3.5" /> },
    { id: 'cat', labelVi: 'Mèo', labelEn: 'Cats', icon: <Cat className="w-3.5 h-3.5" /> },
    {
      id: 'rabbit_rodent',
      labelVi: 'Thỏ & chuột',
      labelEn: 'Rabbits & rodents',
      icon: <Rabbit className="w-3.5 h-3.5" />,
    },
    { id: 'bird', labelVi: 'Chim', labelEn: 'Birds', icon: <Bird className="w-3.5 h-3.5" /> },
      {
      id: 'fish_reptile',
      labelVi: 'Cá & bò sát',
      labelEn: 'Fish & reptiles',
      icon: <Fish className="w-3.5 h-3.5" />,
    },
  ];

  // Active Pet Profile for Recommendation (Section 7)
  const activePetProfile = useMemo(
    () => (pets.length > 0 ? pets.find((p) => p.id === selectedPetId) || pets[0] : null),
    [pets, selectedPetId]
  );

  const recommendedProductsForPet = useMemo(() => {
    if (!activePetProfile) return [];
    const targetGroup = mapSpeciesToShopPetGroup(activePetProfile.species);
    const targetAge = parsePetAgeStage(activePetProfile.age);
    const matches = catalogProducts.filter((prod) => {
      const matchesSpecies = prod.petTypes?.includes(targetGroup);
      const matchesAge =
        !prod.recommendedAges || prod.recommendedAges.includes(targetAge);
      return matchesSpecies && matchesAge && (prod.stock ?? 1) > 0;
    });
    if (matches.length >= 4) return matches.slice(0, 4);
    const fallback = catalogProducts.filter(
      (prod) => !matches.some((m) => m.id === prod.id) && (prod.stock ?? 1) > 0
    );
    return [...matches, ...fallback].slice(0, 4);
  }, [activePetProfile, catalogProducts]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const normQuery = normalizeViText(debouncedQuery);

    return catalogProducts
      .filter((prod) => {
        if (activeCategory !== 'all' && prod.category !== activeCategory) {
          return false;
        }
        if (
          activePetGroup !== 'all' &&
          (!prod.petTypes || !prod.petTypes.includes(activePetGroup))
        ) {
          return false;
        }
        if (onlyOnSale) {
          const hasDiscount =
            (prod.discountPercent && prod.discountPercent > 0) ||
            (prod.oldPrice && prod.oldPrice > prod.price);
          if (!hasDiscount) return false;
        }
        if (normQuery) {
          const searchable = normalizeViText(
            `${prod.name} ${prod.nameEn || ''} ${prod.brand || ''} ${prod.description}`
          );
          if (!searchable.includes(normQuery)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') {
          return (b.createdAtOrder ?? 0) - (a.createdAtOrder ?? 0);
        }
        if (sortBy === 'discount') {
          const discA = a.discountPercent ?? 0;
          const discB = b.discountPercent ?? 0;
          return discB - discA;
        }
        const popA = (a.reviewCount ?? 10) * a.rating;
        const popB = (b.reviewCount ?? 10) * b.rating;
        return popB - popA;
      });
  }, [
    catalogProducts,
    activeCategory,
    activePetGroup,
    onlyOnSale,
    debouncedQuery,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setActivePetGroup('all');
    setOnlyOnSale(false);
    setSearchInput('');
    setDebouncedQuery('');
    setSortBy('popular');
  };

  const hasAnyActiveFilter =
    activeCategory !== 'all' ||
    activePetGroup !== 'all' ||
    onlyOnSale ||
    debouncedQuery.trim() !== '';

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 450);
  };

  // ============================================================================
  // VIEW 1: PRODUCT DETAIL PAGE (/cua-hang/{slug})
  // ============================================================================
  if (selectedSlug) {
    const detailProduct = catalogProducts.find(
      (p) => p.slug === selectedSlug || p.id === selectedSlug
    );

    if (!detailProduct) {
      return (
        <div className="pt-28 pb-24 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center py-16 space-y-5">
            <div
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
              style={{
                backgroundColor: 'var(--surface-2)',
                color: 'var(--primary)',
              }}
            >
              <PawPlaceholderSVG className="w-12 h-12" />
            </div>
            <h1
              className="font-heading text-3xl sm:text-4xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? 'Không tìm thấy sản phẩm' : 'Product not found'}
            </h1>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi'
                ? 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.'
                : 'The product you are looking for does not exist or has been discontinued.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateToProductSlug(null)}
                className="btn-primary px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'vi' ? 'Quay lại cửa hàng' : 'Back to shop'}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    const displayName =
      lang === 'en' && detailProduct.nameEn ? detailProduct.nameEn : detailProduct.name;
    const categoryLabel =
      categoryLabels[detailProduct.category][lang === 'vi' ? 'vi' : 'en'];
    const galleryImages =
      detailProduct.images && detailProduct.images.length > 0
        ? detailProduct.images
        : [detailProduct.image];
    const activeImage = galleryImages[selectedImageIdx] || detailProduct.image;

    const specOptions =
      detailProduct.specOptions && detailProduct.specOptions.length > 0
        ? detailProduct.specOptions
        : [
            {
              labelVi: detailProduct.spec || 'Tiêu chuẩn',
              labelEn: detailProduct.specEn || 'Standard',
              price: detailProduct.price,
              oldPrice: detailProduct.oldPrice,
            },
          ];
    const activeSpecOption = specOptions[selectedSpecIdx] || specOptions[0];
    const currentPrice = activeSpecOption.price;
    const currentOldPrice = activeSpecOption.oldPrice;
    const currentDiscount =
      currentOldPrice && currentOldPrice > currentPrice
        ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100)
        : detailProduct.discountPercent || 0;
    const isOutOfStock =
      detailProduct.stock === 0 ||
      detailProduct.badges?.includes('out_of_stock') ||
      false;

    const allProductReviews = PRODUCT_REVIEWS.filter(
      (r) => r.productId === detailProduct.id
    );
    const reviewsToUse =
      allProductReviews.length > 0 ? allProductReviews : PRODUCT_REVIEWS.slice(0, 3);
    const filteredReviews =
      reviewStarFilter === 'all'
        ? reviewsToUse
        : reviewsToUse.filter((r) => r.stars === reviewStarFilter);

    const relatedProducts = catalogProducts
      .filter(
        (p) =>
          p.id !== detailProduct.id &&
          (p.category === detailProduct.category ||
            p.petTypes?.some((pt) => detailProduct.petTypes?.includes(pt)))
      )
      .slice(0, 4);

    const activeSpecLabel =
      lang === 'en' ? activeSpecOption.labelEn : activeSpecOption.labelVi;

    const handleDetailAddToCart = () => {
      if (isOutOfStock) return;
      const productWithSpec: Product = {
        ...detailProduct,
        price: currentPrice,
        oldPrice: currentOldPrice,
        spec: activeSpecOption.labelVi,
        specEn: activeSpecOption.labelEn,
      };
      handleAddProduct(productWithSpec, detailQty, activeSpecLabel);
    };

    const handleDetailBuyNow = () => {
      if (isOutOfStock) return;
      const productWithSpec: Product = {
        ...detailProduct,
        price: currentPrice,
        oldPrice: currentOldPrice,
        spec: activeSpecOption.labelVi,
        specEn: activeSpecOption.labelEn,
      };
      handleBuyNowProduct(productWithSpec, detailQty, activeSpecLabel);
    };

    return (
      <div className="pt-24 pb-28 sm:pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 2 Columns on Desktop */}
          <div
            className="rounded-3xl border p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {/* Left Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="shop-product-img-frame border group" style={{ borderColor: 'var(--border)' }}>
                <img
                  src={activeImage}
                  alt={displayName}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, idx) => {
                  const isSelected = idx === selectedImageIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      aria-label={
                        lang === 'vi' ? `Xem ảnh ${idx + 1}` : `View image ${idx + 1}`
                      }
                      className={`shop-product-img-frame !p-2 !rounded-xl border-2 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer ${
                        isSelected ? 'shadow-xs' : 'opacity-75 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Info */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {detailProduct.brand && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-extrabold"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--primary)',
                      }}
                    >
                      {detailProduct.brand}
                    </span>
                  )}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold border"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {categoryLabel}
                  </span>
                  {isOutOfStock ? (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gray-600 text-white">
                      {lang === 'vi' ? 'Hết hàng' : 'Out of stock'}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white">
                      {lang === 'vi'
                        ? `Còn hàng (${detailProduct.stock ?? 20})`
                        : `In stock (${detailProduct.stock ?? 20})`}
                    </span>
                  )}
                </div>

                <h1
                  className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  {displayName}
                </h1>

                <div className="flex items-center gap-2">
                  {(detailProduct.reviewCount ?? 0) >= 5 ? (
                    <>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4"
                            style={{
                              fill:
                                idx < Math.round(detailProduct.rating)
                                  ? '#E8A33D'
                                  : 'transparent',
                              color: '#E8A33D',
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>
                        {detailProduct.rating.toFixed(1)}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        ({detailProduct.reviewCount}{' '}
                        {lang === 'vi' ? 'đánh giá' : 'reviews'})
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'vi' ? 'Chưa có đánh giá' : 'No reviews yet'}
                    </span>
                  )}
                </div>

                {/* Price + Old Price */}
                <div className="flex flex-wrap items-baseline gap-3 pt-1">
                  <span
                    className="text-3xl sm:text-4xl font-extrabold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {formatVndPrice(currentPrice)}
                  </span>
                  {currentOldPrice && currentOldPrice > currentPrice && (
                    <>
                      <span
                        className="text-lg line-through font-medium"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {formatVndPrice(currentOldPrice)}
                      </span>
                      {currentDiscount > 0 && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-extrabold"
                          style={{
                            backgroundColor: '#FF7F6B',
                            color: '#FFFFFF',
                          }}
                        >
                          -{currentDiscount}%
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'en' && detailProduct.descriptionEn
                    ? detailProduct.descriptionEn
                    : detailProduct.description}
                </p>

                {/* Spec selector chips */}
                <div className="space-y-2 pt-1">
                  <label
                    className="block text-xs font-extrabold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Chọn quy cách đóng gói' : 'Select size / pack'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specOptions.map((opt, idx) => {
                      const active = idx === selectedSpecIdx;
                      const label = lang === 'en' ? opt.labelEn : opt.labelVi;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setSelectedSpecIdx(idx)}
                          className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                          style={{
                            backgroundColor: active ? 'var(--primary)' : 'var(--bg)',
                            color: active ? 'var(--on-primary)' : 'var(--text)',
                            borderColor: active ? 'var(--primary)' : 'var(--border)',
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity stepper */}
                <div className="flex items-center gap-4 pt-2">
                  <span
                    className="text-xs font-extrabold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Số lượng' : 'Quantity'}
                  </span>
                  <div
                    className="inline-flex items-center rounded-full border p-1"
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <button
                      type="button"
                      disabled={detailQty <= 1}
                      onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                      aria-label={lang === 'vi' ? 'Giảm số lượng' : 'Decrease quantity'}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 cursor-pointer"
                      style={{ color: 'var(--text)' }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      className="w-10 text-center text-sm font-extrabold"
                      style={{ color: 'var(--text)' }}
                    >
                      {detailQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDetailQty((q) => q + 1)}
                      aria-label={lang === 'vi' ? 'Tăng số lượng' : 'Increase quantity'}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                      style={{ color: 'var(--text)' }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary "Thêm vào giỏ" + Secondary "Mua ngay" */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleDetailAddToCart}
                    className={`h-12 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 ${
                      isOutOfStock
                        ? 'opacity-60 cursor-not-allowed border'
                        : 'btn-primary shadow-md cursor-pointer'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isOutOfStock
                        ? lang === 'vi'
                          ? 'Hết hàng'
                          : 'Out of stock'
                        : lang === 'vi'
                        ? 'Thêm vào giỏ'
                        : 'Add to cart'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleDetailBuyNow}
                    className="btn-secondary h-12 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{lang === 'vi' ? 'Mua hàng' : 'Buy now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-1">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold hover:underline"
                    style={{ color: 'var(--primary)' }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>
                      {lang === 'vi'
                        ? 'Gọi tư vấn: 0337 203 332'
                        : 'Call for advice: 0337 203 332'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Trust mini-row */}
              <div
                className="grid grid-cols-2 gap-3 pt-4 border-t text-xs font-bold"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>{lang === 'vi' ? 'Giao nhanh trong ngày' : 'Same-day delivery'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>{lang === 'vi' ? 'Đổi trả trong 7 ngày' : '7-day easy returns'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>{lang === 'vi' ? 'Hàng chính hãng 100%' : '100% authentic'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>{lang === 'vi' ? 'Thanh toán khi nhận hàng' : 'Cash on delivery'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Tabs */}
          <div
            className="rounded-3xl border p-6 sm:p-8 space-y-6"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 border-b"
              style={{ borderColor: 'var(--border)', scrollbarWidth: 'none' }}
            >
              {(
                [
                  { id: 'description', vi: 'Mô tả', en: 'Overview' },
                  { id: 'ingredients', vi: 'Thành phần', en: 'Ingredients & materials' },
                  { id: 'usage', vi: 'Hướng dẫn sử dụng', en: 'How to use' },
                  {
                    id: 'reviews',
                    vi: `Đánh giá (${reviewsToUse.length})`,
                    en: `Reviews (${reviewsToUse.length})`,
                  },
                ] as const
              ).map((tab) => {
                const active = activeDetailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveDetailTab(tab.id)}
                    className="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--primary)' : 'transparent',
                      color: active ? 'var(--on-primary)' : 'var(--text)',
                    }}
                  >
                    {lang === 'vi' ? tab.vi : tab.en}
                  </button>
                );
              })}
            </div>

            {activeDetailTab === 'description' && (
              <div className="space-y-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                <p>
                  {lang === 'en' && detailProduct.descriptionEn
                    ? detailProduct.descriptionEn
                    : detailProduct.description}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi'
                    ? 'Tất cả sản phẩm tại cửa hàng Animora đều được đội ngũ bác sĩ thú y kiểm định nguồn gốc, hạn sử dụng và độ an toàn sinh học trước khi giao đến tay gia đình bé cưng.'
                    : 'Every item in the Animora shop is vetted by our veterinary team for ingredient safety, freshness, and species appropriateness.'}
                </p>
              </div>
            )}

            {activeDetailTab === 'ingredients' && (
              <div className="space-y-2 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                <p>
                  {lang === 'en'
                    ? detailProduct.ingredientsEn || detailProduct.descriptionEn
                    : detailProduct.ingredientsVi || detailProduct.description}
                </p>
              </div>
            )}

            {activeDetailTab === 'usage' && (
              <div className="space-y-2 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                <p>
                  {lang === 'en'
                    ? detailProduct.usageEn || detailProduct.descriptionEn
                    : detailProduct.usageVi || detailProduct.description}
                </p>
              </div>
            )}

            {activeDetailTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold mr-1" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Lọc theo số sao:' : 'Filter by rating:'}
                  </span>
                  {(['all', 5, 4, 3] as const).map((starOpt) => {
                    const active = reviewStarFilter === starOpt;
                    return (
                      <button
                        key={String(starOpt)}
                        type="button"
                        onClick={() => setReviewStarFilter(starOpt)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
                        style={{
                          backgroundColor: active ? 'var(--primary)' : 'var(--bg)',
                          color: active ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: active ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {starOpt === 'all'
                          ? lang === 'vi'
                            ? 'Tất cả'
                            : 'All'
                          : `${starOpt} ★`}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl border space-y-2"
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-heading text-sm font-bold block" style={{ color: 'var(--text)' }}>
                            {rev.author}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {lang === 'vi' ? rev.petInfoVi : rev.petInfoEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5"
                                style={{
                                  fill: i < rev.stars ? '#E8A33D' : 'transparent',
                                  color: '#E8A33D',
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {rev.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                        {lang === 'vi' ? rev.textVi : rev.textEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Products (4 cards) */}
          <div className="space-y-5">
            <h2
              className="font-heading text-2xl sm:text-3xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? 'Sản phẩm liên quan' : 'Related products'}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  lang={lang}
                  isAdded={Boolean(addedIds[relProd.id])}
                  isWishlisted={Boolean(wishlistedIds[relProd.id])}
                  onToggleWishlist={toggleWishlist}
                  onAddToCartClick={(p) => handleAddProduct(p, 1)}
                  onBuyNowClick={(p) => handleBuyNowProduct(p, 1)}
                  onOpenProductDetail={(slug) => navigateToProductSlug(slug)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sticky "Thêm vào giỏ" + "Mua hàng" bar on mobile */}
        <div
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 border-t shadow-2xl flex items-center justify-between gap-2"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="min-w-0">
            <span className="text-[11px] block truncate" style={{ color: 'var(--text-muted)' }}>
              {activeSpecLabel}
            </span>
            <span className="text-base font-extrabold" style={{ color: 'var(--primary)' }}>
              {formatVndPrice(currentPrice * detailQty)}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleDetailAddToCart}
              className="btn-secondary h-10 px-3.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart'}</span>
            </button>
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleDetailBuyNow}
              className="btn-primary h-10 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{lang === 'vi' ? 'Mua hàng' : 'Buy now'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: MAIN SHOP PAGE (/cua-hang)
  // ============================================================================
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ================================================================= */}
        {/* 1. PAGE HEADER (Eyebrow + H1 "Cửa hàng cho bé cưng" + Subtitle)   */}
        {/* ================================================================= */}
        <div className="space-y-2.5 max-w-2xl">
          <span
            data-testid="shop-page-eyebrow"
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
          <h1
            data-testid="shop-page-title"
            className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'Cửa hàng cho bé cưng' : 'Shop for your pet'}
          </h1>
          <p
            data-testid="shop-page-subtitle"
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {lang === 'vi'
              ? 'Thức ăn hữu cơ, đồ chơi và phụ kiện an toàn được tuyển chọn bởi đội ngũ bác sĩ thú y.'
              : 'Organic food, toys, and safe accessories curated by the Animora veterinary team.'}
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. COMPACT PROMO BANNER (~156px height on desktop)                */}
        {/* ================================================================= */}
        <div
          className="relative rounded-3xl overflow-hidden border shadow-xs lg:h-[156px] flex items-center"
          style={{
            background:
              'linear-gradient(95deg, var(--surface-2) 0%, var(--surface) 52%, color-mix(in srgb, var(--pink) 35%, var(--surface)) 100%)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center px-5 sm:px-7 py-3.5 gap-4">
            <div className="lg:col-span-8 flex items-center gap-4">
              <div
                aria-hidden="true"
                className="hidden sm:flex w-13 h-13 rounded-2xl items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                <PawPrint className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span
                  className="block text-[11px] font-extrabold uppercase tracking-[0.16em]"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'ƯU ĐÃI ĐẶC BIỆT' : 'SPECIAL OFFER'}
                </span>
                <h2
                  className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold leading-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi'
                    ? 'Giảm đến 30% sản phẩm thiết yếu tuyển chọn'
                    : 'Up to 30% off selected pet essentials'}
                </h2>
                <div className="pt-0.5">
                  <button
                    type="button"
                    data-testid="promo-shop-deals-btn"
                    onClick={() => {
                      setOnlyOnSale(true);
                      setActiveCategory('all');
                      gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>{lang === 'vi' ? 'Săn ưu đãi' : 'Shop deals'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border p-2 flex items-center justify-center"
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
                      : 'NutriPet organic multi-species kibble (2kg)'
                  }
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. SHORTER 2-ROW STICKY TOOLBAR & PRODUCT GRID                    */}
        {/* ================================================================= */}
        <div ref={gridSectionRef} id="shop-products-grid" className="space-y-4">
          {/* Sticky 2-Row Glass Toolbar */}
          <div
            className="sticky top-[var(--nav-h)] z-30 glass-card rounded-2xl px-4 py-2.5 border space-y-2"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Row 1: Title on left; Search, Sort dropdown, and "Bộ lọc" button on right */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
              <h2
                className="font-heading text-xl sm:text-2xl font-extrabold leading-tight shrink-0"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Sản phẩm nổi bật' : 'Featured products'}
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search Box (300ms debounced + clear ×) */}
                <div className="relative flex-1 sm:w-60 min-w-[190px]">
                  <Search
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={
                      lang === 'vi'
                        ? 'Tìm theo tên, thương hiệu...'
                        : 'Search name, brand...'
                    }
                    aria-label={lang === 'vi' ? 'Tìm kiếm sản phẩm' : 'Search products'}
                    className="w-full h-9.5 pl-9 pr-8 rounded-full text-xs sm:text-sm border focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setDebouncedQuery('');
                      }}
                      aria-label={lang === 'vi' ? 'Xóa từ khóa tìm kiếm' : 'Clear search'}
                      className="w-6 h-6 rounded-full flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 hover:bg-[var(--surface-2)] cursor-pointer"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label={lang === 'vi' ? 'Sắp xếp sản phẩm' : 'Sort products'}
                  className="h-9.5 px-3.5 rounded-full text-xs sm:text-sm font-bold border focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                >
                  <option value="popular">
                    {lang === 'vi' ? 'Phổ biến nhất' : 'Most popular'}
                  </option>
                  <option value="price-asc">
                    {lang === 'vi' ? 'Giá thấp đến cao' : 'Price: Low to high'}
                  </option>
                  <option value="price-desc">
                    {lang === 'vi' ? 'Giá cao đến thấp' : 'Price: High to low'}
                  </option>
                  <option value="newest">
                    {lang === 'vi' ? 'Mới nhất' : 'Newest'}
                  </option>
                  <option value="discount">
                    {lang === 'vi' ? 'Giảm giá nhiều nhất' : 'Biggest discount'}
                  </option>
                </select>
              </div>
            </div>

            {/* Row 2: Single horizontally scrollable row with Category Pills | Divider | Pet-type icon chips with active underline | Result count on far right */}
            <div
              className="flex items-center flex-nowrap overflow-x-auto gap-1.5 pt-0.5"
              style={{ scrollbarWidth: 'none' }}
            >
              {/* Category Chips (filled/outlined pills) */}
              {(['all', 'food', 'toys', 'accessories', 'care'] as const).map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="h-8 px-3.5 rounded-full text-[13px] font-bold whitespace-nowrap shrink-0 border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                      color: active ? 'var(--on-primary)' : 'var(--text)',
                      borderColor: active ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {categoryLabels[cat][lang === 'vi' ? 'vi' : 'en']}
                  </button>
                );
              })}

              {/* Thin Vertical Divider */}
              <div
                aria-hidden="true"
                className="w-px h-5 shrink-0 mx-1.5"
                style={{ backgroundColor: 'var(--border)' }}
              />

              {/* Pet-type chips (smaller, icon + subtle underline when active) */}
              {petGroupOptions.map((petOpt) => {
                const active = activePetGroup === petOpt.id;
                return (
                  <button
                    key={petOpt.id}
                    type="button"
                    onClick={() => setActivePetGroup(petOpt.id)}
                    className="h-8 px-2.5 text-[13px] font-bold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 border-b-2 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                    style={{
                      borderColor: active ? 'var(--primary)' : 'transparent',
                      color: active ? 'var(--primary)' : 'var(--text-muted)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {petOpt.icon}
                    <span>{lang === 'vi' ? petOpt.labelVi : petOpt.labelEn}</span>
                  </button>
                );
              })}

              {/* Far right result count: "16 sản phẩm" (13px, --text-muted) */}
              <span
                className="ml-auto pl-3 text-[13px] font-semibold whitespace-nowrap shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi'
                  ? `${filteredProducts.length} sản phẩm`
                  : `${filteredProducts.length} products`}
              </span>
            </div>
          </div>

          {/* Removable Active Filter Chips under the toolbar ONLY when at least one is active */}
          {hasAnyActiveFilter && (
            <div className="flex flex-wrap items-center gap-2 px-1">
              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <span>{categoryLabels[activeCategory][lang === 'vi' ? 'vi' : 'en']}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {activePetGroup !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActivePetGroup('all')}
                  className="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <span>
                    {
                      petGroupOptions.find((p) => p.id === activePetGroup)?.[
                        lang === 'vi' ? 'labelVi' : 'labelEn'
                      ]
                    }
                  </span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {onlyOnSale && (
                <button
                  type="button"
                  onClick={() => setOnlyOnSale(false)}
                  className="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <span>{lang === 'vi' ? 'Đang giảm giá' : 'On sale'}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {debouncedQuery.trim() !== '' && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setDebouncedQuery('');
                  }}
                  className="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <span>"{debouncedQuery}"</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-extrabold underline ml-1 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-xs cursor-pointer"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Xóa tất cả' : 'Clear all'}
              </button>
            </div>
          )}

          {/* =============================================================== */}
          {/* 7. PET-PROFILE SUGGESTIONS IN A DEDICATED ROW ABOVE THE GRID    */}
          {/* =============================================================== */}
          {pets.length > 0 && activePetProfile && recommendedProductsForPet.length > 0 && (
            <section
              aria-label={
                lang === 'vi'
                  ? `Gợi ý cho ${activePetProfile.name}`
                  : `Suggested for ${activePetProfile.name}`
              }
              className="space-y-3 pt-1 pb-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    <PawPrint className="w-4 h-4" />
                  </span>
                  <h3
                    className="font-heading text-lg sm:text-xl font-extrabold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {lang === 'vi'
                      ? `Gợi ý cho ${activePetProfile.name}`
                      : `Suggested for ${activePetProfile.name}`}
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    {activePetProfile.species} • {activePetProfile.age}
                  </span>
                </div>

                {pets.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {pets.map((petItem) => {
                      const active = petItem.id === activePetProfile.id;
                      return (
                        <button
                          key={petItem.id}
                          type="button"
                          onClick={() => setSelectedPetId(petItem.id)}
                          className="px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                          style={{
                            backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                            color: active ? 'var(--on-primary)' : 'var(--text)',
                            borderColor: active ? 'var(--primary)' : 'var(--border)',
                          }}
                        >
                          {petItem.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Horizontally scrollable strip on mobile, 4-column grid on desktop */}
              <div
                className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {recommendedProductsForPet.map((prod) => (
                  <div
                    key={`rec-${prod.id}`}
                    className="w-[240px] sm:w-[270px] lg:w-auto shrink-0 snap-start"
                  >
                    <ProductCard
                      product={prod}
                      lang={lang}
                      isAdded={Boolean(addedIds[prod.id])}
                      isWishlisted={Boolean(wishlistedIds[prod.id])}
                      onToggleWishlist={toggleWishlist}
                      onAddToCartClick={(p) => handleAddProduct(p, 1)}
                      onBuyNowClick={(p) => handleBuyNowProduct(p, 1)}
                      onOpenProductDetail={(slug) => navigateToProductSlug(slug)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Product Grid (4 cols at 1440px, 3 at 1024px, 2 at 768px & 390px; gap 16px on mobile, 24px on desktop) */}
          {filteredProducts.length === 0 ? (
            <div
              className="rounded-3xl border py-16 px-6 text-center space-y-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--primary)',
                }}
              >
                <PawPlaceholderSVG className="w-10 h-10" />
              </div>
              <h3
                className="font-heading text-xl font-bold"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi'
                  ? 'Không tìm thấy sản phẩm phù hợp'
                  : 'No matching products found'}
              </h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi'
                  ? 'Hãy thử điều chỉnh từ khóa hoặc xóa bớt bộ lọc để xem thêm các sản phẩm khác.'
                  : 'Try adjusting your search keywords or clearing active filters.'}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    isAdded={Boolean(addedIds[product.id])}
                    isWishlisted={Boolean(wishlistedIds[product.id])}
                    onToggleWishlist={toggleWishlist}
                    onAddToCartClick={(p) => handleAddProduct(p, 1)}
                    onBuyNowClick={(p) => handleBuyNowProduct(p, 1)}
                    onOpenProductDetail={(slug) => navigateToProductSlug(slug)}
                  />
                ))}

                {/* Animated Shimmer Skeleton Cards while loading more */}
                {isLoadingMore &&
                  [...Array(4)].map((_, idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="rounded-[20px] border p-4 space-y-3 animate-pulse"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div
                        className="aspect-square w-full rounded-2xl"
                        style={{ backgroundColor: 'var(--surface-2)' }}
                      />
                      <div
                        className="h-4 w-4/5 rounded-full"
                        style={{ backgroundColor: 'var(--surface-2)' }}
                      />
                      <div
                        className="h-3 w-1/3 rounded-full"
                        style={{ backgroundColor: 'var(--surface-2)' }}
                      />
                      <div
                        className="h-5 w-1/2 rounded-full"
                        style={{ backgroundColor: 'var(--surface-2)' }}
                      />
                      <div
                        className="h-11 w-full rounded-full"
                        style={{ backgroundColor: 'var(--surface-2)' }}
                      />
                    </div>
                  ))}
              </div>

              {/* "Xem thêm" ("Load more") Pagination Button */}
              {hasMoreProducts && (
                <div className="pt-4 text-center">
                  <button
                    type="button"
                    disabled={isLoadingMore}
                    onClick={handleLoadMore}
                    className="btn-secondary px-8 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {isLoadingMore
                        ? lang === 'vi'
                          ? 'Đang tải thêm...'
                          : 'Loading...'
                        : lang === 'vi'
                        ? `Xem thêm (${filteredProducts.length - visibleCount} sản phẩm)`
                        : `Load more (${filteredProducts.length - visibleCount} products)`}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ================================================================= */}
        {/* 6. TRUST ROW (4 items, 2x2 grid on mobile)                        */}
        {/* ================================================================= */}
        <div
          className="rounded-3xl border p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {[
            {
              icon: <Truck className="w-6 h-6" />,
              titleVi: 'Giao nhanh trong ngày',
              titleEn: 'Same-day delivery',
              descVi: 'Nội thành TP.HCM trong 2 giờ',
              descEn: 'Within 2 hours in HCMC',
            },
            {
              icon: <RefreshCw className="w-6 h-6" />,
              titleVi: 'Đổi trả trong 7 ngày',
              titleEn: '7-day easy returns',
              descVi: 'Hỗ trợ đổi mới tận nơi miễn phí',
              descEn: 'Free doorstep exchange',
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              titleVi: 'Hàng chính hãng',
              titleEn: '100% authentic',
              descVi: 'Kiểm định bởi bác sĩ thú y Animora',
              descEn: 'Verified by Animora veterinarians',
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              titleVi: 'Thanh toán khi nhận hàng',
              titleEn: 'Cash on delivery',
              descVi: 'Kiểm tra hàng trước khi thanh toán',
              descEn: 'Inspect your order upon arrival',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--primary)',
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className="font-heading text-sm sm:text-base font-bold leading-snug"
                  style={{ color: 'var(--text)' }}
                >
                  {lang === 'vi' ? item.titleVi : item.titleEn}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? item.descVi : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
