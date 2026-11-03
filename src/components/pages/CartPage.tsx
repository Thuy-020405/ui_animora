import React, { useState } from 'react';
import {
  ChevronRight,
  Trash2,
  Bookmark,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Tag,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  PawPrint,
  Check,
  Sparkles,
} from 'lucide-react';
import { CartItem, Language, PageId, Product } from '../../types';
import {
  calculateCartSummary,
  CartItemValidation,
  formatVnd,
  getCartItemKey,
  resolveProductSpecDetails,
  validateCartForCheckout,
  validateCouponCode,
} from '../../utils/cartLogic';
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from '../../config/cartConstants';
import { ProductCard } from './ShopPage';

interface CartPageProps {
  lang: Language;
  darkMode?: boolean;
  cart: CartItem[];
  savedForLater: CartItem[];
  products: Product[];
  appliedCoupon: string;
  orderNote: string;
  redirectNotice: string | null;
  onClearRedirectNotice: () => void;
  onUpdateQuantity: (itemKey: string, delta: number) => void;
  onSetQuantity: (itemKey: string, newQty: number) => void;
  onChangeSpec: (itemKey: string, newSpecVi: string) => void;
  onRemoveItemWithUndo: (item: CartItem) => void;
  onSaveForLater: (item: CartItem) => void;
  onMoveSavedToCart: (item: CartItem) => void;
  onRemoveSavedItem: (itemKey: string) => void;
  onAcceptPriceChange: (itemKey: string) => void;
  onSimulatePriceChange?: (itemKey: string) => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onChangeOrderNote: (note: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onBuyNow?: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onNavigate: (page: PageId) => void;
  onNavigateUrl: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  lang,
  darkMode = false,
  cart,
  savedForLater,
  products,
  appliedCoupon,
  orderNote,
  redirectNotice,
  onClearRedirectNotice,
  onUpdateQuantity,
  onChangeSpec,
  onRemoveItemWithUndo,
  onSaveForLater,
  onMoveSavedToCart,
  onRemoveSavedItem,
  onAcceptPriceChange,
  onApplyCoupon,
  onRemoveCoupon,
  onChangeOrderNote,
  onAddToCart,
  onBuyNow,
  onNavigate,
  onNavigateUrl,
}) => {
  const [couponInput, setCouponInput] = useState(appliedCoupon || '');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [liveQuantityAnnouncement, setLiveQuantityAnnouncement] = useState('');
  const [openSpecSelectorKey, setOpenSpecSelectorKey] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});

  const summary = calculateCartSummary(cart, appliedCoupon, products);
  const checkoutValidation = validateCartForCheckout(cart, products);
  const isEmpty = cart.length === 0;

  const errorTextColor = darkMode ? '#FDA29B' : '#B42318';
  const errorBgColor = darkMode
    ? 'rgba(253, 162, 155, 0.14)'
    : 'rgba(180, 35, 24, 0.08)';
  const errorBorderColor = darkMode
    ? 'rgba(253, 162, 155, 0.4)'
    : 'rgba(180, 35, 24, 0.3)';

  // 4 recommended products for "Có thể bạn cũng thích" or Empty state featured products
  const cartProductIds = new Set(cart.map((c) => c.productId));
  const recommendedProducts = products
    .filter(
      (p) =>
        !cartProductIds.has(p.id) &&
        (p.stock ?? 20) > 0 &&
        !p.badges?.includes('out_of_stock')
    )
    .slice(0, 4);

  const featuredProducts =
    recommendedProducts.length >= 4
      ? recommendedProducts
      : products
          .filter((p) => (p.stock ?? 20) > 0 && !p.badges?.includes('out_of_stock'))
          .slice(0, 4);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPath: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigateUrl(targetPath);
  };

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    const trimmed = couponInput.trim();
    const res = validateCouponCode(trimmed, summary.subtotal, lang);
    if (!res.valid) {
      setCouponError(
        res.errorMessage ||
          (lang === 'vi'
            ? 'Mã không hợp lệ hoặc đã hết hạn'
            : 'Invalid or expired coupon code')
      );
      return;
    }

    onApplyCoupon(res.normalizedCode);
    setCouponInput(res.normalizedCode);
    setCouponSuccess(
      lang === 'vi'
        ? `Đã áp dụng mã ${res.normalizedCode} (-${formatVnd(res.discountAmount)})`
        : `Applied code ${res.normalizedCode} (-${formatVnd(res.discountAmount)})`
    );
  };

  const handleCardAddToCart = (product: Product) => {
    onAddToCart(product, 1, product.spec);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleCardBuyNow = (product: Product) => {
    if (onBuyNow) {
      onBuyNow(product, 1, product.spec);
    } else {
      onAddToCart(product, 1, product.spec);
      onNavigateUrl('/thanh-toan');
    }
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistedIds((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleOpenProductDetail = (slug: string) => {
    onNavigateUrl(`/cua-hang/${slug}`);
  };

  const renderSavedForLaterSection = () => {
    if (savedForLater.length === 0) return null;
    return (
      <section
        data-testid="saved-for-later-section"
        aria-labelledby="saved-for-later-heading"
        className="rounded-[24px] border p-5 sm:p-6 space-y-4"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h2
              id="saved-for-later-heading"
              className="font-heading text-xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi'
                ? `Đã lưu để mua sau (${savedForLater.length})`
                : `Saved for later (${savedForLater.length})`}
            </h2>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {savedForLater.map((item) => {
            const catalogProd =
              products.find((p) => p.id === item.productId) || item.product;
            const resolved = resolveProductSpecDetails(
              catalogProd,
              item.selectedSpec,
              lang
            );
            const itemKey = getCartItemKey(item.productId, item.selectedSpec);
            const displayName =
              lang === 'en' && item.product.nameEn
                ? item.product.nameEn
                : item.product.name;
            const productSlug =
              item.product.slug || catalogProd.slug || item.productId;
            const isOutOfStock = resolved.stock <= 0;

            return (
              <div
                key={itemKey}
                data-testid={`saved-item-${item.productId}`}
                className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <a
                    href={`/cua-hang/${productSlug}`}
                    onClick={(e) =>
                      handleLinkClick(e, `/cua-hang/${productSlug}`)
                    }
                    className="w-18 h-18 rounded-2xl border p-2 shrink-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={displayName}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <div className="min-w-0 space-y-1">
                    <a
                      href={`/cua-hang/${productSlug}`}
                      onClick={(e) =>
                        handleLinkClick(e, `/cua-hang/${productSlug}`)
                      }
                      className="font-heading text-base font-bold line-clamp-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm"
                      style={{ color: 'var(--text)' }}
                    >
                      {displayName}
                    </a>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {resolved.displaySpec}
                    </p>
                    <p
                      className="text-sm font-extrabold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {formatVnd(resolved.unitPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    data-testid={`move-to-cart-${item.productId}`}
                    onClick={() => onMoveSavedToCart(item)}
                    className="btn-secondary min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {lang === 'vi' ? 'Chuyển vào giỏ' : 'Move to cart'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveSavedItem(itemKey)}
                    aria-label={
                      lang === 'vi'
                        ? `Xóa ${displayName} khỏi danh sách đã lưu`
                        : `Remove ${displayName} from saved list`
                    }
                    className="min-h-[44px] px-3 py-2 rounded-full text-xs font-bold transition-colors hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Xóa' : 'Remove'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div
      data-testid="cart-page"
      className="pt-[calc(var(--nav-h)+24px)] pb-36 lg:pb-20 min-h-screen relative z-10"
    >
      {/* Screen-reader live region for quantity updates */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="cart-live-region"
      >
        {liveQuantityAnnouncement}
      </div>

      <div className="shared-container space-y-8">
        {/* Page Intro Header */}
        <div className="space-y-2.5 max-w-2xl">
          <span
            data-testid="cart-page-eyebrow"
            className="block uppercase font-bold"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'GIỎ HÀNG' : 'SHOPPING CART'}
          </span>
          <h1
            className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your cart'}{' '}
            <span
              data-testid="cart-page-item-count"
              className="text-lg sm:text-2xl font-bold align-middle"
              style={{ color: 'var(--text-muted)' }}
            >
              ({summary.totalQuantity}{' '}
              {lang === 'vi'
                ? 'sản phẩm'
                : summary.totalQuantity === 1
                ? 'item'
                : 'items'}
              )
            </span>
          </h1>
          <p
            data-testid="cart-page-subtitle"
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {lang === 'vi'
              ? 'Kiểm tra sản phẩm, chọn quy cách và áp dụng mã ưu đãi trước khi thanh toán.'
              : 'Review your items, select package sizes, and apply promo codes before checkout.'}
          </p>
        </div>

        {/* Redirect or Validation Notice Banner */}
        {redirectNotice && (
          <div
            role="alert"
            data-testid="cart-redirect-notice"
            className="p-4 rounded-2xl border flex items-center justify-between gap-3"
            style={{
              backgroundColor: errorBgColor,
              borderColor: errorBorderColor,
              color: errorTextColor,
            }}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{redirectNotice}</span>
            </div>
            <button
              type="button"
              onClick={onClearRedirectNotice}
              className="min-h-[36px] px-3 py-1 rounded-full text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
            >
              {lang === 'vi' ? 'Đã hiểu' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Empty State */}
        {isEmpty ? (
          <div className="space-y-10">
            <div
              data-testid="cart-page-empty-state"
              className="rounded-[24px] border p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-5"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--primary)',
                }}
              >
                <PawPrint className="w-10 h-10" />
              </div>
              <h2
                className="font-heading text-2xl sm:text-3xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? 'Giỏ hàng của bạn đang trống'
                  : 'Your cart is empty'}
              </h2>
              <p
                className="text-sm sm:text-base max-w-md mx-auto font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi'
                  ? 'Khám phá hạt hữu cơ, pate tươi, đồ chơi an toàn và sản phẩm chăm sóc sức khỏe cho các bé thú cưng tại Animora.'
                  : 'Discover organic kibble, fresh wet food, safe toys, and veterinary care essentials for your beloved pets.'}
              </p>
              <div className="pt-2">
                <a
                  href="/cua-hang"
                  data-testid="empty-cart-explore-btn"
                  onClick={(e) => handleLinkClick(e, '/cua-hang')}
                  className="btn-primary min-h-[48px] px-8 py-3 rounded-full text-base font-bold inline-flex items-center justify-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {lang === 'vi' ? 'Khám phá cửa hàng' : 'Explore shop'}
                  </span>
                </a>
              </div>
            </div>

            {/* Saved for later even when cart is empty */}
            {renderSavedForLaterSection()}

            {/* Row of featured products */}
            <section
              aria-labelledby="empty-cart-featured-heading"
              className="space-y-5"
            >
              <h2
                id="empty-cart-featured-heading"
                className="font-heading text-2xl sm:text-3xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Sản phẩm nổi bật' : 'Featured products'}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    isAdded={Boolean(addedItemIds[product.id])}
                    isWishlisted={Boolean(wishlistedIds[product.id])}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCartClick={handleCardAddToCart}
                    onBuyNowClick={handleCardBuyNow}
                    onOpenProductDetail={handleOpenProductDetail}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Two-column Desktop Layout: LEFT (~62%) Item List, RIGHT (~38%) Sticky Summary */
          <div className="flex flex-col lg:flex-row items-start gap-7">
            {/* LEFT COLUMN (~62%) */}
            <div className="w-full lg:w-[62%] space-y-8 min-w-0">
              {/* Blocking Checkout Alert if any item is out-of-stock or price-changed */}
              {!checkoutValidation.isValid && (
                <div
                  role="alert"
                  data-testid="cart-blocking-alert"
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: errorBgColor,
                    borderColor: errorBorderColor,
                    color: errorTextColor,
                  }}
                >
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm font-bold leading-snug">
                    {lang === 'vi'
                      ? checkoutValidation.blockingMessageVi
                      : checkoutValidation.blockingMessageEn}
                  </div>
                </div>
              )}

              {/* Cart Items List Card */}
              <div
                className="rounded-[24px] border p-4 sm:p-6 divide-y"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {cart.map((item) => {
                  const catalogProd =
                    products.find((p) => p.id === item.productId) || item.product;
                  const resolved = resolveProductSpecDetails(
                    catalogProd,
                    item.selectedSpec,
                    lang
                  );
                  const itemKey = getCartItemKey(
                    item.productId,
                    item.selectedSpec
                  );
                  const validation: CartItemValidation | undefined =
                    checkoutValidation.itemValidations[itemKey];

                  const displayName =
                    lang === 'en' && item.product.nameEn
                      ? item.product.nameEn
                      : item.product.name;
                  const productSlug =
                    item.product.slug || catalogProd.slug || item.productId;
                  const unitPrice = item.unitPriceAtAdd ?? item.product.price;
                  const oldPrice = resolved.oldPrice;
                  const lineTotal = unitPrice * item.quantity;
                  const hasMultipleSpecs =
                    (resolved.specOptions?.length || 0) > 1;
                  const isSpecOpen = openSpecSelectorKey === itemKey;
                  const maxStock =
                    validation && validation.stock > 0 ? validation.stock : 25;

                  return (
                    <div
                      key={itemKey}
                      data-testid={`cart-row-${item.productId}`}
                      className="py-5 first:pt-1 last:pb-1 space-y-3"
                    >
                      {/* Out-of-stock or Price-changed Row Banner */}
                      {validation?.isOutOfStock && (
                        <div
                          role="alert"
                          data-testid={`row-out-of-stock-${item.productId}`}
                          className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold"
                          style={{
                            backgroundColor: errorBgColor,
                            borderColor: errorBorderColor,
                            color: errorTextColor,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>
                              {lang === 'vi'
                                ? 'Sản phẩm đã hết hàng'
                                : 'This item is out of stock'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItemWithUndo(item)}
                            className="px-3 py-1 rounded-full text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                          >
                            {lang === 'vi' ? 'Xóa khỏi giỏ' : 'Remove item'}
                          </button>
                        </div>
                      )}

                      {!validation?.isOutOfStock && validation?.hasPriceChanged && (
                        <div
                          role="alert"
                          data-testid={`row-price-changed-${item.productId}`}
                          className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold"
                          style={{
                            backgroundColor: errorBgColor,
                            borderColor: errorBorderColor,
                            color: errorTextColor,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>
                              {lang === 'vi'
                                ? `Giá đã thay đổi từ ${formatVnd(validation.oldRecordedPrice)} thành ${formatVnd(validation.newCatalogPrice)}`
                                : `Price changed from ${formatVnd(validation.oldRecordedPrice)} to ${formatVnd(validation.newCatalogPrice)}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-testid={`accept-price-${item.productId}`}
                              onClick={() => onAcceptPriceChange(itemKey)}
                              className="px-3 py-1.5 rounded-full text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                              style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--on-primary)',
                              }}
                            >
                              {lang === 'vi'
                                ? 'Chấp nhận giá mới'
                                : 'Accept new price'}
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveItemWithUndo(item)}
                              className="px-2.5 py-1 rounded-full text-xs font-bold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                            >
                              {lang === 'vi' ? 'Xóa' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 items-start">
                        {/* 88px Product Image */}
                        <a
                          href={`/cua-hang/${productSlug}`}
                          onClick={(e) =>
                            handleLinkClick(e, `/cua-hang/${productSlug}`)
                          }
                          className="w-[88px] h-[88px] rounded-2xl border p-2 shrink-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: 'var(--border)',
                          }}
                        >
                          <img
                            src={item.product.image}
                            alt={displayName}
                            className={`w-full h-full object-contain ${
                              validation?.isOutOfStock ? 'opacity-50' : ''
                            }`}
                            referrerPolicy="no-referrer"
                          />
                        </a>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="min-w-0 space-y-1">
                              <a
                                href={`/cua-hang/${productSlug}`}
                                onClick={(e) =>
                                  handleLinkClick(e, `/cua-hang/${productSlug}`)
                                }
                                data-testid={`cart-item-name-${item.productId}`}
                                className="font-heading text-base sm:text-lg font-bold leading-snug line-clamp-2 break-words hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm block"
                                style={{ color: 'var(--text)' }}
                              >
                                {displayName}
                              </a>

                              {/* Spec & "Đổi quy cách" selector */}
                              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                <span
                                  data-testid={`cart-item-spec-${item.productId}`}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                                  style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)',
                                  }}
                                >
                                  {resolved.displaySpec}
                                </span>

                                {hasMultipleSpecs && (
                                  <button
                                    type="button"
                                    data-testid={`change-spec-toggle-${item.productId}`}
                                    aria-expanded={isSpecOpen}
                                    onClick={() =>
                                      setOpenSpecSelectorKey((prev) =>
                                        prev === itemKey ? null : itemKey
                                      )
                                    }
                                    className="text-xs font-extrabold underline px-1.5 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                    style={{ color: 'var(--primary)' }}
                                  >
                                    {lang === 'vi'
                                      ? 'Đổi quy cách'
                                      : 'Change spec'}
                                  </button>
                                )}
                              </div>

                              {/* Inline Spec Selector Pills when toggled */}
                              {hasMultipleSpecs && isSpecOpen && (
                                <div
                                  data-testid={`spec-selector-panel-${item.productId}`}
                                  className="pt-1.5 flex flex-wrap gap-1.5"
                                >
                                  {resolved.specOptions.map((opt) => {
                                    const isSelected =
                                      opt.labelVi === resolved.specLabelVi;
                                    const label =
                                      lang === 'en' ? opt.labelEn : opt.labelVi;
                                    return (
                                      <button
                                        key={opt.labelVi}
                                        type="button"
                                        onClick={() => {
                                          onChangeSpec(itemKey, opt.labelVi);
                                          setOpenSpecSelectorKey(null);
                                        }}
                                        className="min-h-[36px] px-3 py-1 rounded-full text-xs font-bold border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                        style={{
                                          backgroundColor: isSelected
                                            ? 'var(--primary)'
                                            : 'var(--bg)',
                                          color: isSelected
                                            ? 'var(--on-primary)'
                                            : 'var(--text)',
                                          borderColor: isSelected
                                            ? 'var(--primary)'
                                            : 'var(--border)',
                                        }}
                                      >
                                        {label} · {formatVnd(opt.price)}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Unit price & struck-through old price */}
                            <div className="sm:text-right shrink-0">
                              <div className="flex sm:justify-end items-baseline gap-2">
                                <span
                                  data-testid={`cart-item-unit-price-${item.productId}`}
                                  className="text-sm sm:text-base font-extrabold"
                                  style={{ color: 'var(--text)' }}
                                >
                                  {formatVnd(unitPrice)}
                                </span>
                                {oldPrice && oldPrice > unitPrice && (
                                  <span
                                    className="text-xs line-through font-medium"
                                    style={{ color: 'var(--text-muted)' }}
                                  >
                                    {formatVnd(oldPrice)}
                                  </span>
                                )}
                              </div>
                              <span
                                className="text-[11px] font-medium hidden sm:block"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {lang === 'vi' ? 'Đơn giá' : 'Unit price'}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Stepper, Low Stock Badge, Line Total, and Action Buttons */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                              {/* Quantity Stepper (44px touch targets) */}
                              <div
                                className="inline-flex items-center rounded-full border"
                                style={{
                                  backgroundColor: 'var(--bg)',
                                  borderColor: 'var(--border)',
                                }}
                              >
                                <button
                                  type="button"
                                  data-testid={`qty-decrease-${item.productId}`}
                                  disabled={
                                    item.quantity <= 1 ||
                                    Boolean(validation?.isOutOfStock)
                                  }
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      const nextQty = item.quantity - 1;
                                      onUpdateQuantity(itemKey, -1);
                                      setLiveQuantityAnnouncement(
                                        lang === 'vi'
                                          ? `Số lượng: ${nextQty}`
                                          : `Quantity: ${nextQty}`
                                      );
                                    }
                                  }}
                                  aria-label={
                                    lang === 'vi'
                                      ? `Giảm số lượng ${displayName}`
                                      : `Decrease quantity for ${displayName}`
                                  }
                                  className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                  style={{ color: 'var(--text)' }}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span
                                  data-testid={`qty-value-${item.productId}`}
                                  className="text-sm font-extrabold min-w-[34px] text-center"
                                  style={{ color: 'var(--text)' }}
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  data-testid={`qty-increase-${item.productId}`}
                                  disabled={
                                    item.quantity >= maxStock ||
                                    Boolean(validation?.isOutOfStock)
                                  }
                                  onClick={() => {
                                    if (item.quantity < maxStock) {
                                      const nextQty = item.quantity + 1;
                                      onUpdateQuantity(itemKey, 1);
                                      setLiveQuantityAnnouncement(
                                        lang === 'vi'
                                          ? `Số lượng: ${nextQty}`
                                          : `Quantity: ${nextQty}`
                                      );
                                    }
                                  }}
                                  aria-label={
                                    lang === 'vi'
                                      ? `Tăng số lượng ${displayName}`
                                      : `Increase quantity for ${displayName}`
                                  }
                                  className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                  style={{ color: 'var(--text)' }}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Low Stock Warning */}
                              {validation?.isLowStock && (
                                <span
                                  data-testid={`low-stock-badge-${item.productId}`}
                                  className="text-xs font-extrabold px-2.5 py-1 rounded-full border"
                                  style={{
                                    backgroundColor: errorBgColor,
                                    borderColor: errorBorderColor,
                                    color: errorTextColor,
                                  }}
                                >
                                  {lang === 'vi'
                                    ? `Chỉ còn ${validation.stock} sản phẩm`
                                    : `Only ${validation.stock} left in stock`}
                                </span>
                              )}
                            </div>

                            {/* Line Total */}
                            <div className="text-right ml-auto">
                              <span
                                data-testid={`cart-item-line-total-${item.productId}`}
                                className="font-heading text-lg sm:text-xl font-extrabold block"
                                style={{ color: 'var(--primary)' }}
                              >
                                {formatVnd(lineTotal)}
                              </span>
                            </div>
                          </div>

                          {/* Row Action Links: "Lưu để mua sau" & "Xóa" */}
                          <div className="pt-1 flex flex-wrap items-center gap-4">
                            <button
                              type="button"
                              data-testid={`save-for-later-${item.productId}`}
                              onClick={() => onSaveForLater(item)}
                              className="min-h-[44px] px-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>
                                {lang === 'vi'
                                  ? 'Lưu để mua sau'
                                  : 'Save for later'}
                              </span>
                            </button>

                            <button
                              type="button"
                              data-testid={`remove-item-${item.productId}`}
                              onClick={() => onRemoveItemWithUndo(item)}
                              aria-label={
                                lang === 'vi'
                                  ? 'Xóa khỏi giỏ hàng'
                                  : 'Remove from cart'
                              }
                              className="min-h-[44px] px-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer"
                              style={{ color: errorTextColor }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{lang === 'vi' ? 'Xóa' : 'Remove'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Saved for Later List */}
              {renderSavedForLaterSection()}

              {/* Below the list: "Có thể bạn cũng thích" (You may also like) with 4 product cards */}
              {featuredProducts.length > 0 && (
                <section
                  data-testid="cart-you-may-also-like"
                  aria-labelledby="cart-recommendations-heading"
                  className="pt-4 space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className="w-5 h-5"
                        style={{ color: 'var(--primary)' }}
                      />
                      <h2
                        id="cart-recommendations-heading"
                        className="font-heading text-2xl sm:text-3xl font-extrabold"
                        style={{ color: 'var(--primary)' }}
                      >
                        {lang === 'vi'
                          ? 'Có thể bạn cũng thích'
                          : 'You may also like'}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                    {featuredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        lang={lang}
                        isAdded={Boolean(addedItemIds[product.id])}
                        isWishlisted={Boolean(wishlistedIds[product.id])}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCartClick={handleCardAddToCart}
                        onBuyNowClick={handleCardBuyNow}
                        onOpenProductDetail={handleOpenProductDetail}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN (~38%): Sticky Order Summary on desktop */}
            <aside
              aria-label={
                lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary'
              }
              className="w-full lg:w-[38%] lg:sticky lg:top-[calc(var(--nav-h)+24px)] space-y-4"
            >
              <div
                data-testid="cart-summary-card"
                className="rounded-[24px] border p-5 sm:p-7 space-y-5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-xl sm:text-2xl font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary'}
                </h2>

                {/* Free-shipping progress bar */}
                <div
                  data-testid="cart-free-shipping-box"
                  className="p-3.5 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {summary.remainingForFreeShip > 0 ? (
                      <>
                        <Truck
                          className="w-4 h-4 shrink-0"
                          style={{ color: 'var(--primary)' }}
                        />
                        <span>
                          {lang === 'vi'
                            ? `Mua thêm ${formatVnd(summary.remainingForFreeShip)} để được miễn phí vận chuyển`
                            : `Add ${formatVnd(summary.remainingForFreeShip)} more for free shipping`}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span style={{ color: 'var(--primary)' }}>
                          {lang === 'vi'
                            ? 'Bạn được miễn phí vận chuyển!'
                            : 'You unlocked free shipping!'}
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className="w-full h-2.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--surface-2)' }}
                  >
                    <div
                      data-testid="cart-free-shipping-progress"
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${summary.freeShipProgressPercent}%`,
                        backgroundColor: 'var(--primary)',
                      }}
                    />
                  </div>
                </div>

                {/* Coupon Field "Mã giảm giá" with "Áp dụng" */}
                <div className="space-y-2">
                  <label
                    htmlFor="cart-coupon-input"
                    className="block text-xs sm:text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {lang === 'vi' ? 'Mã giảm giá' : 'Coupon code'}
                  </label>
                  <form
                    onSubmit={handleApplyCouponSubmit}
                    className="flex gap-2"
                    noValidate
                  >
                    <div className="relative flex-1">
                      <Tag
                        className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <input
                        id="cart-coupon-input"
                        data-testid="cart-coupon-input"
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          if (couponError) setCouponError(null);
                        }}
                        placeholder={
                          lang === 'vi'
                            ? 'Nhập mã (VD: ANIMORA10)'
                            : 'Enter code (e.g. ANIMORA10)'
                        }
                        className="form-input w-full pl-9 pr-3 uppercase font-bold text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      data-testid="cart-coupon-apply-btn"
                      className="btn-secondary min-h-[48px] px-4 rounded-2xl text-sm font-bold shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                    >
                      {lang === 'vi' ? 'Áp dụng' : 'Apply'}
                    </button>
                  </form>

                  {/* Coupon feedback */}
                  {couponError && (
                    <p
                      role="alert"
                      data-testid="cart-coupon-error"
                      className="text-xs sm:text-[13px] font-bold flex items-center gap-1.5 pt-0.5"
                      style={{ color: errorTextColor }}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </p>
                  )}

                  {summary.appliedCouponCode && (
                    <div
                      data-testid="cart-applied-coupon-tag"
                      className="flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        borderColor: 'var(--border)',
                        color: 'var(--primary)',
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {lang === 'vi'
                            ? `Mã ${summary.appliedCouponCode}: -${formatVnd(summary.discountAmount)}`
                            : `Code ${summary.appliedCouponCode}: -${formatVnd(summary.discountAmount)}`}
                        </span>
                      </span>
                      <button
                        type="button"
                        data-testid="cart-remove-coupon-btn"
                        onClick={() => {
                          onRemoveCoupon();
                          setCouponInput('');
                          setCouponSuccess(null);
                          setCouponError(null);
                        }}
                        className="underline font-extrabold ml-2 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                      >
                        {lang === 'vi' ? 'Gỡ' : 'Remove'}
                      </button>
                    </div>
                  )}
                  {couponSuccess && !couponError && !summary.appliedCouponCode && (
                    <p
                      className="text-xs font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {couponSuccess}
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div
                  className="space-y-3 pt-3 border-t text-sm"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {lang === 'vi' ? 'Tạm tính' : 'Subtotal'}
                    </span>
                    <span
                      data-testid="cart-summary-subtotal"
                      className="font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {formatVnd(summary.subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {lang === 'vi'
                        ? 'Phí vận chuyển tạm tính'
                        : 'Estimated shipping'}
                    </span>
                    <span
                      data-testid="cart-summary-shipping"
                      className="font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {summary.shippingFee === 0
                        ? lang === 'vi'
                          ? 'Miễn phí (0đ)'
                          : 'Free (0đ)'
                        : formatVnd(STANDARD_SHIPPING_FEE)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {lang === 'vi' ? 'Giảm giá' : 'Discount'}
                    </span>
                    <span
                      data-testid="cart-summary-discount"
                      className="font-bold"
                      style={{
                        color:
                          summary.discountAmount > 0
                            ? 'var(--primary)'
                            : 'var(--text)',
                      }}
                    >
                      {summary.discountAmount > 0
                        ? `-${formatVnd(summary.discountAmount)}`
                        : '0đ'}
                    </span>
                  </div>

                  <div
                    className="pt-3 border-t flex items-baseline justify-between"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span
                      className="text-base font-extrabold"
                      style={{ color: 'var(--text)' }}
                    >
                      {lang === 'vi' ? 'Tổng cộng' : 'Total'}
                    </span>
                    <span
                      data-testid="cart-summary-total"
                      className="font-heading text-2xl sm:text-3xl font-extrabold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {formatVnd(summary.total)}
                    </span>
                  </div>
                </div>

                {/* Optional Order Note */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="cart-order-note"
                    className="block text-xs sm:text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {lang === 'vi'
                      ? 'Ghi chú đơn hàng (không bắt buộc)'
                      : 'Order note (optional)'}
                  </label>
                  <textarea
                    id="cart-order-note"
                    data-testid="cart-order-note"
                    rows={2}
                    value={orderNote}
                    onChange={(e) => onChangeOrderNote(e.target.value)}
                    placeholder={
                      lang === 'vi'
                        ? 'Ví dụ: Giao giờ hành chính, gọi trước khi giao...'
                        : 'E.g., Deliver during business hours, call before arrival...'
                    }
                    className="w-full rounded-2xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]"
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  />
                </div>

                {/* Primary CTA: "Tiến hành thanh toán" (full width, 52px) */}
                <div className="space-y-3 pt-1">
                  {checkoutValidation.isValid ? (
                    <a
                      href="/thanh-toan"
                      data-testid="cart-proceed-checkout-btn"
                      onClick={(e) => handleLinkClick(e, '/thanh-toan')}
                      className="btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                    >
                      <span>
                        {lang === 'vi'
                          ? 'Tiến hành thanh toán'
                          : 'Proceed to checkout'}
                      </span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      data-testid="cart-proceed-checkout-btn"
                      aria-disabled="true"
                      className="btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                    >
                      <span>
                        {lang === 'vi'
                          ? 'Tiến hành thanh toán'
                          : 'Proceed to checkout'}
                      </span>
                    </button>
                  )}

                  <div className="text-center">
                    <a
                      href="/cua-hang"
                      data-testid="cart-continue-shopping-link"
                      onClick={(e) => handleLinkClick(e, '/cua-hang')}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-full cursor-pointer"
                      style={{ color: 'var(--primary)' }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>
                        {lang === 'vi'
                          ? 'Tiếp tục mua sắm'
                          : 'Continue shopping'}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Trust Row: Giao nhanh, Đổi trả 7 ngày, Hàng chính hãng, COD */}
                <div
                  className="pt-4 border-t grid grid-cols-2 gap-2.5 text-xs font-bold"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Truck
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>
                      {lang === 'vi' ? 'Giao nhanh' : 'Fast delivery'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>
                      {lang === 'vi' ? 'Đổi trả 7 ngày' : '7-day returns'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>
                      {lang === 'vi' ? 'Hàng chính hãng' : '100% authentic'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>
                      {lang === 'vi' ? 'COD' : 'Cash on delivery'}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Mobile Fixed Bottom Checkout Bar (hidden on lg+) */}
      {!isEmpty && (
        <div
          data-testid="cart-mobile-bottom-bar"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-4 py-3 shadow-2xl"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            <div>
              <span
                className="text-xs font-bold block"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi' ? 'Tổng thanh toán' : 'Total'}
              </span>
              <span
                data-testid="cart-mobile-total"
                className="font-heading text-xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {formatVnd(summary.total)}
              </span>
            </div>

            {checkoutValidation.isValid ? (
              <a
                href="/thanh-toan"
                data-testid="cart-mobile-checkout-btn"
                onClick={(e) => handleLinkClick(e, '/thanh-toan')}
                className="btn-primary min-h-[48px] px-6 rounded-full text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              >
                <span>{lang === 'vi' ? 'Thanh toán' : 'Checkout'}</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                data-testid="cart-mobile-checkout-btn"
                className="btn-primary min-h-[48px] px-6 rounded-full text-sm font-extrabold inline-flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              >
                <span>{lang === 'vi' ? 'Thanh toán' : 'Checkout'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
