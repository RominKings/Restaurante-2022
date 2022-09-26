from django.contrib import admin
from categorias.models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass