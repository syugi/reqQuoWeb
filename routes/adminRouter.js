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
      const body  = `<section style="order:3; width:100%; height:500px; ">
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


module.exports = router;
