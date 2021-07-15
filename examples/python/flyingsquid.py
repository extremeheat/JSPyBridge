import time
from javascript import require
mcServer = require('flying-squid')

mcServer.createMCServer({
  'motd': 'A Minecraft Server \nRunning flying-squid',
  'port': 25565,
  'max-players': 10,
  'online-mode': True,
  'logging': True,
  'gameMode': 1,
  'difficulty': 1,
  'worldFolder': 'world',
  'generation': {
    'name': 'diamond_square',
    'options': {
      'worldHeight': 80
    }
  },
  'kickTimeout': 10000,
  'plugins': {

  },
  'modpe': False,
  'view-distance': 10,
  'player-list-text': {
    'header': 'Flying squid',
    'footer': 'Test server'
  },
  'everybody-op': True,
  'max-entities': 100,
  'version': '1.16.1'
})
time.sleep(1000)