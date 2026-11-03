import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickBooking } from './components/QuickBooking';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Adoption } from './components/Adoption';
import { Shop } from './components/Shop';
import { PetProfiles } from './components/PetProfiles';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ColorBleedBackground } from './components/ColorBleedBackground';
import { PawBubbleLayer } from './components/PawBubbleLayer';

// Dedicated Detail Pages
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AdoptionPage } from './components/pages/AdoptionPage';
import { ShopPage } from './components/pages/ShopPage';
import { PetProfilesPage } from './components/pages/PetProfilesPage';
import { AuthPage } from './components/pages/AuthPage';
import { ServiceBookingPage } from './components/pages/ServiceBookingPage';
import { MyBookingsPage } from './components/pages/MyBookingsPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import {
  createSeededServiceBookings,
  parseServiceBookingUrl,
  resolveServiceBySlugOrName,
} from './data/serviceBookingData';
import { parseMyBookingsUrl } from './utils/bookingHistoryUtils';
import {
  acceptCartItemPriceChange,
  changeCartItemSpec,
  clampQuantity,
  getCartItemKey,
  mergeGuestCartIntoUserCart,
  resolveProductSpecDetails,
  safeGetStorage,
  safeRemoveStorage,
  safeSetStorage,
} from './utils/cartLogic';
import { UNDO_TOAST_DURATION_MS } from './config/cartConstants';

import {
  Language,
  PageId,
  Pet,
  Vaccination,
  AdoptionPet,
  Product,
  CartItem,
  Booking,
  AdoptionRequest,
  AuthMode,
  UserAccount,
} from './types';
import {
  initialPets,
  initialVaccinations,
  initialAdoptionPets,
  initialProducts,
} from './data/mockData';
import { translations } from './data/translations';

const DEFAULT_DEMO_USER: UserAccount = {
  id: 'user-demo-owner',
  fullName: 'Phan Thị Đinh Thùy',
  email: 'phanthidinhthuy6@gmail.com',
  phone: '0337203332',
  passwordHash: '123456',
  role: 'owner',
  createdAt: '2026-01-15',
  addresses: [
    {
      id: 'addr-demo-1',
      label: 'Nhà riêng',
      recipientName: 'Phan Thị Đinh Thùy',
      phone: '0337203332',
      addressLine: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
      isDefault: true,
    },
  ],
};

const SECONDARY_DEMO_USER: UserAccount = {
  id: 'user-demo-owner',
  fullName: 'Nguyễn Minh Anh',
  email: 'minhanh@animora.vn',
  phone: '0901234567',
  passwordHash: '123456',
  role: 'owner',
  createdAt: '2026-01-15',
  addresses: [],
};

