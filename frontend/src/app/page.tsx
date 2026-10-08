import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { ProductCard } from "@/components/ProductCard";
import { getHome } from "@/lib/api";

export default async function HomePage() {
  let data;
  try {
    data = await getHome();
  } catch {
    return (
      <div className="container section">
        <div className="api-error">
          Не удалось загрузить данные API. Запустите Django на{" "}
          <code>http://127.0.0.1:8000</code>.
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80"
            alt="Тренажёрный зал"
          />
        </div>
        {/* <div className="container hero-content">
          <p className="eyebrow">GoldGym · Минск</p>
          <h1>Профессиональное фитнес-оборудование</h1>
          <p>
            Комплектация залов «под ключ»: подбор тренажёров, дизайн-проект,
            поставка и сервис для клубов, отелей и частных пространств Беларуси.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="btn">
              Смотреть каталог
            </Link>
            <Link href="/contacts#lead" className="btn btn-ghost">
              Получить КП
            </Link>
          </div>
        </div> */}
        <div className="container hero-content flex flex-col items-center text-center justify-center">
          <p className="eyebrow">GoldGym • Минск</p>
          <h1 className="text-center">Профессиональное фитнес-оборудование</h1>
          <p className="text-center max-w-2xl mx-auto">
            Комплектация залов под ключ: подбор тренажеров, дизайн-проект,
            доставка и сервис для клубов, отелей и частных пространств Беларуси.
          </p>
          <div className="hero-actions flex justify-center gap-4">
            <Link href="/catalog" className="btn">
              Смотреть каталог
            </Link>
            <Link href="/contacts#lead" className="btn btn-ghost">
              Получить КП
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Каталог</p>
              <h2>Оборудование по категориям</h2>
            </div>
            <Link href="/catalog" className="btn btn-ghost btn-sm">
              Весь каталог
            </Link>
          </div>
          <div className="grid-cats">
            {data.categories.map((cat) => (
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
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-elevated)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Подборка</p>
              <h2>Популярное оборудование</h2>
            </div>
          </div>
          <div className="grid-products">
            {data.featured_products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Реализовано</p>
              <h2>Проекты в Минске</h2>
            </div>
            <Link href="/projects" className="btn btn-ghost btn-sm">
              Все проекты
            </Link>
          </div>
          <div className="grid-projects">
            {data.projects.map((project) => (
              <article key={project.id} className="project-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image_url} alt={project.title} />
                <div className="project-body">
                  <span className="eyebrow">{project.location}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-elevated)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Визуализация</p>
              <h2>3D-проекты залов</h2>
            </div>
            <Link href="/design" className="btn btn-ghost btn-sm">
              Дизайн-студия
            </Link>
          </div>
          <div className="grid-projects">
            {data.projects_3d.map((project) => (
              <article key={project.id} className="project-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image_url} alt={project.title} />
                <div className="project-body">
                  <span className="eyebrow">3D</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Качество</p>
              <h2>Сертификаты на оборудование</h2>
            </div>
          </div>
          <div className="certs">
            {data.certificates.map((c) => (
              <div key={c.id} className="cert">
                {c.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="prose">
            <p className="eyebrow">B2B</p>
            <h2 className="font-display" style={{ fontSize: "2.4rem", margin: "0 0 1rem" }}>
              Оборудование спортивных залов и фитнес-клубов
            </h2>
            <p>
              Проектируем и комплектуем тренажёрные залы: частные студии, отели,
              SPA и клубы. Собственный бренд и партнёрские линейки — под ваш
              бюджет и площадь.
            </p>
            <ul className="feature-list">
              <li>Коммерческое предложение и документы за 3 рабочих дня</li>
              <li>Дизайн-проект и оптимальное зонирование помещения</li>
              <li>Поставка, монтаж и сервисное сопровождение в Беларуси</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
