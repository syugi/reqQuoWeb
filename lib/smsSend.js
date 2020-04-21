const smsConf = require('../config/sms_config');
const { config, Group } = require('coolsms-node-sdk')

config.init({ 
  apiKey : smsConf.apiKey, 
  apiSecret : smsConf.apiSecret
})
async function send (params = {}) {
  try {
    const response = await Group.sendSimpleMessage(params)
    //console.log(response)
    return response;
  } catch (e) {
    //console.log(e)
    throw new Error(e);
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

 exports.sendSms = (params, res) => {
    // const number = req.body.number;              // SMS 전송할 번호
    // const message = req.body.message;            // SMS 전송할 메시지
    
    // console.log(" > number: " + number);
    // console.log(" > message: " + message);
 
    try {
        var res = send({
            subject: params.subject,
            to: smsConf.from, // params.to, //테스트중 
            text: params.text,
            type: smsConf.type, 
            from: smsConf.from
        })
        console.log(params);
       res.json( {result: true} );
    } catch (e) {
        console.log(e);
       res.json( {result: false, message: 'sms transmission failed'} );
    }
};
  
                    