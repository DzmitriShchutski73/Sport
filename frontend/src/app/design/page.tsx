import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Дизайн-проект",
};

export default async function DesignPage() {
  const projects = await getProjects({ is_3d: true }).catch(() => []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Визуализация</p>
          <h1>Дизайн-проект зала</h1>
          <p className="muted prose">
            Подберём оборудование, предложим размещение и подготовим
            3D-визуализацию интерьера.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-projects" style={{ marginBottom: "3rem" }}>
            {projects.map((project) => (
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
          <div className="split">
            <div className="prose">
              <h2 className="font-display" style={{ fontSize: "2rem" }}>
                Команда поможет
              </h2>
              <ul>
                <li>Подобрать оборудование ведущих производителей</li>
                <li>Оптимально разместить его под задачи помещения</li>
                <li>Подготовить проект и 3D-визуализацию</li>
              </ul>
            </div>
            <LeadForm
              leadType="catalog"
              title="Заказать визуализацию"
              subtitle="Пришлите план помещения — предложим концепцию."
            />
          </div>
        </div>
      </section>
    </>
  );
}
