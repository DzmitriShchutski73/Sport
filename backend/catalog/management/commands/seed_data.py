from django.core.management.base import BaseCommand

from catalog.models import Category, Certificate, Product, Project


CATEGORIES = [
    {
        "name": "Кардиотренажёры",
        "slug": "cardio",
        "description": "Беговые дорожки, эллипсы, велотренажёры и гребные тренажёры для клубов и дома.",
        "image_url": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
        "sort_order": 1,
    },
    {
        "name": "Силовые тренажёры",
        "slug": "strength",
        "description": "Грузоблочные машины, рамы, скамьи и мультистанции премиального класса.",
        "image_url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        "sort_order": 2,
    },
    {
        "name": "Свободные веса",
        "slug": "free-weights",
        "description": "Гантели, штанги, грифы, диски и гири для силового тренинга.",
        "image_url": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        "sort_order": 3,
    },
    {
        "name": "Функциональный тренинг",
        "slug": "functional",
        "description": "TRX, медболы, канаты, степы и оборудование для групповых программ.",
        "image_url": "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=800&q=80",
        "sort_order": 4,
    },
    {
        "name": "Спортивные покрытия",
        "slug": "flooring",
        "description": "Резиновые покрытия, татами и спецполы для залов и студий.",
        "image_url": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
        "sort_order": 5,
    },
    {
        "name": "Единоборства и бокс",
        "slug": "combat",
        "description": "Мешки, перчатки, ринги и инвентарь для боевых искусств.",
        "image_url": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
        "sort_order": 6,
    },
]

PRODUCTS = [
    {
        "category": "cardio",
        "name": "Беговая дорожка GoldGym Runner Pro",
        "slug": "runner-pro",
        "short_description": "Коммерческая дорожка с амортизацией и сенсорным дисплеем.",
        "description": "Профессиональная беговая дорожка для фитнес-клубов: мощность двигателя 4.5 л.с., скорость до 20 км/ч, максимальный вес пользователя 180 кг. Подходит для интенсивной эксплуатации в зале.",
        "brand": "GoldGym",
        "price": None,
        "price_on_request": True,
        "image_url": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=80",
        "is_featured": True,
    },
    {
        "category": "cardio",
        "name": "Эллиптический тренажёр Ellipse X9",
        "slug": "ellipse-x9",
        "short_description": "Плавный ход и 20 уровней нагрузки.",
        "description": "Эллипс коммерческого класса с электромагнитной системой нагрузки и эргономичными рукоятками. Идеален для кардиозон в клубах Минска.",
        "brand": "GoldGym",
        "price": 8900,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
        "is_featured": True,
    },
    {
        "category": "strength",
        "name": "Грузоблочный жим от груди",
        "slug": "chest-press",
        "short_description": "Анатомичная траектория и стек 100 кг.",
        "description": "Силовой тренажёр для жима лёжа/от груди с независимыми рычагами. Рама из усиленной стали, обивка износостойкая.",
        "brand": "GoldGym",
        "price": 6200,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80",
        "is_featured": True,
    },
    {
        "category": "strength",
        "name": "Силовая рама Power Rack G3",
        "slug": "power-rack-g3",
        "short_description": "Мультифункциональная рама для свободных весов.",
        "description": "Power Rack с страховочными упорами, турником и креплениями для аксессуаров. Основа силового зала любой площади.",
        "brand": "GoldGym",
        "price": None,
        "price_on_request": True,
        "image_url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80",
        "is_featured": True,
    },
    {
        "category": "free-weights",
        "name": "Набор гантелей 2–40 кг",
        "slug": "dumbbell-set",
        "short_description": "Прорезиненные гантели с хромированными грифами.",
        "description": "Комплект гантелей для коммерческих залов. Ударопрочное покрытие, удобный хват.",
        "brand": "GoldGym",
        "price": 4500,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
        "is_featured": False,
    },
    {
        "category": "free-weights",
        "name": "Олимпийская штанга 20 кг",
        "slug": "olympic-barbell",
        "short_description": "Гриф 220 см, нагрузка до 700 кг.",
        "description": "Соревновательный олимпийский гриф с подшипниками и качественной накаткой.",
        "brand": "GoldGym",
        "price": 890,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80",
        "is_featured": False,
    },
    {
        "category": "functional",
        "name": "Функциональные петли TRX Pro",
        "slug": "trx-pro",
        "short_description": "Комплект для студий и групповых программ.",
        "description": "Усиленные петли с креплением к потолку или раме. Подходят для студий функционального тренинга.",
        "brand": "Partner",
        "price": 420,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=900&q=80",
        "is_featured": True,
    },
    {
        "category": "flooring",
        "name": "Резиновое покрытие 15 мм",
        "slug": "rubber-floor-15",
        "short_description": "Квадраты 50×50 см для силовых зон.",
        "description": "Износостойкое покрытие для зон со свободными весами. Снижает шум и защищает стяжку.",
        "brand": "GoldGym",
        "price": 45,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80",
        "is_featured": False,
    },
    {
        "category": "combat",
        "name": "Боксёрский мешок 120 см",
        "slug": "boxing-bag-120",
        "short_description": "Натуральная кожа, наполнитель текстиль.",
        "description": "Профессиональный мешок для клубов единоборств. Крепление в комплекте.",
        "brand": "GoldGym",
        "price": 780,
        "price_on_request": False,
        "image_url": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&q=80",
        "is_featured": True,
    },
]

