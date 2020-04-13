const template = require('../views/template/template.js');		
const reqQuote = require('../views/reqQuote.js');	 
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = "한국건축설비누수";
  const body  = `${reqQuote.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
  const script = `
		<!--다음 우편번호-->
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		`;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});

router.post('/send_process', function(req, res, next){
	//console.log('견적요청 전송되었습니다.');
	//res.redirect( '/reqQuote');
	
	const post = req.body;
	 console.log("post --> "+JSON.stringify(post));
	 const custName = post.custName;
	 const telNo = post.telNo;
	 const upjong = post.upjong;
	 const boilerType = post.boilerType;
	
	 console.log("custName --> "+custName);
	 console.log("telNo --> "+telNo);
	 console.log("upjong --> "+upjong);
	
	const title = "한국건축설비누수";
    const body  = `<section style="order:3; width:100%; height:300px; ">
						<p>견적요청이 완료되었습니다.</p>
				   	 	<button onclick="location.href='/'">확인</button>
				   </section>`;
    const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
    const script = `
		<!--다음 우편번호-->
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		`;
	const html = template.HTML(title,link, body,script);
	res.send(html);
});

module.exports = router;
