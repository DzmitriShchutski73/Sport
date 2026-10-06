from django.contrib import admin

from .models import Category, Certificate, Product, Project


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "sort_order")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "brand", "price_on_request", "is_featured", "in_stock")
    list_filter = ("category", "is_featured", "in_stock", "brand")
    search_fields = ("name", "brand")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "is_3d", "completed_year")
    list_filter = ("is_3d",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order")
