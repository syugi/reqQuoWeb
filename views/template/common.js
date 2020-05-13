const BLOG_URL = "http://blog.naver.com/h0661h";
const TITLE    = "한국건축설비누수";

exports.header = function(){
	
   //eader:function(){
	   
		const dataList = [
			{url:"/"              , menuNm:"홈"     },
			{url:"/company"       , menuNm:"회사소개"},
			{url:BLOG_URL         , menuNm:"시공사례"},
			{url:"/reqQuote"      , menuNm:"견적요청"}
		  ];

		//console.log(">>sss dataList :"+JSON.stringify(dataList));

		let list = '<ul class="gnb">';
		dataList.forEach((data)=>{
			// console.log(">>>"+data.url+" : "+data.url);
			list += `<li><a href="${data.url}">${data.menuNm}</a><span class="sub_menu_toggle_btn">하위 메뉴 토글 버튼</span></li>`
		});		
		list += '</ul>';


		return `
			<h1 class="logo">
				<a href="/">${TITLE}</a>
			</h1>
				<nav class="nav">
					${list}
				</nav>
			<span class="menu_toggle_btn">전체 메뉴 토글 버튼</span>
		`;
   
}

exports.footer = function(){

	return `
    <div class="mx-10 text-gray-300 text-xs">
      <div>한국건축설비누수  |  대표:허재균  |  사업자등록번호:122-14-63748</div>
      <div class="pb-2">주소: 인천 부평구 부평동 191-10</div> 
      <div class="pb-4">copyright&copy;${TITLE} all rights reserved.</div>
    </div> `;
}

	