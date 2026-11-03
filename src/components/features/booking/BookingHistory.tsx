import React from 'react';
import { Booking } from '@/types';
import { StatusPill } from '@/components/common/ui';

export const BookingHistory: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  if (bookings.length === 0) {
    return <p className="text-sm text-[var(--text-muted)]">Chưa có lịch hẹn nào.</p>;
  }

  const mapStatusToPill = (status?: string): 'pending' | 'confirmed' | 'completed' | 'cancelled' => {
    if (status === 'Đã xác nhận') return 'confirmed';
    if (status === 'Hoàn thành') return 'completed';
    if (status === 'Đã hủy') return 'cancelled';
    return 'pending';
  };

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex justify-between items-center">
          <div>
            <h4 className="font-bold text-[var(--primary)]">{b.service}</h4>
            <p className="text-xs text-[var(--text-muted)]">{b.date} • {b.timeSlot || 'Chưa chọn giờ'} • Bé: {b.petName || 'Thú cưng'}</p>
          </div>
          <StatusPill status={mapStatusToPill(b.status)} label={b.status} />
        </div>
      ))}
    </div>
  );
};
