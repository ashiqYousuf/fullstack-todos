from django.contrib import admin
from .models import TodoItem
# Register your models here.

@admin.register(TodoItem)
class TodoItemAdmin(admin.ModelAdmin):
    list_display = ['id' , 'title' , 'note' , 'created_at' , 'updated_at' , 'due_date']
