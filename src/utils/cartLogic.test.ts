import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatVnd,
  getCartItemKey,
  resolveProductSpecDetails,
  clampQuantity,
  validateCouponCode,
  calculateCartSummary,
  validateCartItem,
  validateCartForCheckout,
  mergeGuestCartIntoUserCart,
  changeCartItemSpec,
  acceptCartItemPriceChange,
} from './cartLogic';
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from '../config/cartConstants';
import { CartItem, Product } from '../types';

const sampleProduct: Product = {
  id: 'prod-1',
  slug: 'hat-nutripet-huu-co-da-loai-2kg',
  name: 'Hạt NutriPet hữu cơ đa loài (2kg)',
  nameEn: 'NutriPet organic multi-species kibble (2kg)',
  price: 320000,
  oldPrice: 400000,
  category: 'food',
  spec: 'Túi 2kg',
  specEn: '2kg bag',
  specOptions: [
    { labelVi: 'Túi 1kg', labelEn: '1kg bag', price: 185000, oldPrice: 220000 },
    { labelVi: 'Túi 2kg', labelEn: '2kg bag', price: 320000, oldPrice: 400000 },
    { labelVi: 'Túi 5kg tiết kiệm', labelEn: '5kg value bag', price: 740000, oldPrice: 920000 },
  ],
  image: '/assets/products/nutripet-organic-2kg.png',
  stock: 4,
  description: 'Desc',
  rating: 4.9,
};

const sampleOutProduct: Product = {
  ...sampleProduct,
  id: 'prod-16',
  name: 'Đèn sưởi UVB 5.0',
  stock: 0,
  badges: ['out_of_stock'],
};

