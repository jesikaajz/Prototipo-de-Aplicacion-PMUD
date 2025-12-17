from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProgrammerSerializer
from .models import Programmer

# Create your views here.
class ProgramerViewSet(viewsets.ModelViewSet):
    queryset=Programmer.objects.all()
    serializer_class=ProgrammerSerializer

def programmer_page(request):
    return render(request, 'programmers.html')