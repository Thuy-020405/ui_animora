import React from 'react';
import { Language } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutUsProps {
  lang: Language;
  onOpenDetail?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ lang, onOpenDetail }) => {
  const isVi = lang === 'vi';

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span
                className="inline-block uppercase font-bold tracking-widest text-xs sm:text-sm"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--primary)',
                }}
              >
                {isVi ? 'VỀ CHÚNG TÔI' : 'ABOUT US'}
              </span>

              <h2
                className="font-heading font-extrabold leading-[1.15] tracking-tight"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  color: 'var(--primary)',
                }}
              >
                {isVi ? 'Câu chuyện của Animora' : "The Animora Story"}
              </h2>
            </div>

            <p
              className="text-base sm:text-lg leading-relaxed font-normal"
              style={{ color: 'var(--text)' }}
            >
              {isVi
                ? 'Khởi nguồn từ niềm tin sâu sắc rằng mỗi người bạn nhỏ — dù là chú cún trung thành, bé mèo kiêu kỳ, bạn thỏ hiền lành, chú hamster tí hon hay cánh chim líu lo — đều xứng đáng được yêu thương, tôn trọng và chăm sóc bằng sự thấu hiểu y khoa tận tâm nhất.'
                : 'Founded on the deep belief that every animal companion — whether a loyal canine, gentle feline, rabbit, tiny hamster, or bird — deserves boundless love, respect, and compassionate veterinary excellence.'}
            </p>

            <div className="space-y-2.5 pt-1">
              {[
                isVi
                  ? 'Quy trình tiếp xúc nhẹ nhàng (Fear-Free) giảm thiểu tối đa căng thẳng'
                  : 'Certified Fear-Free protocols ensuring calm, stress-free clinical visits',
                isVi
                  ? 'Chuyên khoa chăm sóc đa loài riêng biệt: Chó, Mèo, Thỏ, Hamster, Chim'
                  : 'Dedicated multi-species wings for Dogs, Cats, Rabbits, Hamsters & Birds',
                isVi
                  ? 'Trạm cứu trợ & nhà chung nhận nuôi nhân đạo phi lợi nhuận'
                  : 'Non-profit animal sanctuary and ethical companion adoption network',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--coral)' }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {onOpenDetail && (
              <div className="pt-3">
                <button
                  type="button"
                  data-testid="home-cta-about"
                  onClick={onOpenDetail}
                  className="btn-primary px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
                >
                  <span>
                    {isVi
                      ? 'Khám phá câu chuyện & Giá trị cốt lõi'
                      : 'Explore Full Story & Core Values'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: User-provided Founding Pets Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px]">
              <img
                src="/assets/aistudio/about_hero_pets.png"
                alt="Animora - Loving companions"
                className="w-full h-auto object-contain select-none drop-shadow-[0_16px_32px_rgba(107,31,46,0.12)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
