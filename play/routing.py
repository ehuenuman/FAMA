from channels import route
from apps.wsocket.consumers import *

channel_routing = [
 # Las funciones se definen en consumers.py
 route("websocket.connect", ws_connect),
 route("websocket.receive", ws_receive),
]