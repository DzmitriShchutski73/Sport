from django.db import models


class Lead(models.Model):
    class LeadType(models.TextChoices):
        CATALOG = "catalog", "Запрос каталога"
        CALLBACK = "callback", "Обратный звонок"
        SERVICE = "service", "Сервис / гарантия"
        B2B = "b2b", "Для клубов"

    lead_type = models.CharField(
        "Тип", max_length=20, choices=LeadType.choices, default=LeadType.CATALOG
    )
    name = models.CharField("Имя", max_length=120)
    phone = models.CharField("Телефон", max_length=40)
    email = models.EmailField("Email", blank=True)
    company = models.CharField("Компания", max_length=200, blank=True)
    message = models.TextField("Сообщение", blank=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    is_processed = models.BooleanField("Обработано", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self) -> str:
        return f"{self.name} — {self.get_lead_type_display()}"
