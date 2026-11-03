import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  LogOut,
  Plus,
  Trash2,
  MapPin,
  Edit3,
  Check,
  ArrowLeft,
  Sun,
  Moon,
  ShieldCheck,
  X,
  Loader2,
  Lock,
  User as UserIcon,
  Mail,
  Phone as PhoneIcon,
} from 'lucide-react';
import { Language, AuthMode, UserAccount, ShippingAddress, PageId } from '../../types';
import { translations } from '../../data/translations';
import { CONTACT_INFO } from '../../config/contact';
import { evaluatePasswordStrength } from '../../utils/petLogic';

import animoraLogo from '../../assets/images/animora_pet_logo_1793179870995.jpg';

interface AuthPageProps {
  lang: Language;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onToggleLang?: () => void;
  initialMode: AuthMode;
  currentUser: UserAccount | null;
  registeredUsers: UserAccount[];
  onNavigate: (page: PageId) => void;
  onLoginSuccess: (user: UserAccount) => void;
  onRegisterSuccess: (newUser: UserAccount) => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onLogout: () => void;
  onResetPasswordSuccess: (identifier: string, newPassword: string) => void;
}

const DEMO_OTP_CODE = '123456';

const GMAIL_QUICK_ACCOUNTS = [
  {
    fullName: CONTACT_INFO.personName,
    email: CONTACT_INFO.email,
    phone: '0337203332',
    badgeVi: 'Tài khoản Gmail chính chủ',
    badgeEn: 'Primary Gmail Account',
  },
  {
    fullName: 'Nguyễn Minh Anh',
    email: 'minhanh.animora@gmail.com',
    phone: '0901234567',
    badgeVi: 'Thành viên Thân thiết',
    badgeEn: 'Loyalty Member',
  },
];

const PET_SLIDES = [
  {
    id: 'corgi-smile',
    image: '/assets/aistudio/auth_corgi_centered.jpg',
    tagVi: 'Bé Corgi siêu đáng yêu',
    tagEn: 'Happy Corgi companion',
    captionVi: 'Chăm sóc toàn diện cho hàng ngàn thú cưng cùng đội ngũ bác sĩ & chuyên gia tận tâm.',
    captionEn: 'Comprehensive care for thousands of pets with trusted veterinary & spa specialists.',
    subVi: 'Đồng hành cùng bé cưng trên mọi hành trình sức khỏe và niềm vui.',
    subEn: 'Partnering with your furry family on every step of health and joy.',
    objectPosition: '50% 55%',
  },
  {
    id: 'golden-bow',
    image: '/assets/aistudio/auth_golden_centered.jpg',
    tagVi: 'Bé Golden thắt nơ nhung',
    tagEn: 'Golden Retriever puppy',
    captionVi: 'Đặt lịch Spa, khám thú y và lưu sổ tiêm chủng điện tử cho bé cưng chỉ với 1 chạm.',
    captionEn: 'Book grooming spa, vet checkups, and track digital vaccination records with 1 click.',
    subVi: 'Quyền lợi độc quyền và tích điểm đổi quà thành viên Animora Club.',
    subEn: 'Exclusive perks and rewards for Animora Club pet parents.',
    objectPosition: '50% 50%',
  },
];

// Official multi-color Google "G" SVG icon
const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.1 7.4 24 12 24z"
    />
  </svg>
);

