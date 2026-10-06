from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Certificate, Product, Project
from .serializers import (
    CategorySerializer,
    CertificateSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    ProjectSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"

    def get_queryset(self):
        qs = Product.objects.select_related("category")
        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")
        if category:
            qs = qs.filter(category__slug=category)
        if featured in ("1", "true", "True"):
            qs = qs.filter(is_featured=True)
        return qs

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = Project.objects.all()
        is_3d = self.request.query_params.get("is_3d")
        if is_3d in ("1", "true", "True"):
            qs = qs.filter(is_3d=True)
        elif is_3d in ("0", "false", "False"):
            qs = qs.filter(is_3d=False)
        return qs


class CertificateListView(generics.ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class HomePayloadView(APIView):
    """Сводные данные для главной страницы."""

    def get(self, request):
        categories = Category.objects.all()[:8]
        featured = Product.objects.select_related("category").filter(is_featured=True)[:6]
        projects = Project.objects.filter(is_3d=False)[:4]
        projects_3d = Project.objects.filter(is_3d=True)[:4]
        certificates = Certificate.objects.all()[:6]
        return Response(
            {
                "categories": CategorySerializer(categories, many=True).data,
                "featured_products": ProductListSerializer(featured, many=True).data,
                "projects": ProjectSerializer(projects, many=True).data,
                "projects_3d": ProjectSerializer(projects_3d, many=True).data,
                "certificates": CertificateSerializer(certificates, many=True).data,
                "contacts": {
                    "phone": "+375 (29) 123-45-67",
                    "phone_alt": "+375 (17) 200-00-00",
                    "email": "sales@goldgym.by",
                    "address": "г. Минск, ул. Независимости, 58",
                    "hours": "Пн–Пт 9:00–18:00",
                    "city": "Минск, Беларусь",
                },
            }
        )
