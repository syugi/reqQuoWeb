module.exports = {
   HTML:function(title, body ,header, footer ){
	  return `
	  <!doctype html>
	  <html>
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" type="text/css" href="/css/reset.css">
		<link rel="stylesheet" type="text/css" href="/css/default.css">
		<title>${title}</title>
 
		<!--tailwind-->
		<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

		<!--Swiper-->
		<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css">
		<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">

		<!--다음 우편번호-->
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
			
	  </head>
	  <body>
		<div id="wrap">
			<header class="header">
				${header}
			</header>

			${body}

			<footer class="footer">
				${footer}
			</footer>
		</div>
	  </body>
	  </html>

		<!-- Swiper JS -->
		<script src="https://unpkg.com/swiper/js/swiper.js"></script>
		<script src="https://unpkg.com/swiper/js/swiper.min.js"></script>
		<script>
			
			<!-- 회사소개 슬라이드--> 
			var swiper = new Swiper('.company_page', {
			  loop: true,
			  // autoHeight: true, 
			  // autoplay: {
			  //   delay: 5000,
			  //   disableOnInteraction: false,
			  // },
			  pagination: {
				el: '.companyPagin',
				type: 'fraction',
			  },
			  navigation: {
				nextEl: '.companyNextBtn',
				prevEl: '.companyPrevBtn',
			  },

			});

		</script>	
	  `;
  
  },list :function(arr){
		
		let list = '<ul>';
		arr.forEach((item) => {
			list += `<li>${item}</li>`;
		});
		list += '</ul>';

		return list;
	}

}
			
		