export default function App() {
  // Active page routing ('home' | 'about' | 'services' | 'booking' | 'my-bookings' | 'adopt' | 'shop' | 'cart' | 'checkout' | 'pet-profiles')
  const [activePage, setActivePage] = useState<PageId>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/gio-hang')) {
      return 'cart';
    }
    if (path.startsWith('/thanh-toan')) {
      return 'checkout';
    }
    if (path.startsWith('/lich-hen')) {
      return 'my-bookings';
    }
    if (path.startsWith('/dat-lich')) {
      return 'booking';
    }
    if (path.startsWith('/dich-vu')) {
      return 'services';
    }
    if (path.startsWith('/cua-hang')) {
      return 'shop';
    }
    if (path.startsWith('/nhan-nuoi')) {
      return 'adopt';
    }
    if (path.startsWith('/dang-nhap') || path.startsWith('/login')) {
      return 'login';
    }
    if (path.startsWith('/dang-ky') || path.startsWith('/register')) {
      return 'register';
    }
    if (path.startsWith('/tai-khoan') || path.startsWith('/account')) {
      return 'account';
    }
    if (path.startsWith('/ho-so-thu-cung') || path.startsWith('/pet-profiles')) {
      return 'pet-profiles';
    }
    if (path.startsWith('/ve-chung-toi') || path.startsWith('/about')) {
      return 'about';
    }
    return 'home';
  });

  const [returnPageAfterAuth, setReturnPageAfterAuth] = useState<PageId | null>(null);

  const [bookingUrlState, setBookingUrlState] = useState(() =>
    parseServiceBookingUrl(window.location.pathname, window.location.search)
  );

  const [myBookingsUrlState, setMyBookingsUrlState] = useState(() =>
    parseMyBookingsUrl(window.location.pathname, window.location.search)
  );

  const [scrollSpyPage, setScrollSpyPage] = useState<PageId>('home');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setBookingUrlState(
        parseServiceBookingUrl(window.location.pathname, window.location.search)
      );
      setMyBookingsUrlState(
        parseMyBookingsUrl(window.location.pathname, window.location.search)
      );
      if (path.startsWith('/gio-hang')) {
        setActivePage('cart');
      } else if (path.startsWith('/thanh-toan')) {
        setActivePage('checkout');
      } else if (path.startsWith('/lich-hen')) {
        setActivePage('my-bookings');
      } else if (path.startsWith('/dat-lich')) {
        setActivePage('booking');
      } else if (path.startsWith('/dich-vu')) {
        setActivePage('services');
      } else if (path.startsWith('/cua-hang')) {
        setActivePage('shop');
      } else if (path.startsWith('/nhan-nuoi')) {
        setActivePage('adopt');
      } else if (path.startsWith('/dang-nhap') || path.startsWith('/login')) {
        setActivePage('login');
      } else if (path.startsWith('/dang-ky') || path.startsWith('/register')) {
        setActivePage('register');
      } else if (path.startsWith('/tai-khoan') || path.startsWith('/account')) {
        setActivePage('account');
      } else if (path.startsWith('/ho-so-thu-cung') || path.startsWith('/pet-profiles')) {
        setActivePage('pet-profiles');
      } else if (path.startsWith('/ve-chung-toi') || path.startsWith('/about')) {
        setActivePage('about');
      } else if (path === '/' || path === '') {
        setActivePage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync scrollSpyPage directly with activePage to ensure navbar tabs do not shift when scrolling
  useEffect(() => {
    setScrollSpyPage(activePage);
  }, [activePage]);

  const handleNavigate = (page: PageId) => {
    if (page === 'login' || page === 'register') {
      if (
        activePage === 'my-bookings' ||
        activePage === 'cart' ||
        activePage === 'checkout'
      ) {
        setReturnPageAfterAuth(activePage);
      }
    }
    if (page === 'cart') {
      if (!window.location.pathname.startsWith('/gio-hang')) {
        window.history.pushState({}, '', '/gio-hang');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'checkout') {
      if (!window.location.pathname.startsWith('/thanh-toan')) {
        window.history.pushState({}, '', '/thanh-toan');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'my-bookings') {
      if (!window.location.pathname.startsWith('/lich-hen')) {
        window.history.pushState({}, '', '/lich-hen');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'booking') {
      if (!window.location.pathname.startsWith('/dat-lich')) {
        window.history.pushState({}, '', '/dat-lich');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'services') {
      if (window.location.pathname !== '/dich-vu') {
        window.history.pushState({}, '', '/dich-vu');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'shop') {
      if (!window.location.pathname.startsWith('/cua-hang')) {
        window.history.pushState({}, '', '/cua-hang');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'adopt') {
      if (!window.location.pathname.startsWith('/nhan-nuoi')) {
        window.history.pushState({}, '', '/nhan-nuoi');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'about') {
      if (!window.location.pathname.startsWith('/ve-chung-toi')) {
        window.history.pushState({}, '', '/ve-chung-toi');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (page === 'login') {
      if (!window.location.pathname.startsWith('/dang-nhap') && !window.location.pathname.startsWith('/login')) {
        window.history.pushState({}, '', '/dang-nhap');
      }
    } else if (page === 'register') {
      if (!window.location.pathname.startsWith('/dang-ky') && !window.location.pathname.startsWith('/register')) {
        window.history.pushState({}, '', '/dang-ky');
      }
    } else if (page === 'account') {
      if (!window.location.pathname.startsWith('/tai-khoan') && !window.location.pathname.startsWith('/account')) {
        window.history.pushState({}, '', '/tai-khoan');
      }
    } else if (page === 'pet-profiles') {
      if (!window.location.pathname.startsWith('/ho-so-thu-cung') && !window.location.pathname.startsWith('/pet-profiles')) {
        window.history.pushState({}, '', '/ho-so-thu-cung');
      }
    } else if (
      window.location.pathname.startsWith('/dich-vu') ||
      window.location.pathname.startsWith('/dat-lich') ||
      window.location.pathname.startsWith('/lich-hen') ||
      window.location.pathname.startsWith('/cua-hang') ||
      window.location.pathname.startsWith('/gio-hang') ||
      window.location.pathname.startsWith('/thanh-toan') ||
      window.location.pathname.startsWith('/nhan-nuoi') ||
      window.location.pathname.startsWith('/ve-chung-toi') ||
      window.location.pathname.startsWith('/about') ||
      window.location.pathname.startsWith('/dang-nhap') ||
      window.location.pathname.startsWith('/login') ||
      window.location.pathname.startsWith('/dang-ky') ||
      window.location.pathname.startsWith('/register') ||
      window.location.pathname.startsWith('/tai-khoan') ||
      window.location.pathname.startsWith('/account') ||
      window.location.pathname.startsWith('/ho-so-thu-cung') ||
      window.location.pathname.startsWith('/pet-profiles')
    ) {
      window.history.pushState({}, '', '/');
    }
    setActivePage(page);
    window.scrollTo({ top: 0, left: 0 });
  };

  const handleNavigateCustomUrl = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (path.startsWith('/gio-hang')) {
      setActivePage('cart');
    } else if (path.startsWith('/thanh-toan')) {
      setActivePage('checkout');
    } else if (path.startsWith('/cua-hang')) {
      setActivePage('shop');
    } else if (path.startsWith('/lich-hen')) {
      setActivePage('my-bookings');
    } else if (path.startsWith('/dat-lich')) {
      setActivePage('booking');
    } else if (path.startsWith('/nhan-nuoi')) {
      setActivePage('adopt');
    } else if (path.startsWith('/dich-vu')) {
      setActivePage('services');
    } else if (path === '/' || path === '') {
      setActivePage('home');
    }
    window.scrollTo({ top: 0, left: 0 });
  };

  const handleOpenBookingPage = (serviceSlugOrName?: string) => {
    let targetUrl = '/dat-lich';
    if (serviceSlugOrName && serviceSlugOrName.trim()) {
      const resolved = resolveServiceBySlugOrName(serviceSlugOrName);
      targetUrl = `/dat-lich?service=${encodeURIComponent(resolved.slug)}`;
    }
    window.history.pushState({}, '', targetUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setActivePage('booking');
    window.scrollTo({ top: 0, left: 0 });
  };

  const handleOpenPetProfile = (slug: string) => {
    const targetPath = `/nhan-nuoi/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setActivePage('adopt');
    window.scrollTo({ top: 0, left: 0 });
  };

  // 1. Bilingual language state (default VI, switchable to EN)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('animora_lang');
      return saved === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi';
      try {
        localStorage.setItem('animora_lang', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 2. Light / Dark mode state (saves in localStorage, default follows prefers-color-scheme)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('animora_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch {
      // ignore
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = darkMode ? 'dark' : 'light';
    root.setAttribute('data-theme', theme);
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('animora_theme', theme);
    } catch {
      // ignore
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // 3. Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    text: string,
    options?: { actionLabel?: string; onAction?: () => void; durationMs?: number }
  ) => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + '-' + Math.random(),
      text,
      actionLabel: options?.actionLabel,
      onAction: options?.onAction,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, options?.durationMs ?? 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 4. Data states (Pets, Vaccinations, Products, Cart, SavedForLater, Coupon, Note, Bookings)
  const [pets, setPets] = useState<Pet[]>(() =>
    safeGetStorage<Pet[]>('animora_pets_v2', initialPets)
  );

  const [vaccinations, setVaccinations] = useState<Vaccination[]>(() =>
    safeGetStorage<Vaccination[]>('animora_vaccinations_v2', initialVaccinations)
  );

  const [adoptionPets] = useState<AdoptionPet[]>(initialAdoptionPets);
  const [products] = useState<Product[]>(initialProducts);

  const [cart, setCart] = useState<CartItem[]>(() =>
    safeGetStorage<CartItem[]>('animora_cart', [])
  );

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() =>
    safeGetStorage<CartItem[]>('animora_saved_for_later', [])
  );

  const [appliedCoupon, setAppliedCoupon] = useState<string>(() =>
    safeGetStorage<string>('animora_cart_coupon', '')
  );

  const [orderNote, setOrderNote] = useState<string>(() =>
    safeGetStorage<string>('animora_cart_note', '')
  );

  const [cartRedirectNotice, setCartRedirectNotice] = useState<string | null>(
    null
  );

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const parsed = safeGetStorage<Booking[]>('animora_bookings_v2', []);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return createSeededServiceBookings();
  });

  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>(
    () => safeGetStorage<AdoptionRequest[]>('animora_adoption_requests', [])
  );

  // 5. User Authentication & Accounts State (ACC-01 to ACC-07)
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() =>
    safeGetStorage<UserAccount[]>('animora_users_v2', [
      DEFAULT_DEMO_USER,
      SECONDARY_DEMO_USER,
    ])
  );

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() =>
    safeGetStorage<UserAccount | null>('animora_current_user', null)
  );

  useEffect(() => {
    safeSetStorage('animora_users_v2', registeredUsers);
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      safeSetStorage('animora_current_user', currentUser);
    } else {
      safeRemoveStorage('animora_current_user');
    }
  }, [currentUser]);

  // Sync state changes to localStorage (all wrapped in try/catch via safeSetStorage)
  useEffect(() => {
    safeSetStorage('animora_pets_v2', pets);
  }, [pets]);

  useEffect(() => {
    safeSetStorage('animora_vaccinations_v2', vaccinations);
  }, [vaccinations]);

  useEffect(() => {
    safeSetStorage('animora_cart', cart);
    if (currentUser) {
      safeSetStorage(`animora_cart_user_${currentUser.id}`, cart);
    }
  }, [cart, currentUser]);

  useEffect(() => {
    safeSetStorage('animora_saved_for_later', savedForLater);
  }, [savedForLater]);

  useEffect(() => {
    safeSetStorage('animora_cart_coupon', appliedCoupon);
  }, [appliedCoupon]);

  useEffect(() => {
    safeSetStorage('animora_cart_note', orderNote);
  }, [orderNote]);

  // Helper to merge guest cart into account cart on login without duplicating items
  const handleMergeCartOnUserLogin = (user: UserAccount) => {
    setCart((guestCart) => {
      const savedUserCart = safeGetStorage<CartItem[]>(
        `animora_cart_user_${user.id}`,
        []
      );
      const merged = mergeGuestCartIntoUserCart(
        savedUserCart,
        guestCart,
        products
      );
      safeSetStorage(`animora_cart_user_${user.id}`, merged);
      safeSetStorage('animora_cart', merged);
      return merged;
    });
  };

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');
  const [preFilledService, setPreFilledService] = useState('');
  const [bookingTrigger, setBookingTrigger] = useState(0);

  // Cart actions
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedSpec?: string
  ) => {
    const resolved = resolveProductSpecDetails(product, selectedSpec, 'vi');
    const maxStock = resolved.stock > 0 ? resolved.stock : 25;
    const specVi = resolved.specLabelVi;
    const targetKey = getCartItemKey(product.id, specVi);

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          getCartItemKey(
            item.productId,
            resolveProductSpecDetails(product, item.selectedSpec, 'vi')
              .specLabelVi
          ) === targetKey
      );
      if (existing) {
        return prevCart.map((item) => {
          const itemSpecVi = resolveProductSpecDetails(
            product,
            item.selectedSpec,
            'vi'
          ).specLabelVi;
          if (getCartItemKey(item.productId, itemSpecVi) === targetKey) {
            return {
              ...item,
              product: {
                ...product,
                price: resolved.unitPrice,
                oldPrice: resolved.oldPrice,
              },
              selectedSpec: specVi,
              unitPriceAtAdd: resolved.unitPrice,
              quantity: clampQuantity(item.quantity + quantity, maxStock),
            };
          }
          return item;
        });
      }
      return [
        ...prevCart,
        {
          productId: product.id,
          product: {
            ...product,
            price: resolved.unitPrice,
            oldPrice: resolved.oldPrice,
          },
          quantity: clampQuantity(quantity, maxStock),
          selectedSpec: specVi,
          unitPriceAtAdd: resolved.unitPrice,
        },
      ];
    });
    if (activePage !== 'cart') {
      setIsCartOpen(true);
    }
    addToast(translations[lang].shop.addedToast);
  };

  const handleBuyNow = (
    product: Product,
    quantity = 1,
    selectedSpec?: string
  ) => {
    const resolved = resolveProductSpecDetails(product, selectedSpec, 'vi');
    const maxStock = resolved.stock > 0 ? resolved.stock : 25;
    const specVi = resolved.specLabelVi;
    const targetKey = getCartItemKey(product.id, specVi);

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          getCartItemKey(
            item.productId,
            resolveProductSpecDetails(product, item.selectedSpec, 'vi')
              .specLabelVi
          ) === targetKey
      );
      if (existing) {
        return prevCart.map((item) => {
          const itemSpecVi = resolveProductSpecDetails(
            product,
            item.selectedSpec,
            'vi'
          ).specLabelVi;
          if (getCartItemKey(item.productId, itemSpecVi) === targetKey) {
            return {
              ...item,
              product: {
                ...product,
                price: resolved.unitPrice,
                oldPrice: resolved.oldPrice,
              },
              selectedSpec: specVi,
              unitPriceAtAdd: resolved.unitPrice,
              quantity: clampQuantity(item.quantity + quantity, maxStock),
            };
          }
          return item;
        });
      }
      return [
        ...prevCart,
        {
          productId: product.id,
          product: {
            ...product,
            price: resolved.unitPrice,
            oldPrice: resolved.oldPrice,
          },
          quantity: clampQuantity(quantity, maxStock),
          selectedSpec: specVi,
          unitPriceAtAdd: resolved.unitPrice,
        },
      ];
    });
    setIsCartOpen(false);
    handleNavigateCustomUrl('/thanh-toan');
  };

  const handleUpdateCartQuantity = (itemKeyOrProductId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const key = getCartItemKey(item.productId, item.selectedSpec);
        if (key === itemKeyOrProductId || item.productId === itemKeyOrProductId) {
          const catalogProd =
            products.find((p) => p.id === item.productId) || item.product;
          const resolved = resolveProductSpecDetails(
            catalogProd,
            item.selectedSpec,
            'vi'
          );
          const maxStock = resolved.stock > 0 ? resolved.stock : 25;
          const nextQty = clampQuantity(item.quantity + delta, maxStock);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const handleSetCartQuantity = (itemKey: string, newQty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (getCartItemKey(item.productId, item.selectedSpec) === itemKey) {
          const catalogProd =
            products.find((p) => p.id === item.productId) || item.product;
          const resolved = resolveProductSpecDetails(
            catalogProd,
            item.selectedSpec,
            'vi'
          );
          const maxStock = resolved.stock > 0 ? resolved.stock : 25;
          return { ...item, quantity: clampQuantity(newQty, maxStock) };
        }
        return item;
      })
    );
  };

  const handleRemoveItemWithUndo = (removedItem: CartItem) => {
    const removedKey = getCartItemKey(
      removedItem.productId,
      removedItem.selectedSpec
    );
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          getCartItemKey(item.productId, item.selectedSpec) !== removedKey
      )
    );

    const displayName =
      lang === 'en' && removedItem.product.nameEn
        ? removedItem.product.nameEn
        : removedItem.product.name;

    addToast(
      lang === 'vi' ? `Đã xóa ${displayName}` : `Removed ${displayName}`,
      {
        actionLabel: lang === 'vi' ? 'Hoàn tác' : 'Undo',
        durationMs: UNDO_TOAST_DURATION_MS,
        onAction: () => {
          setCart((current) => {
            const exists = current.some(
              (i) =>
                getCartItemKey(i.productId, i.selectedSpec) === removedKey
            );
            if (exists) {
              return current.map((i) =>
                getCartItemKey(i.productId, i.selectedSpec) === removedKey
                  ? { ...i, quantity: i.quantity + removedItem.quantity }
                  : i
              );
            }
            return [...current, removedItem];
          });
        },
      }
    );
  };

  const handleSaveForLater = (item: CartItem) => {
    const itemKey = getCartItemKey(item.productId, item.selectedSpec);
    setCart((prev) =>
      prev.filter(
        (i) => getCartItemKey(i.productId, i.selectedSpec) !== itemKey
      )
    );
    setSavedForLater((prev) => {
      const exists = prev.some(
        (i) => getCartItemKey(i.productId, i.selectedSpec) === itemKey
      );
      if (exists) return prev;
      return [...prev, item];
    });
    const displayName =
      lang === 'en' && item.product.nameEn
        ? item.product.nameEn
        : item.product.name;
    addToast(
      lang === 'vi'
        ? `Đã lưu "${displayName}" để mua sau.`
        : `Saved "${displayName}" for later.`
    );
  };

  const handleMoveSavedToCart = (item: CartItem) => {
    const itemKey = getCartItemKey(item.productId, item.selectedSpec);
    setSavedForLater((prev) =>
      prev.filter(
        (i) => getCartItemKey(i.productId, i.selectedSpec) !== itemKey
      )
    );
    setCart((prev) => mergeGuestCartIntoUserCart(prev, [item], products));
    const displayName =
      lang === 'en' && item.product.nameEn
        ? item.product.nameEn
        : item.product.name;
    addToast(
      lang === 'vi'
        ? `Đã chuyển "${displayName}" vào giỏ hàng.`
        : `Moved "${displayName}" to cart.`
    );
  };

  const handleRemoveSavedItem = (itemKey: string) => {
    setSavedForLater((prev) =>
      prev.filter(
        (i) => getCartItemKey(i.productId, i.selectedSpec) !== itemKey
      )
    );
  };

  const handleChangeCartItemSpec = (itemKey: string, newSpecVi: string) => {
    setCart((prev) => changeCartItemSpec(prev, itemKey, newSpecVi, products));
  };

  const handleAcceptCartPriceChange = (itemKey: string) => {
    setCart((prev) => acceptCartItemPriceChange(prev, itemKey, products));
  };

  // Booking actions
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => {
      const next = [...prev, newBooking];
      safeSetStorage('animora_bookings_v2', next);
      return next;
    });
    addToast(translations[lang].quickBooking.successToast);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b));
      safeSetStorage('animora_bookings_v2', next);
      return next;
    });
  };

  // Service selection -> navigate to dedicated booking page (/dat-lich?service={slug})
  const handleSelectService = (serviceName: string) => {
    setPreFilledService(serviceName);
    handleOpenBookingPage(serviceName);
  };

  // Adoption request action
  const handleAddAdoptionRequest = (req: AdoptionRequest) => {
    setAdoptionRequests((prev) => {
      const next = [...prev, req];
      safeSetStorage('animora_adoption_requests', next);
      return next;
    });
    addToast(translations[lang].adoption.successToast);
  };

  // Pet profile update/add actions
  const handleUpdatePet = (updatedPet: Pet, updatedVaccinations: Vaccination[]) => {
    setPets((prev) => prev.map((p) => (p.id === updatedPet.id ? updatedPet : p)));
    setVaccinations((prev) => {
      const otherVac = prev.filter((v) => v.petId !== updatedPet.id);
      return [...otherVac, ...updatedVaccinations];
    });
    addToast(translations[lang].petProfiles.saveSuccessToast);
  };

  const handleAddPet = (newPet: Pet, newVaccines: Vaccination[]) => {
    setPets((prev) => [...prev, newPet]);
    setVaccinations((prev) => [...prev, ...newVaccines]);
    addToast(
      lang === 'vi'
        ? `Đã thêm hồ sơ mới cho bé ${newPet.name}!`
        : `Added new profile for ${newPet.name}!`
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="min-h-screen relative transition-colors duration-300 selection:bg-[var(--coral)] selection:text-[var(--on-coral)]"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      {/* Dynamic Ambient Watercolor Bleed Effect across entire website */}
      <ColorBleedBackground darkMode={darkMode} lang={lang} />

      {/* Floating translucent paw bubbles layer (fixed full screen, behind content z-0) */}
      <PawBubbleLayer
        darkMode={darkMode}
        reducedOpacity={
          activePage === 'cart' ||
          activePage === 'checkout' ||
          activePage === 'booking' ||
          activePage === 'my-bookings' ||
          activePage === 'shop' ||
          activePage === 'adopt' ||
          activePage === 'pet-profiles' ||
          (activePage === 'home' &&
            (scrollSpyPage === 'adopt' || scrollSpyPage === 'pet-profiles'))
        }
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Header (hidden on Login / Register / Account pages) */}
      {activePage !== 'login' &&
        activePage !== 'register' &&
        activePage !== 'account' && (
          <Navbar
            lang={lang}
            onToggleLang={toggleLanguage}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenLogin={() => handleNavigate('login')}
            onOpenRegister={() => handleNavigate('register')}
            onOpenAccount={() => handleNavigate('account')}
            onLogout={() => {
              setCurrentUser(null);
              addToast(translations[lang].loginModal.logoutToast);
            }}
            currentUser={currentUser}
            activePage={activePage}
            scrollSpyPage={scrollSpyPage}
            onNavigate={handleNavigate}
          />
        )}

      {/* Main Page Flow */}
      <main className="relative z-1">
        {activePage === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              lang={lang}
              darkMode={darkMode}
              onOpenConsultation={() => handleOpenBookingPage()}
            />

            {/* 2. Quick Booking Banner (Floating card overlapping bottom of hero) */}
            <QuickBooking
              lang={lang}
              onAddBooking={handleAddBooking}
              selectedServicePreFill={preFilledService}
              bookingTrigger={bookingTrigger}
            />

            {/* 3. Về chúng tôi (About Us) */}
            <AboutUs lang={lang} onOpenDetail={() => handleNavigate('about')} />

            {/* 4. Dịch vụ (Services) */}
            <Services
              lang={lang}
              onSelectService={handleSelectService}
              onOpenDetail={() => handleNavigate('services')}
            />

            {/* 5. Nhận nuôi (Adoption) */}
            <Adoption
              lang={lang}
              adoptionPets={adoptionPets}
              onAddAdoptionRequest={handleAddAdoptionRequest}
              onOpenDetail={() => handleNavigate('adopt')}
              onOpenPetProfile={handleOpenPetProfile}
            />

            {/* 6. Cửa hàng (Shop) */}
            <Shop
              lang={lang}
              products={products}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onOpenDetail={() => handleNavigate('shop')}
            />

            {/* 7. Hồ sơ thú cưng (Pet Profiles) */}
            <PetProfiles
              lang={lang}
              pets={pets}
              vaccinations={vaccinations}
              onUpdatePet={handleUpdatePet}
              onAddPet={handleAddPet}
              onOpenDetail={() => handleNavigate('pet-profiles')}
              onBookService={handleSelectService}
              onAddBooking={handleAddBooking}
              onShowToast={addToast}
            />

            {/* 8. Đánh giá khách hàng (Customer Testimonials Carousel) */}
            <Testimonials lang={lang} />
          </>
        )}

        {activePage === 'about' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
            onBookWithSpecialist={(serviceName) => {
              setPreFilledService(serviceName);
              handleOpenBookingPage(serviceName);
            }}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            lang={lang}
            bookings={bookings}
            onAddBooking={handleAddBooking}
            onNavigate={handleNavigate}
            onBookService={(serviceSlug) => handleOpenBookingPage(serviceSlug)}
            initialSelectedService={preFilledService}
          />
        )}

        {activePage === 'booking' && (
          <ServiceBookingPage
            lang={lang}
            darkMode={darkMode}
            pets={pets}
            bookings={bookings}
            currentUser={currentUser}
            initialServiceSlug={bookingUrlState.preselectedServiceSlug}
            isSuccessRoute={bookingUrlState.isSuccessRoute}
            onAddBooking={handleAddBooking}
            onNavigate={handleNavigate}
            onNavigateBookingUrl={handleNavigateCustomUrl}
          />
        )}

        {activePage === 'my-bookings' && (
          <MyBookingsPage
            lang={lang}
            darkMode={darkMode}
            bookings={bookings}
            pets={pets}
            currentUser={currentUser}
            detailCode={myBookingsUrlState.detailCode}
            queryCode={myBookingsUrlState.queryCode}
            onUpdateBooking={handleUpdateBooking}
            onNavigate={handleNavigate}
            onNavigateUrl={handleNavigateCustomUrl}
            onShowToast={addToast}
          />
        )}

        {activePage === 'adopt' && (
          <AdoptionPage
            lang={lang}
            adoptionPets={adoptionPets}
            adoptionRequests={adoptionRequests}
            onAddAdoptionRequest={handleAddAdoptionRequest}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            lang={lang}
            products={products}
            pets={pets}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            lang={lang}
            darkMode={darkMode}
            cart={cart}
            savedForLater={savedForLater}
            products={products}
            appliedCoupon={appliedCoupon}
            orderNote={orderNote}
            redirectNotice={cartRedirectNotice}
            onClearRedirectNotice={() => setCartRedirectNotice(null)}
            onUpdateQuantity={handleUpdateCartQuantity}
            onSetQuantity={handleSetCartQuantity}
            onChangeSpec={handleChangeCartItemSpec}
            onRemoveItemWithUndo={handleRemoveItemWithUndo}
            onSaveForLater={handleSaveForLater}
            onMoveSavedToCart={handleMoveSavedToCart}
            onRemoveSavedItem={handleRemoveSavedItem}
            onAcceptPriceChange={handleAcceptCartPriceChange}
            onApplyCoupon={(code) => setAppliedCoupon(code)}
            onRemoveCoupon={() => setAppliedCoupon('')}
            onChangeOrderNote={setOrderNote}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onNavigate={handleNavigate}
            onNavigateUrl={handleNavigateCustomUrl}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            lang={lang}
            darkMode={darkMode}
            cart={cart}
            products={products}
            currentUser={currentUser}
            appliedCoupon={appliedCoupon}
            orderNote={orderNote}
            onChangeOrderNote={setOrderNote}
            onReturnToCartWithNotice={(notice) => {
              setCartRedirectNotice(notice);
              handleNavigateCustomUrl('/gio-hang');
            }}
            onCompleteOrder={() => {
              setCart([]);
              setAppliedCoupon('');
              setOrderNote('');
              addToast(
                lang === 'vi'
                  ? 'Thanh toán đơn hàng thành công! Đội ngũ Animora đang đóng gói cho bé.'
                  : 'Order placed successfully! Animora team is packing your items.'
              );
            }}
            onNavigate={handleNavigate}
            onNavigateUrl={handleNavigateCustomUrl}
          />
        )}

        {activePage === 'pet-profiles' && (
          <PetProfilesPage
            lang={lang}
            pets={pets}
            vaccinations={vaccinations}
            onUpdatePet={handleUpdatePet}
            onAddPet={handleAddPet}
            onNavigate={handleNavigate}
            onBookService={handleSelectService}
            onAddBooking={handleAddBooking}
            onShowToast={addToast}
          />
        )}

        {(activePage === 'login' || activePage === 'register' || activePage === 'account') && (
          <AuthPage
            lang={lang}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onToggleLang={toggleLanguage}
            initialMode={
              activePage === 'register'
                ? 'register'
                : activePage === 'account'
                ? 'account'
                : 'login'
            }
            currentUser={currentUser}
            registeredUsers={registeredUsers}
            onNavigate={handleNavigate}
            onLoginSuccess={(user) => {
              handleMergeCartOnUserLogin(user);
              setCurrentUser(user);
              addToast(
                lang === 'vi'
                  ? `Chào mừng ${user.fullName} đã đăng nhập thành công!`
                  : `Welcome back ${user.fullName}, logged in successfully!`
              );
              const dest = returnPageAfterAuth || 'home';
              setReturnPageAfterAuth(null);
              handleNavigate(dest);
            }}
            onRegisterSuccess={(newUser) => {
              setRegisteredUsers((prev) => {
                if (prev.some((u) => u.id === newUser.id)) return prev;
                return [...prev, newUser];
              });
              handleMergeCartOnUserLogin(newUser);
              setCurrentUser(newUser);
              addToast(
                lang === 'vi'
                  ? `Đăng ký thành công! Chào mừng ${newUser.fullName} đến với Animora.`
                  : `Account created! Welcome ${newUser.fullName} to Animora.`
              );
              const dest = returnPageAfterAuth || 'home';
              setReturnPageAfterAuth(null);
              handleNavigate(dest);
            }}
            onUpdateUser={(updatedUser) => {
              setCurrentUser(updatedUser);
              setRegisteredUsers((prev) =>
                prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
              );
              addToast(
                lang === 'vi'
                  ? 'Đã cập nhật thông tin tài khoản thành công!'
                  : 'Account profile updated successfully!'
              );
            }}
            onLogout={() => {
              setCurrentUser(null);
              addToast(translations[lang].loginModal.logoutToast);
              handleNavigate('login');
            }}
            onResetPasswordSuccess={(identifier, newPassword) => {
              const cleanId = identifier.toLowerCase();
              setRegisteredUsers((prev) =>
                prev.map((u) =>
                  u.email.toLowerCase() === cleanId || u.phone === cleanId
                    ? { ...u, passwordHash: newPassword }
                    : u
                )
              );
              addToast(
                lang === 'vi'
                  ? 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.'
                  : 'Password reset successfully! You can log in now.'
              );
            }}
          />
        )}
      </main>

      {/* Footer (hidden on Login / Register / Account pages) */}
      {activePage !== 'login' &&
        activePage !== 'register' &&
        activePage !== 'account' && (
          <Footer
            lang={lang}
            darkMode={darkMode}
            onNavigate={handleNavigate}
            onShowToast={addToast}
          />
        )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItemWithUndo={handleRemoveItemWithUndo}
        onAddToCart={handleAddToCart}
        onNavigateUrl={handleNavigateCustomUrl}
        onContinueShopping={() => handleNavigate('shop')}
      />

      {/* Quick Search Overlay */}
      <SearchModal
        lang={lang}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        adoptionPets={adoptionPets}
        products={products}
        onNavigate={handleNavigate}
      />

      {/* Authentication & Account Modal (Login / Register / Forgot Password / My Account) */}
      <LoginModal
        lang={lang}
        isOpen={isLoginOpen}
        initialMode={authModalMode}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          handleMergeCartOnUserLogin(user);
          setCurrentUser(user);
          addToast(
            lang === 'vi'
              ? `Chào mừng ${user.fullName} đã đăng nhập thành công!`
              : `Welcome back ${user.fullName}, logged in successfully!`
          );
        }}
        onRegisterSuccess={(newUser) => {
          setRegisteredUsers((prev) => [...prev, newUser]);
          handleMergeCartOnUserLogin(newUser);
          setCurrentUser(newUser);
          addToast(
            lang === 'vi'
              ? `Đăng ký thành công! Chào mừng ${newUser.fullName} đến với Animora.`
              : `Account created! Welcome ${newUser.fullName} to Animora.`
          );
        }}
        onUpdateUser={(updatedUser) => {
          setCurrentUser(updatedUser);
          setRegisteredUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
        }}
        onLogout={() => {
          setCurrentUser(null);
          addToast(translations[lang].loginModal.logoutToast);
        }}
        onResetPasswordSuccess={(identifier, newPassword) => {
          const cleanId = identifier.toLowerCase();
          setRegisteredUsers((prev) =>
            prev.map((u) =>
              u.email.toLowerCase() === cleanId || u.phone === cleanId
                ? { ...u, passwordHash: newPassword }
                : u
            )
          );
        }}
      />
    </div>
  );
}

