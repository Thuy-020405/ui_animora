import { Product, ProductReview, ShopPetGroup, PetSpecies } from '../types';

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'hat-nutripet-huu-co-da-loai-2kg',
    name: 'Hạt NutriPet hữu cơ đa loài (2kg)',
    nameEn: 'NutriPet organic multi-species kibble (2kg)',
    price: 320000,
    oldPrice: 400000,
    discountPercent: 20,
    category: 'food',
    petTypes: ['dog', 'cat'],
    brand: 'NutriPet Organic',
    spec: 'Túi 2kg',
    specEn: '2kg bag',
    specOptions: [
      { labelVi: 'Túi 1kg', labelEn: '1kg bag', price: 185000, oldPrice: 220000 },
      { labelVi: 'Túi 2kg', labelEn: '2kg bag', price: 320000, oldPrice: 400000 },
      { labelVi: 'Túi 5kg tiết kiệm', labelEn: '5kg value bag', price: 740000, oldPrice: 920000 },
    ],
    image: '/assets/products/nutripet-organic-2kg.png',
    images: [
      '/assets/products/nutripet-organic-2kg.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['sale'],
    stock: 28,
    rating: 4.9,
    reviewCount: 142,
    createdAtOrder: 16,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Hạt dinh dưỡng hữu cơ công thức cân bằng cho chó và mèo, chế biến từ thịt gà thả vườn, cá hồi tươi và rau củ hữu cơ sấy lạnh giúp bộ lông bóng mượt và tiêu hóa khỏe mạnh mỗi ngày.',
    descriptionEn:
      'Balanced organic kibble crafted from free-range chicken, fresh salmon, and freeze-dried organic vegetables for glossy coats and healthy digestion.',
    ingredientsVi:
      'Thịt gà hữu cơ rút xương (38%), phi lê cá hồi Na Uy (18%), gạo lứt nguyên cám, khoai lang tím, đậu Hà Lan, cà rốt hữu cơ, dầu cá hồi giàu Omega 3-6, chiết xuất cúc vạn thọ, men vi sinh Bacillus subtilis (2 tỷ CFU/kg), Taurine, Vitamin A, D3, E và khoáng chất chelate.',
    ingredientsEn:
      'Deboned organic chicken (38%), Norwegian salmon fillet (18%), whole brown rice, purple sweet potato, green peas, organic carrots, Omega 3-6 salmon oil, marigold extract, Bacillus subtilis probiotics (2B CFU/kg), Taurine, Vitamins A, D3, E and chelated minerals.',
    usageVi:
      'Cho ăn trực tiếp theo trọng lượng cơ thể (30g–50g cho bé 2–4kg; 60g–110g cho bé 5–10kg; chia 2–3 bữa/ngày). Luôn chuẩn bị sẵn nước sạch bên cạnh bát ăn và khóa kín miệng túi zip sau khi mở.',
    usageEn:
      'Serve dry according to body weight (30g–50g for 2–4kg pets; 60g–110g for 5–10kg pets; split into 2–3 meals daily). Always provide fresh water and reseal the zip pouch after opening.',
  },
  {
    id: 'prod-2',
    slug: 'hat-ca-hoi-huu-co-animora-royal-1-5kg',
    name: 'Hạt cá hồi hữu cơ Animora Royal cho mèo (1.5kg)',
    nameEn: 'Animora Royal organic salmon cat kibble (1.5kg)',
    price: 295000,
    category: 'food',
    petTypes: ['cat'],
    brand: 'Animora Royal',
    spec: 'Túi 1.5kg',
    specEn: '1.5kg bag',
    specOptions: [
      { labelVi: 'Túi 500g', labelEn: '500g bag', price: 115000 },
      { labelVi: 'Túi 1.5kg', labelEn: '1.5kg bag', price: 295000 },
      { labelVi: 'Túi 3kg', labelEn: '3kg bag', price: 540000 },
    ],
    image: '/assets/products/royal-salmon-cat.png',
    images: [
      '/assets/products/royal-salmon-cat.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['bestseller'],
    stock: 22,
    rating: 4.8,
    reviewCount: 96,
    createdAtOrder: 15,
    recommendedAges: ['baby', 'adult'],
    description:
      'Hạt cá hồi Bắc Âu kết hợp hạt lanh và nam việt quất giúp giảm búi lông tự nhiên, hạn chế sỏi tiết niệu và nuôi dưỡng bộ lông mềm mượt cho mèo mọi lứa tuổi.',
    descriptionEn:
      'Nordic salmon kibble blended with flaxseed and cranberries to reduce hairballs naturally, support urinary tract health, and nourish silky fur.',
    ingredientsVi:
      'Thịt cá hồi tươi (42%), cá trích sấy lạnh, gạo lứt, bột củ cải đường, quả nam việt quất hữu cơ, hạt lanh ép lạnh, Taurine (2200mg/kg), L-Carnitine, chiết xuất Yucca giảm mùi phân.',
    ingredientsEn:
      'Fresh salmon (42%), freeze-dried herring, brown rice, beet pulp, organic cranberries, cold-pressed flaxseed, Taurine (2200mg/kg), L-Carnitine, Yucca schidigera extract.',
    usageVi:
      'Dùng cho mèo từ 2 tháng tuổi trở lên. Khi đổi từ loại hạt cũ sang Animora Royal, hãy trộn tăng dần tỷ lệ trong 5–7 ngày để hệ tiêu hóa của bé thích nghi êm ái.',
    usageEn:
      'Suitable for cats 2 months and older. Transition gradually over 5–7 days by mixing increasing amounts with current food.',
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
    petTypes: ['dog', 'cat'],
    brand: 'Animora Royal',
    spec: 'Hộp 400g',
    specEn: '400g pack',
    specOptions: [
      { labelVi: 'Hộp 400g', labelEn: '400g pack', price: 170000, oldPrice: 200000 },
      { labelVi: 'Combo 3 hộp (1.2kg)', labelEn: '3-pack (1.2kg)', price: 480000, oldPrice: 600000 },
    ],
    image: '/assets/products/pate-pumpkin-chicken.png',
    images: [
      '/assets/products/pate-pumpkin-chicken.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['sale'],
    stock: 35,
    rating: 4.7,
    reviewCount: 52,
    createdAtOrder: 14,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Pate nấu chậm từ ức gà phi lê và bí đỏ hữu cơ giàu độ ẩm, giúp cấp nước tự nhiên cho thận và kích thích vị giác cho những bé chó mèo kén ăn hoặc vừa mới ốm dậy.',
    descriptionEn:
      'Slow-cooked wet food made with chicken breast fillet and organic pumpkin for natural hydration and irresistible palatability.',
    ingredientsVi:
      'Ức gà tươi (55%), nước hầm xương gà cô đặc (24%), bí đỏ Đà Lạt (12%), gan gà sạch (5%), dầu cá hồi, agar thực vật, Taurine và Vitamin nhóm B.',
    ingredientsEn:
      'Fresh chicken breast (55%), concentrated chicken bone broth (24%), organic pumpkin (12%), chicken liver (5%), salmon oil, plant agar, Taurine, B-complex vitamins.',
    usageVi:
      'Cho ăn trực tiếp hoặc trộn cùng hạt khô. Sau khi mở nắp, bảo quản trong ngăn mát tủ lạnh (2–6°C) và dùng hết trong vòng 72 giờ.',
    usageEn:
      'Serve directly or mix with dry kibble. Refrigerate unused portion (2–6°C) and consume within 72 hours of opening.',
  },
  {
    id: 'prod-4',
    slug: 'co-timothy-say-lanh-meadow-pure-1kg',
    name: 'Cỏ Timothy sấy lạnh Meadow Pure cho thỏ và bọ ú (1kg)',
    nameEn: 'Meadow Pure cold-dried Timothy hay for rabbits & guinea pigs (1kg)',
    price: 165000,
    category: 'food',
    petTypes: ['rabbit_rodent'],
    brand: 'Meadow Pure',
    spec: 'Túi 1kg',
    specEn: '1kg bag',
    specOptions: [
      { labelVi: 'Túi 500g', labelEn: '500g bag', price: 95000 },
      { labelVi: 'Túi 1kg', labelEn: '1kg bag', price: 165000 },
      { labelVi: 'Thùng 2.5kg', labelEn: '2.5kg box', price: 375000 },
    ],
    image: '/assets/products/timothy-hay-rabbit.png',
    images: [
      '/assets/products/timothy-hay-rabbit.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['bestseller'],
    stock: 40,
    rating: 5.0,
    reviewCount: 84,
    createdAtOrder: 13,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Cỏ Timothy thu hoạch đợt đầu (First Cut) đã sàng lọc bụi mịn, giữ trọn màu xanh tự nhiên và hương thơm thảo mộc giúp mài răng chuẩn xác và ngăn ngừa tắc ruột ở thỏ, bọ ú, chinchilla.',
    descriptionEn:
      'Dust-extracted First Cut Timothy hay with crisp green stalks and natural herbal aroma to support dental wear and digestive motility in rabbits and rodents.',
    ingredientsVi:
      '100% cỏ Timothy tự nhiên sấy lạnh nguyên cọng (Chất xơ thô ≥ 34%, Đạm thô 8%, Canxi thấp ≤ 0.45%), không thuốc trừ sâu, không chất tạo màu.',
    ingredientsEn:
      '100% whole-stem cold-dried Timothy hay (Crude fiber ≥ 34%, Crude protein 8%, Low calcium ≤ 0.45%), pesticide-free and dye-free.',
    usageVi:
      'Đặt cỏ không giới hạn vào khay cỏ khô ráo mỗi ngày (chiếm 80% khẩu phần ăn của thỏ và bọ ú). Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp.',
    usageEn:
      'Provide unlimited hay daily in a clean hay rack (comprising 80% of rabbit and guinea pig diets). Store in a cool, dry place.',
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
    petTypes: ['bird'],
    brand: 'Avian Gold',
    spec: 'Túi 800g',
    specEn: '800g bag',
    specOptions: [
      { labelVi: 'Túi 400g', labelEn: '400g bag', price: 78000, oldPrice: 98000 },
      { labelVi: 'Túi 800g', labelEn: '800g bag', price: 135000, oldPrice: 180000 },
    ],
    image: '/assets/products/seed-mix-parrot.png',
    images: [
      '/assets/products/seed-mix-parrot.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['sale'],
    stock: 19,
    rating: 4.6,
    reviewCount: 37,
    createdAtOrder: 12,
    recommendedAges: ['baby', 'adult'],
    description:
      'Hỗn hợp 22 loại hạt nguyên cám, kê vàng, hạt lanh và trái cây nhiệt đới sấy dẻo giúp vẹt Cockatiel, Lovebird và Yến Phụng căng tràn năng lượng và lên màu lông óng ả.',
    descriptionEn:
      'Nutrient-dense blend of 22 whole grains, golden millet, flaxseed, and dehydrated tropical fruits for vibrant plumage and daily vitality.',
    ingredientsVi:
      'Kê vàng, kê đỏ, yến mạch bóc vỏ, hạt lanh, hạt rum, hạt bí xanh, táo sấy, đu đủ sấy, cà rốt sấy lạnh, men bia, canxi hữu cơ và khoáng vi lượng.',
    ingredientsEn:
      'Yellow millet, red millet, hulled oats, flaxseed, safflower seed, pumpkin seed, dried apple, papaya, freeze-dried carrot, brewer yeast, organic calcium.',
    usageVi:
      'Cho ăn 15g–30g mỗi ngày tùy kích thước chim. Thổi sạch vỏ trấu trong cóng ăn mỗi sáng và bổ sung thêm nước ấm sạch.',
    usageEn:
      'Feed 15g–30g daily depending on bird size. Remove empty seed hulls from the feeder each morning and provide fresh water.',
  },
  {
    id: 'prod-6',
    slug: 'sua-tam-thao-moc-yen-mach-botanica-spa-500ml',
    name: 'Sữa tắm thảo mộc yến mạch và oải hương Botanica Spa (500ml)',
    nameEn: 'Botanica Spa oatmeal & lavender herbal shampoo (500ml)',
    price: 185000,
    category: 'care',
    petTypes: ['dog', 'cat', 'rabbit_rodent'],
    brand: 'Botanica Spa',
    spec: 'Chai 500ml',
    specEn: '500ml bottle',
    specOptions: [
      { labelVi: 'Chai 250ml', labelEn: '250ml bottle', price: 110000 },
      { labelVi: 'Chai 500ml', labelEn: '500ml bottle', price: 185000 },
    ],
    image: '/assets/products/shampoo-oatmeal-lavender.png',
    images: [
      '/assets/products/shampoo-oatmeal-lavender.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['bestseller'],
    stock: 32,
    rating: 4.9,
    reviewCount: 73,
    createdAtOrder: 11,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Công thức pH 6.8 cân bằng dịu nhẹ không cay mắt từ yến mạch keo và tinh dầu oải hương Pháp, giúp làm dịu làn da mẩn đỏ, khử mùi hôi lâu dài và dưỡng lông mềm mượt như nhung.',
    descriptionEn:
      'Tear-free pH 6.8 balanced formula with colloidal oatmeal and French lavender essential oil to soothe itchy skin, deodorize naturally, and condition coats.',
    ingredientsVi:
      'Nước tinh khiết, chiết xuất yến mạch keo hữu cơ (8%), tinh dầu oải hương Provence, nha đam tươi, Panthenol (Vitamin B5), chất làm sạch gốc dừa dịu nhẹ (không SLS/Paraben).',
    ingredientsEn:
      'Purified water, organic colloidal oatmeal extract (8%), Provence lavender oil, aloe vera gel, Panthenol (Pro-Vitamin B5), coconut-derived mild cleansers (SLS & Paraben free).',
    usageVi:
      'Làm ướt lông bằng nước ấm, pha loãng sữa tắm tỷ lệ 1:5 rồi massage nhẹ nhàng từ cổ xuống chân trong 3–5 phút. Xả sạch bằng nước ấm và sấy khô hoàn toàn.',
    usageEn:
      'Wet coat with warm water, dilute shampoo 1:5 and massage gently for 3–5 minutes avoiding inner ears. Rinse thoroughly and blow-dry.',
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
    petTypes: ['dog', 'cat'],
    brand: 'Norse Vital',
    spec: 'Chai vòi nhấn 250ml',
    specEn: '250ml pump bottle',
    specOptions: [
      { labelVi: 'Chai vòi nhấn 250ml', labelEn: '250ml pump bottle', price: 245000, oldPrice: 350000 },
      { labelVi: 'Chai lớn 500ml', labelEn: '500ml pump bottle', price: 430000, oldPrice: 590000 },
    ],
    image: '/assets/products/salmon-oil-omega.png',
    images: [
      '/assets/products/salmon-oil-omega.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['sale'],
    stock: 25,
    rating: 4.8,
    reviewCount: 61,
    createdAtOrder: 10,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Ép lạnh 100% từ cá hồi vùng biển lạnh Na Uy, giàu EPA và DHA giúp giảm rụng lông rõ rệt sau 3 tuần, tăng cường thị lực, bảo vệ tim mạch và bôi trơn sụn khớp.',
    descriptionEn:
      '100% cold-pressed Norwegian salmon oil rich in EPA & DHA to visibly reduce shedding within 3 weeks while supporting joint, heart, and cognitive health.',
    ingredientsVi:
      'Dầu cá hồi tự nhiên nguyên chất (99.8%), Tocopherol tự nhiên (Vitamin E chống oxy hóa). Hàm lượng Omega-3 ≥ 28% (EPA 13%, DHA 12%).',
    ingredientsEn:
      'Pure cold-pressed Norwegian salmon oil (99.8%), natural mixed Tocopherols (Vitamin E). Omega-3 content ≥ 28% (EPA 13%, DHA 12%).',
    usageVi:
      'Nhấn trực tiếp lên thức ăn hạt hoặc pate mỗi ngày: 1 lần nhấn (2ml) cho mỗi 4kg thể trọng của thú cưng.',
    usageEn:
      'Pump directly onto dry kibble or wet food daily: 1 pump (2ml) per 4kg of pet body weight.',
  },
  {
    id: 'prod-8',
    slug: 'men-vi-sinh-tieu-hoa-vetbio-care-30-goi',
    name: 'Men vi sinh tiêu hóa VetBio Care 6 tỷ lợi khuẩn (Hộp 30 gói)',
    nameEn: 'VetBio Care 6B CFU digestive probiotic powder (30 sachets)',
    price: 215000,
    category: 'care',
    petTypes: ['dog', 'cat', 'rabbit_rodent', 'bird'],
    brand: 'VetBio Care',
    spec: 'Hộp 30 gói x 2g',
    specEn: '30 sachets x 2g',
    specOptions: [
      { labelVi: 'Hộp 15 gói x 2g', labelEn: '15 sachets x 2g', price: 120000 },
      { labelVi: 'Hộp 30 gói x 2g', labelEn: '30 sachets x 2g', price: 215000 },
    ],
    image: '/assets/products/probiotic-digest.png',
    images: [
      '/assets/products/probiotic-digest.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['new'],
    stock: 44,
    rating: 4.7,
    reviewCount: 29,
    createdAtOrder: 9,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Bổ sung 6 chủng lợi khuẩn sống bọc vi nang kết hợp chất xơ hòa tan FOS/Inulin giúp cân bằng hệ vi sinh đường ruột, cải thiện phân lỏng và hỗ trợ hấp thu sau đợt dùng kháng sinh.',
    descriptionEn:
      'Micro-encapsulated 6-strain probiotic complex with prebiotic FOS/Inulin to restore gut flora, firm up loose stools, and boost immunity.',
    ingredientsVi:
      'Enterococcus faecium, Lactobacillus acidophilus, Bifidobacterium animalis, Saccharomyces boulardii (tổng ≥ 6 x 10^9 CFU/gói), Inulin từ rễ diếp xoăn, Kẽm gluconate.',
    ingredientsEn:
      'Enterococcus faecium, Lactobacillus acidophilus, Bifidobacterium animalis, Saccharomyces boulardii (total ≥ 6 x 10^9 CFU/sachet), Chicory root Inulin, Zinc gluconate.',
    usageVi:
      'Pha vào nước uống ấm (<37°C) hoặc rắc trộn đều vào thức ăn: Thú nhỏ & chim 1/2 gói/ngày; Chó mèo <10kg 1 gói/ngày; Chó >10kg 2 gói/ngày.',
    usageEn:
      'Mix with lukewarm water (<37°C) or sprinkle over food: Small pets & birds 1/2 sachet/day; Dogs & cats <10kg 1 sachet/day; Dogs >10kg 2 sachets/day.',
  },
  {
    id: 'prod-9',
    slug: 'dung-dich-ve-sinh-tai-cuc-la-ma-chamomile-120ml',
    name: 'Dung dịch vệ sinh tai và mắt chiết xuất cúc La Mã (120ml)',
    nameEn: 'Chamomile Care organic ear & eye cleansing drops (120ml)',
    price: 140000,
    category: 'care',
    petTypes: ['dog', 'cat', 'rabbit_rodent'],
    brand: 'Botanica Spa',
    spec: 'Chai 120ml',
    specEn: '120ml dropper bottle',
    specOptions: [
      { labelVi: 'Chai 120ml', labelEn: '120ml dropper bottle', price: 140000 },
    ],
    image: '/assets/products/ear-eye-cleanser.png',
    images: [
      '/assets/products/ear-eye-cleanser.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: [],
    stock: 27,
    rating: 4.6,
    reviewCount: 19,
    createdAtOrder: 8,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Dung dịch thảo mộc không cồn giúp làm mềm ráy tai, khử mùi hôi ống tai và lau sạch vệt ố nước mắt quanh khóe mắt một cách êm dịu không gây kích ứng.',
    descriptionEn:
      'Alcohol-free botanical drops to gently dissolve earwax, neutralize ear odor, and wipe away tear stains without irritation.',
    ingredientsVi:
      'Chiết xuất hoa cúc La Mã hữu cơ, nước cây phỉ (Witch Hazel), tinh chất lô hội, Glycerin thực vật, Acid Boric 0.5% chuẩn dược điển thú y.',
    ingredientsEn:
      'Organic Roman chamomile extract, Witch Hazel hydrosol, aloe vera essence, vegetable glycerin, veterinary-grade Boric Acid 0.5%.',
    usageVi:
      'Nhỏ 3–5 giọt vào ống tai, massage nhẹ gốc tai trong 30 giây rồi dùng bông gòn mềm lau sạch phần dịch đẩy ra ngoài. Sử dụng 2–3 lần mỗi tuần.',
    usageEn:
      'Instill 3–5 drops into the ear canal, gently massage the base of the ear for 30 seconds, and wipe clean with a soft cotton pad 2–3 times weekly.',
  },
  {
    id: 'prod-10',
    slug: 'bong-day-thung-cotton-va-cao-su-tu-nhien-sach-rang',
    name: 'Bóng dây thừng cotton và cao su tự nhiên làm sạch răng',
    nameEn: 'Natural rubber & braided cotton dental chew ball',
    price: 125000,
    category: 'toys',
    petTypes: ['dog'],
    brand: 'PawPlay Studio',
    spec: 'Cỡ M (Đường kính 7cm)',
    specEn: 'Size M (7cm diameter)',
    specOptions: [
      { labelVi: 'Cỡ S (5cm - Chó nhỏ)', labelEn: 'Size S (5cm - Small dogs)', price: 99000 },
      { labelVi: 'Cỡ M (7cm - Chó vừa)', labelEn: 'Size M (7cm - Medium dogs)', price: 125000 },
      { labelVi: 'Cỡ L (9cm - Chó lớn)', labelEn: 'Size L (9cm - Large dogs)', price: 155000 },
    ],
    image: '/assets/products/rope-chew-ball.png',
    images: [
      '/assets/products/rope-chew-ball.png',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: [],
    stock: 30,
    rating: 4.8,
    reviewCount: 44,
    createdAtOrder: 7,
    recommendedAges: ['baby', 'adult'],
    description:
      'Kết hợp bóng cao su cây tự nhiên đàn hồi cao với gai massage nướu hương bạc hà và dây thừng sợi bông không tẩy trắng, giúp cún cưng giải tỏa năng lượng và chải sạch mảng bám răng khi nhai.',
    descriptionEn:
      'Durable natural tree-rubber ball with mint-infused dental nubs and unbleached braided cotton rope for tug-of-war and plaque removal.',
    ingredientsVi:
      '100% cao su tự nhiên không chứa BPA/Phthalate, dây thừng sợi cotton hữu cơ bện 6 lớp chắc chắn, tinh dầu bạc hà tự nhiên.',
    ingredientsEn:
      '100% BPA-free natural rubber, 6-ply braided organic cotton rope, natural peppermint essence.',
    usageVi:
      'Dùng chơi ném bắt hoặc kéo co cùng bé. Có thể phết một lớp mỏng pate hoặc bơ đậu phộng cho thú cưng vào rãnh bóng để tăng hứng thú. Rửa sạch bằng nước ấm sau khi chơi.',
    usageEn:
      'Ideal for fetch, tug-of-war, or solo chewing. Spread pet-safe paste inside the grooves for mental enrichment. Rinse with warm water after play.',
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
    petTypes: ['cat'],
    brand: 'PawPlay Studio',
    spec: 'Cao 85cm (Đế 45x45cm)',
    specEn: '85cm height (45x45cm base)',
    specOptions: [
      { labelVi: 'Cao 85cm (2 tầng)', labelEn: '85cm height (2 tiers)', price: 697000, oldPrice: 850000 },
      { labelVi: 'Cao 120cm (3 tầng)', labelEn: '120cm height (3 tiers)', price: 960000, oldPrice: 1200000 },
    ],
    image: '/assets/products/cat-tree-oak.png',
    images: [
      '/assets/products/cat-tree-oak.png',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['sale'],
    stock: 4,
    rating: 5.0,
    reviewCount: 31,
    createdAtOrder: 6,
    recommendedAges: ['baby', 'adult'],
    description:
      'Tháp cào móng khung gỗ sồi vững chãi quấn thừng sisal tự nhiên dày 6mm kèm đệm nằm lông cừu nhân tạo có thể tháo giặt, bảo vệ sofa gia đình và tạo không gian leo trèo lý tưởng cho mèo.',
    descriptionEn:
      'Sturdy oak-veneer cat tower wrapped in 6mm natural sisal rope with removable sherpa cushions and a private sleeping condo.',
    ingredientsVi:
      'Gỗ thông và ván ép phủ veneer sồi chống ẩm, dây thừng sisal tự nhiên không tẩm hóa chất, đệm vải lông cừu sherpa tháo rời được.',
    ingredientsEn:
      'Moisture-resistant oak-veneer engineered wood, untreated natural sisal rope, machine-washable sherpa fleece cushion.',
    usageVi:
      'Lắp ráp dễ dàng trong 10 phút với bộ ốc lục giác đi kèm. Có thể rắc một chút cỏ mèo (catnip) lên cột thừng để hướng dẫn bé làm quen ngay lần đầu.',
    usageEn:
      'Assembles in 10 minutes with the included hex key. Sprinkle a pinch of catnip on the sisal posts to attract your cat immediately.',
  },
  {
    id: 'prod-12',
    slug: 'vong-chay-go-bach-duong-tinh-am-cho-hamster-22cm',
    name: 'Vòng chạy gỗ bạch dương tĩnh âm cho hamster và sóc bay (22cm)',
    nameEn: 'Silent birchwood exercise wheel for hamsters & sugar gliders (22cm)',
    price: 155000,
    category: 'toys',
    petTypes: ['rabbit_rodent'],
    brand: 'Meadow Pure',
    spec: 'Đường kính 22cm',
    specEn: '22cm diameter',
    specOptions: [
      { labelVi: 'Cỡ 17cm (Dwarf/Robo)', labelEn: '17cm (Dwarf/Robo)', price: 125000 },
      { labelVi: 'Cỡ 22cm (Syrian/Bear)', labelEn: '22cm (Syrian/Bear)', price: 155000 },
      { labelVi: 'Cỡ 28cm (Nhím/Sóc)', labelEn: '28cm (Hedgehog/Glider)', price: 210000 },
    ],
    image: '/assets/products/silent-wood-wheel.png',
    images: [
      '/assets/products/silent-wood-wheel.png',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['new'],
    stock: 21,
    rating: 4.9,
    reviewCount: 3,
    createdAtOrder: 5,
    recommendedAges: ['baby', 'adult'],
    description:
      'Vòng chạy sử dụng trục vòng bi kép siêu êm không phát ra tiếng cót két vào ban đêm, lòng chạy lót gỗ bần (cork) êm chân và bảo vệ cột sống thẳng tự nhiên cho hamster.',
    descriptionEn:
      'Dual ball-bearing silent wooden wheel lined with soft natural cork to protect tiny paws and maintain healthy spinal alignment during nighttime runs.',
    ingredientsVi:
      'Gỗ bạch dương tự nhiên mài nhẵn không dăm gỗ, lớp lót gỗ bần tự nhiên thấm hút tốt, vòng bi thép không gỉ kép tĩnh âm.',
    ingredientsEn:
      'Splinter-free kiln-dried birchwood, replaceable natural cork running track, dual stainless-steel silent ball bearings.',
    usageVi:
      'Đặt cố định trên nền chuồng phẳng hoặc gắn trực tiếp vào thành lồng. Lau sạch bề mặt gỗ bần bằng khăn ẩm vắt khô mỗi tuần.',
    usageEn:
      'Place on a flat cage floor or mount to cage bars. Wipe the cork track weekly with a slightly damp cloth.',
  },
  {
    id: 'prod-13',
    slug: 'da-mai-mo-bo-sung-canxi-va-khoang-cho-chim-vet',
    name: 'Đá mài mỏ bổ sung canxi và khoáng biển cho chim vẹt',
    nameEn: 'Cuttlebone & ocean mineral beak-conditioning block for birds',
    price: 85000,
    category: 'toys',
    petTypes: ['bird'],
    brand: 'Avian Gold',
    spec: 'Viên 120g kèm thanh đậu',
    specEn: '120g block with perch mount',
    specOptions: [
      { labelVi: '1 viên 120g', labelEn: 'Single 120g block', price: 85000 },
      { labelVi: 'Bộ 2 viên tiết kiệm', labelEn: 'Twin pack (2x120g)', price: 155000 },
    ],
    image: '/assets/products/calcium-cuttlebone.png',
    images: [
      '/assets/products/calcium-cuttlebone.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: [],
    stock: 36,
    rating: 4.7,
    reviewCount: 14,
    createdAtOrder: 4,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Mai mực tự nhiên kết hợp khoáng biển và hạt trái cây ép giúp vẹt và chim cảnh tự mài gọn mỏ, đồng thời bổ sung canxi sinh học giúp khung xương và vỏ trứng cứng cáp.',
    descriptionEn:
      'Natural cuttlebone fused with ocean minerals and fruit granules to keep beaks trim while supplying bio-available calcium.',
    ingredientsVi:
      'Mai mực biển tự nhiên khử muối (75%), vỏ hàu nghiền mịn, khoáng hồng Himalaya, chiết xuất cam ngọt và Vitamin D3.',
    ingredientsEn:
      'Desalted natural cuttlebone (75%), pulverized oyster shell, Himalayan pink mineral salt, sweet orange extract, Vitamin D3.',
    usageVi:
      'Cài cố định vào nan lồng ngay cạnh cầu đậu chính để chim dễ dàng gặm mài mỏ mỗi ngày.',
    usageEn:
      'Securely clip onto cage bars next to the main perch for daily beak conditioning.',
  },
  {
    id: 'prod-14',
    slug: 'bo-bat-doi-gom-su-khang-khuan-kem-ke-go-tre-nghieng-15-do',
    name: 'Bộ bát đôi gốm sứ kháng khuẩn kèm kệ gỗ tre nghiêng 15 độ',
    nameEn: '15-degree tilted bamboo stand with dual ceramic bowls',
    price: 290000,
    category: 'accessories',
    petTypes: ['dog', 'cat', 'rabbit_rodent'],
    brand: 'Animora Home',
    spec: 'Kệ đôi (2 bát x 400ml)',
    specEn: 'Double stand (2 x 400ml bowls)',
    specOptions: [
      { labelVi: 'Kệ đơn (1 bát 400ml)', labelEn: 'Single stand (1 x 400ml)', price: 165000 },
      { labelVi: 'Kệ đôi (2 bát x 400ml)', labelEn: 'Double stand (2 x 400ml)', price: 290000 },
    ],
    image: '/assets/products/ceramic-double-bowl.png',
    images: [
      '/assets/products/ceramic-double-bowl.png',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: [],
    stock: 18,
    rating: 4.8,
    reviewCount: 68,
    createdAtOrder: 3,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Thiết kế góc nghiêng 15 độ chuẩn công thái học thú y giúp giảm áp lực đốt sống cổ và chống nôn trớ sau ăn, lòng bát gốm sứ nung 1300°C tráng men bóng ngăn ngừa mụn cằm ở mèo và chó.',
    descriptionEn:
      'Ergonomic 15° tilted bamboo stand reduces cervical spine strain and regurgitation, paired with high-fired glazed ceramic bowls that prevent feline chin acne.',
    ingredientsVi:
      'Gốm sứ cao cấp nung 1300°C không chì/cadmium, kệ gỗ tre tự nhiên phủ dầu sáp ong chống thấm nước, chân đế cao su chống trượt.',
    ingredientsEn:
      'Lead-free 1300°C high-fired glazed ceramic, beeswax-sealed natural bamboo stand, non-slip silicone foot pads.',
    usageVi:
      'Bát sứ tháo rời an toàn với máy rửa chén và lò vi sóng. Lau kệ gỗ tre bằng khăn ẩm sau mỗi bữa ăn.',
    usageEn:
      'Ceramic bowls are dishwasher and microwave safe. Wipe the bamboo stand clean with a damp cloth.',
  },
  {
    id: 'prod-15',
    slug: 'bo-day-dat-va-yem-nguc-da-mem-thoang-khi-animora',
    name: 'Bộ dây dắt và yếm ngực da mềm lót đệm thoáng khí Animora',
    nameEn: 'Animora breathable padded leather chest harness & leash set',
    price: 340000,
    category: 'accessories',
    petTypes: ['dog', 'cat'],
    brand: 'Animora Home',
    spec: 'Cỡ M (Vòng ngực 38–52cm)',
    specEn: 'Size M (Chest 38–52cm)',
    specOptions: [
      { labelVi: 'Cỡ S (28–38cm: 2–4kg)', labelEn: 'Size S (28–38cm: 2–4kg)', price: 310000 },
      { labelVi: 'Cỡ M (38–52cm: 4–9kg)', labelEn: 'Size M (38–52cm: 4–9kg)', price: 340000 },
      { labelVi: 'Cỡ L (52–68cm: 9–18kg)', labelEn: 'Size L (52–68cm: 9–18kg)', price: 380000 },
    ],
    image: '/assets/products/leather-harness-set.png',
    images: [
      '/assets/products/leather-harness-set.png',
      '/assets/products/gallery-texture-closeup.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['new'],
    stock: 3,
    rating: 5.0,
    reviewCount: 0,
    createdAtOrder: 2,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Yếm chữ Y ôm sát lồng ngực phân tán lực kéo đều mà không gây chèn ép khí quản, kết hợp khoen đồng nguyên khối chống xoắn và viền phản quang an toàn khi đi dạo buổi tối.',
    descriptionEn:
      'No-choke Y-shaped chest harness distributes pulling force evenly across the chest, featuring solid brass hardware and reflective stitching for evening walks.',
    ingredientsVi:
      'Da microfiber mềm mại kết hợp đệm lưới tổ ong thoáng khí 3D, khóa cài hợp kim đồng chịu lực 120kg, dây dắt dài 1.5m kèm tay cầm lót đệm.',
    ingredientsEn:
      'Supple microfiber leather with 3D breathable air-mesh lining, 120kg load-tested brass buckle, 1.5m leash with padded handle.',
    usageVi:
      'Đo vòng ngực ngay sau hai chân trước của bé và chừa khoảng trống vừa 2 ngón tay khi cài khóa để bé vận động thoải mái nhất.',
    usageEn:
      'Measure chest girth right behind the front legs and leave a two-finger gap when fastened for optimal comfort.',
  },
  {
    id: 'prod-16',
    slug: 'den-suoi-uvb-5-0-quang-pho-mat-troi-cho-rua-va-bo-sat',
    name: 'Đèn sưởi UVB 5.0 quang phổ mặt trời cho rùa và bò sát cảnh',
    nameEn: 'Solar-spectrum UVB 5.0 + UVA basking lamp for turtles & reptiles',
    price: 265000,
    category: 'accessories',
    petTypes: ['fish_reptile'],
    brand: 'TerraSun',
    spec: 'Bộ chao kẹp + Bóng 50W',
    specEn: 'Clamp dome + 50W bulb',
    specOptions: [
      { labelVi: 'Bóng lẻ UVB 5.0 (25W)', labelEn: 'UVB 5.0 Bulb only (25W)', price: 145000 },
      { labelVi: 'Bộ chao kẹp + Bóng 50W', labelEn: 'Clamp dome + 50W bulb', price: 265000 },
    ],
    image: '/assets/products/uvb-terrarium-lamp.png',
    images: [
      '/assets/products/uvb-terrarium-lamp.png',
      '/assets/products/gallery-nutrition-detail.jpg',
      '/assets/products/gallery-package-box.jpg',
    ],
    badges: ['out_of_stock'],
    stock: 0,
    rating: 4.6,
    reviewCount: 11,
    createdAtOrder: 1,
    recommendedAges: ['baby', 'adult', 'senior'],
    description:
      'Mô phỏng phổ ánh sáng mặt trời tự nhiên với tia UVA kích thích tiêu hóa và tia UVB 5.0 giúp rùa cạn, rùa nước, rồng Úc (Bearded Dragon) và tắc kè tổng hợp Vitamin D3 chuyển hóa canxi chống mềm mai.',
    descriptionEn:
      'Simulates natural sunlight with UVA for appetite and UVB 5.0 rays to synthesize Vitamin D3 and prevent metabolic bone disease in turtles and reptiles.',
    ingredientsVi:
      'Chao đèn hợp kim nhôm phản xạ nhiệt phủ gốm chịu nhiệt, đui sứ E27 an toàn, chân kẹp xoay 360 độ kèm công tắc điều chỉnh.',
    ingredientsEn:
      'Heat-resistant ceramic E27 socket, reflective aluminum dome hood, 360° swivel clamp bracket with inline dimmer switch.',
    usageVi:
      'Kẹp cách điểm phơi nắng của bò sát 25–30cm, bật 4–6 giờ mỗi ngày vào ban ngày. Không chạm tay trực tiếp vào bóng khi đèn đang nóng.',
    usageEn:
      'Mount 25–30cm above the basking spot and run 4–6 hours daily. Allow bulb to cool completely before handling.',
  },
];

export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'Nguyễn Thảo Nhi',
    petInfoVi: 'Bé Mây Mây • Mèo Scottish Fold 2 tuổi',
    petInfoEn: 'May May • 2yo Scottish Fold',
    stars: 5,
    textVi:
      'Hạt thơm mùi cá hồi tự nhiên chứ không bị nồng mùi hương liệu. Bé Mây Mây nhà mình vốn kén ăn mà trộn hạt này vào là ăn sạch bát, đi vệ sinh khuôn rất đẹp.',
    textEn:
      'Smells naturally like salmon without artificial fragrance. My picky Scottish Fold finishes her bowl every meal and her digestion has been great.',
    date: '18/10/2026',
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    author: 'Trần Minh Quân',
    petInfoVi: 'Bé Bơ • Golden Retriever 1.5 tuổi',
    petInfoEn: 'Bo • 1.5yo Golden Retriever',
    stars: 5,
    textVi:
      'Được bác sĩ tại Animora tư vấn đổi sang dòng hữu cơ này. Sau hơn 1 tháng lông bé Bơ bóng mượt hẳn, đỡ rụng lông khi giao mùa.',
    textEn:
      'Recommended by our Animora vet. After a month, our Golden Retriever’s coat is noticeably shinier with much less seasonal shedding.',
    date: '09/10/2026',
  },
  {
    id: 'rev-3',
    productId: 'prod-1',
    author: 'Lê Hoài Anh',
    petInfoVi: 'Bé Mochi • Toy Poodle 10 tháng',
    petInfoEn: 'Mochi • 10mo Toy Poodle',
    stars: 4,
    textVi:
      'Kích thước viên hạt vừa miệng các bé Poodle nhỏ, túi có khóa zip rất kín. Giao hàng trong ngày siêu nhanh!',
    textEn:
      'Kibble size is ideal for small Toy Poodles and the zip lock keeps it fresh. Same-day delivery was super fast!',
    date: '28/09/2026',
  },
  {
    id: 'rev-4',
    productId: 'prod-2',
    author: 'Phạm Thanh Hằng',
    petInfoVi: 'Bé Bông • Mèo Anh lông ngắn',
    petInfoEn: 'Bong • British Shorthair',
    stars: 5,
    textVi:
      'Dòng Animora Royal hạn chế búi lông cực tốt, bé nhà mình không còn bị khạc lông mỗi tuần nữa.',
    textEn:
      'Animora Royal works wonders for hairball control. My British Shorthair stopped coughing up hairballs every week.',
    date: '15/10/2026',
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    author: 'Lê Minh Châu',
    petInfoVi: 'Bé Bông Gòn • Thỏ Holland Lop 9 tháng',
    petInfoEn: 'Bong Gon • 9mo Holland Lop Rabbit',
    stars: 5,
    textVi:
      'Cỏ Timothy rất xanh, cọng dài giòn và hầu như không có vụn bụi ở đáy túi. Bé Bông Gòn nghe tiếng mở túi là chạy ra đứng đợi liền.',
    textEn:
      'Very green, crisp long stems with almost zero dust at the bottom of the bag. My bunny hops right over as soon as I open it.',
    date: '21/10/2026',
  },
  {
    id: 'rev-6',
    productId: 'prod-6',
    author: 'Hoàng Gia Bảo',
    petInfoVi: 'Bé Cốm • Corgi 1 tuổi',
    petInfoEn: 'Com • 1yo Corgi',
    stars: 5,
    textVi:
      'Mùi oải hương rất thư giãn như vừa đi spa về, tắm xong da bé không hề bị khô hay ngứa.',
    textEn:
      'Relaxing lavender scent just like a professional spa visit, and leaves skin moisturized without any itching.',
    date: '12/10/2026',
  },
];

export const SHOP_BRANDS = [
  'NutriPet Organic',
  'Animora Royal',
  'Meadow Pure',
  'Avian Gold',
  'Botanica Spa',
  'Norse Vital',
  'VetBio Care',
  'PawPlay Studio',
  'Animora Home',
  'TerraSun',
];

export function normalizeViText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function mapSpeciesToShopPetGroup(species: PetSpecies): ShopPetGroup {
  switch (species) {
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

export function parsePetAgeStage(ageText: string): 'baby' | 'adult' | 'senior' {
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

export function formatVndPrice(price: number): string {
  return `${price.toLocaleString('vi-VN')}đ`;
}
