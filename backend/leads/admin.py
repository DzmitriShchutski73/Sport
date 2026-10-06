from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "lead_type", "is_processed", "created_at")
    list_filter = ("lead_type", "is_processed")
    search_fields = ("name", "phone", "email", "company")
    readonly_fields = ("created_at",)
