from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Lead
from .serializers import LeadSerializer


class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        data = {}
        if user is not None:
            data["user"] = user
            if not serializer.validated_data.get("email"):
                data["email"] = user.email
            if not serializer.validated_data.get("name"):
                data["name"] = user.get_full_name() or user.email
            if not serializer.validated_data.get("phone") and hasattr(user, "profile"):
                data["phone"] = user.profile.phone
        serializer.save(**data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "ok": True,
                "message": "Заявка принята. Мы свяжемся с вами в ближайшее время.",
                "lead": LeadSerializer(serializer.instance).data,
            },
            status=status.HTTP_201_CREATED,
        )


class MyLeadsListView(generics.ListAPIView):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Lead.objects.filter(user=self.request.user)
