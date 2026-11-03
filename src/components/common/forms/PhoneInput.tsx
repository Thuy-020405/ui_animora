import React, { useState, useId } from 'react';
import { cleanPhone, formatPhone, validatePhone } from '@/utils/phone';

export interface PhoneInputProps {
  value: string;
  onChange: (rawDigits: string) => void;
  onBlur?: () => void;
  label?: string;
  error?: string | null;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isEn?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  label = 'Số điện thoại',
  error: customError,
  required = false,
  placeholder = '0912 345 678',
  disabled = false,
  className = '',
  isEn = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const id = useId();
  const errorId = `${id}-error`;

  const rawDigits = cleanPhone(value);
  const displayValue = isFocused ? rawDigits : formatPhone(rawDigits);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanPhone(e.target.value);
    onChange(cleaned);
    if (internalError) setInternalError(null);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleaned = cleanPhone(pastedText);
    onChange(cleaned);
    if (internalError) setInternalError(null);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const err = validatePhone(rawDigits, isEn);
    setInternalError(err);
    if (onBlur) onBlur();
  };

  const activeError = customError !== undefined ? customError : internalError;
  const isValid = !activeError && rawDigits.length === 10;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-[var(--text)]">
          {label} {required && <span className="text-[var(--coral)]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={displayValue}
          onChange={handleInputChange}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={Boolean(activeError)}
          aria-describedby={activeError ? errorId : undefined}
          className={`w-full h-[52px] px-4 rounded-xl border text-base transition-colors ${
            activeError
              ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:outline-none focus:ring-2 focus:ring-red-500'
              : 'border-[var(--border)] bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {isValid && !isFocused && (
          <span
            className="absolute right-3 text-emerald-600 dark:text-emerald-400 font-bold"
            aria-label={isEn ? 'Valid phone number' : 'Số hợp lệ'}
          >
            ✓
          </span>
        )}
      </div>
      {activeError && (
        <span id={errorId} className="text-xs font-semibold text-red-500 mt-0.5">
          {activeError}
        </span>
      )}
    </div>
  );
};
