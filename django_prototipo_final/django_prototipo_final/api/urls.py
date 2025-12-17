from django.urls import path,include
from rest_framework import routers
from api import views
from .views import programmer_page


router=routers.DefaultRouter() #elemento que nos permite crear múltiples rutas
router.register(r'programmers', views.ProgramerViewSet) #registramos algo
#la r es para crear los endpoints correctamente
#programmers/n -> salto de linea
#programmers/t tabulacion
urlpatterns = [
    path('', include(router.urls)),
    path('programmers-page/', programmer_page, name='programmers-page'),
]
#la base de la api sera programmers
#todas las rutas o endpoints que puede tener nuestra api

#creamos todas las rutas correspondientes para la entidad de programador a partir de su 
 #viewset