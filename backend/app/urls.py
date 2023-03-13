from django.urls import path
from app.views import TodoItemListView , TodoItemCreateView , TodoItemEditView , TodoItemDeleteView

urlpatterns = [
    path('list/' , TodoItemListView.as_view() , name='list'),
    path('create/' , TodoItemCreateView.as_view() , name='create'),
    path('update/<int:id>/' , TodoItemEditView.as_view() , name='update'),
    path('delete/<int:id>/' , TodoItemDeleteView.as_view() , name='delete'),
]
