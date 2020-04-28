const template   = require('../views/template/template.js');		
const reqQuote   = require('../views/reqQuote.js');	 
const db         = require('../model/db_conn.js');
const config     = require('../config/config');
const smsConf    = require('../config/sms_config');
const smsSend    = require('../lib/smsSend.js');
const express    = require('express');
const dateformat = require('date-format');
const router     = express.Router();     

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
	
  //견적요청 저장
  const sql = "INSERT INTO REQ_QUOTE_LIST ( REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE ) VALUES (0, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)";
        
  db.query(sql, [ post.custNm, post.telNo, null, null, post.upjong, post.boilerType, post.postCode, post.addr, post.dtlAddr, post.extAddr, post.descr, post.custType], function(error, result){
    if(error){
      throw error;
    }

    //메시지 발송 내역 저장
    const sql2 = "INSERT INTO SEND_MSG_LIST ( SEQ, REQ_ID, REQ_DATE, TO_TELNO, FROM_TELNO, SUBJECT, CONTENTS, MSG_TYPE, SEND_YN ) VALUES (0, ?, ?, ?, ?, ?, ? ,?, ?)";

    const reqId    = 0; //견적요청 저장후받아오기  
    const reqDate  =  dateformat.asString('yyyyMMdd', new Date());
    const contents =  getMsgContents(reqId, reqDate, post.custNm, post.telNo, post.upjong, post.boilerType, post.addr ,post.dtlAddr, post.extAddr, post.descr, post.custType);
    console.log('reqDate : '+reqDate+'\n contents : ' +contents);
    db.query(sql2 , [ reqId, reqDate, smsConf.from, post.telNo , smsConf.comp_subject, contents, smsConf.type, "N"], function(error, result){
      if(error){
        throw error;
      }
      
      
      // //업체에 견적요청 메시지 발송 
      // const params = {
      //   subject : smsConf.comp_subject, // 제목 (LMS 필수)
      //   text    : contents,             // 문자 내용
      // to      : smsConf.comp_telNo,   // 수신번호 (받는이 :업체)
      //   from    : post.telNo,             // 발신번호 (보낸이 :고객)
      //   type    : smsConf.type          // 구분(SMS,LMS,알림톡) 
      // }
      // smsSend.sendSms(params);
     
  
      console.log('견적요청 전송되었습니다.');
      res.redirect( '/reqQuote/send');
                      
    });  
             
  });       
  
});


function getMsgContents(reqId, reqDate, custNm, telNo, upjong, boilerType, addr, dtlAddr, extAddr, descr, custType){
    return `견적요청 ID : ${reqId}\n요청일자 : ${reqDate}\n요청자명 : ${custNm}\n전화번호 : ${telNo}\n업종 : ${upjong}`
}

module.exports = router;
