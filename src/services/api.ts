const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

interface RequestOptions extends RequestInit {
  data?: any;
}

export async function apiRequest<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers, ...customConfig } = options;
  const token = localStorage.getItem('@proveup:token');

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = responseData?.error || responseData?.message || 'Erro inesperado na requisição.';
    throw new Error(errorMessage);
  }

  return responseData as T;
}
