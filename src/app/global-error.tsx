'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)] p-4">
          <div className="text-center max-w-md bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)]">
            <h2 className="text-xl font-bold mb-2">Đã xảy ra lỗi</h2>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Vui lòng thử lại hoặc tải lại trang.
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl text-sm font-semibold"
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
