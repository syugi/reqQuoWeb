const mysql = require('mysql');
const dbConfig = require('../config/db_config');

const db =  mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
}); 

//데이터베이스 생성!
//CREATE SCHEMA  HKNS: 

//견적요청리스트 테이블 생성 
const create_reqQuoteList = `
        CREATE TABLE REQ_QUOTE_LIST(
              ID          INT NOT NULL AUTO_INCREMENT
            , CUST_NM     varchar(20)  not null
            , TEL_NO      varchar(20)  not null
            , EMAIL_ID    varchar(160)
            , EMAIL_DOWN  varchar(200)
            , UPJONG      varchar(20) 
            , BOILER_TYPE varchar(20) 
            , POST_CODE   varchar(6)  
            , ADDR        varchar(200) 
            , DTL_ADDR    varchar(300) 
            , EXT_ADDR    varchar(300) 
            , DESCR       varchar(1000) 
            , CUST_TYPE   varchar(20)
            , CREATED_AT DATETIME not null default now()
            , primary key(id)
            , unique index name_unique (CUST_NM ASC)
         )
         comment = '견적요청리스트'
         default charset = utf8
         engine=InnoDB `;


db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
	
  //견적요청 테이블  생성
  createTable("REQ_QUOTE_LIST", create_reqQuoteList);

});


/*
 * 테이블 생성
 */
function createTable(tableNm , sql){
  
  const existSql = `SHOW TABLES LIKE '${tableNm}'`;
  db.query(existSql, function (err, result) {
    if (err) throw err;

    if(result.length > 0){
        console.log(`[Already Exists] ${tableNm} 테이블이 생성되어있습니다.`);
      
    }else{
        console.log(`[Create Start] ${tableNm} 테이블을 생성합니다.`);

         db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(`[Create E n d] ${tableNm} 테이블이 생성되었습니다.`);
         });
    }
  });
  
}


/*
 * 테이블 삭제
 */
function dropTable(tableNm){
  const dropSql = `DROP TABLE ${tableNm}`;
  db.query(dropSql, function (err, result) {
    if (err) throw err;
    console.log(`[Delete] ${tableNm} 테이블이 삭제되었습니다.`);
  });

}
  
  
