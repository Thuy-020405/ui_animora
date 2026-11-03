import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
  Home,
  User,
  Users,
  Building,
  RotateCcw,
} from 'lucide-react';
import { AdoptionPet, AdoptionRequest, Language, PageId } from '../../types';
import {
  generateAdoptionRequestCode,
  getSpeciesDisplayName,
  isPetAdopted,
} from '../../data/adoptionData';
import {
  cleanPhone,
  formatPhone433,
  validatePhoneDigits,
  isValidDraftPhone,
  hasMeaningfulDraftValues,
  VIETNAMESE_PROVINCES,
} from '../../utils/adoptionFormLogic';
import { CONTACT_INFO } from '../../config/contact';

interface AdoptionApplyPageProps {
  lang: Language;
  pet: AdoptionPet | null;
  onAddAdoptionRequest: (req: AdoptionRequest) => void;
  onNavigate: (page: PageId) => void;
  onNavigateUrl: (url: string) => void;
  isSuccessView?: boolean;
}

interface DraftFormData {
  // Step 1
  applicantName: string;
  phoneDigits: string;
  email: string;
  area: string;
  preferredContact: 'phone' | 'zalo' | 'email';
  bestTime: 'morning' | 'afternoon' | 'evening' | 'anytime';

  // Step 2
  hadPetBefore: 'never' | 'current' | 'past' | '';
  housingType: 'house' | 'apartment' | 'rented' | 'other' | '';
  landlordPermission: 'yes' | 'not_needed' | 'in_progress' | '';
  householdSize: number;
  hasYoungChildren: boolean;
  hasOtherPets: boolean;
  otherPetsDetail: string;
  hoursAtHome: 'full_day' | 'evening_only' | 'flexible' | 'often_away' | '';
  monthlyBudget: 'under_1m' | '1m_to_2m' | '2m_to_4m' | 'over_4m' | '';
  visitConsent: boolean;

  // Step 3
  notes: string;
  commit1: boolean;
  commit2: boolean;
  commit3: boolean;
  commit4: boolean;

  // Form step
  currentStep: number;
}

const DEFAULT_FORM_DATA: DraftFormData = {
  applicantName: '',
  phoneDigits: '',
  email: '',
  area: '',
  preferredContact: 'phone',
  bestTime: 'anytime',

  hadPetBefore: '',
  housingType: '',
  landlordPermission: '',
  householdSize: 2,
  hasYoungChildren: false,
  hasOtherPets: false,
  otherPetsDetail: '',
  hoursAtHome: '',
  monthlyBudget: '',
  visitConsent: false,

  notes: '',
  commit1: false,
  commit2: false,
  commit3: false,
  commit4: false,

  currentStep: 1,
};

