from rest_framework.serializers import ModelSerializer
from producto.models import Producto

class ProductoSerializer(ModelSerializer):
    
    class Meta:
        model = Producto
        fields = ['ID_PRODUCTO', 'NOM_PRODUCTO', 'FECHA_DE_VENCIMIENTO', 'STOCK_PRODUCTO', 'DESC_PRODUCTO', 'PRECIO_PRODUCTO', 'STOCK_CRITICO']