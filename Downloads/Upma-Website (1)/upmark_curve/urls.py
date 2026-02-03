from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('web.urls')),
    path('guidance/', include('guidance.urls')),
    path('tinker/', include('tinker.urls')),
    path('studio/', include('studio.urls')),
]
