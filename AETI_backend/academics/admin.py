from django.contrib import admin
from .models import AcademicItem

@admin.register(AcademicItem)
class AcademicItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'file', 'created_at')
    search_fields = ('title', 'description')
