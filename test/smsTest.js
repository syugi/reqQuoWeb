const smsSend = require('../lib/smsSend.js');
const TEST_TELNO = "01091798723";

const params = {
  text : '[쿨에스엠에스 테스트]\n이름 :허미숙\n 감사합니다.\n 견적내용 : 누수됩니다. https://reqquowebwithdb-ypbzr.run.goorm.io', // 문자 내용
  to   : TEST_TELNO,// 수신번호 (받는이 :업체)
  from : TEST_TELNO,             // 발신번호 (보낸이 :고객)
  type : "LMS",
  subject : "테스트입니다"  
}

smsSend.sendSms(params);
