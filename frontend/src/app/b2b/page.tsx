import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Для фитнес-клубов",
};

export default function B2BPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">B2B</p>
          <h1>Для фитнес-клубов и студий</h1>
          <p className="muted prose">
            Комплексный подход: от проекта зала до установки тренажёров в рамках
            вашего бюджета.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div className="prose">
            <h2 className="font-display" style={{ fontSize: "2rem" }}>
              Что входит в работу
            </h2>
            <ul className="feature-list">
              <li>Подбор оборудования под площадь, потолки и зонирование</li>
              <li>Дизайн-студия: планировка и 3D-визуализация</li>
              <li>Кастомизация комплектации для студий средней и малой наполняемости</li>
              <li>Логистика, монтаж и обучение персонала в Минске</li>
              <li>Сервисное сопровождение и расширенная гарантия</li>
            </ul>
            <p>
              Единство функциональности и стиля: каждый аксессуар на своём месте,
              удобный доступ к инвентарю, материалы покрытий согласованы с
              интерьером.
            </p>
          </div>
          <LeadForm
            leadType="b2b"
            title="Заявка для клуба"
            subtitle="Опишите площадь и формат — подготовим КП."
          />
        </div>
      </section>
    </>
  );
}
