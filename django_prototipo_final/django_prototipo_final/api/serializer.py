#convertir de objetos de python a json, y viceversa

from rest_framework import serializers
from .models import Programmer
#django aplica un id como clave primaria por defecto
class ProgrammerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Programmer
        #fields=('fullname', 'nickname', 'age', 'isactive')
        fields= '__all__'