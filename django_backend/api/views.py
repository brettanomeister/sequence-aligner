from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import AlignmentRun
from .models import Alignment
from .serializers import *

def index(request):
    return HttpResponse('Django example')

@api_view(['GET', 'POST'])
def alignment_runs_list(request):
    if request.method == 'GET':
        data = AlignmentRun.objects.all()

        serializer = AlignmentRunSerializer(data, context={'request', request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AlignmentRunSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def alignment_run_detail(request, pk):
    try:
        alignment_run = AlignmentRun.objects.get(pk=pk)
    except AlignmentRun.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AlignmentRunSerializer(alignment_run, context={'request', request})

        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AlignmentRunSerializer(alignment_run, data=request.data, context={'request', request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        alignment_run.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def alignments_list(request):
    if request.method == 'GET':
        data = Alignment.objects.all()

        serializer = AlignmentSerializer(data, context={'request', request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AlignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def alignment_detail(request, pk):
    try:
        alignment = Alignment.objects.get(pk=pk)
    except Alignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AlignmentSerializer(alignment, context={'request', request})

        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AlignmentSerializer(alignment, data=request.data, context={'request', request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        alignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
