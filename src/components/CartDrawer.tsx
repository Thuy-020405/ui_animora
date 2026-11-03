import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { CartItem, Language, Product } from '../types';
import {
  calculateCartSummary,
  formatVnd,
  getCartItemKey,
  resolveProductSpecDetails,
} from '../utils/cartLogic';
import { FREE_SHIPPING_THRESHOLD } from '../config/cartConstants';

interface CartDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  onUpdateQuantity: (itemKey: string, delta: number) => void;
  onRemoveItemWithUndo: (item: CartItem) => void;
  onAddToCart: (product: Product, quantity?: number, selectedSpec?: string) => void;
  onNavigateUrl: (path: string) => void;
  onContinueShopping?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  cart,
  products,
  onUpdateQuantity,
  onRemoveItemWithUndo,
  onAddToCart,
  onNavigateUrl,
  onContinueShopping,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) {
      setLiveAnnouncement('');
      return;
    }

    const prevFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const summary = calculateCartSummary(cart, '', products);
  const isEmpty = cart.length === 0;
  const showCrossSell = cart.length > 0 && cart.length <= 2;

  // Pick 2 compact in-stock products not currently in the cart
  const cartProductIds = new Set(cart.map((c) => c.productId));
  const crossSellProducts = products
    .filter(
      (p) =>
        !cartProductIds.has(p.id) &&
        (p.stock ?? 20) > 0 &&
        !p.badges?.includes('out_of_stock')
    )
    .slice(0, 2);

  const handleLinkNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPath: string
  ) => {
    // Allow middle-click or modifier-click to open natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClose();
    onNavigateUrl(targetPath);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your shopping cart'}
      data-testid="cart-drawer"
    >
      {/* Screen reader live region for quantity changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Dim overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Right drawer (440px on desktop, full width on mobile) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div
          ref={drawerRef}
          className="w-screen sm:w-[440px] shadow-2xl flex flex-col justify-between border-l transition-all duration-300"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Header */}
          <div
            className="px-5 sm:px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h3
                className="font-heading text-xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your cart'}
              </h3>
              {summary.totalQuantity > 0 && (
                <span
                  data-testid="drawer-cart-count"
                  className="px-2.5 py-0.5 rounded-full text-xs font-extrabold"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--primary)',
                  }}
                >
                  {summary.totalQuantity}
                </span>
              )}
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={lang === 'vi' ? 'Đóng giỏ hàng' : 'Close cart'}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free-shipping progress bar */}
          <div
            data-testid="drawer-free-shipping-bar"
            className="px-5 sm:px-6 py-3 border-b space-y-2"
            style={{
              backgroundColor: 'var(--bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="flex items-center gap-2 text-xs font-bold"
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
                      ? `Mua thêm ${formatVnd(summary.remainingForFreeShip)} để được miễn phí vận chuyển (từ ${formatVnd(FREE_SHIPPING_THRESHOLD)})`
                      : `Add ${formatVnd(summary.remainingForFreeShip)} more for free shipping (from ${formatVnd(FREE_SHIPPING_THRESHOLD)})`}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span style={{ color: 'var(--primary)' }}>
                    {lang === 'vi'
                      ? 'Đơn hàng của bạn đã đủ điều kiện miễn phí vận chuyển!'
                      : 'Your order qualifies for free shipping!'}
                  </span>
                </>
              )}
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--surface-2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${summary.freeShipProgressPercent}%`,
                  backgroundColor: 'var(--primary)',
                }}
              />
            </div>
          </div>

          {/* Items List & Cross-sell */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {isEmpty ? (
              <div
                data-testid="drawer-empty-state"
                className="py-12 text-center space-y-4"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--primary)',
                  }}
                >
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p
                  className="font-heading text-lg font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  {lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your cart is empty'}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi'
                    ? 'Hãy chọn thêm thức ăn, đồ chơi hoặc phụ kiện phù hợp cho bé cưng nhé.'
                    : 'Explore healthy food, toys, and accessories for your pet.'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    data-testid="drawer-continue-shopping-btn"
                    onClick={() => {
                      onClose();
                      if (onContinueShopping) {
                        onContinueShopping();
                      } else {
                        onNavigateUrl('/cua-hang');
                      }
                    }}
                    className="btn-primary min-h-[44px] px-6 py-2.5 rounded-full text-sm font-bold inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                  >
                    <span>
                      {lang === 'vi' ? 'Tiếp tục mua sắm' : 'Continue shopping'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
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
                    const displayName =
                      lang === 'en' && item.product.nameEn
                        ? item.product.nameEn
                        : item.product.name;
                    const unitPrice = item.unitPriceAtAdd ?? item.product.price;
                    const lineTotal = unitPrice * item.quantity;
                    const maxStock = resolved.stock > 0 ? resolved.stock : 25;
                    const productSlug =
                      item.product.slug || catalogProd.slug || item.productId;

                    return (
                      <div
                        key={itemKey}
                        data-testid={`drawer-item-${item.productId}`}
                        className="p-3.5 rounded-2xl border flex gap-3.5 items-start"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <a
                          href={`/cua-hang/${productSlug}`}
                          onClick={(e) =>
                            handleLinkNavigation(e, `/cua-hang/${productSlug}`)
                          }
                          className="w-18 h-18 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center p-1.5 focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: 'var(--border)',
                          }}
                        >
                          <img
                            src={item.product.image}
                            alt={displayName}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </a>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={`/cua-hang/${productSlug}`}
                              onClick={(e) =>
                                handleLinkNavigation(e, `/cua-hang/${productSlug}`)
                              }
                              className="font-heading text-sm font-bold leading-snug line-clamp-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm"
                              style={{ color: 'var(--text)' }}
                            >
                              {displayName}
                            </a>
                            <button
                              type="button"
                              data-testid={`drawer-remove-${item.productId}`}
                              onClick={() => onRemoveItemWithUndo(item)}
                              className="w-11 h-11 -mr-2 -mt-2 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                              style={{ color: 'var(--text-muted)' }}
                              aria-label={
                                lang === 'vi'
                                  ? 'Xóa khỏi giỏ hàng'
                                  : 'Remove from cart'
                              }
                              title={
                                lang === 'vi'
                                  ? 'Xóa khỏi giỏ hàng'
                                  : 'Remove from cart'
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p
                            className="text-xs font-medium"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {lang === 'vi' ? 'Quy cách: ' : 'Spec: '}
                            <span className="font-bold">{resolved.displaySpec}</span>
                          </p>

                          <div className="flex items-center justify-between pt-1.5 gap-2">
                            {/* Accessible Quantity Stepper */}
                            <div
                              className="inline-flex items-center rounded-full border"
                              style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                              }}
                            >
                              <button
                                type="button"
                                disabled={item.quantity <= 1}
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    const nextQty = item.quantity - 1;
                                    onUpdateQuantity(itemKey, -1);
                                    setLiveAnnouncement(
                                      lang === 'vi'
                                        ? `Số lượng: ${nextQty}`
                                        : `Quantity: ${nextQty}`
                                    );
                                  }
                                }}
                                aria-label={
                                  lang === 'vi'
                                    ? 'Giảm số lượng'
                                    : 'Decrease quantity'
                                }
                                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                style={{ color: 'var(--text)' }}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span
                                className="text-xs font-extrabold min-w-[28px] text-center"
                                style={{ color: 'var(--text)' }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                disabled={item.quantity >= maxStock}
                                onClick={() => {
                                  if (item.quantity < maxStock) {
                                    const nextQty = item.quantity + 1;
                                    onUpdateQuantity(itemKey, 1);
                                    setLiveAnnouncement(
                                      lang === 'vi'
                                        ? `Số lượng: ${nextQty}`
                                        : `Quantity: ${nextQty}`
                                    );
                                  }
                                }}
                                aria-label={
                                  lang === 'vi'
                                    ? 'Tăng số lượng'
                                    : 'Increase quantity'
                                }
                                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                                style={{ color: 'var(--text)' }}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Line total */}
                            <div className="text-right">
                              <span
                                className="font-extrabold text-sm block"
                                style={{ color: 'var(--primary)' }}
                              >
                                {formatVnd(lineTotal)}
                              </span>
                              {item.quantity > 1 && (
                                <span
                                  className="text-[11px] block"
                                  style={{ color: 'var(--text-muted)' }}
                                >
                                  {formatVnd(unitPrice)} /{' '}
                                  {lang === 'vi' ? 'sp' : 'ea'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shorten empty space when there are few items: "Gợi ý mua kèm" (You may also like) row of 2 compact products */}
                {showCrossSell && crossSellProducts.length > 0 && (
                  <div
                    data-testid="drawer-cross-sell"
                    className="pt-3 border-t space-y-2.5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles
                        className="w-4 h-4 shrink-0"
                        style={{ color: 'var(--primary)' }}
                      />
                      <h4
                        className="font-heading text-sm font-bold"
                        style={{ color: 'var(--primary)' }}
                      >
                        {lang === 'vi' ? 'Gợi ý mua kèm' : 'You may also like'}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {crossSellProducts.map((prod) => {
                        const prodName =
                          lang === 'en' && prod.nameEn ? prod.nameEn : prod.name;
                        return (
                          <div
                            key={prod.id}
                            data-testid={`drawer-cross-sell-item-${prod.id}`}
                            className="p-2.5 rounded-2xl border flex flex-col justify-between gap-2"
                            style={{
                              backgroundColor: 'var(--bg)',
                              borderColor: 'var(--border)',
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-11 h-11 rounded-xl border p-1 shrink-0 flex items-center justify-center"
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  borderColor: 'var(--border)',
                                }}
                              >
                                <img
                                  src={prod.image}
                                  alt={prodName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p
                                  className="text-xs font-bold line-clamp-2 leading-tight"
                                  style={{ color: 'var(--text)' }}
                                >
                                  {prodName}
                                </p>
                                <p
                                  className="text-xs font-extrabold mt-0.5"
                                  style={{ color: 'var(--primary)' }}
                                >
                                  {formatVnd(prod.price)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onAddToCart(prod, 1, prod.spec)}
                              className="btn-secondary w-full min-h-[38px] px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{lang === 'vi' ? 'Thêm nhanh' : 'Quick add'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: Subtotal, shipping note, and real navigation links */}
          <div
            className="p-5 sm:p-6 border-t space-y-4"
            style={{
              backgroundColor: 'var(--bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span
                  className="font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  {lang === 'vi' ? 'Tạm tính' : 'Subtotal'}
                </span>
                <span
                  data-testid="drawer-subtotal"
                  className="font-extrabold text-xl"
                  style={{ color: 'var(--primary)' }}
                >
                  {formatVnd(summary.subtotal)}
                </span>
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi'
                  ? 'Phí vận chuyển được tính ở bước thanh toán.'
                  : 'Shipping is calculated at checkout.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="/gio-hang"
                data-testid="drawer-view-cart-link"
                onClick={(e) => handleLinkNavigation(e, '/gio-hang')}
                className="btn-secondary min-h-[46px] px-4 rounded-full text-sm font-bold flex items-center justify-center text-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              >
                {lang === 'vi' ? 'Xem giỏ hàng' : 'View cart'}
              </a>

              {isEmpty ? (
                <button
                  type="button"
                  disabled
                  data-testid="drawer-checkout-link"
                  aria-disabled="true"
                  className="btn-primary min-h-[46px] px-4 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 opacity-50 cursor-not-allowed"
                >
                  <span>{lang === 'vi' ? 'Thanh toán →' : 'Checkout →'}</span>
                </button>
              ) : (
                <a
                  href="/thanh-toan"
                  data-testid="drawer-checkout-link"
                  onClick={(e) => handleLinkNavigation(e, '/thanh-toan')}
                  className="btn-primary min-h-[46px] px-4 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 shadow-md text-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Thanh toán →' : 'Checkout →'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
