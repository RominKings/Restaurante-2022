from rest_framework.routers import DefaultRouter

from pedidos_cocina.api.views import Pedidos_cocinaApiViewSet

router_Pedidos_cocina = DefaultRouter()

router_Pedidos_cocina.register(
    prefix='pedidos_cocina', basename='pedidos_cocina', viewset=Pedidos_cocinaApiViewSet
)