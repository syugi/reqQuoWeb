const template = require('../views/template/template.js');		
const reqQuote = require('../views/reqQuote.js');	 
const express  = require('express');
const db = require('../model/db_conn.js');
const config = require('../config/config');
const smsConf = require('../config/sms_config');
const comLib  = require('../lib/comLib');
const router   = express.Router();     

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = config.company_name;
  const body  = `${reqQuote.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
  const script = `
		<!--다음 우편번호-->
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

		<script src="/javascripts/reqQuote.js"></script>
		`;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


router.get('/send', function(req, res, next) {
    const title = config.company_name;
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

router.post('/send_process', function(req, res, next){
	//console.log('견적요청 전송되었습니다.');
	//res.redirect( '/reqQuote');
	
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
  
  const sql = "INSERT INTO REQ_QUOTE_LIST ( ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE ) VALUES (0, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)";
        
  db.query(sql, [ post.custNm, post.telNo, null, null, post.upjong, post.boilerType, post.postCode, post.addr, post.dtlAddr, post.extAddr, post.descr, post.custType], function(error, result){
    if(error){
      throw error;
    }

    const sql2 = "INSERT INTO SEND_MSG_LIST ( SEQ, REQ_DATE, TO_TELNO, FROM_TELNO, SUBJECT, CONTENTS, MSG_TYPE, SEND_YN ) VALUES (0, ?, ?, ?, ?, ? ,?, ?)";
    const reqDate = "20200420";
    const contents = "메세지내용";
    db.query(sql2 , [ reqDate, post.telNo, smsConf.from, smsConf.comp_subject, contents, smsConf.type, "N"], function(error, result){
      if(error){
        throw error;
      }

      console.log('견적요청 전송되었습니다.');
      res.redirect( '/reqQuote/send');
                      
    });  
             
  });       
  
});

module.exports = router;
