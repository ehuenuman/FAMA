from channels import route
from apps.wsocket.consumers import *

channel_routing = [
    route("websocket.connect", ws_connect, path=r"^/ws/play/(?P<room_name>[a-zA-Z0-9_]+)/$"),
    #route("websocket.receive", ws_message, path=r"^/ws/play/(?P<room_name>[a-zA-Z0-9_]+)/$"),
    route("websocket.disconnect", ws_disconnect, path=r"^/ws/play/(?P<room_name>[a-zA-Z0-9_]+)/$"),
]