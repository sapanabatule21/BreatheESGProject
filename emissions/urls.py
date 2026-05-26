from django.urls import path

from .views import (
    get_emissions,
    upload_csv,
    approve_record
)

urlpatterns = [

    path(
        '',
        get_emissions
    ),

    path(
        'upload/',
        upload_csv
    ),

    path(
        'approve/<int:id>/',
        approve_record
    ),

]