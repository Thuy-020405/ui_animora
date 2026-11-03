import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { safeGetStorage, safeSetStorage } from '@/utils/cartLogic';

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product, quantity?: number, selectedSpec?: string) => void;
  clearCart: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() =>
    safeGetStorage<CartItem[]>('animora_cart', [])
  );

  useEffect(() => {
    safeSetStorage('animora_cart', cart);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedSpec?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.selectedSpec === selectedSpec);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.selectedSpec === selectedSpec
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
          selectedSpec,
          unitPriceAtAdd: product.price,
        },
      ];
    });
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, clearCart, totalCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
