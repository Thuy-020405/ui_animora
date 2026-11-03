import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, Phone, Sparkles, CheckCircle2, Dog, Stethoscope, Heart } from 'lucide-react';
import { Booking, Language } from '../types';
import { translations } from '../data/translations';

interface QuickBookingProps {
  lang: Language;
  onAddBooking: (booking: Booking) => void;
  selectedServicePreFill?: string;
  bookingTrigger?: number;
}

const PawWatermark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 36 36" fill="currentColor" className={className} aria-hidden="true">
    <ellipse cx="10.5" cy="10.5" rx="3" ry="4" transform="rotate(-18 10.5 10.5)" />
    <ellipse cx="18" cy="8.5" rx="3" ry="4.2" />
    <ellipse cx="25.5" cy="10.5" rx="3" ry="4" transform="rotate(18 25.5 10.5)" />
    <ellipse cx="30.5" cy="17" rx="2.6" ry="3.5" transform="rotate(34 30.5 17)" />
    <path d="M18 14.5c-4.6 0-8.6 3.5-9.4 7.7-.6 3.1 1.7 5.5 4.7 5.5 1.7 0 3.1-.7 4.7-.7s3 .7 4.7.7c3 0 5.3-2.4 4.7-5.5-.8-4.2-4.8-7.7-9.4-7.7z" />
  </svg>
);

