var express = require('express');
var feed = require('feed-read'),  
    http = require("http"), 
    urls = [
        "https://www.057.ua/rss"//test rss: https://www.rt.com/rss/ https://www.057.ua/rss
    ]; 
var app = express();

app.get('/', function (req, res) {
	
	var css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/foundation.min.css"> ';
	css = css + '<style type="text/css">' +require('fs').readFileSync('./style.css').toString() + '</style>';
	  res.writeHead(200, {
		  "Content-Type": "text/html; charset=utf-8",
		  "Transfer-Encoding": "chunked"
	  });
	  res.write("<html>\n<head>\n<title>Parse RSS</title>\n" +css +"</head>\n<body>");
	  res.write("<h3 style=text-align:center;>This is just start page</br>If you go to get news then go --/news/<count> - where <count> number of news  </h3>");
	  res.end("</body>\n</html>");
	
});

app.get('/news/', function (req, res) {
	
	var css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/foundation.min.css"> ';
	css = css + '<style type="text/css">' +require('fs').readFileSync('./style.css').toString() + '</style>';
	  res.writeHead(200, {
		  "Content-Type": "text/html; charset=utf-8",
		  "Transfer-Encoding": "chunked"
	  });
	
	  res.write("<html>\n<head>\n<title>Parse RSS</title>\n" +css +"</head>\n<body>");
	  res.write("<h3 style=text-align:center;>Please enter count page</br>IIf you go to get news then go --/news/<count> - where <count> number of news  </h3>");
	  res.end("</body>\n</html>");
	  
});

app.get('/news/:count', function (req, res) {
	var count = req.params.count;
	
	var css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/foundation.min.css"> ';
	css = css + '<style type="text/css">' +require('fs').readFileSync('./style.css').toString() + '</style>'

	  res.writeHead(200, {
		  "Content-Type": "text/html; charset=utf-8",
		  "Transfer-Encoding": "chunked"
	  });

	  res.write("<html>\n<head>\n<title>Parse RSS</title>\n" +css +"</head>\n<body>");

	  for (var j = 0; j < urls.length; j++) {
		feed(urls[j], function(err, articles) {
		  var i = 0;
		  while(i < articles.length){
			if (i==count){
				res.end("</body>\n</html>"); 
				break;
			}
			displayArticle(res, articles[i]);
			if( i === articles.length-1 && j === urls.length-1) {
			  res.end("</body>\n</html>"); 
			} 
			i++;
		  }//end cicle
		}); 
	  } 
	  
	  setTimeout(function() {
		res.end("</body>\n</html>"); 
	  }, 4000);


	function displayArticle(res, a) {
	  var linknews = a.link || a.feed.link;
	  res.write('<div class="article">')
	  res.write("<h3>"+a.title +"</h3>");
	  res.write("<p><a>" +linknews +"</a><strong> - " +"link to the original</br></br>"+a.published +"</strong></br> <br />\n");
	  res.write(a.content+"</p> </div>\n");
	}
});

const port = process.env.PORT || 3000;
app.listen(port);
