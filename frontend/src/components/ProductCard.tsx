import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-media">
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: "100%", height: "auto" }}
        />
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
