from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from producto.models import Producto
from producto.api.serializers import ProductoSerializer


class ProductoApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()