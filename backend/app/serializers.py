from app.models import TodoItem
from rest_framework import serializers
from datetime import datetime

class TodoItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id' , 'title' , 'note' , 'created_at' ,'updated_at' , 'due_date']


class TodoItemCreateEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['title' , 'note' , 'due_date']
