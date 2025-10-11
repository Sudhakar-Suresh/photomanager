from django.urls import path
from . import views

urlpatterns = [
    # User endpoints
    path('users/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),

    # Session endpoints
    path('sessions/', views.SessionListCreateView.as_view(),
         name='session-list-create'),
    path('sessions/<int:pk>/', views.SessionDetailView.as_view(),
         name='session-detail'),
    path('sessions/<int:session_id>/approve/',
         views.approve_session, name='approve-session'),

    # Photo endpoints
    path('photos/', views.PhotoListCreateView.as_view(), name='photo-list-create'),
    path('photos/<int:pk>/', views.PhotoDetailView.as_view(), name='photo-detail'),

    # Notification endpoints
    path('notifications/', views.NotificationListView.as_view(),
         name='notification-list'),
    path('notifications/<int:notification_id>/read/',
         views.mark_notification_read, name='mark-notification-read'),
]
