"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (!loading && user) {
    router.replace("/account");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPending(true);
    setError("");
    try {
      await login(String(form.get("email") || ""), String(form.get("password") || ""));
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Клиентский кабинет</p>
          <h1>Вход</h1>
          <p className="muted prose">Войдите, чтобы посмотреть свои заявки.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="lead-form">
            <form onSubmit={onSubmit}>
              <label>
                Email *
                <input name="email" type="email" required placeholder="you@mail.by" />
              </label>
              <label>
                Пароль *
                <input name="password" type="password" required />
              </label>
              <button className="btn" type="submit" disabled={pending}>
                {pending ? "Вход..." : "Войти"}
              </button>
              {error && <p className="form-error">{error}</p>}
            </form>
            <p className="muted" style={{ marginTop: "1rem" }}>
              Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
