const template = require('./template/template.js');		
//const db = require('../model/db_conn.js');

const BLOG_URL = "http://blog.naver.com/h0661h";
const YOUTUBE_URL = "https://www.youtube.com/channel/UC5aWLxVXVuPyJZCHWrO4Gow";


module.exports = {
	
     html : function(){
		return sliderSection()
		+ categorySection()
		+ companySection() 
		+ iconSection() 
		+ blogSection() 
		+ socialSection() 
	 }
}
	

function sliderSection(){

	const dataList = [
		{str1 : '베란다에서', str2 : '물이 떨어져요..' , img : "slide_04.jpg"},
		{str1 : '천장에서', str2 : '물이새요...' , img : "slide_01.jpg"},
		{str1 : '변기가', str2 : '막혔어요...' , img : "slide_02.jpg"},
		{str1 : '욕조호스가', str2 : '빠졌어요...' , img : "slide_03.jpg"}
		
	];

	let list = '<ul class="slider_img">';
	dataList.forEach((data)=>{
		list += '<li>';
		list += '<div class="slider_contents">';
		list += `<div class="slider_txt_lg">${data.str1}</div>`;
		list += `<div class="slider_txt_lg">${data.str2}</div>`;
		list += '<div class="slider_txt">전문업체와 상담하세요.</div>';
		list += `<div><button id="reqEstimateBtn" class="slider_txt bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"  onclick="location.href='reqQuote'">견적문의하기</button></div></div>`;
		list += `<img src="images/p_images/${data.img}" alt=""></li>`;
	});		

	list += '</ul>';

	return `<section class="slider_section">  
				${list}

				<div class="slider_btn">
					<span id="prev_btn" style="display:none;">◀</span>
					<span id="next_btn" style="display:none;">▶</span>
				</div>


				<div class = "slider_dots">
					<span class ="dot" onclick=""></span>
					<span class ="dot" onclick=""></span>
					<span class ="dot" onclick=""></span>
					<span class ="dot" onclick=""></span>
				</div>
			</section>`;	


}
	
function categorySection(){
	const dataList = [
		{name:"누수탐지"        , img:"category_01.png"  },
		{name:"수도배관"        , img:"category_02.png"  },
		{name:"보일러교체"       , img:"category_03.png"  },
		{name:"욕실누수"        , img:"category_04.png"  },
		{name:"변기막힘"        , img:"category_05.png"  },
		{name:"언수도녹임"      , img:"category_06.png"  }
	  ];


	let list = '<ul class = "category_list">';
	dataList.forEach((data)=>{

		list += `<li>
					<figure>
						<div><img src="images/s_images/${data.img}" alt=""></div>
						<figcaption>${data.name}</figcaption>
					</figure>
				</li>`;
	});		
	list += '</ul>';

	return `<section class="category_section">
				${list}
		   </section>`;
}


