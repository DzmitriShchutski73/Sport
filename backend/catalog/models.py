from django.db import models


class Category(models.Model):
    name = models.CharField("Название", max_length=120)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField("Описание", blank=True)
    image_url = models.URLField("Изображение", blank=True)
    sort_order = models.PositiveIntegerField("Порядок", default=0, db_index=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        indexes = [
            models.Index(fields=["sort_order", "name"]),
        ]

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE, db_index=True
    )
    name = models.CharField("Название", max_length=200)
    slug = models.SlugField(unique=True, db_index=True)
    short_description = models.CharField("Краткое описание", max_length=300, blank=True)
    description = models.TextField("Описание", blank=True)
    price = models.DecimalField(
        "Цена (BYN)", max_digits=12, decimal_places=2, null=True, blank=True
    )
    price_on_request = models.BooleanField("Цена по запросу", default=True)
    image_url = models.URLField("Изображение", blank=True)
    brand = models.CharField("Бренд", max_length=100, blank=True)
    is_featured = models.BooleanField("На главной", default=False, db_index=True)
    in_stock = models.BooleanField("В наличии", default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-is_featured", "name"]
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        indexes = [
            models.Index(fields=["category", "is_featured"]),
            models.Index(fields=["is_featured", "name"]),
            models.Index(fields=["category", "in_stock"]),
        ]

    def __str__(self) -> str:
        return self.name


class Project(models.Model):
    title = models.CharField("Название", max_length=200)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField("Описание", blank=True)
    location = models.CharField("Локация", max_length=200, blank=True)
    image_url = models.URLField("Изображение", blank=True)
    is_3d = models.BooleanField("3D-проект", default=False, db_index=True)
    completed_year = models.PositiveIntegerField("Год", null=True, blank=True, db_index=True)

    class Meta:
        ordering = ["-completed_year", "title"]
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        indexes = [
            models.Index(fields=["is_3d", "completed_year"]),
        ]

    def __str__(self) -> str:
        return self.title


class Certificate(models.Model):
    title = models.CharField("Название", max_length=200)
    image_url = models.URLField("Изображение", blank=True)
    sort_order = models.PositiveIntegerField("Порядок", default=0, db_index=True)

    class Meta:
        ordering = ["sort_order"]
        verbose_name = "Сертификат"
        verbose_name_plural = "Сертификаты"
        indexes = [
            models.Index(fields=["sort_order"]),
        ]

    def __str__(self) -> str:
        return self.title
