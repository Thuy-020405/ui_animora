import React, { useState } from 'react';
import {
  Heart,
  HeartHandshake,
  ShieldCheck,
  Leaf,
  Sparkles,
  Home as HomeIcon,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Activity,
  PawPrint,
  Droplets,
  Wind,
  Sun,
  Shield,
} from 'lucide-react';
import { Language, PageId } from '../../types';
import { CONTACT_INFO } from '../../config/contact';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onBookWithSpecialist?: (serviceName: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onNavigate,
}) => {
  const isVi = lang === 'vi';
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-exam');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // 1. Species Care Approaches
  const SPECIES_APPROACHES = [
    {
      id: 'dog',
      speciesVi: 'Chó cảnh',
      speciesEn: 'Canine Care',
      focusVi: 'Thể chất, Dinh dưỡng & Vận động',
      focusEn: 'Physicality, Nutrition & Active Play',
      badgeVi: 'Năng động & Gắn kết',
      badgeEn: 'Energetic & Social',
      image: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
      icon: PawPrint,
      pointsVi: [
        'Khẩu phần giàu protein sạch, cân đối canxi & glucosamine bảo vệ sụn khớp theo từng giai đoạn phát triển.',
        'Thời gian vận động ngoài trời tối thiểu 45–60 phút mỗi ngày giúp giải phóng năng lượng và giữ tâm lý vui tươi.',
        'Chăm sóc nha khoa phòng ngừa cao răng, khám cơ xương khớp định kỳ cho các giống chó hiếu động.',
      ],
      pointsEn: [
        'Clean protein-rich nutrition balanced with glucosamine to protect joints across all life stages.',
        'At least 45–60 minutes of daily outdoor enrichment to relieve stress and sustain vitality.',
        'Preventive dental prophylaxis and routine musculoskeletal screenings for active breeds.',
      ],
    },
    {
      id: 'cat',
      speciesVi: 'Mèo cảnh',
      speciesEn: 'Feline Care',
      focusVi: 'Sức khỏe Thận, Vệ sinh & Môi trường sống',
      focusEn: 'Renal Wellness, Cleanliness & Low Stress',
      badgeVi: 'Tinh tế & Tĩnh lặng',
      badgeEn: 'Gentle & Tranquil',
      image: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
      icon: Droplets,
      pointsVi: [
        'Theo dõi sát chức năng thận và đường tiết niệu; khuyến khích uống nước qua hệ thống thác nước lọc ion luân phiên.',
        'Thiết kế không gian thẳng đứng (cat tree, bậc leo tường) tạo vùng an toàn riêng, hạn chế tối đa căng thẳng.',
        'Sử dụng cát vệ sinh hữu cơ tự nhiên không bụi nhằm ngăn ngừa bệnh viêm hô hấp và kích ứng da mẫn cảm.',
      ],
      pointsEn: [
        'Close renal and urinary monitoring with running filtered fountains to encourage optimal hydration.',
        'Vertical enrichment with climbing perches to provide private safe zones that reduce feline stress.',
        'Dust-free natural organic litter to prevent chronic respiratory issues and sensitive paw irritation.',
      ],
    },
    {
      id: 'rabbit',
      speciesVi: 'Thỏ cảnh',
      speciesEn: 'Rabbit Care',
      focusVi: 'Tiêu hóa Dạ dày đơn, Dinh dưỡng Chất xơ & Yên tĩnh',
      focusEn: 'Gut Motility, High Fiber & Calm Surroundings',
      badgeVi: 'Thảo mộc & Nhạy cảm',
      badgeEn: 'Herbivorous & Fragile',
      image: '/assets/aistudio/shop_promo_bunny.jpg',
      icon: Leaf,
      pointsVi: [
        'Khẩu phần 80% cỏ khô Timothy liên tục nhằm duy trì nhu động ruột và mài mòn răng cửa tự nhiên.',
        'Quy trình vệ sinh khô dịu nhẹ, tuyệt đối không tắm nước lạnh để bảo vệ lớp dầu tự nhiên và chống hạ thân nhiệt.',
        'Phòng khám cách âm hoàn toàn, bổ sung men vi sinh chuyên biệt phòng ngừa hội chứng liệt ruột (GI Stasis).',
      ],
      pointsEn: [
        '80% continuous Timothy hay diet to support delicate cecal fermentation and natural tooth wear.',
        'Gentle dry-clean grooming routines; strictly avoid water immersion to prevent shock and hypothermia.',
        'Sound-insulated exam suites with exotic probiotics to prevent life-threatening gastrointestinal stasis.',
      ],
    },
    {
      id: 'hamster',
      speciesVi: 'Hamster & Chuột lang',
      speciesEn: 'Hamsters & Guinea Pigs',
      focusVi: 'Chu kỳ Sinh học, Không gian Sống & Vận động',
      focusEn: 'Circadian Cycles, Habitat & Spinal Safety',
      badgeVi: 'Tí hon & Nhộn nhịp',
      badgeEn: 'Tiny & Nocturnal',
      image: '/assets/aistudio/shop_promo_hamster_centered.jpg',
      icon: Activity,
      pointsVi: [
        'Tôn trọng tuyệt đối tập tính hoạt động ban đêm, tránh đánh thức đột ngột làm rối loạn nhịp tim bé.',
        'Trang bị bánh xe chạy đường kính chuẩn (21–28cm) với mặt phẳng liền, bảo vệ cột sống không bị uốn cong.',
        'Lót chuồng giấy nén không bụi, không hương liệu nhân tạo kết hợp cát tắm sa mạc tự nhiên diệt khuẩn.',
      ],
      pointsEn: [
        'Full respect for nocturnal biological rhythms without disruptive daytime handling.',
        'Spacious, continuous-surface running wheels (21–28cm) ensuring zero spinal curvature.',
        'Dust-free fragrance-free paper bedding paired with natural desert bathing sand.',
      ],
    },
    {
      id: 'bird',
      speciesVi: 'Chim cảnh & Vẹt',
      speciesEn: 'Avian & Parrots',
      focusVi: 'Hô hấp Túi khí, Dinh dưỡng Đa dạng & Bay lượn',
      focusEn: 'Air-Sac Respiratory, Diverse Diet & Safe Flight',
      badgeVi: 'Thông minh & Tự do',
      badgeEn: 'Intelligent & Free',
      image: '/assets/aistudio/shop_promo_parrot.jpg',
      icon: Wind,
      pointsVi: [
        'Chế độ hạt hữu cơ phối trộn ngũ cốc nảy mầm và rau củ tươi giàu Vitamin A tăng cường đề kháng.',
        'Bảo vệ hệ hô hấp túi khí siêu nhạy cảm: tuyệt đối không khói bếp, khói thuốc lá hay hơi nóng chảo chống dính PTFE.',
        'Tắm nắng sớm 15 phút mỗi ngày kích hoạt hấp thụ Vitamin D3 tự nhiên, kèm đồ chơi gỗ mộc mài mỏ.',
      ],
      pointsEn: [
        'Organic seed blends enriched with sprouted grains and fresh vitamin-A rich vegetables.',
        'Strict respiratory safety protocol: zero exposure to kitchen smoke, aerosol sprays, or PTFE fumes.',
        '15 minutes of gentle morning sunshine for natural Vitamin D3 synthesis plus untreated wooden toys.',
      ],
    },
  ];

  // 2. Timeline Milestones
  const MILESTONES = [
    {
      year: '2012 - 2015',
      titleVi: 'Khởi nguồn',
      titleEn: 'The Inception',
      subtitleVi: 'Nền móng của sự thấu hiểu',
      subtitleEn: 'Foundation of Empathy',
      descVi:
        'Thành lập từ một phòng khám thú y ấm áp tại Sài Gòn, tiên phong chuẩn hóa quy trình khám nhẹ nhàng (Fear-Free) giúp thú cưng không còn nỗi ám ảnh khi đến gặp bác sĩ.',
      descEn:
        'Started as a warm veterinary clinic in Saigon, pioneering Fear-Free clinical protocols so pets feel comforted rather than frightened during medical exams.',
      icon: HeartHandshake,
    },
    {
      year: '2016 - 2020',
      titleVi: 'Phát triển',
      titleEn: 'Multi-Species Expansion',
      subtitleVi: 'Mở rộng hệ sinh thái đa loài',
      subtitleEn: 'Dedicated Care for Every Species',
      descVi:
        'Thành lập các chuyên khoa riêng cho Thỏ, Hamster và Chim cảnh; đồng thời ra mắt tổ hợp Spa Thảo mộc tĩnh âm cùng khu lưu trú vi khí hậu chuẩn y tế.',
      descEn:
        'Established dedicated exotic wings for Rabbits, Hamsters, and Birds, alongside a whisper-quiet botanical spa and micro-climate suites.',
      icon: Sparkles,
    },
    {
      year: '2021 - 2024',
      titleVi: 'Kết nối',
      titleEn: 'Community & Sanctuary',
      subtitleVi: 'Vì cộng đồng & Mái ấm mới',
      subtitleEn: 'Sanctuary & Lifelong Families',
      descVi:
        'Khởi xướng Quỹ cứu trợ & Nhà chung nhận nuôi phi lợi nhuận Animora Sanctuary, đồng hành cùng hơn 1.640 gia đình và kết nối thành công 480+ bé tìm thấy gia đình yêu thương.',
      descEn:
        'Launched the non-profit Animora Sanctuary, partnering with 1,640+ families and helping 480+ rescued companions find their forever loving homes.',
      icon: HomeIcon,
    },
    {
      year: '2025 & Hướng tới',
      titleVi: 'Tương lai',
      titleEn: 'The Sustainable Future',
      subtitleVi: 'Hệ sinh thái số & Bền vững',
      subtitleEn: 'Digital Wellness & Lifelong Welfare',
      descVi:
        'Hoàn thiện Sổ sức khỏe số cá nhân hóa, chuỗi cung ứng dinh dưỡng hữu cơ và lan tỏa lối sống trách nhiệm, văn minh vì phúc lợi trọn đời của thú cưng tại Việt Nam.',
      descEn:
        'Pioneering personalized digital health records, certified organic nutrition, and advocating progressive welfare standards across Vietnam.',
      icon: ShieldCheck,
    },
  ];

  // 3. Core Values
  const CORE_VALUES = [
    {
      icon: Heart,
      titleVi: 'TẬN TÂM',
      titleEn: 'DEVOTION',
      subVi: 'Chăm sóc bằng trọn vẹn tình thương',
      subEn: 'Care Rooted in Pure Empathy',
      descVi:
        'Mỗi bé thú cưng đều được nâng niu như một thành viên trong gia đình. Bác sĩ và chuyên viên tại Animora luôn giới hạn số lượng ca khám mỗi ngày để dành trọn thời gian lắng nghe, vỗ về và kiên nhẫn thấu hiểu từng cử chỉ nhỏ.',
      descEn:
        'Every pet is treated as cherished family. We consciously cap daily consultations so our veterinarians have ample unhurried time to listen, comfort, and understand.',
      badgeVi: '100% Khám êm dịu, không áp lực',
      badgeEn: '100% Fear-Free, gentle handling',
    },
    {
      icon: ShieldCheck,
      titleVi: 'MINH BẠCH',
      titleEn: 'TRANSPARENCY',
      subVi: 'Rõ ràng trong từng quyết định y khoa',
      subEn: 'Clarity in Every Clinical Step',
      descVi:
        'Mọi chi phí, phác đồ điều trị và kết quả chẩn đoán đều được giải thích cặn kẽ và cập nhật trực tiếp lên Sổ sức khỏe số. Ba mẹ luôn là người đồng hành chủ động, thấu suốt mọi lộ trình chăm sóc của con.',
      descEn:
        'Itemized estimates, detailed diagnostic explanations, and real-time updates to digital pet records. Pet parents always maintain full visibility before any procedure begins.',
      badgeVi: 'Báo giá trước · Không phụ phí ẩn',
      badgeEn: 'Upfront estimates · Zero hidden fees',
    },
    {
      icon: Leaf,
      titleVi: 'BỀN VỮNG',
      titleEn: 'SUSTAINABILITY',
      subVi: 'Vì môi trường & Phúc lợi động vật',
      subEn: 'For the Planet & Animal Welfare',
      descVi:
        'Ưu tiên 100% sữa tắm thảo mộc thuần chay tự nhiên phân hủy sinh học, thực phẩm dinh dưỡng hữu cơ và trích 5% lợi nhuận thường niên đóng góp vào Quỹ cứu trợ & nhận nuôi thú cưng vô gia cư.',
      descEn:
        '100% biodegradable vegan botanical care, certified organic pet food, and 5% of proceeds continuously dedicated to rescuing and rehoming abandoned pets.',
      badgeVi: 'Mỹ phẩm thuần chay · Quỹ cứu trợ 5%',
      badgeEn: 'Vegan botanical care · 5% Rescue fund',
    },
  ];

  // 4. Numbers / Stats
  const STATS = [
    {
      val: '14+',
      labelVi: 'Năm đồng hành tận tụy',
      labelEn: 'Years of Dedicated Care',
      subVi: 'Từ năm 2012 đến nay',
      subEn: 'Since 2012',
    },
    {
      val: '1.640+',
      labelVi: 'Bé được chăm sóc mỗi năm',
      labelEn: 'Pets Cared for Annually',
      subVi: 'Được ba mẹ trao trọn niềm tin',
      subEn: 'Trusted by devoted pet parents',
    },
    {
      val: '480+',
      labelVi: 'Bé tìm thấy mái ấm trọn đời',
      labelEn: 'Rescued Pets Adopted',
      subVi: 'Qua Trạm cứu trợ Animora',
      subEn: 'Via Animora Rescue Sanctuary',
    },
    {
      val: '6',
      labelVi: 'Chuyên khoa chăm sóc đa loài',
      labelEn: 'Multi-Species Care Wings',
      subVi: 'Chó, Mèo, Thỏ, Hamster, Chim...',
      subEn: 'Dogs, Cats, Rabbits, Exotics...',
    },
  ];

  // 5. Facilities
  const CLINIC_ZONES = [
    {
      id: 'zone-exam',
      titleVi: 'Phòng khám Fear-Free Đa loài Cách âm',
      titleEn: 'Sound-Insulated Fear-Free Exam Suites',
      descVi:
        'Lối di chuyển và sảnh chờ tách biệt hoàn toàn giữa Chó, Mèo và Thú nhỏ. Mỗi phòng khám được trang bị hệ thống khuếch tán pheromone tự nhiên làm dịu thần kinh và bàn khám sưởi ấm 37.5°C chống lạnh bụng.',
      descEn:
        'Dedicated species-separated pathways so cats, rabbits, and small pets never cross paths with energetic dogs. Includes soothing natural pheromones and temperature-regulated exam surfaces.',
      image: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
      highlightsVi: [
        'Lối đi & sảnh chờ phân luồng Chó - Mèo - Thú nhỏ',
        'Bàn khám sưởi ấm 37.5°C êm ái chống giật mình',
        'Khuếch tán pheromone thảo mộc làm dịu thần kinh',
      ],
      highlightsEn: [
        'Species-separated lounges and private corridors',
        'Warm 37.5°C padded tables to prevent sudden chills',
        'Natural botanical calming pheromones diffused 24/7',
      ],
    },
    {
      id: 'zone-spa',
      titleVi: 'Tổ hợp Thủy trị liệu & Spa Thảo mộc Tĩnh âm',
      titleEn: 'Whisper-Quiet Hydrotherapy & Botanical Spa',
      descVi:
        'Sử dụng bồn sục vi bọt ozone loại bỏ vi khuẩn và tế bào chết mà không gây đau rát da. Kết hợp sữa tắm yến mạch hữu cơ và hệ thống buồng sấy tĩnh âm dưới 45dB, an toàn tuyệt đối cho thính giác nhạy cảm của các bé.',
      descEn:
        'Micro-bubble ozone hydrotherapy gently lifts dirt without friction, accompanied by certified organic oatmeal botanical shampoos and sub-45dB whisper-quiet drying suites.',
      image: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
      highlightsVi: [
        'Nước lọc RO ấm chuẩn nhiệt độ sinh học',
        'Tinh chất thảo mộc hữu cơ phân hủy sinh học',
        'Máy sấy lồng tĩnh âm êm dịu dưới 45dB',
      ],
      highlightsEn: [
        'Pure RO water calibrated to precise body temperature',
        '100% biodegradable organic herbal essences',
        'Whisper-quiet drying lounge running below 45dB',
      ],
    },
    {
      id: 'zone-boarding',
      titleVi: 'Khách sạn Lưu trú Sinh thái & Sân vận động',
      titleEn: 'Enrichment Boarding Suites & Play Garden',
      descVi:
        'Mỗi phòng lưu trú là một không gian vi khí hậu độc lập có lọc khí tươi HEPA và kiểm soát độ ẩm. Hàng ngày các bé được chạy nhảy tại sân cỏ tự nhiên có mái che và ba mẹ có thể ngắm con 24/7 qua camera Full HD.',
      descEn:
        'Private climate-controlled suites equipped with medical HEPA fresh-air exchange, daily outdoor enrichment in our sheltered grass lawn, and 24/7 HD camera access for pet parents.',
      image: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
      highlightsVi: [
        'Camera Full HD truyền trực tiếp vào điện thoại',
        'Khí tươi HEPA vô trùng lọc 12 lần/giờ',
        'Vườn cỏ tự nhiên tắm nắng và vận động',
      ],
      highlightsEn: [
        '24/7 live HD livestream directly to your smartphone',
        'HEPA fresh air exchange 12 times per hour',
        'Natural grass enrichment garden for morning sunshine',
      ],
    },
    {
      id: 'zone-sterile',
      titleVi: 'Khu Chăm sóc Chuyên sâu & Phòng mổ Vô trùng',
      titleEn: 'Sterile Surgical Suites & Intensive Care',
      descVi:
        'Được thiết kế theo tiêu chuẩn phòng mổ áp lực dương của thú y quốc tế. Trang bị máy gây mê hô hấp Isoflurane chuyên dụng cho cả thú nhỏ sơ sinh, máy siêu âm màu 4D và hệ thống tiệt trùng đèn tia cực tím UV-C.',
      descEn:
        'Engineered to international positive-pressure veterinary surgical standards, featuring specialized Isoflurane anesthesia for fragile exotics and continuous UV-C air sterilization.',
      image: '/src/assets/images/adopt_french_bulldog_1793177483032.jpg',
      highlightsVi: [
        'Phòng mổ áp lực dương đạt chuẩn y khoa',
        'Gây mê hô hấp an toàn cho cả thú nhỏ dưới 500g',
        'Xét nghiệm sinh hóa & huyết học nhanh trong 15 phút',
      ],
      highlightsEn: [
        'Hospital-grade positive pressure operating theater',
        'Safe Isoflurane vaporizers calibrated for tiny exotics',
        'In-house diagnostic blood lab results within 15 mins',
      ],
    },
  ];

  const activeZone =
    CLINIC_ZONES.find((z) => z.id === activeZoneId) || CLINIC_ZONES[0];

  // 6. FAQs
  const FAQS = [
    {
      qVi: 'Animora tiếp nhận thăm khám và chăm sóc những loài thú cưng nào?',
      qEn: 'Which species of pets does Animora provide care and treatment for?',
      aVi: 'Animora xây dựng chuyên khoa riêng biệt cho Chó cảnh, Mèo cảnh, Thỏ cảnh (Holland Lop, Mini Rex...), Hamster, Chuột lang (Guinea Pig), Chim cảnh & Vẹt, cũng như Rùa và các loài thú nhỏ đặc biệt.',
      aEn: 'Animora features dedicated care departments for Dogs, Cats, Rabbits, Hamsters, Guinea Pigs, Companion Birds & Parrots, as well as turtles and small exotics.',
    },
    {
      qVi: 'Làm thế nào để các bé thỏ, mèo hay chim không bị hoảng sợ khi gặp chó lớn?',
      qEn: 'How do you keep delicate pets calm and safe from larger dogs?',
      aVi: 'Chúng tôi thiết kế luồng di chuyển và sảnh chờ tách biệt hoàn toàn giữa các loài. Khu vực dành cho mèo và thú nhỏ luôn được cách âm, sử dụng ánh sáng vàng dịu và khuếch tán tinh dầu pheromone làm dịu tâm lý.',
      aEn: 'We engineered completely separate intake pathways and soundproofed lounges. Exotic and feline suites utilize warm ambient lighting and continuous soothing pheromones.',
    },
    {
      qVi: 'Quy trình nhận nuôi tại Animora Sanctuary diễn ra như thế nào?',
      qEn: 'What is the process to adopt a companion from Animora Sanctuary?',
      aVi: 'Tất cả các bé trước khi tìm nhà mới đều được khám sức khỏe tổng quát, tiêm phòng và tẩy giun đầy đủ. Quá trình nhận nuôi hoàn toàn phi lợi nhuận; ba mẹ chỉ cần chia sẻ điều kiện sống và cam kết đồng hành yêu thương.',
      aEn: 'Every rescued pet is fully health-checked, vaccinated, and microchipped. Adoption is strictly non-profit; applicants simply complete a home-readiness consultation and love pledge.',
    },
  ];

  return (
    <div
      data-testid="page-about"
      className="min-h-screen pt-24 pb-20 space-y-20 sm:space-y-24"
    >
      {/* ========================================================
          SECTION 1 – BRAND INTRODUCTION
          Clean 2-Column: Left Text (Eyebrow, Title, Mission, CTA),
          Right Cut-Out Pets with Soft Floor Shadow & Soft Pink Shape
          ======================================================== */}
      <section
        id="about-intro"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span
                data-testid="about-page-eyebrow"
                className="inline-block uppercase font-bold tracking-widest text-xs sm:text-sm"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--primary)',
                }}
              >
                {isVi ? 'VỀ CHÚNG TÔI' : 'ABOUT US'}
              </span>

              <h1
                data-testid="about-page-title"
                className="font-heading font-extrabold leading-[1.15] tracking-tight"
                style={{
                  fontSize: 'clamp(32px, 4vw, 50px)',
                  color: 'var(--primary)',
                }}
              >
                {isVi ? 'Câu chuyện của Animora' : "The Animora Story"}
              </h1>
            </div>

            <p
              data-testid="about-page-subtitle"
              className="text-base sm:text-lg lg:text-[18px] leading-relaxed font-normal"
              style={{ color: 'var(--text)' }}
            >
              {isVi
                ? 'Khởi nguồn từ niềm tin sâu sắc rằng mỗi người bạn nhỏ — dù là chú cún trung thành, bé mèo kiêu kỳ, bạn thỏ hiền lành, chú hamster tí hon hay cánh chim líu lo — đều xứng đáng được yêu thương, tôn trọng và chăm sóc bằng sự thấu hiểu y khoa tận tâm nhất.'
                : 'Founded on the deep belief that every animal companion — whether a loyal canine, independent feline, gentle rabbit, tiny hamster, or cheerful bird — deserves boundless love, respect, and compassionate veterinary excellence.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-testid="about-cta-services"
                onClick={() => onNavigate('services')}
                className="btn-primary px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
              >
                <span>{isVi ? 'Khám phá dịch vụ' : 'Explore Services'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('adopt')}
                className="px-6 py-3.5 rounded-full text-sm font-bold border-2 transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                }}
              >
                {isVi ? 'Ghé thăm trạm nhận nuôi' : 'Visit Sanctuary'}
              </button>
            </div>
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
      </section>

      {/* ========================================================
          SECTION 2 – OUR STORY
          Emotional narrative: Why multi-species, inspiration & vision
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[32px] border-2 p-8 sm:p-12 lg:p-16 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Subtle brand tint glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: '#F4B6C2' }}
          />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span
              className="inline-block uppercase font-bold tracking-widest text-xs"
              style={{ color: 'var(--coral)' }}
            >
              {isVi ? 'NGUỒN CẢM HỨNG' : 'OUR INSPIRATION'}
            </span>

            <h2
              className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-[1.2]"
              style={{ color: 'var(--primary)' }}
            >
              {isVi
                ? 'Hành trình ra đời từ tình yêu vô điều kiện'
                : 'Born from Unconditional Love & Pure Compassion'}
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
              <p>
                {isVi
                  ? 'Năm 2012, chúng tôi nhận thấy các phòng khám thú y truyền thống thường mang lại cảm giác xa lạ, nồng nặc mùi thuốc khử trùng và tiếng ồn lạ khiến thú cưng run rẩy hoảng loạn. Animora ra đời với một khát khao giản dị: kiến tạo một chốn bình yên, nơi các con được vuốt ve, an ủi bằng sự ân cần và quy trình y khoa không sợ hãi (Fear-Free).'
                  : 'In 2012, we noticed how clinical, intimidating, and stressful traditional vet clinics felt for pets. Animora was born from a heartfelt purpose: to create a calming sanctuary where fear is replaced by gentle hands, patient voices, and certified Fear-Free medical care.'}
              </p>

              {/* Highlight Quote Box */}
              <div
                className="my-6 p-6 sm:p-7 rounded-2xl border-l-4 space-y-2"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--coral)',
                }}
              >
                <p
                  className="font-heading text-lg sm:text-xl font-bold italic leading-snug"
                  style={{ color: 'var(--primary)' }}
                >
                  {isVi
                    ? '“Tại sao lại là đa loài? Bởi vì tình yêu với sinh linh không phân biệt kích thước hay chủng loài.”'
                    : '“Why multi-species? Because love and reverence for life know no boundary of size or species.”'}
                </p>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {isVi
                    ? 'Một chú thỏ bị đầy hơi chướng bụng, một bé hamster cần chiếc bánh xe chạy êm bảo vệ cột sống, hay một chú chim vẹt cần không khí tinh khiết... tất cả đều xứng đáng nhận được sự thấu hiểu chuyên sâu như những chú chó hay mèo.'
                    : 'A rabbit suffering digestive stasis, a hamster needing a spine-safe silent running wheel, or a bird needing clean air... each deserves specialized, tailored veterinary understanding.'}
                </p>
              </div>

              <p>
                {isVi
                  ? 'Định hướng tương lai của Animora là xây dựng hệ sinh thái chăm sóc thú cưng toàn diện và bền vững: kết hợp y học dự phòng, liệu pháp spa thảo mộc tĩnh âm, trạm nhận nuôi nhân đạo và nguồn dinh dưỡng hữu cơ an lành.'
                  : 'Looking ahead, Animora is building a sustainable, holistic pet care ecosystem: integrating preventive medicine, whisper-quiet herbal spa therapies, ethical adoption sanctuaries, and certified organic nourishment.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 – OUR JOURNEY (Timeline)
          Horizontal on desktop, vertical on mobile (4 milestones)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span
            className="inline-block uppercase font-bold tracking-widest text-xs"
            style={{ color: 'var(--coral)' }}
          >
            {isVi ? 'CỘT MỐC PHÁT TRIỂN' : 'OUR JOURNEY'}
          </span>
          <h2
            className="font-heading font-extrabold text-3xl sm:text-4xl"
            style={{ color: 'var(--primary)' }}
          >
            {isVi ? 'Hành trình đồng hành & trưởng thành' : 'A Journey of Care & Growth'}
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {isVi
              ? 'Từng bước chuyển mình từ một phòng khám nhỏ trở thành hệ sinh thái chăm sóc đa loài đáng tin cậy.'
              : 'Evolving from a gentle neighborhood clinic into a trusted, multi-species sanctuary.'}
          </p>
        </div>

        {/* Timeline Grid (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative pt-6">
          {/* Desktop Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[45px] left-12 right-12 h-1 rounded-full z-0"
            style={{ backgroundColor: 'var(--border)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {MILESTONES.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="animora-card p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="space-y-4">
                    {/* Node Icon & Year */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="text-xs font-extrabold px-3 py-1.5 rounded-full border"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          borderColor: 'var(--border)',
                          color: 'var(--coral)',
                        }}
                      >
                        {m.year}
                      </span>
                    </div>

                    {/* Milestone Titles */}
                    <div className="space-y-1">
                      <h3
                        className="font-heading text-xl font-extrabold"
                        style={{ color: 'var(--primary)' }}
                      >
                        {isVi ? m.titleVi : m.titleEn}
                      </h3>
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'var(--coral)' }}
                      >
                        {isVi ? m.subtitleVi : m.subtitleEn}
                      </p>
                    </div>

                    {/* Milestone Description */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {isVi ? m.descVi : m.descEn}
                    </p>
                  </div>

                  <div
                    className="mt-5 pt-4 border-t flex items-center gap-1.5 text-xs font-bold"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--primary)',
                    }}
                  >
                    <span>{isVi ? `Giai đoạn 0${idx + 1}` : `Phase 0${idx + 1}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 – OUR APPROACH (Species-Specific Care Cards)
          5 Cards: Dog, Cat, Rabbit, Hamster, Bird
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span
            className="inline-block uppercase font-bold tracking-widest text-xs"
            style={{ color: 'var(--coral)' }}
          >
            {isVi ? 'PHƯƠNG PHÁP CHĂM SÓC ĐA LOÀI' : 'OUR APPROACH'}
          </span>
          <h2
            className="font-heading font-extrabold text-3xl sm:text-4xl"
            style={{ color: 'var(--primary)' }}
          >
            {isVi
              ? 'Thấu hiểu sinh học, tôn trọng từng cá thể'
              : 'Biological Respect for Every Companion'}
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {isVi
              ? 'Mỗi loài sở hữu cấu trúc sinh lý, tâm lý và nhịp sinh học khác biệt. Animora xây dựng phác đồ chuẩn xác cho từng nhóm bạn nhỏ.'
              : 'Each species possesses distinct physiology and psychological needs. We tailor care protocols to honor their biological essence.'}
          </p>
        </div>

        {/* 5 Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIES_APPROACHES.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.id}
                className="animora-card overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-black/5">
                    <img
                      src={spec.image}
                      alt={isVi ? spec.speciesVi : spec.speciesEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Species Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#6B1F2E] shadow-sm backdrop-blur-sm">
                        {isVi ? spec.badgeVi : spec.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FF7F6B] flex items-center justify-center text-white shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-heading text-xl font-bold drop-shadow-sm">
                          {isVi ? spec.speciesVi : spec.speciesEn}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span
                        className="text-xs font-bold uppercase tracking-wide block"
                        style={{ color: 'var(--coral)' }}
                      >
                        {isVi ? 'Trọng tâm chăm sóc' : 'Key Focus Areas'}
                      </span>
                      <p
                        className="font-bold text-sm sm:text-base"
                        style={{ color: 'var(--primary)' }}
                      >
                        {isVi ? spec.focusVi : spec.focusEn}
                      </p>
                    </div>

                    {/* 3 Structured Pillars */}
                    <ul className="space-y-2.5 pt-1">
                      {(isVi ? spec.pointsVi : spec.pointsEn).map(
                        (pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                            style={{ color: 'var(--text)' }}
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: 'var(--coral)' }}
                            />
                            <span>{pt}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                <div
                  className="px-6 pb-6 pt-2 border-t flex items-center justify-between"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="text-xs font-bold inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                    style={{ color: 'var(--primary)' }}
                  >
                    <span>{isVi ? 'Xem gói dịch vụ cho bé →' : 'Explore care plans →'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          SECTION 5 – CORE VALUES (TẬN TÂM, MINH BẠCH, BỀN VỮNG)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span
            className="inline-block uppercase font-bold tracking-widest text-xs"
            style={{ color: 'var(--coral)' }}
          >
            {isVi ? 'TRIẾT LÝ HOẠT ĐỘNG' : 'OUR CORE PILLARS'}
          </span>
          <h2
            className="font-heading font-extrabold text-3xl sm:text-4xl"
            style={{ color: 'var(--primary)' }}
          >
            {isVi
              ? '3 Trụ cột định hình tiêu chuẩn Animora'
              : '3 Core Values Guiding the Animora Standard'}
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {isVi
              ? 'Những cam kết bất biến giúp hàng nghìn gia đình gửi trọn niềm tin cho chúng tôi suốt hơn một thập kỷ qua.'
              : 'Uncompromising principles that inspire thousands of families to trust Animora with their cherished companions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="animora-card p-8 flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-6"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h3
                      className="font-heading text-2xl font-extrabold tracking-tight"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi ? val.titleVi : val.titleEn}
                    </h3>
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--coral)' }}
                    >
                      {isVi ? val.subVi : val.subEn}
                    </p>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    {isVi ? val.descVi : val.descEn}
                  </p>
                </div>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7F6B]" />
                    <span>{isVi ? val.badgeVi : val.badgeEn}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          SECTION 6 – ANIMORA IN NUMBERS
          Animated ribbon / counter badges
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[32px] p-8 sm:p-12 lg:p-14 border-2 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--primary)',
          }}
        >
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: 'var(--coral)' }}
          />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span
              className="inline-block uppercase font-bold tracking-widest text-xs"
              style={{ color: 'var(--coral)' }}
            >
              {isVi ? 'DẤU ẤN ĐỒNG HÀNH' : 'ANIMORA IN NUMBERS'}
            </span>
            <h2
              className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl"
              style={{ color: 'var(--primary)' }}
            >
              {isVi ? 'Những con số biết nói' : 'Milestones in Numbers'}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl border text-center transition-all duration-300 hover:border-[#FF7F6B] hover:shadow-md"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                }}
              >
                <span
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold block leading-none mb-2"
                  style={{ color: 'var(--coral)' }}
                >
                  {stat.val}
                </span>
                <h4
                  className="font-heading text-sm sm:text-base font-bold mb-1"
                  style={{ color: 'var(--primary)' }}
                >
                  {isVi ? stat.labelVi : stat.labelEn}
                </h4>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {isVi ? stat.subVi : stat.subEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 – OUR FACILITIES & CARE ENVIRONMENT
          Interactive zone preview with high quality photography
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span
            className="inline-block uppercase font-bold tracking-widest text-xs"
            style={{ color: 'var(--coral)' }}
          >
            {isVi ? 'CƠ SỞ VẬT CHẤT TIÊU CHUẨN' : 'OUR SANCTUARY & CLINIC'}
          </span>
          <h2
            className="font-heading font-extrabold text-3xl sm:text-4xl"
            style={{ color: 'var(--primary)' }}
          >
            {isVi
              ? 'Không gian chuyên biệt cho từng loài thú cưng'
              : 'Purpose-Built Spaces for Every Species'}
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {isVi
              ? 'Thiết kế loại bỏ tối đa áp lực tiếng ồn và mùi lạ giữa các loài, mang đến sự an tâm tuyệt đối.'
              : 'Designed to eliminate cross-species sensory stress, noise, and foreign scents.'}
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {CLINIC_ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZoneId(zone.id)}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer"
              style={{
                backgroundColor:
                  activeZone.id === zone.id ? 'var(--primary)' : 'var(--surface)',
                color:
                  activeZone.id === zone.id ? 'var(--on-primary)' : 'var(--text)',
                borderColor:
                  activeZone.id === zone.id ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {isVi ? zone.titleVi : zone.titleEn}
            </button>
          ))}
        </div>

        {/* Active Zone Display Card */}
        <div className="animora-card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div
              className="rounded-2xl overflow-hidden h-72 sm:h-96 border relative shadow-md"
              style={{ borderColor: 'var(--border)' }}
            >
              <img
                src={activeZone.image}
                alt={isVi ? activeZone.titleVi : activeZone.titleEn}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--coral)' }}
              >
                {isVi ? 'Tiêu chuẩn quốc tế' : 'International Standard'}
              </span>
              <h3
                className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ color: 'var(--primary)' }}
              >
                {isVi ? activeZone.titleVi : activeZone.titleEn}
              </h3>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text)' }}
            >
              {isVi ? activeZone.descVi : activeZone.descEn}
            </p>

            <div className="space-y-3 pt-2">
              {(isVi ? activeZone.highlightsVi : activeZone.highlightsEn).map(
                (item, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-center gap-3 text-sm font-semibold"
                    style={{ color: 'var(--text)' }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--coral)' }}
                    />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="btn-primary px-6 py-3 text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isVi ? 'Đặt lịch ghé thăm cơ sở' : 'Book a Tour / Visit'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Compact FAQs & Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h3
              className="font-heading text-2xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {isVi ? 'Giải đáp thắc mắc thường gặp' : 'Frequently Asked Questions'}
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, fIdx) => {
                const isOpen = openFaqIdx === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="animora-card overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer"
                      style={{ color: 'var(--text)' }}
                    >
                      <span>{isVi ? faq.qVi : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        style={{ color: 'var(--coral)' }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        className="px-5 pb-5 text-sm leading-relaxed border-t pt-3"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {isVi ? faq.aVi : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinic Contact Info */}
          <div
            className="lg:col-span-5 p-7 rounded-[28px] border-2 space-y-5"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="inline-block uppercase font-bold tracking-widest text-xs"
              style={{ color: 'var(--coral)' }}
            >
              {isVi ? 'THÔNG TIN LIÊN HỆ' : 'VISIT & CONTACT'}
            </span>

            <h4
              className="font-heading text-xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {isVi
                ? 'Trung tâm Thú y & Spa Đa loài Animora'
                : 'Animora Multi-Species Care Center'}
            </h4>

            <div className="space-y-3.5 text-sm" style={{ color: 'var(--text)' }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--coral)' }} />
                <span>128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-bold hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  {isVi ? 'Hotline & Cấp cứu 24/7' : '24/7 Hotline'}: {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
                <a
                  href={CONTACT_INFO.mailtoHref}
                  className="hover:underline [overflow-wrap:anywhere]"
                  style={{ color: 'var(--primary)' }}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
                <span>
                  {isVi
                    ? 'Mở cửa mỗi ngày: 08:00 – 20:30'
                    : 'Open Daily: 08:00 AM – 08:30 PM'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8 – FINAL CTA
          Inspiring message, Dual CTAs (/dat-lich & /nhan-nuoi),
          Quick links (/dich-vu, /nhan-nuoi, /cua-hang)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[36px] p-8 sm:p-14 lg:p-16 text-center space-y-8 border-2 relative overflow-hidden shadow-xl bg-[#6B1F2E] dark:bg-[#3A121D] text-[#FFF4E8] border-[#8B2B3E] dark:border-[#5E2A38]"
        >
          {/* Subtle soft pink background decorative circles */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ backgroundColor: '#F4B6C2' }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ backgroundColor: 'var(--coral)' }}
          />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span
              className="inline-block uppercase font-bold tracking-widest text-xs px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFF4E8',
              }}
            >
              {isVi ? 'ĐỒNG HÀNH CÙNG BÉ' : 'COMPANIONSHIP FOR LIFE'}
            </span>

            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight !text-[#FFF4E8]"
            >
              {isVi
                ? 'Yêu thương đúng cách, bắt đầu từ hôm nay.'
                : 'Loving Pets the Right Way, Starting Today.'}
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#FFF4E8]/90 max-w-2xl mx-auto">
              {isVi
                ? 'Cùng Animora mang đến những điều tốt đẹp hơn cho người bạn nhỏ của bạn — từ sức khỏe toàn diện, diện mạo rạng rỡ đến một cuộc sống tràn đầy niềm vui.'
                : 'Join Animora in nurturing happier, healthier lives for your animal companions — through holistic wellness, gentle care, and unconditional devotion.'}
            </p>
          </div>

          {/* Dual Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <button
              type="button"
              data-testid="about-final-cta-booking"
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-full text-base font-extrabold shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--coral)',
                color: '#FFFFFF',
              }}
            >
              {isVi ? 'Đặt lịch chăm sóc →' : 'Book Care Appointment →'}
            </button>

            <button
              type="button"
              data-testid="about-final-cta-adopt"
              onClick={() => onNavigate('adopt')}
              className="px-8 py-4 rounded-full text-base font-extrabold border-2 text-[#FFF4E8] hover:bg-white/10 transition-all cursor-pointer"
              style={{ borderColor: 'rgba(255, 255, 255, 0.6)' }}
            >
              {isVi ? 'Tìm người bạn mới →' : 'Meet Adoptable Pets →'}
            </button>
          </div>

          {/* Quick Links Row */}
          <div
            className="pt-8 mt-6 border-t flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold relative z-10"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-[#FFF4E8]/85 hover:text-white hover:underline cursor-pointer"
            >
              {isVi ? 'Dịch vụ khám & Spa' : 'Services & Spa'}
            </button>
            <span className="text-[#FFF4E8]/40">•</span>
            <button
              type="button"
              onClick={() => onNavigate('adopt')}
              className="text-[#FFF4E8]/85 hover:text-white hover:underline cursor-pointer"
            >
              {isVi ? 'Trạm Nhận nuôi Animora' : 'Adoption Sanctuary'}
            </button>
            <span className="text-[#FFF4E8]/40">•</span>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="text-[#FFF4E8]/85 hover:text-white hover:underline cursor-pointer"
            >
              {isVi ? 'Cửa hàng Dinh dưỡng' : 'Nutrition Shop'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
