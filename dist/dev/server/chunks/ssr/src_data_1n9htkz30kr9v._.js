module.exports = [
"[project]/src/data/adoptionData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADOPTER_REQUIREMENTS",
    ()=>ADOPTER_REQUIREMENTS,
    "ADOPTION_PETS_DATA",
    ()=>ADOPTION_PETS_DATA,
    "ADOPTION_PROCESS_STEPS",
    ()=>ADOPTION_PROCESS_STEPS,
    "ADOPTION_SPECIES_TABS",
    ()=>ADOPTION_SPECIES_TABS,
    "filterAndSortAdoptionPets",
    ()=>filterAndSortAdoptionPets,
    "formatVietnamesePhone",
    ()=>formatVietnamesePhone,
    "generateAdoptionRequestCode",
    ()=>generateAdoptionRequestCode,
    "getAdoptionSpeciesCounts",
    ()=>getAdoptionSpeciesCounts,
    "getGenderChipLabel",
    ()=>getGenderChipLabel,
    "getSpeciesDisplayName",
    ()=>getSpeciesDisplayName,
    "isPetAdopted",
    ()=>isPetAdopted,
    "isValidVietnamesePhone",
    ()=>isValidVietnamesePhone,
    "normalizeVietnamesePhone",
    ()=>normalizeVietnamesePhone,
    "parseAdoptionUrlPath",
    ()=>parseAdoptionUrlPath,
    "validateAdoptionForm",
    ()=>validateAdoptionForm
]);
const ADOPTION_SPECIES_TABS = [
    {
        id: 'All',
        labelVi: 'Tất cả',
        labelEn: 'All'
    },
    {
        id: 'Chó',
        labelVi: 'Chó',
        labelEn: 'Dogs'
    },
    {
        id: 'Mèo',
        labelVi: 'Mèo',
        labelEn: 'Cats'
    },
    {
        id: 'Thỏ',
        labelVi: 'Thỏ',
        labelEn: 'Rabbits'
    },
    {
        id: 'Hamster',
        labelVi: 'Hamster',
        labelEn: 'Hamsters'
    },
    {
        id: 'Chim',
        labelVi: 'Chim & Vẹt',
        labelEn: 'Birds & Parrots'
    }
];
const ADOPTION_PROCESS_STEPS = [
    {
        step: 1,
        shortVi: 'Chọn bé',
        shortEn: 'Choose',
        titleVi: 'Chọn bé & Gửi đăng ký',
        titleEn: 'Choose a pet & Apply',
        descVi: 'Xem hồ sơ sức khỏe, tính cách từng bé và gửi thông tin liên hệ cùng điều kiện sinh hoạt của gia đình bạn.',
        descEn: 'Review each pet’s health record and personality, then submit a short application about your home and lifestyle.'
    },
    {
        step: 2,
        shortVi: 'Gặp gỡ',
        shortEn: 'Meet',
        titleVi: 'Gặp gỡ trực tiếp tại Animora',
        titleEn: 'Meet & bond in person',
        descVi: 'Ghé trung tâm Animora để làm quen với bé, lắng nghe bác sĩ thú y tư vấn thói quen ăn uống và chăm sóc.',
        descEn: 'Visit Animora to spend time with the pet and talk with our veterinarians about their daily care routine.'
    },
    {
        step: 3,
        shortVi: 'Ký cam kết',
        shortEn: 'Sign the commitment',
        titleVi: 'Ký cam kết nhận nuôi nhân văn',
        titleEn: 'Sign the adoption commitment',
        descVi: 'Cam kết tiêm phòng định kỳ, không bỏ rơi và giữ liên lạc cập nhật tình hình của bé trong thời gian đầu.',
        descEn: 'Commit to routine vaccinations, lifelong care without abandonment, and periodic check-in updates.'
    },
    {
        step: 4,
        shortVi: 'Đón về nhà',
        shortEn: 'Take home',
        titleVi: 'Đón bé về mái ấm mới',
        titleEn: 'Welcome your new friend home',
        descVi: 'Nhận Sổ sức khỏe điện tử của bé và hưởng ưu đãi 20% chi phí khám định kỳ trọn đời tại hệ thống Animora.',
        descEn: 'Receive the pet’s Digital Health Passport along with a lifetime 20% discount on routine checkups at Animora.'
    }
];
const ADOPTER_REQUIREMENTS = [
    {
        vi: 'Chỗ ở ổn định, an toàn (nhà riêng hoặc căn hộ cho phép nuôi thú cưng) và có sự đồng thuận của các thành viên trong gia đình.',
        en: 'Stable, pet-friendly housing (house or apartment permitting pets) with full agreement from all household members.'
    },
    {
        vi: 'Cam kết tiêm phòng nhắc lại, tẩy giun định kỳ và đưa bé đi khám thú y kịp thời khi có dấu hiệu bất thường.',
        en: 'Commitment to annual booster vaccinations, routine deworming, and prompt veterinary care whenever needed.'
    },
    {
        vi: 'Đồng ý chia sẻ hình ảnh/video cập nhật tình hình của bé cho đội ngũ Animora trong 6 tháng đầu sau khi đón về.',
        en: 'Willingness to share periodic photo/video updates with the Animora team during the first 6 months after adoption.'
    },
    {
        vi: 'Tuyệt đối không bỏ rơi, chuyển nhượng trái phép hoặc nuôi nhốt bé trong lồng chật hẹp thiếu ánh sáng.',
        en: 'Zero tolerance for abandonment, unauthorized rehoming, or confining the pet in cramped cages.'
    }
];
const ADOPTION_PETS_DATA = [
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
        personalityTagsVi: [
            'Hiếu động',
            'Quấn người',
            'Thân thiện với trẻ nhỏ',
            'Biết ngồi chờ ăn'
        ],
        personalityTagsEn: [
            'Playful',
            'Affectionate',
            'Kid-friendly',
            'Polite at mealtime'
        ],
        photo: '/assets/adoption/dau-dau-1.jpg',
        photos: [
            '/assets/adoption/dau-dau-1.jpg',
            '/assets/adoption/dau-dau-2.jpg',
            '/assets/adoption/dau-dau-3.jpg',
            '/assets/adoption/dau-dau-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: false,
        microchip: 'VN-981020000482194',
        goodWithVi: [
            'Trẻ em',
            'Chó hiền',
            'Căn hộ chung cư'
        ],
        goodWithEn: [
            'Children',
            'Friendly dogs',
            'Apartments'
        ],
        lastCheckupDate: '18/10/2026',
        vaccinations: [
            {
                id: 'v-dau-1',
                nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
                nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
                status: 'vaccinated',
                date: '10/08/2026'
            },
            {
                id: 'v-dau-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '05/09/2026'
            },
            {
                id: 'v-dau-3',
                nameVi: 'Tẩy giun & Phòng ve rận định kỳ Q4',
                nameEn: 'Q4 Deworming & Tick Prevention',
                status: 'due_soon',
                date: '15/11/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Chưa triệt sản',
            'Thân thiện'
        ],
        story: 'Đậu Đậu được đội ngũ Animora tiếp nhận từ một gia đình chuyển công tác xa không thể tiếp tục chăm sóc. Khi mới đến trung tâm, bé hơi bỡ ngỡ nhưng chỉ sau vài ngày được các bác sĩ vỗ về, Đậu Đậu đã trở thành "cây hài" đáng yêu nhất khu lưu trú.\n\nBé rất thông minh, đã quen đi vệ sinh đúng khay và đặc biệt thích được gãi nhẹ dưới cằm mỗi buổi chiều. Đậu Đậu phù hợp với cả gia đình ở căn hộ hoặc nhà phố.',
        storyEn: 'Đậu Đậu joined the Animora sanctuary after his previous family relocated abroad. Shy for the first few days, he quickly blossomed into the happiest little companion in our care.\n\nHe is house-trained, gentle around children, and loves chin scratches after his afternoon walk. He thrives in either an apartment or a house.',
        createdAt: '2026-10-25'
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
        personalityTagsVi: [
            'Ngoan ngoãn',
            'Thích ôm ấp',
            'Sạch sẽ',
            'Quen khay cát'
        ],
        personalityTagsEn: [
            'Gentle',
            'Lap cat',
            'Clean',
            'Litter-trained'
        ],
        photo: '/assets/adoption/bup-be-1.jpg',
        photos: [
            '/assets/adoption/bup-be-1.jpg',
            '/assets/adoption/bup-be-2.jpg',
            '/assets/adoption/bup-be-3.jpg',
            '/assets/adoption/bup-be-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: true,
        microchip: 'VN-981020000519302',
        goodWithVi: [
            'Căn hộ yên tĩnh',
            'Người đi làm văn phòng',
            'Mèo hiền'
        ],
        goodWithEn: [
            'Quiet apartments',
            'Office workers',
            'Gentle cats'
        ],
        lastCheckupDate: '20/10/2026',
        vaccinations: [
            {
                id: 'v-bup-1',
                nameVi: 'Vắc-xin 4 bệnh ở mèo (FVRCP)',
                nameEn: '4-in-1 Feline Vaccine (FVRCP)',
                status: 'vaccinated',
                date: '14/07/2026'
            },
            {
                id: 'v-bup-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '12/08/2026'
            },
            {
                id: 'v-bup-3',
                nameVi: 'Siêu âm & Kiểm tra xương khớp định kỳ',
                nameEn: 'Routine Joint & Cardiac Screening',
                status: 'vaccinated',
                date: '20/10/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Đi vệ sinh đúng chỗ'
        ],
        story: 'Búp Bê được một bạn tình nguyện viên tìm thấy khi đang trú mưa gần Quận 1. Sau khi được chăm sóc y tế, tiêm chủng đầy đủ và triệt sản an toàn tại Animora, bộ lông xám bạc của bé đã mượt mà trở lại.\n\nBúp Bê có tính cách cực kỳ điềm tĩnh, không cào sofa và luôn phát ra tiếng kêu rừ rừ ấm áp mỗi khi được chải lông.',
        storyEn: 'Búp Bê was rescued on a rainy evening in District 1 and brought to Animora for full veterinary care, vaccinations, and spaying.\n\nShe has a serene, affectionate personality, never scratches furniture, and purrs contentedly whenever brushed.',
        createdAt: '2026-10-22'
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
        personalityTagsVi: [
            'Hiền lành',
            'Sạch sẽ',
            'Quen khay vệ sinh',
            'Dạn người'
        ],
        personalityTagsEn: [
            'Gentle',
            'Tidy',
            'Litter-trained',
            'Friendly'
        ],
        photo: '/assets/adoption/tuyet-nhung-1.jpg',
        photos: [
            '/assets/adoption/tuyet-nhung-1.jpg',
            '/assets/adoption/tuyet-nhung-2.jpg',
            '/assets/adoption/tuyet-nhung-3.jpg',
            '/assets/adoption/tuyet-nhung-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: true,
        goodWithVi: [
            'Gia đình yêu sự yên tĩnh',
            'Căn hộ chung cư'
        ],
        goodWithEn: [
            'Quiet homes',
            'Apartments'
        ],
        lastCheckupDate: '16/10/2026',
        vaccinations: [
            {
                id: 'v-tn-1',
                nameVi: 'Vắc-xin Xuất huyết Thỏ (RHDV2)',
                nameEn: 'Rabbit Hemorrhagic Disease Vaccine (RHDV2)',
                status: 'vaccinated',
                date: '02/09/2026'
            },
            {
                id: 'v-tn-2',
                nameVi: 'Kiểm tra răng cửa & răng hàm chuyên khoa',
                nameEn: 'Exotic Vet Dental Checkup',
                status: 'vaccinated',
                date: '16/10/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Quen khay vệ sinh'
        ],
        story: 'Tuyết Nhung sở hữu bộ lông trắng muốt mềm mại như bông gòn. Bé được chăm sóc tại chuyên khoa Thú nhỏ của Animora từ lúc 2 tháng tuổi và đã quen hoàn toàn với việc đi vệ sinh vào khay cố định.\n\nBé rất thích được vuốt nhẹ dọc sống mũi và nhảy chân sáo mỗi khi nghe tiếng mở túi cỏ Timothy thơm.',
        storyEn: 'Tuyết Nhung has cloud-soft white fur and has been cared for by Animora’s Exotic Vet team since she was two months old.\n\nShe is fully litter-trained, loves gentle nose strokes, and does happy binkies whenever fresh Timothy hay is served.',
        createdAt: '2026-10-20'
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
        personalityTagsVi: [
            'Tò mò',
            'Dạn tay người',
            'Không cắn',
            'Năng động buổi tối'
        ],
        personalityTagsEn: [
            'Curious',
            'Hand-tamed',
            'Never bites',
            'Evening explorer'
        ],
        photo: '/assets/adoption/banh-quy-1.jpg',
        photos: [
            '/assets/adoption/banh-quy-1.jpg',
            '/assets/adoption/banh-quy-2.jpg',
            '/assets/adoption/banh-quy-3.jpg',
            '/assets/adoption/banh-quy-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: false,
        goodWithVi: [
            'Người mới bắt đầu',
            'Không gian bàn làm việc rộng'
        ],
        goodWithEn: [
            'First-time owners',
            'Spacious indoor habitats'
        ],
        lastCheckupDate: '22/10/2026',
        vaccinations: [
            {
                id: 'v-bq-1',
                nameVi: 'Khám sàng lọc túi má & Răng cửa',
                nameEn: 'Cheek Pouch & Incisor Screening',
                status: 'vaccinated',
                date: '22/10/2026'
            },
            {
                id: 'v-bq-2',
                nameVi: 'Soi da & Phòng ngừa ký sinh trùng',
                nameEn: 'Skin & Parasite Prevention Check',
                status: 'vaccinated',
                date: '22/10/2026'
            }
        ],
        tags: [
            'Đã khám sàng lọc',
            'Dạn người',
            'Khỏe mạnh'
        ],
        story: 'Bánh Quy là bé Hamster Syrian có đôi mắt tròn đen nhánh và hai bàn tay nhỏ xíu luôn chắp lại mỗi khi xin đồ ăn. Bé đã được các nhân viên chăm sóc tập làm quen với hơi người từ nhỏ nên cực kỳ thân thiện.\n\nBé cần một chiếc lồng rộng thoáng có lót chuồng gỗ thông nén không bụi và vòng chạy êm ái.',
        storyEn: 'Bánh Quy is a Golden Syrian hamster with bright dark eyes and polite tiny paws. Hand-socialized daily by our care team, he loves sitting calmly in open palms.\n\nHe is looking for a home with a spacious dust-free habitat and a silent exercise wheel.',
        createdAt: '2026-10-19'
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
        personalityTagsVi: [
            'Lanh lợi',
            'Thích huýt sáo',
            'Đậu tay người',
            'Lông bóng mượt'
        ],
        personalityTagsEn: [
            'Intelligent',
            'Melodic whistler',
            'Perches on hand',
            'Healthy plumage'
        ],
        photo: '/assets/adoption/kiwi-1.jpg',
        photos: [
            '/assets/adoption/kiwi-1.jpg',
            '/assets/adoption/kiwi-2.jpg',
            '/assets/adoption/kiwi-3.jpg',
            '/assets/adoption/kiwi-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: false,
        goodWithVi: [
            'Gia đình thích tiếng chim hót',
            'Nhà có ban công thoáng mát'
        ],
        goodWithEn: [
            'Music-loving homes',
            'Well-ventilated spaces'
        ],
        lastCheckupDate: '19/10/2026',
        vaccinations: [
            {
                id: 'v-kw-1',
                nameVi: 'Vắc-xin Polyomavirus ở vẹt cảnh',
                nameEn: 'Avian Polyomavirus Vaccine',
                status: 'vaccinated',
                date: '11/08/2026'
            },
            {
                id: 'v-kw-2',
                nameVi: 'Kiểm tra mỏ, móng & Hệ hô hấp định kỳ',
                nameEn: 'Beak, Claw & Respiratory Exam',
                status: 'vaccinated',
                date: '19/10/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Dạn người',
            'Lông mượt'
        ],
        story: 'Kiwi có bộ lông màu xanh lá ngọc bích rực rỡ và đôi mắt vô cùng lanh lợi. Bé rất thích đậu trên cành gỗ tự nhiên, nghiêng đầu lắng nghe người trò chuyện và huýt sáo đáp lại.\n\nKiwi thích ăn hạt ngũ cốc hữu cơ kết hợp cùng táo ngọt và rau xanh tươi mỗi sáng.',
        storyEn: 'Kiwi sports vibrant emerald feathers and a curious, expressive gaze. He loves perching on natural wood branches, tilting his head when spoken to, and whistling back.\n\nHe enjoys organic seed mixes paired with diced sweet apple and leafy greens every morning.',
        createdAt: '2026-10-17'
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
        personalityTagsVi: [
            'Hay cười',
            'Biết nghe lệnh',
            'Hòa đồng',
            'Thích đi dạo công viên'
        ],
        personalityTagsEn: [
            'Always smiling',
            'Trained',
            'Sociable',
            'Loves park walks'
        ],
        photo: '/assets/adoption/mat-mat-1.jpg',
        photos: [
            '/assets/adoption/mat-mat-1.jpg',
            '/assets/adoption/mat-mat-2.jpg',
            '/assets/adoption/mat-mat-3.jpg',
            '/assets/adoption/mat-mat-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: true,
        microchip: 'VN-981020000612840',
        goodWithVi: [
            'Trẻ em',
            'Chó và mèo khác',
            'Gia đình năng động'
        ],
        goodWithEn: [
            'Children',
            'Other dogs & cats',
            'Active families'
        ],
        lastCheckupDate: '21/10/2026',
        vaccinations: [
            {
                id: 'v-mm-1',
                nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
                nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
                status: 'vaccinated',
                date: '05/06/2026'
            },
            {
                id: 'v-mm-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '20/06/2026'
            },
            {
                id: 'v-mm-3',
                nameVi: 'Vắc-xin Viêm phế quản truyền nhiễm (Bordetella)',
                nameEn: 'Bordetella Vaccine',
                status: 'vaccinated',
                date: '21/10/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Biết nghe lệnh'
        ],
        story: 'Mật Mật luôn chào đón mọi người bằng nụ cười tươi rói và đôi tai vểnh đặc trưng của dòng Corgi Pembroke. Bé đã hoàn thành khóa huấn luyện giao tiếp hành vi cơ bản tại Animora: biết ngồi, bắt tay và đi dạo ngoan bên cạnh người dẫn.\n\nMật Mật mong tìm được một gia đình có thời gian dắt bé đi dạo 20–30 phút mỗi chiều.',
        storyEn: 'Mật Mật greets everyone with a big Corgi smile and perky ears. She has completed Animora’s foundational behavior program—she sits, shakes paws, and walks politely on a leash.\n\nShe is excited to find a loving family who enjoys 20–30 minute evening strolls.',
        createdAt: '2026-10-15'
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
        personalityTagsVi: [
            'Tinh nghịch',
            'Biết vẫy tay chào',
            'Dễ ăn',
            'Quen khay cát'
        ],
        personalityTagsEn: [
            'Playful',
            'Waves hello',
            'Good appetite',
            'Litter-trained'
        ],
        photo: '/assets/adoption/me-den-1.jpg',
        photos: [
            '/assets/adoption/me-den-1.jpg',
            '/assets/adoption/me-den-2.jpg',
            '/assets/adoption/me-den-3.jpg',
            '/assets/adoption/me-den-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: false,
        goodWithVi: [
            'Mèo khác',
            'Trẻ em trên 6 tuổi',
            'Căn hộ chung cư'
        ],
        goodWithEn: [
            'Other cats',
            'Children 6+',
            'Apartments'
        ],
        lastCheckupDate: '23/10/2026',
        vaccinations: [
            {
                id: 'v-md-1',
                nameVi: 'Vắc-xin 4 bệnh ở mèo mũi 1 & 2 (FVRCP)',
                nameEn: 'FVRCP Vaccine Dose 1 & 2',
                status: 'vaccinated',
                date: '15/09/2026'
            },
            {
                id: 'v-md-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'due_soon',
                date: '15/11/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Chưa triệt sản',
            'Dễ gần'
        ],
        story: 'Mè Đen có bốn bàn chân mang "tất trắng" và thói quen giơ một chân trước lên vẫy chào mỗi khi thấy bác sĩ bước vào phòng. Bé rất lanh lợi, ăn uống giỏi và hòa đồng nhanh với các bạn mèo khác.\n\nKhi đủ 6 tháng tuổi, người nhận nuôi sẽ được hỗ trợ ưu đãi 50% chi phí triệt sản tại phòng khám Animora.',
        storyEn: 'Mè Đen has four white "socks" and a charming habit of raising his front paw to wave hello whenever someone walks by. He is energetic, eats well, and gets along great with other cats.\n\nHis adopter will receive a 50% voucher for his neutering procedure at Animora once he turns 6 months old.',
        createdAt: '2026-10-12'
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
        personalityTagsVi: [
            'Tình cảm',
            'Trung thành',
            'Hiền lành',
            'Dễ huấn luyện'
        ],
        personalityTagsEn: [
            'Affectionate',
            'Loyal',
            'Gentle',
            'Easy to train'
        ],
        photo: '/assets/adoption/kem-bo-1.jpg',
        photos: [
            '/assets/adoption/kem-bo-1.jpg',
            '/assets/adoption/kem-bo-2.jpg',
            '/assets/adoption/kem-bo-3.jpg',
            '/assets/adoption/kem-bo-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: true,
        microchip: 'VN-981020000734119',
        goodWithVi: [
            'Trẻ nhỏ',
            'Gia đình nhiều thế hệ',
            'Chó và mèo khác'
        ],
        goodWithEn: [
            'Young children',
            'Multi-generational families',
            'Other pets'
        ],
        lastCheckupDate: '14/10/2026',
        vaccinations: [
            {
                id: 'v-kb-1',
                nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
                nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
                status: 'vaccinated',
                date: '18/07/2026'
            },
            {
                id: 'v-kb-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '18/08/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Yêu trẻ nhỏ'
        ],
        story: 'Kem Bơ là chàng cún Golden Retriever có ánh mắt dịu dàng và trái tim ấm áp. Bé rất kiên nhẫn khi chơi đùa cùng trẻ nhỏ và luôn nhẹ nhàng đón nhận đồ chơi từ tay người chăm sóc.\n\nKem Bơ phù hợp nhất với gia đình có khoảng sân nhỏ hoặc thường xuyên đưa bé đi công viên chạy nhảy.',
        storyEn: 'Kem Bơ is a Golden Retriever puppy with soulful eyes and a gentle heart. He is remarkably patient around children and takes treats softly from your hand.\n\nHe will thrive with a family that has a small yard or enjoys regular park outings.',
        createdAt: '2026-10-10'
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
        personalityTagsVi: [
            'Ngọt ngào',
            'Thích tắm nắng',
            'Sạch sẽ',
            'Thân thiện'
        ],
        personalityTagsEn: [
            'Sweet',
            'Loves sunbeams',
            'Clean',
            'Friendly'
        ],
        photo: '/assets/adoption/cam-mat-1.jpg',
        photos: [
            '/assets/adoption/cam-mat-1.jpg',
            '/assets/adoption/cam-mat-2.jpg',
            '/assets/adoption/cam-mat-3.jpg',
            '/assets/adoption/cam-mat-4.jpg'
        ],
        status: 'waiting',
        vaccinated: true,
        neutered: true,
        goodWithVi: [
            'Căn hộ chung cư',
            'Người lớn tuổi',
            'Trẻ em'
        ],
        goodWithEn: [
            'Apartments',
            'Seniors',
            'Children'
        ],
        lastCheckupDate: '12/10/2026',
        vaccinations: [
            {
                id: 'v-cm-1',
                nameVi: 'Vắc-xin 4 bệnh ở mèo (FVRCP)',
                nameEn: '4-in-1 Feline Vaccine (FVRCP)',
                status: 'vaccinated',
                date: '09/08/2026'
            },
            {
                id: 'v-cm-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '09/09/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Quấn người'
        ],
        story: 'Cam Mật có chiếc mũi hồng xinh xắn và bộ lông màu vàng cam ấm áp như nắng sớm. Bé thích nằm dài trên bệ cửa sổ đón nắng mai và dụi đầu vào tay người mỗi khi muốn được vuốt ve.\n\nBé đã được tiêm phòng đủ mũi và triệt sản khỏe mạnh, sẵn sàng về nhà mới ngay.',
        storyEn: 'Cam Mật has a rosy pink nose and warm honey-ginger fur. She loves lounging on sunny windowsills and nudging your hand for head scratches.\n\nFully vaccinated and spayed, she is ready to join her forever family today.',
        createdAt: '2026-10-08'
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
        personalityTagsVi: [
            'Không rụng lông',
            'Thông minh',
            'Ngoan ngoãn',
            'Thích làm nũng'
        ],
        personalityTagsEn: [
            'Hypoallergenic',
            'Smart',
            'Well-behaved',
            'Cuddly'
        ],
        photo: '/assets/adoption/bong-xu-1.jpg',
        photos: [
            '/assets/adoption/bong-xu-1.jpg',
            '/assets/adoption/bong-xu-2.jpg',
            '/assets/adoption/bong-xu-3.jpg',
            '/assets/adoption/bong-xu-4.jpg'
        ],
        status: 'adopted',
        vaccinated: true,
        neutered: true,
        microchip: 'VN-981020000811025',
        goodWithVi: [
            'Trẻ em',
            'Người dị ứng lông thú',
            'Căn hộ chung cư'
        ],
        goodWithEn: [
            'Children',
            'Allergy-sensitive homes',
            'Apartments'
        ],
        lastCheckupDate: '05/10/2026',
        vaccinations: [
            {
                id: 'v-bx-1',
                nameVi: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
                nameEn: '7-in-1 Canine Vaccine (DHPPi-L)',
                status: 'vaccinated',
                date: '01/06/2026'
            },
            {
                id: 'v-bx-2',
                nameVi: 'Vắc-xin phòng bệnh Dại (Rabies)',
                nameEn: 'Rabies Vaccine',
                status: 'vaccinated',
                date: '15/06/2026'
            }
        ],
        tags: [
            'Đã tiêm phòng',
            'Đã triệt sản',
            'Đã có gia đình'
        ],
        story: 'Bông Xù đã tìm được mái ấm yêu thương tại Quận 3, TP.HCM vào đầu tháng 10/2026. Gia đình mới thường xuyên gửi hình ảnh bé đi dạo công viên và đưa bé ghé Animora spa định kỳ mỗi tháng.',
        storyEn: 'Bông Xù found her loving forever home in District 3, Ho Chi Minh City in early October 2026. Her new family regularly shares happy updates and brings her in for monthly spa days.',
        createdAt: '2026-10-01'
    }
];
function isPetAdopted(pet) {
    return pet.status === 'adopted';
}
function getSpeciesDisplayName(species, lang) {
    if (lang === 'vi') {
        if (species === 'Chim') return 'Chim & Vẹt';
        return species;
    }
    switch(species){
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
function getGenderChipLabel(gender, lang) {
    if (lang === 'vi') {
        return gender === 'Đực' ? 'Bé đực' : 'Bé cái';
    }
    return gender === 'Đực' ? 'Male' : 'Female';
}
function getAdoptionSpeciesCounts(pets) {
    const counts = {
        All: pets.length,
        Chó: 0,
        Mèo: 0,
        Thỏ: 0,
        Hamster: 0,
        Chim: 0
    };
    for (const pet of pets){
        if (pet.species in counts) {
            counts[pet.species] += 1;
        }
    }
    return counts;
}
function filterAndSortAdoptionPets(pets, speciesTab, sortBy) {
    const filtered = pets.filter((pet)=>{
        if (speciesTab === 'All') return true;
        return pet.species === speciesTab;
    });
    return [
        ...filtered
    ].sort((a, b)=>{
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
function parseAdoptionUrlPath(pathname) {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/nhan-nuoi') {
        return {
            isAdoptRoute: true,
            slug: null,
            isApplyRoute: false,
            isSuccessRoute: false
        };
    }
    const successMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)\/dang-ky\/thanh-cong$/);
    if (successMatch) {
        return {
            isAdoptRoute: true,
            slug: decodeURIComponent(successMatch[1]),
            isApplyRoute: true,
            isSuccessRoute: true
        };
    }
    const applyMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)\/dang-ky$/);
    if (applyMatch) {
        return {
            isAdoptRoute: true,
            slug: decodeURIComponent(applyMatch[1]),
            isApplyRoute: true,
            isSuccessRoute: false
        };
    }
    const detailMatch = clean.match(/^\/nhan-nuoi\/([^/?#]+)$/);
    if (detailMatch) {
        return {
            isAdoptRoute: true,
            slug: decodeURIComponent(detailMatch[1]),
            isApplyRoute: false,
            isSuccessRoute: false
        };
    }
    return {
        isAdoptRoute: false,
        slug: null,
        isApplyRoute: false,
        isSuccessRoute: false
    };
}
function normalizeVietnamesePhone(raw) {
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
function formatVietnamesePhone(raw) {
    const digits = normalizeVietnamesePhone(raw).slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}
function isValidVietnamesePhone(phone) {
    const clean = normalizeVietnamesePhone(phone);
    // Valid VN phone numbers: 10 digits starting with 03, 05, 07, 08, 09 OR 10-11 digits starting with 02
    return /^(03|05|07|08|09)\d{8}$|^02\d{8,9}$/.test(clean);
}
function generateAdoptionRequestCode() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `AN-2026-${randomNum}`;
}
function validateAdoptionForm(values) {
    const errors = {};
    const name = values.applicantName.trim();
    if (name.length < 2) {
        errors.applicantName = {
            vi: 'Vui lòng nhập họ tên của bạn (ít nhất 2 ký tự).',
            en: 'Please enter your full name (at least 2 characters).'
        };
    }
    const phone = values.phone.trim().replace(/\s+/g, '');
    if (!phone) {
        errors.phone = {
            vi: 'Vui lòng nhập số điện thoại liên hệ.',
            en: 'Please enter your phone number.'
        };
    } else if (!isValidVietnamesePhone(phone)) {
        errors.phone = {
            vi: 'Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).',
            en: 'Invalid phone number (10 digits starting with 03, 05, 07, 08, or 09).'
        };
    }
    const email = values.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = {
            vi: 'Vui lòng nhập địa chỉ email.',
            en: 'Please enter your email address.'
        };
    } else if (!emailRegex.test(email)) {
        errors.email = {
            vi: 'Địa chỉ email không đúng định dạng.',
            en: 'Please enter a valid email address.'
        };
    }
    if (!values.hadPetBefore) {
        errors.hadPetBefore = {
            vi: 'Vui lòng chọn kinh nghiệm nuôi thú cưng của bạn.',
            en: 'Please select whether you have owned a pet before.'
        };
    }
    if (!values.livingCondition) {
        errors.livingCondition = {
            vi: 'Vui lòng chọn điều kiện sống hiện tại.',
            en: 'Please select your living condition.'
        };
    }
    if (!values.agreedCommitment) {
        errors.agreedCommitment = {
            vi: 'Vui lòng xác nhận cam kết chăm sóc bé tận tâm.',
            en: 'Please confirm your commitment to care for the pet.'
        };
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
}),
"[project]/src/data/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialAdoptionPets",
    ()=>initialAdoptionPets,
    "initialPets",
    ()=>initialPets,
    "initialProducts",
    ()=>initialProducts,
    "initialVaccinations",
    ()=>initialVaccinations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$adoptionData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/adoptionData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/shopData.ts [app-ssr] (ecmascript)");
;
;
const initialPets = [
    {
        id: 'pet-1',
        name: 'Mây Mây',
        species: 'Mèo',
        breed: 'Scottish Fold',
        gender: 'Cái',
        age: '2 tuổi',
        weight: '3.8 kg',
        photo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
        nextCheckupDate: '15/11/2026',
        owner: 'Nguyễn Thảo Nhi'
    },
    {
        id: 'pet-2',
        name: 'Bơ',
        species: 'Chó',
        breed: 'Golden Retriever',
        gender: 'Đực',
        age: '1.5 tuổi',
        weight: '24.5 kg',
        photo: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
        nextCheckupDate: '02/12/2026',
        owner: 'Trần Minh Quân'
    },
    {
        id: 'pet-3',
        name: 'Bông Gòn',
        species: 'Thỏ',
        breed: 'Thỏ Holland Lop',
        gender: 'Cái',
        age: '9 tháng',
        weight: '1.6 kg',
        photo: '/assets/adoption/tuyet-nhung-1.jpg',
        nextCheckupDate: '18/11/2026',
        owner: 'Lê Minh Châu'
    },
    {
        id: 'pet-4',
        name: 'Hạt Dẻ',
        species: 'Hamster',
        breed: 'Golden Syrian Hamster',
        gender: 'Đực',
        age: '6 tháng',
        weight: '0.14 kg',
        photo: '/assets/adoption/banh-quy-1.jpg',
        nextCheckupDate: '25/11/2026',
        owner: 'Vũ Hoàng Nam'
    },
    {
        id: 'pet-5',
        name: 'Rio',
        species: 'Chim',
        breed: 'Vẹt Cockatiel Má Hồng',
        gender: 'Đực',
        age: '1 tuổi',
        weight: '0.11 kg',
        photo: '/assets/adoption/kiwi-1.jpg',
        nextCheckupDate: '10/12/2026',
        owner: 'Phạm Bảo Ngọc'
    },
    {
        id: 'pet-6',
        name: 'Mochi',
        species: 'Chó',
        breed: 'Toy Poodle',
        gender: 'Cái',
        age: '10 tháng',
        weight: '4.2 kg',
        photo: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
        nextCheckupDate: '20/11/2026',
        owner: 'Lê Hoài Anh'
    }
];
const initialVaccinations = [
    // Mây Mây (Mèo)
    {
        id: 'vac-1',
        petId: 'pet-1',
        vaccineName: 'Dại (Rabies Virus)',
        status: 'vaccinated',
        date: '10/05/2026'
    },
    {
        id: 'vac-2',
        petId: 'pet-1',
        vaccineName: '4 Bệnh ở mèo (FVRCP)',
        status: 'vaccinated',
        date: '12/06/2026'
    },
    {
        id: 'vac-3',
        petId: 'pet-1',
        vaccineName: 'Xổ giun định kỳ Q4',
        status: 'due_soon',
        date: '20/11/2026'
    },
    // Bơ (Chó)
    {
        id: 'vac-4',
        petId: 'pet-2',
        vaccineName: '7 Bệnh ở chó (DHPP)',
        status: 'vaccinated',
        date: '01/04/2026'
    },
    {
        id: 'vac-5',
        petId: 'pet-2',
        vaccineName: 'Bệnh Dại (Rabies)',
        status: 'vaccinated',
        date: '15/04/2026'
    },
    {
        id: 'vac-6',
        petId: 'pet-2',
        vaccineName: 'Viêm phế quản (Bordetella)',
        status: 'due_soon',
        date: '10/11/2026'
    },
    // Bông Gòn (Thỏ)
    {
        id: 'vac-7',
        petId: 'pet-3',
        vaccineName: 'Vắc-xin Xuất huyết Thỏ (RHDV)',
        status: 'vaccinated',
        date: '14/06/2026'
    },
    {
        id: 'vac-8',
        petId: 'pet-3',
        vaccineName: 'Kiểm tra & Mài răng định kỳ',
        status: 'due_soon',
        date: '18/11/2026'
    },
    // Hạt Dẻ (Hamster)
    {
        id: 'vac-9',
        petId: 'pet-4',
        vaccineName: 'Khám tổng quát & Kiểm tra túi má',
        status: 'vaccinated',
        date: '02/09/2026'
    },
    {
        id: 'vac-10',
        petId: 'pet-4',
        vaccineName: 'Chăm sóc da lông & Ký sinh trùng',
        status: 'due_soon',
        date: '25/11/2026'
    },
    // Rio (Chim / Vẹt)
    {
        id: 'vac-11',
        petId: 'pet-5',
        vaccineName: 'Vắc-xin Polyomavirus ở vẹt',
        status: 'vaccinated',
        date: '19/07/2026'
    },
    {
        id: 'vac-12',
        petId: 'pet-5',
        vaccineName: 'Tỉa móng & Kiểm tra mỏ định kỳ',
        status: 'due_soon',
        date: '10/12/2026'
    },
    // Mochi (Chó)
    {
        id: 'vac-13',
        petId: 'pet-6',
        vaccineName: '5 Bệnh ở chó puppy',
        status: 'vaccinated',
        date: '05/08/2026'
    },
    {
        id: 'vac-14',
        petId: 'pet-6',
        vaccineName: 'Bệnh Dại (Rabies)',
        status: 'not_yet',
        date: '01/12/2026'
    }
];
const initialAdoptionPets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$adoptionData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ADOPTION_PETS_DATA"];
const initialProducts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHOP_PRODUCTS"];
}),
"[project]/src/data/petProfilesData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_CARE_RECORDS",
    ()=>INITIAL_CARE_RECORDS,
    "INITIAL_PET_PROFILES",
    ()=>INITIAL_PET_PROFILES,
    "INITIAL_WEIGHT_LOGS",
    ()=>INITIAL_WEIGHT_LOGS,
    "computeDaysFromToday",
    ()=>computeDaysFromToday,
    "computeWeightTrend",
    ()=>computeWeightTrend,
    "evaluateCareRecordDue",
    ()=>evaluateCareRecordDue,
    "formatAgeWithDob",
    ()=>formatAgeWithDob,
    "formatDisplayDate",
    ()=>formatDisplayDate,
    "formatWeightNumber",
    ()=>formatWeightNumber,
    "getCareRecordStatusBadge",
    ()=>getCareRecordStatusBadge,
    "getNearestReminderForPet",
    ()=>getNearestReminderForPet,
    "hasPetDueSoonOrOverdue",
    ()=>hasPetDueSoonOrOverdue,
    "mapCareTypeToBookingService",
    ()=>mapCareTypeToBookingService,
    "offsetDaysIso",
    ()=>offsetDaysIso,
    "parseLocalDate",
    ()=>parseLocalDate,
    "sortAndGroupCareRecords",
    ()=>sortAndGroupCareRecords,
    "toLocalIsoDate",
    ()=>toLocalIsoDate,
    "translateGender",
    ()=>translateGender,
    "translateSpecies",
    ()=>translateSpecies,
    "validateCareRecordInput",
    ()=>validateCareRecordInput
]);
function toLocalIsoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function offsetDaysIso(days, baseDate = new Date()) {
    const copy = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    copy.setDate(copy.getDate() + days);
    return toLocalIsoDate(copy);
}
function parseLocalDate(dateStr) {
    if (!dateStr || !dateStr.trim()) return null;
    const clean = dateStr.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
        const [y, m, d] = clean.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
        const [d, m, y] = clean.split('/').map(Number);
        return new Date(y, m - 1, d);
    }
    const parsed = new Date(clean);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}
function formatDisplayDate(dateStr, lang = 'vi') {
    const d = parseLocalDate(dateStr);
    if (!d) return dateStr || '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return lang === 'vi' ? `${day}/${month}/${year}` : `${day}/${month}/${year}`;
}
function computeDaysFromToday(targetDateStr, now = new Date()) {
    const target = parseLocalDate(targetDateStr);
    if (!target) return null;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = target.getTime() - today.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
function evaluateCareRecordDue(record, now = new Date()) {
    if (!record.nextDueDate) {
        return {
            status: 'done',
            daysDiff: null,
            isDueSoonOrOverdue: false
        };
    }
    const diff = computeDaysFromToday(record.nextDueDate, now);
    if (diff === null) {
        return {
            status: 'done',
            daysDiff: null,
            isDueSoonOrOverdue: false
        };
    }
    if (diff < 0) {
        return {
            status: 'overdue',
            daysDiff: diff,
            isDueSoonOrOverdue: true
        };
    }
    if (diff <= 60) {
        return {
            status: 'upcoming',
            daysDiff: diff,
            isDueSoonOrOverdue: true
        };
    }
    return {
        status: 'done',
        daysDiff: diff,
        isDueSoonOrOverdue: false
    };
}
function getCareRecordStatusBadge(record, lang, now = new Date()) {
    const evalResult = evaluateCareRecordDue(record, now);
    if (evalResult.status === 'overdue') {
        return {
            label: lang === 'vi' ? 'Quá hạn' : 'Overdue',
            variant: 'overdue',
            daysDiff: evalResult.daysDiff
        };
    }
    if (evalResult.status === 'upcoming' && evalResult.daysDiff !== null) {
        const d = Math.max(0, evalResult.daysDiff);
        return {
            label: d === 0 ? lang === 'vi' ? 'Hôm nay' : 'Due today' : lang === 'vi' ? `Còn ${d} ngày` : `${d} days left`,
            variant: 'upcoming',
            daysDiff: d
        };
    }
    // Completed / Done: type-specific label
    const typeDoneLabels = {
        vaccine: {
            vi: 'Đã tiêm',
            en: 'Vaccinated'
        },
        deworm: {
            vi: 'Đã tẩy giun',
            en: 'Dewormed'
        },
        checkup: {
            vi: 'Đã khám',
            en: 'Checked'
        },
        spa: {
            vi: 'Đã hoàn thành',
            en: 'Done'
        }
    };
    const labelObj = typeDoneLabels[record.type] || typeDoneLabels.spa;
    return {
        label: lang === 'vi' ? labelObj.vi : labelObj.en,
        variant: 'done',
        daysDiff: evalResult.daysDiff
    };
}
function mapCareTypeToBookingService(type, lang) {
    switch(type){
        case 'vaccine':
            return lang === 'vi' ? 'Tiêm phòng & Xét nghiệm' : 'Vaccination & Lab Tests';
        case 'deworm':
            return lang === 'vi' ? 'Tiêm phòng & Ký sinh trùng' : 'Deworming & Parasite Care';
        case 'checkup':
            return lang === 'vi' ? 'Khám tổng quát' : 'General Checkup';
        case 'spa':
            return lang === 'vi' ? 'Spa Thảo dược' : 'Herbal Spa & Grooming';
    }
}
function getNearestReminderForPet(records, lang, now = new Date()) {
    const candidates = records.map((r)=>({
            record: r,
            eval: evaluateCareRecordDue(r, now)
        })).filter((item)=>item.eval.isDueSoonOrOverdue && item.eval.daysDiff !== null);
    if (candidates.length === 0) {
        return {
            state: 'up_to_date',
            days: 0,
            servicePreselect: lang === 'vi' ? 'Khám tổng quát' : 'General Checkup'
        };
    }
    // Sort by daysDiff ascending (negative overdue items come first, then smallest positive days)
    candidates.sort((a, b)=>(a.eval.daysDiff ?? 0) - (b.eval.daysDiff ?? 0));
    const best = candidates[0];
    const diff = best.eval.daysDiff ?? 0;
    const itemName = lang === 'en' && best.record.nameEn ? best.record.nameEn : best.record.name;
    if (diff < 0) {
        return {
            state: 'overdue',
            record: best.record,
            itemName,
            days: Math.abs(diff),
            servicePreselect: mapCareTypeToBookingService(best.record.type, lang)
        };
    }
    return {
        state: 'upcoming',
        record: best.record,
        itemName,
        days: diff,
        servicePreselect: mapCareTypeToBookingService(best.record.type, lang)
    };
}
function hasPetDueSoonOrOverdue(records, now = new Date()) {
    return records.some((r)=>{
        const ev = evaluateCareRecordDue(r, now);
        return ev.status === 'overdue' || ev.status === 'upcoming' && (ev.daysDiff ?? 99) <= 30;
    });
}
function sortAndGroupCareRecords(records, filterType = 'all') {
    const filtered = records.filter((r)=>filterType === 'all' ? true : r.type === filterType).slice().sort((a, b)=>{
        const da = parseLocalDate(a.date)?.getTime() ?? 0;
        const db = parseLocalDate(b.date)?.getTime() ?? 0;
        return db - da;
    });
    const yearMap = new Map();
    for (const r of filtered){
        const d = parseLocalDate(r.date);
        const year = d ? String(d.getFullYear()) : 'Khác';
        const list = yearMap.get(year) || [];
        list.push(r);
        yearMap.set(year, list);
    }
    const groupedByYear = Array.from(yearMap.entries()).map(([year, items])=>({
            year,
            items
        }));
    const showYearGroups = groupedByYear.length > 1 || filtered.length >= 4;
    return {
        filtered,
        groupedByYear,
        showYearGroups
    };
}
function formatWeightNumber(kg, lang) {
    const rounded2 = Math.round(kg * 100) / 100;
    const hasHundredths = Math.round(rounded2 * 10 % 1 * 10) !== 0;
    const fixed = hasHundredths ? rounded2.toFixed(2) : rounded2.toFixed(1);
    return lang === 'vi' ? fixed.replace('.', ',') : fixed;
}
function computeWeightTrend(logs, lang = 'vi', width = 240, height = 80) {
    const sorted = logs.slice().sort((a, b)=>(parseLocalDate(a.date)?.getTime() ?? 0) - (parseLocalDate(b.date)?.getTime() ?? 0));
    const lastSix = sorted.slice(-6);
    if (lastSix.length === 0) {
        return {
            lastSix: [],
            latestKg: 0,
            deltaKg: 0,
            formattedLatest: '0 kg',
            formattedDelta: '0,0 kg',
            linePath: '',
            areaPath: '',
            points: []
        };
    }
    const latestKg = lastSix[lastSix.length - 1].kg;
    const prevKg = lastSix.length > 1 ? lastSix[lastSix.length - 2].kg : latestKg;
    const deltaKg = Number((latestKg - prevKg).toFixed(2));
    const formattedLatest = `${formatWeightNumber(latestKg, lang)} kg`;
    const sign = deltaKg > 0 ? '+' : deltaKg < 0 ? '-' : '±';
    const formattedDelta = `${sign}${formatWeightNumber(Math.abs(deltaKg), lang)} kg`;
    const padX = 12;
    const padTop = 14;
    const padBottom = 14;
    const usableW = Math.max(10, width - padX * 2);
    const usableH = Math.max(10, height - padTop - padBottom);
    const values = lastSix.map((l)=>l.kg);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || Math.max(0.2, maxVal * 0.1);
    const points = lastSix.map((item, idx)=>{
        const x = lastSix.length === 1 ? width / 2 : Number((padX + idx / (lastSix.length - 1) * usableW).toFixed(1));
        const norm = (item.kg - minVal) / range;
        const y = Number((padTop + usableH - norm * usableH).toFixed(1));
        return {
            x,
            y,
            date: item.date,
            kg: item.kg
        };
    });
    const linePath = points.map((p, i)=>`${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const baselineY = height - 4;
    const areaPath = `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    return {
        lastSix,
        latestKg,
        deltaKg,
        formattedLatest,
        formattedDelta,
        linePath,
        areaPath,
        points
    };
}
function validateCareRecordInput(input) {
    const validTypes = [
        'vaccine',
        'deworm',
        'checkup',
        'spa'
    ];
    if (!input.type || !validTypes.includes(input.type)) {
        return {
            valid: false,
            errorVi: 'Vui lòng chọn phân loại chăm sóc hợp lệ.',
            errorEn: 'Please select a valid care category.'
        };
    }
    if (!input.name || !input.name.trim()) {
        return {
            valid: false,
            errorVi: 'Vui lòng nhập tên mũi tiêm hoặc lịch chăm sóc.',
            errorEn: 'Please enter the vaccine or care record name.'
        };
    }
    const perfDate = parseLocalDate(input.date);
    if (!perfDate) {
        return {
            valid: false,
            errorVi: 'Vui lòng chọn ngày thực hiện hợp lệ.',
            errorEn: 'Please select a valid performed date.'
        };
    }
    if (input.nextDueDate && input.nextDueDate.trim()) {
        const due = parseLocalDate(input.nextDueDate);
        if (!due) {
            return {
                valid: false,
                errorVi: 'Ngày nhắc tiếp theo không hợp lệ.',
                errorEn: 'Invalid next due date.'
            };
        }
    }
    if (input.fileSize && input.fileSize > 5 * 1024 * 1024) {
        return {
            valid: false,
            errorVi: 'Tệp đính kèm vượt quá dung lượng tối đa 5MB.',
            errorEn: 'Attachment exceeds the 5MB maximum file size.'
        };
    }
    if (input.fileType && input.fileType.trim()) {
        const isAllowed = input.fileType.startsWith('image/') || input.fileType === 'application/pdf';
        if (!isAllowed) {
            return {
                valid: false,
                errorVi: 'Chỉ hỗ trợ đính kèm tệp hình ảnh hoặc PDF.',
                errorEn: 'Only image or PDF attachments are supported.'
            };
        }
    }
    return {
        valid: true
    };
}
function formatAgeWithDob(ageVi, ageEn, birthDate, lang) {
    const ageLabel = lang === 'en' && ageEn ? ageEn : ageVi;
    const dobFormatted = formatDisplayDate(birthDate, lang);
    const dobLabel = lang === 'vi' ? `Sinh: ${dobFormatted}` : `DOB: ${dobFormatted}`;
    return {
        ageLabel,
        dobLabel
    };
}
function translateSpecies(species, lang) {
    if (lang === 'vi') return species;
    const map = {
        Chó: 'Dog',
        Mèo: 'Cat',
        Thỏ: 'Rabbit',
        Hamster: 'Hamster',
        Chim: 'Bird',
        'Bò sát': 'Reptile',
        Khác: 'Other'
    };
    return map[species] || species;
}
function translateGender(gender, lang) {
    if (lang === 'vi') return gender;
    return gender === 'Đực' ? 'Male' : 'Female';
}
const INITIAL_PET_PROFILES = [
    {
        id: 'pet-1',
        name: 'Mây Mây',
        species: 'Mèo',
        breed: 'Mèo tai cụp Scottish Fold',
        breedEn: 'Scottish Fold',
        gender: 'Cái',
        birthDate: '2024-03-14',
        age: '2 tuổi',
        ageEn: '2 years old',
        weight: '3,8 kg',
        coatColor: 'Trắng kem ánh xám bạc',
        coatColorEn: 'Cream white & silver',
        allergies: 'Dị ứng hải sản có vỏ (tôm, cua)',
        allergiesEn: 'Shellfish allergy (shrimp, crab)',
        microchip: 'VN-900182736451',
        photo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
        neutered: true,
        vaccinated: true,
        nextCheckupDate: offsetDaysIso(9),
        owner: 'Nguyễn Thảo Nhi'
    },
    {
        id: 'pet-2',
        name: 'Bơ',
        species: 'Chó',
        breed: 'Chó Golden Retriever',
        breedEn: 'Golden Retriever',
        gender: 'Đực',
        birthDate: '2024-09-20',
        age: '1,5 tuổi',
        ageEn: '1.5 years old',
        weight: '24,5 kg',
        coatColor: 'Vàng mật ong óng ả',
        coatColorEn: 'Golden honey',
        allergies: 'Không có',
        allergiesEn: 'None',
        microchip: 'VN-900294817263',
        photo: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
        neutered: true,
        vaccinated: true,
        nextCheckupDate: offsetDaysIso(22),
        owner: 'Trần Minh Quân'
    },
    {
        id: 'pet-3',
        name: 'Bông Gòn',
        species: 'Thỏ',
        breed: 'Thỏ tai cụp Holland Lop',
        breedEn: 'Holland Lop Rabbit',
        gender: 'Cái',
        birthDate: '2025-06-10',
        age: '9 tháng',
        ageEn: '9 months old',
        weight: '1,6 kg',
        coatColor: 'Trắng tuyết pha kem',
        coatColorEn: 'Snow white & cream',
        allergies: 'Nhạy cảm với cỏ linh lăng khô nhiều bụi',
        allergiesEn: 'Sensitive to dusty alfalfa hay',
        microchip: 'VN-900371829405',
        photo: '/assets/adoption/tuyet-nhung-1.jpg',
        neutered: true,
        vaccinated: true,
        nextCheckupDate: offsetDaysIso(14),
        owner: 'Lê Minh Châu'
    },
    {
        id: 'pet-4',
        name: 'Hạt Dẻ',
        species: 'Hamster',
        breed: 'Hamster Syrian Lông Vàng',
        breedEn: 'Golden Syrian Hamster',
        gender: 'Đực',
        birthDate: '2025-09-05',
        age: '6 tháng',
        ageEn: '6 months old',
        weight: '0,14 kg',
        coatColor: 'Nâu hạt dẻ bụng trắng',
        coatColorEn: 'Chestnut brown & white',
        allergies: 'Không có',
        allergiesEn: 'None',
        microchip: 'Chưa gắn vi mạch',
        photo: '/assets/adoption/banh-quy-1.jpg',
        neutered: false,
        vaccinated: false,
        nextCheckupDate: offsetDaysIso(35),
        owner: 'Vũ Hoàng Nam'
    },
    {
        id: 'pet-5',
        name: 'Rio',
        species: 'Chim',
        breed: 'Vẹt Cockatiel Má Hồng',
        breedEn: 'Lutino Cockatiel',
        gender: 'Đực',
        birthDate: '2025-02-18',
        age: '1 tuổi',
        ageEn: '1 year old',
        weight: '0,11 kg',
        coatColor: 'Vàng chanh má cam đỏ',
        coatColorEn: 'Lutino yellow & orange cheek',
        allergies: 'Không có',
        allergiesEn: 'None',
        microchip: 'VN-900519283746',
        photo: '/assets/adoption/kiwi-1.jpg',
        neutered: false,
        vaccinated: true,
        nextCheckupDate: offsetDaysIso(42),
        owner: 'Phạm Bảo Ngọc'
    },
    {
        id: 'pet-6',
        name: 'Mochi',
        species: 'Chó',
        breed: 'Chó Toy Poodle',
        breedEn: 'Toy Poodle',
        gender: 'Cái',
        birthDate: '2025-05-12',
        age: '10 tháng',
        ageEn: '10 months old',
        weight: '4,2 kg',
        coatColor: 'Nâu mơ (Apricot)',
        coatColorEn: 'Warm Apricot',
        allergies: 'Dị ứng đạm thịt bò',
        allergiesEn: 'Beef protein allergy',
        microchip: 'VN-900684729103',
        photo: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
        neutered: true,
        vaccinated: true,
        nextCheckupDate: offsetDaysIso(5),
        owner: 'Lê Hoài Anh'
    }
];
const INITIAL_WEIGHT_LOGS = [
    // Mây Mây (pet-1): last 6 weights ending at 3.8 kg (+0.2 kg from 3.6 kg)
    {
        id: 'w-101',
        pet: 'pet-1',
        date: offsetDaysIso(-150),
        kg: 3.1
    },
    {
        id: 'w-102',
        pet: 'pet-1',
        date: offsetDaysIso(-120),
        kg: 3.3
    },
    {
        id: 'w-103',
        pet: 'pet-1',
        date: offsetDaysIso(-90),
        kg: 3.4
    },
    {
        id: 'w-104',
        pet: 'pet-1',
        date: offsetDaysIso(-60),
        kg: 3.5
    },
    {
        id: 'w-105',
        pet: 'pet-1',
        date: offsetDaysIso(-30),
        kg: 3.6
    },
    {
        id: 'w-106',
        pet: 'pet-1',
        date: offsetDaysIso(-3),
        kg: 3.8
    },
    // Bơ (pet-2): last 6 weights ending at 24.5 kg (+0.4 kg)
    {
        id: 'w-201',
        pet: 'pet-2',
        date: offsetDaysIso(-150),
        kg: 21.8
    },
    {
        id: 'w-202',
        pet: 'pet-2',
        date: offsetDaysIso(-120),
        kg: 22.4
    },
    {
        id: 'w-203',
        pet: 'pet-2',
        date: offsetDaysIso(-90),
        kg: 23.1
    },
    {
        id: 'w-204',
        pet: 'pet-2',
        date: offsetDaysIso(-60),
        kg: 23.7
    },
    {
        id: 'w-205',
        pet: 'pet-2',
        date: offsetDaysIso(-30),
        kg: 24.1
    },
    {
        id: 'w-206',
        pet: 'pet-2',
        date: offsetDaysIso(-5),
        kg: 24.5
    },
    // Bông Gòn (pet-3): last 6 weights ending at 1.6 kg (+0.1 kg)
    {
        id: 'w-301',
        pet: 'pet-3',
        date: offsetDaysIso(-150),
        kg: 1.1
    },
    {
        id: 'w-302',
        pet: 'pet-3',
        date: offsetDaysIso(-120),
        kg: 1.2
    },
    {
        id: 'w-303',
        pet: 'pet-3',
        date: offsetDaysIso(-90),
        kg: 1.3
    },
    {
        id: 'w-304',
        pet: 'pet-3',
        date: offsetDaysIso(-60),
        kg: 1.4
    },
    {
        id: 'w-305',
        pet: 'pet-3',
        date: offsetDaysIso(-30),
        kg: 1.5
    },
    {
        id: 'w-306',
        pet: 'pet-3',
        date: offsetDaysIso(-4),
        kg: 1.6
    },
    // Hạt Dẻ (pet-4)
    {
        id: 'w-401',
        pet: 'pet-4',
        date: offsetDaysIso(-120),
        kg: 0.10
    },
    {
        id: 'w-402',
        pet: 'pet-4',
        date: offsetDaysIso(-90),
        kg: 0.11
    },
    {
        id: 'w-403',
        pet: 'pet-4',
        date: offsetDaysIso(-60),
        kg: 0.12
    },
    {
        id: 'w-404',
        pet: 'pet-4',
        date: offsetDaysIso(-40),
        kg: 0.13
    },
    {
        id: 'w-405',
        pet: 'pet-4',
        date: offsetDaysIso(-20),
        kg: 0.13
    },
    {
        id: 'w-406',
        pet: 'pet-4',
        date: offsetDaysIso(-2),
        kg: 0.14
    },
    // Rio (pet-5)
    {
        id: 'w-501',
        pet: 'pet-5',
        date: offsetDaysIso(-140),
        kg: 0.09
    },
    {
        id: 'w-502',
        pet: 'pet-5',
        date: offsetDaysIso(-110),
        kg: 0.09
    },
    {
        id: 'w-503',
        pet: 'pet-5',
        date: offsetDaysIso(-80),
        kg: 0.10
    },
    {
        id: 'w-504',
        pet: 'pet-5',
        date: offsetDaysIso(-50),
        kg: 0.10
    },
    {
        id: 'w-505',
        pet: 'pet-5',
        date: offsetDaysIso(-25),
        kg: 0.10
    },
    {
        id: 'w-506',
        pet: 'pet-5',
        date: offsetDaysIso(-6),
        kg: 0.11
    },
    // Mochi (pet-6)
    {
        id: 'w-601',
        pet: 'pet-6',
        date: offsetDaysIso(-150),
        kg: 2.9
    },
    {
        id: 'w-602',
        pet: 'pet-6',
        date: offsetDaysIso(-120),
        kg: 3.2
    },
    {
        id: 'w-603',
        pet: 'pet-6',
        date: offsetDaysIso(-90),
        kg: 3.5
    },
    {
        id: 'w-604',
        pet: 'pet-6',
        date: offsetDaysIso(-60),
        kg: 3.8
    },
    {
        id: 'w-605',
        pet: 'pet-6',
        date: offsetDaysIso(-30),
        kg: 4.0
    },
    {
        id: 'w-606',
        pet: 'pet-6',
        date: offsetDaysIso(-4),
        kg: 4.2
    }
];
const INITIAL_CARE_RECORDS = [
    // 1. Mây Mây (pet-1) — MANY records across years (7 records) + upcoming due in 9 days
    {
        id: 'care-101',
        pet: 'pet-1',
        type: 'vaccine',
        name: 'Vắc-xin 4 bệnh ở mèo (FVRCP mũi nhắc)',
        nameEn: 'Feline 4-in-1 FVRCP Booster',
        date: offsetDaysIso(-356),
        nextDueDate: offsetDaysIso(9),
        notes: 'Theo dõi nhiệt độ 24h sau tiêm, bé ăn ngủ tốt.',
        notesEn: 'Monitored temperature 24h post-vaccine, eating well.',
        attachmentName: 'chung-nhan-fvrcp-maymay.pdf',
        attachmentUrl: '#cert-fvrcp-maymay',
        status: 'upcoming'
    },
    {
        id: 'care-102',
        pet: 'pet-1',
        type: 'deworm',
        name: 'Tẩy giun & nhỏ gáy nội ngoại ký sinh Revolution',
        nameEn: 'Revolution Spot-on & Deworming',
        date: offsetDaysIso(-24),
        nextDueDate: offsetDaysIso(66),
        notes: 'Nhỏ gáy định kỳ mỗi quý, lông mượt không rụng.',
        notesEn: 'Quarterly spot-on protection, healthy coat.',
        status: 'done'
    },
    {
        id: 'care-103',
        pet: 'pet-1',
        type: 'spa',
        name: 'Spa thảo dược hoa cúc & vệ sinh tuyến hôi',
        nameEn: 'Chamomile Herbal Spa & Grooming',
        date: offsetDaysIso(-42),
        notes: 'Tắm thảo dược dịu nhẹ, cắt móng và vệ sinh tai sạch.',
        notesEn: 'Gentle herbal bath, nail trim, and ear cleaning.',
        status: 'done'
    },
    {
        id: 'care-104',
        pet: 'pet-1',
        type: 'checkup',
        name: 'Khám tổng quát & siêu âm ổ bụng định kỳ',
        nameEn: 'Comprehensive Wellness & Ultrasound Checkup',
        date: offsetDaysIso(-95),
        notes: 'Tim phổi ổn định, men gan thận trong giới hạn chuẩn.',
        notesEn: 'Heart and lungs normal, liver & kidney panel optimal.',
        attachmentName: 'ket-qua-sieu-am-maymay.pdf',
        attachmentUrl: '#ultrasound-maymay',
        status: 'done'
    },
    {
        id: 'care-105',
        pet: 'pet-1',
        type: 'vaccine',
        name: 'Vắc-xin phòng bệnh Dại (Rabies Defensor)',
        nameEn: 'Rabies Defensor Vaccination',
        date: '2025-05-10',
        notes: 'Không sưng chỗ tiêm, phản xạ nhanh nhẹn.',
        notesEn: 'No injection site swelling, active reflexes.',
        attachmentName: 'so-tiem-dai-2025.pdf',
        attachmentUrl: '#rabies-2025',
        status: 'done'
    },
    {
        id: 'care-106',
        pet: 'pet-1',
        type: 'deworm',
        name: 'Tẩy giun định kỳ Drontal Cat',
        nameEn: 'Drontal Cat Routine Deworming',
        date: '2025-02-14',
        notes: 'Uống 1 viên theo cân nặng 3.4 kg.',
        notesEn: '1 tablet dosed for 3.4 kg body weight.',
        status: 'done'
    },
    {
        id: 'care-107',
        pet: 'pet-1',
        type: 'checkup',
        name: 'Khám sức khỏe đầu đời & gắn vi mạch',
        nameEn: 'Initial Kitten Wellness Exam & Microchip',
        date: '2024-06-18',
        notes: 'Hoàn tất gắn vi mạch ISO chuẩn quốc tế.',
        notesEn: 'Completed ISO standard microchip implantation.',
        status: 'done'
    },
    // 2. Bơ (pet-2) — Has an OVERDUE item (overdue by 6 days) + 2 done records
    {
        id: 'care-201',
        pet: 'pet-2',
        type: 'vaccine',
        name: 'Vắc-xin phòng Ho cũi chó (Bordetella)',
        nameEn: 'Bordetella Kennel Cough Booster',
        date: offsetDaysIso(-371),
        nextDueDate: offsetDaysIso(-6),
        notes: 'Mũi nhắc hàng năm cần đặt lịch tiêm sớm.',
        notesEn: 'Annual booster currently overdue, book soon.',
        status: 'overdue'
    },
    {
        id: 'care-202',
        pet: 'pet-2',
        type: 'vaccine',
        name: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
        nameEn: 'Canine 7-in-1 DHPPi-L Vaccine',
        date: offsetDaysIso(-120),
        nextDueDate: offsetDaysIso(245),
        notes: 'Đã tiêm tại phòng khám Animora Quận 1.',
        notesEn: 'Administered at Animora District 1 Clinic.',
        attachmentName: 'phieu-tiem-7benh-bo.pdf',
        attachmentUrl: '#dhppi-bo',
        status: 'done'
    },
    {
        id: 'care-203',
        pet: 'pet-2',
        type: 'deworm',
        name: 'Viên nhai tẩy giun & ve rận NexGard Spectra',
        nameEn: 'NexGard Spectra Chewable Protection',
        date: offsetDaysIso(-18),
        nextDueDate: offsetDaysIso(72),
        notes: 'Bé ăn hết viên nhai vị bò, tiêu hóa bình thường.',
        notesEn: 'Took chewable tablet well, normal digestion.',
        status: 'done'
    },
    // 3. Bông Gòn (pet-3) — 2 records, 1 upcoming in 14 days
    {
        id: 'care-301',
        pet: 'pet-3',
        type: 'checkup',
        name: 'Kiểm tra & mài răng cửa định kỳ cho thỏ',
        nameEn: 'Routine Rabbit Dental & Molar Checkup',
        date: offsetDaysIso(-76),
        nextDueDate: offsetDaysIso(14),
        notes: 'Răng hàm mọc đều, khuyến nghị ăn thêm cỏ Timothy.',
        notesEn: 'Even molar wear, continue high-fiber Timothy hay.',
        status: 'upcoming'
    },
    {
        id: 'care-302',
        pet: 'pet-3',
        type: 'vaccine',
        name: 'Vắc-xin phòng Xuất huyết Thỏ (RHDV2)',
        nameEn: 'Rabbit Hemorrhagic Disease RHDV2 Vaccine',
        date: offsetDaysIso(-140),
        nextDueDate: offsetDaysIso(225),
        notes: 'Đáp ứng miễn dịch tốt.',
        notesEn: 'Strong immune response.',
        status: 'done'
    },
    // 4. Hạt Dẻ (pet-4) — NO records at all (0 records) to test the empty state!
    // 5. Rio (pet-5) — 2 completed records, nothing due soon -> "Mọi thứ đang đúng lịch 🎉"
    {
        id: 'care-501',
        pet: 'pet-5',
        type: 'vaccine',
        name: 'Vắc-xin Polyomavirus cho vẹt cảnh',
        nameEn: 'Avian Polyomavirus Vaccination',
        date: offsetDaysIso(-80),
        nextDueDate: offsetDaysIso(285),
        notes: 'Lông cánh bóng khỏe, nhịp thở ổn định.',
        notesEn: 'Healthy plumage and clear respiration.',
        status: 'done'
    },
    {
        id: 'care-502',
        pet: 'pet-5',
        type: 'spa',
        name: 'Tỉa móng & dưỡng mỏ khoáng chất tự nhiên',
        nameEn: 'Avian Nail Trim & Beak Conditioning',
        date: offsetDaysIso(-30),
        nextDueDate: offsetDaysIso(90),
        notes: 'Mỏ đều đẹp, bé rất hợp tác với bác sĩ.',
        notesEn: 'Well-shaped beak, very calm during grooming.',
        status: 'done'
    },
    // 6. Mochi (pet-6) — 3 records, upcoming deworming due in 5 days
    {
        id: 'care-601',
        pet: 'pet-6',
        type: 'deworm',
        name: 'Tẩy giun tim định kỳ Heartgard Plus',
        nameEn: 'Heartgard Plus Heartworm Prevention',
        date: offsetDaysIso(-25),
        nextDueDate: offsetDaysIso(5),
        notes: 'Nhắc lịch uống viên tiếp theo vào tuần tới.',
        notesEn: 'Next monthly chewable due in 5 days.',
        status: 'upcoming'
    },
    {
        id: 'care-602',
        pet: 'pet-6',
        type: 'spa',
        name: 'Cắt tỉa tạo kiểu Teddy & tắm dưỡng yến mạch',
        nameEn: 'Teddy Styling Trim & Oatmeal Bath',
        date: offsetDaysIso(-20),
        notes: 'Dùng sữa tắm yến mạch hữu cơ cho da nhạy cảm.',
        notesEn: 'Used organic oatmeal shampoo for sensitive skin.',
        status: 'done'
    },
    {
        id: 'care-603',
        pet: 'pet-6',
        type: 'vaccine',
        name: 'Vắc-xin 5 bệnh Puppy & Phòng Dại mũi 1',
        nameEn: '5-in-1 Puppy & First Rabies Vaccine',
        date: offsetDaysIso(-110),
        nextDueDate: offsetDaysIso(255),
        notes: 'Hoàn tất phác đồ tiêm chủng cơ bản.',
        notesEn: 'Completed core puppy vaccination series.',
        attachmentName: 'chung-nhan-tiem-mochi.pdf',
        attachmentUrl: '#cert-mochi',
        status: 'done'
    }
];
}),
"[project]/src/data/serviceBookingData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOKING_PET_TYPES",
    ()=>BOOKING_PET_TYPES,
    "BOOKING_PREFERRED_CONTACTS",
    ()=>BOOKING_PREFERRED_CONTACTS,
    "BOOKING_WEIGHT_RANGES",
    ()=>BOOKING_WEIGHT_RANGES,
    "TIME_SLOT_CONFIG",
    ()=>TIME_SLOT_CONFIG,
    "addDaysToIso",
    ()=>addDaysToIso,
    "cleanBookingPhoneDigits",
    ()=>cleanBookingPhoneDigits,
    "createSeededServiceBookings",
    ()=>createSeededServiceBookings,
    "estimateServicePrice",
    ()=>estimateServicePrice,
    "findNextAvailableDate",
    ()=>findNextAvailableDate,
    "formatBookingPhoneOnBlur",
    ()=>formatBookingPhoneOnBlur,
    "formatEstimatedPriceText",
    ()=>formatEstimatedPriceText,
    "formatIsoDateForDisplay",
    ()=>formatIsoDateForDisplay,
    "generateBookingIcsContent",
    ()=>generateBookingIcsContent,
    "generateDailyTimeSlots",
    ()=>generateDailyTimeSlots,
    "generateServiceBookingCode",
    ()=>generateServiceBookingCode,
    "getPetTypeLabel",
    ()=>getPetTypeLabel,
    "getPreferredContactLabel",
    ()=>getPreferredContactLabel,
    "getTimeSlotsForDate",
    ()=>getTimeSlotsForDate,
    "getTodayLocalIso",
    ()=>getTodayLocalIso,
    "getUpcomingWithin24hSlot",
    ()=>getUpcomingWithin24hSlot,
    "getWeightRangeLabel",
    ()=>getWeightRangeLabel,
    "isDateClosed",
    ()=>isDateClosed,
    "mapPetSpeciesToBookingPetType",
    ()=>mapPetSpeciesToBookingPetType,
    "mapWeightStringToRangeId",
    ()=>mapWeightStringToRangeId,
    "parseServiceBookingUrl",
    ()=>parseServiceBookingUrl,
    "parseVietnameseDateInput",
    ()=>parseVietnameseDateInput,
    "resolveServiceBySlugOrName",
    ()=>resolveServiceBySlugOrName,
    "validateBookingDate",
    ()=>validateBookingDate,
    "validateBookingEmail",
    ()=>validateBookingEmail,
    "validateBookingFullName",
    ()=>validateBookingFullName,
    "validateBookingPetName",
    ()=>validateBookingPetName,
    "validateBookingPhoneDigits",
    ()=>validateBookingPhoneDigits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/servicesData.ts [app-ssr] (ecmascript)");
;
const TIME_SLOT_CONFIG = {
    openHour: 8,
    closeHour: 19,
    intervalMinutes: 60,
    capacityPerSlot: 2,
    maxAdvanceDays: 60,
    closedWeekdays: [],
    closedDateOffsets: [
        5
    ]
};
const BOOKING_PET_TYPES = [
    {
        id: 'Chó',
        labelVi: 'Chó',
        labelEn: 'Dog'
    },
    {
        id: 'Mèo',
        labelVi: 'Mèo',
        labelEn: 'Cat'
    },
    {
        id: 'Thỏ & chuột',
        labelVi: 'Thỏ & chuột',
        labelEn: 'Rabbit & rodent'
    },
    {
        id: 'Chim',
        labelVi: 'Chim',
        labelEn: 'Bird'
    },
    {
        id: 'Khác',
        labelVi: 'Khác',
        labelEn: 'Other'
    }
];
const BOOKING_WEIGHT_RANGES = [
    {
        id: 'under_5',
        labelVi: 'Dưới 5kg',
        labelEn: 'Under 5kg',
        tableIndex: 0
    },
    {
        id: '5_to_10',
        labelVi: '5-10kg',
        labelEn: '5-10kg',
        tableIndex: 1
    },
    {
        id: '10_to_20',
        labelVi: '10-20kg',
        labelEn: '10-20kg',
        tableIndex: 2
    },
    {
        id: 'over_20',
        labelVi: 'Trên 20kg',
        labelEn: 'Over 20kg',
        tableIndex: 3
    }
];
const BOOKING_PREFERRED_CONTACTS = [
    {
        id: 'phone',
        labelVi: 'Điện thoại',
        labelEn: 'Phone'
    },
    {
        id: 'zalo',
        labelVi: 'Zalo',
        labelEn: 'Zalo'
    },
    {
        id: 'email',
        labelVi: 'Email',
        labelEn: 'Email'
    }
];
function mapPetSpeciesToBookingPetType(species) {
    switch(species){
        case 'Chó':
            return 'Chó';
        case 'Mèo':
            return 'Mèo';
        case 'Thỏ':
        case 'Hamster':
        case 'Thỏ & chuột':
            return 'Thỏ & chuột';
        case 'Chim':
            return 'Chim';
        default:
            return 'Khác';
    }
}
function mapWeightStringToRangeId(weightStr) {
    if (!weightStr) return 'under_5';
    const numMatch = weightStr.replace(',', '.').match(/(\d+(\.\d+)?)/);
    if (!numMatch) return 'under_5';
    const kg = parseFloat(numMatch[1]);
    if (isNaN(kg) || kg < 5) return 'under_5';
    if (kg <= 10) return '5_to_10';
    if (kg <= 20) return '10_to_20';
    return 'over_20';
}
function getWeightRangeLabel(rangeId, lang) {
    const found = BOOKING_WEIGHT_RANGES.find((r)=>r.id === rangeId);
    if (found) {
        return lang === 'vi' ? found.labelVi : found.labelEn;
    }
    return rangeId || (lang === 'vi' ? 'Dưới 5kg' : 'Under 5kg');
}
function getPetTypeLabel(petType, lang) {
    const found = BOOKING_PET_TYPES.find((p)=>p.id === petType);
    if (found) {
        return lang === 'vi' ? found.labelVi : found.labelEn;
    }
    return petType;
}
function getPreferredContactLabel(contact, lang) {
    const found = BOOKING_PREFERRED_CONTACTS.find((c)=>c.id === (contact || 'phone'));
    if (!found) return lang === 'vi' ? 'Điện thoại' : 'Phone';
    return lang === 'vi' ? found.labelVi : found.labelEn;
}
function resolveServiceBySlugOrName(query) {
    if (!query) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"][0];
    const clean = query.trim().toLowerCase();
    const matched = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"].find((s)=>s.slug.toLowerCase() === clean || s.id.toLowerCase() === clean || s.name.vi.toLowerCase() === clean || s.name.en.toLowerCase() === clean);
    if (matched) return matched;
    if (clean.includes('tiêm') || clean.includes('vac') || clean.includes('khám')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"][0];
    }
    if (clean.includes('spa') || clean.includes('tắm')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"].find((s)=>s.id === 'spa') || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"][0];
    }
    if (clean.includes('răng') || clean.includes('nha')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"].find((s)=>s.id === 'dental') || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"][0];
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVICES_DATA"][0];
}
function estimateServicePrice(service, weightRange) {
    if (!service.dependsOnWeight || !weightRange) {
        return service.priceFrom;
    }
    const rangeObj = BOOKING_WEIGHT_RANGES.find((r)=>r.id === weightRange);
    if (!rangeObj) return service.priceFrom;
    const row = service.priceTable[rangeObj.tableIndex];
    return row ? row.price : service.priceFrom;
}
function formatEstimatedPriceText(service, weightRange, lang) {
    const amount = estimateServicePrice(service, weightRange);
    const priceStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$servicesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatServicePrice"])(amount);
    const unit = service.priceUnit ? ` ${service.priceUnit[lang]}` : '';
    return lang === 'vi' ? `Từ ${priceStr}${unit}` : `From ${priceStr}${unit}`;
}
function getTodayLocalIso(now = new Date()) {
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function addDaysToIso(isoDate, days) {
    const parts = isoDate.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return isoDate;
    const dt = new Date(parts[0], parts[1] - 1, parts[2]);
    dt.setDate(dt.getDate() + days);
    return getTodayLocalIso(dt);
}
function formatIsoDateForDisplay(isoDate, lang) {
    if (!isoDate) return '';
    const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return isoDate;
    const [, yyyy, mm, dd] = match;
    if (lang === 'vi') {
        return `${dd}/${mm}/${yyyy}`;
    }
    const dt = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return dt.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
}
function parseVietnameseDateInput(input) {
    const clean = input.trim();
    // Match dd/mm/yyyy or dd-mm-yyyy
    const dmyMatch = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (dmyMatch) {
        const dd = Number(dmyMatch[1]);
        const mm = Number(dmyMatch[2]);
        const yyyy = Number(dmyMatch[3]);
        if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
        const dt = new Date(yyyy, mm - 1, dd);
        if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) {
            return null;
        }
        return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
    }
    // Match yyyy-mm-dd
    const isoMatch = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
        return clean;
    }
    return null;
}
function isDateClosed(isoDate, todayIso = getTodayLocalIso(), config = TIME_SLOT_CONFIG) {
    const parts = isoDate.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return false;
    const dt = new Date(parts[0], parts[1] - 1, parts[2]);
    if (config.closedWeekdays.includes(dt.getDay())) {
        return true;
    }
    for (const offset of config.closedDateOffsets){
        if (addDaysToIso(todayIso, offset) === isoDate) {
            return true;
        }
    }
    return false;
}
function validateBookingDate(isoDate, todayIso = getTodayLocalIso(), config = TIME_SLOT_CONFIG) {
    if (!isoDate) return {
        valid: false,
        reason: 'empty'
    };
    if (isoDate < todayIso) return {
        valid: false,
        reason: 'past'
    };
    const maxIso = addDaysToIso(todayIso, config.maxAdvanceDays);
    if (isoDate > maxIso) return {
        valid: false,
        reason: 'too_far'
    };
    if (isDateClosed(isoDate, todayIso, config)) return {
        valid: false,
        reason: 'closed'
    };
    return {
        valid: true
    };
}
function generateDailyTimeSlots(config = TIME_SLOT_CONFIG) {
    const slots = [];
    for(let h = config.openHour; h <= config.closeHour; h++){
        slots.push(`${String(h).padStart(2, '0')}:00`);
    }
    return slots;
}
function getTimeSlotsForDate(isoDate, bookings, now = new Date(), config = TIME_SLOT_CONFIG) {
    const todayIso = getTodayLocalIso(now);
    if (!isoDate || isDateClosed(isoDate, todayIso, config)) {
        return [];
    }
    const allSlots = generateDailyTimeSlots(config);
    const isToday = isoDate === todayIso;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return allSlots.map((time)=>{
        const [hh, mm] = time.split(':').map(Number);
        const slotMinutes = hh * 60 + (mm || 0);
        const isPastToday = isToday && slotMinutes <= currentMinutes;
        const bookedCount = bookings.filter((b)=>b.date === isoDate && b.timeSlot === time && b.status !== 'Đã hủy').length;
        const isFull = bookedCount >= config.capacityPerSlot;
        const disabled = isFull || isPastToday;
        let reasonVi;
        let reasonEn;
        if (isFull) {
            reasonVi = 'Hết chỗ';
            reasonEn = 'Full';
        } else if (isPastToday) {
            reasonVi = 'Đã qua giờ';
            reasonEn = 'Passed';
        }
        return {
            time,
            bookedCount,
            capacity: config.capacityPerSlot,
            isFull,
            isPastToday,
            disabled,
            reasonVi,
            reasonEn
        };
    });
}
function findNextAvailableDate(fromIsoDate, bookings, now = new Date(), config = TIME_SLOT_CONFIG) {
    const todayIso = getTodayLocalIso(now);
    const startIso = fromIsoDate < todayIso ? todayIso : fromIsoDate;
    for(let i = 1; i <= config.maxAdvanceDays; i++){
        const candidate = addDaysToIso(startIso, i);
        if (isDateClosed(candidate, todayIso, config)) continue;
        const slots = getTimeSlotsForDate(candidate, bookings, now, config);
        if (slots.some((s)=>!s.disabled)) {
            return candidate;
        }
    }
    return addDaysToIso(todayIso, 1);
}
function getUpcomingWithin24hSlot(todayIso = getTodayLocalIso(), now = new Date()) {
    const hour = now.getHours();
    if (hour <= 11) {
        return {
            date: todayIso,
            timeSlot: '18:00'
        };
    }
    return {
        date: addDaysToIso(todayIso, 1),
        timeSlot: '08:00'
    };
}
function createSeededServiceBookings(todayIso = getTodayLocalIso(), now = new Date()) {
    const tomorrow = addDaysToIso(todayIso, 1);
    const dayAfter = addDaysToIso(todayIso, 2);
    const fullyBookedDay = addDaysToIso(todayIso, 3);
    const upcoming4Days = addDaysToIso(todayIso, 4);
    const within24h = getUpcomingWithin24hSlot(todayIso, now);
    const past10Days = addDaysToIso(todayIso, -10);
    const past24Days = addDaysToIso(todayIso, -24);
    const past5Days = addDaysToIso(todayIso, -5);
    const past14Days = addDaysToIso(todayIso, -14);
    const allSlots = generateDailyTimeSlots(TIME_SLOT_CONFIG);
    const ownerBookings = [
        // 1. Upcoming #1 (> 24 hours away — can reschedule and cancel)
        {
            id: 'seed-owner-1',
            code: 'DL-2026-0001',
            userId: 'user-demo-owner',
            serviceSlug: 'kham-tong-quat',
            service: 'Khám tổng quát',
            petType: 'Mèo',
            petName: 'Mây Mây',
            petBreed: 'Scottish Fold · 2 tuổi',
            weightRange: 'under_5',
            date: upcoming4Days,
            timeSlot: '09:00',
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'phone',
            note: 'Bé hơi nhát người lạ, nhờ bác sĩ khám nhẹ nhàng giúp gia đình.',
            status: 'Đã xác nhận',
            confirmedAt: `${addDaysToIso(todayIso, -1)}T10:30:00.000Z`,
            createdAt: `${addDaysToIso(todayIso, -2)}T08:15:00.000Z`
        },
        // 2. Upcoming #2 (Within 24 hours — reschedule and cancel disabled with 24h notice)
        {
            id: 'seed-owner-2',
            code: 'DL-2026-0002',
            userId: 'user-demo-owner',
            serviceSlug: 'spa-tam',
            service: 'Spa & tắm',
            petType: 'Chó',
            petName: 'Bơ',
            petBreed: 'Golden Retriever · 1.5 tuổi',
            weightRange: 'over_20',
            date: within24h.date,
            timeSlot: within24h.timeSlot,
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'zalo',
            note: 'Tắm thảo dược dịu nhẹ và cắt móng kỹ cho bé Bơ.',
            vaccinatedConfirmed: true,
            status: 'Mới',
            createdAt: `${todayIso}T01:00:00.000Z`
        },
        // 3. Completed #1 (Past — vaccination / checkup for saved pet Mây Mây -> can add to pet profile)
        {
            id: 'seed-owner-3',
            code: 'DL-2026-0003',
            userId: 'user-demo-owner',
            serviceSlug: 'kham-tong-quat',
            service: 'Khám tổng quát',
            petType: 'Mèo',
            petName: 'Mây Mây',
            petBreed: 'Scottish Fold · 2 tuổi',
            weightRange: 'under_5',
            date: past10Days,
            timeSlot: '10:00',
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'phone',
            note: 'Kiểm tra sức khỏe định kỳ và tiêm nhắc vắc-xin phòng bệnh.',
            status: 'Hoàn thành',
            confirmedAt: `${addDaysToIso(todayIso, -12)}T09:00:00.000Z`,
            completedAt: `${past10Days}T11:00:00.000Z`,
            createdAt: `${addDaysToIso(todayIso, -13)}T14:20:00.000Z`
        },
        // 4. Completed #2 (Past — dental & small pet checkup for saved pet Bơ)
        {
            id: 'seed-owner-4',
            code: 'DL-2026-0004',
            userId: 'user-demo-owner',
            serviceSlug: 'nha-khoa-thu-nho',
            service: 'Nha khoa & Chăm sóc Thú nhỏ',
            petType: 'Chó',
            petName: 'Bơ',
            petBreed: 'Golden Retriever · 1.5 tuổi',
            weightRange: 'over_20',
            date: past24Days,
            timeSlot: '15:00',
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'email',
            note: 'Lấy cao răng siêu âm và kiểm tra nướu định kỳ.',
            status: 'Hoàn thành',
            confirmedAt: `${addDaysToIso(todayIso, -26)}T10:00:00.000Z`,
            completedAt: `${past24Days}T16:00:00.000Z`,
            createdAt: `${addDaysToIso(todayIso, -27)}T09:30:00.000Z`
        },
        // 5. Cancelled #1
        {
            id: 'seed-owner-5',
            code: 'DL-2026-0005',
            userId: 'user-demo-owner',
            serviceSlug: 'huan-luyen',
            service: 'Huấn luyện',
            petType: 'Chó',
            petName: 'Mochi',
            petBreed: 'Toy Poodle · 10 tháng',
            weightRange: 'under_5',
            date: past5Days,
            timeSlot: '14:00',
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'phone',
            note: 'Lớp kỹ năng giao tiếp cơ bản cho cún con.',
            status: 'Đã hủy',
            cancelledAt: `${addDaysToIso(todayIso, -7)}T16:45:00.000Z`,
            cancelReason: 'Đổi kế hoạch',
            createdAt: `${addDaysToIso(todayIso, -9)}T11:00:00.000Z`
        },
        // 6. No-show #1
        {
            id: 'seed-owner-6',
            code: 'DL-2026-0006',
            userId: 'user-demo-owner',
            serviceSlug: 'luu-tru',
            service: 'Lưu trú',
            petType: 'Thỏ & chuột',
            petName: 'Bông Gòn',
            petBreed: 'Thỏ Holland Lop · 9 tháng',
            weightRange: 'under_5',
            date: past14Days,
            timeSlot: '09:00',
            fullName: 'Phan Thị Đình Thùy',
            phone: '0337 203 332',
            email: 'phanthidinhthuy6@gmail.com',
            preferredContact: 'zalo',
            note: 'Phòng tiêu chuẩn có lót cỏ Timothy tươi.',
            vaccinatedConfirmed: true,
            status: 'Không đến',
            confirmedAt: `${addDaysToIso(todayIso, -16)}T10:15:00.000Z`,
            createdAt: `${addDaysToIso(todayIso, -17)}T08:00:00.000Z`
        }
    ];
    const slotFixtureBookings = [
        // Tomorrow: 09:00 is FULL (2 bookings), 14:00 is FULL (2 bookings), 10:00 is available
        {
            id: 'seed-slot-1',
            code: 'DL-2026-0191',
            serviceSlug: 'kham-tong-quat',
            service: 'Khám tổng quát',
            petType: 'Chó',
            petName: 'Lucky',
            weightRange: 'over_20',
            date: tomorrow,
            timeSlot: '09:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest1@example.com',
            preferredContact: 'phone',
            status: 'Đã xác nhận',
            createdAt: '2026-10-28T08:00:00.000Z'
        },
        {
            id: 'seed-slot-2',
            code: 'DL-2026-0192',
            serviceSlug: 'spa-tam',
            service: 'Spa & tắm',
            petType: 'Mèo',
            petName: 'Miu',
            weightRange: 'under_5',
            date: tomorrow,
            timeSlot: '09:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest2@example.com',
            preferredContact: 'zalo',
            status: 'Đã xác nhận',
            createdAt: '2026-10-28T09:15:00.000Z'
        },
        {
            id: 'seed-slot-3',
            code: 'DL-2026-0193',
            serviceSlug: 'spa-tam',
            service: 'Spa & tắm',
            petType: 'Chó',
            petName: 'Lu',
            weightRange: 'under_5',
            date: tomorrow,
            timeSlot: '14:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest3@example.com',
            preferredContact: 'phone',
            status: 'Đã xác nhận',
            createdAt: '2026-10-29T10:00:00.000Z'
        },
        {
            id: 'seed-slot-4',
            code: 'DL-2026-0194',
            serviceSlug: 'nha-khoa-thu-nho',
            service: 'Nha khoa & Chăm sóc Thú nhỏ',
            petType: 'Thỏ & chuột',
            petName: 'Kem',
            weightRange: 'under_5',
            date: tomorrow,
            timeSlot: '14:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest4@example.com',
            preferredContact: 'zalo',
            status: 'Mới',
            createdAt: '2026-10-29T11:20:00.000Z'
        },
        // Day after tomorrow: 10:00 is FULL (2 bookings)
        {
            id: 'seed-slot-5',
            code: 'DL-2026-0195',
            serviceSlug: 'huan-luyen',
            service: 'Huấn luyện',
            petType: 'Chó',
            petName: 'Đậu Đậu',
            weightRange: '5_to_10',
            date: dayAfter,
            timeSlot: '10:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest5@example.com',
            preferredContact: 'phone',
            status: 'Đã xác nhận',
            createdAt: '2026-10-30T08:00:00.000Z'
        },
        {
            id: 'seed-slot-6',
            code: 'DL-2026-0196',
            serviceSlug: 'luu-tru',
            service: 'Lưu trú',
            petType: 'Mèo',
            petName: 'Búp Bê',
            weightRange: 'under_5',
            date: dayAfter,
            timeSlot: '10:00',
            fullName: 'Khách đặt trước',
            phone: '0909112233',
            email: 'guest6@example.com',
            preferredContact: 'email',
            status: 'Đã xác nhận',
            createdAt: '2026-10-30T09:00:00.000Z'
        }
    ];
    const seeded = [
        ...ownerBookings,
        ...slotFixtureBookings
    ];
    // Make `fullyBookedDay` (today + 3 days) completely full across all slots so empty-slot state can be tested
    allSlots.forEach((slot, idx)=>{
        for(let c = 0; c < TIME_SLOT_CONFIG.capacityPerSlot; c++){
            seeded.push({
                id: `seed-full-${idx}-${c}`,
                code: `DL-2026-01${idx}${c}`,
                serviceSlug: 'kham-tong-quat',
                service: 'Khám tổng quát',
                petType: 'Chó',
                petName: 'Milu',
                weightRange: '5_to_10',
                date: fullyBookedDay,
                timeSlot: slot,
                fullName: 'Khách đặt trước',
                phone: '0909112233',
                status: 'Đã xác nhận',
                createdAt: '2026-10-30T12:00:00.000Z'
            });
        }
    });
    return seeded;
}
function cleanBookingPhoneDigits(raw) {
    const trimmed = raw.trim();
    let digits = trimmed.replace(/\D/g, '');
    if (trimmed.startsWith('+84') && digits.startsWith('84')) {
        digits = '0' + digits.slice(2);
    } else if (digits.startsWith('84')) {
        digits = '0' + digits.slice(2);
    }
    return digits.slice(0, 10);
}
function formatBookingPhoneOnBlur(rawDigits) {
    const digits = cleanBookingPhoneDigits(rawDigits);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}
function validateBookingPhoneDigits(rawDigits, lang) {
    const digits = cleanBookingPhoneDigits(rawDigits);
    if (digits.length === 0) {
        return lang === 'vi' ? 'Vui lòng nhập số điện thoại' : 'Please enter your phone number';
    }
    if (digits.length < 10) {
        return lang === 'vi' ? `Số điện thoại cần đủ 10 số (bạn đã nhập ${digits.length})` : `Phone number must be 10 digits (you entered ${digits.length})`;
    }
    if (!/^(03|05|07|08|09)\d{8}$/.test(digits)) {
        return lang === 'vi' ? 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09' : 'Phone number must start with 03, 05, 07, 08, or 09';
    }
    return null;
}
function validateBookingEmail(email, lang) {
    const trimmed = email.trim();
    if (!trimmed) {
        return lang === 'vi' ? 'Vui lòng nhập địa chỉ email' : 'Please enter your email address';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return lang === 'vi' ? 'Địa chỉ email không đúng định dạng' : 'Please enter a valid email address';
    }
    return null;
}
function validateBookingFullName(name, lang) {
    const trimmed = name.trim();
    if (!trimmed) {
        return lang === 'vi' ? 'Vui lòng nhập họ và tên' : 'Please enter your full name';
    }
    if (trimmed.length < 2) {
        return lang === 'vi' ? 'Họ và tên cần ít nhất 2 ký tự' : 'Full name must be at least 2 characters';
    }
    return null;
}
function validateBookingPetName(petName, lang) {
    const trimmed = petName.trim();
    if (!trimmed) {
        return lang === 'vi' ? 'Vui lòng nhập tên của bé' : "Please enter your pet's name";
    }
    return null;
}
function generateServiceBookingCode(existingBookingsCount = 0) {
    const seq = String(Math.max(1, existingBookingsCount + 1)).padStart(4, '0');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    // Format like DL-2026-0001 or DL-2026-XXXX
    return existingBookingsCount >= 0 && existingBookingsCount < 9999 ? `DL-2026-${seq}` : `DL-2026-${randSuffix}`;
}
function generateBookingIcsContent(booking, lang) {
    const dateParts = (booking.date || getTodayLocalIso()).split('-').map(Number);
    const timeParts = (booking.timeSlot || '09:00').split(':').map(Number);
    const year = dateParts[0] || 2026;
    const month = (dateParts[1] || 1) - 1;
    const day = dateParts[2] || 1;
    const hour = timeParts[0] ?? 9;
    const minute = timeParts[1] ?? 0;
    const startDt = new Date(year, month, day, hour, minute, 0);
    const endDt = new Date(startDt.getTime() + 60 * 60 * 1000);
    const toIcsTimestamp = (d)=>{
        const pad = (n)=>String(n).padStart(2, '0');
        return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` + `T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    };
    const summary = lang === 'vi' ? `Animora: ${booking.service} cho bé ${booking.petName || booking.petType}` : `Animora: ${booking.service} for ${booking.petName || booking.petType}`;
    const description = [
        `Mã lịch hẹn / Booking Code: ${booking.code || booking.id}`,
        `Dịch vụ / Service: ${booking.service}`,
        `Thú cưng / Pet: ${booking.petName || ''} (${booking.petType})`,
        `Khách hàng / Customer: ${booking.fullName} - ${booking.phone}`,
        `Hotline Animora: 0337 203 332`
    ].join('\\n');
    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Animora Pet Care//Service Booking//VI',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${booking.code || booking.id}@animora.vn`,
        `DTSTAMP:${toIcsTimestamp(new Date())}`,
        `DTSTART:${toIcsTimestamp(startDt)}`,
        `DTEND:${toIcsTimestamp(endDt)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        'LOCATION:Animora Veterinary & Holistic Spa Center',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
}
function parseServiceBookingUrl(pathname, search = '') {
    const cleanPath = pathname.replace(/\/+$/, '') || '/';
    const params = new URLSearchParams(search);
    const serviceParam = params.get('service');
    if (cleanPath === '/dat-lich/thanh-cong') {
        return {
            isBookingRoute: true,
            isSuccessRoute: true,
            preselectedServiceSlug: serviceParam ? resolveServiceBySlugOrName(serviceParam).slug : null
        };
    }
    if (cleanPath === '/dat-lich') {
        return {
            isBookingRoute: true,
            isSuccessRoute: false,
            preselectedServiceSlug: serviceParam ? resolveServiceBySlugOrName(serviceParam).slug : null
        };
    }
    return {
        isBookingRoute: false,
        isSuccessRoute: false,
        preselectedServiceSlug: null
    };
}
}),
"[project]/src/data/servicesData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SERVICES_DATA",
    ()=>SERVICES_DATA,
    "SERVICE_CATEGORIES",
    ()=>SERVICE_CATEGORIES,
    "formatServicePrice",
    ()=>formatServicePrice
]);
const SERVICE_CATEGORIES = [
    {
        id: 'all',
        labelVi: 'Tất cả dịch vụ',
        labelEn: 'All Services'
    },
    {
        id: 'vet',
        labelVi: 'Thú y & Nha khoa',
        labelEn: 'Veterinary & Dental'
    },
    {
        id: 'spa',
        labelVi: 'Spa & Grooming',
        labelEn: 'Spa & Grooming'
    },
    {
        id: 'training',
        labelVi: 'Huấn luyện',
        labelEn: 'Training'
    },
    {
        id: 'boarding',
        labelVi: 'Lưu trú 24/7',
        labelEn: '24/7 Boarding'
    }
];
const formatServicePrice = (price)=>{
    return `${price.toLocaleString('vi-VN')}đ`;
};
const SERVICES_DATA = [
    {
        id: 'checkup',
        slug: 'kham-tong-quat',
        name: {
            vi: 'Khám tổng quát',
            en: 'Comprehensive Vet Checkup'
        },
        category: 'vet',
        categoryLabel: {
            vi: 'Thú y & Nha khoa',
            en: 'Veterinary & Dental'
        },
        icon: 'checkup',
        shortDescription: {
            vi: 'Khám lâm sàng 12 bước, siêu âm ổ bụng, xét nghiệm máu sinh hóa và phác đồ tiêm chủng chuẩn quốc tế cho chó, mèo, thỏ, hamster và chim cảnh.',
            en: '12-point clinical exam, abdominal ultrasound, blood panel, and customized vaccination schedules across dogs, cats, rabbits, hamsters, and birds.'
        },
        description: {
            vi: [
                'Gói Khám tổng quát tại Animora được thiết kế theo tiêu chuẩn y khoa Fear-Free (Không Căng Thẳng), giúp phát hiện sớm các dấu hiệu bất thường về tim mạch, tiêu hóa, xương khớp, da liễu và ký sinh trùng ở từng giai đoạn phát triển của bé.',
                'Mỗi lượt khám diễn ra trong phòng cách âm riêng biệt theo loài có bàn khám sưởi ấm 37.5°C và tinh dầu pheromone tự nhiên. Bác sĩ trực tiếp kiểm tra 12 chỉ số lâm sàng và giải thích chi tiết từng kết quả cho ba mẹ.',
                'Toàn bộ lịch sử khám, chỉ số cân nặng, kết quả xét nghiệm và lịch nhắc tiêm phòng tiếp theo được đồng bộ tức thì vào Sổ sức khỏe điện tử Animora để gia đình dễ dàng theo dõi mọi lúc.'
            ],
            en: [
                'Our Comprehensive Vet Checkup follows international Fear-Free veterinary standards to detect early signs of cardiovascular, digestive, orthopedic, dermatological, and parasitic conditions across every life stage.',
                'Consultations take place inside species-separated, sound-insulated exam suites equipped with 37.5°C warmed tables and calming natural pheromones. Your veterinarian performs a thorough 12-point assessment and walks you through every finding.',
                'All clinical notes, weight trends, lab results, and upcoming vaccine reminders are synced immediately to your Animora Digital Health Passport for effortless tracking.'
            ]
        },
        duration: {
            vi: '45 phút',
            en: '45 mins'
        },
        priceFrom: 590000,
        dependsOnWeight: true,
        suitablePets: {
            vi: 'Chó, Mèo, Thỏ, Hamster, Chim cảnh',
            en: 'Dogs, Cats, Rabbits, Hamsters, Exotic Birds'
        },
        included: {
            vi: [
                'Đo sinh hiệu, nghe tim phổi & kiểm tra niêm mạc',
                'Soi tai vi điểm, kiểm tra da lông & ký sinh trùng',
                'Tư vấn dinh dưỡng theo lứa tuổi & giống loài',
                'Cập nhật trực tiếp vào Sổ sức khỏe điện tử Animora',
                'Kiểm tra khớp xương, phản xạ vận động & tuyến lệ',
                'Lập phác đồ tiêm phòng & tẩy giun định kỳ cá nhân hóa'
            ],
            en: [
                'Vital signs, cardiopulmonary & mucosal screening',
                'Microscopic ear, coat & parasite examination',
                'Species- & age-specific clinical nutrition consult',
                'Instant sync with Animora Digital Health Passport',
                'Orthopedic joint, mobility & ophthalmic check',
                'Personalized vaccination & deworming schedule'
            ]
        },
        steps: [
            {
                titleVi: 'Tiếp nhận & làm quen dịu dàng',
                titleEn: 'Gentle Fear-Free Welcome',
                textVi: 'Đo cân nặng, thân nhiệt tại sảnh chờ tách biệt theo loài để bé làm quen với bác sĩ.',
                textEn: 'Record weight and temperature in a calm, species-separated lounge before beginning.'
            },
            {
                titleVi: 'Khám lâm sàng 12 bước toàn diện',
                titleEn: '12-Point Clinical Examination',
                textVi: 'Nghe tim phổi, kiểm tra mắt, mũi, tai vi điểm, răng nướu, hạch bạch huyết và ổ bụng.',
                textEn: 'Assess heart, lungs, eyes, microscopic ear health, oral cavity, lymph nodes, and abdomen.'
            },
            {
                titleVi: 'Siêu âm tầm soát & xét nghiệm nhanh',
                titleEn: 'Diagnostic Screening & Lab Check',
                textVi: 'Soi da lông tìm ký sinh trùng và kiểm tra các chỉ số sinh hóa cơ bản khi cần thiết.',
                textEn: 'Perform coat parasite microscopy and baseline diagnostic screening as needed.'
            },
            {
                titleVi: 'Tư vấn dinh dưỡng & đồng bộ Sổ sức khỏe',
                titleEn: 'Nutrition Plan & Digital Passport Sync',
                textVi: 'Bác sĩ giải thích kết quả, kê thực đơn theo loài và cập nhật lịch hẹn tái khám.',
                textEn: 'Review results together, tailor the daily diet, and update your digital health record.'
            }
        ],
        priceTable: [
            {
                weightRangeVi: 'Dưới 5kg',
                weightRangeEn: 'Under 5kg',
                price: 590000
            },
            {
                weightRangeVi: '5 - 10kg',
                weightRangeEn: '5 - 10kg',
                price: 690000
            },
            {
                weightRangeVi: '10 - 20kg',
                weightRangeEn: '10 - 20kg',
                price: 820000
            },
            {
                weightRangeVi: 'Trên 20kg',
                weightRangeEn: 'Over 20kg',
                price: 980000
            }
        ],
        tips: {
            vi: [
                'Cho bé nhịn ăn nhẹ từ 4–6 tiếng trước buổi khám nếu cần lấy máu xét nghiệm sinh hóa.',
                'Mang theo sổ tiêm chủng cũ hoặc hình ảnh các loại thức ăn, thuốc bé đang sử dụng.',
                'Đặt các bé mèo, thỏ và hamster trong lồng vận chuyển thoáng khí có lót khăn quen mùi.',
                'Ghi chú lại những biểu hiện lạ (hắt hơi, biếng ăn, gãi tai...) trong 7 ngày gần nhất.'
            ],
            en: [
                'Fast your pet for 4–6 hours prior to the visit if a blood chemistry panel is needed.',
                'Bring any previous vaccination booklets or photos of current food and medications.',
                'Transport cats, rabbits, and hamsters in a ventilated carrier lined with a familiar blanket.',
                'Jot down any unusual behaviors (sneezing, appetite changes, ear scratching) from the past week.'
            ]
        },
        faq: [
            {
                questionVi: 'Bao lâu nên đưa bé đi khám tổng quát định kỳ một lần?',
                questionEn: 'How often should my pet have a comprehensive checkup?',
                answerVi: 'Với các bé trưởng thành khỏe mạnh, nên khám định kỳ 6 tháng/lần. Với thú cưng nhỏ dưới 1 tuổi hoặc các bé lớn tuổi (trên 7 tuổi), khuyến khích kiểm tra mỗi 3–4 tháng/lần.',
                answerEn: 'Healthy adult pets should be examined every 6 months. Young pets under 1 year and senior companions (7+ years) benefit from checkups every 3–4 months.'
            },
            {
                questionVi: 'Gói khám tổng quát đã bao gồm mũi tiêm vắc-xin chưa?',
                questionEn: 'Does the checkup fee include vaccination shots?',
                answerVi: 'Gói khám đã bao gồm khám sàng lọc trước tiêm và tư vấn phác đồ. Chi phí mũi vắc-xin cụ thể sẽ được bác sĩ thông báo minh bạch tùy theo loài và loại vắc-xin cần tiêm.',
                answerEn: 'The package covers pre-vaccine screening and scheduling. Specific vaccine doses are quoted transparently based on species and required protection.'
            },
            {
                questionVi: 'Thỏ cảnh và Hamster có bác sĩ chuyên khoa riêng không?',
                questionEn: 'Do you have dedicated specialists for rabbits and hamsters?',
                answerVi: 'Có. Animora có chuyên khoa Thú nhỏ & Ngoại lai riêng biệt với thiết bị soi răng hàm, nghe nhịp tim tần số cao chuyên dụng cho thỏ, chuột lang, hamster và chim vẹt.',
                answerEn: 'Yes. Animora has a dedicated Exotic & Small Pet wing with specialized dental otoscopes and high-frequency stethoscopes for rabbits, guinea pigs, hamsters, and birds.'
            }
        ]
    },
    {
        id: 'spa',
        slug: 'spa-tam',
        name: {
            vi: 'Spa & tắm',
            en: 'Herbal Spa & Grooming'
        },
        category: 'spa',
        categoryLabel: {
            vi: 'Spa & Grooming',
            en: 'Spa & Grooming'
        },
        icon: 'spa',
        shortDescription: {
            vi: 'Liệu trình tắm sục ozone thảo mộc hữu cơ kết hợp massage thư giãn, cắt mài móng, vệ sinh tuyến hôi và tạo kiểu lông chuẩn từng giống.',
            en: 'Organic botanical micro-bubble ozone bath, calming massage, nail grinding, sanitary trim, and breed-standard scissoring.'
        },
        description: {
            vi: [
                'Tổ hợp Thủy trị liệu & Spa Thảo mộc của Animora sử dụng hệ thống bồn sục siêu vi bọt Ozone giúp làm sạch sâu lỗ chân lông mà không cần chà xát mạnh, kết hợp 100% tinh chất yến mạch, hoa cúc La Mã và oải hương thuần chay.',
                'Mỗi bé được 1 kỹ thuật viên Grooming hạng A chăm sóc xuyên suốt từ bước chải gỡ rối, vệ sinh tai, cắt mài móng tròn êm ái cho đến sấy lồng tĩnh âm dưới 45dB — hoàn toàn không gây giật mình cho các bé nhạy cảm.',
                'Sau liệu trình, da lông của bé được cân bằng độ pH tự nhiên, mềm mượt dài lâu và lưu hương thảo mộc thanh khiết dịu nhẹ suốt nhiều ngày.'
            ],
            en: [
                'Animora’s Herbal Hydro-Spa combines micro-bubble ozone hydrotherapy with 100% vegan oatmeal, Roman chamomile, and organic lavender extracts to deep-cleanse pores gently without harsh scrubbing.',
                'Every pet receives dedicated 1-on-1 care from a Class-A certified stylist—from gentle detangling, ear hygiene, and smooth nail buffing to sub-45dB whisper drying designed for sound-sensitive companions.',
                'Your pet leaves with a balanced skin pH, a silky, tangle-free coat, and a soothing natural botanical scent that lasts.'
            ]
        },
        duration: {
            vi: '75 – 90 phút',
            en: '75 – 90 mins'
        },
        priceFrom: 490000,
        dependsOnWeight: true,
        suitablePets: {
            vi: 'Chó, Mèo, Thỏ cảnh lông dài',
            en: 'Dogs, Cats, Long-haired Rabbits'
        },
        included: {
            vi: [
                'Tắm sục thảo mộc yến mạch & hoa cúc dịu nhẹ',
                'Sấy lồng tĩnh âm dưới 45dB chống giật mình',
                'Cắt tỉa lông bàn chân, vệ sinh tai & mài móng êm',
                'Xịt dưỡng tinh dầu oải hương giữ ẩm da lông',
                'Vệ sinh tuyến hôi & cạo tỉa vùng vệ sinh gọn gàng',
                'Massage bấm huyệt thư giãn cổ vai & đệm thịt bàn chân'
            ],
            en: [
                'Oatmeal & chamomile micro-bubble hydro-bath',
                'Sub-45dB whisper drying for anxious pets',
                'Paw pad trim, gentle ear cleaning & nail buffing',
                'Organic lavender coat conditioning mist',
                'Sanitary trim & gentle anal gland expression',
                'Calming neck, shoulder & paw-balm acupressure massage'
            ]
        },
        steps: [
            {
                titleVi: 'Kiểm tra da lông & chải gỡ rối tơ',
                titleEn: 'Coat Inspection & Gentle Detangling',
                textVi: 'Kiểm tra tình trạng da, độ ẩm lông và chải mở nút rối bằng lược đệm khí êm ái.',
                textEn: 'Assess skin sensitivity and gently brush out tangles using air-cushioned pins.'
            },
            {
                titleVi: 'Vệ sinh tai, cắt mài móng & tỉa đệm chân',
                titleEn: 'Ear Hygiene, Nail Buffing & Paw Care',
                textVi: 'Làm sạch ống tai bằng dung dịch thảo dược, cắt và mài nhẵn đầu móng không sắc nhọn.',
                textEn: 'Clean ears with botanical lotion, clip nails, and buff edges smooth.'
            },
            {
                titleVi: 'Tắm sục siêu vi bọt Ozone & ủ thảo mộc',
                titleEn: 'Ozone Micro-Bubble Bath & Herbal Mask',
                textVi: 'Ngâm sục bọt oxy ấm 38°C kết hợp massage tinh chất yến mạch và hoa cúc trong 15 phút.',
                textEn: 'Soak in 38°C micro-bubble water with a 15-minute oatmeal and chamomile massage.'
            },
            {
                titleVi: 'Sấy tĩnh âm & tạo kiểu hoàn thiện',
                titleEn: 'Whisper Drying & Finishing Touch',
                textVi: 'Sấy khô êm dịu dưới 45dB, chải phồng tạo phom và xịt khoáng dưỡng ẩm tinh dầu.',
                textEn: 'Fluff-dry below 45dB, style to breed contour, and finish with lavender conditioning mist.'
            }
        ],
        priceTable: [
            {
                weightRangeVi: 'Dưới 5kg',
                weightRangeEn: 'Under 5kg',
                price: 490000
            },
            {
                weightRangeVi: '5 - 10kg',
                weightRangeEn: '5 - 10kg',
                price: 620000
            },
            {
                weightRangeVi: '10 - 20kg',
                weightRangeEn: '10 - 20kg',
                price: 790000
            },
            {
                weightRangeVi: 'Trên 20kg',
                weightRangeEn: 'Over 20kg',
                price: 990000
            }
        ],
        tips: {
            vi: [
                'Không nên cho bé ăn quá no trong vòng 1 tiếng trước khi tắm sục thủy trị liệu.',
                'Các bé mới tiêm vắc-xin cần kiêng tắm nước ít nhất 7 ngày (có thể chọn gói Spa tắm khô thảo mộc).',
                'Thông báo trước cho chuyên viên nếu bé có vết xước ngoài da hoặc từng nhạy cảm với máy sấy.',
                'Có thể mang theo kiểu ảnh cắt tỉa yêu thích để Groomer tư vấn phom phù hợp khuôn mặt bé.'
            ],
            en: [
                'Avoid feeding a heavy meal within 1 hour before the hydrotherapy bath.',
                'Pets vaccinated within the last 7 days should wait before water bathing (dry herbal spa is available).',
                'Let our stylist know if your pet has any skin scrapes or dryer sensitivity.',
                'Feel free to bring reference photos if you want a custom breed haircut.'
            ]
        },
        faq: [
            {
                questionVi: 'Mèo sợ nước có thể tham gia gói Spa & tắm được không?',
                questionEn: 'Can water-shy cats safely enjoy the Herbal Spa package?',
                answerVi: 'Hoàn toàn được. Khu vực Spa cho Mèo tách biệt hoàn toàn với Chó, sử dụng vòi nước áp lực siêu nhẹ và khăn ấm thảo mộc giúp mèo bình tĩnh trong suốt buổi tắm.',
                answerEn: 'Absolutely. Our feline spa studio is completely separate from dogs and uses low-pressure warm streams and herbal towel wraps to keep cats relaxed.'
            },
            {
                questionVi: 'Sữa tắm tại Animora có an toàn cho bé bị viêm da dị ứng không?',
                questionEn: 'Are your shampoos safe for pets with allergic dermatitis?',
                answerVi: 'Tất cả sản phẩm tắm gội đều là dòng hữu cơ y khoa không chứa sulfate, paraben hay hương liệu tổng hợp, cực kỳ lành tính cho làn da nhạy cảm.',
                answerEn: 'All shampoos are veterinary-grade organic formulas free of sulfates, parabens, and synthetic fragrances—ideal for sensitive or allergy-prone skin.'
            },
            {
                questionVi: 'Chủ nuôi có thể quan sát trực tiếp quá trình tắm của bé không?',
                questionEn: 'Can pet parents watch the grooming session?',
                answerVi: 'Phòng Spa có vách kính trong suốt một chiều để ba mẹ thoải mái thưởng thức trà hoa và quan sát bé mà không làm bé phân tâm.',
                answerEn: 'Yes! Our spa features a viewing lounge where you can enjoy herbal tea and watch your pet without distracting them.'
            }
        ]
    },
    {
        id: 'training',
        slug: 'huan-luyen',
        name: {
            vi: 'Huấn luyện',
            en: 'Positive Behavioral Training'
        },
        category: 'training',
        categoryLabel: {
            vi: 'Huấn luyện',
            en: 'Training'
        },
        icon: 'training',
        shortDescription: {
            vi: 'Phương pháp khen thưởng tích cực (Positive Reinforcement) giúp bé xây dựng thói quen đi vệ sinh đúng chỗ, giao tiếp tự tin và giảm lo âu.',
            en: '100% force-free positive reinforcement training for potty habits, calm leash manners, socialization, and anxiety relief.'
        },
        description: {
            vi: [
                'Chương trình Huấn luyện & Giao tiếp Hành vi tại Animora áp dụng 100% phương pháp củng cố tích cực (Positive Reinforcement) đạt chuẩn Hiệp hội Hành vi Động vật Quốc tế (IAABC) — tuyệt đối không dùng quát mắng hay áp lực tâm lý.',
                'Huấn luyện viên làm việc trực tiếp 1-kèm-1 cùng bé và chủ nuôi để giải mã ngôn ngữ cơ thể, xây dựng thói quen đi vệ sinh đúng khay, đi dạo không kéo dây và khắc phục chứng lo âu khi xa chủ.',
                'Mỗi buổi học kết thúc bằng cẩm nang thực hành 10 phút mỗi ngày tại nhà, giúp gắn kết tình cảm bền chặt giữa bé và cả gia đình.'
            ],
            en: [
                'Animora’s Positive Behavioral Training uses 100% force-free, reward-based methods certified by the International Association of Animal Behavior Consultants (IAABC)—never punishment or intimidation.',
                'Our behaviorists work 1-on-1 with your pet and family to decode body language, establish reliable potty habits, master loose-leash walking, and soothe separation anxiety.',
                'Every session includes a practical 10-minute daily home routine to strengthen trust and joyful communication between you and your companion.'
            ]
        },
        duration: {
            vi: '60 phút / buổi',
            en: '60 mins / session'
        },
        priceFrom: 690000,
        dependsOnWeight: false,
        suitablePets: {
            vi: 'Chó, Mèo, Thỏ cảnh, Vẹt cảnh',
            en: 'Dogs, Cats, Rabbits, Parrots'
        },
        included: {
            vi: [
                'Đánh giá tâm lý & thói quen hành vi 1-kèm-1',
                'Rèn nếp đi vệ sinh đúng khay cho chó, mèo & thỏ',
                'Khắc phục thói quen sủa nhiều hoặc sợ người lạ',
                'Hướng dẫn chủ nuôi đồng hành thực hành tại nhà',
                'Bài tập kích thích trí thông minh (Enrichment Puzzle)',
                'Báo cáo tiến độ video & hỗ trợ giải đáp trực tuyến'
            ],
            en: [
                '1-on-1 behavioral & temperament assessment',
                'Litter & potty training for puppies, kittens & rabbits',
                'Reactivity, barking & separation anxiety coaching',
                'Take-home parent coaching guide',
                'Cognitive enrichment & puzzle games',
                'Video progress log & ongoing online support'
            ]
        },
        steps: [
            {
                titleVi: 'Đánh giá tính cách & môi trường sống',
                titleEn: 'Temperament & Lifestyle Assessment',
                textVi: 'Tìm hiểu thói quen sinh hoạt, nguyên nhân gây căng thẳng hoặc hành vi chưa mong muốn.',
                textEn: 'Analyze daily routines, triggers, and underlying emotional needs.'
            },
            {
                titleVi: 'Thiết lập tín hiệu thưởng Clicker êm ái',
                titleEn: 'Clicker & Reward Marker Conditioning',
                textVi: 'Giúp bé hiểu rõ hành vi đúng thông qua tín hiệu âm thanh nhẹ và phần thưởng hữu cơ.',
                textEn: 'Build clear communication using gentle clicker markers and high-value organic treats.'
            },
            {
                titleVi: 'Thực hành tình huống thực tế 1-kèm-1',
                titleEn: '1-on-1 Real-World Scenario Practice',
                textVi: 'Rèn kỹ năng bình tĩnh khi gặp người lạ, thú cưng khác và nghe hiệu lệnh cơ bản.',
                textEn: 'Practice calm greetings, impulse control, and reliable recall in our enrichment garden.'
            },
            {
                titleVi: 'Chuyển giao kỹ năng cho chủ nuôi',
                titleEn: 'Pet Parent Handover & Home Plan',
                textVi: 'Hướng dẫn ba mẹ cách duy trì phản xạ tích cực chỉ với 10 phút tương tác mỗi ngày.',
                textEn: 'Coach pet parents on maintaining progress with simple 10-minute daily games.'
            }
        ],
        priceTable: [
            {
                weightRangeVi: 'Dưới 5kg',
                weightRangeEn: 'Under 5kg',
                price: 690000
            },
            {
                weightRangeVi: '5 - 10kg',
                weightRangeEn: '5 - 10kg',
                price: 750000
            },
            {
                weightRangeVi: '10 - 20kg',
                weightRangeEn: '10 - 20kg',
                price: 850000
            },
            {
                weightRangeVi: 'Trên 20kg',
                weightRangeEn: 'Over 20kg',
                price: 950000
            }
        ],
        tips: {
            vi: [
                'Cho bé ăn bữa nhẹ (khoảng 50% khẩu phần) trước buổi học để bé hào hứng với bánh thưởng huấn luyện.',
                'Mang theo dây dắt ngực (Harness) vừa vặn và món đồ chơi bé yêu thích nhất.',
                'Khuyến khích các thành viên trong gia đình cùng tham gia 15 phút cuối buổi để thống nhất khẩu lệnh.'
            ],
            en: [
                'Feed a light half-meal before class so your pet stays motivated for training treats.',
                'Bring a comfortable front-clip harness and your pet’s favorite toy.',
                'Family members are encouraged to join the final 15 minutes to keep cues consistent at home.'
            ]
        },
        faq: [
            {
                questionVi: 'Bé đã lớn tuổi (trên 3 tuổi) có còn huấn luyện sửa thói quen được không?',
                questionEn: 'Can adult pets over 3 years old still learn new habits?',
                answerVi: 'Hoàn toàn được. Với phương pháp củng cố tích cực, thú cưng ở mọi lứa tuổi đều có thể học thói quen mới và giảm lo âu hiệu quả.',
                answerEn: 'Yes! With positive reinforcement, adult and senior pets learn new habits and overcome anxiety wonderfully.'
            },
            {
                questionVi: 'Cần bao nhiêu buổi để bé đi vệ sinh đúng chỗ?',
                questionEn: 'How many sessions does potty training usually take?',
                answerVi: 'Thông thường sau 2–3 buổi hướng dẫn kết hợp sắp xếp lại khu vực khay vệ sinh tại nhà, hơn 90% các bé đã hình thành phản xạ đúng chỗ.',
                answerEn: 'Most puppies, kittens, and rabbits master consistent litter or pad habits within 2–3 guided sessions plus home setup.'
            },
            {
                questionVi: 'Animora có nhận huấn luyện thỏ cảnh và vẹt cảnh không?',
                questionEn: 'Do you offer training for rabbits and parrots?',
                answerVi: 'Có. Chúng tôi có các bài tập Clicker giúp thỏ đi vệ sinh đúng khay, tự nguyện vào lồng và giúp vẹt làm quen đứng tay thân thiện.',
                answerEn: 'Yes. We offer clicker training for rabbit litter habits, voluntary carrier entry, and gentle parrot step-up bonding.'
            }
        ]
    },
    {
        id: 'boarding',
        slug: 'luu-tru',
        name: {
            vi: 'Lưu trú',
            en: '24/7 Luxury Multi-Species Boarding'
        },
        category: 'boarding',
        categoryLabel: {
            vi: 'Lưu trú 24/7',
            en: '24/7 Boarding'
        },
        icon: 'boarding',
        shortDescription: {
            vi: 'Khách sạn thú cưng tách biệt hoàn toàn giữa khu Chó, khu Mèo và khu Thú nhỏ, trang bị điều hòa lọc khí HEPA và camera Full HD 24/7.',
            en: 'Species-isolated luxury suites with HEPA climate control, daily garden playtime, and 24/7 live HD camera access.'
        },
        description: {
            vi: [
                'Khách sạn Lưu trú Đa loài Animora mang đến không gian nghỉ dưỡng chuẩn 5 sao với 3 phân khu cách âm hoàn toàn độc lập: Khu Villa Chó, Khu Condo Mèo nhiều tầng và Khu Sanctuary Thú nhỏ (Thỏ, Hamster, Chim cảnh).',
                'Mỗi phòng nghỉ đều được kiểm soát nhiệt độ 24–26°C, độ ẩm tiêu chuẩn, hệ thống lọc khí tươi HEPA y tế và camera Full HD kết nối trực tiếp vào điện thoại để ba mẹ ngắm nhìn bé bất cứ lúc nào.',
                'Đội ngũ điều dưỡng nội trú và bác sĩ thú y túc trực 24/7, phục vụ 3 bữa ăn dinh dưỡng cá nhân hóa cùng khung giờ dạo chơi sân cỏ tự nhiên mỗi sáng và chiều.'
            ],
            en: [
                'Animora’s Luxury Multi-Species Boarding Sanctuary features three sound-isolated wings: Canine Garden Villas, Multi-Level Feline Condos, and Exotic Small Pet Suites.',
                'Every private suite maintains 24–26°C climate control, medical-grade HEPA air filtration, orthopedic bedding, and 24/7 live Full HD camera streaming straight to your phone.',
                'With round-the-clock veterinary nurses, three customized daily meals, and supervised morning and afternoon garden play, you can travel with complete peace of mind.'
            ]
        },
        duration: {
            vi: 'Theo đêm lưu trú',
            en: 'Per night'
        },
        priceFrom: 390000,
        dependsOnWeight: true,
        priceUnit: {
            vi: '/ đêm',
            en: '/ night'
        },
        suitablePets: {
            vi: 'Chó, Mèo, Thỏ, Hamster, Chim cảnh',
            en: 'Dogs, Cats, Rabbits, Hamsters, Birds'
        },
        included: {
            vi: [
                'Phòng nghỉ riêng khử khuẩn hàng ngày kèm đệm êm',
                'Camera trực tuyến 24/7 xem bé mọi lúc trên điện thoại',
                '3 bữa ăn dinh dưỡng + giờ vận động sân cỏ mỗi ngày',
                'Bác sĩ thú y kiểm tra sức khỏe 2 lần/ngày',
                'Cập nhật nhật ký hình ảnh & video sáng - tối qua Zalo/App',
                'Miễn phí chải lông thư giãn & vệ sinh mắt mũi mỗi sáng'
            ],
            en: [
                'Sanitized private suite with orthopedic bedding',
                '24/7 live HD smartphone camera access',
                '3 tailored daily meals + supervised garden play',
                'Twice-daily veterinary wellness rounds',
                'Morning & evening photo/video journal updates',
                'Complimentary daily brushing & facial hygiene'
            ]
        },
        steps: [
            {
                titleVi: 'Khám sàng lọc sức khỏe trước khi nhận phòng',
                titleEn: 'Pre-Check-In Veterinary Screening',
                textVi: 'Bác sĩ kiểm tra sinh hiệu, da lông và sổ tiêm chủng để đảm bảo môi trường lưu trú an toàn.',
                textEn: 'Verify vitals, coat health, and vaccination status to keep all guests safe.'
            },
            {
                titleVi: 'Nhận phòng riêng & kết nối Camera 24/7',
                titleEn: 'Suite Setup & Live Camera Pairing',
                textVi: 'Sắp xếp chăn đệm quen mùi của bé và cấp mã truy cập camera trực tiếp cho chủ nuôi.',
                textEn: 'Settle your pet with familiar bedding and activate your private 24/7 livestream link.'
            },
            {
                titleVi: 'Chăm sóc dinh dưỡng & vận động mỗi ngày',
                titleEn: 'Daily Meals, Playtime & Night Care',
                textVi: 'Phục vụ 3 bữa ăn theo thực đơn riêng, vui chơi sân cỏ và gửi video nhật ký hàng ngày.',
                textEn: 'Serve 3 tailored meals, host supervised playtime, and send daily video updates.'
            },
            {
                titleVi: 'Kiểm tra tổng quát & bàn giao khi trả phòng',
                titleEn: 'Check-Out Wellness Summary',
                textVi: 'Vệ sinh thơm tho, tổng kết nhật ký ăn ngủ và bàn giao bé khỏe mạnh cho gia đình.',
                textEn: 'Perform a final freshen-up and share a complete stay report upon pick-up.'
            }
        ],
        priceTable: [
            {
                weightRangeVi: 'Dưới 5kg',
                weightRangeEn: 'Under 5kg',
                price: 390000
            },
            {
                weightRangeVi: '5 - 10kg',
                weightRangeEn: '5 - 10kg',
                price: 490000
            },
            {
                weightRangeVi: '10 - 20kg',
                weightRangeEn: '10 - 20kg',
                price: 620000
            },
            {
                weightRangeVi: 'Trên 20kg',
                weightRangeEn: 'Over 20kg',
                price: 780000
            }
        ],
        tips: {
            vi: [
                'Mang theo một chiếc áo hoặc khăn nhỏ có mùi hương của chủ nuôi để bé nhanh chóng an tâm ở phòng mới.',
                'Nếu bé đang ăn chế độ đặc biệt hoặc dùng thuốc định kỳ, vui lòng mang kèm và ghi rõ liều lượng.',
                'Đặt phòng trước 3–5 ngày vào các dịp Lễ, Tết hoặc cuối tuần để chọn được hạng phòng ưng ý nhất.'
            ],
            en: [
                'Pack a small blanket or t-shirt with your scent to help your pet feel right at home.',
                'Bring any prescription diets or medications with clear dosage instructions.',
                'Book 3–5 days in advance for weekends and holidays to reserve your preferred suite.'
            ]
        },
        faq: [
            {
                questionVi: 'Ban đêm có nhân viên trực chăm sóc các bé không?',
                questionEn: 'Is there overnight staff on-site with the pets?',
                answerVi: 'Có. Điều dưỡng nội trú của Animora trực xuyên đêm tại khu lưu trú, kiểm tra nhiệt độ phòng và hỗ trợ ngay nếu bé cần đi vệ sinh hoặc uống nước.',
                answerEn: 'Yes. Our night-care veterinary nurses stay on-site all night, monitoring room climate and tending to every guest.'
            },
            {
                questionVi: 'Các bé có bị nhốt chung với thú cưng của gia đình khác không?',
                questionEn: 'Do pets share suites with animals from other households?',
                answerVi: 'Tuyệt đối không. Mỗi bé (hoặc các bé cùng một gia đình theo yêu cầu) ở một phòng riêng biệt hoàn toàn.',
                answerEn: 'Never. Every guest stays in a private suite (siblings from the same family may share upon request).'
            },
            {
                questionVi: 'Lưu trú dài ngày từ 7 đêm trở lên có ưu đãi không?',
                questionEn: 'Is there a discount for long-term stays of 7+ nights?',
                answerVi: 'Khi lưu trú từ 7 đêm trở lên, bé được giảm 10% tổng chi phí phòng và tặng miễn phí 1 buổi Tắm thảo mộc trước khi về nhà.',
                answerEn: 'Stays of 7 nights or more receive a 10% suite discount plus a complimentary Herbal Spa bath before check-out.'
            }
        ]
    },
    {
        id: 'dental',
        slug: 'nha-khoa-thu-nho',
        name: {
            vi: 'Nha khoa & Chăm sóc Thú nhỏ',
            en: 'Dental & Exotic Small Pet Care'
        },
        category: 'vet',
        categoryLabel: {
            vi: 'Thú y & Nha khoa',
            en: 'Veterinary & Dental'
        },
        icon: 'dental',
        shortDescription: {
            vi: 'Lấy cao răng sóng siêu âm êm ái cho chó mèo, chỉnh nha & mài răng chuyên sâu cho thỏ cảnh, chuột lang và tỉa mỏ/móng an toàn cho chim vẹt.',
            en: 'Ultrasonic dental scaling for dogs and cats, specialized molar trimming for rabbits & guinea pigs, and avian beak/nail care.'
        },
        description: {
            vi: [
                'Sức khỏe răng miệng đóng vai trò quyết định đến khả năng tiêu hóa và tuổi thọ của thú cưng — đặc biệt là các loài răng mọc dài suốt đời như Thỏ cảnh, Chuột lang (Guinea Pig), Chinchilla và Hamster.',
                'Chuyên khoa Nha khoa & Thú nhỏ của Animora trang bị máy lấy cao răng sóng siêu âm Piezo thế hệ mới không làm tổn thương men răng cho chó mèo, cùng bộ dụng cụ nội soi và mài chỉnh răng hàm chuyên dụng cho thỏ cảnh.',
                'Sau khi làm sạch và chỉnh nha êm ái, bác sĩ phủ gel thảo mộc kháng khuẩn làm dịu nướu và hướng dẫn chế độ cỏ khô Timothy / đồ gặm mài răng tự nhiên tại nhà.'
            ],
            en: [
                'Oral health is vital to digestion and longevity—especially for open-rooted species like Rabbits, Guinea Pigs, Chinchillas, and Hamsters whose teeth grow continuously.',
                'Animora’s Dental & Exotic Care unit utilizes gentle Piezo ultrasonic scaling for dogs and cats alongside specialized oral endoscopes and molar burrs for small herbivores.',
                'Following treatment, we apply soothing antibacterial botanical gum gel and customize a home hay and dental chew regimen.'
            ]
        },
        duration: {
            vi: '50 phút',
            en: '50 mins'
        },
        priceFrom: 550000,
        dependsOnWeight: true,
        suitablePets: {
            vi: 'Thỏ, Hamster, Chuột lang, Chim vẹt, Chó, Mèo',
            en: 'Rabbits, Hamsters, Guinea Pigs, Parrots, Dogs, Cats'
        },
        included: {
            vi: [
                'Kiểm tra khớp cắn & răng hàm chuyên sâu cho Thỏ/Bọ ú',
                'Làm sạch mảng bám bằng sóng siêu âm không đau',
                'Kiểm tra túi má Hamster & tỉa mỏ/móng Chim cảnh',
                'Gel thảo mộc kháng khuẩn bảo vệ nướu sau chăm sóc',
                'Đánh bóng bề mặt men răng hạn chế bám mảng mới',
                'Tư vấn khẩu phần cỏ khô Timothy & đồ chơi mài răng'
            ],
            en: [
                'Deep molar & occlusal check for Rabbits & Guinea Pigs',
                'Gentle ultrasonic plaque removal',
                'Hamster cheek pouch & avian grooming check',
                'Post-care herbal gum protection gel',
                'Enamel polishing to slow future tartar buildup',
                'Timothy hay & natural dental chew nutrition guide'
            ]
        },
        steps: [
            {
                titleVi: 'Nội soi khoang miệng & đánh giá khớp cắn',
                titleEn: 'Oral Endoscopy & Occlusal Check',
                textVi: 'Sử dụng ống soi chuyên dụng kiểm tra răng cửa, răng hàm trong và tình trạng viêm nướu.',
                textEn: 'Inspect incisors, deep molars, cheek pouches, and gum health with a gentle oral scope.'
            },
            {
                titleVi: 'Lấy cao răng siêu âm / Mài chỉnh răng hàm',
                titleEn: 'Ultrasonic Scaling / Molar Burring',
                textVi: 'Loại bỏ mảng bám bằng sóng siêu âm hoặc mài phẳng gai răng nhọn gây xước lưỡi ở thỏ.',
                textEn: 'Remove tartar ultrasonically or gently smooth sharp molar spurs in rabbits and rodents.'
            },
            {
                titleVi: 'Đánh bóng men răng & sát khuẩn thảo mộc',
                titleEn: 'Polishing & Botanical Gum Therapy',
                textVi: 'Làm mịn bề mặt răng và thoa gel thảo dược giúp săn chắc nướu, khử mùi hôi miệng.',
                textEn: 'Polish enamel smooth and apply soothing herbal gel to protect gums and freshen breath.'
            },
            {
                titleVi: 'Hướng dẫn chăm sóc răng miệng tại nhà',
                titleEn: 'Home Dental Care Guidance',
                textVi: 'Tư vấn tỷ lệ cỏ khô, khúc gỗ táo mài răng và cách chải răng định kỳ cho bé.',
                textEn: 'Recommend optimal hay ratios, apple-wood chews, and stress-free home brushing tips.'
            }
        ],
        priceTable: [
            {
                weightRangeVi: 'Dưới 5kg',
                weightRangeEn: 'Under 5kg',
                price: 550000
            },
            {
                weightRangeVi: '5 - 10kg',
                weightRangeEn: '5 - 10kg',
                price: 680000
            },
            {
                weightRangeVi: '10 - 20kg',
                weightRangeEn: '10 - 20kg',
                price: 840000
            },
            {
                weightRangeVi: 'Trên 20kg',
                weightRangeEn: 'Over 20kg',
                price: 990000
            }
        ],
        tips: {
            vi: [
                'Đối với Thỏ và Chuột lang: tuyệt đối KHÔNG cho nhịn ăn trước khi đến khám nha khoa.',
                'Đối với Chó và Mèo lấy cao răng chuyên sâu: nên nhịn ăn 6 tiếng trước giờ hẹn (vẫn uống nước lọc bình thường).',
                'Ghi chú nếu bé có biểu hiện chảy nước dãi, làm rơi thức ăn hoặc chỉ nhai một bên hàm.'
            ],
            en: [
                'For Rabbits & Guinea Pigs: NEVER fast your pet before a dental appointment.',
                'For Dogs & Cats having deep ultrasonic scaling: fast for 6 hours prior (water is fine).',
                'Note if your pet has been drooling, dropping food, or chewing on only one side.'
            ]
        },
        faq: [
            {
                questionVi: 'Dấu hiệu nào cho thấy thỏ cảnh đang bị dài răng hàm?',
                questionEn: 'What are the signs of overgrown molars in rabbits?',
                answerVi: 'Thỏ thường giảm ăn cỏ khô, chỉ chọn ăn đồ mềm, chảy nước mắt sống, ướt lông cằm hoặc đi phân viên nhỏ bất thường.',
                answerEn: 'Rabbits often stop eating hay, prefer soft foods, develop watery eyes, wet chin fur, or smaller droppings.'
            },
            {
                questionVi: 'Lấy cao răng sóng siêu âm có làm hại men răng của chó mèo không?',
                questionEn: 'Does ultrasonic scaling damage dog or cat tooth enamel?',
                answerVi: 'Không. Đầu rung siêu âm Piezo chỉ tác động phá vỡ mảng vôi răng cứng và đi kèm bước đánh bóng giúp bảo vệ men răng tối đa.',
                answerEn: 'No. Piezo ultrasonic tips vibrate at a frequency that shatters tartar while leaving enamel intact, followed by protective polishing.'
            },
            {
                questionVi: 'Chim vẹt tỉa mỏ và móng có bị chảy máu hay đau không?',
                questionEn: 'Is avian beak and nail reshaping painful for parrots?',
                answerVi: 'Bác sĩ sử dụng đầu mài kim cương mịn tốc độ thấp có đèn soi mạch máu, hoàn toàn không gây đau hay chảy máu cho bé.',
                answerEn: 'Our avian specialist uses low-speed diamond burrs with vascular transillumination, ensuring a painless, blood-free trim.'
            }
        ]
    }
];
}),
"[project]/src/data/shopData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRODUCT_REVIEWS",
    ()=>PRODUCT_REVIEWS,
    "SHOP_BRANDS",
    ()=>SHOP_BRANDS,
    "SHOP_PRODUCTS",
    ()=>SHOP_PRODUCTS,
    "formatVndPrice",
    ()=>formatVndPrice,
    "mapSpeciesToShopPetGroup",
    ()=>mapSpeciesToShopPetGroup,
    "normalizeViText",
    ()=>normalizeViText,
    "parsePetAgeStage",
    ()=>parsePetAgeStage
]);
const SHOP_PRODUCTS = [
    {
        id: 'prod-1',
        slug: 'hat-nutripet-huu-co-da-loai-2kg',
        name: 'Hạt NutriPet hữu cơ đa loài (2kg)',
        nameEn: 'NutriPet organic multi-species kibble (2kg)',
        price: 320000,
        oldPrice: 400000,
        discountPercent: 20,
        category: 'food',
        petTypes: [
            'dog',
            'cat'
        ],
        brand: 'NutriPet Organic',
        spec: 'Túi 2kg',
        specEn: '2kg bag',
        specOptions: [
            {
                labelVi: 'Túi 1kg',
                labelEn: '1kg bag',
                price: 185000,
                oldPrice: 220000
            },
            {
                labelVi: 'Túi 2kg',
                labelEn: '2kg bag',
                price: 320000,
                oldPrice: 400000
            },
            {
                labelVi: 'Túi 5kg tiết kiệm',
                labelEn: '5kg value bag',
                price: 740000,
                oldPrice: 920000
            }
        ],
        image: '/assets/products/nutripet-organic-2kg.png',
        images: [
            '/assets/products/nutripet-organic-2kg.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'sale'
        ],
        stock: 28,
        rating: 4.9,
        reviewCount: 142,
        createdAtOrder: 16,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Hạt dinh dưỡng hữu cơ công thức cân bằng cho chó và mèo, chế biến từ thịt gà thả vườn, cá hồi tươi và rau củ hữu cơ sấy lạnh giúp bộ lông bóng mượt và tiêu hóa khỏe mạnh mỗi ngày.',
        descriptionEn: 'Balanced organic kibble crafted from free-range chicken, fresh salmon, and freeze-dried organic vegetables for glossy coats and healthy digestion.',
        ingredientsVi: 'Thịt gà hữu cơ rút xương (38%), phi lê cá hồi Na Uy (18%), gạo lứt nguyên cám, khoai lang tím, đậu Hà Lan, cà rốt hữu cơ, dầu cá hồi giàu Omega 3-6, chiết xuất cúc vạn thọ, men vi sinh Bacillus subtilis (2 tỷ CFU/kg), Taurine, Vitamin A, D3, E và khoáng chất chelate.',
        ingredientsEn: 'Deboned organic chicken (38%), Norwegian salmon fillet (18%), whole brown rice, purple sweet potato, green peas, organic carrots, Omega 3-6 salmon oil, marigold extract, Bacillus subtilis probiotics (2B CFU/kg), Taurine, Vitamins A, D3, E and chelated minerals.',
        usageVi: 'Cho ăn trực tiếp theo trọng lượng cơ thể (30g–50g cho bé 2–4kg; 60g–110g cho bé 5–10kg; chia 2–3 bữa/ngày). Luôn chuẩn bị sẵn nước sạch bên cạnh bát ăn và khóa kín miệng túi zip sau khi mở.',
        usageEn: 'Serve dry according to body weight (30g–50g for 2–4kg pets; 60g–110g for 5–10kg pets; split into 2–3 meals daily). Always provide fresh water and reseal the zip pouch after opening.'
    },
    {
        id: 'prod-2',
        slug: 'hat-ca-hoi-huu-co-animora-royal-1-5kg',
        name: 'Hạt cá hồi hữu cơ Animora Royal cho mèo (1.5kg)',
        nameEn: 'Animora Royal organic salmon cat kibble (1.5kg)',
        price: 295000,
        category: 'food',
        petTypes: [
            'cat'
        ],
        brand: 'Animora Royal',
        spec: 'Túi 1.5kg',
        specEn: '1.5kg bag',
        specOptions: [
            {
                labelVi: 'Túi 500g',
                labelEn: '500g bag',
                price: 115000
            },
            {
                labelVi: 'Túi 1.5kg',
                labelEn: '1.5kg bag',
                price: 295000
            },
            {
                labelVi: 'Túi 3kg',
                labelEn: '3kg bag',
                price: 540000
            }
        ],
        image: '/assets/products/royal-salmon-cat.png',
        images: [
            '/assets/products/royal-salmon-cat.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'bestseller'
        ],
        stock: 22,
        rating: 4.8,
        reviewCount: 96,
        createdAtOrder: 15,
        recommendedAges: [
            'baby',
            'adult'
        ],
        description: 'Hạt cá hồi Bắc Âu kết hợp hạt lanh và nam việt quất giúp giảm búi lông tự nhiên, hạn chế sỏi tiết niệu và nuôi dưỡng bộ lông mềm mượt cho mèo mọi lứa tuổi.',
        descriptionEn: 'Nordic salmon kibble blended with flaxseed and cranberries to reduce hairballs naturally, support urinary tract health, and nourish silky fur.',
        ingredientsVi: 'Thịt cá hồi tươi (42%), cá trích sấy lạnh, gạo lứt, bột củ cải đường, quả nam việt quất hữu cơ, hạt lanh ép lạnh, Taurine (2200mg/kg), L-Carnitine, chiết xuất Yucca giảm mùi phân.',
        ingredientsEn: 'Fresh salmon (42%), freeze-dried herring, brown rice, beet pulp, organic cranberries, cold-pressed flaxseed, Taurine (2200mg/kg), L-Carnitine, Yucca schidigera extract.',
        usageVi: 'Dùng cho mèo từ 2 tháng tuổi trở lên. Khi đổi từ loại hạt cũ sang Animora Royal, hãy trộn tăng dần tỷ lệ trong 5–7 ngày để hệ tiêu hóa của bé thích nghi êm ái.',
        usageEn: 'Suitable for cats 2 months and older. Transition gradually over 5–7 days by mixing increasing amounts with current food.'
    },
    {
        id: 'prod-3',
        slug: 'pate-tuoi-ga-va-bi-do-animora-fresh-400g',
        name: 'Pate tươi gà và bí đỏ Animora Fresh (400g)',
        nameEn: 'Animora Fresh chicken & pumpkin wet food (400g)',
        price: 170000,
        oldPrice: 200000,
        discountPercent: 15,
        category: 'food',
        petTypes: [
            'dog',
            'cat'
        ],
        brand: 'Animora Royal',
        spec: 'Hộp 400g',
        specEn: '400g pack',
        specOptions: [
            {
                labelVi: 'Hộp 400g',
                labelEn: '400g pack',
                price: 170000,
                oldPrice: 200000
            },
            {
                labelVi: 'Combo 3 hộp (1.2kg)',
                labelEn: '3-pack (1.2kg)',
                price: 480000,
                oldPrice: 600000
            }
        ],
        image: '/assets/products/pate-pumpkin-chicken.png',
        images: [
            '/assets/products/pate-pumpkin-chicken.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'sale'
        ],
        stock: 35,
        rating: 4.7,
        reviewCount: 52,
        createdAtOrder: 14,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Pate nấu chậm từ ức gà phi lê và bí đỏ hữu cơ giàu độ ẩm, giúp cấp nước tự nhiên cho thận và kích thích vị giác cho những bé chó mèo kén ăn hoặc vừa mới ốm dậy.',
        descriptionEn: 'Slow-cooked wet food made with chicken breast fillet and organic pumpkin for natural hydration and irresistible palatability.',
        ingredientsVi: 'Ức gà tươi (55%), nước hầm xương gà cô đặc (24%), bí đỏ Đà Lạt (12%), gan gà sạch (5%), dầu cá hồi, agar thực vật, Taurine và Vitamin nhóm B.',
        ingredientsEn: 'Fresh chicken breast (55%), concentrated chicken bone broth (24%), organic pumpkin (12%), chicken liver (5%), salmon oil, plant agar, Taurine, B-complex vitamins.',
        usageVi: 'Cho ăn trực tiếp hoặc trộn cùng hạt khô. Sau khi mở nắp, bảo quản trong ngăn mát tủ lạnh (2–6°C) và dùng hết trong vòng 72 giờ.',
        usageEn: 'Serve directly or mix with dry kibble. Refrigerate unused portion (2–6°C) and consume within 72 hours of opening.'
    },
    {
        id: 'prod-4',
        slug: 'co-timothy-say-lanh-meadow-pure-1kg',
        name: 'Cỏ Timothy sấy lạnh Meadow Pure cho thỏ và bọ ú (1kg)',
        nameEn: 'Meadow Pure cold-dried Timothy hay for rabbits & guinea pigs (1kg)',
        price: 165000,
        category: 'food',
        petTypes: [
            'rabbit_rodent'
        ],
        brand: 'Meadow Pure',
        spec: 'Túi 1kg',
        specEn: '1kg bag',
        specOptions: [
            {
                labelVi: 'Túi 500g',
                labelEn: '500g bag',
                price: 95000
            },
            {
                labelVi: 'Túi 1kg',
                labelEn: '1kg bag',
                price: 165000
            },
            {
                labelVi: 'Thùng 2.5kg',
                labelEn: '2.5kg box',
                price: 375000
            }
        ],
        image: '/assets/products/timothy-hay-rabbit.png',
        images: [
            '/assets/products/timothy-hay-rabbit.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'bestseller'
        ],
        stock: 40,
        rating: 5.0,
        reviewCount: 84,
        createdAtOrder: 13,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Cỏ Timothy thu hoạch đợt đầu (First Cut) đã sàng lọc bụi mịn, giữ trọn màu xanh tự nhiên và hương thơm thảo mộc giúp mài răng chuẩn xác và ngăn ngừa tắc ruột ở thỏ, bọ ú, chinchilla.',
        descriptionEn: 'Dust-extracted First Cut Timothy hay with crisp green stalks and natural herbal aroma to support dental wear and digestive motility in rabbits and rodents.',
        ingredientsVi: '100% cỏ Timothy tự nhiên sấy lạnh nguyên cọng (Chất xơ thô ≥ 34%, Đạm thô 8%, Canxi thấp ≤ 0.45%), không thuốc trừ sâu, không chất tạo màu.',
        ingredientsEn: '100% whole-stem cold-dried Timothy hay (Crude fiber ≥ 34%, Crude protein 8%, Low calcium ≤ 0.45%), pesticide-free and dye-free.',
        usageVi: 'Đặt cỏ không giới hạn vào khay cỏ khô ráo mỗi ngày (chiếm 80% khẩu phần ăn của thỏ và bọ ú). Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp.',
        usageEn: 'Provide unlimited hay daily in a clean hay rack (comprising 80% of rabbit and guinea pig diets). Store in a cool, dry place.'
    },
    {
        id: 'prod-5',
        slug: 'ngu-coc-va-hat-trai-cay-avian-gold-800g',
        name: 'Ngũ cốc và hạt trái cây Avian Gold cho chim vẹt (800g)',
        nameEn: 'Avian Gold fruit & 22-seed blend for parrots and birds (800g)',
        price: 135000,
        oldPrice: 180000,
        discountPercent: 25,
        category: 'food',
        petTypes: [
            'bird'
        ],
        brand: 'Avian Gold',
        spec: 'Túi 800g',
        specEn: '800g bag',
        specOptions: [
            {
                labelVi: 'Túi 400g',
                labelEn: '400g bag',
                price: 78000,
                oldPrice: 98000
            },
            {
                labelVi: 'Túi 800g',
                labelEn: '800g bag',
                price: 135000,
                oldPrice: 180000
            }
        ],
        image: '/assets/products/seed-mix-parrot.png',
        images: [
            '/assets/products/seed-mix-parrot.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'sale'
        ],
        stock: 19,
        rating: 4.6,
        reviewCount: 37,
        createdAtOrder: 12,
        recommendedAges: [
            'baby',
            'adult'
        ],
        description: 'Hỗn hợp 22 loại hạt nguyên cám, kê vàng, hạt lanh và trái cây nhiệt đới sấy dẻo giúp vẹt Cockatiel, Lovebird và Yến Phụng căng tràn năng lượng và lên màu lông óng ả.',
        descriptionEn: 'Nutrient-dense blend of 22 whole grains, golden millet, flaxseed, and dehydrated tropical fruits for vibrant plumage and daily vitality.',
        ingredientsVi: 'Kê vàng, kê đỏ, yến mạch bóc vỏ, hạt lanh, hạt rum, hạt bí xanh, táo sấy, đu đủ sấy, cà rốt sấy lạnh, men bia, canxi hữu cơ và khoáng vi lượng.',
        ingredientsEn: 'Yellow millet, red millet, hulled oats, flaxseed, safflower seed, pumpkin seed, dried apple, papaya, freeze-dried carrot, brewer yeast, organic calcium.',
        usageVi: 'Cho ăn 15g–30g mỗi ngày tùy kích thước chim. Thổi sạch vỏ trấu trong cóng ăn mỗi sáng và bổ sung thêm nước ấm sạch.',
        usageEn: 'Feed 15g–30g daily depending on bird size. Remove empty seed hulls from the feeder each morning and provide fresh water.'
    },
    {
        id: 'prod-6',
        slug: 'sua-tam-thao-moc-yen-mach-botanica-spa-500ml',
        name: 'Sữa tắm thảo mộc yến mạch và oải hương Botanica Spa (500ml)',
        nameEn: 'Botanica Spa oatmeal & lavender herbal shampoo (500ml)',
        price: 185000,
        category: 'care',
        petTypes: [
            'dog',
            'cat',
            'rabbit_rodent'
        ],
        brand: 'Botanica Spa',
        spec: 'Chai 500ml',
        specEn: '500ml bottle',
        specOptions: [
            {
                labelVi: 'Chai 250ml',
                labelEn: '250ml bottle',
                price: 110000
            },
            {
                labelVi: 'Chai 500ml',
                labelEn: '500ml bottle',
                price: 185000
            }
        ],
        image: '/assets/products/shampoo-oatmeal-lavender.png',
        images: [
            '/assets/products/shampoo-oatmeal-lavender.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'bestseller'
        ],
        stock: 32,
        rating: 4.9,
        reviewCount: 73,
        createdAtOrder: 11,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Công thức pH 6.8 cân bằng dịu nhẹ không cay mắt từ yến mạch keo và tinh dầu oải hương Pháp, giúp làm dịu làn da mẩn đỏ, khử mùi hôi lâu dài và dưỡng lông mềm mượt như nhung.',
        descriptionEn: 'Tear-free pH 6.8 balanced formula with colloidal oatmeal and French lavender essential oil to soothe itchy skin, deodorize naturally, and condition coats.',
        ingredientsVi: 'Nước tinh khiết, chiết xuất yến mạch keo hữu cơ (8%), tinh dầu oải hương Provence, nha đam tươi, Panthenol (Vitamin B5), chất làm sạch gốc dừa dịu nhẹ (không SLS/Paraben).',
        ingredientsEn: 'Purified water, organic colloidal oatmeal extract (8%), Provence lavender oil, aloe vera gel, Panthenol (Pro-Vitamin B5), coconut-derived mild cleansers (SLS & Paraben free).',
        usageVi: 'Làm ướt lông bằng nước ấm, pha loãng sữa tắm tỷ lệ 1:5 rồi massage nhẹ nhàng từ cổ xuống chân trong 3–5 phút. Xả sạch bằng nước ấm và sấy khô hoàn toàn.',
        usageEn: 'Wet coat with warm water, dilute shampoo 1:5 and massage gently for 3–5 minutes avoiding inner ears. Rinse thoroughly and blow-dry.'
    },
    {
        id: 'prod-7',
        slug: 'dau-ca-hoi-na-uy-norse-vital-omega-3-250ml',
        name: 'Dầu cá hồi Na Uy tinh khiết Norse Vital giàu Omega-3 (250ml)',
        nameEn: 'Norse Vital pure Norwegian wild salmon oil (250ml)',
        price: 245000,
        oldPrice: 350000,
        discountPercent: 30,
        category: 'care',
        petTypes: [
            'dog',
            'cat'
        ],
        brand: 'Norse Vital',
        spec: 'Chai vòi nhấn 250ml',
        specEn: '250ml pump bottle',
        specOptions: [
            {
                labelVi: 'Chai vòi nhấn 250ml',
                labelEn: '250ml pump bottle',
                price: 245000,
                oldPrice: 350000
            },
            {
                labelVi: 'Chai lớn 500ml',
                labelEn: '500ml pump bottle',
                price: 430000,
                oldPrice: 590000
            }
        ],
        image: '/assets/products/salmon-oil-omega.png',
        images: [
            '/assets/products/salmon-oil-omega.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'sale'
        ],
        stock: 25,
        rating: 4.8,
        reviewCount: 61,
        createdAtOrder: 10,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Ép lạnh 100% từ cá hồi vùng biển lạnh Na Uy, giàu EPA và DHA giúp giảm rụng lông rõ rệt sau 3 tuần, tăng cường thị lực, bảo vệ tim mạch và bôi trơn sụn khớp.',
        descriptionEn: '100% cold-pressed Norwegian salmon oil rich in EPA & DHA to visibly reduce shedding within 3 weeks while supporting joint, heart, and cognitive health.',
        ingredientsVi: 'Dầu cá hồi tự nhiên nguyên chất (99.8%), Tocopherol tự nhiên (Vitamin E chống oxy hóa). Hàm lượng Omega-3 ≥ 28% (EPA 13%, DHA 12%).',
        ingredientsEn: 'Pure cold-pressed Norwegian salmon oil (99.8%), natural mixed Tocopherols (Vitamin E). Omega-3 content ≥ 28% (EPA 13%, DHA 12%).',
        usageVi: 'Nhấn trực tiếp lên thức ăn hạt hoặc pate mỗi ngày: 1 lần nhấn (2ml) cho mỗi 4kg thể trọng của thú cưng.',
        usageEn: 'Pump directly onto dry kibble or wet food daily: 1 pump (2ml) per 4kg of pet body weight.'
    },
    {
        id: 'prod-8',
        slug: 'men-vi-sinh-tieu-hoa-vetbio-care-30-goi',
        name: 'Men vi sinh tiêu hóa VetBio Care 6 tỷ lợi khuẩn (Hộp 30 gói)',
        nameEn: 'VetBio Care 6B CFU digestive probiotic powder (30 sachets)',
        price: 215000,
        category: 'care',
        petTypes: [
            'dog',
            'cat',
            'rabbit_rodent',
            'bird'
        ],
        brand: 'VetBio Care',
        spec: 'Hộp 30 gói x 2g',
        specEn: '30 sachets x 2g',
        specOptions: [
            {
                labelVi: 'Hộp 15 gói x 2g',
                labelEn: '15 sachets x 2g',
                price: 120000
            },
            {
                labelVi: 'Hộp 30 gói x 2g',
                labelEn: '30 sachets x 2g',
                price: 215000
            }
        ],
        image: '/assets/products/probiotic-digest.png',
        images: [
            '/assets/products/probiotic-digest.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'new'
        ],
        stock: 44,
        rating: 4.7,
        reviewCount: 29,
        createdAtOrder: 9,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Bổ sung 6 chủng lợi khuẩn sống bọc vi nang kết hợp chất xơ hòa tan FOS/Inulin giúp cân bằng hệ vi sinh đường ruột, cải thiện phân lỏng và hỗ trợ hấp thu sau đợt dùng kháng sinh.',
        descriptionEn: 'Micro-encapsulated 6-strain probiotic complex with prebiotic FOS/Inulin to restore gut flora, firm up loose stools, and boost immunity.',
        ingredientsVi: 'Enterococcus faecium, Lactobacillus acidophilus, Bifidobacterium animalis, Saccharomyces boulardii (tổng ≥ 6 x 10^9 CFU/gói), Inulin từ rễ diếp xoăn, Kẽm gluconate.',
        ingredientsEn: 'Enterococcus faecium, Lactobacillus acidophilus, Bifidobacterium animalis, Saccharomyces boulardii (total ≥ 6 x 10^9 CFU/sachet), Chicory root Inulin, Zinc gluconate.',
        usageVi: 'Pha vào nước uống ấm (<37°C) hoặc rắc trộn đều vào thức ăn: Thú nhỏ & chim 1/2 gói/ngày; Chó mèo <10kg 1 gói/ngày; Chó >10kg 2 gói/ngày.',
        usageEn: 'Mix with lukewarm water (<37°C) or sprinkle over food: Small pets & birds 1/2 sachet/day; Dogs & cats <10kg 1 sachet/day; Dogs >10kg 2 sachets/day.'
    },
    {
        id: 'prod-9',
        slug: 'dung-dich-ve-sinh-tai-cuc-la-ma-chamomile-120ml',
        name: 'Dung dịch vệ sinh tai và mắt chiết xuất cúc La Mã (120ml)',
        nameEn: 'Chamomile Care organic ear & eye cleansing drops (120ml)',
        price: 140000,
        category: 'care',
        petTypes: [
            'dog',
            'cat',
            'rabbit_rodent'
        ],
        brand: 'Botanica Spa',
        spec: 'Chai 120ml',
        specEn: '120ml dropper bottle',
        specOptions: [
            {
                labelVi: 'Chai 120ml',
                labelEn: '120ml dropper bottle',
                price: 140000
            }
        ],
        image: '/assets/products/ear-eye-cleanser.png',
        images: [
            '/assets/products/ear-eye-cleanser.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [],
        stock: 27,
        rating: 4.6,
        reviewCount: 19,
        createdAtOrder: 8,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Dung dịch thảo mộc không cồn giúp làm mềm ráy tai, khử mùi hôi ống tai và lau sạch vệt ố nước mắt quanh khóe mắt một cách êm dịu không gây kích ứng.',
        descriptionEn: 'Alcohol-free botanical drops to gently dissolve earwax, neutralize ear odor, and wipe away tear stains without irritation.',
        ingredientsVi: 'Chiết xuất hoa cúc La Mã hữu cơ, nước cây phỉ (Witch Hazel), tinh chất lô hội, Glycerin thực vật, Acid Boric 0.5% chuẩn dược điển thú y.',
        ingredientsEn: 'Organic Roman chamomile extract, Witch Hazel hydrosol, aloe vera essence, vegetable glycerin, veterinary-grade Boric Acid 0.5%.',
        usageVi: 'Nhỏ 3–5 giọt vào ống tai, massage nhẹ gốc tai trong 30 giây rồi dùng bông gòn mềm lau sạch phần dịch đẩy ra ngoài. Sử dụng 2–3 lần mỗi tuần.',
        usageEn: 'Instill 3–5 drops into the ear canal, gently massage the base of the ear for 30 seconds, and wipe clean with a soft cotton pad 2–3 times weekly.'
    },
    {
        id: 'prod-10',
        slug: 'bong-day-thung-cotton-va-cao-su-tu-nhien-sach-rang',
        name: 'Bóng dây thừng cotton và cao su tự nhiên làm sạch răng',
        nameEn: 'Natural rubber & braided cotton dental chew ball',
        price: 125000,
        category: 'toys',
        petTypes: [
            'dog'
        ],
        brand: 'PawPlay Studio',
        spec: 'Cỡ M (Đường kính 7cm)',
        specEn: 'Size M (7cm diameter)',
        specOptions: [
            {
                labelVi: 'Cỡ S (5cm - Chó nhỏ)',
                labelEn: 'Size S (5cm - Small dogs)',
                price: 99000
            },
            {
                labelVi: 'Cỡ M (7cm - Chó vừa)',
                labelEn: 'Size M (7cm - Medium dogs)',
                price: 125000
            },
            {
                labelVi: 'Cỡ L (9cm - Chó lớn)',
                labelEn: 'Size L (9cm - Large dogs)',
                price: 155000
            }
        ],
        image: '/assets/products/rope-chew-ball.png',
        images: [
            '/assets/products/rope-chew-ball.png',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [],
        stock: 30,
        rating: 4.8,
        reviewCount: 44,
        createdAtOrder: 7,
        recommendedAges: [
            'baby',
            'adult'
        ],
        description: 'Kết hợp bóng cao su cây tự nhiên đàn hồi cao với gai massage nướu hương bạc hà và dây thừng sợi bông không tẩy trắng, giúp cún cưng giải tỏa năng lượng và chải sạch mảng bám răng khi nhai.',
        descriptionEn: 'Durable natural tree-rubber ball with mint-infused dental nubs and unbleached braided cotton rope for tug-of-war and plaque removal.',
        ingredientsVi: '100% cao su tự nhiên không chứa BPA/Phthalate, dây thừng sợi cotton hữu cơ bện 6 lớp chắc chắn, tinh dầu bạc hà tự nhiên.',
        ingredientsEn: '100% BPA-free natural rubber, 6-ply braided organic cotton rope, natural peppermint essence.',
        usageVi: 'Dùng chơi ném bắt hoặc kéo co cùng bé. Có thể phết một lớp mỏng pate hoặc bơ đậu phộng cho thú cưng vào rãnh bóng để tăng hứng thú. Rửa sạch bằng nước ấm sau khi chơi.',
        usageEn: 'Ideal for fetch, tug-of-war, or solo chewing. Spread pet-safe paste inside the grooves for mental enrichment. Rinse with warm water after play.'
    },
    {
        id: 'prod-11',
        slug: 'thap-tru-cao-mong-go-soi-va-nha-nghi-cho-meo',
        name: 'Tháp trụ cào móng gỗ sồi và nhà nghỉ ấm áp cho mèo',
        nameEn: 'Oakwood sisal cat scratching tower & cozy condo',
        price: 697000,
        oldPrice: 850000,
        discountPercent: 18,
        category: 'toys',
        petTypes: [
            'cat'
        ],
        brand: 'PawPlay Studio',
        spec: 'Cao 85cm (Đế 45x45cm)',
        specEn: '85cm height (45x45cm base)',
        specOptions: [
            {
                labelVi: 'Cao 85cm (2 tầng)',
                labelEn: '85cm height (2 tiers)',
                price: 697000,
                oldPrice: 850000
            },
            {
                labelVi: 'Cao 120cm (3 tầng)',
                labelEn: '120cm height (3 tiers)',
                price: 960000,
                oldPrice: 1200000
            }
        ],
        image: '/assets/products/cat-tree-oak.png',
        images: [
            '/assets/products/cat-tree-oak.png',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'sale'
        ],
        stock: 4,
        rating: 5.0,
        reviewCount: 31,
        createdAtOrder: 6,
        recommendedAges: [
            'baby',
            'adult'
        ],
        description: 'Tháp cào móng khung gỗ sồi vững chãi quấn thừng sisal tự nhiên dày 6mm kèm đệm nằm lông cừu nhân tạo có thể tháo giặt, bảo vệ sofa gia đình và tạo không gian leo trèo lý tưởng cho mèo.',
        descriptionEn: 'Sturdy oak-veneer cat tower wrapped in 6mm natural sisal rope with removable sherpa cushions and a private sleeping condo.',
        ingredientsVi: 'Gỗ thông và ván ép phủ veneer sồi chống ẩm, dây thừng sisal tự nhiên không tẩm hóa chất, đệm vải lông cừu sherpa tháo rời được.',
        ingredientsEn: 'Moisture-resistant oak-veneer engineered wood, untreated natural sisal rope, machine-washable sherpa fleece cushion.',
        usageVi: 'Lắp ráp dễ dàng trong 10 phút với bộ ốc lục giác đi kèm. Có thể rắc một chút cỏ mèo (catnip) lên cột thừng để hướng dẫn bé làm quen ngay lần đầu.',
        usageEn: 'Assembles in 10 minutes with the included hex key. Sprinkle a pinch of catnip on the sisal posts to attract your cat immediately.'
    },
    {
        id: 'prod-12',
        slug: 'vong-chay-go-bach-duong-tinh-am-cho-hamster-22cm',
        name: 'Vòng chạy gỗ bạch dương tĩnh âm cho hamster và sóc bay (22cm)',
        nameEn: 'Silent birchwood exercise wheel for hamsters & sugar gliders (22cm)',
        price: 155000,
        category: 'toys',
        petTypes: [
            'rabbit_rodent'
        ],
        brand: 'Meadow Pure',
        spec: 'Đường kính 22cm',
        specEn: '22cm diameter',
        specOptions: [
            {
                labelVi: 'Cỡ 17cm (Dwarf/Robo)',
                labelEn: '17cm (Dwarf/Robo)',
                price: 125000
            },
            {
                labelVi: 'Cỡ 22cm (Syrian/Bear)',
                labelEn: '22cm (Syrian/Bear)',
                price: 155000
            },
            {
                labelVi: 'Cỡ 28cm (Nhím/Sóc)',
                labelEn: '28cm (Hedgehog/Glider)',
                price: 210000
            }
        ],
        image: '/assets/products/silent-wood-wheel.png',
        images: [
            '/assets/products/silent-wood-wheel.png',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'new'
        ],
        stock: 21,
        rating: 4.9,
        reviewCount: 3,
        createdAtOrder: 5,
        recommendedAges: [
            'baby',
            'adult'
        ],
        description: 'Vòng chạy sử dụng trục vòng bi kép siêu êm không phát ra tiếng cót két vào ban đêm, lòng chạy lót gỗ bần (cork) êm chân và bảo vệ cột sống thẳng tự nhiên cho hamster.',
        descriptionEn: 'Dual ball-bearing silent wooden wheel lined with soft natural cork to protect tiny paws and maintain healthy spinal alignment during nighttime runs.',
        ingredientsVi: 'Gỗ bạch dương tự nhiên mài nhẵn không dăm gỗ, lớp lót gỗ bần tự nhiên thấm hút tốt, vòng bi thép không gỉ kép tĩnh âm.',
        ingredientsEn: 'Splinter-free kiln-dried birchwood, replaceable natural cork running track, dual stainless-steel silent ball bearings.',
        usageVi: 'Đặt cố định trên nền chuồng phẳng hoặc gắn trực tiếp vào thành lồng. Lau sạch bề mặt gỗ bần bằng khăn ẩm vắt khô mỗi tuần.',
        usageEn: 'Place on a flat cage floor or mount to cage bars. Wipe the cork track weekly with a slightly damp cloth.'
    },
    {
        id: 'prod-13',
        slug: 'da-mai-mo-bo-sung-canxi-va-khoang-cho-chim-vet',
        name: 'Đá mài mỏ bổ sung canxi và khoáng biển cho chim vẹt',
        nameEn: 'Cuttlebone & ocean mineral beak-conditioning block for birds',
        price: 85000,
        category: 'toys',
        petTypes: [
            'bird'
        ],
        brand: 'Avian Gold',
        spec: 'Viên 120g kèm thanh đậu',
        specEn: '120g block with perch mount',
        specOptions: [
            {
                labelVi: '1 viên 120g',
                labelEn: 'Single 120g block',
                price: 85000
            },
            {
                labelVi: 'Bộ 2 viên tiết kiệm',
                labelEn: 'Twin pack (2x120g)',
                price: 155000
            }
        ],
        image: '/assets/products/calcium-cuttlebone.png',
        images: [
            '/assets/products/calcium-cuttlebone.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [],
        stock: 36,
        rating: 4.7,
        reviewCount: 14,
        createdAtOrder: 4,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Mai mực tự nhiên kết hợp khoáng biển và hạt trái cây ép giúp vẹt và chim cảnh tự mài gọn mỏ, đồng thời bổ sung canxi sinh học giúp khung xương và vỏ trứng cứng cáp.',
        descriptionEn: 'Natural cuttlebone fused with ocean minerals and fruit granules to keep beaks trim while supplying bio-available calcium.',
        ingredientsVi: 'Mai mực biển tự nhiên khử muối (75%), vỏ hàu nghiền mịn, khoáng hồng Himalaya, chiết xuất cam ngọt và Vitamin D3.',
        ingredientsEn: 'Desalted natural cuttlebone (75%), pulverized oyster shell, Himalayan pink mineral salt, sweet orange extract, Vitamin D3.',
        usageVi: 'Cài cố định vào nan lồng ngay cạnh cầu đậu chính để chim dễ dàng gặm mài mỏ mỗi ngày.',
        usageEn: 'Securely clip onto cage bars next to the main perch for daily beak conditioning.'
    },
    {
        id: 'prod-14',
        slug: 'bo-bat-doi-gom-su-khang-khuan-kem-ke-go-tre-nghieng-15-do',
        name: 'Bộ bát đôi gốm sứ kháng khuẩn kèm kệ gỗ tre nghiêng 15 độ',
        nameEn: '15-degree tilted bamboo stand with dual ceramic bowls',
        price: 290000,
        category: 'accessories',
        petTypes: [
            'dog',
            'cat',
            'rabbit_rodent'
        ],
        brand: 'Animora Home',
        spec: 'Kệ đôi (2 bát x 400ml)',
        specEn: 'Double stand (2 x 400ml bowls)',
        specOptions: [
            {
                labelVi: 'Kệ đơn (1 bát 400ml)',
                labelEn: 'Single stand (1 x 400ml)',
                price: 165000
            },
            {
                labelVi: 'Kệ đôi (2 bát x 400ml)',
                labelEn: 'Double stand (2 x 400ml)',
                price: 290000
            }
        ],
        image: '/assets/products/ceramic-double-bowl.png',
        images: [
            '/assets/products/ceramic-double-bowl.png',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [],
        stock: 18,
        rating: 4.8,
        reviewCount: 68,
        createdAtOrder: 3,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Thiết kế góc nghiêng 15 độ chuẩn công thái học thú y giúp giảm áp lực đốt sống cổ và chống nôn trớ sau ăn, lòng bát gốm sứ nung 1300°C tráng men bóng ngăn ngừa mụn cằm ở mèo và chó.',
        descriptionEn: 'Ergonomic 15° tilted bamboo stand reduces cervical spine strain and regurgitation, paired with high-fired glazed ceramic bowls that prevent feline chin acne.',
        ingredientsVi: 'Gốm sứ cao cấp nung 1300°C không chì/cadmium, kệ gỗ tre tự nhiên phủ dầu sáp ong chống thấm nước, chân đế cao su chống trượt.',
        ingredientsEn: 'Lead-free 1300°C high-fired glazed ceramic, beeswax-sealed natural bamboo stand, non-slip silicone foot pads.',
        usageVi: 'Bát sứ tháo rời an toàn với máy rửa chén và lò vi sóng. Lau kệ gỗ tre bằng khăn ẩm sau mỗi bữa ăn.',
        usageEn: 'Ceramic bowls are dishwasher and microwave safe. Wipe the bamboo stand clean with a damp cloth.'
    },
    {
        id: 'prod-15',
        slug: 'bo-day-dat-va-yem-nguc-da-mem-thoang-khi-animora',
        name: 'Bộ dây dắt và yếm ngực da mềm lót đệm thoáng khí Animora',
        nameEn: 'Animora breathable padded leather chest harness & leash set',
        price: 340000,
        category: 'accessories',
        petTypes: [
            'dog',
            'cat'
        ],
        brand: 'Animora Home',
        spec: 'Cỡ M (Vòng ngực 38–52cm)',
        specEn: 'Size M (Chest 38–52cm)',
        specOptions: [
            {
                labelVi: 'Cỡ S (28–38cm: 2–4kg)',
                labelEn: 'Size S (28–38cm: 2–4kg)',
                price: 310000
            },
            {
                labelVi: 'Cỡ M (38–52cm: 4–9kg)',
                labelEn: 'Size M (38–52cm: 4–9kg)',
                price: 340000
            },
            {
                labelVi: 'Cỡ L (52–68cm: 9–18kg)',
                labelEn: 'Size L (52–68cm: 9–18kg)',
                price: 380000
            }
        ],
        image: '/assets/products/leather-harness-set.png',
        images: [
            '/assets/products/leather-harness-set.png',
            '/assets/products/gallery-texture-closeup.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'new'
        ],
        stock: 3,
        rating: 5.0,
        reviewCount: 0,
        createdAtOrder: 2,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Yếm chữ Y ôm sát lồng ngực phân tán lực kéo đều mà không gây chèn ép khí quản, kết hợp khoen đồng nguyên khối chống xoắn và viền phản quang an toàn khi đi dạo buổi tối.',
        descriptionEn: 'No-choke Y-shaped chest harness distributes pulling force evenly across the chest, featuring solid brass hardware and reflective stitching for evening walks.',
        ingredientsVi: 'Da microfiber mềm mại kết hợp đệm lưới tổ ong thoáng khí 3D, khóa cài hợp kim đồng chịu lực 120kg, dây dắt dài 1.5m kèm tay cầm lót đệm.',
        ingredientsEn: 'Supple microfiber leather with 3D breathable air-mesh lining, 120kg load-tested brass buckle, 1.5m leash with padded handle.',
        usageVi: 'Đo vòng ngực ngay sau hai chân trước của bé và chừa khoảng trống vừa 2 ngón tay khi cài khóa để bé vận động thoải mái nhất.',
        usageEn: 'Measure chest girth right behind the front legs and leave a two-finger gap when fastened for optimal comfort.'
    },
    {
        id: 'prod-16',
        slug: 'den-suoi-uvb-5-0-quang-pho-mat-troi-cho-rua-va-bo-sat',
        name: 'Đèn sưởi UVB 5.0 quang phổ mặt trời cho rùa và bò sát cảnh',
        nameEn: 'Solar-spectrum UVB 5.0 + UVA basking lamp for turtles & reptiles',
        price: 265000,
        category: 'accessories',
        petTypes: [
            'fish_reptile'
        ],
        brand: 'TerraSun',
        spec: 'Bộ chao kẹp + Bóng 50W',
        specEn: 'Clamp dome + 50W bulb',
        specOptions: [
            {
                labelVi: 'Bóng lẻ UVB 5.0 (25W)',
                labelEn: 'UVB 5.0 Bulb only (25W)',
                price: 145000
            },
            {
                labelVi: 'Bộ chao kẹp + Bóng 50W',
                labelEn: 'Clamp dome + 50W bulb',
                price: 265000
            }
        ],
        image: '/assets/products/uvb-terrarium-lamp.png',
        images: [
            '/assets/products/uvb-terrarium-lamp.png',
            '/assets/products/gallery-nutrition-detail.jpg',
            '/assets/products/gallery-package-box.jpg'
        ],
        badges: [
            'out_of_stock'
        ],
        stock: 0,
        rating: 4.6,
        reviewCount: 11,
        createdAtOrder: 1,
        recommendedAges: [
            'baby',
            'adult',
            'senior'
        ],
        description: 'Mô phỏng phổ ánh sáng mặt trời tự nhiên với tia UVA kích thích tiêu hóa và tia UVB 5.0 giúp rùa cạn, rùa nước, rồng Úc (Bearded Dragon) và tắc kè tổng hợp Vitamin D3 chuyển hóa canxi chống mềm mai.',
        descriptionEn: 'Simulates natural sunlight with UVA for appetite and UVB 5.0 rays to synthesize Vitamin D3 and prevent metabolic bone disease in turtles and reptiles.',
        ingredientsVi: 'Chao đèn hợp kim nhôm phản xạ nhiệt phủ gốm chịu nhiệt, đui sứ E27 an toàn, chân kẹp xoay 360 độ kèm công tắc điều chỉnh.',
        ingredientsEn: 'Heat-resistant ceramic E27 socket, reflective aluminum dome hood, 360° swivel clamp bracket with inline dimmer switch.',
        usageVi: 'Kẹp cách điểm phơi nắng của bò sát 25–30cm, bật 4–6 giờ mỗi ngày vào ban ngày. Không chạm tay trực tiếp vào bóng khi đèn đang nóng.',
        usageEn: 'Mount 25–30cm above the basking spot and run 4–6 hours daily. Allow bulb to cool completely before handling.'
    }
];
const PRODUCT_REVIEWS = [
    {
        id: 'rev-1',
        productId: 'prod-1',
        author: 'Nguyễn Thảo Nhi',
        petInfoVi: 'Bé Mây Mây • Mèo Scottish Fold 2 tuổi',
        petInfoEn: 'May May • 2yo Scottish Fold',
        stars: 5,
        textVi: 'Hạt thơm mùi cá hồi tự nhiên chứ không bị nồng mùi hương liệu. Bé Mây Mây nhà mình vốn kén ăn mà trộn hạt này vào là ăn sạch bát, đi vệ sinh khuôn rất đẹp.',
        textEn: 'Smells naturally like salmon without artificial fragrance. My picky Scottish Fold finishes her bowl every meal and her digestion has been great.',
        date: '18/10/2026'
    },
    {
        id: 'rev-2',
        productId: 'prod-1',
        author: 'Trần Minh Quân',
        petInfoVi: 'Bé Bơ • Golden Retriever 1.5 tuổi',
        petInfoEn: 'Bo • 1.5yo Golden Retriever',
        stars: 5,
        textVi: 'Được bác sĩ tại Animora tư vấn đổi sang dòng hữu cơ này. Sau hơn 1 tháng lông bé Bơ bóng mượt hẳn, đỡ rụng lông khi giao mùa.',
        textEn: 'Recommended by our Animora vet. After a month, our Golden Retriever’s coat is noticeably shinier with much less seasonal shedding.',
        date: '09/10/2026'
    },
    {
        id: 'rev-3',
        productId: 'prod-1',
        author: 'Lê Hoài Anh',
        petInfoVi: 'Bé Mochi • Toy Poodle 10 tháng',
        petInfoEn: 'Mochi • 10mo Toy Poodle',
        stars: 4,
        textVi: 'Kích thước viên hạt vừa miệng các bé Poodle nhỏ, túi có khóa zip rất kín. Giao hàng trong ngày siêu nhanh!',
        textEn: 'Kibble size is ideal for small Toy Poodles and the zip lock keeps it fresh. Same-day delivery was super fast!',
        date: '28/09/2026'
    },
    {
        id: 'rev-4',
        productId: 'prod-2',
        author: 'Phạm Thanh Hằng',
        petInfoVi: 'Bé Bông • Mèo Anh lông ngắn',
        petInfoEn: 'Bong • British Shorthair',
        stars: 5,
        textVi: 'Dòng Animora Royal hạn chế búi lông cực tốt, bé nhà mình không còn bị khạc lông mỗi tuần nữa.',
        textEn: 'Animora Royal works wonders for hairball control. My British Shorthair stopped coughing up hairballs every week.',
        date: '15/10/2026'
    },
    {
        id: 'rev-5',
        productId: 'prod-4',
        author: 'Lê Minh Châu',
        petInfoVi: 'Bé Bông Gòn • Thỏ Holland Lop 9 tháng',
        petInfoEn: 'Bong Gon • 9mo Holland Lop Rabbit',
        stars: 5,
        textVi: 'Cỏ Timothy rất xanh, cọng dài giòn và hầu như không có vụn bụi ở đáy túi. Bé Bông Gòn nghe tiếng mở túi là chạy ra đứng đợi liền.',
        textEn: 'Very green, crisp long stems with almost zero dust at the bottom of the bag. My bunny hops right over as soon as I open it.',
        date: '21/10/2026'
    },
    {
        id: 'rev-6',
        productId: 'prod-6',
        author: 'Hoàng Gia Bảo',
        petInfoVi: 'Bé Cốm • Corgi 1 tuổi',
        petInfoEn: 'Com • 1yo Corgi',
        stars: 5,
        textVi: 'Mùi oải hương rất thư giãn như vừa đi spa về, tắm xong da bé không hề bị khô hay ngứa.',
        textEn: 'Relaxing lavender scent just like a professional spa visit, and leaves skin moisturized without any itching.',
        date: '12/10/2026'
    }
];
const SHOP_BRANDS = [
    'NutriPet Organic',
    'Animora Royal',
    'Meadow Pure',
    'Avian Gold',
    'Botanica Spa',
    'Norse Vital',
    'VetBio Care',
    'PawPlay Studio',
    'Animora Home',
    'TerraSun'
];
function normalizeViText(input) {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}
function mapSpeciesToShopPetGroup(species) {
    switch(species){
        case 'Chó':
            return 'dog';
        case 'Mèo':
            return 'cat';
        case 'Thỏ':
        case 'Hamster':
            return 'rabbit_rodent';
        case 'Chim':
            return 'bird';
        case 'Bò sát':
            return 'fish_reptile';
        default:
            return 'dog';
    }
}
function parsePetAgeStage(ageText) {
    const normalized = normalizeViText(ageText);
    if (normalized.includes('thang') || normalized.includes('month')) {
        return 'baby';
    }
    const numMatch = normalized.match(/(\d+(\.\d+)?)/);
    if (numMatch) {
        const years = parseFloat(numMatch[1]);
        if (years >= 7) return 'senior';
        if (years < 1) return 'baby';
    }
    return 'adult';
}
function formatVndPrice(price) {
    return `${price.toLocaleString('vi-VN')}đ`;
}
}),
"[project]/src/data/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contact.ts [app-ssr] (ecmascript)");
;
const translations = {
    vi: {
        nav: {
            home: 'Trang chủ',
            about: 'Về chúng tôi',
            services: 'Dịch vụ',
            adopt: 'Nhận nuôi',
            shop: 'Cửa hàng',
            petProfiles: 'Hồ sơ thú cưng',
            searchPlaceholder: 'Tìm thú cưng, sản phẩm...',
            login: 'Đăng nhập',
            register: 'Đăng ký',
            cartTitle: 'Giỏ hàng của bạn',
            callNow: `Gọi ngay: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay}`
        },
        hero: {
            eyebrow: 'Animora Pet Care',
            title: 'Bé cưng của bạn xứng đáng có một ngày spa',
            subtitleBefore: 'Bé cưng ',
            subtitleBold: 'an toàn',
            subtitleAfter: ' trong vòng tay chăm sóc của chúng tôi',
            btnCall: `Gọi ngay: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay}`,
            btnBook: 'Đặt lịch hẹn',
            socialProofText: 'Hơn 1.600 bé cưng hạnh phúc đã được phục vụ',
            healthCardTitle: 'Sức khỏe thú cưng',
            healthCardSub: 'Theo dõi tiêm chủng & khám định kỳ'
        },
        quickBooking: {
            title: 'Đặt lịch hẹn chăm sóc',
            fullName: 'Họ tên',
            fullNamePlaceholder: 'Nguyễn Văn A',
            phone: 'Số điện thoại',
            phonePlaceholder: '0901234567',
            petType: 'Loại thú cưng',
            service: 'Dịch vụ',
            date: 'Ngày hẹn',
            btnSubmit: 'Đặt lịch nhanh',
            dog: 'Chó',
            cat: 'Mèo',
            rabbit: 'Thỏ cảnh',
            hamster: 'Hamster / Chuột lang',
            bird: 'Chim cảnh / Vẹt',
            reptile: 'Bò sát / Rùa cảnh',
            other: 'Thú cưng khác',
            generalCheckup: 'Khám tổng quát',
            spa: 'Spa & tắm',
            vaccine: 'Tiêm phòng',
            training: 'Huấn luyện',
            successToast: `Đặt lịch nhanh thành công! Animora (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay} / ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}) sẽ liên hệ xác nhận trong 15 phút.`
        },
        about: {
            eyebrow: 'ABOUT US',
            title: 'Câu chuyện khởi nguồn của phòng khám chúng tôi',
            titleLine1: 'Câu chuyện khởi nguồn',
            titleLine2: 'của phòng khám chúng tôi',
            desc1: 'Chúng tôi sở hữu đội ngũ chuyên gia giàu kinh nghiệm và đầy nhiệt huyết, luôn tận tâm vì sức khỏe và hạnh phúc của mọi loài thú cưng — từ chó, mèo, thỏ cảnh, hamster cho đến chim vẹt và các loài thú nhỏ đặc biệt. Đội ngũ bác sĩ thú y, chuyên viên spa, huấn luyện viên và người chăm sóc được đào tạo bài bản, cam kết mang đến sự chăm sóc tốt nhất.',
            desc2: 'Mỗi quy trình khám chữa bệnh, spa chăm sóc hay huấn luyện tại Animora đều được thiết kế dựa trên sự thấu hiểu tập tính sinh học, tâm lý và sức khỏe đặc thù của từng loài.',
            trustedText: 'Được tin tưởng bởi hơn 10.000 khách hàng',
            devotedTitle: 'Tận tâm',
            devotedDesc: 'Chăm sóc tỉ mỉ từng chi tiết, ưu tiên trải nghiệm thoải mái và hạnh phúc cho bé.',
            transparentTitle: 'Minh bạch',
            transparentDesc: 'Rõ ràng trong phác đồ điều trị, bảng giá dịch vụ và nhật ký theo dõi sức khỏe.',
            sustainableTitle: 'Bền vững',
            sustainableDesc: 'Sử dụng các sản phẩm thuần chay, hữu cơ và giải pháp thân thiện với môi trường.',
            bannerHeadlineLine1: 'Chăm sóc thú cưng bắt đầu',
            bannerHeadlineLine2: 'từ một lịch hẹn đúng nơi, đúng lúc',
            bannerBtnBook: 'Đặt lịch ngay',
            bannerBtnClinic: 'Đăng ký phòng khám',
            bannerAppTitle: 'Tải ứng dụng Animora',
            bannerAppSub: 'Trải nghiệm ngay trên điện thoại',
            bannerGooglePlayTop: 'Tải trên',
            bannerGooglePlayBottom: 'Google Play'
        },
        services: {
            eyebrow: 'Dịch vụ của chúng tôi',
            title: 'Chăm sóc thú y đa loài phù hợp với từng bé',
            checkupTitle: 'Khám & tiêm phòng',
            checkupDesc: 'Khám chuyên khoa và phòng ngừa định kỳ cho chó, mèo, thỏ, hamster, chim vẹt và thú nhỏ.',
            checkupPrice: 'Từ 590.000đ',
            spaTitle: 'Spa & grooming',
            spaDesc: 'Tắm thảo dược, chải chuốt lông, cắt móng, mài răng và liệu trình thư giãn chuyên biệt theo loài.',
            spaPrice: 'Từ 490.000đ',
            trainingTitle: 'Huấn luyện & Giao tiếp',
            trainingDesc: 'Rèn nếp sinh hoạt, phản xạ thông minh và gắn kết hành vi tích cực cho các loài thú cưng.',
            trainingPrice: 'Từ 690.000đ',
            boardingTitle: 'Lưu trú đa loài',
            boardingDesc: 'Khu phòng nghỉ riêng biệt cho từng loài, kiểm soát nhiệt độ và có camera theo dõi 24/7.',
            boardingPrice: 'Từ 390.000đ/đêm',
            btnBook: 'Đặt dịch vụ'
        },
        adoption: {
            eyebrow: 'NHẬN NUÔI',
            title: 'Tìm người bạn mới',
            filterAll: 'Tất cả',
            filterDogs: 'Chó',
            filterCats: 'Mèo',
            filterRabbits: 'Thỏ',
            filterHamsters: 'Hamster',
            filterBirds: 'Chim & Vẹt',
            btnAdopt: 'Nhận nuôi',
            modalTitle: 'Đăng ký nhận nuôi',
            modalSub: 'Cảm ơn bạn đã mở lòng trao cho bé một gia đình ấm áp!',
            applicantName: 'Họ và tên của bạn',
            applicantPhone: 'Số điện thoại',
            applicantEmail: 'Email',
            notes: 'Lời nhắn / Điều kiện nuôi dưỡng',
            notesPlaceholder: 'Chia sẻ một chút về kinh nghiệm nuôi thú cưng và không gian sống của bạn...',
            btnSubmitRequest: 'Gửi yêu cầu nhận nuôi',
            successToast: 'Đã gửi đăng ký! Chúng tôi sẽ liên hệ sớm.'
        },
        shop: {
            eyebrow: 'CỬA HÀNG',
            title: 'Mua sắm cho mọi loài thú cưng',
            catAll: 'Tất cả',
            catFood: 'Đồ ăn',
            catToys: 'Đồ chơi',
            catAccessories: 'Phụ kiện',
            catCare: 'Chăm sóc',
            btnAddToCart: 'Thêm vào giỏ',
            addedToast: 'Đã thêm sản phẩm vào giỏ hàng!',
            emptyCart: 'Giỏ hàng của bạn đang trống',
            subtotal: 'Tạm tính:',
            freeShippingNotice: 'Mua thêm để được Miễn phí vận chuyển toàn quốc!',
            checkoutBtn: 'Thanh toán ngay',
            cartQuantity: 'Số lượng:'
        },
        petProfiles: {
            eyebrow: 'HỒ SƠ THÚ CƯNG',
            title: 'Sổ sức khỏe đa loài của bé',
            breed: 'Giống / Loài',
            gender: 'Giới tính',
            age: 'Tuổi',
            weight: 'Cân nặng',
            nextCheckup: 'Khám định kỳ tiếp theo',
            vaccineHistory: 'Lịch sử tiêm chủng & chăm sóc',
            statusVaccinated: 'Đã tiêm / Đã khám',
            statusDueSoon: 'Sắp đến hạn',
            statusNotYet: 'Chưa tiêm',
            btnUpdate: 'Cập nhật hồ sơ',
            btnAddPet: 'Thêm bé mới',
            modalUpdateTitle: 'Cập nhật sổ sức khỏe',
            modalAddPetTitle: 'Thêm hồ sơ thú cưng mới',
            petNameLabel: 'Tên thú cưng',
            newVaccineLabel: 'Thêm mũi tiêm / lịch khám mới',
            vaccineDate: 'Ngày tiêm / hẹn',
            vaccineStatus: 'Trạng thái',
            saveChanges: 'Lưu thay đổi',
            saveSuccessToast: 'Đã cập nhật hồ sơ sức khỏe thú cưng thành công!'
        },
        testimonials: {
            eyebrow: 'ĐÁNH GIÁ KHÁCH HÀNG',
            title: 'Lời chia sẻ từ cộng đồng yêu thú cưng',
            subtitle: 'Hơn 1.600 gia đình đã gửi gắm các bé cún, mèo, thỏ và thú nhỏ tại Animora từ năm 2012.',
            ratingSummary: '4.9 / 5.0 điểm hài lòng trung bình · 1.640+ lượt đánh giá thực tế',
            swipeHint: 'Vuốt ngang hoặc kéo thẻ để xem thêm đánh giá',
            prevLabel: 'Đánh giá trước',
            nextLabel: 'Đánh giá tiếp theo',
            goToSlide: 'Xem đánh giá số'
        },
        footer: {
            tagline: 'Animora - Trung tâm chăm sóc đa loài và ngôi nhà hạnh phúc nâng niu từng người bạn nhỏ.',
            colExplore: 'Khám phá',
            colContact: 'Liên hệ',
            contactPersonLabel: 'Người liên hệ',
            phoneLabel: 'Điện thoại',
            emailLabel: 'Email',
            copyPhoneAria: 'Sao chép số điện thoại',
            copyEmailAria: 'Sao chép email',
            copiedToast: 'Đã sao chép!',
            address: '128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
            phone: `Hotline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay} (8:00 - 21:00)`,
            email: `Email: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
            hours: 'Mở cửa tất cả các ngày trong tuần: 08:00 - 20:30',
            copyright: '© 2026 Animora Pet Care Center. Tất cả các quyền được bảo lưu.'
        },
        loginModal: {
            tabLogin: 'Đăng nhập',
            tabRegister: 'Đăng ký',
            title: 'Đăng nhập tài khoản Animora',
            subtitle: 'Quản lý sổ sức khỏe thú cưng, đặt lịch nhanh và theo dõi đơn hàng tiện lợi.',
            registerTitle: 'Tạo tài khoản Animora mới',
            registerSubtitle: 'Tham gia cộng đồng hơn 1.600 chủ nuôi tận tâm để lưu trữ hồ sơ sức khỏe cho bé.',
            forgotTitle: 'Khôi phục mật khẩu',
            forgotSubtitle: 'Nhập Email hoặc Số điện thoại đã đăng ký để nhận mã xác thực OTP đặt lại mật khẩu.',
            accountTitle: 'Tài khoản của tôi',
            accountSubtitle: 'Quản lý thông tin cá nhân, sổ địa chỉ nhận hàng và bảo mật tài khoản.',
            fullNameLabel: 'Họ và tên',
            fullNamePlaceholder: 'Nguyễn Minh Anh',
            emailLabel: 'Email hoặc Số điện thoại',
            emailOnlyLabel: 'Địa chỉ Email',
            phoneLabel: 'Số điện thoại',
            phonePlaceholder: '0901234567',
            passLabel: 'Mật khẩu',
            confirmPassLabel: 'Xác nhận mật khẩu',
            newPassLabel: 'Mật khẩu mới',
            currentPassLabel: 'Mật khẩu hiện tại',
            rememberMe: 'Ghi nhớ đăng nhập',
            forgotLink: 'Quên mật khẩu?',
            termsAgree: 'Tôi đồng ý với Điều khoản dịch vụ & Chính sách bảo mật của Animora',
            submitBtn: 'Đăng nhập',
            registerSubmitBtn: 'Tạo tài khoản mới',
            demoLoginBtn: 'Đăng nhập nhanh (Tài khoản mẫu)',
            switchToRegister: 'Chưa có tài khoản?',
            switchToRegisterBtn: 'Đăng ký ngay',
            switchToLogin: 'Đã có tài khoản?',
            switchToLoginBtn: 'Đăng nhập',
            sendOtpBtn: 'Gửi mã xác thực OTP',
            otpLabel: 'Mã xác thực OTP (6 chữ số)',
            resetPassBtn: 'Đặt lại mật khẩu',
            backToLogin: 'Quay lại đăng nhập',
            logoutBtn: 'Đăng xuất tài khoản',
            successToast: 'Đăng nhập thành công! Chào mừng bạn quay trở lại với Animora.',
            registerSuccessToast: 'Đăng ký tài khoản thành công! Chào mừng bạn đến với Animora.',
            resetSuccessToast: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.',
            logoutToast: 'Đã đăng xuất khỏi tài khoản Animora.',
            benefit1Title: 'Sổ sức khỏe & tiêm chủng điện tử',
            benefit1Desc: 'Nhắc lịch tiêm phòng, tái khám và theo dõi cân nặng đa loài 24/7.',
            benefit2Title: 'Đặt lịch khám & Spa trong 30 giây',
            benefit2Desc: 'Lưu sẵn thông tin bé cưng, chọn chuyên viên yêu thích không cần nhập lại.',
            benefit3Title: 'Ưu đãi thành viên & Giao hàng nhanh',
            benefit3Desc: 'Tích điểm đổi quà, quản lý địa chỉ nhận hàng và mua lại đơn thuốc dễ dàng.'
        },
        common: {
            close: 'Đóng',
            searchTitle: 'Tìm kiếm nhanh tại Animora',
            noSearchResults: 'Không tìm thấy kết quả phù hợp cho'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About us',
            services: 'Services',
            adopt: 'Adopt',
            shop: 'Shop',
            petProfiles: 'Pet profiles',
            searchPlaceholder: 'Search pets, products...',
            login: 'Log in',
            register: 'Sign up',
            cartTitle: 'Your Cart',
            callNow: `Call us: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay}`
        },
        hero: {
            eyebrow: 'Animora Pet Care',
            title: 'Your pet deserves a spa day',
            subtitleBefore: 'Every companion ',
            subtitleBold: 'is safe',
            subtitleAfter: ' in our caring hands',
            btnCall: `Call us: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay}`,
            btnBook: 'Book appointment',
            socialProofText: 'Over 1,600 happy pets of all species served',
            healthCardTitle: 'Pet health',
            healthCardSub: 'Track vaccines & regular checkups'
        },
        quickBooking: {
            title: 'Quick Appointment Booking',
            fullName: 'Full name',
            fullNamePlaceholder: 'John Doe',
            phone: 'Phone number',
            phonePlaceholder: '0901234567',
            petType: 'Pet species',
            service: 'Service',
            date: 'Appointment date',
            btnSubmit: 'Quick booking',
            dog: 'Dog',
            cat: 'Cat',
            rabbit: 'Rabbit',
            hamster: 'Hamster / Guinea Pig',
            bird: 'Bird / Parrot',
            reptile: 'Reptile / Turtle',
            other: 'Other exotic pet',
            generalCheckup: 'General checkup',
            spa: 'Spa & bath',
            vaccine: 'Vaccination',
            training: 'Training',
            successToast: `Quick booking successful! Animora (${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay} / ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}) will contact you in 15 mins to confirm.`
        },
        about: {
            eyebrow: 'ABOUT US',
            title: 'The founding story behind our practice',
            titleLine1: 'The founding story',
            titleLine2: 'behind our practice',
            desc1: 'We have a team of passionate and experienced professionals devoted to the well-being of all pets — from dogs, cats, and rabbits to hamsters, parrots, and exotic companions. Our staff includes trained veterinarians, groomers, trainers, and caretakers committed to providing the best care possible.',
            desc2: 'Every medical check, spa routine, or training course at Animora is tailored with a deep understanding of each species’ unique biology, personality, and health needs.',
            trustedText: 'Trusted by over 10,000 clients',
            devotedTitle: 'Devoted',
            devotedDesc: 'Meticulous attention to every detail, prioritizing comfort and happiness.',
            transparentTitle: 'Transparent',
            transparentDesc: 'Clear treatment plans, upfront service pricing, and accessible health logs.',
            sustainableTitle: 'Sustainable',
            sustainableDesc: 'Utilizing vegan, organic products and eco-conscious care solutions.',
            bannerHeadlineLine1: 'Great pet care starts with',
            bannerHeadlineLine2: 'the right appointment at the right time',
            bannerBtnBook: 'Book now',
            bannerBtnClinic: 'Register clinic',
            bannerAppTitle: 'Download Animora App',
            bannerAppSub: 'Experience right on your phone',
            bannerGooglePlayTop: 'Get it on',
            bannerGooglePlayBottom: 'Google Play'
        },
        services: {
            eyebrow: 'Services we provide',
            title: 'Multi-species veterinary care tailored to every pet',
            checkupTitle: 'Checkups & vaccines',
            checkupDesc: 'Specialized exams, vaccinations, and preventive care for dogs, cats, rabbits, hamsters, birds & small pets.',
            checkupPrice: 'From 590,000đ',
            spaTitle: 'Spa & grooming',
            spaDesc: 'Herbal bathing, coat & feather care, nail trimming, dental checks, and soothing treatments.',
            spaPrice: 'From 490,000đ',
            trainingTitle: 'Training & Socializing',
            trainingDesc: 'Build positive habits, enrichment routines, and gentle bonding across species.',
            trainingPrice: 'From 690,000đ',
            boardingTitle: 'Multi-Species Boarding',
            boardingDesc: 'Species-separated climate-controlled suites with 24/7 camera monitoring while you are away.',
            boardingPrice: 'From 390,000đ/night',
            btnBook: 'Book service'
        },
        adoption: {
            eyebrow: 'ADOPTION',
            title: 'Find a new friend',
            filterAll: 'All',
            filterDogs: 'Dogs',
            filterCats: 'Cats',
            filterRabbits: 'Rabbits',
            filterHamsters: 'Hamsters',
            filterBirds: 'Birds & Parrots',
            btnAdopt: 'Adopt',
            modalTitle: 'Adoption Application',
            modalSub: 'Thank you for opening your heart to give a warm home to a pet!',
            applicantName: 'Your full name',
            applicantPhone: 'Phone number',
            applicantEmail: 'Email',
            notes: 'Message / Living conditions',
            notesPlaceholder: 'Share a little about your pet care experience and living environment...',
            btnSubmitRequest: 'Submit adoption request',
            successToast: 'Request sent! We will contact you soon.'
        },
        shop: {
            eyebrow: 'SHOP',
            title: 'Shop for all your pets',
            catAll: 'All',
            catFood: 'Food',
            catToys: 'Toys',
            catAccessories: 'Accessories',
            catCare: 'Care',
            btnAddToCart: 'Add to cart',
            addedToast: 'Item added to your cart!',
            emptyCart: 'Your cart is empty',
            subtotal: 'Subtotal:',
            freeShippingNotice: 'Add more items for Free Nationwide Delivery!',
            checkoutBtn: 'Checkout now',
            cartQuantity: 'Quantity:'
        },
        petProfiles: {
            eyebrow: 'PET PROFILES',
            title: "Your pet's health record",
            breed: 'Breed',
            gender: 'Gender',
            age: 'Age',
            weight: 'Weight',
            nextCheckup: 'Next checkup',
            vaccineHistory: 'Vaccination history',
            statusVaccinated: 'Vaccinated',
            statusDueSoon: 'Due soon',
            statusNotYet: 'Not yet',
            btnUpdate: 'Update profile',
            btnAddPet: 'Add new pet',
            modalUpdateTitle: 'Update health record',
            modalAddPetTitle: 'Add new pet profile',
            petNameLabel: 'Pet name',
            newVaccineLabel: 'Add vaccine record',
            vaccineDate: 'Vaccine / Due date',
            vaccineStatus: 'Vaccine status',
            saveChanges: 'Save changes',
            saveSuccessToast: "Pet's health profile updated successfully!"
        },
        testimonials: {
            eyebrow: 'CLIENT TESTIMONIALS',
            title: 'Trusted by devoted pet parents',
            subtitle: 'Over 1,600 families have entrusted their dogs, cats, rabbits, and small companions to Animora since 2012.',
            ratingSummary: '4.9 / 5.0 average satisfaction · 1,640+ verified reviews',
            swipeHint: 'Swipe or drag cards horizontally to explore more stories',
            prevLabel: 'Previous testimonial',
            nextLabel: 'Next testimonial',
            goToSlide: 'Go to testimonial'
        },
        footer: {
            tagline: 'Animora - Pet care center & happy sanctuary nurturing every gentle paw print.',
            colExplore: 'Explore',
            colContact: 'Contact',
            contactPersonLabel: 'Contact person',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            copyPhoneAria: 'Sao chép số điện thoại',
            copyEmailAria: 'Sao chép email',
            copiedToast: 'Copied!',
            address: '128 Nguyen Trai St, Ben Thanh Ward, District 1, HCMC',
            phone: `Hotline: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneDisplay} (8:00 - 21:00)`,
            email: `Email: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
            hours: 'Open every day of the week: 08:00 - 20:30',
            copyright: '© 2026 Animora Pet Care Center. All rights reserved.'
        },
        loginModal: {
            tabLogin: 'Log in',
            tabRegister: 'Sign up',
            title: 'Log in to Animora',
            subtitle: 'Manage your pet health records, book appointments, and track orders easily.',
            registerTitle: 'Create an Animora Account',
            registerSubtitle: 'Join over 1,600 devoted pet parents managing multi-species health records.',
            forgotTitle: 'Reset Your Password',
            forgotSubtitle: 'Enter your registered Email or Phone number to receive a 6-digit OTP code.',
            accountTitle: 'My Account',
            accountSubtitle: 'Manage your personal profile, delivery addresses, and account security.',
            fullNameLabel: 'Full name',
            fullNamePlaceholder: 'Alex Nguyen',
            emailLabel: 'Email or Phone number',
            emailOnlyLabel: 'Email address',
            phoneLabel: 'Phone number',
            phonePlaceholder: '0901234567',
            passLabel: 'Password',
            confirmPassLabel: 'Confirm password',
            newPassLabel: 'New password',
            currentPassLabel: 'Current password',
            rememberMe: 'Remember me',
            forgotLink: 'Forgot password?',
            termsAgree: 'I agree to Animora Terms of Service & Privacy Policy',
            submitBtn: 'Log in',
            registerSubmitBtn: 'Create account',
            demoLoginBtn: 'Quick Login (Demo Account)',
            switchToRegister: "Don't have an account?",
            switchToRegisterBtn: 'Sign up now',
            switchToLogin: 'Already have an account?',
            switchToLoginBtn: 'Log in',
            sendOtpBtn: 'Send OTP Code',
            otpLabel: '6-digit OTP Verification Code',
            resetPassBtn: 'Reset Password',
            backToLogin: 'Back to log in',
            logoutBtn: 'Log out',
            successToast: 'Logged in successfully! Welcome back to Animora.',
            registerSuccessToast: 'Account created successfully! Welcome to Animora.',
            resetSuccessToast: 'Password reset successfully! You can now log in.',
            logoutToast: 'Logged out of your Animora account.',
            benefit1Title: 'Digital Health & Vaccine Records',
            benefit1Desc: 'Automated reminders for vaccines, checkups, and weight tracking across species.',
            benefit2Title: '30-Second Express Booking',
            benefit2Desc: 'Save your pets and favorite specialists for instant appointment scheduling.',
            benefit3Title: 'Member Perks & Fast Checkout',
            benefit3Desc: 'Earn reward points, save delivery addresses, and reorder prescriptions easily.'
        },
        common: {
            close: 'Close',
            searchTitle: 'Quick Search at Animora',
            noSearchResults: 'No matching results found for'
        }
    }
};
}),
];

//# sourceMappingURL=src_data_1n9htkz30kr9v._.js.map