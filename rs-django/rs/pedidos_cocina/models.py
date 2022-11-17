from django.db import models

# Create your models here.
class Pedidos_cocina(models.Model):
    
    producto=models.ForeignKey(
        'producto.Producto', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    close = models.BooleanField(default=False)

    def __str__(self):
        return str(self.producto)