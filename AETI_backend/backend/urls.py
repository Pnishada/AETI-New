from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from courses.views import CourseViewSet
from departments.views import DepartmentViewSet
from gallery.views import GalleryViewSet
from news.views import NewsViewSet
from staff.views import StaffViewSet
from downloads.views import DownloadViewSet
from contacts.views import ContactDetailsViewSet
from academics.views import AcademicItemViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'gallery', GalleryViewSet)
router.register(r'news', NewsViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'downloads', DownloadViewSet)
router.register(r'contact-details', ContactDetailsViewSet, basename='contactdetails')
router.register(r'academics', AcademicItemViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
