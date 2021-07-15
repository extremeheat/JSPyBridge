import time
from javascript import require
http = require('http')

def handler(this, req, res):
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World!')

http.createServer(handler).listen(8080)
# Keep the Python process alive
time.sleep(100)