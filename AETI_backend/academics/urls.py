from rest_framework.routers import DefaultRouter
from .views import AcademicItemViewSet

router = DefaultRouter()
router.register(r'academics', AcademicItemViewSet, basename='academicitem')

urlpatterns = router.urls
