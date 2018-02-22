from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('articles/', views.articleAll, name='AllArticles'),
    path('articles/<int:id>/', views.article, name='ArticleId'),
    path('categories/', views.categories, name='Categories'),
    path('categories/<int:id>/', views.category, name='CategoryId'),
    path('categories/<int:id>/articles/', views.articlesFromCategory, name='ArticlesFromCategory'),
    #latest modification
]