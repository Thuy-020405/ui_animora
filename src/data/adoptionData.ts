import { AdoptionPet, Language, PetSpecies } from '../types';

export type AdoptionSpeciesTab = 'All' | 'Chó' | 'Mèo' | 'Thỏ' | 'Hamster' | 'Chim';
export type AdoptionSortOption = 'newest' | 'youngest' | 'nearest';

export const ADOPTION_SPECIES_TABS: {
  id: AdoptionSpeciesTab;
  labelVi: string;
  labelEn: string;
}[] = [
  { id: 'All', labelVi: 'Tất cả', labelEn: 'All' },
  { id: 'Chó', labelVi: 'Chó', labelEn: 'Dogs' },
  { id: 'Mèo', labelVi: 'Mèo', labelEn: 'Cats' },
  { id: 'Thỏ', labelVi: 'Thỏ', labelEn: 'Rabbits' },
  { id: 'Hamster', labelVi: 'Hamster', labelEn: 'Hamsters' },
  { id: 'Chim', labelVi: 'Chim & Vẹt', labelEn: 'Birds & Parrots' },
];

export const ADOPTION_PROCESS_STEPS = [
  {
    step: 1,
    shortVi: 'Chọn bé',
    shortEn: 'Choose',
    titleVi: 'Chọn bé & Gửi đăng ký',
    titleEn: 'Choose a pet & Apply',
    descVi:
      'Xem hồ sơ sức khỏe, tính cách từng bé và gửi thông tin liên hệ cùng điều kiện sinh hoạt của gia đình bạn.',
    descEn:
      'Review each pet’s health record and personality, then submit a short application about your home and lifestyle.',
  },
  {
    step: 2,
    shortVi: 'Gặp gỡ',
    shortEn: 'Meet',
    titleVi: 'Gặp gỡ trực tiếp tại Animora',
    titleEn: 'Meet & bond in person',
    descVi:
      'Ghé trung tâm Animora để làm quen với bé, lắng nghe bác sĩ thú y tư vấn thói quen ăn uống và chăm sóc.',
    descEn:
      'Visit Animora to spend time with the pet and talk with our veterinarians about their daily care routine.',
  },
  {
    step: 3,
    shortVi: 'Ký cam kết',
    shortEn: 'Sign the commitment',
    titleVi: 'Ký cam kết nhận nuôi nhân văn',
    titleEn: 'Sign the adoption commitment',
    descVi:
      'Cam kết tiêm phòng định kỳ, không bỏ rơi và giữ liên lạc cập nhật tình hình của bé trong thời gian đầu.',
    descEn:
      'Commit to routine vaccinations, lifelong care without abandonment, and periodic check-in updates.',
  },
  {
    step: 4,
    shortVi: 'Đón về nhà',
    shortEn: 'Take home',
    titleVi: 'Đón bé về mái ấm mới',
    titleEn: 'Welcome your new friend home',
    descVi:
      'Nhận Sổ sức khỏe điện tử của bé và hưởng ưu đãi 20% chi phí khám định kỳ trọn đời tại hệ thống Animora.',
    descEn:
      'Receive the pet’s Digital Health Passport along with a lifetime 20% discount on routine checkups at Animora.',
  },
];

export const ADOPTER_REQUIREMENTS = [
  {
    vi: 'Chỗ ở ổn định, an toàn (nhà riêng hoặc căn hộ cho phép nuôi thú cưng) và có sự đồng thuận của các thành viên trong gia đình.',
    en: 'Stable, pet-friendly housing (house or apartment permitting pets) with full agreement from all household members.',
  },
  {
    vi: 'Cam kết tiêm phòng nhắc lại, tẩy giun định kỳ và đưa bé đi khám thú y kịp thời khi có dấu hiệu bất thường.',
    en: 'Commitment to annual booster vaccinations, routine deworming, and prompt veterinary care whenever needed.',
  },
  {
    vi: 'Đồng ý chia sẻ hình ảnh/video cập nhật tình hình của bé cho đội ngũ Animora trong 6 tháng đầu sau khi đón về.',
    en: 'Willingness to share periodic photo/video updates with the Animora team during the first 6 months after adoption.',
  },
  {
    vi: 'Tuyệt đối không bỏ rơi, chuyển nhượng trái phép hoặc nuôi nhốt bé trong lồng chật hẹp thiếu ánh sáng.',
    en: 'Zero tolerance for abandonment, unauthorized rehoming, or confining the pet in cramped cages.',
  },
];

