const common = require('./common.js');	 

exports.HTML = function(title, link, body , script){  
	  return `
	  <!doctype html>
	  <html>
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="/stylesheets/default.css">
		<link rel="stylesheet" href="/stylesheets/reset.css">

    <link rel="stylesheet" href="/build/tailwind.css">

		<title>${title}</title>

    <meta property="og:type" content="website"> 
    <meta property="og:title" content=${title}>
    <meta property="og:description" content="20년 경력 전문가, 전문건설업 등록업체, 최첨단 전문 장비 보유, 시공후 2년 무료 A/S, 인천 부천 전지역 가능">
    <!--<meta property="og:image" content="http://www.mysite.com/myimage.jpg">-->
    <meta property="og:url" content="http://www.hknusu.com">
    <meta name="description" content="20년 경력 전문가, 전문건설업 등록업체, 최첨단 전문 장비 보유, 시공후 2년 무료 A/S, 인천 부천 전지역 가능">
      
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168375104-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-168375104-1');
    </script>

      
		${link}

		<!--tailwind-->
		<!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->

	  </head>
	  <body>
		<div id="wrap">
			<header class="header">
				${common.header()}
			</header>

			${body}

			<footer class="footer">
				${common.footer()}
			</footer>
		</div>
	  </body>
	  </html>

	  <script src="/javascripts/common.js"></script>
   
		${script}
	  `;
  
  }
	
exports.list = function(arr){  	
	let list = '<ul>';
	arr.forEach((item) => {
		list += `<li>${item}</li>`;
	});
	list += '</ul>';

	return list;
}


			
		