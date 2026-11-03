export const FREE_SHIPPING_THRESHOLD = 500000;
export const STANDARD_SHIPPING_FEE = 30000;
export const LOW_STOCK_THRESHOLD = 5;
export const UNDO_TOAST_DURATION_MS = 5000;

export interface CouponDefinition {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minSubtotal?: number;
  maxDiscount?: number;
  expired?: boolean;
  descriptionVi: string;
  descriptionEn: string;
}

export const COUPON_DEFINITIONS: CouponDefinition[] = [
  {
    code: 'ANIMORA10',
    type: 'percent',
    value: 10,
    descriptionVi: 'Giảm 10% giá trị đơn hàng',
    descriptionEn: '10% off your order',
  },
  {
    code: 'GIAM10',
    type: 'percent',
    value: 10,
    descriptionVi: 'Giảm 10% giá trị đơn hàng',
    descriptionEn: '10% off your order',
  },
  {
    code: 'ANIMORA50K',
    type: 'fixed',
    value: 50000,
    minSubtotal: 200000,
    descriptionVi: 'Giảm 50.000đ cho đơn từ 200.000đ',
    descriptionEn: '50,000đ off orders from 200,000đ',
  },
  {
    code: 'GIAM50K',
    type: 'fixed',
    value: 50000,
    minSubtotal: 200000,
    descriptionVi: 'Giảm 50.000đ cho đơn từ 200.000đ',
    descriptionEn: '50,000đ off orders from 200,000đ',
  },
  {
    code: 'WELCOME20',
    type: 'percent',
    value: 20,
    maxDiscount: 100000,
    descriptionVi: 'Giảm 20% (tối đa 100.000đ)',
    descriptionEn: '20% off (up to 100,000đ)',
  },
  {
    code: 'PETLOVE30K',
    type: 'fixed',
    value: 30000,
    descriptionVi: 'Giảm 30.000đ cho mọi đơn hàng',
    descriptionEn: '30,000đ off any order',
  },
  {
    code: 'EXPIRED2025',
    type: 'percent',
    value: 15,
    expired: true,
    descriptionVi: 'Mã đã hết hạn',
    descriptionEn: 'Expired coupon',
  },
];
