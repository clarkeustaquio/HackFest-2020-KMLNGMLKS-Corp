import os
from bayanihan_news.settings import BASE_DIR
# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    # Apps
    'api',
    'authorize_users',

    # DRF
    'rest_framework.authtoken',

    # Installed
    'rest_framework',
    'corsheaders',
    'twilio',
    'bootstrap4',
    'django_celery_results',
    'django_celery_beat',

    # Default
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # Cors
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'bayanihan_news.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bayanihan_news.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_USER_MODEL = 'authorize_users.AuthorizeUser'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Specifies what to append when calling {% static %}
STATIC_URL = '/static/'
# After executing collectstatic, it will store all static files in this folder. staticfiles will automatically generated.
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Folder where you store all the files, format = app_name/folder_name
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

# This is a media folder that will automatically generated by django, which contains all of the uploaded files in the static folder.
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# Specifies what to append on the url
MEDIA_URL = 'media/'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_METHODS = ['POST', 'GET', 'PUT', 'DELETE']
CORS_ALLOW_HEADERS = [   
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

CELERY_TIMEZONE = 'Asia/Manila'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_RESULT_BACKEND = 'django-db'
CELERY_TASK_SERIALIZER = 'json'