function blogSection(){

	// db.query("SELECT * FROM users", function (err, result) {
	// 	if (err) throw err;
	// 	console.log("Result: " + JSON.stringify(result));
	// });
	
	const dataList = [
		{  	title:"난방 방 하나가 안 따듯해요? 부평동 누수탐지 순환 안되는 방 해결~",  
			content:`지금 살고 있는 집에서 8년을 살았다는데
처음부터 이곳 방만 차가웠던것 같아요 원인을 알고 싶다고
저희 누수탐지 전문 업체에 전화 주셨네요
모든 경험을 통해서 난방 순환이 안되는 곳을 해결해볼게요 ...` , 
			img:"blog_01.jpg" ,
      url:"https://m.blog.naver.com/h0661h/221756313902"
		},
		{  	title:"화장실에서 떨어지는 물 변기 누수 원인 확인했어요",  
			content:`아래층 화장실 천장에서 물의 떨어지는데 원인을 알 수 없어서 계량기를 확인해보니
 배관 쪽에서는 누수될 확률이 없네요
누수가 된다면 화장실인데 화장실에서도 제일 의심되는 부분이 변기네요
변기를 탈착해보니 ...` , 
			img:"blog_02.jpg" ,
      url:"https://m.blog.naver.com/h0661h/221637790128"
		},
		{  	title:"수도 배관 누수 산곡동 아파트 보일러실에서 물이흘러나와요",  
			content:`청천동 아파트 누수 물이 많이 떨어져서 누수탐지 장비를 이용해서 누수탐지를 시작해봅니다
어느 위치에서 새는 건지 장비를 이용해야 정확한 지점을 확인할 수 있어요 ...` , 
			img:"blog_03.jpg"  ,
      url:"https://m.blog.naver.com/h0661h/221900989320"
		},
    {  	title:"화장실누수 화장실 부분 방수 바닥유가 방수로 아래층누수 잡히길~",  
			content:`화장실 아래층천장 부분에서 누수가 되는데 ÁÁ
 어디서 누수가 되는지 도무지 알 수 없네요
화장실 전체 공사를 해야하지만 부분적으로 방수를해보고 차도가 없을시 최후방법을 선택하고자 저희 업체에 의뢰를 하였다네요 ..` , 
			img:"blog_04.jpg"  ,
      url:"https://m.blog.naver.com/h0661h/221600408843"
		},
    {  	title:"수도배관 누수 외벽으로 흐르는 물 열화상으로 체크했어요 인천누수",  
			content:`빌라 외벽으로 누수가 되는데 수도계량기가 돌아가지않아서 내 집에서 누수가 아닌거같아  일주일 정도 방치했다네요
 이곳은 바로 누수탐지장비를 이용해서 누수 검사 시작해보렵니다 ...` , 
			img:"blog_05.jpg"  ,
      url:"https://m.blog.naver.com/h0661h/221886456419"
		}
	];


	let list = '';
	dataList.forEach((data)=>{
		list += `<div class="blog-slide swiper-slide w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
					<div class="bg-white rounded-lg overflow-hidden shadow relative" onclick="window.open('${data.url}')">
					  <img class="h-56 w-full object-cover object-center" src="images/p_images/${data.img}" alt="">
					  <div class="p-4 h-auto md:h-40 lg:h-48">
						<div class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-base leading-tight">
						  ${data.title}
						</div>
						<div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-xs">
						${data.content}
						</div>
						<!--<div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
						  <a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#something</a>
						  <a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#sky</a>
						</div>-->
					  </div>
					</div>
				  </div>`;
	});		

	return `<section class="blog_section">
			<h2 class="text-center px-4 py-10 font-bold text-2xl">시공사례</h2>
				<button id = "blog_more_btn" class="absolute right-0 mr-4 text-grey-dark font-semibold my-10 py-2 px-4 border border-grey hover:border-transparent rounded mr-2 float-right text-xs " onclick="window.open('${BLOG_URL}') ">더보기..</button> 
			</h2>
			  <div class="py-4 px-4">
				<div class="blog_contain swiper-container block md:flex justify-between md:-mx-2">
					<div class="swiper-wrapper">
						${list}
					</div>
				</div>
			  </div>
		</section>`;
		
}
		
function iconSection(){
	
	const dataList = [
		{text:"정확한 문제진단"  , img:"icon_01.png"  },
		{text:"꼼꼼한 시공"     , img:"icon_02.png"  },
		{text:"책임있는 A/S"   , img:"icon_03.png"  },
		{text:"고객만족"       , img:"icon_04.png"  }
	  ];
      
	
	let list = '';
	dataList.forEach((data, index)=>{
		
		if(index > 0){
			//list += '<div class="icon_arrow"><img src="images/s_images/icon_arrow.png" alt=""></div>';
			list += '<img class="icon_arrow" src="images/s_images/icon_arrow.png" alt="">';
		}
					 
		list += `<div class="icon_img">
					<img src="images/s_images/${data.img}" alt="">
					<span>${data.text}</span>
		   		 </div>`;
		
	
	});		
	
			
	return `<section class="icon_section"> 
            	${list}
	        </section>`;
}
	
