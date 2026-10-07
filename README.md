# GoldGym Минск

Сайт-аналог [goldgym.ru](https://goldgym.ru/): поставка и комплектация профессионального фитнес-оборудования. Локация — Минск, Беларусь.

## Стек

- **Backend:** Django + Django REST Framework, SQLite
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4

## Структура сайта (как у оригинала)

| Раздел | URL |
|--------|-----|
| Главная | `/` |
| Каталог | `/catalog`, `/catalog/[slug]`, `/product/[slug]` |
| Для клубов (B2B) | `/b2b` |
| Реализованные проекты | `/projects` |
| Дизайн / 3D | `/design` |
| Сервис и гарантия | `/service` |
| Контакты + заявка | `/contacts` |

API: `http://127.0.0.1:8000/api/` (`/home/`, `/categories/`, `/products/`, `/projects/`, `/leads/`).

## Запуск

### Backend

```bash
cd Sport
python -m venv .venv
.\.venv\Scripts\activate          # Windows
pip install -r backend/requirements.txt
cd backend
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

Админка: http://127.0.0.1:8000/admin/  
Логин по умолчанию (если создавали при установке): `admin` / `admin123`

### Frontend

```bash
cd Sport/frontend
npm install
npm run dev
```

Сайт: http://localhost:3000

## Демо-данные

Команда `python manage.py seed_data` заполняет категории, товары, проекты и сертификаты для Минска.
