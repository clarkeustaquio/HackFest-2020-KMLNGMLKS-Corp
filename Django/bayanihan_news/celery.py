import os

from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bayanihan_news.settings')

app = Celery('bayanihan_news')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Send daily_news every 10 am and 8 pm
app.conf.beat_schedule = {
    'every-day-between-10AM-&&-8PM': {
        'task': 'api.tasks.send_request',
        'schedule': crontab(hour='10, 20', minute=0),
    },
}

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')