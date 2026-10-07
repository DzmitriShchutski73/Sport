import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <span className="eyebrow">{product.brand || product.category_name}</span>
        <h3>{product.name}</h3>
        <p>{product.short_description}</p>
        <strong>{formatPrice(product)}</strong>
      </div>
    </Link>
  );
}
