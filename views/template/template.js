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
				
	  <script src="/javascripts/index.js"></script>
   
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


			
		