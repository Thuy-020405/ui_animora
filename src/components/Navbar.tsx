import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  ShoppingBag,
  Menu,
  X,
  User,
  UserPlus,
  CalendarCheck,
  ChevronDown,
  LogOut,
  Package,
  PawPrint,
} from 'lucide-react';
import { Language, PageId, UserAccount } from '../types';
import { translations } from '../data/translations';
import { getLanguageToggleMeta } from '../utils/petLogic';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch?: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAccount: () => void;
  onLogout?: () => void;
  currentUser: UserAccount | null;
  activePage: PageId;
  scrollSpyPage?: PageId | null;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenRegister,
  onOpenAccount,
  onLogout,
  currentUser,
  activePage,
  scrollSpyPage,
  onNavigate,
}) => {
  // Keep active navbar tab strictly tied to current page so it does not shift during home page scrolling
  const effectiveActivePage = activePage;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement | null>(null);
  const [badgePop, setBadgePop] = useState(false);
  const prevCartCountRef = React.useRef(cartCount);
  const t = translations[lang].nav;
  const langMeta = getLanguageToggleMeta(lang);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(e.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setBadgePop(true);
      const timer = window.setTimeout(() => setBadgePop(false), 260);
      prevCartCountRef.current = cartCount;
      return () => window.clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; name: string; shortName: string }[] = [
    { id: 'home', name: t.home, shortName: t.home },
    { id: 'about', name: t.about, shortName: t.about },
    { id: 'services', name: t.services, shortName: t.services },
    { id: 'adopt', name: t.adopt, shortName: t.adopt },
    { id: 'shop', name: t.shop, shortName: t.shop },
    {
      id: 'pet-profiles',
      name: t.petProfiles,
      shortName: lang === 'vi' ? 'Hồ sơ' : 'Profiles',
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[var(--nav-h)] transition-all duration-300 flex items-center ${
        scrolled
          ? 'glass-card border-b shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="shared-container w-full flex items-center justify-between gap-3 lg:gap-4">
        {/* Left: Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 cursor-pointer"
        >
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105 shadow-md flex items-center justify-center shrink-0"
            style={{
              borderColor: 'var(--primary)',
              backgroundColor: 'var(--primary)',
            }}
          >
            <img
              src="/src/assets/images/animora_pet_logo_1793179870995.jpg"
              alt="Animora Pet Care Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight pt-0.5 transition-colors duration-300"
            style={{ color: 'var(--primary)' }}
          >
            Animora
          </span>
        </button>

        {/* Center: Floating GLASS Pill Menu Container (Visible >= 960px) */}
        <nav className="hidden min-[960px]:flex items-center gap-0.5 p-1 rounded-full whitespace-nowrap transition-all duration-300 glass-pill">
          {navLinks.map((link) => {
            const isActive = effectiveActivePage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                data-testid={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive ? 'shadow-sm' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'var(--on-primary)' : 'var(--text)',
                }}
              >
                {link.id === 'pet-profiles' ? (
                  <>
                    <span className="hidden min-[1280px]:inline">{link.name}</span>
                    <span className="inline min-[1280px]:hidden">{link.shortName}</span>
                  </>
                ) : (
                  link.name
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Action Buttons (Glass Pills) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language Toggle with Subtle Tooltip */}
          <div className="relative flex items-center">
            <button
              type="button"
              data-testid="lang-toggle"
              onClick={onToggleLang}
              aria-label={langMeta.ariaLabel}
              aria-describedby="navbar-lang-tooltip"
              className="peer flex items-center gap-0.5 p-0.5 rounded-full text-[11px] font-extrabold transition-all duration-200 hover:scale-105 active:scale-95 uppercase tracking-wider glass-pill cursor-pointer"
            >
              <span
                className="px-2 py-0.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: lang === 'vi' ? 'var(--primary)' : 'transparent',
                  color: lang === 'vi' ? 'var(--on-primary)' : 'var(--text-muted)',
                }}
              >
                VI
              </span>
              <span
                className="px-2 py-0.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: lang === 'en' ? 'var(--primary)' : 'transparent',
                  color: lang === 'en' ? 'var(--on-primary)' : 'var(--text-muted)',
                }}
              >
                EN
              </span>
            </button>

            {/* Subtle Hover/Focus Tooltip */}
            <div
              id="navbar-lang-tooltip"
              role="tooltip"
              data-testid="lang-tooltip"
              className="pointer-events-none invisible opacity-0 peer-hover:visible peer-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100 transition-all duration-200 translate-y-1 peer-hover:translate-y-0 peer-focus-visible:translate-y-0 absolute right-0 top-full mt-2.5 z-50 whitespace-nowrap rounded-2xl px-3.5 py-2.5 shadow-xl border text-left glass-card"
              style={{
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold" style={{ color: 'var(--primary)' }}>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--coral)' }}
                />
                <span>{langMeta.tooltipStatus}</span>
              </div>
              <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {langMeta.tooltipAction} →
              </div>
            </div>
          </div>

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 glass-pill cursor-pointer"
            aria-label="Toggle light/dark theme"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            data-testid="navbar-cart-btn"
            className="relative w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 glass-pill cursor-pointer"
            aria-label={lang === 'vi' ? `Giỏ hàng (${cartCount})` : `View Cart (${cartCount})`}
          >
            <ShoppingBag className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            {cartCount > 0 && (
              <span
                data-testid="navbar-cart-badge"
                className="absolute -top-1 -right-1 text-[10px] font-extrabold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: '#FF7F6B',
                  color: '#FFFFFF',
                  transform: badgePop ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth Action Buttons (Desktop >= 640px) */}
          {currentUser ? (
            <div ref={accountDropdownRef} className="relative hidden sm:block">
              <button
                type="button"
                data-testid="nav-user-profile-btn"
                aria-expanded={accountMenuOpen}
                aria-haspopup="menu"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full text-xs font-bold shadow-sm transition-transform hover:scale-105 glass-pill cursor-pointer ${
                  activePage === 'account' || activePage === 'my-bookings'
                    ? 'ring-2 ring-[var(--coral)]'
                    : ''
                }`}
                style={{ color: 'var(--text)' }}
              >
                <span
                  className="w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-extrabold"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                  }}
                >
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[96px] truncate">{currentUser.fullName}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-75" />
              </button>

              {accountMenuOpen && (
                <div
                  role="menu"
                  data-testid="nav-account-dropdown"
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl border p-2 shadow-xl z-50 space-y-1"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    data-testid="nav-dropdown-my-bookings"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onNavigate('my-bookings');
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                    style={{
                      color:
                        activePage === 'my-bookings' ? 'var(--primary)' : 'var(--text)',
                    }}
                  >
                    <CalendarCheck
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>{lang === 'vi' ? 'Lịch hẹn của tôi' : 'My bookings'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    data-testid="nav-dropdown-my-orders"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onNavigate('cart');
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                    style={{
                      color:
                        activePage === 'cart' || activePage === 'checkout' ? 'var(--primary)' : 'var(--text)',
                    }}
                  >
                    <Package
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>{lang === 'vi' ? 'Đơn hàng của tôi' : 'My orders'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    data-testid="nav-dropdown-pet-profiles"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onNavigate('pet-profiles');
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                    style={{
                      color:
                        activePage === 'pet-profiles' ? 'var(--primary)' : 'var(--text)',
                    }}
                  >
                    <PawPrint
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>{lang === 'vi' ? 'Hồ sơ thú cưng' : 'Pet profiles'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    data-testid="nav-dropdown-account"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onOpenAccount();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
                    style={{ color: 'var(--text)' }}
                  >
                    <User
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    <span>{lang === 'vi' ? 'Tài khoản của tôi' : 'My account'}</span>
                  </button>

                  {onLogout && (
                    <button
                      type="button"
                      role="menuitem"
                      data-testid="nav-dropdown-logout"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors hover:bg-red-500/10 text-red-600 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>{lang === 'vi' ? 'Đăng xuất' : 'Log out'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                data-testid="nav-register-btn"
                onClick={onOpenRegister}
                className={`hidden min-[1520px]:flex px-2.5 py-1.5 rounded-full text-xs font-bold items-center gap-1.5 whitespace-nowrap transition-transform hover:scale-105 cursor-pointer ${
                  activePage === 'register' ? 'btn-primary shadow-md' : 'glass-pill'
                }`}
                style={activePage === 'register' ? undefined : { color: 'var(--primary)' }}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.register}</span>
              </button>
              <button
                type="button"
                data-testid="nav-login-btn"
                onClick={onOpenLogin}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 whitespace-nowrap transition-transform hover:scale-105 cursor-pointer ${
                  activePage === 'register'
                    ? 'glass-pill font-bold'
                    : 'btn-primary shadow-md'
                }`}
                style={activePage === 'register' ? { color: 'var(--primary)' } : undefined}
              >
                <User className="w-3.5 h-3.5" />
                <span className="font-bold">{t.login}</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle (Visible < 960px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[960px]:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors glass-pill"
            style={{ color: 'var(--text)' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Panel (< 960px) */}
      {mobileMenuOpen && (
        <div className="min-[960px]:hidden absolute top-[var(--nav-h)] left-0 right-0 p-4">
          <div className="shared-container">
            <div className="glass-card rounded-2xl p-4 space-y-2 shadow-2xl border">
              {navLinks.map((link) => {
                const isActive = effectiveActivePage === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-3 text-base font-bold rounded-xl transition-all cursor-pointer ${
                      isActive ? 'shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? 'var(--on-primary)' : 'var(--text)',
                    }}
                  >
                    {link.name}
                  </button>
                );
              })}

              {/* Mobile My Bookings Link */}
              <button
                type="button"
                data-testid="mobile-nav-my-bookings"
                onClick={() => {
                  onNavigate('my-bookings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-base font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                style={{
                  backgroundColor:
                    activePage === 'my-bookings' ? 'var(--primary)' : 'transparent',
                  color:
                    activePage === 'my-bookings' ? 'var(--on-primary)' : 'var(--text)',
                }}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>{lang === 'vi' ? 'Lịch hẹn của tôi' : 'My bookings'}</span>
              </button>

              {/* Mobile Auth Buttons inside menu */}
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="w-full btn-primary py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2 shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>{currentUser.fullName}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenRegister();
                    }}
                    className="btn-secondary py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{t.register}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="btn-primary py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>{t.login}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

