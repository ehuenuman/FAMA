"""
ASGI entrypoint file for default channel layer.

Points to the channel layer configured as "default" so you can point
ASGI applications at "play.asgi:channel_layer" as their channel layer.

For more information on this file, see
http://channels.readthedocs.io/en/stable/deploying.html?highlight=asgi.py#run-interface-servers
https://github.com/andrewgodwin/channels-examples
"""

import os

from channels.asgi import get_channel_layer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "play.settings")

channel_layer = get_channel_layer()