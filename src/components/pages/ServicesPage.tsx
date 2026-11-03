import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  BriefcaseMedical,
  Flower2,
  GraduationCap,
  Home,
  Stethoscope,
  CheckCircle2,
  Clock,
  Calendar,
  Phone,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  PawPrint,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Booking, Language, PageId } from '../../types';
import { CONTACT_INFO } from '../../config/contact';
import {
  SERVICES_DATA,
  SERVICE_CATEGORIES,
  ServiceCategoryId,
  ServiceEntity,
  ServiceIconType,
  formatServicePrice,
} from '../../data/servicesData';

interface ServicesPageProps {
  lang: Language;
  bookings: Booking[];
  onAddBooking: (booking: Booking) => void;
  onNavigate: (page: PageId) => void;
  onBookService: (serviceSlug?: string) => void;
  initialSelectedService?: string;
}

const ICON_MAP: Record<ServiceIconType, React.FC<{ className?: string }>> = {
  checkup: BriefcaseMedical,
  spa: Flower2,
  training: GraduationCap,
  boarding: Home,
  dental: Stethoscope,
};

function parseSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/dich-vu\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  lang,
  bookings,
  onAddBooking,
  onNavigate,
  onBookService,
  initialSelectedService,
}) => {
  // Active service slug for detail view (/dich-vu/{slug})
  const [activeSlug, setActiveSlug] = useState<string | null>(() =>
    parseSlugFromPath(window.location.pathname)
  );

  // Category filter state on the list view
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId>('all');

  // Preserve list scroll position when opening detail view
  const listScrollYRef = useRef<number>(0);

  // Category tab scroller refs & edge fades
  const tabScrollerRef = useRef<HTMLDivElement | null>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // FAQ accordion open index on detail view
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Sync URL slug on mount or popstate
  useEffect(() => {
    const applyLocationState = () => {
      const slug = parseSlugFromPath(window.location.pathname);
      setActiveSlug(slug);
    };

    applyLocationState();
    window.addEventListener('popstate', applyLocationState);
    return () => window.removeEventListener('popstate', applyLocationState);
  }, []);

  const updateTabScrollFades = useCallback(() => {
    const el = tabScrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScrollLeft - el.scrollLeft > 2);
  }, []);

  useEffect(() => {
    updateTabScrollFades();
    const el = tabScrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateTabScrollFades, { passive: true });
    window.addEventListener('resize', updateTabScrollFades);
    return () => {
      el.removeEventListener('scroll', updateTabScrollFades);
      window.removeEventListener('resize', updateTabScrollFades);
    };
  }, [updateTabScrollFades, lang, activeSlug]);

  // Open a service detail page (/dich-vu/{slug}) and scroll to top
  const handleOpenServiceDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!activeSlug) {
      listScrollYRef.current = window.scrollY;
    }
    setOpenFaqIdx(0);
    setActiveSlug(slug);
    window.history.pushState({ serviceSlug: slug }, '', `/dich-vu/${slug}`);
    window.scrollTo({ top: 0, left: 0 });
  };

  // Return to the services list and restore scroll position
  const handleBackToList = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const savedY = listScrollYRef.current;
    setActiveSlug(null);
    window.history.pushState({}, '', '/dich-vu');
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedY, left: 0 });
    });
  };

  // Book this service from the detail page -> navigate to /dat-lich?service={slug}
  const handleBookFromDetail = (srv: ServiceEntity) => {
    onBookService(srv.slug);
  };

  const handleSelectCategoryTab = (catId: ServiceCategoryId, index: number) => {
    setSelectedCategory(catId);
    const btn = tabBtnRefs.current[index];
    if (btn && typeof btn.scrollIntoView === 'function') {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleCategoryKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = SERVICE_CATEGORIES.length;
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (index + 1) % total;
    else if (e.key === 'ArrowLeft') nextIdx = (index - 1 + total) % total;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = total - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      handleSelectCategoryTab(SERVICE_CATEGORIES[nextIdx].id, nextIdx);
      tabBtnRefs.current[nextIdx]?.focus();
    }
  };

  const filteredServices = SERVICES_DATA.filter((srv) =>
    selectedCategory === 'all' ? true : srv.category === selectedCategory
  );

  // =========================================================================
  // DETAIL PAGE VIEW (/dich-vu/{slug})
  // =========================================================================
  if (activeSlug !== null) {
    const activeService = SERVICES_DATA.find((s) => s.slug === activeSlug);

    // Friendly 404 Not Found View if slug does not exist
    if (!activeService) {
      return (
        <div
          data-testid="page-service-not-found"
          className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div
            className="rounded-[20px] border p-8 sm:p-12 space-y-6"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
              }}
            >
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1
              className="font-heading text-3xl sm:text-4xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? 'Không tìm thấy dịch vụ' : 'Service not found'}
            </h1>
            <p
              className="text-base max-w-lg mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi'
                ? 'Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đường dẫn đã thay đổi. Vui lòng quay lại danh sách dịch vụ của Animora.'
                : 'The service you are looking for does not exist or its link has changed. Please return to our services catalog.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBackToList}
                className="btn-primary px-6 py-3 text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>
                  {lang === 'vi' ? '← Quay lại dịch vụ' : '← Back to services'}
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    const DetailIcon = ICON_MAP[activeService.icon];
    const priceFormatted = formatServicePrice(activeService.priceFrom);
    const priceWithUnit = activeService.priceUnit
      ? `${priceFormatted} ${activeService.priceUnit[lang]}`
      : priceFormatted;
    const relatedServices = SERVICES_DATA.filter(
      (s) => s.slug !== activeService.slug
    ).slice(0, 3);

    return (
      <div
        data-testid={`page-service-detail-${activeService.slug}`}
        className="pt-24 pb-28 lg:pb-24 space-y-10"
      >
        {/* 1. Breadcrumb & Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              type="button"
              data-testid="service-detail-back-btn"
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline cursor-pointer"
              style={{ color: 'var(--primary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {lang === 'vi' ? 'Quay lại dịch vụ' : 'Back to services'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Header Block */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[20px] border p-6 sm:p-10 space-y-6"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Large Icon Tile */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] flex items-center justify-center shrink-0 shadow-md"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                <DetailIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="space-y-3 flex-1">
                {/* Category Pill */}
                <span
                  className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--primary)',
                  }}
                >
                  {activeService.categoryLabel[lang]}
                </span>

                {/* Service Name: Baloo 2, clamp(32px, 4vw, 52px) */}
                <h1
                  className="font-heading font-extrabold leading-[1.12] tracking-tight"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    color: 'var(--primary)',
                  }}
                >
                  {activeService.name[lang]}
                </h1>
              </div>
            </div>

            {/* Row of 3 Key Facts: Duration, "Từ {price}", Suitable Pets */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <div
                className="p-4 rounded-2xl border flex items-center gap-3.5"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <Clock
                  className="w-5 h-5 shrink-0"
                  style={{ color: 'var(--coral)' }}
                />
                <div>
                  <span
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Thời lượng' : 'Duration'}
                  </span>
                  <span
                    className="text-base font-extrabold"
                    style={{ color: 'var(--text)' }}
                  >
                    {activeService.duration[lang]}
                  </span>
                </div>
              </div>

              <div
                className="p-4 rounded-2xl border flex items-center gap-3.5"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-heading font-extrabold text-sm shrink-0"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                  }}
                >
                  ₫
                </span>
                <div>
                  <span
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Chi phí tiêu chuẩn' : 'Starting Price'}
                  </span>
                  <span
                    className="text-lg font-extrabold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {lang === 'vi'
                      ? `Từ ${priceWithUnit}`
                      : `From ${priceWithUnit}`}
                  </span>
                </div>
              </div>

              <div
                className="p-4 rounded-2xl border flex items-center gap-3.5"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <PawPrint
                  className="w-5 h-5 shrink-0"
                  style={{ color: 'var(--coral)' }}
                />
                <div>
                  <span
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Thú cưng phù hợp' : 'Suitable Pets'}
                  </span>
                  <span
                    className="text-sm sm:text-base font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {activeService.suitablePets[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                data-testid="detail-book-service-btn"
                onClick={() => handleBookFromDetail(activeService)}
                className="btn-primary px-7 py-3.5 text-base font-bold inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {lang === 'vi' ? 'Đặt lịch dịch vụ này' : 'Book this service'}
                </span>
              </button>

              <a
                href={CONTACT_INFO.phoneHref}
                className="btn-secondary px-6 py-3.5 text-base font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>
                  {lang === 'vi'
                    ? `Gọi ngay: ${CONTACT_INFO.phoneDisplay}`
                    : `Call now: ${CONTACT_INFO.phoneDisplay}`}
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Two-Column Detail Body: 2/3 Content + 1/3 Sticky Desktop Sidebar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (2/3 width on desktop) */}
            <div className="lg:col-span-8 space-y-8">
              {/* 3. Mô tả (Overview) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-4"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Mô tả dịch vụ' : 'Service Overview'}
                </h2>
                <div className="space-y-4">
                  {activeService.description[lang].map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--text)' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* 4. Dịch vụ bao gồm (What is included) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Dịch vụ bao gồm' : 'What Is Included'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.included[lang].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[16px] font-medium leading-snug"
                      style={{ color: 'var(--text)' }}
                    >
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: 'var(--coral)' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Quy trình thực hiện (Process Timeline) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-6"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Quy trình thực hiện' : 'Step-by-Step Process'}
                </h2>
                <ol className="relative space-y-6 before:content-[''] before:absolute before:top-4 before:bottom-4 before:left-5 before:w-0.5 before:bg-[var(--border)]">
                  {activeService.steps.map((step, idx) => (
                    <li key={idx} className="relative flex items-start gap-4">
                      <span
                        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-heading text-lg font-extrabold shrink-0 shadow-xs"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--on-primary)',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div className="pt-1 space-y-1">
                        <h3
                          className="font-heading text-lg sm:text-xl font-bold leading-snug"
                          style={{ color: 'var(--primary)' }}
                        >
                          {lang === 'vi' ? step.titleVi : step.titleEn}
                        </h3>
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {lang === 'vi' ? step.textVi : step.textEn}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Bảng giá theo cân nặng (Price by Weight Table) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Bảng giá theo cân nặng' : 'Price by Weight'}
                </h2>

                <div
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          color: 'var(--primary)',
                        }}
                      >
                        <th className="py-3.5 px-5 text-sm sm:text-base font-extrabold">
                          {lang === 'vi' ? 'Mức cân nặng của bé' : 'Pet Weight Range'}
                        </th>
                        <th className="py-3.5 px-5 text-sm sm:text-base font-extrabold text-right">
                          {lang === 'vi' ? 'Chi phí niêm yết' : 'Standard Price'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeService.priceTable.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-t"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <td
                            className="py-3.5 px-5 text-base font-semibold"
                            style={{ color: 'var(--text)' }}
                          >
                            {lang === 'vi' ? row.weightRangeVi : row.weightRangeEn}
                          </td>
                          <td
                            className="py-3.5 px-5 text-base font-extrabold text-right"
                            style={{ color: 'var(--primary)' }}
                          >
                            {formatServicePrice(row.price)}
                            {activeService.priceUnit
                              ? ` ${activeService.priceUnit[lang]}`
                              : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Info
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--coral)' }}
                  />
                  <span>
                    {lang === 'vi'
                      ? 'Giá có thể thay đổi theo tình trạng thực tế của bé.'
                      : 'Prices may vary depending on your pet’s actual condition.'}
                  </span>
                </p>
              </div>

              {/* 7. Lưu ý trước khi đến (Before You Come) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-4"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Lưu ý trước khi đến' : 'Before You Come'}
                </h2>
                <ul className="space-y-3">
                  {activeService.tips[lang].map((tip, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-base leading-relaxed"
                      style={{ color: 'var(--text)' }}
                    >
                      <span
                        className="w-2 h-2 rounded-full mt-2.5 shrink-0"
                        style={{ backgroundColor: 'var(--coral)' }}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 8. Câu hỏi thường gặp (FAQ Accordion) */}
              <div
                className="rounded-[20px] border p-6 sm:p-8 space-y-5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi'
                    ? 'Câu hỏi thường gặp'
                    : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-3">
                  {activeService.faq.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border overflow-hidden"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-base cursor-pointer"
                          style={{ color: 'var(--text)' }}
                        >
                          <span>
                            {lang === 'vi' ? item.questionVi : item.questionEn}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            style={{ color: 'var(--coral)' }}
                          />
                        </button>
                        {isOpen && (
                          <div
                            className="px-4 sm:px-5 pb-5 pt-3 border-t text-base leading-relaxed"
                            style={{
                              borderColor: 'var(--border)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {lang === 'vi' ? item.answerVi : item.answerEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 9a. Desktop Sticky Booking Sidebar (1/3 width on desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <div
                className="rounded-[20px] border p-7 space-y-6"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div className="space-y-2 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Tóm tắt dịch vụ' : 'Service Summary'}
                  </span>
                  <h3
                    className="font-heading text-2xl font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {activeService.name[lang]}
                  </h3>
                  <div className="pt-1">
                    <span
                      className="font-heading text-3xl font-extrabold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {lang === 'vi'
                        ? `Từ ${priceWithUnit}`
                        : `From ${priceWithUnit}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ color: 'var(--text-muted)' }}>
                      {lang === 'vi' ? 'Thời lượng:' : 'Duration:'}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--text)' }}>
                      {activeService.duration[lang]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'vi' ? 'Loài phù hợp:' : 'Suitable for:'}
                    </span>
                    <span
                      className="font-bold text-right"
                      style={{ color: 'var(--text)' }}
                    >
                      {activeService.suitablePets[lang]}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    data-testid="sidebar-book-service-btn"
                    onClick={() => handleBookFromDetail(activeService)}
                    className="btn-primary w-full py-3.5 px-6 text-base font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {lang === 'vi' ? 'Đặt lịch dịch vụ này' : 'Book this service'}
                    </span>
                  </button>

                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="btn-secondary w-full py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>
                      {lang === 'vi'
                        ? `Gọi ngay: ${CONTACT_INFO.phoneDisplay}`
                        : `Call now: ${CONTACT_INFO.phoneDisplay}`}
                    </span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 10. Dịch vụ liên quan (Related Services: 3 Small Cards) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
          <h2
            className="font-heading text-2xl sm:text-3xl font-extrabold"
            style={{ color: 'var(--primary)' }}
          >
            {lang === 'vi' ? 'Dịch vụ liên quan' : 'Related Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => {
              const RelIcon = ICON_MAP[rel.icon];
              const relPrice = formatServicePrice(rel.priceFrom);
              return (
                <a
                  key={rel.slug}
                  href={`/dich-vu/${rel.slug}`}
                  data-testid={`related-service-card-${rel.slug}`}
                  onClick={(e) => handleOpenServiceDetail(rel.slug, e)}
                  className="group rounded-[20px] border p-6 flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--on-primary)',
                        }}
                      >
                        <RelIcon className="w-6 h-6" />
                      </div>
                      <h3
                        className="font-heading text-xl font-bold leading-snug"
                        style={{ color: 'var(--primary)' }}
                      >
                        {rel.name[lang]}
                      </h3>
                    </div>
                    <p
                      className="text-sm line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {rel.shortDescription[lang]}
                    </p>
                  </div>

                  <div
                    className="pt-3 border-t flex items-center justify-between text-sm font-bold"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span
                      className="font-extrabold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {lang === 'vi' ? `Từ ${relPrice}` : `From ${relPrice}`}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 font-bold"
                      style={{ color: 'var(--coral)' }}
                    >
                      <span>{lang === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 9b. Mobile Sticky Bottom Booking Bar */}
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t px-4 py-3 flex items-center justify-between gap-4"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.12)',
          }}
        >
          <div>
            <span
              className="block text-xs font-semibold"
              style={{ color: 'var(--text-muted)' }}
            >
              {activeService.duration[lang]}
            </span>
            <span
              className="font-heading text-xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? `Từ ${priceWithUnit}` : `From ${priceWithUnit}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleBookFromDetail(activeService)}
            className="btn-primary px-6 py-3 text-sm font-bold inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Đặt lịch' : 'Book now'}</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LIST PAGE VIEW (/dich-vu)
  // =========================================================================
  return (
    <div data-testid="page-services" className="pt-24 pb-20 space-y-12">
      {/* 1. Heading, Subtitle, Category Tabs & 2-Column Simplified Service Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span
              data-testid="services-page-eyebrow"
              className="block uppercase font-bold"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
              }}
            >
              {lang === 'vi' ? 'DỊCH VỤ THÚ CƯNG' : 'PET SERVICES'}
            </span>
            <h1
              data-testid="services-page-title"
              className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--primary)',
              }}
            >
              {lang === 'vi'
                ? 'Chăm sóc thú y & Spa của bé'
                : "Your pet's veterinary & spa care"}
            </h1>
            <p
              data-testid="services-page-subtitle"
              className="text-[18px] leading-relaxed font-normal"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi'
                ? 'Khám định kỳ, tiêm chủng, spa thảo mộc và khách sạn lưu trú chuẩn quốc tế cho từng bé.'
                : 'Preventive checkups, vaccinations, herbal spa and boarding suites for each pet.'}
            </p>
          </div>

          <button
            type="button"
            data-testid="services-page-top-book-btn"
            onClick={() => onBookService()}
            className="btn-primary px-6 py-3 text-[15px] font-bold shadow-sm self-start md:self-auto shrink-0 cursor-pointer"
          >
            {lang === 'vi' ? 'Đặt lịch hẹn ngay' : 'Book Appointment'}
          </button>
        </div>

        {/* Category Filter Tabs above the Grid */}
        <div className="specialist-tab-bar-outer">
          <div
            className="specialist-tab-bar"
            role="tablist"
            aria-label={
              lang === 'vi' ? 'Lọc danh mục dịch vụ' : 'Filter services by category'
            }
          >
            <div
              aria-hidden="true"
              className="specialist-tab-fade-left"
              style={{ opacity: canScrollLeft ? 1 : 0 }}
            />
            <div ref={tabScrollerRef} className="specialist-tab-scroller">
              {SERVICE_CATEGORIES.map((cat, idx) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    ref={(el) => {
                      tabBtnRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    data-testid={`services-cat-${cat.id}`}
                    onClick={() => handleSelectCategoryTab(cat.id, idx)}
                    onKeyDown={(e) => handleCategoryKeyDown(e, idx)}
                    className="specialist-tab-btn"
                  >
                    <span>{lang === 'vi' ? cat.labelVi : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="specialist-tab-fade-right"
              style={{ opacity: canScrollRight ? 1 : 0 }}
            />
          </div>
        </div>

        {/* 2-Column Service Cards Grid (gap 24px, equal card heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {filteredServices.map((srv) => {
            const Icon = ICON_MAP[srv.icon];
            const formattedPrice = formatServicePrice(srv.priceFrom);
            const priceText = srv.priceUnit
              ? `${formattedPrice} ${srv.priceUnit[lang]}`
              : formattedPrice;

            return (
              <a
                key={srv.slug}
                href={`/dich-vu/${srv.slug}`}
                data-testid={`detail-service-card-${srv.id}`}
                onClick={(e) => handleOpenServiceDetail(srv.slug, e)}
                className="group h-full rounded-[20px] border p-7 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-250 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2 cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div className="space-y-4">
                  {/* Top Row: Solid --primary Icon Tile + Service Name (Baloo 2, 24px, weight 700) */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--on-primary)',
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h2
                      className="font-heading text-[24px] font-bold leading-snug"
                      style={{ color: 'var(--primary)' }}
                    >
                      {srv.name[lang]}
                    </h2>
                  </div>

                  {/* Short Description limited to 2 lines (Nunito 16px, --text-muted) */}
                  <p
                    className="font-body text-[16px] leading-relaxed line-clamp-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {srv.shortDescription[lang]}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Duration with small clock icon + Price in --primary, 18px, weight 800 */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Clock
                        className="w-4 h-4 shrink-0"
                        style={{ color: 'var(--coral)' }}
                      />
                      <span>{srv.duration[lang]}</span>
                    </span>

                    <span
                      className="text-[18px] font-extrabold leading-none"
                      style={{ color: 'var(--primary)' }}
                    >
                      {lang === 'vi' ? `Từ ${priceText}` : `From ${priceText}`}
                    </span>
                  </div>

                  {/* Bottom row: "Xem chi tiết →" and "Đặt lịch" button */}
                  <div
                    className="pt-4 border-t flex items-center justify-between gap-3"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:underline"
                      style={{ color: 'var(--coral)' }}
                    >
                      <span>
                        {lang === 'vi' ? 'Xem chi tiết' : 'View details'}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>

                    <button
                      type="button"
                      data-testid={`card-book-service-btn-${srv.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onBookService(srv.slug);
                      }}
                      className="btn-primary px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Đặt lịch' : 'Book'}</span>
                    </button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
