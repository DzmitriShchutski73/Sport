const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000/api";

export type Contacts = {
  phone: string;
  phone_alt: string;
  email: string;
  address: string;
  hours: string;
  city: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  products_count: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description?: string;
  price: string | null;
  price_on_request: boolean;
  image_url: string;
  brand: string;
  is_featured: boolean;
  in_stock: boolean;
  category_slug: string;
  category_name: string;
  created_at?: string;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  image_url: string;
  is_3d: boolean;
  completed_year: number | null;
};

export type Certificate = {
  id: number;
  title: string;
  image_url: string;
  sort_order: number;
};

export type HomePayload = {
  categories: Category[];
  featured_products: Product[];
  projects: Project[];
  projects_3d: Project[];
  certificates: Certificate[];
  contacts: Contacts;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`API ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getHome() {
  return apiFetch<HomePayload>("/home/");
}

export function getCategories() {
  return apiFetch<Paginated<Category> | Category[]>("/categories/").then(
    normalizeList
  );
}

export function getCategory(slug: string) {
  return apiFetch<Category>(`/categories/${slug}/`);
}

export function getProducts(params?: { category?: string; featured?: boolean }) {
  const q = new URLSearchParams();
  if (params?.category) q.set("category", params.category);
  if (params?.featured) q.set("featured", "1");
  const qs = q.toString();
  return apiFetch<Paginated<Product> | Product[]>(
    `/products/${qs ? `?${qs}` : ""}`
  ).then(normalizeList);
}

export function getProduct(slug: string) {
  return apiFetch<Product>(`/products/${slug}/`);
}

export function getProjects(params?: { is_3d?: boolean }) {
  const q = new URLSearchParams();
  if (params?.is_3d === true) q.set("is_3d", "1");
  if (params?.is_3d === false) q.set("is_3d", "0");
  const qs = q.toString();
  return apiFetch<Paginated<Project> | Project[]>(
    `/projects/${qs ? `?${qs}` : ""}`
  ).then(normalizeList);
}

export async function createLead(
  data: {
    lead_type: string;
    name: string;
    phone: string;
    email?: string;
    company?: string;
    message?: string;
  },
  token?: string | null
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Token ${token}`;

  const res = await fetch(`${API_BASE}/leads/`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.detail || "Не удалось отправить заявку");
  }
  return json as { ok: boolean; message: string };
}

function normalizeList<T>(data: Paginated<T> | T[]): T[] {
  return Array.isArray(data) ? data : data.results;
}

export function formatPrice(product: Product): string {
  if (product.price_on_request || product.price == null) {
    return "Цена по запросу";
  }
  const n = Number(product.price);
  return `${n.toLocaleString("ru-BY")} BYN`;
}

export const FALLBACK_CONTACTS: Contacts = {
  phone: "+375 (29) 123-45-67",
  phone_alt: "+375 (17) 200-00-00",
  email: "sales@goldgym.by",
  address: "г. Минск, ул. Независимости, 58",
  hours: "Пн–Пт 9:00–18:00",
  city: "Минск, Беларусь",
};
