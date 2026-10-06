from rest_framework import serializers

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            "id",
            "lead_type",
            "name",
            "phone",
            "email",
            "company",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
