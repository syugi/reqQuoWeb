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
				<a href="index.html">${TITLE}</a>
			</h1>
				<nav class="nav">
					${list}
				</nav>
			<span class="menu_toggle_btn">전체 메뉴 토글 버튼</span>
		`;
   
}

exports.footer = function(){

	return `<p>copyright&copy;${TITLE} all rights reserved.</p>`;
}

	