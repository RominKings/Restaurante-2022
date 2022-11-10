from unittest.util import _MAX_LENGTH
from django.db import models
from django.db.models.fields.files import ImageField

class Products(models.Model):
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=3)
    active = models.BooleanField(default=False)
    category = models.ForeignKey('categorias.Category', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


