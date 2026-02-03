from django.contrib import admin
from .models import Service, ServiceInquiry

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price_starts_at')

@admin.register(ServiceInquiry)
class ServiceInquiryAdmin(admin.ModelAdmin):
    list_display = ('service', 'name', 'email', 'created_at')
