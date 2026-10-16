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

    def _generate_unique_username(self, email: str) -> str:
        """Генерирует уникальный username на основе email."""
        if not User.objects.filter(username=email).exists():
            return email
        # Добавляем случайный суффикс, если email уже используется как username
        while True:
            username = f"{email}_{uuid.uuid4().hex[:8]}"
            if not User.objects.filter(username=username).exists():
                return username

    def create(self, validated_data):
        email = validated_data["email"]
        name = validated_data["name"].strip()
        parts = name.split(maxsplit=1)
        username = self._generate_unique_username(email)
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=validated_data["password"],
                first_name=parts[0][:150],
                last_name=(parts[1] if len(parts) > 1 else "")[:150],
            )
        except IntegrityError:
            # На случай гонки — пробу ещё раз с новым username
            username = self._generate_unique_username(email)
            user = User.objects.create_user(
                username=username,
                email=email,
                password=validated_data["password"],
                first_name=parts[0][:150],
                last_name=(parts[1] if len(parts) > 1 else "")[:150],
            )
        user.profile.phone = validated_data.get("phone", "")
        user.profile.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs["email"].lower().strip()
        user = authenticate(username=email, password=attrs["password"])
        if user is None:
            # fallback if username != email historically
            try:
                u = User.objects.get(email=email)
                user = authenticate(username=u.username, password=attrs["password"])
            except User.DoesNotExist:
                user = None
        if user is None:
            raise serializers.ValidationError("Неверный email или пароль.")
        if not user.is_active:
            raise serializers.ValidationError("Аккаунт отключён.")
        attrs["user"] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    phone = serializers.CharField(source="profile.phone", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "phone", "date_joined"]

    def get_name(self, obj: User) -> str:
        full = obj.get_full_name().strip()
        return full or obj.email
