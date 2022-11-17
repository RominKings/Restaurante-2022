from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from pedidos_cocina.models import Pedidos_cocina
from pedidos_cocina.api.serializers import Pedidos_cocinaSerializer


class Pedidos_cocinaApiViewSet(ModelViewSet):
    serializer_class = Pedidos_cocinaSerializer
    queryset = Pedidos_cocina.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['producto','close']
    ordering_fields = '__all__'