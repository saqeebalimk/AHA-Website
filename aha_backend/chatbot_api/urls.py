from django.urls import path
from .views import ChatView, DiagnoseView, HealthView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='api-chat'),
    path('diagnose/', DiagnoseView.as_view(), name='api-diagnose'),
    path('health/', HealthView.as_view(), name='api-health'),
]
