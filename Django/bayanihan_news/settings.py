try:
    from .settings_config.base import *
except ImportError as e:
    pass

try:
    from .settings_config.development import *
except ImportError:
    pass

try:
    from .settings_config.production import *
except ImportError:
    pass