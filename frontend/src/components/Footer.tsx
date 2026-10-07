import Link from "next/link";
import type { Contacts } from "@/lib/api";
import { FALLBACK_CONTACTS } from "@/lib/api";

export function Footer({ contacts = FALLBACK_CONTACTS }: { contacts?: Contacts }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo footer-logo">
            <span className="logo-mark">GG</span>
            <span className="logo-text">
              Gold<span>Gym</span>
            </span>
          </div>
          <p className="muted">
            Профессиональное фитнес-оборудование для клубов, отелей и частных
            залов. {contacts.city}.
          </p>
        </div>
        <div>
          <h4>Разделы</h4>
          <ul className="footer-links">
            <li>
              <Link href="/catalog">Каталог</Link>
            </li>
            <li>
              <Link href="/b2b">Для клубов</Link>
            </li>
            <li>
              <Link href="/projects">Проекты</Link>
            </li>
            <li>
              <Link href="/service">Сервис и гарантия</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <ul className="footer-links">
            <li>
              <a href={`tel:${contacts.phone.replace(/\s/g, "")}`}>{contacts.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </li>
            <li>{contacts.address}</li>
            <li>{contacts.hours}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GoldGym Минск</span>
        <span>Аналог концепта goldgym.ru</span>
      </div>
    </footer>
  );
}
