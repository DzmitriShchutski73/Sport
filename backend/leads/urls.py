from django.urls import path
from .views import LeadCreateView, MyLeadsListView, LeadDeleteView

urlpatterns = [
    path('', LeadCreateView.as_view(), name='lead-create'),
    path('mine/', MyLeadsListView.as_view(), name='my-leads'),
    path('<int:pk>/delete/', LeadDeleteView.as_view(), name='lead-delete'),
]