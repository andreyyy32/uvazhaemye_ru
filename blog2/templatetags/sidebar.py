from django import template
from blog2.models import Post, Region, Category
import random

register = template.Library()


@register.inclusion_tag('blog2/regions_tpl.html')
def get_region():
    regions = Region.objects.all()
    return {"regions": regions}


@register.inclusion_tag('blog2/categories_tpl.html')
def get_category():
    categories = Category.objects.all()
    return {"categories": categories}


@register.inclusion_tag('blog2/random_posts_tpl.html')
def get_random_posts():
    random_posts = list(Post.objects.all())
    posts = random.sample(random_posts, min(len(random_posts), 3))
    return {"posts": posts}

@register.inclusion_tag('blog2/home_list_tpl.html')
def get_home_list():
    posts = Post.objects.all()
    return {"posts": posts}