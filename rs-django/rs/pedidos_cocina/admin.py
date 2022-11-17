from django.contrib import admin
from pedidos_cocina.models import Pedidos_cocina


@admin.register(Pedidos_cocina)
class PedidosCocinaAdmin(admin.ModelAdmin):
    list_display = ['id', 'producto','created_at','close']