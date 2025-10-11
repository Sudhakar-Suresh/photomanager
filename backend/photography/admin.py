from django.contrib import admin
from .models import User, Session, Photo, Payment, Notification


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['username', 'email']


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'client', 'photographer',
                    'date', 'time', 'package', 'status']
    list_filter = ['status', 'package', 'date']
    search_fields = ['client__username', 'photographer__username', 'location']
    date_hierarchy = 'date'


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'session', 'filename', 'uploaded_at', 'is_approved']
    list_filter = ['is_approved', 'uploaded_at']
    search_fields = ['filename', 'session__client__username']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'session', 'amount', 'status', 'payment_date']
    list_filter = ['status', 'payment_date']
    search_fields = ['session__client__username', 'transaction_id']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'message', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['user__username', 'message']
