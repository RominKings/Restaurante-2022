from rest_framework.serializers import ModelSerializer

from products.models import Products
from categorias.api.serializers import CategorySerializer

class ProductSerializer(ModelSerializer):
    category_data = CategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = Products
        fields = ['id', 'title', 'image', 'price','desc','active', 'category', 'category_data']