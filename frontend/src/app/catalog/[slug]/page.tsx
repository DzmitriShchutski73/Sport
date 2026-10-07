import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getCategory, getProducts } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const cat = await getCategory(slug);
    return { title: cat.name };
  } catch {
    return { title: "Категория" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  let category;
  try {
    category = await getCategory(slug);
  } catch {
    notFound();
  }
  const products = await getProducts({ category: slug }).catch(() => []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href="/catalog">Каталог</Link> / {category.name}
          </p>
          <h1>{category.name}</h1>
          <p className="muted prose">{category.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid-products">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {products.length === 0 && (
            <p className="muted">В этой категории пока нет товаров.</p>
          )}
        </div>
      </section>
    </>
  );
}
