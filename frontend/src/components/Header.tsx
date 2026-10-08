"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/b2b", label: "Для клубов" },
  { href: "/projects", label: "Проекты" },
  { href: "/design", label: "Дизайн" },
  { href: "/service", label: "Сервис" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">GG</span>
          <span className="logo-text">
            Gold<span>Gym</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? "is-open" : ""}`}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!loading && user ? (
            <Link
              href="/account"
              className={pathname.startsWith("/account") ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              Кабинет
            </Link>
          ) : (
            <Link
              href="/login"
              className={pathname.startsWith("/login") || pathname.startsWith("/register") ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              Войти
            </Link>
          )}
          <Link href="/contacts#lead" className="btn btn-sm" onClick={() => setOpen(false)}>
            Заявка
          </Link>
        </nav>
      </div>
    </header>
  );
}
