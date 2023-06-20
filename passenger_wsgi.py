# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, '/var/www/***********/data/www/uvazhaemye.ru/site_blog')
sys.path.insert(1, '/var/www/***********/data/uvazhaemyeenv/lib/python3.9/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'site_blog.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
