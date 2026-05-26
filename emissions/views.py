from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EmissionRecord
from .serializers import EmissionSerializer

from ingestion.models import Source

import pandas as pd


# GET ALL EMISSIONS
@api_view(['GET'])
def get_emissions(request):

    emissions = EmissionRecord.objects.all()

    serializer = EmissionSerializer(
        emissions,
        many=True
    )

    return Response(serializer.data)


# CSV UPLOAD
@api_view(['POST'])
def upload_csv(request):

    try:

        file = request.FILES.get('file')

        source_type = request.data.get('type')

        if not file:

            return Response({
                "error": "No file uploaded"
            })

        df = pd.read_csv(file)

        source = Source.objects.create(
            name=source_type
        )

        for index, row in df.iterrows():

            emission_factor = 1

            # SAP
            if source_type == 'SAP':

                emission_factor = 2.5

            # Utility
            elif source_type == 'UTILITY':

                emission_factor = 0.8

            # Travel
            elif source_type == 'TRAVEL':

                emission_factor = 1.2

            total = (
                float(row['activity_value'])
                * emission_factor
            )

            suspicious = False

            if float(row['activity_value']) > 1000:

                suspicious = True

            EmissionRecord.objects.create(

                source=source,

                category=row['category'],

                scope=row['scope'],

                activity_value=row['activity_value'],

                unit=row['unit'],

                normalized_value=row['activity_value'],

                normalized_unit=row['unit'],

                suspicious=suspicious,

                status='PENDING',

                locked=False,

                emission_factor=emission_factor,

                total_emissions=total
            )

        return Response({
            "message": "CSV Uploaded Successfully"
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })


# APPROVE RECORD
@api_view(['POST'])
def approve_record(request, id):

    record = EmissionRecord.objects.get(id=id)

    record.status = 'APPROVED'

    record.locked = True

    record.save()

    return Response({
        "message": "Record Approved"
    })