import React from 'react';
import { Product } from '@/types';

export const ProductCard: React.FC<{ product: Product; onAddToCart?: () => void }> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-3" />
        <h4 className="font-bold text-[var(--primary)] text-sm">{product.name}</h4>
        <p className="text-xs text-[var(--coral)] font-extrabold mt-1">{product.price.toLocaleString('vi-VN')} đ</p>
      </div>
      <button
        type="button"
        onClick={onAddToCart}
        className="mt-3 w-full btn-primary py-2 text-xs"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};
