from rest_framework.serializers import ModelSerializer

from pedidos_cocina.models import PedidosCocina
from producto.api.serializers import ProductoSerializer



class PedidosCocinaSerializer(ModelSerializer):
    producto_data = ProductoSerializer(source='producto', read_only=True)

    class Meta:
        model = PedidosCocina
        fields = ['idpedidos_cocina', 'producto','producto_data']