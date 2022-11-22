from unittest.util import _MAX_LENGTH
from django.db import models
from django.db.models.fields.files import ImageField

class Products(models.Model):
    id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=3)
    desc=models.CharField(max_length=255,null=True)
    active = models.BooleanField(default=False)
    category = models.ForeignKey('categorias.Category', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'products_products'


