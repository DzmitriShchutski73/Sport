from django.urls import include, path
from rest_framework.routers import DefaultRouter

from catalog.views import (
    CategoryViewSet,
    CertificateListView,
    HomePayloadView,
    ProductViewSet,
    ProjectViewSet,
)
from leads.views import LeadCreateView, MyLeadsListView

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("projects", ProjectViewSet, basename="project")

urlpatterns = [
    path("home/", HomePayloadView.as_view(), name="home"),
    path("certificates/", CertificateListView.as_view(), name="certificates"),
    path("leads/", LeadCreateView.as_view(), name="leads"),
    path("leads/mine/", MyLeadsListView.as_view(), name="my-leads"),
    path("auth/", include("accounts.urls")),
    path("", include(router.urls)),
]
