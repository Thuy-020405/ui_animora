export type ServiceCategoryId = 'all' | 'vet' | 'spa' | 'training' | 'boarding';

export type ServiceIconType = 'checkup' | 'spa' | 'training' | 'boarding' | 'dental';

export interface ServiceStep {
  titleVi: string;
  titleEn: string;
  textVi: string;
  textEn: string;
}

export interface ServicePriceRow {
  weightRangeVi: string;
  weightRangeEn: string;
  price: number;
}

export interface ServiceFaqItem {
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
}

export interface ServiceEntity {
  id: 'checkup' | 'spa' | 'training' | 'boarding' | 'dental';
  slug: string;
  name: {
    vi: string;
    en: string;
  };
  category: Exclude<ServiceCategoryId, 'all'>;
  categoryLabel: {
    vi: string;
    en: string;
  };
  icon: ServiceIconType;
  shortDescription: {
    vi: string;
    en: string;
  };
  description: {
    vi: string[];
    en: string[];
  };
  duration: {
    vi: string;
    en: string;
  };
  priceFrom: number;
  dependsOnWeight: boolean;
  priceUnit?: {
    vi: string;
    en: string;
  };
  suitablePets: {
    vi: string;
    en: string;
  };
  included: {
    vi: string[];
    en: string[];
  };
  steps: ServiceStep[];
  priceTable: ServicePriceRow[];
  tips: {
    vi: string[];
    en: string[];
  };
  faq: ServiceFaqItem[];
}

export const SERVICE_CATEGORIES: {
  id: ServiceCategoryId;
  labelVi: string;
  labelEn: string;
}[] = [
  { id: 'all', labelVi: 'Tất cả dịch vụ', labelEn: 'All Services' },
  { id: 'vet', labelVi: 'Thú y & Nha khoa', labelEn: 'Veterinary & Dental' },
  { id: 'spa', labelVi: 'Spa & Grooming', labelEn: 'Spa & Grooming' },
  { id: 'training', labelVi: 'Huấn luyện', labelEn: 'Training' },
  { id: 'boarding', labelVi: 'Lưu trú 24/7', labelEn: '24/7 Boarding' },
];

export const formatServicePrice = (price: number): string => {
  return `${price.toLocaleString('vi-VN')}đ`;
};

