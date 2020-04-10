var express = require('express');
const template = require('../views/template/template.js');		
const home = require('../views/home.js');	 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = "한국건축설비누수";
  const body  = `${home.html()}`;
  const link  = `
		<!--Swiper-->
		<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css">
		<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">
		`;
  const script = `
		<!-- Swiper JS -->
		<script src="https://unpkg.com/swiper/js/swiper.js"></script>
		<script src="https://unpkg.com/swiper/js/swiper.min.js"></script>
		<script>
			
			<!-- 회사소개 슬라이드--> 
			var swiper = new Swiper('.company_page', {
			  loop: true,
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
  const html = template.HTML(title,link, body,script);
  res.send(html);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
