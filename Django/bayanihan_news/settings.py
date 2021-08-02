from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

try:
    from .settings_config.base import *
except ImportError as e:
    pass

# try:
#     from .settings_config.development import *
# except ImportError:
#     pass

try:
    from .settings_config.production import *
except ImportError:
    pass

import django_heroku
django_heroku.settings(locals())
