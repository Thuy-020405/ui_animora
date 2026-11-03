import React from 'react';

export const TimeSlotPicker: React.FC<{
  slots: string[];
  selectedSlot?: string;
  onSelect: (slot: string) => void;
}> = ({ slots, selectedSlot, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onSelect(slot)}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-colors ${
            selectedSlot === slot
              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]'
              : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--coral)]'
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};