function companySection(){
	
	const dataList = [
		{ titleList : ["#누수탐지전문공사업체","#전문건설업 등록업체","#전문장비보유"] , 
		  content   : "한국건축설비누수는 가스2종 난방2종 전문건설업 등록업체이며 가스탐지기, 관로탐지기, 열화상카메라 등의 전문장비를 보유하고있는 누수탐지전문공사업체 입니다.",
		  img       : "company_01.jpg"  
		},
		{ titleList : ["#20년경력 전문가","#꼼꼼한 사장님","#직접시공"] , 
		  content   : "20여년 경력을 가지신 사장님이 상담 부터 시공 및 하자보수까지 모두 직접 해드립니다. 모든일에 책임감도 강하신 분이라 남들보다 꼼꼼히 처리합니다",
		  img       : "company_02.jpg"  
		},
		{ titleList : ["#부부출장","#블로그운영"] , 
		  content   : `부부가 함께 출장나갑니다.<br>
                            사장님이 시공하시고 사모님이 옆에서 친절히 설명드립니다. 사모님이 직접 운영하시는 블로그에서는 다양한 시공사례도 확인 하실수 있습니다. <br>
                           <a href="${BLOG_URL}" target="_blank" class="text-blue-500 underline font-semibold pt-2">한국건축설비누수 블로그 보러가기</a>`,
		  img       : "company_03.jpg"  
		},
		{ titleList : ["#하자보수","#최대 2년간 보증","#무료 A/S"] , 
		  content   : "저희가 시공한 부분에서 하자가 발생한 경우 최대 2년까지 무료로 보수해드립니다. (방수 1년 / 배관 2년 )  <br>20년 동안 같은위치에서 일해오신 사장님은 어디 도망안갑니다",
		  img       : "company_04.jpg"  
		},
	  ];
      
	
	let list = '';
	dataList.forEach((data, index)=>{
		 
		list += `<div class="companyBox swiper-slide px-10 py-6">
                    <img src="images/p_images/${data.img}" alt="">
                    <div class="company_contents" >
                      ${template.list(data.titleList)}
                      <div>${data.content}</div>
                    </div>
                </div>`;
	});		
			
	return `<section class="company_section py-5 bg-gray-200 ">
            <span class="text-center pt-12 pb-5 font-bold text-2xl">한국건축설비누수를 선택해야하는 이유!</span>
			<div class= "relative">
				<div class="company_page swiper-container static">
					<div class="swiper-wrapper">
						${list}
					</div>

				</div>
					
				<!-- Add Pagination -->
				<div class="companyPagin swiper-pagination"></div>
				
				<!-- Add Arrows -->
				<span class="companyPrevBtn swiper-button-prev"></span>
				<span class="companyNextBtn swiper-button-next"></span>
				
			</div>

            <div class="w-full text-center"><button id="reqEstimateBtn"  class="slider_txt bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded " style="margin:20px auto; "onclick="location.href='reqQuote'">견적문의하기</button></div>
        </section>`;
}		
		
function socialSection(){
				
	return `<section class="social_section">
    			<div class="social_list w-1/2 my-auto">
    			  <a href="${BLOG_URL}" target="_blank"><div class="flex flex-row pr-6 pb-4"><img src="images/s_images/icon_blog.png" style="width:40px; height:40px"><span class="my-auto ml-2 text-white">네이버블로그</span></div></a>
    			  <a href="${YOUTUBE_URL}" target="_blank"><div class="flex flex-row"><img src="images/s_images/icon_youtube.png" style="width:40px; height:40px"><span class="my-auto ml-2  text-white">유튜브</span></div></a>
    			</div>
    			 <div class="w-1/2 flex  m-auto justify-center"><a class="border py-4 px-4 md:px-10 rounded-full inline-flex my-auto " href="tel:010-7504-1822"><img src="images/s_images/icon_call.png" style="width:30px; height:30px"><span class="social_call ml-2 pt-1 text-white font-semibold">010-7504-1822</span></a></div>
    		</section>`;			
}