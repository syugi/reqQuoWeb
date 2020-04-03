const http = require('http');
const url = require('url');
const qs = require('querystring');

function templateHTML(title, body){
  
  const header = templateHeader();
  
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="css/default.css">
    <title>${title}</title>
    
    <!--tailwind-->
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    
    <!--Swiper-->
    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">

  </head>
  <body>
    <div id="wrap">
      <header class="header">
  			${header}
  		</header>
		
      ${body}
      <footer class="footer">
  			<p>copyright&copy;한국건축설비누수 all rights reserved.</p>
  		</footer>
    </div>
  </body>
  </html>
  `;
}

function templateHeader(filelist){
  
  const menuList = [
    {url:"index.html"                   , menuNm:"홈"      },
    {url:""                             , menuNm:"회사소개"},
    {url:"http://blog.naver.com/h0661h" , menuNm:"시공사례"},
    {url:"reqQuote.html"                , menuNm:"견적요청"}
  ];
    
  let list = '<ul>';
  
  return list + '</ul>';

  
  
//   <h1 class="logo">
// 		<a href="index.html">한국건축설비누수</a>
// 	</h1>
// 	<nav class="nav">
// 		<ul class="gnb">
// 			<li><a href="index.html">홈</a><span class="sub_menu_toggle_btn">하위 메뉴 토글 버튼</span></li>
// 			<li><a href="">회사소개</a><span class="sub_menu_toggle_btn">하위 메뉴 토글 버튼</span></li>
// 			<li><a href="http://blog.naver.com/h0661h">시공사례</a><span class="sub_menu_toggle_btn">하위 메뉴 토글 버튼</span></li>
// 			<li><a href="reqQuote.html">견적요청</a><span class="sub_menu_toggle_btn">하위 메뉴 토글 버튼</span></li>
// 		</ul>
// 	</nav>
// 	<span class="menu_toggle_btn">전체 메뉴 토글 버튼</span>
  
}
  
// function templateList(filelist){
//   var list = '<ul>';
//   var i = 0;
//   while(i < filelist.length){
//     list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
//     i = i + 1;
//   }
//   list = list+'</ul>';
//   return list;
// }

const app = http.createServer(function(request,response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      
      const title = '한국건축설비';
      // var description = 'Welcome';
      const template = templateHTML(title, `<h2>${title}</h2>Welcome`);
      
      response.writeHead(200);
      response.end(template);
          
		
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
 
 
});
app.listen(3000);