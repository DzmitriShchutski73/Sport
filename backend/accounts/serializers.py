from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.db import IntegrityError
import uuid
from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField(max_length=120)
    phone = serializers.CharField(max_length=40, required=False, allow_blank=True)

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def validate_email(self, value: str) -> str:
        return value.strip().lower()

    @staticmethod
    def _generate_username(email: str) -> str:
        """Генерирует уникальный username из email."""
        base = email.split("@")[0][:140]
        username = base
        if User.objects.filter(username__iexact=username).exists():
            username = f"{base}_{uuid.uuid4().hex[:8]}"
        return username

    def create(self, validated_data):
        email = validated_data["email"]
        username = self._generate_username(email)
        name = validated_data["name"].strip()
        parts = name.split(maxsplit=1)
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=validated_data["password"],
                first_name=parts[0][:150],
                last_name=(parts[1] if len(parts) > 1 else "")[:150],
            )
        except IntegrityError:
            # крайне редкая коллизия — повторяем с uuid
            user = User.objects.create_user(
                username=f"{username}_{uuid.uuid4().hex[:8]}",
                email=email,
                password=validated_data["password"],
                first_name=parts[0][:150],
                last_name=(parts[1] if len(parts) > 1 else "")[:150],
            )
        user.profile.phone = validated_data.get("phone", "")
        user.profile.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs["username"].strip()
        user = authenticate(username=username, password=attrs["password"])
        if user is None:
            # fallback: вход по email для ранее созданных аккаунтов
            try:
                u = User.objects.get(email__iexact=username)
                user = authenticate(username=u.username, password=attrs["password"])
            except User.DoesNotExist:
                user = None
        if user is None:
            raise serializers.ValidationError("Неверный логин или пароль.")
        if not user.is_active:
            raise serializers.ValidationError("Аккаунт отключён.")
        attrs["user"] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    phone = serializers.CharField(source="profile.phone", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "phone", "date_joined"]

    def get_name(self, obj: User) -> str:
        full = obj.get_full_name().strip()
        return full or obj.username
