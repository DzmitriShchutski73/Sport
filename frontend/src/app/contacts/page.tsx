import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { FALLBACK_CONTACTS, getHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Контакты",
};

export default async function ContactsPage() {
  const home = await getHome().catch(() => null);
  const c = home?.contacts || FALLBACK_CONTACTS;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Связь</p>
          <h1>Контакты</h1>
          <p className="muted prose">Офис и шоурум в Минске. Ответим в рабочие часы.</p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div className="prose">
            <ul className="feature-list">
              <li>
                Телефон:{" "}
                <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
                <br />
                <a href={`tel:${c.phone_alt.replace(/\s/g, "")}`}>{c.phone_alt}</a>
              </li>
              <li>
                Email: <a href={`mailto:${c.email}`}>{c.email}</a>
              </li>
              <li>Адрес: {c.address}</li>
              <li>Часы работы: {c.hours}</li>
            </ul>
          </div>
          <LeadForm
            leadType="catalog"
            title="Написать нам"
            subtitle="Каталог, КП или консультация по комплектации."
          />
        </div>
      </section>
    </>
  );
}
