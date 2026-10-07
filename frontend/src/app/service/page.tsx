import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Сервис и гарантия",
};

export default function ServicePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Поддержка</p>
          <h1>Сервис и гарантия</h1>
          <p className="muted prose">
            Гарантия производителя, расширенное обслуживание и сервисная служба в
            Минске.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div className="prose">
            <h2 className="font-display" style={{ fontSize: "2rem" }}>
              Условия
            </h2>
            <ul className="feature-list">
              <li>
                Возврат товара надлежащего качества — в течение 7 дней без следов
                использования
              </li>
              <li>
                Гарантийный ремонт — в течение гарантийного срока по дефектам
              </li>
              <li>
                При доставке проверяйте упаковку и документы: накладная, талон,
                инструкция
              </li>
              <li>
                Расширенная гарантия увеличивает срок бесплатного сервиса в 1,5 раза
              </li>
              <li>
                Профилактика: проверка безопасности, чистка и смазка узлов
              </li>
            </ul>
            <p>
              Сервисная служба:{" "}
              <a href="tel:+375291234567">+375 (29) 123-45-67</a>,{" "}
              <a href="mailto:service@goldgym.by">service@goldgym.by</a>
            </p>
          </div>
          <LeadForm
            leadType="service"
            title="Сервисная заявка"
            subtitle="Опишите проблему — инженер свяжется в рабочие часы."
          />
        </div>
      </section>
    </>
  );
}
