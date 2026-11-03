import React, { useState } from 'react';
import { Search, X, Heart, ShoppingBag } from 'lucide-react';
import { AdoptionPet, Product, Language, PageId } from '../types';
import { translations } from '../data/translations';

interface SearchModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  adoptionPets: AdoptionPet[];
  products: Product[];
  onNavigate?: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  lang,
  isOpen,
  onClose,
  adoptionPets,
  products,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].common;
  const [query, setQuery] = useState('');

  const trimmed = query.toLowerCase().trim();

  const matchingPets = trimmed
    ? adoptionPets.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.breed.toLowerCase().includes(trimmed) ||
          p.species.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingProducts = trimmed
    ? products.filter(
        (prod) =>
          prod.name.toLowerCase().includes(trimmed) ||
          prod.category.toLowerCase().includes(trimmed) ||
          prod.description.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
      <div className="animora-card max-w-xl w-full p-6 relative max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--coral)' }} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={translations[lang].nav.searchPlaceholder}
            className="form-input w-full py-3"
            style={{ paddingLeft: '2.75rem', paddingRight: '2.5rem' }}
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--surface-2)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto flex-1 space-y-4">
          {!trimmed ? (
            <div className="py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              Gõ từ khóa để tìm thú cưng nhận nuôi hoặc sản phẩm chăm sóc (vd: "Golden", "Mèo", "Hạt", "Spa")...
            </div>
          ) : matchingPets.length === 0 && matchingProducts.length === 0 ? (
            <div className="py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              {t.noSearchResults} "<span className="font-bold" style={{ color: 'var(--coral)' }}>{query}</span>"
            </div>
          ) : (
            <>
              {/* Pets results */}
              {matchingPets.length > 0 && (
                <div className="space-y-2">
                  <span className="eyebrow-label block text-[11px] flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" /> Thú cưng nhận nuôi ({matchingPets.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingPets.map((pet) => (
                      <button
                        key={pet.id}
                        type="button"
                        onClick={() => {
                          onNavigate?.('adopt');
                          onClose();
                        }}
                        className="p-3 rounded-2xl border flex items-center gap-3 text-left transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                      >
                        <img
                          src={pet.photo}
                          alt={pet.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                            {pet.name}
                          </p>
                          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                            {pet.breed} · {pet.age}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products results */}
              {matchingProducts.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="eyebrow-label block text-[11px] flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" /> Sản phẩm ({matchingProducts.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingProducts.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          onNavigate?.('shop');
                          onClose();
                        }}
                        className="p-3 rounded-2xl border flex items-center gap-3 text-left transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold line-clamp-1" style={{ color: 'var(--text)' }}>
                            {prod.name}
                          </p>
                          <p className="price-number text-[10px] font-bold" style={{ color: 'var(--coral)' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
