from django.db import models

#Para cargar categorias
class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=250)

    def __str__(self):
        return self.title