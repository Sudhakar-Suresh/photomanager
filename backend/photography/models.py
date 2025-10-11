from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = [
        ('photographer', 'Photographer'),
        ('client', 'Client'),
        ('admin', 'Admin'),
    ]

    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='client')
    supabase_id = models.CharField(
        max_length=255, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class Session(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    ]

    PACKAGE_CHOICES = [
        ('basic', 'Basic Package'),
        ('standard', 'Standard Package'),
        ('premium', 'Premium Package'),
    ]

    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='client_sessions')
    photographer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='photographer_sessions', null=True, blank=True)
    date = models.DateField()
    time = models.TimeField()
    package = models.CharField(max_length=20, choices=PACKAGE_CHOICES)
    location = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.id} - {self.client.username} on {self.date}"


class Photo(models.Model):
    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name='photos')
    file_url = models.URLField()
    filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)

    def __str__(self):
        return f"Photo {self.id} - {self.session}"


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    session = models.OneToOneField(
        Session, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(null=True, blank=True)
    transaction_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Payment {self.id} - {self.session}"


class Notification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification {self.id} - {self.user.username}"

    class Meta:
        ordering = ['-created_at']
