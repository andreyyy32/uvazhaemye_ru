from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import *
from django.db.models import F
from .forms import FormApplication


class Home(ListView):
    model = Post
    template_name = 'blog2/index.html'
    context_object_name = 'posts'
    # paginate_by = 4

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = ''
        return context

    def get_queryset(self):
        return Post.objects.filter(is_published=True)


class PostsByCategory(ListView):
    template_name = 'blog2/index.html'
    context_object_name = 'posts'
    # paginate_by = 4
    allow_empty = False

    def get_queryset(self):
        return Post.objects.filter(category__slug=self.kwargs['slug'],  is_published=True)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "" + str(Category.objects.get(slug=self.kwargs['slug']))
        return context


class PostsByRegion(ListView):
    template_name = 'blog2/index.html'
    context_object_name = 'posts'
    # paginate_by = 4
    allow_empty = False

    def get_queryset(self):
        return Post.objects.filter(region__slug=self.kwargs['slug'], is_published=True)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "" + str(Region.objects.get(slug=self.kwargs['slug']))
        return context


class GetPost(DetailView):
    model = Post
    template_name = 'blog2/single.html'
    context_object_name = 'post'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        self.object.views = F('views') + 1
        self.object.save()
        self.object.refresh_from_db()
        return context


class Search(ListView):
    template_name = 'blog2/search.html'
    context_object_name = 'posts'
    # paginate_by = 4

    def get_queryset(self):
        return Post.objects.filter(title__icontains=self.request.GET.get('s'), is_published=True) or Post.objects.filter(subtitle__icontains=self.request.GET.get('s'), is_published=True)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['s'] = f"s={self.request.GET.get('s')}&"
        return context


def form_app(request):
    if request.method == 'POST':
        pass
    else:
        form = FormApplication
    return render(request, 'blog2/form_app.html', {'form': form})


def agreement(request):
    return render(request, 'blog2/agreement.html')


def privacy_policy(request):
    return render(request, 'blog2/privacy_policy.html')



