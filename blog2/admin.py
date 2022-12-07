from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from django.utils.safestring import mark_safe

from .models import *


class PostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Post
        fields = '__all__'


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    form = PostAdminForm
    save_as = True
    save_on_top = True
    list_display = ('id', 'title', 'first_name', 'last_name', 'subtitle', 'slug', 'category', 'created_at', 'get_photo', 'is_published')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'context')
    list_editable = ('is_published',)
    list_filter = ('category', 'region')
    readonly_fields = ('views', 'created_at', 'get_photo')
    fields = (
        'title',  'first_name', 'last_name', 'subtitle', 'slug', 'category', 'region', 'content', 'photo', 'photo2', 'get_photo', 'views', 'created_at', 'is_published')

    def get_photo(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" width="50">')
        return '-'

    get_photo.short_description = 'Фото'


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('id', 'title', 'photo', 'slug',)
    list_display_links = ('id', 'title')


class RegionAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('id', 'title', 'photo', 'slug',)
    list_display_links = ('id', 'title')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Region, RegionAdmin)
admin.site.register(Post, PostAdmin)
