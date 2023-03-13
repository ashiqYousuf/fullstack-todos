from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from app.models import TodoItem
from app.serializers import TodoItemListSerializer , TodoItemCreateEditSerializer
from rest_framework.pagination import PageNumberPagination
from app.renderers import CustomRenderer


class CustomPagination(PageNumberPagination):
    page_size = 5
    max_page_size = 5


class TodoItemListView(APIView):
    pagination_class = CustomPagination
    renderer_classes = [CustomRenderer]

    def get(self , request , format=None):
        paginator = self.pagination_class()
        todos = TodoItem.objects.all()
        results = paginator.paginate_queryset(todos , request)
        serializer = TodoItemListSerializer(results , many=True)
        return paginator.get_paginated_response(serializer.data)


class TodoItemCreateView(APIView):
    # renderer_classes = [CustomRenderer]

    def post(self , request , format=None):
        serializer = TodoItemCreateEditSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'msg': 'Item Added Successfully'},
            status=status.HTTP_201_CREATED
        )

class TodoItemEditView(APIView):
    renderer_classes = [CustomRenderer]

    def put(self , request , id , format=None):
        todo = TodoItem.objects.get(pk=id)
        serializer = TodoItemCreateEditSerializer(todo , data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'msg': 'Item Updated Successfully'},
            status=status.HTTP_200_OK
        )

class TodoItemDeleteView(APIView):
    renderer_classes = [CustomRenderer]

    def delete(self , request , id , format=None):
        try:
            TodoItem.objects.get(pk=id).delete()
            return Response(
                {'msg': 'Data Deleted Successfully'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'msg': 'Unable to delete'},
                status=status.HTTP_400_BAD_REQUEST
            )