export const SERVICES_DATA: ServiceEntity[] = [
  {
    id: 'checkup',
    slug: 'kham-tong-quat',
    name: {
      vi: 'Khám tổng quát',
      en: 'Comprehensive Vet Checkup',
    },
    category: 'vet',
    categoryLabel: {
      vi: 'Thú y & Nha khoa',
      en: 'Veterinary & Dental',
    },
    icon: 'checkup',
    shortDescription: {
      vi: 'Khám lâm sàng 12 bước, siêu âm ổ bụng, xét nghiệm máu sinh hóa và phác đồ tiêm chủng chuẩn quốc tế cho chó, mèo, thỏ, hamster và chim cảnh.',
      en: '12-point clinical exam, abdominal ultrasound, blood panel, and customized vaccination schedules across dogs, cats, rabbits, hamsters, and birds.',
    },
    description: {
      vi: [
        'Gói Khám tổng quát tại Animora được thiết kế theo tiêu chuẩn y khoa Fear-Free (Không Căng Thẳng), giúp phát hiện sớm các dấu hiệu bất thường về tim mạch, tiêu hóa, xương khớp, da liễu và ký sinh trùng ở từng giai đoạn phát triển của bé.',
        'Mỗi lượt khám diễn ra trong phòng cách âm riêng biệt theo loài có bàn khám sưởi ấm 37.5°C và tinh dầu pheromone tự nhiên. Bác sĩ trực tiếp kiểm tra 12 chỉ số lâm sàng và giải thích chi tiết từng kết quả cho ba mẹ.',
        'Toàn bộ lịch sử khám, chỉ số cân nặng, kết quả xét nghiệm và lịch nhắc tiêm phòng tiếp theo được đồng bộ tức thì vào Sổ sức khỏe điện tử Animora để gia đình dễ dàng theo dõi mọi lúc.',
      ],
      en: [
        'Our Comprehensive Vet Checkup follows international Fear-Free veterinary standards to detect early signs of cardiovascular, digestive, orthopedic, dermatological, and parasitic conditions across every life stage.',
        'Consultations take place inside species-separated, sound-insulated exam suites equipped with 37.5°C warmed tables and calming natural pheromones. Your veterinarian performs a thorough 12-point assessment and walks you through every finding.',
        'All clinical notes, weight trends, lab results, and upcoming vaccine reminders are synced immediately to your Animora Digital Health Passport for effortless tracking.',
      ],
    },
    duration: {
      vi: '45 phút',
      en: '45 mins',
    },
    priceFrom: 590000,
    dependsOnWeight: true,
    suitablePets: {
      vi: 'Chó, Mèo, Thỏ, Hamster, Chim cảnh',
      en: 'Dogs, Cats, Rabbits, Hamsters, Exotic Birds',
    },
    included: {
      vi: [
        'Đo sinh hiệu, nghe tim phổi & kiểm tra niêm mạc',
        'Soi tai vi điểm, kiểm tra da lông & ký sinh trùng',
        'Tư vấn dinh dưỡng theo lứa tuổi & giống loài',
        'Cập nhật trực tiếp vào Sổ sức khỏe điện tử Animora',
        'Kiểm tra khớp xương, phản xạ vận động & tuyến lệ',
        'Lập phác đồ tiêm phòng & tẩy giun định kỳ cá nhân hóa',
      ],
      en: [
        'Vital signs, cardiopulmonary & mucosal screening',
        'Microscopic ear, coat & parasite examination',
        'Species- & age-specific clinical nutrition consult',
        'Instant sync with Animora Digital Health Passport',
        'Orthopedic joint, mobility & ophthalmic check',
        'Personalized vaccination & deworming schedule',
      ],
    },
    steps: [
      {
        titleVi: 'Tiếp nhận & làm quen dịu dàng',
        titleEn: 'Gentle Fear-Free Welcome',
        textVi: 'Đo cân nặng, thân nhiệt tại sảnh chờ tách biệt theo loài để bé làm quen với bác sĩ.',
        textEn: 'Record weight and temperature in a calm, species-separated lounge before beginning.',
      },
      {
        titleVi: 'Khám lâm sàng 12 bước toàn diện',
        titleEn: '12-Point Clinical Examination',
        textVi: 'Nghe tim phổi, kiểm tra mắt, mũi, tai vi điểm, răng nướu, hạch bạch huyết và ổ bụng.',
        textEn: 'Assess heart, lungs, eyes, microscopic ear health, oral cavity, lymph nodes, and abdomen.',
      },
      {
        titleVi: 'Siêu âm tầm soát & xét nghiệm nhanh',
        titleEn: 'Diagnostic Screening & Lab Check',
        textVi: 'Soi da lông tìm ký sinh trùng và kiểm tra các chỉ số sinh hóa cơ bản khi cần thiết.',
        textEn: 'Perform coat parasite microscopy and baseline diagnostic screening as needed.',
      },
      {
        titleVi: 'Tư vấn dinh dưỡng & đồng bộ Sổ sức khỏe',
        titleEn: 'Nutrition Plan & Digital Passport Sync',
        textVi: 'Bác sĩ giải thích kết quả, kê thực đơn theo loài và cập nhật lịch hẹn tái khám.',
        textEn: 'Review results together, tailor the daily diet, and update your digital health record.',
      },
    ],
    priceTable: [
      { weightRangeVi: 'Dưới 5kg', weightRangeEn: 'Under 5kg', price: 590000 },
      { weightRangeVi: '5 - 10kg', weightRangeEn: '5 - 10kg', price: 690000 },
      { weightRangeVi: '10 - 20kg', weightRangeEn: '10 - 20kg', price: 820000 },
      { weightRangeVi: 'Trên 20kg', weightRangeEn: 'Over 20kg', price: 980000 },
    ],
    tips: {
      vi: [
        'Cho bé nhịn ăn nhẹ từ 4–6 tiếng trước buổi khám nếu cần lấy máu xét nghiệm sinh hóa.',
        'Mang theo sổ tiêm chủng cũ hoặc hình ảnh các loại thức ăn, thuốc bé đang sử dụng.',
        'Đặt các bé mèo, thỏ và hamster trong lồng vận chuyển thoáng khí có lót khăn quen mùi.',
        'Ghi chú lại những biểu hiện lạ (hắt hơi, biếng ăn, gãi tai...) trong 7 ngày gần nhất.',
      ],
      en: [
        'Fast your pet for 4–6 hours prior to the visit if a blood chemistry panel is needed.',
        'Bring any previous vaccination booklets or photos of current food and medications.',
        'Transport cats, rabbits, and hamsters in a ventilated carrier lined with a familiar blanket.',
        'Jot down any unusual behaviors (sneezing, appetite changes, ear scratching) from the past week.',
      ],
    },
    faq: [
      {
        questionVi: 'Bao lâu nên đưa bé đi khám tổng quát định kỳ một lần?',
        questionEn: 'How often should my pet have a comprehensive checkup?',
        answerVi:
          'Với các bé trưởng thành khỏe mạnh, nên khám định kỳ 6 tháng/lần. Với thú cưng nhỏ dưới 1 tuổi hoặc các bé lớn tuổi (trên 7 tuổi), khuyến khích kiểm tra mỗi 3–4 tháng/lần.',
        answerEn:
          'Healthy adult pets should be examined every 6 months. Young pets under 1 year and senior companions (7+ years) benefit from checkups every 3–4 months.',
      },
      {
        questionVi: 'Gói khám tổng quát đã bao gồm mũi tiêm vắc-xin chưa?',
        questionEn: 'Does the checkup fee include vaccination shots?',
        answerVi:
          'Gói khám đã bao gồm khám sàng lọc trước tiêm và tư vấn phác đồ. Chi phí mũi vắc-xin cụ thể sẽ được bác sĩ thông báo minh bạch tùy theo loài và loại vắc-xin cần tiêm.',
        answerEn:
          'The package covers pre-vaccine screening and scheduling. Specific vaccine doses are quoted transparently based on species and required protection.',
      },
      {
        questionVi: 'Thỏ cảnh và Hamster có bác sĩ chuyên khoa riêng không?',
        questionEn: 'Do you have dedicated specialists for rabbits and hamsters?',
        answerVi:
          'Có. Animora có chuyên khoa Thú nhỏ & Ngoại lai riêng biệt với thiết bị soi răng hàm, nghe nhịp tim tần số cao chuyên dụng cho thỏ, chuột lang, hamster và chim vẹt.',
        answerEn:
          'Yes. Animora has a dedicated Exotic & Small Pet wing with specialized dental otoscopes and high-frequency stethoscopes for rabbits, guinea pigs, hamsters, and birds.',
      },
    ],
  },
  {
    id: 'spa',
    slug: 'spa-tam',
    name: {
      vi: 'Spa & tắm',
      en: 'Herbal Spa & Grooming',
    },
    category: 'spa',
    categoryLabel: {
      vi: 'Spa & Grooming',
      en: 'Spa & Grooming',
    },
    icon: 'spa',
    shortDescription: {
      vi: 'Liệu trình tắm sục ozone thảo mộc hữu cơ kết hợp massage thư giãn, cắt mài móng, vệ sinh tuyến hôi và tạo kiểu lông chuẩn từng giống.',
      en: 'Organic botanical micro-bubble ozone bath, calming massage, nail grinding, sanitary trim, and breed-standard scissoring.',
    },
    description: {
      vi: [
        'Tổ hợp Thủy trị liệu & Spa Thảo mộc của Animora sử dụng hệ thống bồn sục siêu vi bọt Ozone giúp làm sạch sâu lỗ chân lông mà không cần chà xát mạnh, kết hợp 100% tinh chất yến mạch, hoa cúc La Mã và oải hương thuần chay.',
        'Mỗi bé được 1 kỹ thuật viên Grooming hạng A chăm sóc xuyên suốt từ bước chải gỡ rối, vệ sinh tai, cắt mài móng tròn êm ái cho đến sấy lồng tĩnh âm dưới 45dB — hoàn toàn không gây giật mình cho các bé nhạy cảm.',
        'Sau liệu trình, da lông của bé được cân bằng độ pH tự nhiên, mềm mượt dài lâu và lưu hương thảo mộc thanh khiết dịu nhẹ suốt nhiều ngày.',
      ],
      en: [
        'Animora’s Herbal Hydro-Spa combines micro-bubble ozone hydrotherapy with 100% vegan oatmeal, Roman chamomile, and organic lavender extracts to deep-cleanse pores gently without harsh scrubbing.',
        'Every pet receives dedicated 1-on-1 care from a Class-A certified stylist—from gentle detangling, ear hygiene, and smooth nail buffing to sub-45dB whisper drying designed for sound-sensitive companions.',
        'Your pet leaves with a balanced skin pH, a silky, tangle-free coat, and a soothing natural botanical scent that lasts.',
      ],
    },
    duration: {
      vi: '75 – 90 phút',
      en: '75 – 90 mins',
    },
    priceFrom: 490000,
    dependsOnWeight: true,
    suitablePets: {
      vi: 'Chó, Mèo, Thỏ cảnh lông dài',
      en: 'Dogs, Cats, Long-haired Rabbits',
    },
    included: {
      vi: [
        'Tắm sục thảo mộc yến mạch & hoa cúc dịu nhẹ',
        'Sấy lồng tĩnh âm dưới 45dB chống giật mình',
        'Cắt tỉa lông bàn chân, vệ sinh tai & mài móng êm',
        'Xịt dưỡng tinh dầu oải hương giữ ẩm da lông',
        'Vệ sinh tuyến hôi & cạo tỉa vùng vệ sinh gọn gàng',
        'Massage bấm huyệt thư giãn cổ vai & đệm thịt bàn chân',
      ],
      en: [
        'Oatmeal & chamomile micro-bubble hydro-bath',
        'Sub-45dB whisper drying for anxious pets',
        'Paw pad trim, gentle ear cleaning & nail buffing',
        'Organic lavender coat conditioning mist',
        'Sanitary trim & gentle anal gland expression',
        'Calming neck, shoulder & paw-balm acupressure massage',
      ],
    },
    steps: [
      {
        titleVi: 'Kiểm tra da lông & chải gỡ rối tơ',
        titleEn: 'Coat Inspection & Gentle Detangling',
        textVi: 'Kiểm tra tình trạng da, độ ẩm lông và chải mở nút rối bằng lược đệm khí êm ái.',
        textEn: 'Assess skin sensitivity and gently brush out tangles using air-cushioned pins.',
      },
      {
        titleVi: 'Vệ sinh tai, cắt mài móng & tỉa đệm chân',
        titleEn: 'Ear Hygiene, Nail Buffing & Paw Care',
        textVi: 'Làm sạch ống tai bằng dung dịch thảo dược, cắt và mài nhẵn đầu móng không sắc nhọn.',
        textEn: 'Clean ears with botanical lotion, clip nails, and buff edges smooth.',
      },
      {
        titleVi: 'Tắm sục siêu vi bọt Ozone & ủ thảo mộc',
        titleEn: 'Ozone Micro-Bubble Bath & Herbal Mask',
        textVi: 'Ngâm sục bọt oxy ấm 38°C kết hợp massage tinh chất yến mạch và hoa cúc trong 15 phút.',
        textEn: 'Soak in 38°C micro-bubble water with a 15-minute oatmeal and chamomile massage.',
      },
      {
        titleVi: 'Sấy tĩnh âm & tạo kiểu hoàn thiện',
        titleEn: 'Whisper Drying & Finishing Touch',
        textVi: 'Sấy khô êm dịu dưới 45dB, chải phồng tạo phom và xịt khoáng dưỡng ẩm tinh dầu.',
        textEn: 'Fluff-dry below 45dB, style to breed contour, and finish with lavender conditioning mist.',
      },
    ],
    priceTable: [
      { weightRangeVi: 'Dưới 5kg', weightRangeEn: 'Under 5kg', price: 490000 },
      { weightRangeVi: '5 - 10kg', weightRangeEn: '5 - 10kg', price: 620000 },
      { weightRangeVi: '10 - 20kg', weightRangeEn: '10 - 20kg', price: 790000 },
      { weightRangeVi: 'Trên 20kg', weightRangeEn: 'Over 20kg', price: 990000 },
    ],
    tips: {
      vi: [
        'Không nên cho bé ăn quá no trong vòng 1 tiếng trước khi tắm sục thủy trị liệu.',
        'Các bé mới tiêm vắc-xin cần kiêng tắm nước ít nhất 7 ngày (có thể chọn gói Spa tắm khô thảo mộc).',
        'Thông báo trước cho chuyên viên nếu bé có vết xước ngoài da hoặc từng nhạy cảm với máy sấy.',
        'Có thể mang theo kiểu ảnh cắt tỉa yêu thích để Groomer tư vấn phom phù hợp khuôn mặt bé.',
      ],
      en: [
        'Avoid feeding a heavy meal within 1 hour before the hydrotherapy bath.',
        'Pets vaccinated within the last 7 days should wait before water bathing (dry herbal spa is available).',
        'Let our stylist know if your pet has any skin scrapes or dryer sensitivity.',
        'Feel free to bring reference photos if you want a custom breed haircut.',
      ],
    },
    faq: [
      {
        questionVi: 'Mèo sợ nước có thể tham gia gói Spa & tắm được không?',
        questionEn: 'Can water-shy cats safely enjoy the Herbal Spa package?',
        answerVi:
          'Hoàn toàn được. Khu vực Spa cho Mèo tách biệt hoàn toàn với Chó, sử dụng vòi nước áp lực siêu nhẹ và khăn ấm thảo mộc giúp mèo bình tĩnh trong suốt buổi tắm.',
        answerEn:
          'Absolutely. Our feline spa studio is completely separate from dogs and uses low-pressure warm streams and herbal towel wraps to keep cats relaxed.',
      },
      {
        questionVi: 'Sữa tắm tại Animora có an toàn cho bé bị viêm da dị ứng không?',
        questionEn: 'Are your shampoos safe for pets with allergic dermatitis?',
        answerVi:
          'Tất cả sản phẩm tắm gội đều là dòng hữu cơ y khoa không chứa sulfate, paraben hay hương liệu tổng hợp, cực kỳ lành tính cho làn da nhạy cảm.',
        answerEn:
          'All shampoos are veterinary-grade organic formulas free of sulfates, parabens, and synthetic fragrances—ideal for sensitive or allergy-prone skin.',
      },
      {
        questionVi: 'Chủ nuôi có thể quan sát trực tiếp quá trình tắm của bé không?',
        questionEn: 'Can pet parents watch the grooming session?',
        answerVi:
          'Phòng Spa có vách kính trong suốt một chiều để ba mẹ thoải mái thưởng thức trà hoa và quan sát bé mà không làm bé phân tâm.',
        answerEn:
          'Yes! Our spa features a viewing lounge where you can enjoy herbal tea and watch your pet without distracting them.',
      },
    ],
  },
  {
    id: 'training',
    slug: 'huan-luyen',
    name: {
      vi: 'Huấn luyện',
      en: 'Positive Behavioral Training',
    },
    category: 'training',
    categoryLabel: {
      vi: 'Huấn luyện',
      en: 'Training',
    },
    icon: 'training',
    shortDescription: {
      vi: 'Phương pháp khen thưởng tích cực (Positive Reinforcement) giúp bé xây dựng thói quen đi vệ sinh đúng chỗ, giao tiếp tự tin và giảm lo âu.',
      en: '100% force-free positive reinforcement training for potty habits, calm leash manners, socialization, and anxiety relief.',
    },
    description: {
      vi: [
        'Chương trình Huấn luyện & Giao tiếp Hành vi tại Animora áp dụng 100% phương pháp củng cố tích cực (Positive Reinforcement) đạt chuẩn Hiệp hội Hành vi Động vật Quốc tế (IAABC) — tuyệt đối không dùng quát mắng hay áp lực tâm lý.',
        'Huấn luyện viên làm việc trực tiếp 1-kèm-1 cùng bé và chủ nuôi để giải mã ngôn ngữ cơ thể, xây dựng thói quen đi vệ sinh đúng khay, đi dạo không kéo dây và khắc phục chứng lo âu khi xa chủ.',
        'Mỗi buổi học kết thúc bằng cẩm nang thực hành 10 phút mỗi ngày tại nhà, giúp gắn kết tình cảm bền chặt giữa bé và cả gia đình.',
      ],
      en: [
        'Animora’s Positive Behavioral Training uses 100% force-free, reward-based methods certified by the International Association of Animal Behavior Consultants (IAABC)—never punishment or intimidation.',
        'Our behaviorists work 1-on-1 with your pet and family to decode body language, establish reliable potty habits, master loose-leash walking, and soothe separation anxiety.',
        'Every session includes a practical 10-minute daily home routine to strengthen trust and joyful communication between you and your companion.',
      ],
    },
    duration: {
      vi: '60 phút / buổi',
      en: '60 mins / session',
    },
    priceFrom: 690000,
    dependsOnWeight: false,
    suitablePets: {
      vi: 'Chó, Mèo, Thỏ cảnh, Vẹt cảnh',
      en: 'Dogs, Cats, Rabbits, Parrots',
    },
    included: {
      vi: [
        'Đánh giá tâm lý & thói quen hành vi 1-kèm-1',
        'Rèn nếp đi vệ sinh đúng khay cho chó, mèo & thỏ',
        'Khắc phục thói quen sủa nhiều hoặc sợ người lạ',
        'Hướng dẫn chủ nuôi đồng hành thực hành tại nhà',
        'Bài tập kích thích trí thông minh (Enrichment Puzzle)',
        'Báo cáo tiến độ video & hỗ trợ giải đáp trực tuyến',
      ],
      en: [
        '1-on-1 behavioral & temperament assessment',
        'Litter & potty training for puppies, kittens & rabbits',
        'Reactivity, barking & separation anxiety coaching',
        'Take-home parent coaching guide',
        'Cognitive enrichment & puzzle games',
        'Video progress log & ongoing online support',
      ],
    },
    steps: [
      {
        titleVi: 'Đánh giá tính cách & môi trường sống',
        titleEn: 'Temperament & Lifestyle Assessment',
        textVi: 'Tìm hiểu thói quen sinh hoạt, nguyên nhân gây căng thẳng hoặc hành vi chưa mong muốn.',
        textEn: 'Analyze daily routines, triggers, and underlying emotional needs.',
      },
      {
        titleVi: 'Thiết lập tín hiệu thưởng Clicker êm ái',
        titleEn: 'Clicker & Reward Marker Conditioning',
        textVi: 'Giúp bé hiểu rõ hành vi đúng thông qua tín hiệu âm thanh nhẹ và phần thưởng hữu cơ.',
        textEn: 'Build clear communication using gentle clicker markers and high-value organic treats.',
      },
      {
        titleVi: 'Thực hành tình huống thực tế 1-kèm-1',
        titleEn: '1-on-1 Real-World Scenario Practice',
        textVi: 'Rèn kỹ năng bình tĩnh khi gặp người lạ, thú cưng khác và nghe hiệu lệnh cơ bản.',
        textEn: 'Practice calm greetings, impulse control, and reliable recall in our enrichment garden.',
      },
      {
        titleVi: 'Chuyển giao kỹ năng cho chủ nuôi',
        titleEn: 'Pet Parent Handover & Home Plan',
        textVi: 'Hướng dẫn ba mẹ cách duy trì phản xạ tích cực chỉ với 10 phút tương tác mỗi ngày.',
        textEn: 'Coach pet parents on maintaining progress with simple 10-minute daily games.',
      },
    ],
    priceTable: [
      { weightRangeVi: 'Dưới 5kg', weightRangeEn: 'Under 5kg', price: 690000 },
      { weightRangeVi: '5 - 10kg', weightRangeEn: '5 - 10kg', price: 750000 },
      { weightRangeVi: '10 - 20kg', weightRangeEn: '10 - 20kg', price: 850000 },
      { weightRangeVi: 'Trên 20kg', weightRangeEn: 'Over 20kg', price: 950000 },
    ],
    tips: {
      vi: [
        'Cho bé ăn bữa nhẹ (khoảng 50% khẩu phần) trước buổi học để bé hào hứng với bánh thưởng huấn luyện.',
        'Mang theo dây dắt ngực (Harness) vừa vặn và món đồ chơi bé yêu thích nhất.',
        'Khuyến khích các thành viên trong gia đình cùng tham gia 15 phút cuối buổi để thống nhất khẩu lệnh.',
      ],
      en: [
        'Feed a light half-meal before class so your pet stays motivated for training treats.',
        'Bring a comfortable front-clip harness and your pet’s favorite toy.',
        'Family members are encouraged to join the final 15 minutes to keep cues consistent at home.',
      ],
    },
    faq: [
      {
        questionVi: 'Bé đã lớn tuổi (trên 3 tuổi) có còn huấn luyện sửa thói quen được không?',
        questionEn: 'Can adult pets over 3 years old still learn new habits?',
        answerVi:
          'Hoàn toàn được. Với phương pháp củng cố tích cực, thú cưng ở mọi lứa tuổi đều có thể học thói quen mới và giảm lo âu hiệu quả.',
        answerEn:
          'Yes! With positive reinforcement, adult and senior pets learn new habits and overcome anxiety wonderfully.',
      },
      {
        questionVi: 'Cần bao nhiêu buổi để bé đi vệ sinh đúng chỗ?',
        questionEn: 'How many sessions does potty training usually take?',
        answerVi:
          'Thông thường sau 2–3 buổi hướng dẫn kết hợp sắp xếp lại khu vực khay vệ sinh tại nhà, hơn 90% các bé đã hình thành phản xạ đúng chỗ.',
        answerEn:
          'Most puppies, kittens, and rabbits master consistent litter or pad habits within 2–3 guided sessions plus home setup.',
      },
      {
        questionVi: 'Animora có nhận huấn luyện thỏ cảnh và vẹt cảnh không?',
        questionEn: 'Do you offer training for rabbits and parrots?',
        answerVi:
          'Có. Chúng tôi có các bài tập Clicker giúp thỏ đi vệ sinh đúng khay, tự nguyện vào lồng và giúp vẹt làm quen đứng tay thân thiện.',
        answerEn:
          'Yes. We offer clicker training for rabbit litter habits, voluntary carrier entry, and gentle parrot step-up bonding.',
      },
    ],
  },
  {
    id: 'boarding',
    slug: 'luu-tru',
    name: {
      vi: 'Lưu trú',
      en: '24/7 Luxury Multi-Species Boarding',
    },
    category: 'boarding',
    categoryLabel: {
      vi: 'Lưu trú 24/7',
      en: '24/7 Boarding',
    },
    icon: 'boarding',
    shortDescription: {
      vi: 'Khách sạn thú cưng tách biệt hoàn toàn giữa khu Chó, khu Mèo và khu Thú nhỏ, trang bị điều hòa lọc khí HEPA và camera Full HD 24/7.',
      en: 'Species-isolated luxury suites with HEPA climate control, daily garden playtime, and 24/7 live HD camera access.',
    },
    description: {
      vi: [
        'Khách sạn Lưu trú Đa loài Animora mang đến không gian nghỉ dưỡng chuẩn 5 sao với 3 phân khu cách âm hoàn toàn độc lập: Khu Villa Chó, Khu Condo Mèo nhiều tầng và Khu Sanctuary Thú nhỏ (Thỏ, Hamster, Chim cảnh).',
        'Mỗi phòng nghỉ đều được kiểm soát nhiệt độ 24–26°C, độ ẩm tiêu chuẩn, hệ thống lọc khí tươi HEPA y tế và camera Full HD kết nối trực tiếp vào điện thoại để ba mẹ ngắm nhìn bé bất cứ lúc nào.',
        'Đội ngũ điều dưỡng nội trú và bác sĩ thú y túc trực 24/7, phục vụ 3 bữa ăn dinh dưỡng cá nhân hóa cùng khung giờ dạo chơi sân cỏ tự nhiên mỗi sáng và chiều.',
      ],
      en: [
        'Animora’s Luxury Multi-Species Boarding Sanctuary features three sound-isolated wings: Canine Garden Villas, Multi-Level Feline Condos, and Exotic Small Pet Suites.',
        'Every private suite maintains 24–26°C climate control, medical-grade HEPA air filtration, orthopedic bedding, and 24/7 live Full HD camera streaming straight to your phone.',
        'With round-the-clock veterinary nurses, three customized daily meals, and supervised morning and afternoon garden play, you can travel with complete peace of mind.',
      ],
    },
    duration: {
      vi: 'Theo đêm lưu trú',
      en: 'Per night',
    },
    priceFrom: 390000,
    dependsOnWeight: true,
    priceUnit: {
      vi: '/ đêm',
      en: '/ night',
    },
    suitablePets: {
      vi: 'Chó, Mèo, Thỏ, Hamster, Chim cảnh',
      en: 'Dogs, Cats, Rabbits, Hamsters, Birds',
    },
    included: {
      vi: [
        'Phòng nghỉ riêng khử khuẩn hàng ngày kèm đệm êm',
        'Camera trực tuyến 24/7 xem bé mọi lúc trên điện thoại',
        '3 bữa ăn dinh dưỡng + giờ vận động sân cỏ mỗi ngày',
        'Bác sĩ thú y kiểm tra sức khỏe 2 lần/ngày',
        'Cập nhật nhật ký hình ảnh & video sáng - tối qua Zalo/App',
        'Miễn phí chải lông thư giãn & vệ sinh mắt mũi mỗi sáng',
      ],
      en: [
        'Sanitized private suite with orthopedic bedding',
        '24/7 live HD smartphone camera access',
        '3 tailored daily meals + supervised garden play',
        'Twice-daily veterinary wellness rounds',
        'Morning & evening photo/video journal updates',
        'Complimentary daily brushing & facial hygiene',
      ],
    },
    steps: [
      {
        titleVi: 'Khám sàng lọc sức khỏe trước khi nhận phòng',
        titleEn: 'Pre-Check-In Veterinary Screening',
        textVi: 'Bác sĩ kiểm tra sinh hiệu, da lông và sổ tiêm chủng để đảm bảo môi trường lưu trú an toàn.',
        textEn: 'Verify vitals, coat health, and vaccination status to keep all guests safe.',
      },
      {
        titleVi: 'Nhận phòng riêng & kết nối Camera 24/7',
        titleEn: 'Suite Setup & Live Camera Pairing',
        textVi: 'Sắp xếp chăn đệm quen mùi của bé và cấp mã truy cập camera trực tiếp cho chủ nuôi.',
        textEn: 'Settle your pet with familiar bedding and activate your private 24/7 livestream link.',
      },
      {
        titleVi: 'Chăm sóc dinh dưỡng & vận động mỗi ngày',
        titleEn: 'Daily Meals, Playtime & Night Care',
        textVi: 'Phục vụ 3 bữa ăn theo thực đơn riêng, vui chơi sân cỏ và gửi video nhật ký hàng ngày.',
        textEn: 'Serve 3 tailored meals, host supervised playtime, and send daily video updates.',
      },
      {
        titleVi: 'Kiểm tra tổng quát & bàn giao khi trả phòng',
        titleEn: 'Check-Out Wellness Summary',
        textVi: 'Vệ sinh thơm tho, tổng kết nhật ký ăn ngủ và bàn giao bé khỏe mạnh cho gia đình.',
        textEn: 'Perform a final freshen-up and share a complete stay report upon pick-up.',
      },
    ],
    priceTable: [
      { weightRangeVi: 'Dưới 5kg', weightRangeEn: 'Under 5kg', price: 390000 },
      { weightRangeVi: '5 - 10kg', weightRangeEn: '5 - 10kg', price: 490000 },
      { weightRangeVi: '10 - 20kg', weightRangeEn: '10 - 20kg', price: 620000 },
      { weightRangeVi: 'Trên 20kg', weightRangeEn: 'Over 20kg', price: 780000 },
    ],
    tips: {
      vi: [
        'Mang theo một chiếc áo hoặc khăn nhỏ có mùi hương của chủ nuôi để bé nhanh chóng an tâm ở phòng mới.',
        'Nếu bé đang ăn chế độ đặc biệt hoặc dùng thuốc định kỳ, vui lòng mang kèm và ghi rõ liều lượng.',
        'Đặt phòng trước 3–5 ngày vào các dịp Lễ, Tết hoặc cuối tuần để chọn được hạng phòng ưng ý nhất.',
      ],
      en: [
        'Pack a small blanket or t-shirt with your scent to help your pet feel right at home.',
        'Bring any prescription diets or medications with clear dosage instructions.',
        'Book 3–5 days in advance for weekends and holidays to reserve your preferred suite.',
      ],
    },
    faq: [
      {
        questionVi: 'Ban đêm có nhân viên trực chăm sóc các bé không?',
        questionEn: 'Is there overnight staff on-site with the pets?',
        answerVi:
          'Có. Điều dưỡng nội trú của Animora trực xuyên đêm tại khu lưu trú, kiểm tra nhiệt độ phòng và hỗ trợ ngay nếu bé cần đi vệ sinh hoặc uống nước.',
        answerEn:
          'Yes. Our night-care veterinary nurses stay on-site all night, monitoring room climate and tending to every guest.',
      },
      {
        questionVi: 'Các bé có bị nhốt chung với thú cưng của gia đình khác không?',
        questionEn: 'Do pets share suites with animals from other households?',
        answerVi:
          'Tuyệt đối không. Mỗi bé (hoặc các bé cùng một gia đình theo yêu cầu) ở một phòng riêng biệt hoàn toàn.',
        answerEn:
          'Never. Every guest stays in a private suite (siblings from the same family may share upon request).',
      },
      {
        questionVi: 'Lưu trú dài ngày từ 7 đêm trở lên có ưu đãi không?',
        questionEn: 'Is there a discount for long-term stays of 7+ nights?',
        answerVi:
          'Khi lưu trú từ 7 đêm trở lên, bé được giảm 10% tổng chi phí phòng và tặng miễn phí 1 buổi Tắm thảo mộc trước khi về nhà.',
        answerEn:
          'Stays of 7 nights or more receive a 10% suite discount plus a complimentary Herbal Spa bath before check-out.',
      },
    ],
  },
  {
    id: 'dental',
    slug: 'nha-khoa-thu-nho',
    name: {
      vi: 'Nha khoa & Chăm sóc Thú nhỏ',
      en: 'Dental & Exotic Small Pet Care',
    },
    category: 'vet',
    categoryLabel: {
      vi: 'Thú y & Nha khoa',
      en: 'Veterinary & Dental',
    },
    icon: 'dental',
    shortDescription: {
      vi: 'Lấy cao răng sóng siêu âm êm ái cho chó mèo, chỉnh nha & mài răng chuyên sâu cho thỏ cảnh, chuột lang và tỉa mỏ/móng an toàn cho chim vẹt.',
      en: 'Ultrasonic dental scaling for dogs and cats, specialized molar trimming for rabbits & guinea pigs, and avian beak/nail care.',
    },
    description: {
      vi: [
        'Sức khỏe răng miệng đóng vai trò quyết định đến khả năng tiêu hóa và tuổi thọ của thú cưng — đặc biệt là các loài răng mọc dài suốt đời như Thỏ cảnh, Chuột lang (Guinea Pig), Chinchilla và Hamster.',
        'Chuyên khoa Nha khoa & Thú nhỏ của Animora trang bị máy lấy cao răng sóng siêu âm Piezo thế hệ mới không làm tổn thương men răng cho chó mèo, cùng bộ dụng cụ nội soi và mài chỉnh răng hàm chuyên dụng cho thỏ cảnh.',
        'Sau khi làm sạch và chỉnh nha êm ái, bác sĩ phủ gel thảo mộc kháng khuẩn làm dịu nướu và hướng dẫn chế độ cỏ khô Timothy / đồ gặm mài răng tự nhiên tại nhà.',
      ],
      en: [
        'Oral health is vital to digestion and longevity—especially for open-rooted species like Rabbits, Guinea Pigs, Chinchillas, and Hamsters whose teeth grow continuously.',
        'Animora’s Dental & Exotic Care unit utilizes gentle Piezo ultrasonic scaling for dogs and cats alongside specialized oral endoscopes and molar burrs for small herbivores.',
        'Following treatment, we apply soothing antibacterial botanical gum gel and customize a home hay and dental chew regimen.',
      ],
    },
    duration: {
      vi: '50 phút',
      en: '50 mins',
    },
    priceFrom: 550000,
    dependsOnWeight: true,
    suitablePets: {
      vi: 'Thỏ, Hamster, Chuột lang, Chim vẹt, Chó, Mèo',
      en: 'Rabbits, Hamsters, Guinea Pigs, Parrots, Dogs, Cats',
    },
    included: {
      vi: [
        'Kiểm tra khớp cắn & răng hàm chuyên sâu cho Thỏ/Bọ ú',
        'Làm sạch mảng bám bằng sóng siêu âm không đau',
        'Kiểm tra túi má Hamster & tỉa mỏ/móng Chim cảnh',
        'Gel thảo mộc kháng khuẩn bảo vệ nướu sau chăm sóc',
        'Đánh bóng bề mặt men răng hạn chế bám mảng mới',
        'Tư vấn khẩu phần cỏ khô Timothy & đồ chơi mài răng',
      ],
      en: [
        'Deep molar & occlusal check for Rabbits & Guinea Pigs',
        'Gentle ultrasonic plaque removal',
        'Hamster cheek pouch & avian grooming check',
        'Post-care herbal gum protection gel',
        'Enamel polishing to slow future tartar buildup',
        'Timothy hay & natural dental chew nutrition guide',
      ],
    },
    steps: [
      {
        titleVi: 'Nội soi khoang miệng & đánh giá khớp cắn',
        titleEn: 'Oral Endoscopy & Occlusal Check',
        textVi: 'Sử dụng ống soi chuyên dụng kiểm tra răng cửa, răng hàm trong và tình trạng viêm nướu.',
        textEn: 'Inspect incisors, deep molars, cheek pouches, and gum health with a gentle oral scope.',
      },
      {
        titleVi: 'Lấy cao răng siêu âm / Mài chỉnh răng hàm',
        titleEn: 'Ultrasonic Scaling / Molar Burring',
        textVi: 'Loại bỏ mảng bám bằng sóng siêu âm hoặc mài phẳng gai răng nhọn gây xước lưỡi ở thỏ.',
        textEn: 'Remove tartar ultrasonically or gently smooth sharp molar spurs in rabbits and rodents.',
      },
      {
        titleVi: 'Đánh bóng men răng & sát khuẩn thảo mộc',
        titleEn: 'Polishing & Botanical Gum Therapy',
        textVi: 'Làm mịn bề mặt răng và thoa gel thảo dược giúp săn chắc nướu, khử mùi hôi miệng.',
        textEn: 'Polish enamel smooth and apply soothing herbal gel to protect gums and freshen breath.',
      },
      {
        titleVi: 'Hướng dẫn chăm sóc răng miệng tại nhà',
        titleEn: 'Home Dental Care Guidance',
        textVi: 'Tư vấn tỷ lệ cỏ khô, khúc gỗ táo mài răng và cách chải răng định kỳ cho bé.',
        textEn: 'Recommend optimal hay ratios, apple-wood chews, and stress-free home brushing tips.',
      },
    ],
    priceTable: [
      { weightRangeVi: 'Dưới 5kg', weightRangeEn: 'Under 5kg', price: 550000 },
      { weightRangeVi: '5 - 10kg', weightRangeEn: '5 - 10kg', price: 680000 },
      { weightRangeVi: '10 - 20kg', weightRangeEn: '10 - 20kg', price: 840000 },
      { weightRangeVi: 'Trên 20kg', weightRangeEn: 'Over 20kg', price: 990000 },
    ],
    tips: {
      vi: [
        'Đối với Thỏ và Chuột lang: tuyệt đối KHÔNG cho nhịn ăn trước khi đến khám nha khoa.',
        'Đối với Chó và Mèo lấy cao răng chuyên sâu: nên nhịn ăn 6 tiếng trước giờ hẹn (vẫn uống nước lọc bình thường).',
        'Ghi chú nếu bé có biểu hiện chảy nước dãi, làm rơi thức ăn hoặc chỉ nhai một bên hàm.',
      ],
      en: [
        'For Rabbits & Guinea Pigs: NEVER fast your pet before a dental appointment.',
        'For Dogs & Cats having deep ultrasonic scaling: fast for 6 hours prior (water is fine).',
        'Note if your pet has been drooling, dropping food, or chewing on only one side.',
      ],
    },
    faq: [
      {
        questionVi: 'Dấu hiệu nào cho thấy thỏ cảnh đang bị dài răng hàm?',
        questionEn: 'What are the signs of overgrown molars in rabbits?',
        answerVi:
          'Thỏ thường giảm ăn cỏ khô, chỉ chọn ăn đồ mềm, chảy nước mắt sống, ướt lông cằm hoặc đi phân viên nhỏ bất thường.',
        answerEn:
          'Rabbits often stop eating hay, prefer soft foods, develop watery eyes, wet chin fur, or smaller droppings.',
      },
      {
        questionVi: 'Lấy cao răng sóng siêu âm có làm hại men răng của chó mèo không?',
        questionEn: 'Does ultrasonic scaling damage dog or cat tooth enamel?',
        answerVi:
          'Không. Đầu rung siêu âm Piezo chỉ tác động phá vỡ mảng vôi răng cứng và đi kèm bước đánh bóng giúp bảo vệ men răng tối đa.',
        answerEn:
          'No. Piezo ultrasonic tips vibrate at a frequency that shatters tartar while leaving enamel intact, followed by protective polishing.',
      },
      {
        questionVi: 'Chim vẹt tỉa mỏ và móng có bị chảy máu hay đau không?',
        questionEn: 'Is avian beak and nail reshaping painful for parrots?',
        answerVi:
          'Bác sĩ sử dụng đầu mài kim cương mịn tốc độ thấp có đèn soi mạch máu, hoàn toàn không gây đau hay chảy máu cho bé.',
        answerEn:
          'Our avian specialist uses low-speed diamond burrs with vascular transillumination, ensuring a painless, blood-free trim.',
      },
    ],
  },
];
