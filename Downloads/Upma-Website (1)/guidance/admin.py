from django.contrib import admin
from .models import ExamCategory, Counselor

@admin.register(ExamCategory)
class ExamCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Counselor)
class CounselorAdmin(admin.ModelAdmin):
    list_display = ('name', 'achievement', 'exam', 'is_active')
    list_filter = ('exam', 'is_active')
