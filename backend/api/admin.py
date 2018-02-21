from django.contrib import admin

from .models import Category, Article

admin.site.register(Category)

admin.site.register(Article)

'''
class Category(models.Model):
    name = models.CharField(max_length=100);
    timestamp = models.DateTimeField('date modified', auto_now=True, editable=False)

    def __str__(self):
        return name;

class Article(models.Model):
    title = models.CharField(max_length=200)
    timestamp = models.DateTimeField('date modified', auto_now=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return title;
*/'''