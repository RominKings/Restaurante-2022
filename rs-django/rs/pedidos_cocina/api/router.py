from rest_framework.routers import DefaultRouter

from pedidos_cocina.api.views import PedidosCocinaApiViewSet

router_Pedidos_cocina = DefaultRouter()

router_Pedidos_cocina.register(
    prefix='pedidos_cocina', basename='pedidos_cocina', viewset=PedidosCocinaApiViewSet
)