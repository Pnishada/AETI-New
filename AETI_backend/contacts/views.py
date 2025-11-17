from rest_framework import viewsets
from .models import ContactDetails
from .serializers import ContactDetailsSerializer

class ContactDetailsViewSet(viewsets.ModelViewSet):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer
