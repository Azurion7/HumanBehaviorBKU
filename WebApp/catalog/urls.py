from django.urls import path, include
from django.conf.urls import url

from . import views

app_name = 'catalog'
urlpatterns = [
    path('', views.index, name='index'),
    path('videos/<str:video_action>', views.VideoListView.as_view(), name='videos'),
    # parameter at video detail <str:video_title>, it WORKS EVEN for invalid video string title
    # video_title parameter can be invoked in corresponding VIEW later then 
    path('video/<str:video_type>/<str:video_title>', views.VideoDetailView.as_view(), name='video-detail'),
    path('c3d-new/<str:video_title>', views.C3dNewView.as_view(), name='c3d-new'),
    path('video-upload', views.VideoUploadView.as_view(), name='video-upload'),
    path('get-score', views.GetScoreView.as_view(), name='video-get-score'),
    path('settings', views.SettingsView.as_view(), name='settings'),
    path('progress', views.progress_view, name='progress'),
    path('delete-videos', views.DeleteVideoView.as_view(), name='delete-videos'),
]