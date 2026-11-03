import type { Metadata } from 'next';
import { AppProviders } from '@/providers';
import { ColorBleedBackground } from '@/components/ColorBleedBackground';
import { PawBubbleLayer } from '@/components/PawBubbleLayer';
import '@/styles/index.css';

export const metadata: Metadata = {
  title: 'Animora - Hệ Sinh Thái Chăm Sóc Thú Cưng Tận Tâm',
  description: 'Dịch vụ spa, khách sạn, khám sức khỏe, nhận nuôi và cửa hàng vật phẩm cao cấp dành cho chó mèo.',
  openGraph: {
    title: 'Animora - Hệ Sinh Thái Chăm Sóc Thú Cưng Tận Tâm',
    description: 'Dịch vụ spa, khách sạn, khám sức khỏe, nhận nuôi và cửa hàng vật phẩm cao cấp dành cho chó mèo.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased font-sans relative selection:bg-[var(--coral)] selection:text-white">
        <AppProviders>
          <div className="min-h-screen flex flex-col relative overflow-x-hidden">
            <ColorBleedBackground darkMode={false} lang="vi" />
            <PawBubbleLayer darkMode={false} />
            <main className="flex-1 relative z-10">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
