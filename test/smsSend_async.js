const smsConf = require('../config/sms_config');
const { config, Group } = require('coolsms-node-sdk')

config.init({ 
  apiKey : smsConf.apiKey, 
  apiSecret : smsConf.apiSecret
})
async function send (params = {}) {
  try {
    const response = await Group.sendSimpleMessage(params)
    console.log("response : " + response)
    return response;
  } catch (e) {
    console.log("ㅇㅔ러 : "+JSON.stringify(e));
    //throw new Error(e);
    throw e;
  }
}

// 테스트용 
// const params = {
//   subject :"발송테스트입니다", //MMS, LMS인 경우 필수
//   text: '[쿨에스엠에스 테스트]\n이름 :허미숙\n 감사합니다.\n 견적내용 : 누수됩니다. https://reqquowebwithdb-ypbzr.run.goorm.io', // 문자 내용
//   type: 'LMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
//   to: '01091798723', // 수신번호 (받는이)
//   from: '01091798723' // 발신번호 (보내는이)
// }
//send(params);

 exports.sendSms = (req) => {
    // const number = req.body.number;              // SMS 전송할 번호
    // const message = req.body.message;            // SMS 전송할 메시지
    
    // console.log(" > number: " + number);
    // console.log(" > message: " + message);
 
    try {
           const res = send({
            subject: req.subject,
            to: req.from, // req.to, //테스트중 
            text: req.text,
            type: req.type, 
            from: req.from
            })
        console.log(req);
        console.log("aa전송결과 : "+JSON.stringify(res));
       return "true";
      //res.json( {result: true} );
    } catch (e) {
       console.log("에러는 여기로!!");
        console.log(e);
       return "sms transmission failed"; 
      //res.json( {result: false, message: 'sms transmission failed'} );
    }
};
  
                    