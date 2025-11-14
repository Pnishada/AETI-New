from rest_framework import viewsets
from .models import AcademicItem
from .serializers import AcademicItemSerializer

class AcademicItemViewSet(viewsets.ModelViewSet):
    queryset = AcademicItem.objects.all().order_by('-created_at')
    serializer_class = AcademicItemSerializer
