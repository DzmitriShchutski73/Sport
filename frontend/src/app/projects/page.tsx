import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Реализованные проекты",
};

export default async function ProjectsPage() {
  const projects = await getProjects({ is_3d: false }).catch(() => []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Кейсы</p>
          <h1>Реализованные проекты</h1>
          <p className="muted prose">
            Примеры комплектации залов и студий в Минске и области.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid-projects">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <Image
                src={project.image_url}
                alt={project.title}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
                quality={75}
              />
              <div className="project-body">
                <span className="eyebrow">
                  {project.location}
                  {project.completed_year ? ` · ${project.completed_year}` : ""}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
