import React from 'react';
import { Product } from '@/types';

export const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-xl" />
      <div>
        <h2 className="text-2xl font-bold font-heading text-[var(--primary)]">{product.name}</h2>
        <p className="text-xl font-extrabold text-[var(--coral)] my-3">{product.price.toLocaleString('vi-VN')} đ</p>
        <p className="text-sm text-[var(--text-muted)]">{product.description}</p>
      </div>
    </div>
  );
};
