from rest_framework import serializers

from .models import Category, Certificate, Product, Project


class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image_url",
            "sort_order",
            "products_count",
        ]


class ProductListSerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "short_description",
            "price",
            "price_on_request",
            "image_url",
            "brand",
            "is_featured",
            "in_stock",
            "category_slug",
            "category_name",
        ]


class ProductDetailSerializer(ProductListSerializer):
    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + ["description", "created_at"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "location",
            "image_url",
            "is_3d",
            "completed_year",
        ]


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ["id", "title", "image_url", "sort_order"]
