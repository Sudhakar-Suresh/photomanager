from rest_framework import serializers
from .models import User, Session, Photo, Payment, Notification


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'created_at']
        read_only_fields = ['id', 'created_at']


class SessionSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(
        source='client.username', read_only=True)
    photographer_name = serializers.CharField(
        source='photographer.username', read_only=True)

    class Meta:
        model = Session
        fields = [
            'id', 'client', 'photographer', 'client_name', 'photographer_name',
            'date', 'time', 'package', 'location', 'status', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'session', 'file_url',
                  'filename', 'uploaded_at', 'is_approved']
        read_only_fields = ['id', 'uploaded_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'session', 'amount', 'status',
                  'payment_date', 'transaction_id']
        read_only_fields = ['id', 'payment_date']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']