PROJECTS = [
    {
        "title": "Фитнес-студия на Немиге",
        "slug": "studio-nemiga",
        "description": "Комплектация кардио- и силовых зон, покрытие и функциональный инвентарь «под ключ».",
        "location": "Минск, ул. Немига",
        "image_url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80",
        "is_3d": False,
        "completed_year": 2024,
    },
    {
        "title": "Отельный зал Marriott Minsk",
        "slug": "marriott-minsk",
        "description": "Компактный премиальный зал для гостей отеля: кардио, кабели, свободные веса.",
        "location": "Минск",
        "image_url": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80",
        "is_3d": False,
        "completed_year": 2023,
    },
    {
        "title": "Клуб «Сила» — Уручье",
        "slug": "sila-uruchye",
        "description": "Проектирование зонирования и поставка силового парка на 800 м².",
        "location": "Минск, Уручье",
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&q=80",
        "is_3d": False,
        "completed_year": 2025,
    },
    {
        "title": "3D: студия 120 м²",
        "slug": "3d-studio-120",
        "description": "Визуализация планировки с кардиолинией у окон и силовой зоной у глухой стены.",
        "location": "Минск",
        "image_url": "https://images.unsplash.com/photo-1540496905036-5937c4077db2?w=1000&q=80",
        "is_3d": True,
        "completed_year": 2025,
    },
    {
        "title": "3D: boutique gym",
        "slug": "3d-boutique",
        "description": "Дизайн-проект бутика с акцентом на функциональный тренинг и хранение инвентаря.",
        "location": "Минск",
        "image_url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1000&q=80",
        "is_3d": True,
        "completed_year": 2024,
    },
]

CERTIFICATES = [
    {"title": "Сертификат соответствия ISO", "image_url": "", "sort_order": 1},
    {"title": "Дилерский сертификат бренда", "image_url": "", "sort_order": 2},
    {"title": "Гарантийный сервисный центр", "image_url": "", "sort_order": 3},
]


class Command(BaseCommand):
    help = "Заполняет БД демо-данными GoldGym Минск"

    def handle(self, *args, **options):
        Category.objects.all().delete()
        Product.objects.all().delete()
        Project.objects.all().delete()
        Certificate.objects.all().delete()

        cats = {}
        for item in CATEGORIES:
            cats[item["slug"]] = Category.objects.create(**item)

        for item in PRODUCTS:
            data = {**item}
            slug = data.pop("category")
            Product.objects.create(category=cats[slug], **data)

        for item in PROJECTS:
            Project.objects.create(**item)

        for item in CERTIFICATES:
            Certificate.objects.create(**item)

        self.stdout.write(
            self.style.SUCCESS(
                f"Готово: {Category.objects.count()} категорий, "
                f"{Product.objects.count()} товаров, "
                f"{Project.objects.count()} проектов"
            )
        )
