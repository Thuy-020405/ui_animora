const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type') && init?.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData.message === 'string') {
        errorMessage = errorData.message;
      }
    } catch {
      // JSON parse error fallback
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
