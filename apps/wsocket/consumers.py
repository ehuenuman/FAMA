import json
import logging
from channels import Channel
from channels.sessions import channel_session
from play.celery import app

log = logging.getLogger(__name__)

@channel_session
def ws_connect(message):
    message.reply_channel.send({
        "text": json.dumps({
        "action": "reply_channel",
        "reply_channel": message.reply_channel.name,
        })
    })

@channel_session
def ws_receive(message):
    try:
        data = json.loads(message['text'])
    except ValueError:
        log.debug("ws message isn’t json text=%s", message['text'])
        return
    if data:
        reply_channel = message.reply_channel.name
        if data['action'] == "long_process":
            long_process(data, reply_channel)
        else:
            Channel(reply_channel).send({
                "text": json.dumps ({
                    "action": "completed",
                    "content": "short_process"
                })
            })