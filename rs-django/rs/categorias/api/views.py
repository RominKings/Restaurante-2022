from rest_framework.viewsets import ModelViewSet
#LOS AUTENTICADOS PUEDES HACER TODDO PERO LOS QUE NO, SOLO PUEDEN LEER
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from categorias.models import Category
from categorias.api.serializers import CategorySerializer


class CategoryApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly] #PERMISOS ENTRE LAS CLASES
    serializer_class = CategorySerializer #TRATA LOS DATOS DE LAS PETICIONES
    queryset = Category.objects.all()