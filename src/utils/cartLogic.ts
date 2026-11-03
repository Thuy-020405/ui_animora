import { CartItem, Language, Product, ProductSpecOption } from '../types';
import {
  COUPON_DEFINITIONS,
  FREE_SHIPPING_THRESHOLD,
  LOW_STOCK_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from '../config/cartConstants';

export function formatVnd(price: number): string {
  const safe = Number.isFinite(price) ? Math.max(0, Math.round(price)) : 0;
  return `${safe.toLocaleString('vi-VN')}đ`;
}

export function getCartItemKey(productId: string, selectedSpec?: string): string {
  return `${productId}::${(selectedSpec || '').trim()}`;
}

export interface ResolvedSpecDetails {
  specLabelVi: string;
  specLabelEn: string;
  displaySpec: string;
  unitPrice: number;
  oldPrice?: number;
  stock: number;
  specOptions: ProductSpecOption[];
}

export function resolveProductSpecDetails(
  product: Product,
  selectedSpec?: string,
  lang: Language = 'vi'
): ResolvedSpecDetails {
  const options = product.specOptions || [];
  const defaultVi = product.spec || 'Tiêu chuẩn';
  const defaultEn = product.specEn || product.spec || 'Standard';
  const trimmedSpec = (selectedSpec || '').trim();

  const matchedOption = options.find(
    (opt) =>
      opt.labelVi === trimmedSpec ||
      opt.labelEn === trimmedSpec
  );

  const specLabelVi = matchedOption ? matchedOption.labelVi : trimmedSpec || defaultVi;
  const specLabelEn = matchedOption ? matchedOption.labelEn : trimmedSpec || defaultEn;
  const displaySpec = lang === 'en' ? specLabelEn : specLabelVi;
  const unitPrice = matchedOption ? matchedOption.price : product.price;
  const oldPrice = matchedOption ? matchedOption.oldPrice : product.oldPrice;
  const stock =
    product.badges?.includes('out_of_stock') || product.stock === 0
      ? 0
      : product.stock ?? 25;

  return {
    specLabelVi,
    specLabelEn,
    displaySpec,
    unitPrice,
    oldPrice,
    stock,
    specOptions: options,
  };
}

export function clampQuantity(quantity: number, maxStock = 25): number {
  const safeMax = Math.max(1, Math.floor(maxStock));
  const safeQty = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
  return Math.min(safeMax, Math.max(1, safeQty));
}

export interface CouponValidationResult {
  valid: boolean;
  normalizedCode: string;
  discountAmount: number;
  errorMessage?: string;
  descriptionVi?: string;
  descriptionEn?: string;
}

export function validateCouponCode(
  rawCode: string,
  subtotal: number,
  lang: Language = 'vi'
): CouponValidationResult {
  const normalizedCode = (rawCode || '').trim().toUpperCase();
  if (!normalizedCode) {
    return {
      valid: false,
      normalizedCode: '',
      discountAmount: 0,
      errorMessage:
        lang === 'vi'
          ? 'Mã không hợp lệ hoặc đã hết hạn'
          : 'Invalid or expired coupon code',
    };
  }

  const found = COUPON_DEFINITIONS.find((c) => c.code === normalizedCode);
  if (!found || found.expired) {
    return {
      valid: false,
      normalizedCode,
      discountAmount: 0,
      errorMessage:
        lang === 'vi'
          ? 'Mã không hợp lệ hoặc đã hết hạn'
          : 'Invalid or expired coupon code',
    };
  }

  if (found.minSubtotal && subtotal < found.minSubtotal) {
    return {
      valid: false,
      normalizedCode,
      discountAmount: 0,
      errorMessage:
        lang === 'vi'
          ? `Mã không hợp lệ hoặc đã hết hạn (Đơn tối thiểu ${formatVnd(found.minSubtotal)})`
          : `Invalid or expired coupon code (Minimum order ${formatVnd(found.minSubtotal)})`,
    };
  }

  let discountAmount = 0;
  if (found.type === 'percent') {
    discountAmount = Math.round((subtotal * found.value) / 100);
    if (found.maxDiscount) {
      discountAmount = Math.min(discountAmount, found.maxDiscount);
    }
  } else {
    discountAmount = found.value;
  }

  discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

  return {
    valid: true,
    normalizedCode,
    discountAmount,
    descriptionVi: found.descriptionVi,
    descriptionEn: found.descriptionEn,
  };
}

export interface CartItemValidation {
  key: string;
  productId: string;
  isOutOfStock: boolean;
  isLowStock: boolean;
  stock: number;
  hasPriceChanged: boolean;
  oldRecordedPrice: number;
  newCatalogPrice: number;
  exceedsStock: boolean;
}

export function validateCartItem(
  item: CartItem,
  catalogProducts: Product[]
): CartItemValidation {
  const catalogProd =
    catalogProducts.find((p) => p.id === item.productId) || item.product;
  const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');

  const isOutOfStock =
    resolved.stock <= 0 ||
    item.product.stock === 0 ||
    Boolean(item.product.badges?.includes('out_of_stock'));

  const stock = isOutOfStock ? 0 : resolved.stock;
  const isLowStock = stock > 0 && stock <= LOW_STOCK_THRESHOLD;

  const oldRecordedPrice = item.unitPriceAtAdd ?? item.product.price;
  const newCatalogPrice = resolved.unitPrice;
  const hasPriceChanged = oldRecordedPrice !== newCatalogPrice;
  const exceedsStock = !isOutOfStock && item.quantity > stock;

  return {
    key: getCartItemKey(item.productId, item.selectedSpec),
    productId: item.productId,
    isOutOfStock,
    isLowStock,
    stock,
    hasPriceChanged,
    oldRecordedPrice,
    newCatalogPrice,
    exceedsStock,
  };
}

export interface CheckoutValidationResult {
  isValid: boolean;
  isEmpty: boolean;
  hasOutOfStock: boolean;
  hasPriceChanged: boolean;
  hasStockExceeded: boolean;
  blockingMessageVi?: string;
  blockingMessageEn?: string;
  itemValidations: Record<string, CartItemValidation>;
}

export function validateCartForCheckout(
  items: CartItem[],
  catalogProducts: Product[]
): CheckoutValidationResult {
  if (!items || items.length === 0) {
    return {
      isValid: false,
      isEmpty: true,
      hasOutOfStock: false,
      hasPriceChanged: false,
      hasStockExceeded: false,
      blockingMessageVi: 'Giỏ hàng đang trống',
      blockingMessageEn: 'Your cart is empty',
      itemValidations: {},
    };
  }

  const itemValidations: Record<string, CartItemValidation> = {};
  let hasOutOfStock = false;
  let hasPriceChanged = false;
  let hasStockExceeded = false;

  for (const item of items) {
    const v = validateCartItem(item, catalogProducts);
    itemValidations[v.key] = v;
    if (v.isOutOfStock) hasOutOfStock = true;
    if (v.hasPriceChanged) hasPriceChanged = true;
    if (v.exceedsStock) hasStockExceeded = true;
  }

  const isValid = !hasOutOfStock && !hasPriceChanged && !hasStockExceeded;
  let blockingMessageVi: string | undefined;
  let blockingMessageEn: string | undefined;

  if (hasOutOfStock) {
    blockingMessageVi =
      'Trong giỏ có sản phẩm đã hết hàng. Vui lòng xóa hoặc lưu mua sau trước khi thanh toán.';
    blockingMessageEn =
      'Your cart contains out-of-stock items. Please remove or save them for later before checkout.';
  } else if (hasPriceChanged) {
    blockingMessageVi =
      'Có sản phẩm thay đổi giá. Vui lòng chấp nhận giá mới hoặc xóa sản phẩm trước khi thanh toán.';
    blockingMessageEn =
      'Item prices have changed. Please accept the updated price or remove the item before checkout.';
  } else if (hasStockExceeded) {
    blockingMessageVi =
      'Số lượng một số sản phẩm vượt quá tồn kho hiện tại. Vui lòng điều chỉnh lại số lượng.';
    blockingMessageEn =
      'Some item quantities exceed available stock. Please adjust your quantities.';
  }

  return {
    isValid,
    isEmpty: false,
    hasOutOfStock,
    hasPriceChanged,
    hasStockExceeded,
    blockingMessageVi,
    blockingMessageEn,
    itemValidations,
  };
}

export interface CartSummary {
  subtotal: number;
  shippingFee: number;
  remainingForFreeShip: number;
  freeShipProgressPercent: number;
  isFreeShipping: boolean;
  discountAmount: number;
  appliedCouponCode: string;
  total: number;
  totalQuantity: number;
}

export function calculateCartSummary(
  items: CartItem[],
  couponCode = '',
  catalogProducts: Product[] = []
): CartSummary {
  let subtotal = 0;
  let totalQuantity = 0;

  for (const item of items) {
    const unitPrice = item.unitPriceAtAdd ?? item.product.price;
    const qty = Math.max(1, item.quantity);
    subtotal += unitPrice * qty;
    totalQuantity += qty;
  }

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee =
    items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipProgressPercent =
    subtotal <= 0
      ? 0
      : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let discountAmount = 0;
  let appliedCouponCode = '';
  if (couponCode && items.length > 0) {
    const couponRes = validateCouponCode(couponCode, subtotal, 'vi');
    if (couponRes.valid) {
      discountAmount = couponRes.discountAmount;
      appliedCouponCode = couponRes.normalizedCode;
    }
  }

  const total =
    items.length === 0
      ? 0
      : Math.max(0, subtotal - discountAmount + shippingFee);

  // Reference catalogProducts to avoid unused param warning when provided
  void catalogProducts;

  return {
    subtotal,
    shippingFee,
    remainingForFreeShip,
    freeShipProgressPercent,
    isFreeShipping,
    discountAmount,
    appliedCouponCode,
    total,
    totalQuantity,
  };
}

/**
 * Merges guest cart items into account cart on login without duplicating items.
 * Items with the same productId + selectedSpec are combined and clamped to available stock.
 */
export function mergeGuestCartIntoUserCart(
  userCart: CartItem[],
  guestCart: CartItem[],
  catalogProducts: Product[] = []
): CartItem[] {
  const mergedMap = new Map<string, CartItem>();

  const normalizeItemSpec = (item: CartItem): string => {
    const catalogProd =
      catalogProducts.find((p) => p.id === item.productId) || item.product;
    const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');
    return resolved.specLabelVi;
  };

  for (const item of userCart) {
    const specVi = normalizeItemSpec(item);
    const key = getCartItemKey(item.productId, specVi);
    const catalogProd =
      catalogProducts.find((p) => p.id === item.productId) || item.product;
    const resolved = resolveProductSpecDetails(catalogProd, specVi, 'vi');
    const maxStock = resolved.stock > 0 ? resolved.stock : item.quantity;

    mergedMap.set(key, {
      ...item,
      selectedSpec: specVi,
      quantity: clampQuantity(item.quantity, maxStock),
      unitPriceAtAdd: item.unitPriceAtAdd ?? item.product.price,
    });
  }

  for (const gItem of guestCart) {
    const specVi = normalizeItemSpec(gItem);
    const key = getCartItemKey(gItem.productId, specVi);
    const catalogProd =
      catalogProducts.find((p) => p.id === gItem.productId) || gItem.product;
    const resolved = resolveProductSpecDetails(catalogProd, specVi, 'vi');
    const maxStock = resolved.stock > 0 ? resolved.stock : gItem.quantity;

    const existing = mergedMap.get(key);
    if (existing) {
      mergedMap.set(key, {
        ...existing,
        quantity: clampQuantity(existing.quantity + gItem.quantity, maxStock),
      });
    } else {
      mergedMap.set(key, {
        ...gItem,
        selectedSpec: specVi,
        quantity: clampQuantity(gItem.quantity, maxStock),
        unitPriceAtAdd: gItem.unitPriceAtAdd ?? gItem.product.price,
      });
    }
  }

  return Array.from(mergedMap.values());
}

/**
 * Changes the spec of a cart item. If another row already has the target spec for the same product,
 * combines their quantities up to max stock without duplicating rows.
 */
export function changeCartItemSpec(
  items: CartItem[],
  targetKey: string,
  newSpecLabelVi: string,
  catalogProducts: Product[]
): CartItem[] {
  const targetItem = items.find(
    (i) => getCartItemKey(i.productId, i.selectedSpec) === targetKey
  );
  if (!targetItem) return items;

  const catalogProd =
    catalogProducts.find((p) => p.id === targetItem.productId) || targetItem.product;
  const resolved = resolveProductSpecDetails(catalogProd, newSpecLabelVi, 'vi');
  const newKey = getCartItemKey(targetItem.productId, resolved.specLabelVi);

  if (newKey === targetKey) return items;

  const updatedProduct: Product = {
    ...targetItem.product,
    price: resolved.unitPrice,
    oldPrice: resolved.oldPrice,
    spec: resolved.specLabelVi,
    specEn: resolved.specLabelEn,
  };

  const existingDuplicate = items.find(
    (i) => getCartItemKey(i.productId, i.selectedSpec) === newKey
  );

  if (existingDuplicate) {
    return items
      .filter((i) => getCartItemKey(i.productId, i.selectedSpec) !== targetKey)
      .map((i) => {
        if (getCartItemKey(i.productId, i.selectedSpec) === newKey) {
          return {
            ...i,
            product: updatedProduct,
            selectedSpec: resolved.specLabelVi,
            unitPriceAtAdd: resolved.unitPrice,
            quantity: clampQuantity(
              i.quantity + targetItem.quantity,
              resolved.stock > 0 ? resolved.stock : 25
            ),
          };
        }
        return i;
      });
  }

  return items.map((i) => {
    if (getCartItemKey(i.productId, i.selectedSpec) === targetKey) {
      return {
        ...i,
        product: updatedProduct,
        selectedSpec: resolved.specLabelVi,
        unitPriceAtAdd: resolved.unitPrice,
      };
    }
    return i;
  });
}

export function acceptCartItemPriceChange(
  items: CartItem[],
  targetKey: string,
  catalogProducts: Product[]
): CartItem[] {
  return items.map((item) => {
    const key = getCartItemKey(item.productId, item.selectedSpec);
    if (key !== targetKey) return item;
    const catalogProd =
      catalogProducts.find((p) => p.id === item.productId) || item.product;
    const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');
    return {
      ...item,
      product: {
        ...item.product,
        price: resolved.unitPrice,
        oldPrice: resolved.oldPrice,
      },
      unitPriceAtAdd: resolved.unitPrice,
    };
  });
}

export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota or privacy mode errors
  }
}

export function safeRemoveStorage(key: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch {
    // ignore errors
  }
}
