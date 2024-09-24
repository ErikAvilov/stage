from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = "polls"
urlpatterns = [
    path("", views.PollsList.as_view(), name="index"),
    path("<int:question_id>/", views.ChoiceList.as_view(), name='results'),
    path("<int:question_id>/vote/", views.vote, name='vote'),
]

urlpatterns = format_suffix_patterns(urlpatterns)