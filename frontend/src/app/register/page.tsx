"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function RegisterPage() {
  const { register, user, loading } = useAuth();
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
      await register({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        password: String(form.get("password") || ""),
      });
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Клиентский кабинет</p>
          <h1>Регистрация</h1>
          <p className="muted prose">
            Создайте аккаунт, чтобы отслеживать свои заявки.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="lead-form">
            <form onSubmit={onSubmit}>
              <label>
                Имя *
                <input name="name" required placeholder="Иван Иванов" />
              </label>
              <label>
                Email *
                <input name="email" type="email" required placeholder="you@mail.by" />
              </label>
              <label>
                Телефон
                <input name="phone" placeholder="+375 (29) ..." />
              </label>
              <label>
                Пароль * (мин. 8 символов)
                <input name="password" type="password" required minLength={8} />
              </label>
              <button className="btn" type="submit" disabled={pending}>
                {pending ? "Создание..." : "Зарегистрироваться"}
              </button>
              {error && <p className="form-error">{error}</p>}
            </form>
            <p className="muted" style={{ marginTop: "1rem" }}>
              Уже есть аккаунт? <Link href="/login">Войти</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
