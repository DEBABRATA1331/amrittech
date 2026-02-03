from django.contrib import admin
from .models import LabBooking, BlogPost, ArticleSubmission, Product, Order

@admin.register(LabBooking)
class LabBookingAdmin(admin.ModelAdmin):
    list_display = ('institution_name', 'requested_date', 'created_at')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'is_published')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ArticleSubmission)
class ArticleSubmissionAdmin(admin.ModelAdmin):
    list_display = ('title', 'author_name', 'status', 'is_paid')
    list_filter = ('status', 'is_paid')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'is_active')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'product', 'status')
