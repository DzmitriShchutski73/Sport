"use client";

import { FormEvent, useState } from "react";
import { createLead } from "@/lib/api";

type Props = {
  leadType?: string;
  title?: string;
  subtitle?: string;
};

export function LeadForm({
  leadType = "catalog",
  title = "Оставьте заявку",
  subtitle = "Пришлём каталог и коммерческое предложение.",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await createLead({
        lead_type: leadType,
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || ""),
        message: String(data.get("message") || ""),
      });
      setMessage(res.message);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка отправки");
      setStatus("error");
    }
  }

  return (
    <div className="lead-form" id="lead">
      <h3 className="font-display">{title}</h3>
      <p className="muted">{subtitle}</p>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label>
            Имя *
            <input name="name" required placeholder="Как к вам обращаться" />
          </label>
          <label>
            Телефон *
            <input name="phone" required placeholder="+375 (29) ..." />
          </label>
        </div>
        <div className="form-row">
          <label>
            Email
            <input name="email" type="email" placeholder="you@company.by" />
          </label>
          <label>
            Компания
            <input name="company" placeholder="Название клуба / объекта" />
          </label>
        </div>
        <label>
          Комментарий
          <textarea name="message" rows={3} placeholder="Площадь зала, задачи..." />
        </label>
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Отправка..." : "Отправить"}
        </button>
        {status === "ok" && <p className="form-ok">{message}</p>}
        {status === "error" && <p className="form-error">{message}</p>}
      </form>
    </div>
  );
}
