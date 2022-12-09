from django.db import models
from django.urls import reverse


class Region(models.Model):
    title = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/regions', blank=True)
    slug = models.SlugField(max_length=255, verbose_name='Url_reg', unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Регион'
        verbose_name_plural = 'Регионы'
        ordering = ['title']

    def get_absolute_url(self):
        return reverse('region', kwargs={"slug": self.slug})


class Category(models.Model):
    title = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/categories', blank=True)
    slug = models.SlugField(max_length=50, verbose_name='Url_slug', unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['title']

    def get_absolute_url(self):
        return reverse('category', kwargs={"slug": self.slug})


class Post(models.Model):
    title = models.CharField(max_length=255, verbose_name='Полное ФИО')
    slug = models.SlugField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, verbose_name='Фамилия')
    last_name = models.CharField(max_length=255, verbose_name='Имя, Отчество')
    subtitle = models.CharField(max_length=100, verbose_name='Профессия, должность')
    content = models.TextField(blank=True, verbose_name='Текст статьи')
    content_file = models.FileField(upload_to='content_file/%Y/%m/%d', blank=True, verbose_name='Фаил статьи')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Опубликовано')
    photo = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, verbose_name='Превью')
    photo2 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, verbose_name='Основное фото в статье')
    views = models.IntegerField(default=0, verbose_name='Количество просмотров')
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='posts')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='posts')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано или нет')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'
        ordering = ['title']

    def get_absolute_url(self):
        return reverse('post', kwargs={"slug": self.slug})

