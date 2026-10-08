"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { LeadForm } from "@/components/LeadForm";
import { fetchMyLeads, type Lead } from "@/lib/auth";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ru-BY", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsError, setLeadsError] = useState("");
  const [leadsLoading, setLeadsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  async function loadLeads() {
    setLeadsLoading(true);
    setLeadsError("");
    try {
      const data = await fetchMyLeads();
      setLeads(data);
    } catch (err) {
      setLeadsError(err instanceof Error ? err.message : "Не удалось загрузить заявки");
    } finally {
      setLeadsLoading(false);
    }
  }

  useEffect(() => {
    if (user) loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading || !user) {
    return (
      <div className="container section">
        <p className="muted">Загрузка...</p>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Личный кабинет</p>
          <h1>{user.name}</h1>
          <p className="muted">
            {user.email}
            {user.phone ? ` · ${user.phone}` : ""}
          </p>
          <div className="hero-actions" style={{ marginTop: "1rem" }}>
            <Link href="/contacts#lead" className="btn btn-sm">
              Новая заявка
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <div className="section-head">
              <div>
                <p className="eyebrow">История</p>
                <h2>Мои заявки</h2>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={loadLeads}>
                Обновить
              </button>
            </div>

            {leadsLoading && <p className="muted">Загрузка заявок...</p>}
            {leadsError && <p className="form-error">{leadsError}</p>}
            {!leadsLoading && !leadsError && leads.length === 0 && (
              <p className="muted">
                Заявок пока нет. Отправьте первую — она появится здесь.
              </p>
            )}

            <div className="leads-list">
              {leads.map((lead) => (
                <article key={lead.id} className="lead-card">
                  <div className="lead-card-top">
                    <span className="eyebrow">{lead.lead_type_display}</span>
                    <span className={lead.is_processed ? "badge ok" : "badge"}>
                      {lead.is_processed ? "Обработана" : "В работе"}
                    </span>
                  </div>
                  <p className="muted">{formatDate(lead.created_at)}</p>
                  <p>
                    <strong>{lead.name}</strong>
                    {lead.phone ? ` · ${lead.phone}` : ""}
                  </p>
                  {lead.company && <p className="muted">{lead.company}</p>}
                  {lead.message && <p>{lead.message}</p>}
                </article>
              ))}
            </div>
          </div>

          <LeadForm
            leadType="callback"
            title="Быстрая заявка"
            subtitle="Будет привязана к вашему аккаунту."
            onSuccess={loadLeads}
          />
        </div>
      </section>
    </>
  );
}
