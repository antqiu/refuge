from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [

    path('', views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("restrooms", views.restrooms, name="restrooms"),
    #path("comment/<int:restroom_id>", views.comment, name="comment"),
    path("restrooms/<int:restroom_id>",
         views.restrooms_id, name="restrooms_id"),
    path("near", views.near, name="near"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 