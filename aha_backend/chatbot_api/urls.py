from django.urls import path
from chatbot_api.views import ChatView, DiagnoseView, HealthView, LeadSubmitView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='api-chat'),
    path('diagnose/', DiagnoseView.as_view(), name='api-diagnose'),
    path('health/', HealthView.as_view(), name='api-health'),
    path('lead/', LeadSubmitView.as_view(), name='api-lead'),
]
