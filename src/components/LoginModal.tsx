import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  Phone,
  User,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  KeyRound,
  MapPin,
  LogOut,
  Plus,
  Trash2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { AuthMode, Language, ShippingAddress, UserAccount } from '../types';
import { translations } from '../data/translations';
import {
  evaluatePasswordStrength,
  validateLoginInput,
  validateRegisterInput,
} from '../utils/petLogic';

interface LoginModalProps {
  lang: Language;
  isOpen: boolean;
  initialMode?: AuthMode;
  currentUser: UserAccount | null;
  registeredUsers: UserAccount[];
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  onRegisterSuccess: (user: UserAccount) => void;
  onUpdateUser: (user: UserAccount) => void;
  onLogout: () => void;
  onResetPasswordSuccess?: (identifier: string, newPassword: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  lang,
  isOpen,
  initialMode = 'login',
  currentUser,
  registeredUsers,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  onUpdateUser,
  onLogout,
  onResetPasswordSuccess,
}) => {
  const t = translations[lang].loginModal;

  const [mode, setMode] = useState<AuthMode>(
    currentUser ? 'account' : initialMode === 'account' ? 'login' : initialMode
  );

  // Sync mode when modal opens or initialMode/currentUser changes
  useEffect(() => {
    if (isOpen) {
      if (currentUser && initialMode === 'account') {
        setMode('account');
      } else if (currentUser && (initialMode === 'login' || initialMode === 'register')) {
        setMode('account');
      } else {
        setMode(initialMode === 'account' ? 'login' : initialMode);
      }
      setErrorMsg('');
      setSuccessBanner('');
    }
  }, [isOpen, initialMode, currentUser]);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form States
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Forgot Password States (ACC-07)
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetConfirmPass, setResetConfirmPass] = useState('');

  // Account Management Sub-tab (ACC-04, ACC-05, ACC-06)
  const [accountTab, setAccountTab] = useState<'profile' | 'addresses' | 'security'>('profile');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // New shipping address form (ACC-05)
  const [addrLabel, setAddrLabel] = useState(lang === 'vi' ? 'Nhà riêng' : 'Home');
  const [addrRecipient, setAddrRecipient] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine, setAddrLine] = useState('');

  // Change password form (ACC-06)
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmNewPassInput, setConfirmNewPassInput] = useState('');

  // Feedback States
  const [errorMsg, setErrorMsg] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.fullName);
      setEditEmail(currentUser.email);
      setEditPhone(currentUser.phone);
      setAddrRecipient(currentUser.fullName);
      setAddrPhone(currentUser.phone);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const pwdStrength = evaluatePasswordStrength(regPassword);

  const switchMode = (target: AuthMode) => {
    setErrorMsg('');
    setSuccessBanner('');
    if (target === 'forgot-password') {
      setForgotStep(1);
    }
    setMode(target);
  };

  // Handle Login (ACC-02)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = validateLoginInput(loginIdentifier, loginPassword);
    if (!validation.isValid) {
      setErrorMsg(lang === 'vi' ? validation.errorVi || '' : validation.errorEn || '');
      return;
    }

    const cleanId = loginIdentifier.trim().toLowerCase();
    const matchedUser = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '')
    );

    if (matchedUser) {
      if (matchedUser.passwordHash !== loginPassword) {
        setErrorMsg(
          lang === 'vi'
            ? 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.'
            : 'Incorrect password. Please try again.'
        );
        return;
      }
      onLoginSuccess(matchedUser);
      onClose();
      return;
    }

    // Create session for valid new email/phone login if not pre-registered
    const fallbackUser: UserAccount = {
      id: 'user-' + Date.now(),
      fullName: cleanId.includes('@') ? cleanId.split('@')[0] : 'Khách hàng Animora',
      email: cleanId.includes('@') ? cleanId : `${cleanId}@animora.vn`,
      phone: cleanId.includes('@') ? '0901234567' : cleanId,
      passwordHash: loginPassword,
      role: 'owner',
      createdAt: new Date().toISOString().split('T')[0],
      addresses: [
        {
          id: 'addr-default-1',
          label: lang === 'vi' ? 'Nhà riêng' : 'Home',
          recipientName: cleanId.includes('@') ? cleanId.split('@')[0] : 'Khách hàng Animora',
          phone: cleanId.includes('@') ? '0901234567' : cleanId,
          addressLine: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM',
          isDefault: true,
        },
      ],
    };
    onLoginSuccess(fallbackUser);
    onClose();
  };

  // Handle Demo Quick Login
  const handleDemoLogin = () => {
    setErrorMsg('');
    const demoUser =
      registeredUsers[0] || {
        id: 'user-demo-owner',
        fullName: 'Nguyễn Minh Anh',
        email: 'minhanh@animora.vn',
        phone: '0901234567',
        passwordHash: '123456',
        role: 'owner',
        createdAt: '2026-01-15',
        addresses: [
          {
            id: 'addr-demo-1',
            label: 'Nhà riêng',
            recipientName: 'Nguyễn Minh Anh',
            phone: '0901234567',
            addressLine: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
            isDefault: true,
          },
        ],
      };
    onLoginSuccess(demoUser);
    onClose();
  };

  // Handle Register (ACC-01)
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = validateRegisterInput({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      confirmPassword: regConfirmPassword,
      agreedTerms,
    });

    if (!validation.isValid) {
      setErrorMsg(lang === 'vi' ? validation.errorVi || '' : validation.errorEn || '');
      return;
    }

    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanPhone = regPhone.trim();

    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone === cleanPhone
    );
    if (exists) {
      setErrorMsg(
        lang === 'vi'
          ? 'Email hoặc Số điện thoại này đã được đăng ký. Vui lòng đăng nhập.'
          : 'This Email or Phone number is already registered. Please log in.'
      );
      return;
    }

    const newUser: UserAccount = {
      id: 'user-' + Date.now(),
      fullName: regFullName.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      passwordHash: regPassword,
      role: 'owner',
      createdAt: new Date().toISOString().split('T')[0],
      addresses: [
        {
          id: 'addr-' + Date.now(),
          label: lang === 'vi' ? 'Nhà riêng' : 'Home',
          recipientName: regFullName.trim(),
          phone: cleanPhone,
          addressLine:
            lang === 'vi'
              ? '128 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh'
              : '128 Nguyen Trai St, District 1, HCMC',
          isDefault: true,
        },
      ],
    };

    onRegisterSuccess(newUser);
    onClose();
  };

  // Handle Forgot Password Step 1 & Step 2 (ACC-07)
  const handleForgotSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!forgotIdentifier.trim()) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng nhập Email hoặc Số điện thoại đã đăng ký.'
          : 'Please enter your registered Email or Phone number.'
      );
      return;
    }
    setOtpInput('246810');
    setForgotStep(2);
    setSuccessBanner(
      lang === 'vi'
        ? 'Mã xác thực OTP (246810) đã được gửi tới tài khoản của bạn!'
        : 'Verification OTP code (246810) has been sent!'
    );
  };

  const handleForgotResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (otpInput.trim().length < 4) {
      setErrorMsg(
        lang === 'vi' ? 'Mã OTP không hợp lệ.' : 'Invalid OTP verification code.'
      );
      return;
    }
    if (!resetNewPass || resetNewPass.length < 6) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu mới phải có từ 6 ký tự trở lên.'
          : 'New password must be at least 6 characters.'
      );
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu xác nhận không khớp.'
          : 'Confirmation password does not match.'
      );
      return;
    }

    if (onResetPasswordSuccess) {
      onResetPasswordSuccess(forgotIdentifier.trim(), resetNewPass);
    }
    setLoginIdentifier(forgotIdentifier.trim());
    setLoginPassword(resetNewPass);
    setMode('login');
    setSuccessBanner(t.resetSuccessToast);
  };

  // Handle Profile Update (ACC-04)
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg('');
    if (editName.trim().length < 2) {
      setErrorMsg(
        lang === 'vi' ? 'Họ và tên phải có ít nhất 2 ký tự.' : 'Name must be at least 2 characters.'
      );
      return;
    }
    const updated: UserAccount = {
      ...currentUser,
      fullName: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    };
    onUpdateUser(updated);
    setSuccessBanner(
      lang === 'vi'
        ? 'Đã cập nhật thông tin hồ sơ cá nhân thành công!'
        : 'Personal profile updated successfully!'
    );
  };

  // Handle Add Shipping Address (ACC-05)
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg('');
    if (!addrLine.trim() || !addrRecipient.trim() || !addrPhone.trim()) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng điền đầy đủ người nhận, số điện thoại và địa chỉ.'
          : 'Please complete recipient name, phone, and address line.'
      );
      return;
    }
    const newAddr: ShippingAddress = {
      id: 'addr-' + Date.now(),
      label: addrLabel.trim() || (lang === 'vi' ? 'Nhà riêng' : 'Home'),
      recipientName: addrRecipient.trim(),
      phone: addrPhone.trim(),
      addressLine: addrLine.trim(),
      isDefault: currentUser.addresses.length === 0,
    };
    onUpdateUser({
      ...currentUser,
      addresses: [...currentUser.addresses, newAddr],
    });
    setAddrLine('');
    setSuccessBanner(
      lang === 'vi' ? 'Đã thêm địa chỉ giao hàng mới!' : 'New delivery address added!'
    );
  };

  const handleSetDefaultAddress = (addrId: string) => {
    if (!currentUser) return;
    onUpdateUser({
      ...currentUser,
      addresses: currentUser.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addrId,
      })),
    });
  };

  const handleDeleteAddress = (addrId: string) => {
    if (!currentUser) return;
    onUpdateUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== addrId),
    });
  };

  // Handle Change Password (ACC-06)
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg('');
    if (newPassInput.length < 6) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu mới phải có từ 6 ký tự trở lên.'
          : 'New password must be at least 6 characters.'
      );
      return;
    }
    if (newPassInput !== confirmNewPassInput) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu mới xác nhận không khớp.'
          : 'New confirmation password does not match.'
      );
      return;
    }
    onUpdateUser({
      ...currentUser,
      passwordHash: newPassInput,
    });
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmNewPassInput('');
    setSuccessBanner(
      lang === 'vi' ? 'Đã đổi mật khẩu bảo mật thành công!' : 'Password updated successfully!'
    );
  };

  return (
    <div
      data-testid="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md overflow-y-auto"
    >
      <div
        data-testid="auth-modal-dialog"
        className="animora-card max-w-4xl w-full overflow-hidden relative animate-scale-up my-auto shadow-2xl border"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Close Button */}
        <button
          type="button"
          data-testid="auth-modal-close"
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-soft)',
            color: 'var(--text)',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
          {/* Left Side: Brand Showcase & Member Benefits (5 cols on desktop) */}
          <div
            className="hidden md:flex md:col-span-5 p-8 flex-col justify-between relative overflow-hidden"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
            }}
          >
            {/* Decorative soft circles */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
              style={{ backgroundColor: 'var(--coral)' }}
            />
            <div
              className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-10 pointer-events-none"
              style={{ backgroundColor: 'var(--on-primary)' }}
            />

            <div className="space-y-6 relative z-10">
              {/* Brand Lockup */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2 shadow-md shrink-0"
                  style={{ borderColor: 'var(--coral)' }}
                >
                  <img
                    src="/src/assets/images/animora_pet_logo_1793179870995.jpg"
                    alt="Animora Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-heading text-2xl font-extrabold tracking-tight block leading-none">
                    Animora
                  </span>
                  <span className="text-xs opacity-80 font-medium">
                    Multi-Species Pet Care Center
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--coral)',
                    color: 'var(--on-coral)',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Animora Member Club</span>
                </span>
                <h4 className="font-heading text-2xl font-extrabold leading-snug pt-1">
                  {lang === 'vi'
                    ? 'Đồng hành trọn vẹn cùng sức khỏe bé cưng'
                    : 'Complete care for every beloved companion'}
                </h4>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                  >
                    <ShieldCheck className="w-4.5 h-4.5" style={{ color: 'var(--coral)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.benefit1Title}</p>
                    <p className="text-xs opacity-80 leading-relaxed mt-0.5">{t.benefit1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                  >
                    <HeartHandshake className="w-4.5 h-4.5" style={{ color: 'var(--coral)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.benefit2Title}</p>
                    <p className="text-xs opacity-80 leading-relaxed mt-0.5">{t.benefit2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                  >
                    <CheckCircle2 className="w-4.5 h-4.5" style={{ color: 'var(--coral)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.benefit3Title}</p>
                    <p className="text-xs opacity-80 leading-relaxed mt-0.5">{t.benefit3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Footer */}
            <div className="pt-6 border-t border-white/15 text-xs opacity-85 relative z-10 flex items-center justify-between">
              <span>
                {lang === 'vi'
                  ? '1.600+ gia đình tin chọn từ 2012'
                  : '1,600+ families trusted since 2012'}
              </span>
              <span className="font-bold">4.9 ★</span>
            </div>
          </div>

          {/* Right Side: Interactive Forms (7 cols on desktop) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            {/* Top Mode Switcher Tabs when not in 'account' mode */}
            {mode !== 'account' && (
              <div className="mb-6">
                <div
                  className="grid grid-cols-2 p-1 rounded-2xl border max-w-xs"
                  style={{
                    backgroundColor: 'var(--bg-soft)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <button
                    type="button"
                    data-testid="auth-tab-login"
                    onClick={() => switchMode('login')}
                    className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                      mode === 'login' || mode === 'forgot-password' ? 'shadow-sm' : ' opacity-75'
                    }`}
                    style={{
                      backgroundColor:
                        mode === 'login' || mode === 'forgot-password'
                          ? 'var(--primary)'
                          : 'transparent',
                      color:
                        mode === 'login' || mode === 'forgot-password'
                          ? 'var(--on-primary)'
                          : 'var(--text)',
                    }}
                  >
                    {t.tabLogin}
                  </button>
                  <button
                    type="button"
                    data-testid="auth-tab-register"
                    onClick={() => switchMode('register')}
                    className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                      mode === 'register' ? 'shadow-sm' : 'opacity-75'
                    }`}
                    style={{
                      backgroundColor: mode === 'register' ? 'var(--primary)' : 'transparent',
                      color: mode === 'register' ? 'var(--on-primary)' : 'var(--text)',
                    }}
                  >
                    {t.tabRegister}
                  </button>
                </div>
              </div>
            )}

            {/* Feedback Alerts */}
            {errorMsg && (
              <div
                data-testid="auth-error-banner"
                className="mb-4 p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.35)',
                  color: '#ef4444',
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successBanner && (
              <div
                data-testid="auth-success-banner"
                className="mb-4 p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  borderColor: 'rgba(16, 185, 129, 0.35)',
                  color: '#10b981',
                }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successBanner}</span>
              </div>
            )}

            {/* ==================== 1. LOGIN SCREEN (ACC-02) ==================== */}
            {mode === 'login' && (
              <div data-testid="login-screen" className="space-y-5">
                <div className="space-y-1">
                  <h3
                    className="card-title text-2xl font-extrabold"
                    style={{ color: 'var(--text)' }}
                  >
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t.subtitle}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-bold flex items-center gap-1.5"
                      style={{ color: 'var(--text)' }}
                    >
                      <Mail className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                      {t.emailLabel}
                    </label>
                    <input
                      type="text"
                      data-testid="login-identifier-input"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="minhanh@animora.vn / 0901234567"
                      className="form-input w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <Lock className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.passLabel}
                      </label>
                      <button
                        type="button"
                        data-testid="forgot-password-link"
                        onClick={() => switchMode('forgot-password')}
                        className="text-xs font-bold hover:underline cursor-pointer"
                        style={{ color: 'var(--coral)' }}
                      >
                        {t.forgotLink}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPass ? 'text' : 'password'}
                        data-testid="login-password-input"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="form-input w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPass((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-70 hover:opacity-100 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPass ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded accent-[var(--primary)] w-3.5 h-3.5"
                      />
                      <span style={{ color: 'var(--text-muted)' }}>{t.rememberMe}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    data-testid="login-submit-btn"
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-md text-sm font-bold cursor-pointer"
                  >
                    <span>{t.submitBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    data-testid="demo-login-btn"
                    onClick={handleDemoLogin}
                    className="btn-secondary w-full py-2.5 text-xs font-bold text-center cursor-pointer"
                  >
                    {t.demoLoginBtn}
                  </button>
                </form>

                <div
                  className="pt-3 border-t text-center text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <span>{t.switchToRegister} </span>
                  <button
                    type="button"
                    data-testid="switch-to-register-btn"
                    onClick={() => switchMode('register')}
                    className="font-extrabold hover:underline ml-1 cursor-pointer"
                    style={{ color: 'var(--primary)' }}
                  >
                    {t.switchToRegisterBtn} →
                  </button>
                </div>
              </div>
            )}

            {/* ==================== 2. REGISTER SCREEN (ACC-01) ==================== */}
            {mode === 'register' && (
              <div data-testid="register-screen" className="space-y-4">
                <div className="space-y-1">
                  <h3
                    className="card-title text-2xl font-extrabold"
                    style={{ color: 'var(--text)' }}
                  >
                    {t.registerTitle}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t.registerSubtitle}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5" noValidate>
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label
                      className="text-xs font-bold flex items-center gap-1.5"
                      style={{ color: 'var(--text)' }}
                    >
                      <User className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                      {t.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      data-testid="register-name-input"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className="form-input w-full"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <Mail className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.emailOnlyLabel}
                      </label>
                      <input
                        type="email"
                        data-testid="register-email-input"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="minhanh@animora.vn"
                        className="form-input w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <Phone className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        data-testid="register-phone-input"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="form-input w-full"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <Lock className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.passLabel}
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPass ? 'text' : 'password'}
                          data-testid="register-password-input"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="form-input w-full pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPass((prev) => !prev)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100 cursor-pointer"
                          style={{ color: 'var(--text-muted)' }}
                          aria-label="Toggle password visibility"
                        >
                          {showRegPass ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <KeyRound className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.confirmPassLabel}
                      </label>
                      <input
                        type={showRegPass ? 'text' : 'password'}
                        data-testid="register-confirm-password-input"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="form-input w-full"
                      />
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {regPassword.length > 0 && (
                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span style={{ color: 'var(--text-muted)' }}>
                          {lang === 'vi' ? 'Độ mạnh mật khẩu:' : 'Password strength:'}
                        </span>
                        <span
                          style={{
                            color:
                              pwdStrength.level === 'strong'
                                ? '#10b981'
                                : pwdStrength.level === 'medium'
                                ? '#f59e0b'
                                : '#ef4444',
                          }}
                        >
                          {lang === 'vi' ? pwdStrength.labelVi : pwdStrength.labelEn}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 h-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className="rounded-full transition-all duration-300"
                            style={{
                              backgroundColor:
                                pwdStrength.score >= step
                                  ? pwdStrength.level === 'strong'
                                    ? '#10b981'
                                    : pwdStrength.level === 'medium'
                                    ? '#f59e0b'
                                    : '#ef4444'
                                  : 'var(--border)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Terms & Policy Agreement */}
                  <label className="flex items-start gap-2 text-xs cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      data-testid="register-terms-checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 rounded accent-[var(--primary)] w-4 h-4 shrink-0"
                    />
                    <span className="leading-snug" style={{ color: 'var(--text-muted)' }}>
                      {t.termsAgree}
                    </span>
                  </label>

                  <button
                    type="submit"
                    data-testid="register-submit-btn"
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-md text-sm font-bold cursor-pointer"
                  >
                    <span>{t.registerSubmitBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div
                  className="pt-3 border-t text-center text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <span>{t.switchToLogin} </span>
                  <button
                    type="button"
                    data-testid="switch-to-login-btn"
                    onClick={() => switchMode('login')}
                    className="font-extrabold hover:underline ml-1 cursor-pointer"
                    style={{ color: 'var(--primary)' }}
                  >
                    {t.switchToLoginBtn} →
                  </button>
                </div>
              </div>
            )}

            {/* ==================== 3. FORGOT PASSWORD SCREEN (ACC-07) ==================== */}
            {mode === 'forgot-password' && (
              <div data-testid="forgot-password-screen" className="space-y-5">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline cursor-pointer"
                  style={{ color: 'var(--primary)' }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.backToLogin}</span>
                </button>

                <div className="space-y-1">
                  <h3
                    className="card-title text-2xl font-extrabold"
                    style={{ color: 'var(--text)' }}
                  >
                    {t.forgotTitle}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t.forgotSubtitle}
                  </p>
                </div>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotSendOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--text)' }}
                      >
                        <Mail className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                        {t.emailLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={forgotIdentifier}
                        onChange={(e) => setForgotIdentifier(e.target.value)}
                        placeholder="minhanh@animora.vn / 0901234567"
                        className="form-input w-full"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer"
                    >
                      <span>{t.sendOtpBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotResetSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                        {t.otpLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="246810"
                        className="form-input w-full font-mono tracking-widest text-center font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.newPassLabel}
                        </label>
                        <input
                          type="password"
                          required
                          value={resetNewPass}
                          onChange={(e) => setResetNewPass(e.target.value)}
                          placeholder="••••••••"
                          className="form-input w-full"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.confirmPassLabel}
                        </label>
                        <input
                          type="password"
                          required
                          value={resetConfirmPass}
                          onChange={(e) => setResetConfirmPass(e.target.value)}
                          placeholder="••••••••"
                          className="form-input w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer"
                    >
                      <span>{t.resetPassBtn}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ==================== 4. USER ACCOUNT SCREEN (ACC-03, ACC-04, ACC-05, ACC-06) ==================== */}
            {mode === 'account' && currentUser && (
              <div data-testid="account-screen" className="space-y-5">
                {/* User Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading text-lg font-extrabold shadow-sm"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--on-primary)',
                      }}
                    >
                      {currentUser.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
                        {currentUser.fullName}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {currentUser.email} · {currentUser.phone}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid="logout-btn"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all hover:opacity-90 cursor-pointer"
                    style={{
                      borderColor: 'rgba(239, 68, 68, 0.35)',
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.logoutBtn}</span>
                  </button>
                </div>

                {/* Account Sub-tabs */}
                <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                  {[
                    {
                      id: 'profile' as const,
                      label: lang === 'vi' ? 'Hồ sơ cá nhân' : 'Profile',
                      icon: User,
                    },
                    {
                      id: 'addresses' as const,
                      label: lang === 'vi' ? 'Sổ địa chỉ' : 'Addresses',
                      icon: MapPin,
                    },
                    {
                      id: 'security' as const,
                      label: lang === 'vi' ? 'Đổi mật khẩu' : 'Password',
                      icon: KeyRound,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = accountTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setErrorMsg('');
                          setSuccessBanner('');
                          setAccountTab(tab.id);
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        style={{
                          backgroundColor: active ? 'var(--primary)' : 'var(--bg-soft)',
                          color: active ? 'var(--on-primary)' : 'var(--text)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-tab 1: Profile Info (ACC-04) */}
                {accountTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                        {t.fullNameLabel}
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="form-input w-full"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.emailOnlyLabel}
                        </label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="form-input w-full"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="form-input w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary px-5 py-2.5 text-xs font-bold cursor-pointer"
                    >
                      {lang === 'vi' ? 'Lưu thông tin cá nhân' : 'Save profile changes'}
                    </button>
                  </form>
                )}

                {/* Sub-tab 2: Shipping Addresses (ACC-05) */}
                {accountTab === 'addresses' && (
                  <div className="space-y-4">
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {currentUser.addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className="p-3 rounded-xl border flex items-start justify-between gap-2 text-xs"
                          style={{
                            borderColor: addr.isDefault ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: 'var(--bg-soft)',
                          }}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold" style={{ color: 'var(--text)' }}>
                                {addr.label} — {addr.recipientName}
                              </span>
                              {addr.isDefault && (
                                <span
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                  style={{
                                    backgroundColor: 'var(--coral)',
                                    color: 'var(--on-coral)',
                                  }}
                                >
                                  {lang === 'vi' ? 'Mặc định' : 'Default'}
                                </span>
                              )}
                            </div>
                            <p style={{ color: 'var(--text-muted)' }}>{addr.phone}</p>
                            <p style={{ color: 'var(--text)' }}>{addr.addressLine}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {!addr.isDefault && (
                              <button
                                type="button"
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer"
                                style={{
                                  borderColor: 'var(--border)',
                                  color: 'var(--primary)',
                                }}
                              >
                                {lang === 'vi' ? 'Đặt mặc định' : 'Set default'}
                              </button>
                            )}
                            {currentUser.addresses.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer"
                                aria-label="Delete address"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleAddAddress}
                      className="space-y-2.5 pt-2 border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <p className="text-xs font-extrabold" style={{ color: 'var(--text)' }}>
                        + {lang === 'vi' ? 'Thêm địa chỉ nhận hàng mới' : 'Add new delivery address'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={addrLabel}
                          onChange={(e) => setAddrLabel(e.target.value)}
                          placeholder={lang === 'vi' ? 'Nhãn (Nhà / Công ty)' : 'Label (Home/Work)'}
                          className="form-input text-xs py-2"
                        />
                        <input
                          type="text"
                          value={addrRecipient}
                          onChange={(e) => setAddrRecipient(e.target.value)}
                          placeholder={lang === 'vi' ? 'Người nhận' : 'Recipient'}
                          className="form-input text-xs py-2"
                        />
                        <input
                          type="tel"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          placeholder={lang === 'vi' ? 'Số điện thoại' : 'Phone'}
                          className="form-input text-xs py-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={addrLine}
                          onChange={(e) => setAddrLine(e.target.value)}
                          placeholder={
                            lang === 'vi'
                              ? 'Số nhà, tên đường, phường/xã, quận/huyện...'
                              : 'Street address, ward, district, city...'
                          }
                          className="form-input text-xs py-2 flex-1"
                        />
                        <button
                          type="submit"
                          className="btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{lang === 'vi' ? 'Thêm' : 'Add'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Sub-tab 3: Change Password (ACC-06) */}
                {accountTab === 'security' && (
                  <form onSubmit={handleChangePassword} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                        {t.currentPassLabel}
                      </label>
                      <input
                        type="password"
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        placeholder="••••••••"
                        className="form-input w-full"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.newPassLabel}
                        </label>
                        <input
                          type="password"
                          value={newPassInput}
                          onChange={(e) => setNewPassInput(e.target.value)}
                          placeholder="••••••••"
                          className="form-input w-full"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold block" style={{ color: 'var(--text)' }}>
                          {t.confirmPassLabel}
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassInput}
                          onChange={(e) => setConfirmNewPassInput(e.target.value)}
                          placeholder="••••••••"
                          className="form-input w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary px-5 py-2.5 text-xs font-bold cursor-pointer"
                    >
                      {lang === 'vi' ? 'Cập nhật mật khẩu mới' : 'Update password'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
