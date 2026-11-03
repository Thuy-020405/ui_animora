import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="shared-container py-16 text-center">
      <h1 className="section-title text-4xl mb-4">404 - Không tìm thấy trang</h1>
      <p className="text-[var(--text-muted)]">Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
    </div>
  );
};

export default NotFoundPage;
