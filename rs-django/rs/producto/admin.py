from django.contrib import admin

# Register your models here.
from producto.models import  Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['ID_PRODUCTO',
    'NOM_PRODUCTO',
    'FECHA_DE_VENCIMIENTO',
    'STOCK_PRODUCTO',
    'DESC_PRODUCTO',
    'PRECIO_PRODUCTO',
    'STOCK_CRITICO',]