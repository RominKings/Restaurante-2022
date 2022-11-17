from rest_framework.serializers import ModelSerializer

from pedidos_cocina.models import Pedidos_cocina
from producto.api.serializers import ProductoSerializer



class Pedidos_cocinaSerializer(ModelSerializer):
    producto_data = ProductoSerializer(source='producto', read_only=True)

    class Meta:
        model = Pedidos_cocina
        fields = ['id', 'producto','created_at','close']