import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Каталог",
};

export default async function CatalogPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Ассортимент</p>
          <h1>Каталог оборудования</h1>
          <p className="muted prose">
            Силовые и кардиотренажёры, свободные веса, покрытия и инвентарь для
            коммерческих и частных залов.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid-cats">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/catalog/${cat.slug}`} className="cat-card">
              <Image
                src={cat.image_url}
                alt={cat.name}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="overlay">
                <h3>{cat.name}</h3>
                <span className="muted">{cat.products_count} позиций</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
