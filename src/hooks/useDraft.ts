import { useState, useEffect } from 'react';

export function useDraft<T>(key: string, initialValue: T) {
  const [draft, setDraft] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [key, draft]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setDraft(initialValue);
  };

  return [draft, setDraft, clearDraft] as const;
}
