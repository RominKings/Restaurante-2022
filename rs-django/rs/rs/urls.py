"""rs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf import settings #PARA QUE MUESTRE IMAGENES
from django.conf.urls.static import static #PARA QUE MUESTRE IMAGENES
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.api.router import router_user
from categorias.api.router import router_category
from tables.api.router import router_table
from payments.api.router import router_payments
from tables.api.router import router_table
from products.api.router import router_product
from orders.api.router import router_orders

schema_view = get_schema_view(
   openapi.Info(
      title="rs-ApiDoc",
      default_version='v1',
      description="Documentacion de RS",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="romi.reyesp@duocuc.cl"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

#RUTAS DE TODAS LAS ISTAS DE DJANGO
urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/', include(router_user.urls)),
    path('api/', include('users.api.router')),
    path('api/', include(router_category.urls)), #RUTA DE LAS CATEGORIAS
    path('api/', include(router_table.urls)), 
    path('api/', include(router_orders.urls)),
    path('api/', include(router_product.urls)),
    path('api/', include(router_payments.urls)),
]  

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
