from django.db import models

# Create your models here.

UbicacionMesa = (
    ("INTERIOR", "interior"),
    ("EXTERIOR","extderior")

)

class Table(models.Model):
    number=models.IntegerField(unique=True)
    cantidad_sillas=models.IntegerField()
    ubicacion = models.CharField(max_length=255, choices=UbicacionMesa)


    def __str__(self):
        return str(self.number)