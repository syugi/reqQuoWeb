const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const template = require('./lib/template.js');		
const common = require('./html/common.js');	
const home = require('./html/home.js');	 
const reqQuote = require('./html/reqQuote.js');	 


const TITLE = '한국건축설비누수'; 
		
const app = http.createServer(function(request,response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
     
		const body  = `${home.html()}`;

		const html = template.HTML(TITLE, body , common.header(), common.footer());

		response.writeHead(200);
		response.end(html);
          
	}else if(pathname === "/company"){ /*회사소개*/
		const testurl = '/test.html';
		
		response.writeHead(200);
     	response.end(fs.readFileSync(__dirname + testurl));
	
		
	}else if(pathname === "/reqQuote"){ /*견적요청*/
		
		const body  = `${reqQuote.html()}`;

		const html = template.HTML(TITLE, body , common.header(), common.footer());

		response.writeHead(200);
		response.end(html);
		
    } else {
		response.writeHead(404);
		response.end('Not found');
    }
 
 
});
app.listen(3000);