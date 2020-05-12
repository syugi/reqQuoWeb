const express    = require('express');
const router     = express.Router();   
const template   = require('../views/template/template.js');		 
const db         = require('../model/db_conn.js');
const config     = require('../config/config');


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   const title = config.company_name;
//   const body  = `${reqQuote.html()}`;
//   const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
//   const script = `
// 		<!--다음 우편번호-->
//     	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

// 		<script src="/javascripts/reqQuote.js"></script>
// 		`;
//   const html = template.HTML(title,link, body,script);
//   res.send(html);
// });


router.get('/', function(req, res, next) {
   
   const sql = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST";
        
   db.query(sql, [], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);
     
     let list = `<table class="min-w-full bg-white">
     <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">REQ_ID</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">CUST_NM</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">TEL_NO</th>
          <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">DESCR</td>
        </tr>
      </thead>
      <tbody class="text-gray-700">`;
     
      result.forEach((data)=>{
        list += '<tr>';
        list += `<td class="text-left py-3 px-4">${data.REQ_ID}</td>`;
        list += `<td class="text-left py-3 px-4">${data.CUST_NM}</td>`;
        list += `<td class="text-left py-3 px-4"><a class="hover:text-blue-500" href="tel:${data.TEL_NO}">${data.TEL_NO}</a></td>`;
        list += `<td class="w-1/3 text-left py-3 px-4">${data.DESCR}</td>`;
        list += '</tr>';

      });		

      list += `</tbody>
              </table>`;
     
      const title = config.company_name;
      const body  = `<section style="order:3; width:100%; ">
              <div class="shadow overflow-hidden rounded border-b border-gray-200">
              ${list}
              </div>
             </section>`;
      const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
      const script = ``;
      const html = template.HTML(title,link, body,script);
      res.send(html); 
     
   });  
});

router.get('/detail', function(req, res, next) {
   
   const selectReqQuote = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST WHERE REQ_ID = ?";
        
   db.query(selectReqQuote, [req.query.id], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);
     
      const data = result[0];
      const reqId = data.REQ_ID;
     
     //첨부파일 조회 
     const selectFileList = "SELECT FILE_SEQ, REQ_ID, ORG_FILE_NM, STR_FILE_NM, FILE_PATH, FILE_SIZE, FILE_TYPE , FILE_DESCR , USE_YN, CREATED_DT FROM ATCH_FILE_LIST WHERE REQ_ID = ? AND USE_YN = 'Y'";

     db.query(selectFileList, [reqId], function(error, fileResult){
        if(error){
          throw error;
        }
     
         let fileList = "";
         fileResult.forEach((file)=>{
            fileList += '<tr>';
            fileList += `<td class="text-left py-3 px-4">${file.FILE_SEQ}</td>`;
            fileList += `<td class="text-left py-3 px-4">${file.STR_FILE_NM}</td>`;
            fileList += `<td class="text-left py-3 px-4">${file.FILE_PATH}</td>`;
            fileList += `<td class="text-left py-3 px-4">${file.FILE_TYPE}</td>`;
            fileList += `<td class="text-left py-3 px-4">${file.FILE_DESCR}</td>`;
            fileList += `<td class="w-1/3 text-left py-3 px-4"><img src="uploads/${file.STR_FILE_NM}" alt=""></td>`;
           
            fileList += '</tr>';
          });		
       
       
          const title = config.company_name;
          const body  = `
                <section style="order:3; width:100%; ">
                  <form method="POST" enctype="multipart/form-data" action="/admin/confirm">  
                    <table>
                      <tr class="hidden">
                        <td class="text-right py-3 px-4">REQ ID</td>
                        <td>${data.REQ_ID}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 px-4">이름</td>
                        <td>${data.CUST_NM} ${data.CUST_TYPE == null? "" : data.CUST_TYPE}</td>
                      </tr>
                       <tr>
                        <td class="text-right py-3 px-4">휴대폰 번호</td>
                        <td>${data.TEL_NO}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 px-4">업종</td>
                        <td>${data.UPJONG}</td>
                      </tr>
                      <tr class="hidden">
                        <td class="text-right py-3 px-4">보일러 구분</td>
                        <td>${data.CUST_TYPE == null? "" : data.BOILER_TYPE}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 px-4">주소</td>
                        <td>${data.ADDR} ${data.DTL_ADDR} ${data.EXT_ADDR}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 px-4">상세내용</td>
                        <td>${data.DESCR}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 px-4">첨부파일(현장사진)</td>
                        <table>
                          ${fileList}
                        </table>
                      </tr>
                    </table> 
                    <p class="py-4">
                       <input type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" value="확인" name="submit">
                    </p>
                  </form>
                 </section>`;
          const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
          const script = ``;
          const html = template.HTML(title,link, body,script);
          res.send(html); 
     });
   });  
});

  
router.post('/confirm', function(req, res, next){
	console.log('견적요청 확인처리되었습니다.');
	res.redirect( '/admin');
});

module.exports = router;
