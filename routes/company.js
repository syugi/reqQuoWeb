const template = require('../views/template/template.js');		
const company = require('../views/company.js');	  
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = "한국건축설비누수";
  const body  = `${company.html()}`;
  const link  = ``;
  const script = `
		<!--다음 우편번호-->
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		`;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});

module.exports = router;
