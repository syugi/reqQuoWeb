const smsSend = require('./lib/smsSend.js');

const params = {
  text: '[쿨에스엠에스 테스트]\n이름 :허미숙\n 감사합니다.\n 견적내용 : 누수됩니다. https://reqquowebwithdb-ypbzr.run.goorm.io', // 문자 내용
  to: '01091798723', // 수신번호 (받는이)
}

smsSend.sendSms(params);
