from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from pedidos_cocina.models import PedidosCocina
from pedidos_cocina.api.serializers import PedidosCocinaSerializer


class PedidosCocinaApiViewSet(ModelViewSet):
    serializer_class = PedidosCocinaSerializer
    queryset = PedidosCocina.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['producto']
    ordering_fields = '__all__'