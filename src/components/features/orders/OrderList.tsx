import React from 'react';

export const OrderList: React.FC<{ orders?: Array<{ code: string; status: string; total: number }> }> = ({ orders = [] }) => {
  if (orders.length === 0) {
    return <p className="text-sm text-[var(--text-muted)]">Chưa có đơn hàng nào.</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.code} className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex justify-between items-center">
          <div>
            <h4 className="font-bold text-[var(--primary)]">{o.code}</h4>
            <p className="text-xs text-[var(--text-muted)]">Tổng: {o.total.toLocaleString('vi-VN')} đ</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">{o.status}</span>
        </div>
      ))}
    </div>
  );
};
