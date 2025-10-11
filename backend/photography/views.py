from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Session, Photo, Payment, Notification
from .serializers import (
    UserSerializer, SessionSerializer, PhotoSerializer,
    PaymentSerializer, NotificationSerializer
)


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class SessionListCreateView(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'photographer':
            return Session.objects.filter(photographer=user)
        elif user.role == 'client':
            return Session.objects.filter(client=user)
        return Session.objects.all()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
        # Send notification to photographers
        self.send_booking_notification(serializer.instance)

    def send_booking_notification(self, session):
        photographers = User.objects.filter(role='photographer')
        for photographer in photographers:
            Notification.objects.create(
                user=photographer,
                message=f"New booking request from {session.client.username} for {session.date}"
            )


class SessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'photographer':
            return Session.objects.filter(photographer=user)
        elif user.role == 'client':
            return Session.objects.filter(client=user)
        return Session.objects.all()


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def approve_session(request, session_id):
    try:
        session = Session.objects.get(id=session_id)

        if request.user.role != 'photographer':
            return Response(
                {'error': 'Only photographers can approve sessions'},
                status=status.HTTP_403_FORBIDDEN
            )

        session.photographer = request.user
        session.status = 'approved'
        session.save()

        # Send notification to client
        Notification.objects.create(
            user=session.client,
            message=f"Your session on {session.date} has been approved by {request.user.username}"
        )

        # Send email notification
        send_mail(
            'Session Approved',
            f'Your photography session on {session.date} has been approved!',
            settings.EMAIL_HOST_USER,
            [session.client.email],
            fail_silently=True,
        )

        return Response({'message': 'Session approved successfully'})

    except Session.DoesNotExist:
        return Response(
            {'error': 'Session not found'},
            status=status.HTTP_404_NOT_FOUND
        )


class PhotoListCreateView(generics.ListCreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        session_id = self.request.query_params.get('session_id')
        if session_id:
            return Photo.objects.filter(session_id=session_id)
        return Photo.objects.all()

    def perform_create(self, serializer):
        photo = serializer.save()
        # Send notification to client
        Notification.objects.create(
            user=photo.session.client,
            message=f"New photos uploaded for your session on {photo.session.date}"
        )

        # Send email notification
        send_mail(
            'New Photos Available',
            f'New photos have been uploaded for your session on {photo.session.date}!',
            settings.EMAIL_HOST_USER,
            [photo.session.client.email],
            fail_silently=True,
        )


class PhotoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_notification_read(request, notification_id):
    try:
        notification = Notification.objects.get(
            id=notification_id,
            user=request.user
        )
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})
    except Notification.DoesNotExist:
        return Response(
            {'error': 'Notification not found'},
            status=status.HTTP_404_NOT_FOUND
        )
