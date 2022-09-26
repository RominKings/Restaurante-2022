from turtle import title
from rest_framework.serializers import ModelSerializer
from categorias.models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'image'] # caracteristicas de los datos del modelo Category