import type { Metadata } from "next";
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.image_url} alt={cat.name} />
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