export const AuthPage: React.FC<AuthPageProps> = ({
  lang,
  darkMode = false,
  onToggleDarkMode,
  onToggleLang,
  initialMode,
  currentUser,
  registeredUsers,
  onNavigate,
  onLoginSuccess,
  onRegisterSuccess,
  onUpdateUser,
  onLogout,
  onResetPasswordSuccess,
}) => {
  const t = translations[lang].loginModal;

  const [mode, setMode] = useState<AuthMode>(currentUser ? 'account' : initialMode);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(initialMode === 'register' ? 1 : 0);

  // Sync mode when initialMode or currentUser changes
  useEffect(() => {
    if (currentUser && initialMode === 'account') {
      setMode('account');
    } else if (!currentUser && initialMode === 'account') {
      setMode('login');
    } else {
      setMode(initialMode);
      setActiveSlideIndex(initialMode === 'register' ? 1 : 0);
    }
    setErrorMsg('');
    setSuccessBanner('');
  }, [initialMode, currentUser]);

  // Gmail Modal State
  const [gmailPickerOpen, setGmailPickerOpen] = useState(false);
  const [customGmailMode, setCustomGmailMode] = useState(false);
  const [customGmailName, setCustomGmailName] = useState('');
  const [customGmailAddress, setCustomGmailAddress] = useState('');
  const [customGmailPhone, setCustomGmailPhone] = useState('');

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('phanthidinhthuy6@gmail.com');
  const [loginPassword, setLoginPassword] = useState('123456');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);

  // Terms & Privacy Modal
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy'>('terms');

  // Forgot Password State
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);

  // Account Management State
  const [accountTab, setAccountTab] = useState<'profile' | 'addresses' | 'security'>('profile');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addrLabel, setAddrLabel] = useState('');
  const [addrRecipient, setAddrRecipient] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine, setAddrLine] = useState('');

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmNewPassInput, setConfirmNewPassInput] = useState('');

  // Feedback State
  const [errorMsg, setErrorMsg] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.fullName);
      setEditEmail(currentUser.email);
      setEditPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Real-time password evaluation
  const passStrength = evaluatePasswordStrength(regPassword);
  const isMinLengthMet = regPassword.length >= 6;
  const isConfirmMatch = regPassword.length > 0 && regPassword === regConfirmPassword;

  const switchMode = (target: AuthMode) => {
    setErrorMsg('');
    setSuccessBanner('');
    setGmailPickerOpen(false);
    setCustomGmailMode(false);
    if (target === 'forgot-password') {
      setForgotStep(1);
      setMode('forgot-password');
    } else if (target === 'login') {
      setMode('login');
      setActiveSlideIndex(0);
      onNavigate('login');
    } else if (target === 'register') {
      setMode('register');
      setActiveSlideIndex(1);
      onNavigate('register');
    } else {
      setMode('account');
      onNavigate('account');
    }
  };

  // Handle Google / Gmail Auth
  const handleGmailAccountSelect = (account: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    setErrorMsg('');
    const cleanEmail = account.email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      onLoginSuccess(existing);
      return;
    }

    const gmailUser: UserAccount = {
      id: 'user-gmail-' + Date.now(),
      fullName: account.fullName,
      email: cleanEmail,
      phone: account.phone || '0337203332',
      passwordHash: 'gmail-oauth-verified',
      role: 'owner',
      createdAt: new Date().toISOString().split('T')[0],
      addresses: [
        {
          id: 'addr-gmail-' + Date.now(),
          label: lang === 'vi' ? 'Nhà riêng' : 'Home',
          recipientName: account.fullName,
          phone: account.phone || '0337203332',
          addressLine: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
          isDefault: true,
        },
      ],
    };

    if (mode === 'register') {
      onRegisterSuccess(gmailUser);
    } else {
      onLoginSuccess(gmailUser);
    }
  };

  const handleCustomGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const rawEmail = customGmailAddress.trim().toLowerCase();
    const finalEmail = rawEmail.includes('@') ? rawEmail : `${rawEmail}@gmail.com`;

    if (
      !/^[^\s@]+@gmail\.com$/i.test(finalEmail) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)
    ) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng nhập địa chỉ Gmail hợp lệ (ví dụ: tenban@gmail.com).'
          : 'Please enter a valid Gmail address (e.g., yourname@gmail.com).'
      );
      return;
    }

    const derivedName =
      customGmailName.trim() ||
      finalEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

    handleGmailAccountSelect({
      fullName: derivedName,
      email: finalEmail,
      phone: customGmailPhone.trim() || '0337203332',
    });
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = loginIdentifier.trim().toLowerCase();
    if (!cleanId || !loginPassword.trim()) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng nhập đầy đủ Email/Số điện thoại và mật khẩu.'
          : 'Please enter both Email/Phone and password.'
      );
      return;
    }

    setIsSubmittingLogin(true);

    setTimeout(() => {
      setIsSubmittingLogin(false);
      // Check primary contact account
      if (
        (cleanId === CONTACT_INFO.email.toLowerCase() || cleanId === '0337203332') &&
        loginPassword === '123456'
      ) {
        handleGmailAccountSelect({
          fullName: CONTACT_INFO.personName,
          email: CONTACT_INFO.email,
          phone: '0337203332',
        });
        return;
      }

      const matchedUser = registeredUsers.find(
        (u) =>
          (u.email.toLowerCase() === cleanId || u.phone === cleanId) &&
          u.passwordHash === loginPassword
      );

      if (!matchedUser) {
        setErrorMsg(
          lang === 'vi'
            ? 'Thông tin đăng nhập hoặc mật khẩu không chính xác.'
            : 'Invalid email/phone or password.'
        );
        return;
      }

      onLoginSuccess(matchedUser);
    }, 400);
  };

  // Handle Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const name = regName.trim();
    const email = regEmail.trim().toLowerCase();
    const phone = regPhone.trim();

    if (!name || !email || !phone || !regPassword || !regConfirmPassword) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng điền đầy đủ tất cả các trường thông tin.'
          : 'Please fill in all required fields.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg(
        lang === 'vi' ? 'Định dạng Email không hợp lệ.' : 'Invalid email address format.'
      );
      return;
    }

    const phoneRegex = /^(0|\+84)[0-9]{8,10}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg(
        lang === 'vi'
          ? 'Số điện thoại không hợp lệ (gồm 9-11 chữ số).'
          : 'Invalid phone number format.'
      );
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu phải có ít nhất 6 ký tự.'
          : 'Password must be at least 6 characters.'
      );
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu xác nhận không trùng khớp.'
          : 'Password confirmation does not match.'
      );
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.'
          : 'Please agree to the Terms of Service & Privacy Policy.'
      );
      return;
    }

    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email || u.phone === phone
    );
    if (exists) {
      setErrorMsg(
        lang === 'vi'
          ? 'Email hoặc số điện thoại này đã được đăng ký.'
          : 'This email or phone number is already registered.'
      );
      return;
    }

    setIsSubmittingRegister(true);
    setTimeout(() => {
      setIsSubmittingRegister(false);
      const newUser: UserAccount = {
        id: 'user-' + Date.now(),
        fullName: name,
        email,
        phone,
        passwordHash: regPassword,
        role: 'owner',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
      };

      onRegisterSuccess(newUser);
    }, 450);
  };

  // Handle Forgot Password
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = forgotIdentifier.trim().toLowerCase();
    if (!cleanId) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng nhập Email hoặc Số điện thoại.'
          : 'Please enter your Email or Phone.'
      );
      return;
    }
    const found =
      cleanId === CONTACT_INFO.email.toLowerCase() ||
      registeredUsers.some((u) => u.email.toLowerCase() === cleanId || u.phone === cleanId);
    if (!found) {
      setErrorMsg(
        lang === 'vi'
          ? 'Không tìm thấy tài khoản với thông tin này.'
          : 'No account found with this identifier.'
      );
      return;
    }
    setForgotStep(2);
    setSuccessBanner(
      lang === 'vi'
        ? `Mã OTP đã được gửi! (Mã thử nghiệm: ${DEMO_OTP_CODE})`
        : `OTP code sent! (Demo OTP: ${DEMO_OTP_CODE})`
    );
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!forgotOtp.trim() || !forgotNewPass.trim()) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng nhập mã OTP và mật khẩu mới.'
          : 'Please enter the OTP code and new password.'
      );
      return;
    }
    if (forgotOtp.trim() !== DEMO_OTP_CODE) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mã xác thực OTP không chính xác (nhập 123456).'
          : 'Invalid OTP code (use 123456).'
      );
      return;
    }
    if (forgotNewPass.length < 6) {
      setErrorMsg(
        lang === 'vi'
          ? 'Mật khẩu mới phải có ít nhất 6 ký tự.'
          : 'New password must be at least 6 characters.'
      );
      return;
    }

    onResetPasswordSuccess(forgotIdentifier.trim(), forgotNewPass);
    setSuccessBanner(t.resetSuccessToast);
    setLoginIdentifier(forgotIdentifier.trim());
    setLoginPassword(forgotNewPass);
    setMode('login');
    onNavigate('login');
  };

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg('');

    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      setErrorMsg(
        lang === 'vi'
          ? 'Vui lòng điền đầy đủ thông tin hồ sơ.'
          : 'Please fill in all profile fields.'
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
      lang === 'vi' ? 'Đã cập nhật thông tin cá nhân thành công!' : 'Profile updated successfully!'
    );
  };

  // Handle Address Book
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!addrLabel.trim() || !addrRecipient.trim() || !addrPhone.trim() || !addrLine.trim()) {
      setErrorMsg(
        lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin địa chỉ.' : 'Please fill in all address fields.'
      );
      return;
    }

    const newAddr: ShippingAddress = {
      id: 'addr-' + Date.now(),
      label: addrLabel.trim(),
      recipientName: addrRecipient.trim(),
      phone: addrPhone.trim(),
      addressLine: addrLine.trim(),
      isDefault: currentUser.addresses.length === 0,
    };

    onUpdateUser({
      ...currentUser,
      addresses: [...currentUser.addresses, newAddr],
    });
    setAddrLabel('');
    setAddrRecipient('');
    setAddrPhone('');
    setAddrLine('');
    setShowAddAddress(false);
    setErrorMsg('');
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

  // Handle Password Change in Account
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setErrorMsg('');

    if (currentUser.passwordHash !== currentPassInput) {
      setErrorMsg(lang === 'vi' ? 'Mật khẩu hiện tại không đúng.' : 'Current password is incorrect.');
      return;
    }
    if (newPassInput.length < 6) {
      setErrorMsg(
        lang === 'vi' ? 'Mật khẩu mới phải có ít nhất 6 ký tự.' : 'New password must be at least 6 characters.'
      );
      return;
    }
    if (newPassInput !== confirmNewPassInput) {
      setErrorMsg(
        lang === 'vi' ? 'Xác nhận mật khẩu mới không khớp.' : 'New password confirmation does not match.'
      );
      return;
    }

    onUpdateUser({
      ...currentUser,
      passwordHash: newPassInput,
    });
    setSuccessBanner(
      lang === 'vi' ? 'Đổi mật khẩu thành công!' : 'Password changed successfully!'
    );
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmNewPassInput('');
  };

  const activeSlide = PET_SLIDES[activeSlideIndex] || PET_SLIDES[0];

  // Render Google / Gmail Section with distinct secondary hierarchy
  const renderGoogleAuthSection = () => (
    <div className="space-y-3 pt-2">
      {/* Visual divider */}
      <div className="relative flex items-center justify-center my-3">
        <div className="w-full border-t border-[var(--border)]" />
        <span
          className="absolute px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          {lang === 'vi' ? 'hoặc tiếp tục với' : 'or continue with'}
        </span>
      </div>

      {/* Google Secondary Button */}
      <button
        type="button"
        data-testid="google-auth-trigger-btn"
        onClick={() => setGmailPickerOpen((prev) => !prev)}
        className="w-full h-[48px] px-4 rounded-xl border border-[var(--border)] hover:border-[var(--coral)] bg-[var(--bg)] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] flex items-center justify-center gap-3 text-[14px] font-bold text-[var(--text)] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
      >
        <GoogleLogoIcon className="w-5 h-5 shrink-0" />
        <span>
          {mode === 'login'
            ? lang === 'vi'
              ? 'Đăng nhập bằng Google'
              : 'Sign in with Google'
            : lang === 'vi'
            ? 'Đăng ký nhanh bằng Google'
            : 'Sign up with Google'}
        </span>
      </button>

      {/* Expandable Google / Gmail Account Picker */}
      {gmailPickerOpen && (
        <div
          data-testid="gmail-account-chooser"
          className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] space-y-3 shadow-lg animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <GoogleLogoIcon className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold text-[var(--text)]">
                {lang === 'vi' ? 'Chọn tài khoản Google' : 'Choose a Google account'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGmailPickerOpen(false)}
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {GMAIL_QUICK_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                data-testid={`gmail-quick-account-${acc.email}`}
                onClick={() => handleGmailAccountSelect(acc)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-left flex items-center justify-between gap-3 transition-all hover:border-[var(--coral)] hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 text-white shadow-sm"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {acc.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate text-[var(--text)]">
                      {acc.fullName}
                    </div>
                    <div className="text-[11px] truncate text-[var(--text-muted)]">
                      {acc.email}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[var(--primary)] text-[var(--on-primary)] shrink-0">
                  {lang === 'vi' ? 'Tiếp tục' : 'Continue'}
                </span>
              </button>
            ))}
          </div>

          {!customGmailMode ? (
            <button
              type="button"
              data-testid="use-another-gmail-btn"
              onClick={() => setCustomGmailMode(true)}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-[var(--border)] hover:border-[var(--coral)] text-xs font-bold text-[var(--primary)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>
                {lang === 'vi' ? 'Sử dụng địa chỉ Google khác' : 'Use another Google account'}
              </span>
            </button>
          ) : (
            <form onSubmit={handleCustomGmailSubmit} className="space-y-2.5 pt-2 border-t border-[var(--border)]">
              <input
                type="text"
                value={customGmailName}
                onChange={(e) => setCustomGmailName(e.target.value)}
                placeholder={lang === 'vi' ? 'Họ và tên hiển thị' : 'Display name'}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] outline-none focus:border-[var(--coral)]"
              />
              <input
                type="email"
                required
                data-testid="custom-gmail-input"
                value={customGmailAddress}
                onChange={(e) => setCustomGmailAddress(e.target.value)}
                placeholder="tenban@gmail.com"
                className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] outline-none focus:border-[var(--coral)]"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  data-testid="custom-gmail-submit-btn"
                  className="btn-primary flex-1 py-2 px-3 !rounded-xl text-xs font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Xác nhận' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={() => setCustomGmailMode(false)}
                  className="py-2 px-3 rounded-xl text-xs font-semibold border border-[var(--border)] text-[var(--text-muted)] cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      data-testid={`page-${mode}`}
      className="min-h-screen w-full flex flex-col lg:flex-row items-stretch justify-between transition-colors duration-300"
      style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--text)',
      }}
    >
      {/* =================================================================== */}
      {/* LEFT COLUMN: Clean, Vertically-Balanced Auth Form Container         */}
      {/* =================================================================== */}
      <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-between items-center px-6 sm:px-10 lg:px-12 py-8 sm:py-10 relative z-10 min-h-screen">
        {/* Top Utility Row */}
        <div className="w-full max-w-[420px] flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--primary)] hover:opacity-80 transition-opacity cursor-pointer p-1.5 -ml-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Trang chủ Animora' : 'Animora Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            {onToggleLang && (
              <button
                type="button"
                onClick={onToggleLang}
                title="Switch Language"
                className="px-2.5 py-1 rounded-full text-[11px] font-extrabold border border-[var(--border)] bg-[var(--bg)] text-[var(--primary)] hover:border-[var(--coral)] transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'VI / EN' : 'EN / VI'}
              </button>
            )}
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label="Toggle Light/Dark Mode"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] text-[var(--primary)] hover:border-[var(--coral)] transition-transform hover:scale-105 cursor-pointer"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Center Form Body */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-2">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              title={lang === 'vi' ? 'Quay về Trang chủ Animora' : 'Back to Animora Home'}
              className="group inline-flex items-center gap-3 mb-4 cursor-pointer focus:outline-none"
            >
              <div
                className="relative flex items-center justify-center w-11 h-11 rounded-2xl shadow-sm group-hover:scale-105 transition-transform overflow-hidden border border-[var(--border)]"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <img src={typeof animoraLogo === 'string' ? animoraLogo : (animoraLogo as any)?.src} alt="Animora" className="w-full h-full object-cover !filter-none" />
              </div>
              <span className="font-heading text-[28px] font-extrabold tracking-tight text-[var(--primary)]">
                Animora.
              </span>
            </button>

            {mode === 'login' && (
              <>
                <h1 className="font-heading text-[30px] sm:text-[34px] font-extrabold tracking-tight leading-tight mb-1 text-[var(--text)]">
                  {lang === 'vi' ? 'Chào Mừng Trở Lại' : 'Welcome Back'}
                </h1>
                <p className="text-[14px] font-medium text-[var(--text-muted)]">
                  {lang === 'vi'
                    ? 'Đăng nhập để nhận ưu đãi và quản lý chăm sóc thú cưng'
                    : "Log in to access your pet's care dashboard"}
                </p>
              </>
            )}

            {mode === 'register' && (
              <>
                <h1 className="font-heading text-[30px] sm:text-[34px] font-extrabold tracking-tight leading-tight mb-1 text-[var(--text)]">
                  {lang === 'vi' ? 'Tạo Tài Khoản Mới' : 'Create Account'}
                </h1>
                <p className="text-[14px] font-medium text-[var(--text-muted)]">
                  {lang === 'vi'
                    ? 'Đồng hành cùng Animora chăm sóc bé cưng hạnh phúc mỗi ngày'
                    : 'Join the Animora pet care community today'}
                </p>
              </>
            )}

            {mode === 'forgot-password' && (
              <>
                <h1 className="font-heading text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight mb-1 text-[var(--text)]">
                  {lang === 'vi' ? 'Khôi Phục Mật Khẩu' : 'Reset Password'}
                </h1>
                <p className="text-[14px] font-medium text-[var(--text-muted)]">
                  {t.forgotSubtitle}
                </p>
              </>
            )}

            {mode === 'account' && currentUser && (
              <>
                <h1 className="font-heading text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight mb-1 text-[var(--text)]">
                  {currentUser.fullName}
                </h1>
                <p className="text-[13px] font-medium text-[var(--text-muted)]">
                  {currentUser.email}
                </p>
              </>
            )}
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div
              data-testid="auth-error-banner"
              className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-bold flex items-center gap-2.5 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successBanner && (
            <div
              data-testid="auth-success-banner"
              className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-fadeIn"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successBanner}</span>
            </div>
          )}

          {/* =============================================================== */}
          {/* 1. LOGIN FORM                                                   */}
          {/* =============================================================== */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email / Phone Field */}
              <div className="w-full rounded-xl px-4 py-2.5 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all">
                <label
                  htmlFor="auth-login-email"
                  className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                >
                  {lang === 'vi' ? 'Email hoặc Số điện thoại' : 'Email or Phone'}
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  <input
                    id="auth-login-email"
                    type="text"
                    data-testid="login-identifier-input"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="phanthidinhthuy6@gmail.com"
                    className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="w-full rounded-xl px-4 py-2.5 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="auth-login-password"
                    className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                  >
                    {lang === 'vi' ? 'Mật khẩu' : 'Password'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <input
                      id="auth-login-password"
                      type={showLoginPass ? 'text' : 'password'}
                      data-testid="login-password-input"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  aria-label="Toggle password visibility"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password with enlarged touch area */}
              <div className="flex items-center justify-between pt-0.5 pb-0.5">
                <label className="inline-flex items-center gap-2.5 text-[13px] font-medium text-[var(--text)] cursor-pointer select-none p-1.5 -ml-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--primary)] cursor-pointer"
                  />
                  <span>{lang === 'vi' ? 'Ghi nhớ đăng nhập' : 'Remember me'}</span>
                </label>

                <button
                  type="button"
                  data-testid="forgot-password-link"
                  onClick={() => switchMode('forgot-password')}
                  className="text-[13px] font-bold text-[var(--primary)] hover:underline cursor-pointer p-1 rounded-md"
                >
                  {lang === 'vi' ? 'Quên mật khẩu?' : 'Forgot Password?'}
                </button>
              </div>

              {/* Primary Solid Burgundy Login Button */}
              <button
                type="submit"
                disabled={isSubmittingLogin}
                data-testid="login-submit-btn"
                className="btn-primary w-full h-[50px] !rounded-xl font-heading text-[16px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmittingLogin ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{lang === 'vi' ? 'Đang đăng nhập...' : 'Signing in...'}</span>
                  </>
                ) : (
                  <span>{lang === 'vi' ? 'Đăng nhập' : 'Sign In'}</span>
                )}
              </button>

              {/* Google Auth with clear secondary hierarchy */}
              {renderGoogleAuthSection()}

              {/* Switch to Register */}
              <p className="text-center text-[13.5px] font-medium text-[var(--text-muted)] pt-3">
                {lang === 'vi' ? 'Bạn chưa có tài khoản? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="font-extrabold text-[var(--primary)] hover:underline cursor-pointer ml-1"
                >
                  {lang === 'vi' ? 'Đăng ký ngay' : 'Sign Up'}
                </button>
              </p>
            </form>
          )}

          {/* =============================================================== */}
          {/* 2. REGISTER FORM                                                */}
          {/* =============================================================== */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all">
                <label
                  htmlFor="auth-reg-name"
                  className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                >
                  {lang === 'vi' ? 'Họ và tên' : 'Full Name'}
                </label>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  <input
                    id="auth-reg-name"
                    type="text"
                    data-testid="register-name-input"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={lang === 'vi' ? 'Phan Thị Đình Thùy' : 'John Doe'}
                    className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone in 2-col or stacked */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div className="w-full rounded-xl px-3.5 py-2 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all">
                  <label
                    htmlFor="auth-reg-email"
                    className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                  >
                    Email
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    <input
                      id="auth-reg-email"
                      type="email"
                      data-testid="register-email-input"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="tenban@gmail.com"
                      className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full rounded-xl px-3.5 py-2 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all">
                  <label
                    htmlFor="auth-reg-phone"
                    className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                  >
                    {lang === 'vi' ? 'Số điện thoại' : 'Phone'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <PhoneIcon className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    <input
                      id="auth-reg-phone"
                      type="tel"
                      data-testid="register-phone-input"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0337 203 332"
                      className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password (2 columns desktop, 1 column mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password */}
                <div className="w-full rounded-xl px-3.5 py-2 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all flex items-center justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor="auth-reg-pass"
                      className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                    >
                      {lang === 'vi' ? 'Mật khẩu' : 'Password'}
                    </label>
                    <input
                      id="auth-reg-pass"
                      type={showRegPass ? 'text' : 'password'}
                      data-testid="register-password-input"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRegPass(!showRegPass)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                  >
                    {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="w-full rounded-xl px-3.5 py-2 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all flex items-center justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor="auth-reg-confirm"
                      className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5"
                    >
                      {lang === 'vi' ? 'Xác nhận MK' : 'Confirm Password'}
                    </label>
                    <input
                      id="auth-reg-confirm"
                      type={showRegConfirmPass ? 'text' : 'password'}
                      data-testid="register-confirm-password-input"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[13.5px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRegConfirmPass(!showRegConfirmPass)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                  >
                    {showRegConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Strength Meter */}
              {regPassword.length > 0 && (
                <div className="space-y-1.5 p-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-[var(--text-muted)]">
                      {lang === 'vi' ? 'Độ mạnh mật khẩu:' : 'Password strength:'}
                    </span>
                    <span
                      className={`font-bold ${
                        passStrength.level === 'weak'
                          ? 'text-red-500'
                          : passStrength.level === 'medium'
                          ? 'text-amber-500'
                          : 'text-emerald-500'
                      }`}
                    >
                      {lang === 'vi' ? passStrength.labelVi : passStrength.labelEn}
                    </span>
                  </div>

                  {/* 3-segment strength bar */}
                  <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full">
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        passStrength.score >= 1
                          ? passStrength.level === 'weak'
                            ? 'bg-red-500'
                            : passStrength.level === 'medium'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-stone-200 dark:bg-stone-700'
                      }`}
                    />
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        passStrength.score >= 3
                          ? passStrength.level === 'medium'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-stone-200 dark:bg-stone-700'
                      }`}
                    />
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        passStrength.score >= 4
                          ? 'bg-emerald-500'
                          : 'bg-stone-200 dark:bg-stone-700'
                      }`}
                    />
                  </div>

                  {/* Requirements checklist */}
                  <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                    <div
                      className={`flex items-center gap-1 ${
                        isMinLengthMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <Check className="w-3 h-3 shrink-0" />
                      <span>{lang === 'vi' ? 'Tối thiểu 6 ký tự' : 'Min 6 characters'}</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        isConfirmMatch ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <Check className="w-3 h-3 shrink-0" />
                      <span>{lang === 'vi' ? 'Mật khẩu khớp nhau' : 'Passwords match'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Checkbox with modal openers */}
              <div className="pt-0.5">
                <label className="flex items-start gap-2.5 text-[12.5px] font-medium text-[var(--text-muted)] cursor-pointer select-none p-1.5 -ml-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-[var(--primary)] cursor-pointer shrink-0"
                  />
                  <span className="leading-snug">
                    {lang === 'vi' ? (
                      <>
                        Tôi đồng ý với{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setTermsModalType('terms');
                            setTermsModalOpen(true);
                          }}
                          className="font-bold text-[var(--primary)] underline hover:opacity-80"
                        >
                          Điều khoản dịch vụ
                        </button>{' '}
                        &{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setTermsModalType('privacy');
                            setTermsModalOpen(true);
                          }}
                          className="font-bold text-[var(--primary)] underline hover:opacity-80"
                        >
                          Chính sách bảo mật
                        </button>{' '}
                        của Animora
                      </>
                    ) : (
                      <>
                        I agree to Animora's{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setTermsModalType('terms');
                            setTermsModalOpen(true);
                          }}
                          className="font-bold text-[var(--primary)] underline hover:opacity-80"
                        >
                          Terms of Service
                        </button>{' '}
                        &{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setTermsModalType('privacy');
                            setTermsModalOpen(true);
                          }}
                          className="font-bold text-[var(--primary)] underline hover:opacity-80"
                        >
                          Privacy Policy
                        </button>
                      </>
                    )}
                  </span>
                </label>
              </div>

              {/* Primary Register Button */}
              <button
                type="submit"
                disabled={isSubmittingRegister}
                data-testid="register-submit-btn"
                className="btn-primary w-full h-[50px] !rounded-xl font-heading text-[16px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmittingRegister ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{lang === 'vi' ? 'Đang tạo tài khoản...' : 'Creating account...'}</span>
                  </>
                ) : (
                  <span>{lang === 'vi' ? 'Đăng ký tài khoản' : 'Sign Up'}</span>
                )}
              </button>

              {/* Google Auth with clear secondary hierarchy */}
              {renderGoogleAuthSection()}

              {/* Switch to Login */}
              <p className="text-center text-[13.5px] font-medium text-[var(--text-muted)] pt-3">
                {lang === 'vi' ? 'Đã có tài khoản? ' : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-extrabold text-[var(--primary)] hover:underline cursor-pointer ml-1"
                >
                  {lang === 'vi' ? 'Đăng nhập' : 'Sign In'}
                </button>
              </p>
            </form>
          )}

          {/* =============================================================== */}
          {/* 3. FORGOT PASSWORD FORM                                         */}
          {/* =============================================================== */}
          {mode === 'forgot-password' && (
            <div className="space-y-4">
              {forgotStep === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="w-full rounded-xl px-4 py-2.5 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15 transition-all">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Email hoặc Số điện thoại' : 'Email or Phone'}
                    </label>
                    <input
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="phanthidinhthuy6@gmail.com"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full h-[50px] !rounded-xl font-heading text-[16px] font-bold shadow-md cursor-pointer"
                  >
                    {t.sendOtpBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full text-center text-xs font-bold text-[var(--primary)] hover:underline pt-2 cursor-pointer"
                  >
                    {lang === 'vi' ? 'Quay lại Đăng nhập' : 'Back to Login'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="w-full rounded-xl px-4 py-2.5 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Mã xác thực OTP (thử 123456)' : 'OTP Code (demo: 123456)'}
                    </label>
                    <input
                      type="text"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-transparent text-[15px] font-bold tracking-widest text-center text-[var(--text)] outline-none"
                    />
                  </div>

                  <div className="w-full rounded-xl px-4 py-2.5 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {t.newPassLabel}
                    </label>
                    <input
                      type="password"
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full h-[50px] !rounded-xl font-heading text-[16px] font-bold shadow-md cursor-pointer"
                  >
                    {t.resetPassBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full text-center text-xs font-bold text-[var(--primary)] hover:underline pt-2 cursor-pointer"
                  >
                    {lang === 'vi' ? 'Hủy & Quay lại Đăng nhập' : 'Cancel & Back to Login'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* 4. ACCOUNT MANAGEMENT VIEW                                      */}
          {/* =============================================================== */}
          {mode === 'account' && currentUser && (
            <div className="space-y-5">
              {/* Tab Navigation */}
              <div className="flex border-b border-[var(--border)]">
                {(['profile', 'addresses', 'security'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setAccountTab(tab)}
                    className={`flex-1 pb-2.5 text-xs font-bold border-b-2 transition-all capitalize cursor-pointer ${
                      accountTab === tab
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab === 'profile'
                      ? lang === 'vi'
                        ? 'Hồ sơ'
                        : 'Profile'
                      : tab === 'addresses'
                      ? lang === 'vi'
                        ? 'Sổ địa chỉ'
                        : 'Addresses'
                      : lang === 'vi'
                      ? 'Bảo mật'
                      : 'Security'}
                  </button>
                ))}
              </div>

              {accountTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Họ và tên' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Số điện thoại' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full h-[46px] !rounded-xl font-bold text-sm cursor-pointer"
                  >
                    {lang === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
                  </button>
                </form>
              )}

              {accountTab === 'addresses' && (
                <div className="space-y-3">
                  {currentUser.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[var(--text)]">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                              {lang === 'vi' ? 'Mặc định' : 'Default'}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[var(--text)] font-medium">
                          {addr.recipientName} • {addr.phone}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5">
                          {addr.addressLine}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="p-1.5 text-xs text-[var(--primary)] hover:underline cursor-pointer"
                          >
                            {lang === 'vi' ? 'Đặt mặc định' : 'Set default'}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {!showAddAddress ? (
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(true)}
                      className="w-full py-2.5 rounded-xl border border-dashed border-[var(--border)] hover:border-[var(--coral)] text-xs font-bold text-[var(--primary)] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'vi' ? 'Thêm địa chỉ mới' : 'Add New Address'}</span>
                    </button>
                  ) : (
                    <form onSubmit={handleAddAddress} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
                      <input
                        type="text"
                        placeholder={lang === 'vi' ? 'Nhãn (Nhà riêng / Văn phòng)' : 'Label (Home / Office)'}
                        value={addrLabel}
                        onChange={(e) => setAddrLabel(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                      />
                      <input
                        type="text"
                        placeholder={lang === 'vi' ? 'Người nhận' : 'Recipient'}
                        value={addrRecipient}
                        onChange={(e) => setAddrRecipient(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                      />
                      <input
                        type="tel"
                        placeholder={lang === 'vi' ? 'Số điện thoại' : 'Phone'}
                        value={addrPhone}
                        onChange={(e) => setAddrPhone(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                      />
                      <input
                        type="text"
                        placeholder={lang === 'vi' ? 'Số nhà, tên đường, quận/huyện...' : 'Street address...'}
                        value={addrLine}
                        onChange={(e) => setAddrLine(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="btn-primary flex-1 py-2 !rounded-lg text-xs font-bold cursor-pointer"
                        >
                          {lang === 'vi' ? 'Lưu địa chỉ' : 'Save Address'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="px-3 py-2 rounded-lg text-xs border border-[var(--border)] cursor-pointer"
                        >
                          {lang === 'vi' ? 'Hủy' : 'Cancel'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {accountTab === 'security' && (
                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Mật khẩu hiện tại' : 'Current Password'}
                    </label>
                    <input
                      type="password"
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Mật khẩu mới' : 'New Password'}
                    </label>
                    <input
                      type="password"
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <div className="w-full rounded-xl px-4 py-2 border border-[var(--border)] bg-[var(--bg)]">
                    <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-0.5">
                      {lang === 'vi' ? 'Xác nhận mật khẩu mới' : 'Confirm New Password'}
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassInput}
                      onChange={(e) => setConfirmNewPassInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[14px] font-semibold text-[var(--text)] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full h-[46px] !rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{lang === 'vi' ? 'Cập nhật mật khẩu' : 'Update Password'}</span>
                  </button>
                </form>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-xs font-bold text-[var(--primary)] flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Trang chủ Animora' : 'Animora Home'}</span>
                </button>
                <button
                  type="button"
                  data-testid="logout-btn"
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-600 hover:bg-red-500/20 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logoutBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom subtle copyright */}
        <div className="w-full max-w-[420px] text-center text-[11px] text-[var(--text-muted)] pt-4 pb-2">
          © {new Date().getFullYear()} Animora Pet Care. All rights reserved.
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT COLUMN: High-Res Warm Puppy Showcase with Frosted Glass Badge */}
      {/* =================================================================== */}
      <div className="w-full lg:w-[52%] xl:w-[55%] p-4 sm:p-6 lg:p-7 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center">
        <div
          className="relative w-full h-[480px] sm:h-[580px] lg:h-[calc(100vh-48px)] max-h-[860px] rounded-[36px] overflow-hidden select-none shadow-md flex items-center justify-center"
          style={{ backgroundColor: '#F3E5D3' }}
        >
          {/* Main High-Res Centered Pet Photography */}
          <img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={lang === 'vi' ? activeSlide.tagVi : activeSlide.tagEn}
            className="w-full h-full object-cover transition-all duration-700 !filter-none"
            style={{
              objectPosition: activeSlide.objectPosition || '50% 50%',
            }}
          />

          {/* Top-Right Tag Badge */}
          <div className="absolute top-6 right-6 z-20">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide bg-stone-900/60 backdrop-blur-md text-white border border-white/20 shadow-md">
              {lang === 'vi' ? activeSlide.tagVi : activeSlide.tagEn}
            </span>
          </div>

          {/* S-curve decorative corner cutout */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-[72px] sm:w-[90px] h-[48px] sm:h-[58px] rounded-br-[32px] z-20"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <svg
              className="absolute top-0 -right-[28px] w-[28px] h-[28px]"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M0 0H28C12.536 0 0 12.536 0 28V0Z" fill="var(--surface)" />
            </svg>
            <svg
              className="absolute -bottom-[28px] left-0 w-[28px] h-[28px]"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M0 0H28C12.536 0 0 12.536 0 28V0Z" fill="var(--surface)" />
            </svg>
          </div>

          {/* Bottom Frosted Glass Caption Card */}
          <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 z-20">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-stone-950/70 backdrop-blur-md border border-white/20 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1 max-w-[440px]">
                <h3 className="font-heading text-base sm:text-lg font-bold leading-snug drop-shadow-sm text-white">
                  {lang === 'vi' ? activeSlide.captionVi : activeSlide.captionEn}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {lang === 'vi' ? activeSlide.subVi : activeSlide.subEn}
                </p>
              </div>

              {/* Slide Selector Indicator Dots */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {PET_SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeSlideIndex === index
                        ? 'w-7 h-2.5 bg-[var(--coral)] shadow-sm'
                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* TERMS & PRIVACY MODAL DIALOG                                        */}
      {/* =================================================================== */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="font-heading text-lg font-bold text-[var(--text)]">
                  {termsModalType === 'terms'
                    ? lang === 'vi'
                      ? 'Điều khoản Dịch vụ Animora'
                      : 'Animora Terms of Service'
                    : lang === 'vi'
                    ? 'Chính sách Bảo mật Animora'
                    : 'Animora Privacy Policy'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-[13px] leading-relaxed text-[var(--text-muted)] space-y-3">
              {termsModalType === 'terms' ? (
                <>
                  <p>
                    {lang === 'vi'
                      ? '1. Chào mừng bạn đến với hệ sinh thái chăm sóc thú cưng toàn diện Animora. Khi đăng ký tài khoản, bạn đồng ý tuân thủ các quy tắc đặt lịch, dịch vụ chăm sóc và mua sắm trên nền tảng.'
                      : '1. Welcome to the Animora pet care ecosystem. By creating an account, you agree to comply with our booking, pet care, and marketplace policies.'}
                  </p>
                  <p>
                    {lang === 'vi'
                      ? '2. Tất cả thông tin hồ sơ thú cưng, lịch tiêm chủng và bệnh án sẽ được lưu trữ an toàn để hỗ trợ bác sĩ thú y tư vấn chăm sóc chính xác nhất.'
                      : '2. All pet profiles, vaccination schedules, and medical notes are safely stored to assist licensed veterinarians in providing optimal care.'}
                  </p>
                  <p>
                    {lang === 'vi'
                      ? '3. Bạn có quyền cập nhật, chỉnh sửa thông tin hoặc xóa tài khoản bất cứ lúc nào thông qua trang Quản lý tài khoản.'
                      : '3. You retain full control to modify personal information or request account deletion via your Account dashboard.'}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    {lang === 'vi'
                      ? '1. Animora cam kết bảo mật tuyệt đối thông tin cá nhân (Email, Số điện thoại, Địa chỉ) và không chia sẻ cho bên thứ ba vì mục đích thương mại.'
                      : '1. Animora is committed to safeguarding your personal data (Email, Phone, Shipping addresses) and will never sell your details to third parties.'}
                  </p>
                  <p>
                    {lang === 'vi'
                      ? '2. Dữ liệu tài khoản Google OAuth chỉ được sử dụng để xác thực danh tính nhanh chóng và đồng bộ họ tên người nuôi thú cưng.'
                      : '2. Google OAuth credentials are exclusively used for seamless authentication and owner profile identity synchronization.'}
                  </p>
                  <p>
                    {lang === 'vi'
                      ? '3. Kết nối mã hóa SSL/TLS tiêu chuẩn cao đảm bảo an toàn tuyệt đối cho mọi giao dịch đặt lịch và thanh toán dịch vụ.'
                      : '3. High-grade SSL/TLS encryption secures all appointments, transactions, and personal pet records.'}
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="btn-primary px-5 py-2.5 !rounded-xl text-xs font-bold cursor-pointer"
              >
                {lang === 'vi' ? 'Đã hiểu & Đồng ý' : 'I Understand & Agree'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
