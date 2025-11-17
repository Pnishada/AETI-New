from rest_framework.routers import DefaultRouter
from .views import ContactDetailsViewSet

router = DefaultRouter()

router.register(r'contact-details', ContactDetailsViewSet, basename='contactdetails')

urlpatterns = router.urls
