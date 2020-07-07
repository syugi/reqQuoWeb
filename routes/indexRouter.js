const express  = require('express'); 
const router   = express.Router();
const template = require('../views/template/template.js');		
const home     = require('../views/home.js');	
const config   = require('../config/config');


const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

   // fs.readFile('./public/data.json', function(error, dataList){
   // req.list = dataList;
   // });
	
  const title = config.company_name+" : 누수탐지전문공사";
  const body  = `${home.html()}`;
  const link  = `
		<!--Swiper-->
		<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css">
		<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
		
		`;
  const script = `
 		<script src="/javascripts/index.js"></script>

		<!-- Swiper JS -->
		<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
		<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
		<script>
			
			<!-- 블로그 슬라이드--> 
			var blogSwiper = new Swiper('.blog_contain', {
				loop: true,
				slidesPerView: 2, <!-- wrap.offsetWidth < 768 ? 2 : 4,-->
				spaceBetween: 30,
				centeredSlides: true,
				pagination: {
					el: '.blogPagin',
					clickable: true,
				},

				breakpoints: {
					320: {
					  slidesPerView: 2,
					  spaceBetween: 20
					},
					// when window width is >= 480px
					768: {
					  slidesPerView: 3,
					  spaceBetween: 30
					},
					// when window width is >= 640px
					960: {
					  slidesPerView: 4,
					  spaceBetween: 40
					}
				  }
			});
			

			<!-- 회사소개 슬라이드--> 
			var swiper = new Swiper('.company_page', {
				loop: true,
				pagination: {
				<!--el: '.companyPagin',-->
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
