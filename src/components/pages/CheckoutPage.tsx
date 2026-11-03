import React, { useEffect, useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  FileText,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import { CartItem, Language, PageId, Product, UserAccount } from '../../types';
import {
  calculateCartSummary,
  formatVnd,
  getCartItemKey,
  resolveProductSpecDetails,
  validateCartForCheckout,
} from '../../utils/cartLogic';
import { STANDARD_SHIPPING_FEE } from '../../config/cartConstants';

interface CheckoutPageProps {
  lang: Language;
  darkMode?: boolean;
  cart: CartItem[];
  products: Product[];
  currentUser: UserAccount | null;
  appliedCoupon: string;
  orderNote: string;
  onChangeOrderNote: (note: string) => void;
  onReturnToCartWithNotice: (notice: string) => void;
  onCompleteOrder: (orderDetails: {
    orderCode: string;
    recipientName: string;
    phone: string;
    address: string;
    paymentMethod: 'cod' | 'bank';
    note: string;
    total: number;
  }) => void;
  onNavigate: (page: PageId) => void;
  onNavigateUrl: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  lang,
  darkMode = false,
  cart,
  products,
  currentUser,
  appliedCoupon,
  orderNote,
  onChangeOrderNote,
  onReturnToCartWithNotice,
  onCompleteOrder,
  onNavigate,
  onNavigateUrl,
}) => {
  const defaultAddress =
    currentUser?.addresses?.find((a) => a.isDefault)?.addressLine ||
    currentUser?.addresses?.[0]?.addressLine ||
    '';

  const [recipientName, setRecipientName] = useState(
    currentUser?.fullName || ''
  );
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(defaultAddress);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [errors, setErrors] = useState<{
    recipientName?: string;
    phone?: string;
    address?: string;
  }>({});
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderCode: string;
    recipientName: string;
    phone: string;
    address: string;
    paymentMethod: 'cod' | 'bank';
    note: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  // Re-validate stock and prices when entering checkout
  useEffect(() => {
    if (submittedOrder) return;

    if (cart.length === 0) {
      onReturnToCartWithNotice(
        lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your cart is empty'
      );
      return;
    }

    const validation = validateCartForCheckout(cart, products);
    if (!validation.isValid) {
      const msg =
        lang === 'vi'
          ? validation.blockingMessageVi ||
            'Giỏ hàng có thay đổi về giá hoặc tồn kho. Vui lòng kiểm tra lại.'
          : validation.blockingMessageEn ||
            'Cart prices or stock have changed. Please review your cart.';
      onReturnToCartWithNotice(msg);
    }
  }, [cart, products, lang, onReturnToCartWithNotice, submittedOrder]);

  const summary = calculateCartSummary(cart, appliedCoupon, products);
  const errorTextColor = darkMode ? '#FDA29B' : '#B42318';

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

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Re-validate stock and prices on submit
    if (cart.length === 0) {
      onReturnToCartWithNotice(
        lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your cart is empty'
      );
      return;
    }

    const validation = validateCartForCheckout(cart, products);
    if (!validation.isValid) {
      const msg =
        lang === 'vi'
          ? validation.blockingMessageVi ||
            'Giỏ hàng có thay đổi về giá hoặc tồn kho. Vui lòng kiểm tra lại.'
          : validation.blockingMessageEn ||
            'Cart prices or stock have changed. Please review your cart.';
      onReturnToCartWithNotice(msg);
      return;
    }

    const nextErrors: {
      recipientName?: string;
      phone?: string;
      address?: string;
    } = {};

    if (!recipientName.trim()) {
      nextErrors.recipientName =
        lang === 'vi'
          ? 'Vui lòng nhập họ tên người nhận'
          : 'Please enter recipient name';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      nextErrors.phone =
        lang === 'vi'
          ? 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số)'
          : 'Please enter a valid phone number';
    }
    if (!address.trim()) {
      nextErrors.address =
        lang === 'vi'
          ? 'Vui lòng nhập địa chỉ nhận hàng'
          : 'Please enter shipping address';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const orderCode = `DH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderInfo = {
      orderCode,
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      note: orderNote.trim(),
      total: summary.total,
      itemsCount: summary.totalQuantity,
    };

    setSubmittedOrder(orderInfo);
    onCompleteOrder(orderInfo);
  };

  if (submittedOrder) {
    return (
      <div
        data-testid="checkout-success"
        className="pt-[calc(var(--nav-h)+32px)] pb-20 min-h-screen relative z-10"
      >
        <div className="shared-container max-w-2xl mx-auto">
          <div
            className="rounded-[24px] border p-8 sm:p-12 text-center space-y-6"
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
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'ĐẶT HÀNG THÀNH CÔNG' : 'ORDER CONFIRMED'}
              </span>
              <h1
                className="font-heading text-2xl sm:text-4xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? `Cảm ơn ${submittedOrder.recipientName}!`
                  : `Thank you, ${submittedOrder.recipientName}!`}
              </h1>
              <p
                className="text-sm sm:text-base font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {lang === 'vi'
                  ? `Mã đơn hàng ${submittedOrder.orderCode} đang được đội ngũ Animora chuẩn bị đóng gói.`
                  : `Order ${submittedOrder.orderCode} is being prepared by the Animora team.`}
              </p>
            </div>

            <div
              className="p-5 rounded-2xl border text-left space-y-2.5 text-sm"
              style={{
                backgroundColor: 'var(--bg)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex justify-between gap-2">
                <span style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? 'Mã đơn hàng:' : 'Order code:'}
                </span>
                <span className="font-extrabold" style={{ color: 'var(--primary)' }}>
                  {submittedOrder.orderCode}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? 'Người nhận:' : 'Recipient:'}
                </span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>
                  {submittedOrder.recipientName} · {submittedOrder.phone}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? 'Địa chỉ:' : 'Address:'}
                </span>
                <span
                  className="font-bold text-right"
                  style={{ color: 'var(--text)' }}
                >
                  {submittedOrder.address}
                </span>
              </div>
              {submittedOrder.note && (
                <div className="flex justify-between gap-2">
                  <span style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Ghi chú:' : 'Order note:'}
                  </span>
                  <span
                    className="font-bold text-right"
                    style={{ color: 'var(--text)' }}
                  >
                    {submittedOrder.note}
                  </span>
                </div>
              )}
              <div
                className="pt-2.5 border-t flex justify-between items-baseline"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Tổng thanh toán:' : 'Total amount:'}
                </span>
                <span
                  className="font-heading text-xl font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  {formatVnd(submittedOrder.total)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/cua-hang"
                onClick={(e) => handleLinkClick(e, '/cua-hang')}
                className="btn-primary min-h-[48px] px-7 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {lang === 'vi' ? 'Tiếp tục mua sắm' : 'Continue shopping'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="checkout-page"
      className="pt-[calc(var(--nav-h)+24px)] pb-20 min-h-screen relative z-10"
    >
      <div className="shared-container space-y-8">
        {/* Page Intro Header */}
        <div className="space-y-2.5 max-w-2xl">
          <span
            data-testid="checkout-page-eyebrow"
            className="block uppercase font-bold"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'THANH TOÁN' : 'CHECKOUT'}
          </span>
          <h1
            className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'Thanh toán đơn hàng' : 'Checkout'}
          </h1>
          <p
            data-testid="checkout-page-subtitle"
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {lang === 'vi'
              ? 'Điền thông tin nhận hàng và chọn phương thức thanh toán thuận tiện nhất.'
              : 'Enter your shipping details and choose your preferred payment method.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmitOrder}
          noValidate
          className="flex flex-col lg:flex-row items-start gap-7"
        >
          {/* LEFT (~62%): Shipping & Payment Details */}
          <div className="w-full lg:w-[62%] space-y-6">
            <div
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
                {lang === 'vi' ? 'Thông tin nhận hàng' : 'Shipping details'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-name"
                    className="flex items-center gap-1.5 text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    <User className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>
                      {lang === 'vi' ? 'Họ và tên người nhận *' : 'Recipient name *'}
                    </span>
                  </label>
                  <input
                    id="checkout-name"
                    data-testid="checkout-name-input"
                    type="text"
                    value={recipientName}
                    onChange={(e) => {
                      setRecipientName(e.target.value);
                      if (errors.recipientName)
                        setErrors((prev) => ({ ...prev, recipientName: undefined }));
                    }}
                    placeholder={lang === 'vi' ? 'Nguyễn Thảo Nhi' : 'Full name'}
                    className="form-input w-full"
                  />
                  {errors.recipientName && (
                    <p
                      role="alert"
                      className="text-xs font-bold"
                      style={{ color: errorTextColor }}
                    >
                      {errors.recipientName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-phone"
                    className="flex items-center gap-1.5 text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    <Phone className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>{lang === 'vi' ? 'Số điện thoại *' : 'Phone number *'}</span>
                  </label>
                  <input
                    id="checkout-phone"
                    data-testid="checkout-phone-input"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone)
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="0901234567"
                    className="form-input w-full"
                  />
                  {errors.phone && (
                    <p
                      role="alert"
                      className="text-xs font-bold"
                      style={{ color: errorTextColor }}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-address"
                  className="flex items-center gap-1.5 text-sm font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  <MapPin className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span>
                    {lang === 'vi'
                      ? 'Địa chỉ nhận hàng chi tiết *'
                      : 'Shipping address *'}
                  </span>
                </label>
                <input
                  id="checkout-address"
                  data-testid="checkout-address-input"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address)
                      setErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  placeholder={
                    lang === 'vi'
                      ? 'Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố'
                      : 'Street address, ward, district, city'
                  }
                  className="form-input w-full"
                />
                {errors.address && (
                  <p
                    role="alert"
                    className="text-xs font-bold"
                    style={{ color: errorTextColor }}
                  >
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Persisted Order Note from /gio-hang */}
              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-order-note"
                  className="flex items-center gap-1.5 text-sm font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  <FileText className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span>
                    {lang === 'vi'
                      ? 'Ghi chú đơn hàng'
                      : 'Order note'}
                  </span>
                </label>
                <textarea
                  id="checkout-order-note"
                  data-testid="checkout-order-note"
                  rows={2}
                  value={orderNote}
                  onChange={(e) => onChangeOrderNote(e.target.value)}
                  placeholder={
                    lang === 'vi'
                      ? 'Ghi chú giao hàng cho shipper...'
                      : 'Delivery instructions...'
                  }
                  className="w-full rounded-2xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div
              className="rounded-[24px] border p-5 sm:p-7 space-y-4"
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
                {lang === 'vi' ? 'Phương thức thanh toán' : 'Payment method'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  aria-pressed={paymentMethod === 'cod'}
                  className="p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                  style={{
                    backgroundColor:
                      paymentMethod === 'cod' ? 'var(--surface-2)' : 'var(--bg)',
                    borderColor:
                      paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <Truck
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>
                      {lang === 'vi'
                        ? 'Thanh toán khi nhận hàng (COD)'
                        : 'Cash on Delivery (COD)'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'vi'
                        ? 'Kiểm tra hàng trước khi thanh toán'
                        : 'Inspect package upon delivery'}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  aria-pressed={paymentMethod === 'bank'}
                  className="p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                  style={{
                    backgroundColor:
                      paymentMethod === 'bank' ? 'var(--surface-2)' : 'var(--bg)',
                    borderColor:
                      paymentMethod === 'bank' ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <CreditCard
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: 'var(--primary)' }}
                  />
                  <div>
                    <p className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>
                      {lang === 'vi'
                        ? 'Chuyển khoản ngân hàng / VietQR'
                        : 'Bank Transfer / VietQR'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'vi'
                        ? 'Xác nhận tự động qua mã QR'
                        : 'Instant verification via QR'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT (~38%): Sticky Order Summary */}
          <aside className="w-full lg:w-[38%] lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <div
              data-testid="checkout-summary-card"
              className="rounded-[24px] border p-5 sm:p-7 space-y-5"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="font-heading text-xl font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Đơn hàng của bạn' : 'Your order'}
                </h2>
                <a
                  href="/gio-hang"
                  onClick={(e) => handleLinkClick(e, '/gio-hang')}
                  className="text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Sửa giỏ hàng' : 'Edit cart'}
                </a>
              </div>

              {/* Compact Item List */}
              <div
                className="space-y-3 max-h-[280px] overflow-y-auto pr-1 divide-y"
                style={{ borderColor: 'var(--border)' }}
              >
                {cart.map((item) => {
                  const catalogProd =
                    products.find((p) => p.id === item.productId) || item.product;
                  const resolved = resolveProductSpecDetails(
                    catalogProd,
                    item.selectedSpec,
                    lang
                  );
                  const displayName =
                    lang === 'en' && item.product.nameEn
                      ? item.product.nameEn
                      : item.product.name;
                  const unitPrice = item.unitPriceAtAdd ?? item.product.price;
                  const itemKey = getCartItemKey(
                    item.productId,
                    item.selectedSpec
                  );

                  return (
                    <div
                      key={itemKey}
                      className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-12 h-12 rounded-xl border p-1 shrink-0 flex items-center justify-center"
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
                        </div>
                        <div className="min-w-0">
                          <p
                            className="font-bold line-clamp-1"
                            style={{ color: 'var(--text)' }}
                          >
                            {displayName}
                          </p>
                          <p
                            className="text-xs font-medium"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {resolved.displaySpec} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-extrabold shrink-0"
                        style={{ color: 'var(--primary)' }}
                      >
                        {formatVnd(unitPrice * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Persisted Coupon Badge */}
              {summary.appliedCouponCode && (
                <div
                  data-testid="checkout-applied-coupon"
                  className="px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'vi'
                        ? `Mã giảm giá: ${summary.appliedCouponCode}`
                        : `Coupon: ${summary.appliedCouponCode}`}
                    </span>
                  </span>
                  <span>-{formatVnd(summary.discountAmount)}</span>
                </div>
              )}

              {/* Totals */}
              <div
                className="space-y-2.5 pt-3 border-t text-sm"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Tạm tính' : 'Subtotal'}
                  </span>
                  <span
                    data-testid="checkout-subtotal"
                    className="font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {formatVnd(summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Phí vận chuyển' : 'Shipping fee'}
                  </span>
                  <span
                    data-testid="checkout-shipping"
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
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Giảm giá' : 'Discount'}
                  </span>
                  <span
                    data-testid="checkout-discount"
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
                    {lang === 'vi' ? 'Tổng thanh toán' : 'Total'}
                  </span>
                  <span
                    data-testid="checkout-total"
                    className="font-heading text-2xl sm:text-3xl font-extrabold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {formatVnd(summary.total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                data-testid="checkout-submit-order-btn"
                className="btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {lang === 'vi' ? 'Đặt hàng ngay' : 'Place order'}
                </span>
              </button>

              <div className="text-center">
                <a
                  href="/gio-hang"
                  data-testid="checkout-back-to-cart-link"
                  onClick={(e) => handleLinkClick(e, '/gio-hang')}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-full cursor-pointer"
                  style={{ color: 'var(--primary)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    {lang === 'vi' ? 'Quay lại giỏ hàng' : 'Back to cart'}
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};
