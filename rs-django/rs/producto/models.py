from django.db import models

# Create your models here.
class Producto(models.Model):
    ID_PRODUCTO=models.IntegerField(primary_key=True)
    NOM_PRODUCTO=models.CharField(max_length=255)
    FECHA_DE_VENCIMIENTO=models.CharField(max_length=20)
    STOCK_PRODUCTO=models.IntegerField()
    DESC_PRODUCTO=models.CharField(max_length=255)
    PRECIO_PRODUCTO=models.IntegerField()
    STOCK_CRITICO=models.IntegerField()

    class Meta:
        managed = True
        db_table = 'producto'