describe('cartLogic pure functions', () => {
  it('formats Vietnamese currency accurately', () => {
    assert.equal(formatVnd(320000), '320.000đ');
    assert.equal(formatVnd(0), '0đ');
    assert.equal(formatVnd(500000), '500.000đ');
  });

  it('clamps quantity between 1 and available stock', () => {
    assert.equal(clampQuantity(0, 10), 1);
    assert.equal(clampQuantity(-3, 10), 1);
    assert.equal(clampQuantity(4, 10), 4);
    assert.equal(clampQuantity(15, 4), 4);
  });

  it('resolves product spec details for default and custom spec options', () => {
    const res1kg = resolveProductSpecDetails(sampleProduct, 'Túi 1kg', 'en');
    assert.equal(res1kg.unitPrice, 185000);
    assert.equal(res1kg.oldPrice, 220000);
    assert.equal(res1kg.displaySpec, '1kg bag');

    const resDefault = resolveProductSpecDetails(sampleProduct, undefined, 'vi');
    assert.equal(resDefault.unitPrice, 320000);
    assert.equal(resDefault.displaySpec, 'Túi 2kg');
  });

  it('calculates shipping fee (30.000đ under 500.000đ, free at or above 500.000đ) and coupon discount', () => {
    const singleItem: CartItem[] = [
      {
        productId: sampleProduct.id,
        product: sampleProduct,
        quantity: 1,
        selectedSpec: 'Túi 2kg',
        unitPriceAtAdd: 320000,
      },
    ];

    const summaryUnder = calculateCartSummary(singleItem, '');
    assert.equal(summaryUnder.subtotal, 320000);
    assert.equal(summaryUnder.shippingFee, STANDARD_SHIPPING_FEE);
    assert.equal(summaryUnder.remainingForFreeShip, FREE_SHIPPING_THRESHOLD - 320000);
    assert.equal(summaryUnder.isFreeShipping, false);
    assert.equal(summaryUnder.total, 320000 + STANDARD_SHIPPING_FEE);

    const twoItems: CartItem[] = [
      {
        productId: sampleProduct.id,
        product: sampleProduct,
        quantity: 2,
        selectedSpec: 'Túi 2kg',
        unitPriceAtAdd: 320000,
      },
    ];

    const summaryFreeShip = calculateCartSummary(twoItems, 'ANIMORA10');
    assert.equal(summaryFreeShip.subtotal, 640000);
    assert.equal(summaryFreeShip.shippingFee, 0);
    assert.equal(summaryFreeShip.isFreeShipping, true);
    assert.equal(summaryFreeShip.discountAmount, 64000);
    assert.equal(summaryFreeShip.total, 640000 - 64000);
  });

  it('validates valid, invalid, and expired coupon codes', () => {
    const validRes = validateCouponCode('animora10', 400000, 'vi');
    assert.equal(validRes.valid, true);
    assert.equal(validRes.discountAmount, 40000);

    const invalidRes = validateCouponCode('FAKECODE', 400000, 'vi');
    assert.equal(invalidRes.valid, false);
    assert.equal(invalidRes.errorMessage, 'Mã không hợp lệ hoặc đã hết hạn');

    const expiredRes = validateCouponCode('EXPIRED2025', 400000, 'vi');
    assert.equal(expiredRes.valid, false);
    assert.equal(expiredRes.errorMessage, 'Mã không hợp lệ hoặc đã hết hạn');
  });

  it('detects out-of-stock, low stock, and price-changed items and blocks checkout until resolved', () => {
    const priceChangedItem: CartItem = {
      productId: sampleProduct.id,
      product: { ...sampleProduct, price: 290000 },
      quantity: 1,
      selectedSpec: 'Túi 2kg',
      unitPriceAtAdd: 290000,
    };

    const itemVal = validateCartItem(priceChangedItem, [sampleProduct]);
    assert.equal(itemVal.hasPriceChanged, true);
    assert.equal(itemVal.oldRecordedPrice, 290000);
    assert.equal(itemVal.newCatalogPrice, 320000);
    assert.equal(itemVal.isLowStock, true);
    assert.equal(itemVal.stock, 4);

    const checkoutVal = validateCartForCheckout([priceChangedItem], [sampleProduct]);
    assert.equal(checkoutVal.isValid, false);
    assert.equal(checkoutVal.hasPriceChanged, true);

    // Accepting the new price makes checkout valid
    const acceptedList = acceptCartItemPriceChange(
      [priceChangedItem],
      getCartItemKey(priceChangedItem.productId, priceChangedItem.selectedSpec),
      [sampleProduct]
    );
    const checkoutValAfterAccept = validateCartForCheckout(acceptedList, [sampleProduct]);
    assert.equal(checkoutValAfterAccept.isValid, true);

    // Out of stock item blocks checkout
    const outItem: CartItem = {
      productId: sampleOutProduct.id,
      product: sampleOutProduct,
      quantity: 1,
      selectedSpec: 'Túi 2kg',
    };
    const outCheckout = validateCartForCheckout([outItem], [sampleOutProduct]);
    assert.equal(outCheckout.isValid, false);
    assert.equal(outCheckout.hasOutOfStock, true);
  });

  it('merges guest cart into user cart without duplicating items and clamps to stock', () => {
    const userCart: CartItem[] = [
      {
        productId: sampleProduct.id,
        product: sampleProduct,
        quantity: 2,
        selectedSpec: 'Túi 2kg',
        unitPriceAtAdd: 320000,
      },
    ];
    const guestCart: CartItem[] = [
      {
        productId: sampleProduct.id,
        product: sampleProduct,
        quantity: 3, // 2 + 3 = 5, clamped to stock = 4
        selectedSpec: 'Túi 2kg',
        unitPriceAtAdd: 320000,
      },
      {
        productId: sampleProduct.id,
        product: { ...sampleProduct, price: 185000 },
        quantity: 1,
        selectedSpec: 'Túi 1kg',
        unitPriceAtAdd: 185000,
      },
    ];

    const merged = mergeGuestCartIntoUserCart(userCart, guestCart, [sampleProduct]);
    assert.equal(merged.length, 2);
    const bag2kg = merged.find((i) => i.selectedSpec === 'Túi 2kg');
    const bag1kg = merged.find((i) => i.selectedSpec === 'Túi 1kg');
    assert.equal(bag2kg?.quantity, 4); // clamped to stock 4
    assert.equal(bag1kg?.quantity, 1);
  });

  it('switches item spec and merges if target spec already exists in cart', () => {
    const cartItems: CartItem[] = [
      {
        productId: sampleProduct.id,
        product: { ...sampleProduct, price: 185000 },
        quantity: 1,
        selectedSpec: 'Túi 1kg',
        unitPriceAtAdd: 185000,
      },
      {
        productId: sampleProduct.id,
        product: sampleProduct,
        quantity: 2,
        selectedSpec: 'Túi 2kg',
        unitPriceAtAdd: 320000,
      },
    ];

    const updated = changeCartItemSpec(
      cartItems,
      getCartItemKey(sampleProduct.id, 'Túi 1kg'),
      'Túi 2kg',
      [sampleProduct]
    );
    assert.equal(updated.length, 1);
    assert.equal(updated[0].selectedSpec, 'Túi 2kg');
    assert.equal(updated[0].quantity, 3);
    assert.equal(updated[0].product.price, 320000);
  });
});
