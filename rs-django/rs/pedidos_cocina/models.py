from django.db import models

# Create your models here.
class PedidosCocina(models.Model):

    idpedidos_cocina=models.IntegerField(primary_key=True)
    producto=models.ForeignKey('producto.Producto', on_delete=models.SET_NULL, null=True, blank=True)
    class Meta:
        managed = True
        db_table = 'pedidos_cocina'