export const QuickBooking: React.FC<QuickBookingProps> = ({
  lang,
  onAddBooking,
  selectedServicePreFill = '',
  bookingTrigger = 0,
}) => {
  const t = translations[lang].quickBooking;
  const tBanner = translations[lang].about;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [petType, setPetType] = useState<string>('Chó');
  const [service, setService] = useState<string>(selectedServicePreFill || 'Khám tổng quát');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedServicePreFill) {
      setService(selectedServicePreFill);
    }
  }, [selectedServicePreFill]);

  useEffect(() => {
    if (bookingTrigger > 0) {
      nameInputRef.current?.focus();
    }
  }, [bookingTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const newBooking: Booking = {
      id: 'booking-' + Date.now(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      petType,
      service,
      date,
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
    }, 3000);
  };

  return (
    <section id="quick-booking" className="relative z-30 -mt-[64px] pb-14">
      {/* Seamless blend from Hero bottom wave (var(--bg)) into page body */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[63px] h-44 -z-10"
        style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, transparent 100%)',
        }}
      />
      <div className="shared-container relative">
        <div className="relative">
          {/* Thin concentric circle ring extending slightly outside the bar behind the pets on the far right */}
          <div
            className="hidden lg:block absolute right-[24px] xl:right-[36px] -top-6 w-[310px] h-[310px] rounded-full border pointer-events-none z-10"
            style={{ borderColor: 'rgba(244, 182, 194, 0.28)' }}
            aria-hidden="true"
          />

        {/* Rounded Horizontal Burgundy Bar */}
        <div
          className="relative rounded-[28px] sm:rounded-[32px] shadow-2xl border transition-colors duration-300"
          style={{
            background:
              'linear-gradient(115deg, #6B1F2E 0%, #581826 52%, #46121E 100%)',
            borderColor: 'rgba(244, 182, 194, 0.22)',
          }}
        >
          {/* Clipped Decorative Watermarks Inside Bar */}
          <div
            className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {/* Soft inner radial glow behind pets on the right */}
            <div
              className="absolute right-[170px] top-1/2 translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(244, 182, 194, 0.15) 0%, rgba(244, 182, 194, 0) 70%)',
              }}
            />

            {/* Inner circle ring behind pets on the far right */}
            <div
              className="hidden lg:block absolute right-[24px] xl:right-[36px] -top-6 w-[310px] h-[310px] rounded-full border"
              style={{ borderColor: 'rgba(255, 244, 232, 0.14)' }}
            />

            {/* Subtle Heart Upper Left */}
            <Heart
              className="hidden lg:block absolute left-[4%] top-[14%] w-7 h-7 -rotate-12"
              style={{ color: 'rgba(255, 244, 232, 0.1)' }}
              strokeWidth={2}
            />

            {/* Subtle Heart Right of Cat */}
            <Heart
              className="hidden sm:block absolute right-[2.5%] top-[16%] w-6 h-6 rotate-12"
              style={{ color: 'rgba(255, 244, 232, 0.14)' }}
              strokeWidth={2.2}
            />

            {/* Subtle Paw Print Bottom-Left */}
            <div
              className="absolute left-[2.5%] bottom-[8%] -rotate-12"
              style={{ color: 'rgba(255, 244, 232, 0.1)' }}
            >
              <PawWatermark className="w-8 h-8" />
            </div>

            {/* Subtle Paw Print Near Right-Bottom */}
            <div
              className="hidden lg:block absolute right-[25%] bottom-[8%] rotate-12"
              style={{ color: 'rgba(255, 244, 232, 0.1)' }}
            >
              <PawWatermark className="w-7 h-7" />
            </div>
          </div>

          {/* 2-Column Layout: Left Booking Form + Far-Right Pop-out Pets */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Column: Inline Quick Booking Form */}
            <div className="lg:col-span-8 order-2 lg:order-1 px-6 sm:px-8 lg:pl-9 xl:pl-10 lg:pr-4 pt-2 pb-7 lg:py-7">
              {/* Form Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: 'rgba(255, 244, 232, 0.14)',
                      color: '#F4B6C2',
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className="font-display text-lg sm:text-xl font-extrabold leading-tight"
                      style={{ color: '#FFF4E8' }}
                    >
                      {t.title}
                    </h3>
                    <p
                      className="text-xs hidden sm:block"
                      style={{ color: 'rgba(255, 244, 232, 0.78)' }}
                    >
                      {tBanner.bannerHeadlineLine1} {tBanner.bannerHeadlineLine2}
                    </p>
                  </div>
                </div>

                {submitted && (
                  <div
                    className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: '#FFF4E8',
                      color: '#6B1F2E',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#E97777' }} />
                    <span>{t.successToast}</span>
                  </div>
                )}
              </div>

              {/* Booking Form Inputs (3 columns x 2 rows on Desktop) */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3.5 gap-y-3 items-end">
                  {/* 1. Full Name */}
                  <div className="space-y-1">
                    <label
                      className="text-[12px] font-semibold flex items-center gap-1.5"
                      style={{ color: 'rgba(255, 244, 232, 0.9)' }}
                    >
                      <User className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4B6C2' }} />
                      <span>{t.fullName}</span> <span style={{ color: '#F4B6C2' }}>*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full h-[44px] px-3.5 rounded-[12px] text-sm font-medium outline-none transition-all border focus:ring-2 focus:ring-[#F4B6C2]"
                      style={{
                        backgroundColor: '#FFF8F2',
                        color: '#3D1A22',
                        borderColor: 'rgba(255, 244, 232, 0.3)',
                      }}
                    />
                  </div>

                  {/* 2. Phone */}
                  <div className="space-y-1">
                    <label
                      className="text-[12px] font-semibold flex items-center gap-1.5"
                      style={{ color: 'rgba(255, 244, 232, 0.9)' }}
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4B6C2' }} />
                      <span>{t.phone}</span> <span style={{ color: '#F4B6C2' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full h-[44px] px-3.5 rounded-[12px] text-sm font-medium outline-none transition-all border focus:ring-2 focus:ring-[#F4B6C2]"
                      style={{
                        backgroundColor: '#FFF8F2',
                        color: '#3D1A22',
                        borderColor: 'rgba(255, 244, 232, 0.3)',
                      }}
                    />
                  </div>

                  {/* 3. Pet Type */}
                  <div className="space-y-1">
                    <label
                      className="text-[12px] font-semibold flex items-center gap-1.5"
                      style={{ color: 'rgba(255, 244, 232, 0.9)' }}
                    >
                      <Dog className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4B6C2' }} />
                      <span>{t.petType}</span>
                    </label>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[12px] text-sm font-medium outline-none transition-all border focus:ring-2 focus:ring-[#F4B6C2] cursor-pointer"
                      style={{
                        backgroundColor: '#FFF8F2',
                        color: '#3D1A22',
                        borderColor: 'rgba(255, 244, 232, 0.3)',
                      }}
                    >
                      <option value="Chó">{t.dog}</option>
                      <option value="Mèo">{t.cat}</option>
                      <option value="Thỏ">{t.rabbit}</option>
                      <option value="Hamster">{t.hamster}</option>
                      <option value="Chim">{t.bird}</option>
                      <option value="Bò sát">{t.reptile}</option>
                      <option value="Khác">{t.other}</option>
                    </select>
                  </div>

                  {/* 4. Service */}
                  <div className="space-y-1">
                    <label
                      className="text-[12px] font-semibold flex items-center gap-1.5"
                      style={{ color: 'rgba(255, 244, 232, 0.9)' }}
                    >
                      <Stethoscope className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4B6C2' }} />
                      <span>{t.service}</span>
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[12px] text-sm font-medium outline-none transition-all border focus:ring-2 focus:ring-[#F4B6C2] cursor-pointer"
                      style={{
                        backgroundColor: '#FFF8F2',
                        color: '#3D1A22',
                        borderColor: 'rgba(255, 244, 232, 0.3)',
                      }}
                    >
                      <option value="Khám tổng quát">{t.generalCheckup}</option>
                      <option value="Spa & tắm">{t.spa}</option>
                      <option value="Tiêm phòng">{t.vaccine}</option>
                      <option value="Huấn luyện">{t.training}</option>
                    </select>
                  </div>

                  {/* 5. Date */}
                  <div className="space-y-1">
                    <label
                      className="text-[12px] font-semibold flex items-center gap-1.5"
                      style={{ color: 'rgba(255, 244, 232, 0.9)' }}
                    >
                      <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: '#F4B6C2' }} />
                      <span>{t.date}</span>
                    </label>
                    <input
                      type="date"
                      required
                      lang={lang === 'vi' ? 'vi-VN' : 'en-US'}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[12px] text-sm font-medium outline-none transition-all border focus:ring-2 focus:ring-[#F4B6C2]"
                      style={{
                        backgroundColor: '#FFF8F2',
                        color: '#3D1A22',
                        borderColor: 'rgba(255, 244, 232, 0.3)',
                      }}
                    />
                  </div>

                  {/* 6. Submit Button */}
                  <div className="pt-1 sm:pt-0">
                    <button
                      type="submit"
                      className="w-full h-[44px] px-6 rounded-[12px] font-extrabold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#6B1F2E',
                      }}
                    >
                      <span>{t.btnSubmit}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Far Right Column: Pop-out Golden Retriever & British Shorthair Cat */}
            <div className="lg:col-span-4 order-1 lg:order-2 relative flex justify-center lg:justify-end items-end h-[220px] sm:h-[250px] lg:h-[268px] overflow-visible px-4 lg:pr-5 xl:pr-7">
              <img
                src="/assets/aistudio/about_dog_cat_duo.png"
                alt="Animora Golden Retriever and British Shorthair Cat"
                className="w-[260px] sm:w-[300px] lg:w-[345px] xl:w-[368px] max-w-none h-auto object-contain select-none pointer-events-none lg:absolute lg:-top-[62px] xl:-top-[70px] lg:right-[10px] xl:right-[18px] drop-shadow-[0_14px_24px_rgba(20,5,10,0.42)]"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
