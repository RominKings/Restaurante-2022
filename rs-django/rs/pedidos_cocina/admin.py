from django.contrib import admin
from pedidos_cocina.models import PedidosCocina 


@admin.register(PedidosCocina)
class PedidosCocinaAdmin(admin.ModelAdmin):
    list_display = ['idpedidos_cocina', 'producto']