export const ADOPTION_PETS_DATA: AdoptionPet[] = [
  {
    id: 'adopt-1',
    slug: 'dau-dau',
    name: 'Đậu Đậu',
    species: 'Chó',
    breed: 'French Bulldog',
    breedEn: 'French Bulldog',
    age: '8 tháng',
    ageEn: '8 months',
    ageMonths: 8,
    gender: 'Đực',
    weight: '7.8 kg',
    color: 'Nâu vàng ấm',
    colorEn: 'Warm Fawn',
    area: 'Đà Nẵng',
    areaEn: 'Da Nang',
    distanceKm: 2.4,
    personality: 'Hiếu động, quấn người, rất thích chơi bóng cùng trẻ nhỏ.',
    personalityEn: 'Playful, affectionate, loves playing fetch and gentle with kids.',
    personalityTagsVi: ['Hiếu động', 'Quấn người', 'Thân thiện với trẻ nhỏ', 'Biết ngồi chờ ăn'],
    personalityTagsEn: ['Playful', 'Affectionate', 'Kid-friendly', 'Polite at mealtime'],
    photo: '/assets/adoption/dau-dau-1.jpg',
    photos: [
      '/assets/adoption/dau-dau-1.jpg',
      '/assets/adoption/dau-dau-2.jpg',
      '/assets/adoption/dau-dau-3.jpg',
      '/assets/adoption/dau-dau-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: false,
    microchip: 'VN-981020000482194',
    goodWithVi: ['Trẻ em', 'Chó hiền', 'Căn hộ chung cư'],
    goodWithEn: ['Children', 'Friendly dogs', 'Apartments'],
    lastCheckupDate: '18/10/2026',
    vaccinations: [
      {
        id: 'v-dau-1',
        nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
        nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
        status: 'vaccinated',
        date: '10/08/2026',
      },
      {
        id: 'v-dau-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '05/09/2026',
      },
      {
        id: 'v-dau-3',
        nameVi: 'Tẩy giun & Phòng ve rận định kỳ Q4',
        nameEn: 'Q4 Deworming & Tick Prevention',
        status: 'due_soon',
        date: '15/11/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Chưa triệt sản', 'Thân thiện'],
    story:
      'Đậu Đậu được đội ngũ Animora tiếp nhận từ một gia đình chuyển công tác xa không thể tiếp tục chăm sóc. Khi mới đến trung tâm, bé hơi bỡ ngỡ nhưng chỉ sau vài ngày được các bác sĩ vỗ về, Đậu Đậu đã trở thành "cây hài" đáng yêu nhất khu lưu trú.\n\nBé rất thông minh, đã quen đi vệ sinh đúng khay và đặc biệt thích được gãi nhẹ dưới cằm mỗi buổi chiều. Đậu Đậu phù hợp với cả gia đình ở căn hộ hoặc nhà phố.',
    storyEn:
      'Đậu Đậu joined the Animora sanctuary after his previous family relocated abroad. Shy for the first few days, he quickly blossomed into the happiest little companion in our care.\n\nHe is house-trained, gentle around children, and loves chin scratches after his afternoon walk. He thrives in either an apartment or a house.',
    createdAt: '2026-10-25',
  },
  {
    id: 'adopt-2',
    slug: 'bup-be',
    name: 'Búp Bê',
    species: 'Mèo',
    breed: 'Scottish Fold Lông Ngắn',
    breedEn: 'Scottish Fold Shorthair',
    age: '1 tuổi',
    ageEn: '1 year',
    ageMonths: 12,
    gender: 'Cái',
    weight: '3.6 kg',
    color: 'Xám bạc vân mây',
    colorEn: 'Silver Tabby',
    area: 'TP.HCM',
    areaEn: 'Ho Chi Minh City',
    distanceKm: 1.2,
    personality: 'Ngoan ngoãn, thích nằm cuộn tròn trong lòng người nghe nhạc.',
    personalityEn: 'Calm, gentle, loves curling up on warm laps and purring softly.',
    personalityTagsVi: ['Ngoan ngoãn', 'Thích ôm ấp', 'Sạch sẽ', 'Quen khay cát'],
    personalityTagsEn: ['Gentle', 'Lap cat', 'Clean', 'Litter-trained'],
    photo: '/assets/adoption/bup-be-1.jpg',
    photos: [
      '/assets/adoption/bup-be-1.jpg',
      '/assets/adoption/bup-be-2.jpg',
      '/assets/adoption/bup-be-3.jpg',
      '/assets/adoption/bup-be-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: true,
    microchip: 'VN-981020000519302',
    goodWithVi: ['Căn hộ yên tĩnh', 'Người đi làm văn phòng', 'Mèo hiền'],
    goodWithEn: ['Quiet apartments', 'Office workers', 'Gentle cats'],
    lastCheckupDate: '20/10/2026',
    vaccinations: [
      {
        id: 'v-bup-1',
        nameVi: 'Vắc-xin 4 bệnh ở mèo (FVRCP)',
        nameEn: '4-in-1 Feline Vaccine (FVRCP)',
        status: 'vaccinated',
        date: '14/07/2026',
      },
      {
        id: 'v-bup-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '12/08/2026',
      },
      {
        id: 'v-bup-3',
        nameVi: 'Siêu âm & Kiểm tra xương khớp định kỳ',
        nameEn: 'Routine Joint & Cardiac Screening',
        status: 'vaccinated',
        date: '20/10/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Đi vệ sinh đúng chỗ'],
    story:
      'Búp Bê được một bạn tình nguyện viên tìm thấy khi đang trú mưa gần Quận 1. Sau khi được chăm sóc y tế, tiêm chủng đầy đủ và triệt sản an toàn tại Animora, bộ lông xám bạc của bé đã mượt mà trở lại.\n\nBúp Bê có tính cách cực kỳ điềm tĩnh, không cào sofa và luôn phát ra tiếng kêu rừ rừ ấm áp mỗi khi được chải lông.',
    storyEn:
      'Búp Bê was rescued on a rainy evening in District 1 and brought to Animora for full veterinary care, vaccinations, and spaying.\n\nShe has a serene, affectionate personality, never scratches furniture, and purrs contentedly whenever brushed.',
    createdAt: '2026-10-22',
  },
  {
    id: 'adopt-3',
    slug: 'tuyet-nhung',
    name: 'Tuyết Nhung',
    species: 'Thỏ',
    breed: 'Thỏ Trắng New Zealand Mini',
    breedEn: 'Mini White Rabbit',
    age: '6 tháng',
    ageEn: '6 months',
    ageMonths: 6,
    gender: 'Cái',
    weight: '1.5 kg',
    color: 'Trắng tuyết',
    colorEn: 'Snow White',
    area: 'Đà Nẵng',
    areaEn: 'Da Nang',
    distanceKm: 3.1,
    personality: 'Hiền lành, sạch sẽ, thích nhấm nháp cỏ Timothy khô.',
    personalityEn: 'Gentle, tidy, loves nibbling fresh Timothy hay and nose rubs.',
    personalityTagsVi: ['Hiền lành', 'Sạch sẽ', 'Quen khay vệ sinh', 'Dạn người'],
    personalityTagsEn: ['Gentle', 'Tidy', 'Litter-trained', 'Friendly'],
    photo: '/assets/adoption/tuyet-nhung-1.jpg',
    photos: [
      '/assets/adoption/tuyet-nhung-1.jpg',
      '/assets/adoption/tuyet-nhung-2.jpg',
      '/assets/adoption/tuyet-nhung-3.jpg',
      '/assets/adoption/tuyet-nhung-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: true,
    goodWithVi: ['Gia đình yêu sự yên tĩnh', 'Căn hộ chung cư'],
    goodWithEn: ['Quiet homes', 'Apartments'],
    lastCheckupDate: '16/10/2026',
    vaccinations: [
      {
        id: 'v-tn-1',
        nameVi: 'Vắc-xin Xuất huyết Thỏ (RHDV2)',
        nameEn: 'Rabbit Hemorrhagic Disease Vaccine (RHDV2)',
        status: 'vaccinated',
        date: '02/09/2026',
      },
      {
        id: 'v-tn-2',
        nameVi: 'Kiểm tra răng cửa & răng hàm chuyên khoa',
        nameEn: 'Exotic Vet Dental Checkup',
        status: 'vaccinated',
        date: '16/10/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Quen khay vệ sinh'],
    story:
      'Tuyết Nhung sở hữu bộ lông trắng muốt mềm mại như bông gòn. Bé được chăm sóc tại chuyên khoa Thú nhỏ của Animora từ lúc 2 tháng tuổi và đã quen hoàn toàn với việc đi vệ sinh vào khay cố định.\n\nBé rất thích được vuốt nhẹ dọc sống mũi và nhảy chân sáo mỗi khi nghe tiếng mở túi cỏ Timothy thơm.',
    storyEn:
      'Tuyết Nhung has cloud-soft white fur and has been cared for by Animora’s Exotic Vet team since she was two months old.\n\nShe is fully litter-trained, loves gentle nose strokes, and does happy binkies whenever fresh Timothy hay is served.',
    createdAt: '2026-10-20',
  },
  {
    id: 'adopt-4',
    slug: 'banh-quy',
    name: 'Bánh Quy',
    species: 'Hamster',
    breed: 'Hamster Golden Syrian',
    breedEn: 'Golden Syrian Hamster',
    age: '4 tháng',
    ageEn: '4 months',
    ageMonths: 4,
    gender: 'Đực',
    weight: '0.14 kg',
    color: 'Vàng bơ kem',
    colorEn: 'Golden Cream',
    area: 'TP.HCM',
    areaEn: 'Ho Chi Minh City',
    distanceKm: 1.8,
    personality: 'Tò mò, dạn người, thích nằm ăn hạt hướng dương trên tay.',
    personalityEn: 'Curious, hand-tamed, loves holding treats with tiny paws.',
    personalityTagsVi: ['Tò mò', 'Dạn tay người', 'Không cắn', 'Năng động buổi tối'],
    personalityTagsEn: ['Curious', 'Hand-tamed', 'Never bites', 'Evening explorer'],
    photo: '/assets/adoption/banh-quy-1.jpg',
    photos: [
      '/assets/adoption/banh-quy-1.jpg',
      '/assets/adoption/banh-quy-2.jpg',
      '/assets/adoption/banh-quy-3.jpg',
      '/assets/adoption/banh-quy-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: false,
    goodWithVi: ['Người mới bắt đầu', 'Không gian bàn làm việc rộng'],
    goodWithEn: ['First-time owners', 'Spacious indoor habitats'],
    lastCheckupDate: '22/10/2026',
    vaccinations: [
      {
        id: 'v-bq-1',
        nameVi: 'Khám sàng lọc túi má & Răng cửa',
        nameEn: 'Cheek Pouch & Incisor Screening',
        status: 'vaccinated',
        date: '22/10/2026',
      },
      {
        id: 'v-bq-2',
        nameVi: 'Soi da & Phòng ngừa ký sinh trùng',
        nameEn: 'Skin & Parasite Prevention Check',
        status: 'vaccinated',
        date: '22/10/2026',
      },
    ],
    tags: ['Đã khám sàng lọc', 'Dạn người', 'Khỏe mạnh'],
    story:
      'Bánh Quy là bé Hamster Syrian có đôi mắt tròn đen nhánh và hai bàn tay nhỏ xíu luôn chắp lại mỗi khi xin đồ ăn. Bé đã được các nhân viên chăm sóc tập làm quen với hơi người từ nhỏ nên cực kỳ thân thiện.\n\nBé cần một chiếc lồng rộng thoáng có lót chuồng gỗ thông nén không bụi và vòng chạy êm ái.',
    storyEn:
      'Bánh Quy is a Golden Syrian hamster with bright dark eyes and polite tiny paws. Hand-socialized daily by our care team, he loves sitting calmly in open palms.\n\nHe is looking for a home with a spacious dust-free habitat and a silent exercise wheel.',
    createdAt: '2026-10-19',
  },
  {
    id: 'adopt-5',
    slug: 'kiwi',
    name: 'Kiwi',
    species: 'Chim',
    breed: 'Vẹt Xanh Amazona Mini',
    breedEn: 'Green Amazon Parakeet',
    age: '9 tháng',
    ageEn: '9 months',
    ageMonths: 9,
    gender: 'Đực',
    weight: '0.18 kg',
    color: 'Xanh ngọc lá cây',
    colorEn: 'Emerald Green',
    area: 'Hà Nội',
    areaEn: 'Hanoi',
    distanceKm: 4.5,
    personality: 'Lanh lợi, thích huýt sáo giai điệu vui tươi mỗi sáng.',
    personalityEn: ' cheerful, intelligent, whistles happy tunes every morning.',
    personalityTagsVi: ['Lanh lợi', 'Thích huýt sáo', 'Đậu tay người', 'Lông bóng mượt'],
    personalityTagsEn: ['Intelligent', 'Melodic whistler', 'Perches on hand', 'Healthy plumage'],
    photo: '/assets/adoption/kiwi-1.jpg',
    photos: [
      '/assets/adoption/kiwi-1.jpg',
      '/assets/adoption/kiwi-2.jpg',
      '/assets/adoption/kiwi-3.jpg',
      '/assets/adoption/kiwi-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: false,
    goodWithVi: ['Gia đình thích tiếng chim hót', 'Nhà có ban công thoáng mát'],
    goodWithEn: ['Music-loving homes', 'Well-ventilated spaces'],
    lastCheckupDate: '19/10/2026',
    vaccinations: [
      {
        id: 'v-kw-1',
        nameVi: 'Vắc-xin Polyomavirus ở vẹt cảnh',
        nameEn: 'Avian Polyomavirus Vaccine',
        status: 'vaccinated',
        date: '11/08/2026',
      },
      {
        id: 'v-kw-2',
        nameVi: 'Kiểm tra mỏ, móng & Hệ hô hấp định kỳ',
        nameEn: 'Beak, Claw & Respiratory Exam',
        status: 'vaccinated',
        date: '19/10/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Dạn người', 'Lông mượt'],
    story:
      'Kiwi có bộ lông màu xanh lá ngọc bích rực rỡ và đôi mắt vô cùng lanh lợi. Bé rất thích đậu trên cành gỗ tự nhiên, nghiêng đầu lắng nghe người trò chuyện và huýt sáo đáp lại.\n\nKiwi thích ăn hạt ngũ cốc hữu cơ kết hợp cùng táo ngọt và rau xanh tươi mỗi sáng.',
    storyEn:
      'Kiwi sports vibrant emerald feathers and a curious, expressive gaze. He loves perching on natural wood branches, tilting his head when spoken to, and whistling back.\n\nHe enjoys organic seed mixes paired with diced sweet apple and leafy greens every morning.',
    createdAt: '2026-10-17',
  },
  {
    id: 'adopt-6',
    slug: 'mat-mat',
    name: 'Mật Mật',
    species: 'Chó',
    breed: 'Corgi Pembroke',
    breedEn: 'Pembroke Welsh Corgi',
    age: '14 tháng',
    ageEn: '14 months',
    ageMonths: 14,
    gender: 'Cái',
    weight: '10.2 kg',
    color: 'Vàng cam pha trắng',
    colorEn: 'Sable & White',
    area: 'TP.HCM',
    areaEn: 'Ho Chi Minh City',
    distanceKm: 1.5,
    personality: 'Vui vẻ, hay cười, đã học các lệnh cơ bản và thích đi dạo.',
    personalityEn: 'Smiley, upbeat, knows basic commands and loves evening walks.',
    personalityTagsVi: ['Hay cười', 'Biết nghe lệnh', 'Hòa đồng', 'Thích đi dạo công viên'],
    personalityTagsEn: ['Always smiling', 'Trained', 'Sociable', 'Loves park walks'],
    photo: '/assets/adoption/mat-mat-1.jpg',
    photos: [
      '/assets/adoption/mat-mat-1.jpg',
      '/assets/adoption/mat-mat-2.jpg',
      '/assets/adoption/mat-mat-3.jpg',
      '/assets/adoption/mat-mat-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: true,
    microchip: 'VN-981020000612840',
    goodWithVi: ['Trẻ em', 'Chó và mèo khác', 'Gia đình năng động'],
    goodWithEn: ['Children', 'Other dogs & cats', 'Active families'],
    lastCheckupDate: '21/10/2026',
    vaccinations: [
      {
        id: 'v-mm-1',
        nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
        nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
        status: 'vaccinated',
        date: '05/06/2026',
      },
      {
        id: 'v-mm-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '20/06/2026',
      },
      {
        id: 'v-mm-3',
        nameVi: 'Vắc-xin Viêm phế quản truyền nhiễm (Bordetella)',
        nameEn: 'Bordetella Vaccine',
        status: 'vaccinated',
        date: '21/10/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Biết nghe lệnh'],
    story:
      'Mật Mật luôn chào đón mọi người bằng nụ cười tươi rói và đôi tai vểnh đặc trưng của dòng Corgi Pembroke. Bé đã hoàn thành khóa huấn luyện giao tiếp hành vi cơ bản tại Animora: biết ngồi, bắt tay và đi dạo ngoan bên cạnh người dẫn.\n\nMật Mật mong tìm được một gia đình có thời gian dắt bé đi dạo 20–30 phút mỗi chiều.',
    storyEn:
      'Mật Mật greets everyone with a big Corgi smile and perky ears. She has completed Animora’s foundational behavior program—she sits, shakes paws, and walks politely on a leash.\n\nShe is excited to find a loving family who enjoys 20–30 minute evening strolls.',
    createdAt: '2026-10-15',
  },
  {
    id: 'adopt-7',
    slug: 'me-den',
    name: 'Mè Đen',
    species: 'Mèo',
    breed: 'Mèo Mướp Lông Ngắn',
    breedEn: 'Domestic Silver Tabby',
    age: '5 tháng',
    ageEn: '5 months',
    ageMonths: 5,
    gender: 'Đực',
    weight: '2.4 kg',
    color: 'Xám vằn ngực trắng',
    colorEn: 'Grey Tabby & White',
    area: 'Đà Nẵng',
    areaEn: 'Da Nang',
    distanceKm: 2.0,
    personality: 'Tinh nghịch, hay giơ chân vẫy chào và thích vờn bóng len.',
    personalityEn: 'Playful, waves his front paw hello, and loves chasing yarn balls.',
    personalityTagsVi: ['Tinh nghịch', 'Biết vẫy tay chào', 'Dễ ăn', 'Quen khay cát'],
    personalityTagsEn: ['Playful', 'Waves hello', 'Good appetite', 'Litter-trained'],
    photo: '/assets/adoption/me-den-1.jpg',
    photos: [
      '/assets/adoption/me-den-1.jpg',
      '/assets/adoption/me-den-2.jpg',
      '/assets/adoption/me-den-3.jpg',
      '/assets/adoption/me-den-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: false,
    goodWithVi: ['Mèo khác', 'Trẻ em trên 6 tuổi', 'Căn hộ chung cư'],
    goodWithEn: ['Other cats', 'Children 6+', 'Apartments'],
    lastCheckupDate: '23/10/2026',
    vaccinations: [
      {
        id: 'v-md-1',
        nameVi: 'Vắc-xin 4 bệnh ở mèo mũi 1 & 2 (FVRCP)',
        nameEn: 'FVRCP Vaccine Dose 1 & 2',
        status: 'vaccinated',
        date: '15/09/2026',
      },
      {
        id: 'v-md-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'due_soon',
        date: '15/11/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Chưa triệt sản', 'Dễ gần'],
    story:
      'Mè Đen có bốn bàn chân mang "tất trắng" và thói quen giơ một chân trước lên vẫy chào mỗi khi thấy bác sĩ bước vào phòng. Bé rất lanh lợi, ăn uống giỏi và hòa đồng nhanh với các bạn mèo khác.\n\nKhi đủ 6 tháng tuổi, người nhận nuôi sẽ được hỗ trợ ưu đãi 50% chi phí triệt sản tại phòng khám Animora.',
    storyEn:
      'Mè Đen has four white "socks" and a charming habit of raising his front paw to wave hello whenever someone walks by. He is energetic, eats well, and gets along great with other cats.\n\nHis adopter will receive a 50% voucher for his neutering procedure at Animora once he turns 6 months old.',
    createdAt: '2026-10-12',
  },
  {
    id: 'adopt-8',
    slug: 'kem-bo',
    name: 'Kem Bơ',
    species: 'Chó',
    breed: 'Golden Retriever',
    breedEn: 'Golden Retriever',
    age: '7 tháng',
    ageEn: '7 months',
    ageMonths: 7,
    gender: 'Đực',
    weight: '14.5 kg',
    color: 'Vàng kem ấm',
    colorEn: 'Warm Cream Gold',
    area: 'Hà Nội',
    areaEn: 'Hanoi',
    distanceKm: 5.0,
    personality: 'Ấm áp, trung thành, thích gối đầu lên chân chủ ngủ ngon lành.',
    personalityEn: 'Warm-hearted, loyal, loves resting his head on your feet.',
    personalityTagsVi: ['Tình cảm', 'Trung thành', 'Hiền lành', 'Dễ huấn luyện'],
    personalityTagsEn: ['Affectionate', 'Loyal', 'Gentle', 'Easy to train'],
    photo: '/assets/adoption/kem-bo-1.jpg',
    photos: [
      '/assets/adoption/kem-bo-1.jpg',
      '/assets/adoption/kem-bo-2.jpg',
      '/assets/adoption/kem-bo-3.jpg',
      '/assets/adoption/kem-bo-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: true,
    microchip: 'VN-981020000734119',
    goodWithVi: ['Trẻ nhỏ', 'Gia đình nhiều thế hệ', 'Chó và mèo khác'],
    goodWithEn: ['Young children', 'Multi-generational families', 'Other pets'],
    lastCheckupDate: '14/10/2026',
    vaccinations: [
      {
        id: 'v-kb-1',
        nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
        nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
        status: 'vaccinated',
        date: '18/07/2026',
      },
      {
        id: 'v-kb-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '18/08/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Yêu trẻ nhỏ'],
    story:
      'Kem Bơ là chàng cún Golden Retriever có ánh mắt dịu dàng và trái tim ấm áp. Bé rất kiên nhẫn khi chơi đùa cùng trẻ nhỏ và luôn nhẹ nhàng đón nhận đồ chơi từ tay người chăm sóc.\n\nKem Bơ phù hợp nhất với gia đình có khoảng sân nhỏ hoặc thường xuyên đưa bé đi công viên chạy nhảy.',
    storyEn:
      'Kem Bơ is a Golden Retriever puppy with soulful eyes and a gentle heart. He is remarkably patient around children and takes treats softly from your hand.\n\nHe will thrive with a family that has a small yard or enjoys regular park outings.',
    createdAt: '2026-10-10',
  },
  {
    id: 'adopt-9',
    slug: 'cam-mat',
    name: 'Cam Mật',
    species: 'Mèo',
    breed: 'Mèo Vàng Lông Ngắn',
    breedEn: 'Ginger Domestic Shorthair',
    age: '6 tháng',
    ageEn: '6 months',
    ageMonths: 6,
    gender: 'Cái',
    weight: '2.7 kg',
    color: 'Cam mật ong pha trắng',
    colorEn: 'Honey Ginger & White',
    area: 'Huế',
    areaEn: 'Hue',
    distanceKm: 3.8,
    personality: 'Quấn người, thích tắm nắng bên cửa sổ và kêu meo nhỏ nhẹ.',
    personalityEn: 'Sweet-natured, loves sunbathing by the window and soft meows.',
    personalityTagsVi: ['Ngọt ngào', 'Thích tắm nắng', 'Sạch sẽ', 'Thân thiện'],
    personalityTagsEn: ['Sweet', 'Loves sunbeams', 'Clean', 'Friendly'],
    photo: '/assets/adoption/cam-mat-1.jpg',
    photos: [
      '/assets/adoption/cam-mat-1.jpg',
      '/assets/adoption/cam-mat-2.jpg',
      '/assets/adoption/cam-mat-3.jpg',
      '/assets/adoption/cam-mat-4.jpg',
    ],
    status: 'waiting',
    vaccinated: true,
    neutered: true,
    goodWithVi: ['Căn hộ chung cư', 'Người lớn tuổi', 'Trẻ em'],
    goodWithEn: ['Apartments', 'Seniors', 'Children'],
    lastCheckupDate: '12/10/2026',
    vaccinations: [
      {
        id: 'v-cm-1',
        nameVi: 'Vắc-xin 4 bệnh ở mèo (FVRCP)',
        nameEn: '4-in-1 Feline Vaccine (FVRCP)',
        status: 'vaccinated',
        date: '09/08/2026',
      },
      {
        id: 'v-cm-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '09/09/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Quấn người'],
    story:
      'Cam Mật có chiếc mũi hồng xinh xắn và bộ lông màu vàng cam ấm áp như nắng sớm. Bé thích nằm dài trên bệ cửa sổ đón nắng mai và dụi đầu vào tay người mỗi khi muốn được vuốt ve.\n\nBé đã được tiêm phòng đủ mũi và triệt sản khỏe mạnh, sẵn sàng về nhà mới ngay.',
    storyEn:
      'Cam Mật has a rosy pink nose and warm honey-ginger fur. She loves lounging on sunny windowsills and nudging your hand for head scratches.\n\nFully vaccinated and spayed, she is ready to join her forever family today.',
    createdAt: '2026-10-08',
  },
  {
    id: 'adopt-10',
    slug: 'bong-xu',
    name: 'Bông Xù',
    species: 'Chó',
    breed: 'Bichon Poodle Trắng',
    breedEn: 'White Bichon Poodle',
    age: '10 tháng',
    ageEn: '10 months',
    ageMonths: 10,
    gender: 'Cái',
    weight: '4.1 kg',
    color: 'Trắng kem',
    colorEn: 'Creamy White',
    area: 'TP.HCM',
    areaEn: 'Ho Chi Minh City',
    distanceKm: 1.0,
    personality: 'Thông minh, không rụng lông, rất thích được chải lông mỗi ngày.',
    personalityEn: 'Smart, hypoallergenic coat, loves daily brushing sessions.',
    personalityTagsVi: ['Không rụng lông', 'Thông minh', 'Ngoan ngoãn', 'Thích làm nũng'],
    personalityTagsEn: ['Hypoallergenic', 'Smart', 'Well-behaved', 'Cuddly'],
    photo: '/assets/adoption/bong-xu-1.jpg',
    photos: [
      '/assets/adoption/bong-xu-1.jpg',
      '/assets/adoption/bong-xu-2.jpg',
      '/assets/adoption/bong-xu-3.jpg',
      '/assets/adoption/bong-xu-4.jpg',
    ],
    status: 'adopted',
    vaccinated: true,
    neutered: true,
    microchip: 'VN-981020000811025',
    goodWithVi: ['Trẻ em', 'Người dị ứng lông thú', 'Căn hộ chung cư'],
    goodWithEn: ['Children', 'Allergy-sensitive homes', 'Apartments'],
    lastCheckupDate: '05/10/2026',
    vaccinations: [
      {
        id: 'v-bx-1',
        nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
        nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
        status: 'vaccinated',
        date: '01/06/2026',
      },
      {
        id: 'v-bx-2',
        nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
        nameEn: 'Rabies Vaccine',
        status: 'vaccinated',
        date: '15/06/2026',
      },
    ],
    tags: ['Đã tiêm phòng', 'Đã triệt sản', 'Đã có gia đình'],
    story:
      'Bông Xù đã tìm được mái ấm yêu thương tại Quận 3, TP.HCM vào đầu tháng 10/2026. Gia đình mới thường xuyên gửi hình ảnh bé đi dạo công viên và đưa bé ghé Animora spa định kỳ mỗi tháng.',
    storyEn:
      'Bông Xù found her loving forever home in District 3, Ho Chi Minh City in early October 2026. Her new family regularly shares happy updates and brings her in for monthly spa days.',
    createdAt: '2026-10-01',
  },
];

export function isPetAdopted(pet: AdoptionPet): boolean {
  return pet.status === 'adopted';
}

export function getSpeciesDisplayName(species: PetSpecies, lang: Language): string {
  if (lang === 'vi') {
    if (species === 'Chim') return 'Chim & Vẹt';
    return species;
  }
  switch (species) {
    case 'Chó':
      return 'Dog';
    case 'Mèo':
      return 'Cat';
    case 'Thỏ':
      return 'Rabbit';
    case 'Hamster':
      return 'Hamster';
    case 'Chim':
      return 'Bird & Parrot';
    default:
      return species;
  }
}

export function getGenderChipLabel(gender: 'Đực' | 'Cái', lang: Language): string {
  if (lang === 'vi') {
    return gender === 'Đực' ? 'Bé đực' : 'Bé cái';
  }
  return gender === 'Đực' ? 'Male' : 'Female';
}

export function getAdoptionSpeciesCounts(
  pets: AdoptionPet[]
): Record<AdoptionSpeciesTab, number> {
  const counts: Record<AdoptionSpeciesTab, number> = {
    All: pets.length,
    Chó: 0,
    Mèo: 0,
    Thỏ: 0,
    Hamster: 0,
    Chim: 0,
  };
  for (const pet of pets) {
    if (pet.species in counts) {
      counts[pet.species as AdoptionSpeciesTab] += 1;
    }
  }
  return counts;
}

export function filterAndSortAdoptionPets(
  pets: AdoptionPet[],
  speciesTab: AdoptionSpeciesTab,
  sortBy: AdoptionSortOption
): AdoptionPet[] {
  const filtered = pets.filter((pet) => {
    if (speciesTab === 'All') return true;
    return pet.species === speciesTab;
  });

  return [...filtered].sort((a, b) => {
    // Keep waiting pets before adopted pets unless sorting explicitly
    if (sortBy === 'youngest') {
      return (a.ageMonths ?? 12) - (b.ageMonths ?? 12);
    }
    if (sortBy === 'nearest') {
      return (a.distanceKm ?? 5) - (b.distanceKm ?? 5);
    }
    // Default 'newest': sort by createdAt descending
    const timeA = Date.parse(a.createdAt || '2026-01-01');
    const timeB = Date.parse(b.createdAt || '2026-01-01');
    return timeB - timeA;
  });
}

export interface AdoptionUrlState {
  isAdoptRoute: boolean;
  slug: string | null;
  isApplyRoute: boolean;
  isSuccessRoute: boolean;
}

export function parseAdoptionUrlPath(pathname: string): AdoptionUrlState {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/nhan-nuoi') {
    return { isAdoptRoute: true, slug: null, isApplyRoute: false, isSuccessRoute: false };
  }
  const successMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)\/dang-ky\/thanh-cong$/);
  if (successMatch) {
    return {
      isAdoptRoute: true,
      slug: decodeURIComponent(successMatch[1]),
      isApplyRoute: true,
      isSuccessRoute: true,
    };
  }
  const applyMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)\/dang-ky$/);
  if (applyMatch) {
    return {
      isAdoptRoute: true,
      slug: decodeURIComponent(applyMatch[1]),
      isApplyRoute: true,
      isSuccessRoute: false,
    };
  }
  const detailMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)$/);
  if (detailMatch) {
    return {
      isAdoptRoute: true,
      slug: decodeURIComponent(detailMatch[1]),
      isApplyRoute: false,
      isSuccessRoute: false,
    };
  }
  return { isAdoptRoute: false, slug: null, isApplyRoute: false, isSuccessRoute: false };
}

export function normalizeVietnamesePhone(raw: string): string {
  let clean = raw.trim();
  if (clean.startsWith('+84')) {
    clean = '0' + clean.slice(3);
  }
  let digits = clean.replace(/\D/g, '');
  if (digits.startsWith('84') && (digits.length === 11 || digits.length === 10)) {
    digits = '0' + digits.slice(2);
  }
  return digits;
}

export function formatVietnamesePhone(raw: string): string {
  const digits = normalizeVietnamesePhone(raw).slice(0, 11);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

export function isValidVietnamesePhone(phone: string): boolean {
  const clean = normalizeVietnamesePhone(phone);
  // Valid VN phone numbers: 10 digits starting with 03, 05, 07, 08, 09 OR 10-11 digits starting with 02
  return /^(03|05|07|08|09)\d{8}$|^02\d{8,9}$/.test(clean);
}

export function generateAdoptionRequestCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `AN-2026-${randomNum}`;
}

export interface AdoptionFormValues {
  applicantName: string;
  phone: string;
  email: string;
  area: string;
  hadPetBefore: 'yes' | 'no' | '';
  livingCondition: 'house' | 'apartment' | 'other' | '';
  notes: string;
  agreedCommitment: boolean;
}

export type AdoptionFormFieldErrors = Partial<
  Record<keyof AdoptionFormValues, { vi: string; en: string }>
>;

export function validateAdoptionForm(values: AdoptionFormValues): {
  isValid: boolean;
  errors: AdoptionFormFieldErrors;
} {
  const errors: AdoptionFormFieldErrors = {};

  const name = values.applicantName.trim();
  if (name.length < 2) {
    errors.applicantName = {
      vi: 'Vui lòng nhập họ tên của bạn (ít nhất 2 ký tự).',
      en: 'Please enter your full name (at least 2 characters).',
    };
  }

  const phone = values.phone.trim().replace(/\s+/g, '');
  if (!phone) {
    errors.phone = {
      vi: 'Vui lòng nhập số điện thoại liên hệ.',
      en: 'Please enter your phone number.',
    };
  } else if (!isValidVietnamesePhone(phone)) {
    errors.phone = {
      vi: 'Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).',
      en: 'Invalid phone number (10 digits starting with 03, 05, 07, 08, or 09).',
    };
  }

  const email = values.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = {
      vi: 'Vui lòng nhập địa chỉ email.',
      en: 'Please enter your email address.',
    };
  } else if (!emailRegex.test(email)) {
    errors.email = {
      vi: 'Địa chỉ email không đúng định dạng.',
      en: 'Please enter a valid email address.',
    };
  }

  if (!values.hadPetBefore) {
    errors.hadPetBefore = {
      vi: 'Vui lòng chọn kinh nghiệm nuôi thú cưng của bạn.',
      en: 'Please select whether you have owned a pet before.',
    };
  }

  if (!values.livingCondition) {
    errors.livingCondition = {
      vi: 'Vui lòng chọn điều kiện sống hiện tại.',
      en: 'Please select your living condition.',
    };
  }

  if (!values.agreedCommitment) {
    errors.agreedCommitment = {
      vi: 'Vui lòng xác nhận cam kết chăm sóc bé tận tâm.',
      en: 'Please confirm your commitment to care for the pet.',
    };
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
