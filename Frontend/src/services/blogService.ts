import type { BlogPost, BlogPostPayload } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000/api';

export const BLOG_ADMIN_TOKEN_KEY = 'aura-blog-admin-token';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export class BlogApiError extends Error {
  fieldErrors: Record<string, string[]>;
  status: number;

  constructor(message: string, status: number, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.name = 'BlogApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers({
    Accept: 'application/json',
  });

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new BlogApiError(
        'No se pudo conectar con el servidor del blog. Inténtalo de nuevo más tarde.',
        0,
      );
    }

    throw error;
  }

  const payload: unknown = await response.json();

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse;
    const firstFieldError = Object.values(errorPayload.errors ?? {})[0]?.[0];
    throw new BlogApiError(
      firstFieldError ?? errorPayload.message ?? `Error del servidor (${response.status}).`,
      response.status,
      errorPayload.errors,
    );
  }

  return payload as T;
}

export interface BlogAdminUser {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: BlogAdminUser;
}

export const blogService = {
  getPublishedPosts: () => request<BlogPost[]>('/blog'),

  getPublishedPost: (slug: string) =>
    request<BlogPost>(`/blog/${encodeURIComponent(slug)}`),

  login: (password: string) =>
    request<LoginResponse>('/admin/login', {
      method: 'POST',
      body: { password },
    }),

  getAdminUser: (token: string) =>
    request<BlogAdminUser>('/admin/me', { token }),

  getAdminPosts: (token: string) =>
    request<BlogPost[]>('/admin/blog/posts', { token }),

  createPost: (token: string, post: BlogPostPayload) =>
    request<BlogPost>('/admin/blog/posts', {
      method: 'POST',
      body: post,
      token,
    }),

  updatePost: (token: string, id: number, post: BlogPostPayload) =>
    request<BlogPost>(`/admin/blog/posts/${id}`, {
      method: 'PUT',
      body: post,
      token,
    }),

  deletePost: (token: string, id: number) =>
    request<{ message: string }>(`/admin/blog/posts/${id}`, {
      method: 'DELETE',
      token,
    }),

  logout: (token: string) =>
    request<{ message: string }>('/admin/logout', {
      method: 'POST',
      token,
    }),
};