export const AdoptionApplyPage: React.FC<AdoptionApplyPageProps> = ({
  lang,
  pet,
  onAddAdoptionRequest,
  onNavigate,
  onNavigateUrl,
  isSuccessView = false,
}) => {
  const isEn = lang === 'en';
  const slug = pet?.slug || '';
  const storageKey = `adoption-draft-v2-${slug}`;
  const submittedCodeKey = `animora_submitted_code_${slug}`;

  // Form states with single source of truth for phoneDigits
  const [formData, setFormData] = useState<DraftFormData>(() => {
    const initialBase: DraftFormData = {
      ...DEFAULT_FORM_DATA,
      area: pet?.area || '',
    };
    if (!slug) return initialBase;
    try {
      // Clear legacy corrupted draft keys
      localStorage.removeItem(`animora_adopt_draft_${slug}`);
      localStorage.removeItem(`animora_adopt_draft_v1_${slug}`);

      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        let restoredPhone = '';
        if (parsed.phoneDigits && isValidDraftPhone(parsed.phoneDigits)) {
          restoredPhone = parsed.phoneDigits;
        } else if (parsed.phone && isValidDraftPhone(cleanPhone(parsed.phone))) {
          restoredPhone = cleanPhone(parsed.phone);
        }
        return {
          ...initialBase,
          ...parsed,
          phoneDigits: restoredPhone,
          area: parsed.area !== undefined ? parsed.area : initialBase.area,
        };
      }
    } catch {
      // ignore
    }
    return initialBase;
  });

  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(() => {
    if (!slug) return false;
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      return hasMeaningfulDraftValues(parsed);
    } catch {
      return false;
    }
  });

  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(() => {
    return formData.currentStep && formData.currentStep >= 1 && formData.currentStep <= 3
      ? formData.currentStep
      : 1;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedCode, setLastSubmittedCode] = useState<string>(() => {
    if (!slug) return '';
    try {
      return localStorage.getItem(submittedCodeKey) || '';
    } catch {
      return '';
    }
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // Anti-bot & security refs
  const mountTimeRef = useRef<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const isDirtyRef = useRef(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    mountTimeRef.current = Date.now();
  }, [slug, isSuccessView]);

  // Save draft to localStorage
  useEffect(() => {
    if (!slug || isSuccessView) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...formData, currentStep }));
      isDirtyRef.current = true;
    } catch {
      // ignore
    }
  }, [formData, currentStep, slug, storageKey, isSuccessView]);



  const handleClearDraft = () => {
    setFormData({
      ...DEFAULT_FORM_DATA,
      area: pet?.area || '',
    });
    setCurrentStep(1);
    setHasRestoredDraft(false);
    setErrors({});
    isDirtyRef.current = false;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  const handlePhoneInputChange = (raw: string) => {
    const cleaned = cleanPhone(raw);
    setFormData((prev) => ({ ...prev, phoneDigits: cleaned }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const input = e.currentTarget;
    const start = input.selectionStart ?? formData.phoneDigits.length;
    const end = input.selectionEnd ?? formData.phoneDigits.length;
    const combined = formData.phoneDigits.slice(0, start) + pasted + formData.phoneDigits.slice(end);
    const cleaned = cleanPhone(combined);
    setFormData((prev) => ({ ...prev, phoneDigits: cleaned }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.setSelectionRange(cleaned.length, cleaned.length);
      }
    }, 0);
  };

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
    const result = validatePhoneDigits(formData.phoneDigits, isEn);
    if (!result.isValid && result.error) {
      setErrors((prev) => ({ ...prev, phone: result.error! }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  // Validation functions
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.applicantName.trim() || formData.applicantName.trim().length < 2) {
      errs.applicantName = isEn
        ? 'Please enter your full name (at least 2 characters).'
        : 'Vui lòng nhập họ và tên của bạn (ít nhất 2 ký tự).';
    }

    const phoneRes = validatePhoneDigits(formData.phoneDigits, isEn);
    if (!phoneRes.isValid && phoneRes.error) {
      errs.phone = phoneRes.error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = isEn
        ? 'Please enter your email address.'
        : 'Vui lòng nhập địa chỉ email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = isEn
        ? 'Please enter a valid email address.'
        : 'Địa chỉ email không đúng định dạng.';
    }

    if (!formData.area || !formData.area.trim()) {
      errs.area = isEn
        ? 'Please select your living province/city.'
        : 'Vui lòng chọn tỉnh/thành sinh sống.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.hadPetBefore) {
      errs.hadPetBefore = isEn
        ? 'Please select your pet ownership experience.'
        : 'Vui lòng chọn kinh nghiệm nuôi thú cưng.';
    }

    if (!formData.housingType) {
      errs.housingType = isEn
        ? 'Please select your current housing type.'
        : 'Vui lòng chọn nơi ở hiện tại.';
    }

    if (
      (formData.housingType === 'apartment' || formData.housingType === 'rented') &&
      !formData.landlordPermission
    ) {
      errs.landlordPermission = isEn
        ? 'Please indicate if pets are permitted at your residence.'
        : 'Vui lòng xác nhận quy định cho phép nuôi tại nơi ở.';
    }

    if (!formData.hoursAtHome) {
      errs.hoursAtHome = isEn
        ? 'Please choose daily time spent at home.'
        : 'Vui lòng chọn thời gian có người ở nhà.';
    }

    if (!formData.monthlyBudget) {
      errs.monthlyBudget = isEn
        ? 'Please estimate your monthly budget for the pet.'
        : 'Vui lòng chọn ngân sách dự kiến mỗi tháng.';
    }

    if (!formData.visitConsent) {
      errs.visitConsent = isEn
        ? 'Please agree to contact/consultation to continue.'
        : 'Vui lòng đồng ý để đội ngũ Animora liên hệ trao đổi.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (step: number) => {
    if (step === 1) {
      setCurrentStep(1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (step === 2) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const allCommitmentsChecked =
    formData.commit1 && formData.commit2 && formData.commit3 && formData.commit4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current && honeypotRef.current.value) {
      // Bot detected, silently ignore
      return;
    }

    // 3-second minimum fill time check
    const elapsed = Date.now() - mountTimeRef.current;
    if (elapsed < 3000) {
      alert(
        isEn
          ? 'Submission too fast. Please review your information.'
          : 'Thao tác quá nhanh. Vui lòng kiểm tra lại thông tin.'
      );
      return;
    }

    if (!allCommitmentsChecked) {
      setErrors((prev) => ({
        ...prev,
        commitments: isEn
          ? 'Please check all 4 mandatory commitments to submit.'
          : 'Vui lòng đánh dấu đủ 4 cam kết bắt buộc để tiếp tục.',
      }));
      return;
    }

    if (!pet) return;

    setIsSubmitting(true);

    const generatedCode = generateAdoptionRequestCode();

    const newRequest: AdoptionRequest = {
      id: 'adopt-req-' + Date.now(),
      requestCode: generatedCode,
      petId: pet.id,
      petSlug: pet.slug,
      petName: pet.name,
      applicantName: formData.applicantName.trim(),
      phone: formData.phoneDigits,
      email: formData.email.trim(),
      area: formData.area,
      preferredContact: formData.preferredContact,
      bestTime: formData.bestTime,
      hadPetBefore: formData.hadPetBefore === 'never' ? 'no' : 'yes',
      housingType: formData.housingType || 'other',
      landlordPermission: formData.landlordPermission || 'yes',
      householdSize: formData.householdSize,
      hasYoungChildren: formData.hasYoungChildren,
      hasOtherPets: formData.hasOtherPets,
      otherPetsDetail: formData.otherPetsDetail.trim(),
      hoursAtHome: formData.hoursAtHome || 'flexible',
      monthlyBudget: formData.monthlyBudget || '1m_to_2m',
      visitConsent: formData.visitConsent,
      notes: formData.notes.trim(),
      agreedCommitment: true,
      commitmentsAccepted: {
        lifelongCare: formData.commit1,
        vaccinations: formData.commit2,
        updatePhotos: formData.commit3,
        noAbandonment: formData.commit4,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onAddAdoptionRequest(newRequest);

    // Save code & clear draft
    try {
      localStorage.setItem(submittedCodeKey, generatedCode);
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setLastSubmittedCode(generatedCode);
    isDirtyRef.current = false;
    setIsSubmitting(false);

    // Navigate to success page
    onNavigateUrl(`/nhan-nuoi/${pet.slug}/dang-ky/thanh-cong`);
  };

  const handleCopyCode = async (codeToCopy: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeToCopy);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2400);
      }
    } catch {
      // fallback
    }
  };

  // =========================================================================
  // CASE 1: PET NOT FOUND
  // =========================================================================
  if (!pet) {
    return (
      <div className="min-h-[70vh] pt-32 pb-20 shared-container">
        <div className="max-w-xl mx-auto text-center p-8 animora-card">
          <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] text-[var(--primary)] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-[var(--primary)] mb-3">
            {isEn ? 'Pet not found' : 'Không tìm thấy bé này'}
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            {isEn
              ? 'The pet you are looking for may have found a forever home or the link is incorrect.'
              : 'Bé cưng bạn tìm kiếm có thể đã được gia đình mới đón về hoặc đường dẫn không chính xác.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('adopt')}
            className="btn-primary px-6 py-3 cursor-pointer"
          >
            {isEn ? 'Browse other pets' : 'Xem danh sách các bé khác'}
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE 2: PET ALREADY ADOPTED
  // =========================================================================
  if (isPetAdopted(pet) && !isSuccessView) {
    return (
      <div className="min-h-[70vh] pt-32 pb-20 shared-container">
        <div className="max-w-xl mx-auto text-center p-8 animora-card">
          <div className="relative w-32 h-32 mx-auto mb-5">
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-[var(--coral)] mx-auto"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-md">
              <Check className="w-5 h-5 stroke-[3]" />
            </span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-[var(--primary)] mb-2">
            {isEn ? `${pet.name} has found a loving home!` : `${pet.name} đã tìm được gia đình`}
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
            {isEn
              ? `${pet.name} has been adopted by a wonderful family. There are many other sweet friends still waiting for you!`
              : `Bé ${pet.name} đã được một gia đình yêu thương đón về nhà mới. Vẫn còn rất nhiều bé đáng yêu khác tại Animora đang chờ bạn!`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => onNavigate('adopt')}
              className="btn-primary px-6 py-3 cursor-pointer"
            >
              {isEn ? 'Meet other pets' : 'Xem các bé đang chờ nhận nuôi'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateUrl(`/nhan-nuoi/${pet.slug}`)}
              className="btn-secondary px-6 py-3 cursor-pointer"
            >
              {isEn ? `View ${pet.name}'s profile` : `Xem hồ sơ của ${pet.name}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE 3: SUCCESS CONFIRMATION VIEW
  // =========================================================================
  if (isSuccessView) {
    const displayCode = lastSubmittedCode || 'AN-2026-0842';

    return (
      <div className="min-h-screen pt-28 pb-20 shared-container">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Main Success Card */}
          <div className="animora-card p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="inline-block text-xs uppercase tracking-widest font-bold text-[var(--primary)] bg-[var(--surface-2)] px-3 py-1 rounded-full mb-3">
              {isEn ? 'APPLICATION SUBMITTED' : 'ĐƠN ĐĂNG KÝ ĐÃ ĐƯỢC GỬI'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[var(--primary)] mb-3">
              {isEn
                ? `Thank you for opening your heart to ${pet.name}!`
                : `Cảm ơn bạn đã mở rộng vòng tay cho bé ${pet.name}!`}
            </h1>

            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-8">
              {isEn
                ? `Your adoption request has been recorded. Our team will review your application and contact you within 24 hours.`
                : `Đơn đăng ký nhận nuôi bé ${pet.name} của bạn đã được ghi nhận. Đội ngũ Animora sẽ xem xét và liên hệ với bạn trong vòng 24 giờ tới.`}
            </p>

            {/* Application Code Box */}
            <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-5 max-w-md mx-auto mb-8 text-center">
              <span className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider block mb-1">
                {isEn ? 'YOUR APPLICATION CODE' : 'MÃ HỒ SƠ ĐĂNG KÝ CỦA BẠN'}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-[var(--primary)]">
                  {displayCode}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(displayCode)}
                  className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--coral)] hover:text-white transition-colors cursor-pointer"
                  title={isEn ? 'Copy code' : 'Sao chép mã'}
                >
                  {copiedCode ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                {isEn
                  ? 'Please save this code for verification when our care coordinator calls you.'
                  : 'Vui lòng lưu lại mã này để đối chiếu khi chuyên viên Animora gọi trao đổi.'}
              </p>
            </div>

            {/* Next Steps Timeline */}
            <div className="text-left bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 mb-8">
              <h3 className="text-base sm:text-lg font-bold font-heading text-[var(--primary)] mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--coral)]" />
                {isEn ? 'What happens next?' : 'Quy trình tiếp theo diễn ra thế nào?'}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      {isEn ? '1. Application Received' : '1. Tiếp nhận hồ sơ (Đã hoàn tất)'}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {isEn
                        ? 'Your submission is safely saved in Animora’s shelter management system.'
                        : 'Thông tin của bạn đã được chuyển đến bộ phận Điều phối Nhận nuôi.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      {isEn
                        ? '2. Consultation Call (Within 24 Hours)'
                        : '2. Gọi tư vấn & xác minh (Trong vòng 24 giờ)'}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {isEn
                        ? 'A specialist will call you to discuss your home environment, pet personality, and schedule a center visit.'
                        : 'Chuyên viên Animora sẽ gọi theo khung giờ bạn chọn để trao đổi thêm về thói quen của bé.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      {isEn ? `3. Meet ${pet.name} in person` : `3. Gặp gỡ bé ${pet.name} trực tiếp`}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {isEn
                        ? 'Visit our center to play and bond with the pet before making your final decision.'
                        : 'Ghé trung tâm Animora làm quen với bé và nhận tư vấn dinh dưỡng từ bác sĩ thú y.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      {isEn
                        ? '4. Sign commitment & Welcome home'
                        : '4. Ký cam kết & Đón bé về nhà mới'}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {isEn
                        ? 'Complete the commitment agreement and receive the pet’s lifetime Health Passport.'
                        : 'Nhận Sổ sức khỏe của bé và gói ưu đãi chăm sóc trọn đời tại Animora.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct support line */}
            <div className="bg-[var(--surface-2)]/50 border border-[var(--border)] rounded-xl p-4 text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
              <span>{isEn ? 'Need urgent support?' : 'Cần hỗ trợ gấp hoặc đổi lịch hẹn?'}</span>
              <div className="flex items-center gap-4">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-bold text-[var(--primary)] hover:text-[var(--coral)] inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <span className="text-gray-300">·</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-bold text-[var(--primary)] hover:text-[var(--coral)] inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => onNavigate('adopt')}
                className="btn-primary px-7 py-3.5 cursor-pointer text-base"
              >
                {isEn ? 'Browse other pets' : 'Xem các bé khác đang tìm nhà'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="btn-secondary px-7 py-3.5 cursor-pointer text-base"
              >
                {isEn ? 'Back to homepage' : 'Về trang chủ Animora'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE 4: MULTI-STEP APPLICATION FORM WIZARD
  // =========================================================================
  const speciesLabel = getSpeciesDisplayName(pet.species, lang);
  const factChips = [
    pet.vaccinated
      ? isEn
        ? 'Vaccinated'
        : 'Đã tiêm phòng'
      : isEn
      ? 'Unvaccinated'
      : 'Chưa tiêm phòng',
    pet.neutered
      ? isEn
        ? 'Neutered'
        : 'Đã triệt sản'
      : isEn
      ? 'Not neutered'
      : 'Chưa triệt sản',
    isEn ? pet.areaEn || pet.area : pet.area,
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 shared-container">
      {/* Honeypot hidden input for anti-bot protection */}
      <input
        ref={honeypotRef}
        type="text"
        name="animora_website_hp"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-3 text-xs sm:text-sm text-[var(--text-muted)] flex items-center flex-wrap gap-1.5 font-medium"
      >
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          {isEn ? 'Home' : 'Trang chủ'}
        </button>
        <span className="opacity-50">›</span>
        <button
          type="button"
          onClick={() => onNavigate('adopt')}
          className="hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          {isEn ? 'Adoption' : 'Nhận nuôi'}
        </button>
        <span className="opacity-50">›</span>
        <button
          type="button"
          onClick={() => onNavigateUrl(`/nhan-nuoi/${pet.slug}`)}
          className="hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          {pet.name}
        </button>
        <span className="opacity-50">›</span>
        <span className="font-bold text-[var(--primary)]">
          {isEn ? 'Register' : 'Đăng ký'}
        </span>
      </nav>

      {/* Top Back Link (Single arrow icon, no duplicate text arrow) */}
      <div className="flex items-center justify-start gap-3 mb-6">
        <button
          type="button"
          onClick={() => onNavigateUrl(`/nhan-nuoi/${pet.slug}`)}
          className="text-xs sm:text-sm font-bold text-[var(--primary)] hover:text-[var(--coral)] inline-flex items-center gap-1.5 self-start cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{isEn ? `Back to ${pet.name}'s profile` : `Quay lại hồ sơ của bé ${pet.name}`}</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8 space-y-2.5 max-w-2xl">
        <span
          className="block uppercase font-bold"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--primary)',
          }}
        >
          {isEn ? 'ADOPTION APPLICATION' : 'ĐƠN ĐĂNG KÝ NHẬN NUÔI'}
        </span>
        <h1
          className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--primary)',
          }}
        >
          {isEn ? `Adopt ${pet.name}` : `Nhận nuôi bé ${pet.name}`}
        </h1>
        <p
          className="text-[16px] sm:text-[18px] leading-relaxed font-normal"
          style={{ color: 'var(--text-muted)' }}
        >
          {isEn
            ? 'Your information is only used for adoption review and to contact you.'
            : 'Thông tin của bạn chỉ được dùng để xét duyệt nhận nuôi và liên hệ với bạn.'}
        </p>
      </div>

      {/* Mobile Sticky / Pinned Pet Bar (< 960px) */}
      <div className="lg:hidden mb-6 animora-card p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={pet.photo}
            alt={pet.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--coral)] flex-shrink-0"
          />
          <div>
            <h3 className="font-bold font-heading text-base text-[var(--primary)] leading-tight">
              {pet.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {speciesLabel} · {isEn ? pet.breedEn || pet.breed : pet.breed} ·{' '}
              {isEn ? pet.ageEn || pet.age : pet.age}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigateUrl(`/nhan-nuoi/${pet.slug}`)}
          className="text-xs font-bold text-[var(--primary)] hover:text-[var(--coral)] underline cursor-pointer flex-shrink-0"
        >
          {isEn ? 'View profile' : 'Xem hồ sơ'}
        </button>
      </div>

      {/* Restored Draft Alert Banner */}
      {hasRestoredDraft && (
        <div className="mb-6 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-up">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text)]">
            <Info className="w-4 h-4 text-[var(--coral)] flex-shrink-0" />
            <span>
              {isEn
                ? 'Animora restored your application draft.'
                : 'Animora đã khôi phục bản nháp của bạn.'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearDraft}
            className="text-xs font-bold text-[var(--primary)] hover:text-[var(--coral)] inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isEn ? 'Clear draft & start over' : 'Xóa bản nháp'}
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================================================================= */}
        {/* LEFT COLUMN: FORM WIZARD (approx 62%) */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="animora-card p-5 sm:p-8">
            {/* 3-Step Animated Progress Stepper */}
            <div
              className="mb-8"
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={3}
            >
              <div className="relative flex items-center justify-between w-full">
                {/* Connecting Line behind circles at vertical center */}
                <div className="absolute top-5 left-5 right-5 -translate-y-1/2 h-1 bg-[var(--border)] -z-0" />
                <div
                  className="absolute top-5 left-5 -translate-y-1/2 h-1 bg-[var(--primary)] transition-all duration-500 -z-0"
                  style={{
                    width:
                      currentStep === 1
                        ? '0%'
                        : currentStep === 2
                        ? '50%'
                        : 'calc(100% - 40px)',
                  }}
                />

                {/* Step 1: 40px Circle & Centered Label */}
                <button
                  type="button"
                  onClick={() => handleJumpToStep(1)}
                  className="relative z-1 flex flex-col items-center cursor-pointer group flex-1"
                  aria-label={isEn ? 'Step 1: Your Information' : 'Bước 1: Thông tin của bạn'}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep > 1
                        ? 'bg-[var(--primary)] text-[var(--on-primary)] ring-2 ring-[var(--primary)]'
                        : currentStep === 1
                        ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-md ring-4 ring-[var(--primary)]/20'
                        : 'bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {currentStep > 1 ? <Check className="w-5 h-5 stroke-[2.5]" /> : '1'}
                  </div>
                  <span
                    className={`hidden sm:block mt-2 text-[13px] font-bold text-center leading-tight transition-colors ${
                      currentStep === 1
                        ? 'text-[var(--primary)]'
                        : currentStep > 1
                        ? 'text-[var(--text)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isEn ? '1. About you' : '1. Thông tin của bạn'}
                  </span>
                </button>

                {/* Step 2: 40px Circle & Centered Label */}
                <button
                  type="button"
                  onClick={() => handleJumpToStep(2)}
                  disabled={currentStep < 2}
                  className={`relative z-1 flex flex-col items-center transition-all flex-1 ${
                    currentStep >= 2 ? 'cursor-pointer group' : 'cursor-default'
                  }`}
                  aria-label={isEn ? 'Step 2: Home & care' : 'Bước 2: Điều kiện nuôi'}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep > 2
                        ? 'bg-[var(--primary)] text-[var(--on-primary)] ring-2 ring-[var(--primary)]'
                        : currentStep === 2
                        ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-md ring-4 ring-[var(--primary)]/20'
                        : 'bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {currentStep > 2 ? <Check className="w-5 h-5 stroke-[2.5]" /> : '2'}
                  </div>
                  <span
                    className={`hidden sm:block mt-2 text-[13px] font-bold text-center leading-tight transition-colors ${
                      currentStep === 2
                        ? 'text-[var(--primary)]'
                        : currentStep > 2
                        ? 'text-[var(--text)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isEn ? '2. Home & care' : '2. Điều kiện nuôi'}
                  </span>
                </button>

                {/* Step 3: 40px Circle & Centered Label */}
                <div
                  className="relative z-1 flex flex-col items-center flex-1"
                  aria-label={isEn ? 'Step 3: Commit & Send' : 'Bước 3: Cam kết & gửi'}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep === 3
                        ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-md ring-4 ring-[var(--primary)]/20'
                        : 'bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`hidden sm:block mt-2 text-[13px] font-bold text-center leading-tight transition-colors ${
                      currentStep === 3 ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {isEn ? '3. Commit & Send' : '3. Cam kết & gửi'}
                  </span>
                </div>
              </div>

              {/* Mobile Step indicator: "Bước 1/3: Thông tin của bạn" */}
              <div className="sm:hidden mt-3 text-center">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider bg-[var(--surface-2)] px-3 py-1 rounded-full">
                  {isEn
                    ? `Step ${currentStep}/3: ${
                        currentStep === 1
                          ? 'About you'
                          : currentStep === 2
                          ? 'Home & care'
                          : 'Commit & Send'
                      }`
                    : `Bước ${currentStep}/3: ${
                        currentStep === 1
                          ? 'Thông tin của bạn'
                          : currentStep === 2
                          ? 'Điều kiện nuôi'
                          : 'Cam kết & gửi'
                      }`}
                </span>
              </div>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleSubmit} noValidate>
              {/* ======================================================= */}
              {/* STEP 1: ABOUT YOU */}
              {/* ======================================================= */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-xl font-bold font-heading text-[var(--primary)]">
                      {isEn ? 'Step 1: Your Contact Information' : 'Bước 1: Thông tin liên hệ của bạn'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                      {isEn
                        ? 'We will reach out to verify and guide you through the next adoption steps.'
                        : 'Animora cam kết bảo mật tuyệt đối thông tin cá nhân của bạn.'}
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="applicantName" className="block text-sm font-bold text-[var(--text)] mb-1.5">
                      {isEn ? 'Full name *' : 'Họ và tên *'}
                    </label>
                    <input
                      id="applicantName"
                      name="applicantName"
                      type="text"
                      value={formData.applicantName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, applicantName: e.target.value }));
                        if (errors.applicantName) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.applicantName;
                            return n;
                          });
                        }
                      }}
                      placeholder={isEn ? 'e.g. Nguyen Minh Anh' : 'Ví dụ: Nguyễn Minh Anh'}
                      className={`form-input w-full h-[52px] text-base ${
                        errors.applicantName ? 'border-red-500 focus:ring-red-400' : ''
                      }`}
                    />
                    {errors.applicantName && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.applicantName}
                      </p>
                    )}
                  </div>

                  {/* Phone & Email (2 columns on tablet+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-[var(--text)] mb-1.5">
                        {isEn ? 'Phone number *' : 'Số điện thoại liên hệ *'}
                      </label>
                      <div className="relative">
                        <input
                          ref={phoneInputRef}
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={isPhoneFocused ? formData.phoneDigits : formatPhone433(formData.phoneDigits)}
                          onFocus={() => setIsPhoneFocused(true)}
                          onBlur={handlePhoneBlur}
                          onChange={(e) => handlePhoneInputChange(e.target.value)}
                          onPaste={handlePhonePaste}
                          placeholder="0912 345 678"
                          className={`form-input w-full h-[52px] text-base pr-10 ${
                            errors.phone ? 'border-red-500 focus:ring-red-400' : ''
                          }`}
                        />
                        {validatePhoneDigits(formData.phoneDigits, isEn).isValid && (
                          <div
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 pointer-events-none flex items-center justify-center"
                            aria-label={isEn ? 'Valid number' : 'Số hợp lệ'}
                          >
                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                      {errors.phone ? (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      ) : (
                        <p className="text-[13px] text-[var(--text-muted)] mt-1.5 font-normal leading-relaxed">
                          {isEn
                            ? 'Enter 10 digits starting with 03, 05, 07, 08, or 09'
                            : 'Nhập 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09'}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-[var(--text)] mb-1.5">
                        {isEn ? 'Email address *' : 'Địa chỉ email *'}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) {
                            setErrors((prev) => {
                              const n = { ...prev };
                              delete n.email;
                              return n;
                            });
                          }
                        }}
                        placeholder="minhanh@example.com"
                        className={`form-input w-full h-[52px] text-base ${
                          errors.email ? 'border-red-500 focus:ring-red-400' : ''
                        }`}
                      />
                      {errors.email ? (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      ) : (
                        <p className="text-[13px] text-[var(--text-muted)] mt-1.5 font-normal leading-relaxed">
                          {isEn
                            ? 'We only use this to send confirmation and contact you'
                            : 'Chúng tôi chỉ dùng để gửi xác nhận và liên hệ'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Living Area (Province/City) */}
                  <div>
                    <label htmlFor="area" className="block text-sm font-bold text-[var(--text)] mb-1.5">
                      {isEn ? 'Current living province / city *' : 'Tỉnh / Thành phố sinh sống hiện tại *'}
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, area: e.target.value }));
                        if (errors.area) {
                          setErrors((prev) => {
                            const n = { ...prev };
                            delete n.area;
                            return n;
                          });
                        }
                      }}
                      className={`form-input w-full h-[52px] text-base cursor-pointer ${
                        errors.area ? 'border-red-500 focus:ring-red-400' : ''
                      }`}
                    >
                      <option value="" disabled>
                        {isEn ? 'Select province/city' : 'Chọn tỉnh/thành'}
                      </option>
                      {VIETNAMESE_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.area}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact Method Pills */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn ? 'Preferred contact channel' : 'Hình thức liên hệ bạn thuận tiện nhất'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'phone', labelVi: 'Gọi điện thoại', labelEn: 'Phone Call' },
                        { id: 'zalo', labelVi: 'Nhắn qua Zalo', labelEn: 'Zalo Chat' },
                        { id: 'email', labelVi: 'Gửi Email', labelEn: 'Email' },
                      ].map((item) => {
                        const isSelected = formData.preferredContact === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                preferredContact: item.id as 'phone' | 'zalo' | 'email',
                              }))
                            }
                            className={`min-h-[46px] py-2.5 px-3.5 rounded-full text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                              isSelected
                                ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] shadow-sm'
                                : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0" />}
                            <span>{isEn ? item.labelEn : item.labelVi}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Best Time To Call Pills */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn ? 'Convenient time for consultation' : 'Khung giờ thuận tiện để nghe máy'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'morning', labelVi: 'Sáng (8h - 12h)', labelEn: 'Morning (8am-12)' },
                        { id: 'afternoon', labelVi: 'Chiều (13h - 18h)', labelEn: 'Afternoon (1-6pm)' },
                        { id: 'evening', labelVi: 'Tối (18h - 21h)', labelEn: 'Evening (6-9pm)' },
                        { id: 'anytime', labelVi: 'Bất kỳ lúc nào', labelEn: 'Anytime' },
                      ].map((item) => {
                        const isSelected = formData.bestTime === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                bestTime: item.id as 'morning' | 'afternoon' | 'evening' | 'anytime',
                              }))
                            }
                            className={`min-h-[46px] py-2.5 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] shadow-sm'
                                : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0" />}
                            <span className="text-center">{isEn ? item.labelEn : item.labelVi}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-primary px-8 py-3.5 cursor-pointer text-base inline-flex items-center gap-2"
                    >
                      <span>{isEn ? 'Next: Home & Conditions →' : 'Tiếp tục: Điều kiện nuôi →'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* STEP 2: HOME & LIVING CONDITIONS */}
              {/* ======================================================= */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-up">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-xl font-bold font-heading text-[var(--primary)]">
                      {isEn ? 'Step 2: Home & Living Environment' : 'Bước 2: Môi trường & Điều kiện chăm sóc'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                      {isEn
                        ? `Help us understand if ${pet.name} will be a great match for your daily routine.`
                        : `Giúp Animora đảm bảo bé ${pet.name} sẽ hòa nhập tốt nhất với không gian sống của bạn.`}
                    </p>
                  </div>

                  {/* Pet ownership experience */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn
                        ? 'Have you ever had a pet before? *'
                        : 'Bạn đã từng nuôi thú cưng chưa? *'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'never', labelVi: 'Chưa từng', labelEn: 'First-time owner' },
                        { id: 'current', labelVi: 'Đang nuôi', labelEn: 'Currently have pets' },
                        { id: 'past', labelVi: 'Đã từng trước đây', labelEn: 'Had pets before' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              hadPetBefore: item.id as 'never' | 'current' | 'past',
                            }));
                            if (errors.hadPetBefore) {
                              setErrors((prev) => {
                                const n = { ...prev };
                                delete n.hadPetBefore;
                                return n;
                              });
                            }
                          }}
                          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${
                            formData.hadPetBefore === item.id
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                          }`}
                        >
                          {isEn ? item.labelEn : item.labelVi}
                        </button>
                      ))}
                    </div>
                    {errors.hadPetBefore && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.hadPetBefore}
                      </p>
                    )}
                  </div>

                  {/* Housing Type */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn ? 'Current housing type *' : 'Nơi ở hiện tại của bạn *'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'house', labelVi: 'Nhà riêng / Nhà phố', labelEn: 'Private House' },
                        { id: 'apartment', labelVi: 'Căn hộ chung cư', labelEn: 'Apartment' },
                        { id: 'rented', labelVi: 'Nhà thuê / Phòng trọ', labelEn: 'Rented Room' },
                        { id: 'other', labelVi: 'Khác', labelEn: 'Other' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              housingType: item.id as 'house' | 'apartment' | 'rented' | 'other',
                            }));
                            if (errors.housingType) {
                              setErrors((prev) => {
                                const n = { ...prev };
                                delete n.housingType;
                                return n;
                              });
                            }
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${
                            formData.housingType === item.id
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                          }`}
                        >
                          {isEn ? item.labelEn : item.labelVi}
                        </button>
                      ))}
                    </div>
                    {errors.housingType && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.housingType}
                      </p>
                    )}
                  </div>

                  {/* Conditional Question: Landlord / Building permission if apartment or rented */}
                  {(formData.housingType === 'apartment' || formData.housingType === 'rented') && (
                    <div className="bg-[var(--surface-2)]/60 border border-[var(--border)] p-4 rounded-2xl animate-fade-up">
                      <label className="block text-sm font-bold text-[var(--primary)] mb-2">
                        {isEn
                          ? 'Does your landlord or building management permit pets? *'
                          : 'Chủ nhà hoặc Ban quản lý tòa nhà có cho phép nuôi thú cưng không? *'}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'yes', labelVi: 'Được phép nuôi', labelEn: 'Permitted' },
                          { id: 'not_needed', labelVi: 'Không cấm / Tự do', labelEn: 'No restrictions' },
                          { id: 'in_progress', labelVi: 'Đang xin phép', labelEn: 'In progress' },
                        ].map((perm) => (
                          <button
                            key={perm.id}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                landlordPermission: perm.id as 'yes' | 'not_needed' | 'in_progress',
                              }));
                              if (errors.landlordPermission) {
                                setErrors((prev) => {
                                  const n = { ...prev };
                                  delete n.landlordPermission;
                                  return n;
                                });
                              }
                            }}
                            className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                              formData.landlordPermission === perm.id
                                ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                                : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                            }`}
                          >
                            {isEn ? perm.labelEn : perm.labelVi}
                          </button>
                        ))}
                      </div>
                      {errors.landlordPermission && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.landlordPermission}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Household Size Stepper & Young Children */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Household Size Stepper */}
                    <div>
                      <label className="block text-sm font-bold text-[var(--text)] mb-1.5">
                        {isEn ? 'Household size' : 'Số thành viên trong gia đình'}
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              householdSize: Math.max(1, prev.householdSize - 1),
                            }))
                          }
                          className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-bold text-lg text-[var(--primary)] hover:bg-[var(--surface-2)] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="w-14 text-center text-lg font-bold font-mono text-[var(--primary)]">
                          {formData.householdSize} {isEn ? 'people' : 'người'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              householdSize: Math.min(12, prev.householdSize + 1),
                            }))
                          }
                          className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-bold text-lg text-[var(--primary)] hover:bg-[var(--surface-2)] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children under 6 */}
                    <div>
                      <label className="block text-sm font-bold text-[var(--text)] mb-1.5">
                        {isEn ? 'Children under 6 in household?' : 'Nhà có trẻ nhỏ dưới 6 tuổi không?'}
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, hasYoungChildren: false }))}
                          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer ${
                            !formData.hasYoungChildren
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                          }`}
                        >
                          {isEn ? 'No' : 'Không có'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, hasYoungChildren: true }))}
                          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer ${
                            formData.hasYoungChildren
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                          }`}
                        >
                          {isEn ? 'Yes' : 'Có trẻ nhỏ'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Current Pets in Home */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-1.5">
                      {isEn ? 'Are there other pets at home?' : 'Hiện trong nhà có bé thú cưng nào khác không?'}
                    </label>
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasOtherPets: false }))}
                        className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer ${
                          !formData.hasOtherPets
                            ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                            : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                        }`}
                      >
                        {isEn ? 'No other pets' : 'Không có'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasOtherPets: true }))}
                        className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer ${
                          formData.hasOtherPets
                            ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                            : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                        }`}
                      >
                        {isEn ? 'Yes, have pets' : 'Có thú cưng khác'}
                      </button>
                    </div>

                    {formData.hasOtherPets && (
                      <input
                        type="text"
                        value={formData.otherPetsDetail}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, otherPetsDetail: e.target.value }))
                        }
                        placeholder={
                          isEn
                            ? 'e.g. 1 vaccinated domestic cat, 2 years old'
                            : 'Ví dụ: 1 mèo ta 2 tuổi đã tiêm phòng và triệt sản'
                        }
                        className="form-input w-full animate-fade-up text-sm"
                      />
                    )}
                  </div>

                  {/* Time at home */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn
                        ? 'How much time is someone at home each day? *'
                        : 'Thời gian có người ở nhà mỗi ngày? *'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'full_day', labelVi: 'Cả ngày / WFH', labelEn: 'All day / WFH' },
                        { id: 'flexible', labelVi: 'Linh hoạt', labelEn: 'Flexible' },
                        { id: 'evening_only', labelVi: 'Chỉ buổi tối', labelEn: 'Evenings only' },
                        { id: 'often_away', labelVi: 'Hay đi công tác', labelEn: 'Often away' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              hoursAtHome: t.id as 'full_day' | 'flexible' | 'evening_only' | 'often_away',
                            }));
                            if (errors.hoursAtHome) {
                              setErrors((prev) => {
                                const n = { ...prev };
                                delete n.hoursAtHome;
                                return n;
                              });
                            }
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            formData.hoursAtHome === t.id
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                          }`}
                        >
                          {isEn ? t.labelEn : t.labelVi}
                        </button>
                      ))}
                    </div>
                    {errors.hoursAtHome && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.hoursAtHome}
                      </p>
                    )}
                  </div>

                  {/* Monthly Budget */}
                  <div>
                    <label className="block text-sm font-bold text-[var(--text)] mb-2">
                      {isEn
                        ? 'Estimated monthly care budget for the pet? *'
                        : 'Ngân sách dự kiến mỗi tháng dành cho bé? *'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'under_1m', labelVi: '< 1 triệu đ', labelEn: '< 1M VND' },
                        { id: '1m_to_2m', labelVi: '1 – 2 triệu đ', labelEn: '1 – 2M VND' },
                        { id: '2m_to_4m', labelVi: '2 – 4 triệu đ', labelEn: '2 – 4M VND' },
                        { id: 'over_4m', labelVi: '> 4 triệu đ', labelEn: '> 4M VND' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              monthlyBudget: b.id as 'under_1m' | '1m_to_2m' | '2m_to_4m' | 'over_4m',
                            }));
                            if (errors.monthlyBudget) {
                              setErrors((prev) => {
                                const n = { ...prev };
                                delete n.monthlyBudget;
                                return n;
                              });
                            }
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            formData.monthlyBudget === b.id
                              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
                              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                          }`}
                        >
                          {isEn ? b.labelEn : b.labelVi}
                        </button>
                      ))}
                    </div>
                    {errors.monthlyBudget && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.monthlyBudget}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.visitConsent}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, visitConsent: e.target.checked }));
                          if (errors.visitConsent) {
                            setErrors((prev) => {
                              const n = { ...prev };
                              delete n.visitConsent;
                              return n;
                            });
                          }
                        }}
                        className="mt-1 w-4 h-4 rounded text-[var(--coral)] focus:ring-[var(--coral)]"
                      />
                      <span className="text-xs sm:text-sm text-[var(--text)]">
                        {isEn
                          ? 'I agree to allow Animora’s adoption team to contact me and discuss my living conditions before finalizing the adoption.'
                          : 'Tôi đồng ý để đội ngũ Animora gọi điện trao đổi chi tiết và hướng dẫn các bước tiếp theo.'}
                      </span>
                    </label>
                    {errors.visitConsent && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.visitConsent}
                      </p>
                    )}
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-secondary px-6 py-3 cursor-pointer text-sm"
                    >
                      {isEn ? '← Back' : '← Quay lại'}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-primary px-8 py-3.5 cursor-pointer text-base"
                    >
                      {isEn ? 'Next: Commit & Review →' : 'Tiếp tục: Cam kết & gửi →'}
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* STEP 3: COMMITMENT & REVIEW */}
              {/* ======================================================= */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-up">
                  <div className="border-b border-[var(--border)] pb-4">
                    <h2 className="text-xl font-bold font-heading text-[var(--primary)]">
                      {isEn ? 'Step 3: Review & Lifetime Commitment' : 'Bước 3: Xem lại thông tin & Cam kết nhân văn'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                      {isEn
                        ? `Please verify your information and accept the 4 adoption commitments for ${pet.name}.`
                        : `Vui lòng kiểm tra lại thông tin và xác nhận 4 cam kết nhận nuôi bé ${pet.name}.`}
                    </p>
                  </div>

                  {/* Summary Card with Jump Edit links */}
                  <div className="bg-[var(--surface-2)]/50 border border-[var(--border)] rounded-2xl p-5 space-y-4">
                    {/* Block A: Personal Info */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {isEn ? 'Your Information' : 'Thông tin người nhận nuôi'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleJumpToStep(1)}
                          className="text-xs font-bold text-[var(--coral)] hover:underline cursor-pointer"
                        >
                          {isEn ? 'Edit' : 'Sửa'}
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--text)] grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Name: ' : 'Họ tên: '}</span>
                          <span className="font-bold">{formData.applicantName}</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Phone: ' : 'SĐT: '}</span>
                          <span className="font-bold font-mono">{formatPhone433(formData.phoneDigits)}</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">Email: </span>
                          <span className="font-bold">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Area: ' : 'Khu vực: '}</span>
                          <span className="font-bold">{formData.area}</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[var(--border)]" />

                    {/* Block B: Living Conditions */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5" />
                          {isEn ? 'Living Conditions' : 'Điều kiện sống'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleJumpToStep(2)}
                          className="text-xs font-bold text-[var(--coral)] hover:underline cursor-pointer"
                        >
                          {isEn ? 'Edit' : 'Sửa'}
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--text)] grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Housing: ' : 'Nơi ở: '}</span>
                          <span className="font-bold">
                            {formData.housingType === 'house'
                              ? isEn
                                ? 'Private House'
                                : 'Nhà riêng'
                              : formData.housingType === 'apartment'
                              ? isEn
                                ? 'Apartment'
                                : 'Chung cư'
                              : formData.housingType === 'rented'
                              ? isEn
                                ? 'Rented'
                                : 'Nhà thuê'
                              : isEn
                              ? 'Other'
                              : 'Khác'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Household: ' : 'Gia đình: '}</span>
                          <span className="font-bold">
                            {formData.householdSize} {isEn ? 'members' : 'thành viên'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Time at home: ' : 'Thời gian ở nhà: '}</span>
                          <span className="font-bold">
                            {formData.hoursAtHome === 'full_day'
                              ? isEn
                                ? 'All day'
                                : 'Cả ngày'
                              : formData.hoursAtHome === 'flexible'
                              ? isEn
                                ? 'Flexible'
                                : 'Linh hoạt'
                              : isEn
                              ? 'Evening'
                              : 'Chỉ buổi tối'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">{isEn ? 'Monthly budget: ' : 'Ngân sách: '}</span>
                          <span className="font-bold">
                            {formData.monthlyBudget === 'under_1m'
                              ? '< 1M'
                              : formData.monthlyBudget === '1m_to_2m'
                              ? '1 - 2M'
                              : formData.monthlyBudget === '2m_to_4m'
                              ? '2 - 4M'
                              : '> 4M'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Optional Notes Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-bold text-[var(--text)]">
                        {isEn
                          ? 'Message to Animora shelter (Optional)'
                          : 'Lời nhắn gửi đến Animora / Lý do muốn nhận nuôi bé'}
                      </label>
                      <span className="text-xs text-[var(--text-muted)]">
                        {isEn
                          ? `${500 - formData.notes.length} chars left`
                          : `Còn ${500 - formData.notes.length} ký tự`}
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder={
                        isEn
                          ? `Tell us about your home, schedule, or why you feel drawn to ${pet.name}...`
                          : `Hãy chia sẻ thêm về gia đình bạn hoặc lý do bạn cảm thấy gắn kết với bé ${pet.name}...`
                      }
                      className="form-input w-full h-auto py-2.5 text-sm"
                    />
                  </div>

                  {/* 4 Mandatory Commitment Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">
                      {isEn ? '4 Mandatory Commitments *' : '4 Cam kết nhận nuôi nhân văn *'}
                    </h3>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer hover:bg-[var(--surface-2)]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.commit1}
                        onChange={(e) => setFormData((prev) => ({ ...prev, commit1: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-[var(--coral)] focus:ring-[var(--coral)]"
                      />
                      <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                        <strong>1. </strong>
                        {isEn
                          ? `I commit to providing a loving, lifelong home for ${pet.name} and will never abandon the pet.`
                          : `Tôi cam kết chăm sóc bé ${pet.name} trọn đời và tuyệt đối không bỏ rơi bé vì bất kỳ lý do gì.`}
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer hover:bg-[var(--surface-2)]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.commit2}
                        onChange={(e) => setFormData((prev) => ({ ...prev, commit2: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-[var(--coral)] focus:ring-[var(--coral)]"
                      />
                      <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                        <strong>2. </strong>
                        {isEn
                          ? 'I commit to keeping up with routine vaccinations, deworming, and prompt veterinary care.'
                          : 'Tôi cam kết tiêm phòng nhắc lại định kỳ, tẩy giun và đưa bé đi thú y kịp thời khi có dấu hiệu ốm đau.'}
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer hover:bg-[var(--surface-2)]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.commit3}
                        onChange={(e) => setFormData((prev) => ({ ...prev, commit3: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-[var(--coral)] focus:ring-[var(--coral)]"
                      />
                      <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                        <strong>3. </strong>
                        {isEn
                          ? 'I agree to share occasional photos or video updates with Animora during the first 6 months.'
                          : 'Tôi đồng ý chia sẻ hình ảnh/video cập nhật tình hình hòa nhập của bé cho Animora trong 6 tháng đầu.'}
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer hover:bg-[var(--surface-2)]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.commit4}
                        onChange={(e) => setFormData((prev) => ({ ...prev, commit4: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-[var(--coral)] focus:ring-[var(--coral)]"
                      />
                      <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                        <strong>4. </strong>
                        {isEn
                          ? 'I confirm that all information provided above is completely truthful, voluntary, and accurate.'
                          : 'Tôi xác nhận mọi thông tin cung cấp ở trên là hoàn toàn chính xác và xuất phát từ thiện chí tự nguyện.'}
                      </span>
                    </label>

                    {errors.commitments && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.commitments}
                      </p>
                    )}
                  </div>

                  {/* Step 3 Actions */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-secondary px-6 py-3 cursor-pointer text-sm"
                    >
                      {isEn ? '← Back' : '← Quay lại'}
                    </button>
                    <button
                      type="submit"
                      disabled={!allCommitmentsChecked || isSubmitting}
                      className={`btn-primary px-8 py-3.5 text-base inline-flex items-center gap-2 ${
                        !allCommitmentsChecked || isSubmitting
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isEn ? 'Submitting...' : 'Đang gửi hồ sơ...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>{isEn ? 'Submit Adoption Application' : 'Gửi đơn đăng ký nhận nuôi'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: STICKY SIDEBAR (approx 38%) */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-[calc(var(--nav-h,72px)+24px)] lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto pr-1">
          {/* Card A: Selected Pet Card */}
          <div className="animora-card p-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img
                src={pet.photo}
                alt={pet.name}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-[var(--coral)] shadow-md mx-auto"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>

            <h3 className="text-2xl font-bold font-heading text-[var(--primary)] mb-1">
              {pet.name}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-3">
              {speciesLabel} · {isEn ? pet.breedEn || pet.breed : pet.breed} ·{' '}
              {isEn ? pet.ageEn || pet.age : pet.age}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
              {factChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--primary)]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigateUrl(`/nhan-nuoi/${pet.slug}`)}
              className="text-xs font-bold text-[var(--primary)] hover:text-[var(--coral)] inline-flex items-center gap-1.5 underline cursor-pointer transition-colors"
            >
              <span>{isEn ? `View ${pet.name}'s full profile` : `Xem hồ sơ chi tiết của bé`}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card B: What Happens Next (4 Steps) */}
          <div className="animora-card p-6">
            <h4 className="text-sm font-bold font-heading text-[var(--primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--coral)]" />
              {isEn ? 'What happens next?' : 'Quy trình tiếp theo'}
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[var(--primary)]">
                    {isEn ? '1. Submit application' : '1. Gửi đơn đăng ký'}
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {isEn ? 'You are currently here.' : 'Bạn đang hoàn tất bước này.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[var(--text)]">
                    {isEn ? '2. Consultation call in 24h' : '2. Chúng tôi gọi tư vấn trong 24h'}
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {isEn
                      ? 'Discuss routine and home fit.'
                      : 'Giải đáp thói quen ăn uống & tính cách bé.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[var(--text)]">
                    {isEn ? '3. Meet the pet in person' : '3. Gặp gỡ bé tại trung tâm'}
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {isEn
                      ? 'Play together before final decision.'
                      : 'Làm quen trực tiếp tại Animora.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[var(--text)]">
                    {isEn ? '4. Welcome home' : '4. Nhận bé về nhà'}
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                    {isEn
                      ? 'Welcome pet home with initial care instructions.'
                      : 'Nhận bé về nhà và được hướng dẫn chăm sóc ban đầu.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card C: Direct Support Box */}
          <div className="animora-card p-5 bg-[var(--surface-2)]/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--coral)]" />
              {isEn ? 'Need help?' : 'Cần hỗ trợ?'}
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
              {isEn
                ? 'Our pet coordinators are ready to assist you anytime.'
                : 'Đội ngũ tư vấn nhận nuôi luôn sẵn sàng lắng nghe mọi thắc mắc của bạn.'}
            </p>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[var(--text-muted)]">{isEn ? 'Call: ' : 'Gọi: '}</span>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-bold text-[var(--primary)] hover:text-[var(--coral)] underline transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Email: </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-bold text-[var(--primary)] hover:text-[var(--coral)] underline transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
