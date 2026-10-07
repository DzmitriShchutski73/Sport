import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { formatPrice, getProduct } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return { title: product.name };
  } catch {
    return { title: "Товар" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href="/catalog">Каталог</Link> /{" "}
            <Link href={`/catalog/${product.category_slug}`}>
              {product.category_name}
            </Link>
          </p>
          <h1>{product.name}</h1>
        </div>
      </section>
      <div className="container product-detail">
        <div className="product-detail-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image_url} alt={product.name} />
        </div>
        <div>
          <p className="eyebrow">{product.brand}</p>
          <p className="muted">{product.short_description}</p>
          <div className="price-lg">{formatPrice(product)}</div>
          <p>{product.description}</p>
          <p className="muted">
            {product.in_stock ? "В наличии · поставка в Минск" : "Под заказ"}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <LeadForm
              leadType="callback"
              title="Запросить предложение"
              subtitle="Уточним цену, сроки и комплектацию под ваш объект."
            />
          </div>
        </div>
      </div>
    </>
  );
}
