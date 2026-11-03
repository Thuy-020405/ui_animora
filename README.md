<<<<<<< HEAD
# Animora Pet Care - Front-End App

Ứng dụng Front-End cho hệ sinh thái chăm sóc thú cưng Animora, được xây dựng bằng React 19, Vite 8, TypeScript và Tailwind CSS v4.

---

## Cấu trúc & quy ước

### 1. Quy ước đặt tên file & thư mục
- **Components**: PascalCase, ví dụ: `Button.tsx`, `Navbar.tsx`, `PhoneInput.tsx`.
- **Hooks**: `useXxx.ts`, ví dụ: `useTheme.ts`, `useAuth.ts`, `useCart.ts`, `useDraft.ts`.
- **Utils**: camelCase, ví dụ: `formatPrice.ts`, `formatDate.ts`, `phone.ts`.
- **Folders**: kebab-case, ví dụ: `pet-profiles`, `common`, `forms`, `ui`.

### 2. Nguyên tắc gọi API & Quản lý dữ liệu
- Các Component **không bao giờ** gọi `fetch` trực tiếp. Mọi tương tác mạng phải đi qua lớp `src/services/*` (ví dụ: `apiClient.ts`, `bookingApi.ts`, `productApi.ts`) hoặc thông qua custom hooks `@tanstack/react-query`.
- Kiểu dữ liệu trong `src/types` phản ánh đúng hợp đồng API (API contract) đã thống nhất với đội ngũ back-end.
- Các lược đồ kiểm tra dữ liệu trong `src/schemas` (sử dụng Zod) chịu trách nhiệm validate biểu mẫu phía client.

### 3. Nguồn sự thật đơn nhất (Single Source of Truth)
- **Hằng số**: Mọi giá trị hằng số dùng lại nhiều lần (số điện thoại liên hệ, ngưỡng freeship, thời gian hủy hẹn) đều được định nghĩa trong `src/constants/`.
- **Đa ngôn ngữ (i18n)**: Tất cả văn bản hiển thị trên giao diện được lưu trữ trong `src/i18n/vi.json` và `src/i18n/en.json`. Không hardcode văn bản trực tiếp trong Component.

### 4. Quy ước Git
- **Tên nhánh**: `feature/<tên-tính-năng>`, `fix/<tên-lỗi>`.
- **Tiền tố commit**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`.

---

## Lệnh thực thi dự án

- **Chạy môi trường phát triển (Dev Server)**:
  ```bash
  npm run dev
  ```
- **Kiểm tra kiểu dữ liệu (TypeScript Linting)**:
  ```bash
  npm run lint
  ```
- **Chạy bộ kiểm thử (Unit Tests)**:
  ```bash
  npm run test
  ```
- **Đóng gói sản phẩm (Production Build)**:
  ```bash
  npm run build
  ```
=======
<div align="center">

<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  <h1>Built with AI Studio</h2>

  <p>The fastest path from prompt to production with Gemini.</p>

  <a href="https://aistudio.google.com/apps">Start building</a>

</div>
>>>>>>> origin/main
