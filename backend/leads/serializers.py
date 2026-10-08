from rest_framework import serializers

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    lead_type_display = serializers.CharField(
        source="get_lead_type_display", read_only=True
    )

    class Meta:
        model = Lead
        fields = [
            "id",
            "lead_type",
            "lead_type_display",
            "name",
            "phone",
            "email",
            "company",
            "message",
            "created_at",
            "is_processed",
        ]
        read_only_fields = ["id", "created_at", "is_processed", "lead_type_display"]
