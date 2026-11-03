import React, { useState } from 'react';

export const OrderLookup: React.FC<{ onSearch: (code: string) => void }> = ({ onSearch }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) onSearch(code.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Nhập mã đơn hàng..."
        className="form-input flex-1"
      />
      <button type="submit" className="btn-primary py-2 px-4 text-sm">Tra cứu</button>
    </form>
  );
};
