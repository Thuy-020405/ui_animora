import React, { useState, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  getNextCarouselIndex,
  getPrevCarouselIndex,
  evaluateSwipeGesture,
  getVisibleSlideIndices,
} from '../utils/testimonialCarousel';

interface TestimonialsProps {
  lang: Language;
}

export interface TestimonialItem {
  id: string;
  ownerName: string;
  ownerRole: {
    vi: string;
    en: string;
  };
  petName: string;
  petDetails: {
    vi: string;
    en: string;
  };
  serviceUsed: {
    vi: string;
    en: string;
  };
  visitDate: {
    vi: string;
    en: string;
  };
  rating: number;
  quote: {
    vi: string;
    en: string;
  };
  avatar: string;
}

const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    id: 'rev-1',
    ownerName: 'Nguyễn Minh Anh',
    ownerRole: {
      vi: 'Khách hàng thân thiết 3 năm · Quận 1, TP.HCM',
      en: '3-Year Client · District 1, HCMC',
    },
    petName: 'Mochi',
    petDetails: {
      vi: 'Mèo Anh Lông Ngắn · 2 tuổi',
      en: 'British Shorthair Cat · 2 yrs',
    },
    serviceUsed: {
      vi: 'Spa thảo dược',
      en: 'Herbal Spa',
    },
    visitDate: {
      vi: 'Tháng 10, 2026',
      en: 'Oct 2026',
    },
    rating: 5.0,
    quote: {
      vi: 'Trước đây Mochi rất sợ tiếng máy sấy mỗi lần đi tắm. Từ ngày chuyển qua liệu trình spa thảo dược buồng sấy tĩnh âm tại Animora, bé nằm ngoan thưởng thức và lông mềm mượt suốt cả tháng.',
      en: 'Mochi used to panic around loud dryers during grooming. Since switching to Animora’s whisper-quiet herbal spa suite, she relaxes through the entire session and her coat stays plush for weeks.',
    },
    avatar: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
  },
  {
    id: 'rev-2',
    ownerName: 'Trần Hoàng Nam',
    ownerRole: {
      vi: 'Chủ nuôi cún cảnh · Quận 3, TP.HCM',
      en: 'Dog Parent · District 3, HCMC',
    },
    petName: 'Lucky',
    petDetails: {
      vi: 'Chó Golden Retriever · 3 tuổi',
      en: 'Golden Retriever · 3 yrs',
    },
    serviceUsed: {
      vi: 'Khám & Tiêm chủng',
      en: 'Preventive Vet Care',
    },
    visitDate: {
      vi: 'Tháng 9, 2026',
      en: 'Sep 2026',
    },
    rating: 5.0,
    quote: {
      vi: 'Bác sĩ tại Animora giải thích phác đồ dinh dưỡng xương khớp cực kỳ chi tiết và minh bạch chi phí trước khi khám. Sổ sức khỏe điện tử giúp gia đình mình không bao giờ quên lịch nhắc tiêm.',
      en: 'The veterinarians explained Lucky’s joint nutrition plan in thorough detail with transparent pricing upfront. The digital health log ensures our family never misses a booster appointment.',
    },
    avatar: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
  },
  {
    id: 'rev-3',
    ownerName: 'Lê Thảo Vy',
    ownerRole: {
      vi: 'Nhận nuôi & Chăm sóc · Thảo Điền',
      en: 'Adoptive Pet Parent · Thao Dien',
    },
    petName: 'Đậu Đậu',
    petDetails: {
      vi: 'Chó French Bulldog · 10 tháng',
      en: 'French Bulldog · 10 mos',
    },
    serviceUsed: {
      vi: 'Huấn luyện giao tiếp',
      en: 'Behavioral Training',
    },
    visitDate: {
      vi: 'Tháng 10, 2026',
      en: 'Oct 2026',
    },
    rating: 5.0,
    quote: {
      vi: 'Mình nhận nuôi bé Đậu Đậu qua chương trình của Animora. Chỉ sau 4 tuần học lớp giao tiếp tích cực, bé đã quen nếp sinh hoạt trong căn hộ, biết đi vệ sinh đúng chỗ và cực kỳ quấn người.',
      en: 'We adopted Dau Dau through Animora’s sanctuary program. After four weeks of positive socialization classes, he adjusted seamlessly to apartment life and greets everyone gently.',
    },
    avatar: '/src/assets/images/adopt_french_bulldog_1793177483032.jpg',
  },
  {
    id: 'rev-4',
    ownerName: 'Phạm Quốc Bảo',
    ownerRole: {
      vi: 'Khách lưu trú kỳ nghỉ · Quận 7, TP.HCM',
      en: 'Boarding Client · District 7, HCMC',
    },
    petName: 'Kem Bơ',
    petDetails: {
      vi: 'Chó Toy Poodle Kem · 1 tuổi',
      en: 'Apricot Toy Poodle · 1 yr',
    },
    serviceUsed: {
      vi: 'Lưu trú 24/7',
      en: 'Pet Boarding',
    },
    visitDate: {
      vi: 'Tháng 8, 2026',
      en: 'Aug 2026',
    },
    rating: 4.9,
    quote: {
      vi: 'Mỗi chuyến công tác xa mình đều yên tâm gửi Kem Bơ tại phòng lưu trú riêng của Animora. Mỗi ngày các bạn chăm sóc viên đều gửi video bé ăn hết khẩu phần và chạy nhảy trên sân cỏ.',
      en: 'Whenever I travel for work, I board Kem Bo in Animora’s private suites. Every afternoon the care team sends video updates of her finishing meals and playing happily in the courtyard.',
    },
    avatar: '/src/assets/images/hero_apricot_puppy_1793180428505.jpg',
  },
  {
    id: 'rev-5',
    ownerName: 'Vũ Ngọc Hân',
    ownerRole: {
      vi: 'Chủ nuôi đa loài · Bình Thạnh',
      en: 'Multi-Pet Household · Binh Thanh',
    },
    petName: 'Bông Gòn',
    petDetails: {
      vi: 'Chó Bichon & Thỏ Holland Lop',
      en: 'Bichon Frise & Holland Lop Rabbit',
    },
    serviceUsed: {
      vi: 'Nha khoa & Grooming',
      en: 'Dental & Grooming',
    },
    visitDate: {
      vi: 'Tháng 9, 2026',
      en: 'Sep 2026',
    },
    rating: 5.0,
    quote: {
      vi: 'Rất hiếm phòng khám nào có bác sĩ am hiểu sâu cả cún lẫn thỏ cảnh như Animora. Bé thỏ của mình được kiểm tra mài răng nhẹ nhàng không cần gây mê, còn Bông Gòn được cắt tỉa tròn xoe.',
      en: 'Few clinics understand both dogs and exotic rabbits as deeply as Animora. Our Holland Lop had a gentle anesthesia-free dental check while Bong Gon received a crisp teddy trim.',
    },
    avatar: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
  },
  {
    id: 'rev-6',
    ownerName: 'Đặng Tuấn Kiệt',
    ownerRole: {
      vi: 'Khách hàng định kỳ · Phú Nhuận',
      en: 'Regular Client · Phu Nhuan',
    },
    petName: 'Mướp Nhỏ',
    petDetails: {
      vi: 'Mèo Mướp Vàng · 1.5 tuổi',
      en: 'Ginger Tabby Cat · 1.5 yrs',
    },
    serviceUsed: {
      vi: 'Dinh dưỡng & Da liễu',
      en: 'Nutrition & Skin Care',
    },
    visitDate: {
      vi: 'Tháng 10, 2026',
      en: 'Oct 2026',
    },
    rating: 5.0,
    quote: {
      vi: 'Mướp Nhỏ từng bị nhạy cảm đường ruột và rụng lông từng mảng. Sau 6 tuần đổi sang khẩu phần hạt hữu cơ kết hợp sữa tắm yến mạch theo tư vấn của bác sĩ, da bé khỏe hẳn và tăng 0.6kg.',
      en: 'Muop Nho struggled with sensitive digestion and patchy shedding. Six weeks after switching to the organic diet and oat bath prescribed here, his coat recovered and he gained 0.6 kg.',
    },
    avatar: '/src/assets/images/tabby_waving_kitten_1793182648115.jpg',
  },
];

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = translations[lang].testimonials;
  const total = TESTIMONIAL_ITEMS.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const gestureStartRef = useRef<{
    x: number;
    y: number;
    time: number;
    pointerId: number | null;
  } | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => getNextCarouselIndex(prev, total));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => getPrevCarouselIndex(prev, total));
  };

  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Pointer drag handlers (mouse + touch unified where supported)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks directly on interactive buttons inside the viewport
    if ((e.target as HTMLElement).closest('button')) return;

    gestureStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      pointerId: e.pointerId,
    };
    setIsDragging(true);
    setDragOffsetX(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !gestureStartRef.current) return;
    const deltaX = e.clientX - gestureStartRef.current.x;
    const deltaY = e.clientY - gestureStartRef.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const clampedOffset = Math.max(-140, Math.min(140, deltaX));
      setDragOffsetX(clampedOffset);
    }
  };

  const finishGesture = (clientX: number, clientY: number) => {
    if (!gestureStartRef.current) return;
    const deltaX = clientX - gestureStartRef.current.x;
    const deltaY = clientY - gestureStartRef.current.y;
    const durationMs = Date.now() - gestureStartRef.current.time;

    const direction = evaluateSwipeGesture({
      deltaX,
      deltaY,
      durationMs,
    });

    if (direction === 'next') {
      handleNext();
    } else if (direction === 'prev') {
      handlePrev();
    }

    gestureStartRef.current = null;
    setIsDragging(false);
    setDragOffsetX(0);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    finishGesture(e.clientX, e.clientY);
  };

  const handlePointerCancel = () => {
    gestureStartRef.current = null;
    setIsDragging(false);
    setDragOffsetX(0);
  };

  // Touch fallback handlers for mobile browsers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;
    gestureStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      pointerId: null,
    };
    setIsDragging(true);
    setDragOffsetX(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !gestureStartRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - gestureStartRef.current.x;
    const deltaY = touch.clientY - gestureStartRef.current.y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffsetX(Math.max(-140, Math.min(140, deltaX)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gestureStartRef.current) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      handlePointerCancel();
      return;
    }
    finishGesture(touch.clientX, touch.clientY);
  };

  const visibleIndices = getVisibleSlideIndices(activeIndex, total, 3);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      aria-label={t.title}
      onKeyDown={handleKeyDown}
      className="py-16 lg:py-24 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header + Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span
              className="eyebrow-label block text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.26em] mb-3"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: 'var(--coral)',
              }}
            >
              {t.eyebrow}
            </span>

            <h2
              className="section-title font-heading text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold leading-[1.12] tracking-[-0.02em] [text-wrap:balance]"
              style={{ color: 'var(--primary)' }}
            >
              {t.title}
            </h2>

            <p
              className="mt-3 text-base sm:text-lg leading-relaxed max-w-xl [text-wrap:balance]"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.subtitle}
            </p>

            {/* Unboxed Quantitative Proof Line */}
            <div
              className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tabular-nums"
              style={{ color: 'var(--primary)' }}
            >
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FF9F68] text-[#FF9F68]"
                  />
                ))}
              </div>
              <span>{t.ratingSummary}</span>
            </div>
          </div>

          {/* Carousel Prev / Next Controls + Counter */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <span
              data-testid="testimonial-counter"
              className="text-sm font-bold tabular-nums mr-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              type="button"
              data-testid="testimonial-prev"
              onClick={handlePrev}
              aria-label={t.prevLabel}
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              data-testid="testimonial-next"
              onClick={handleNext}
              aria-label={t.nextLabel}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Dark-Glass Cards Track */}
        <div
          data-testid="testimonial-carousel-track"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            transform: `translate3d(${dragOffsetX}px, 0, 0)`,
            transition: isDragging
              ? 'none'
              : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {visibleIndices.map((itemIdx, slotIdx) => {
            const item = TESTIMONIAL_ITEMS[itemIdx];
            const visibilityClass =
              slotIdx === 1
                ? 'hidden md:flex'
                : slotIdx === 2
                ? 'hidden lg:flex'
                : 'flex';

            return (
              <article
                key={`${item.id}-slot-${slotIdx}`}
                data-testid={`testimonial-card-${slotIdx}`}
                data-review-id={item.id}
                className={`${visibilityClass} dark-glass-card rounded-[28px] p-7 sm:p-8 flex-col justify-between min-h-[340px] relative overflow-hidden transition-transform duration-200 hover:-translate-y-1`}
              >
                {/* Soft Ambient Rose Glow Inside Dark-Glass Card */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(244, 182, 194, 0.16) 0%, rgba(244, 182, 194, 0) 70%)',
                  }}
                />

                {/* Top Content: Rating + Unboxed Service & Date Metadata + Review Quote */}
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className="w-4 h-4 fill-[#FF9F68] text-[#FF9F68]"
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-bold tabular-nums ml-1"
                        style={{ color: '#FFF4E8' }}
                      >
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Clean Unboxed Metadata with Typographic Separator */}
                    <div
                      className="text-xs font-medium flex items-center gap-1.5 truncate"
                      style={{ color: '#E5BFC4' }}
                    >
                      <span className="truncate">{item.serviceUsed[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="shrink-0">{item.visitDate[lang]}</span>
                    </div>
                  </div>

                  {/* Review Quote */}
                  <blockquote
                    className="text-[15.5px] sm:text-[16.5px] leading-[1.7] font-normal"
                    style={{ color: '#FFF4E8' }}
                  >
                    “{item.quote[lang]}”
                  </blockquote>
                </div>

                {/* Bottom Divider + Attributable Pet & Owner Info */}
                <div
                  className="relative z-10 pt-5 mt-6 border-t flex items-center gap-4"
                  style={{ borderColor: 'rgba(244, 182, 194, 0.2)' }}
                >
                  <div
                    className="w-13 h-13 rounded-full overflow-hidden border-2 shrink-0"
                    style={{
                      borderColor: '#F4B6C2',
                      backgroundColor: '#4A1A27',
                    }}
                  >
                    <img
                      src={item.avatar}
                      alt={`${item.petName} - ${item.ownerName}`}
                      referrerPolicy="no-referrer"
                      draggable={false}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-heading text-lg font-bold leading-snug truncate"
                      style={{ color: '#FFF4E8' }}
                    >
                      {item.ownerName}
                    </h3>
                    <p
                      className="text-xs font-semibold truncate"
                      style={{ color: '#F4B6C2' }}
                    >
                      {item.petName} <span aria-hidden="true">·</span> {item.petDetails[lang]}
                    </p>
                    <p
                      className="text-[11.5px] truncate mt-0.5"
                      style={{ color: 'rgba(229, 191, 196, 0.82)' }}
                    >
                      {item.ownerRole[lang]}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Pagination Indicators + Swipe Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.swipeHint}
          </p>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={t.title}
          >
            {TESTIMONIAL_ITEMS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${t.goToSlide} ${idx + 1} - ${item.ownerName}`}
                  data-testid={`testimonial-dot-${idx}`}
                  onClick={() => handleSelectSlide(idx)}
                  className="h-2.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
                  style={{
                    width: isActive ? '28px' : '10px',
                    backgroundColor: isActive
                      ? 'var(--primary)'
                      : 'color-mix(in srgb, var(--primary) 28%, transparent)',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
