from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField()
    genre = models.CharField()
    director = models.CharField()
    release_year = models.IntegerField()
    rating = models.FloatField()
    poster = models.ImageField()