from django.db import models
from datetime import timezone
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100);
    timestamp = models.DateTimeField('date modified', auto_now=True)

    def jsonifiable(self): 
        return ({
            'id': self.id,
            'name': self.name,
            'datetime': self.timestamp.isoformat(),
            'timestamp': self.timestamp.replace(tzinfo=timezone.utc).timestamp()
        })

    def __str__(self):
        return self.name;

class Article(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    timestamp = models.DateTimeField('date modified', auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def jsonifiable(self): 
        return ({
            'id': self.id,
            'title': self.title, 
            'text': self.text,
            'category': self.category.id,
            'datetime': self.timestamp.isoformat(),
            'timestamp': self.timestamp.replace(tzinfo=timezone.utc).timestamp()
        })

    def __str__(self):
        return self.title;
