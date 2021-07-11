from JSPyBridge import require
cheerio = require('cheerio');
C = cheerio.load('<h2 class="title">Hello world</h2>')

C('h2.title').text('Hello there!')
C('h2').addClass('welcome')

print(C.html())