import React from 'react';
import { CartItem } from '@/types';

export const CartItemRow: React.FC<{
  item: CartItem;
  onUpdateQty: (delta: number) => void;
  onRemove: () => void;
}> = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <h5 className="font-bold text-xs text-[var(--primary)] truncate">{item.product.name}</h5>
        <p className="text-xs text-[var(--coral)] font-semibold mt-0.5">{item.product.price.toLocaleString('vi-VN')} đ</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onUpdateQty(-1)} className="px-2 py-0.5 border rounded text-xs">-</button>
        <span className="text-xs font-bold">{item.quantity}</span>
        <button type="button" onClick={() => onUpdateQty(1)} className="px-2 py-0.5 border rounded text-xs">+</button>
      </div>
      <button type="button" onClick={onRemove} className="text-xs text-red-500 font-bold p-1">✕</button>
    </div>
  );
};
