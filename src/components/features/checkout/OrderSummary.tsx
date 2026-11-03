import React from 'react';
import { CartItem } from '@/types';

export const OrderSummary: React.FC<{ items: CartItem[]; subtotal: number; shippingFee: number }> = ({
  items,
  subtotal,
  shippingFee,
}) => {
  const total = subtotal + shippingFee;

  return (
    <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl space-y-4">
      <h3 className="font-bold font-heading text-lg text-[var(--primary)]">Tóm tắt đơn hàng</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {items.map((i) => (
          <div key={i.productId} className="flex justify-between text-xs">
            <span className="truncate max-w-[180px]">{i.product.name} x{i.quantity}</span>
            <span className="font-semibold">{(i.product.price * i.quantity).toLocaleString('vi-VN')} đ</span>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border)] pt-3 space-y-1 text-sm">
        <div className="flex justify-between text-[var(--text-muted)]">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="flex justify-between text-[var(--text-muted)]">
          <span>Phí vận chuyển</span>
          <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')} đ`}</span>
        </div>
        <div className="flex justify-between font-bold text-base text-[var(--primary)] pt-2 border-t border-[var(--border)]">
          <span>Tổng cộng</span>
          <span className="text-[var(--coral)]">{total.toLocaleString('vi-VN')} đ</span>
        </div>
      </div>
    </div>
  );
};
