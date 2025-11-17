from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),

    # NEW unified format: /api/<appname>/
    path("api/academics/", include("academics.urls")),
    path("api/courses/", include("courses.urls")),
    path("api/departments/", include("departments.urls")),
    path("api/downloads/", include("downloads.urls")),
    path("api/news/", include("news.urls")),
    path("api/gallery/", include("gallery.urls")),
    path("api/staff/", include("staff.urls")),
    path('api/', include('contacts.urls')),  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
