const template = require('../lib/template.js');		

module.exports = {
	
      sliderSection
	, categorySection
	, socialSection 
	, companySection 
	, iconSection 
	, blogSection 
	, categorySection 
	, sliderSection
}
	

function sliderSection(){

	const dataList = [
		{str1 : '천장에서', str2 : '물이새요...' , img : "slide_01.jpg"},
		{str1 : '변기가', str2 : '막혔어요...' , img : "slide_02.jpg"},
		{str1 : '욕조호스가', str2 : '빠졌어요...' , img : "slide_03.jpg"},
		{str1 : '베란다에서', str2 : '물이 떨어져요..' , img : "slide_04.jpg"}
	];

	let list = '<ul class="slider_img">';
	dataList.forEach((data)=>{
		list += '<li>';
		list += '<div class="slider_contents">';
		list += `<div class="slider_txt_lg">${data.str1}</div>`;
		list += `<div class="slider_txt_lg">${data.str2}</div>`;
		list += '<div class="slider_txt">전문업체와 상담하세요.</div>';
		list += `<div><button id="reqEstimateBtn" class="slider_txt bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"  onclick="location.href='reqQuote'">견적문의요청</button></div></div>`;
		list += `<img src="images/p_images/${data.img}" alt=""></li>`;
	});		

	list += '</ul>';

	return `<section class="slider_section">  
				${list}

				<div class="slider_btn">
					<span id="prev_btn">◀</span>
					<span id="next_btn">▶</span>
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
					<a href="#"><figure>
						<div><img src="images/s_images/${data.img}" alt=""></div>
						<figcaption>${data.name}</figcaption>
					</figure></a>
				</li>`;
	});		
	list += '</ul>';

	return `<section class="category_section">
				${list}
		   </section>`;
}


function blogSection(){
	
	const dataList = [
		{  	title:"바닥에서 물이 올라와요.",  
			content:"빌라 데코타일 장판에서 물이 올라와요 물을 닦아도 계속 여기저기서 물이 올라오네요..." , 
			img:"blogImg_01.jpg"  
		},
		{  	title:"싱크대 하수도막힘을 더이상 바닥으로 누수되지않게 보수까지 한번에",  
			content:"아파트 싱크대가 막혀서 바닥으로 물이 흐르네요 장비를 이용해서 배수구를 뚫었어요..." , 
			img:"blogImg_02.jpg"  
		},
		{  	title:"변기에 칫솔이 들어갔어요",  
			content:"인천 청라동 변기가 막혀서 방문했어요  아이가 양치하다가 칫솔이 들어갔다네요..." , 
			img:"blogImg_03.jpg"  
		}
	  ];
      
	
	let list = '';
	dataList.forEach((data)=>{
		
		list += `<div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
                    <div class="bg-white rounded-lg overflow-hidden shadow relative">
                      <img class="h-56 w-full object-cover object-center" src="images/p_images/${data.img}" alt="">
                      <div class="p-4 h-auto md:h-40 lg:h-48">
                        <a href="#" class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg">
                          ${data.title}
                        </a>
                        <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
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
            <h2 class="text-center p-4 font-bold text-2xl">시공사례
              <button id = "blog_more_btn" class="absolute right-0 mr-4 bg-gray-300 hover:bg-grey text-grey-dark font-semibold py-2 px-4 border border-grey hover:border-transparent rounded mr-2 float-right text-xs hover:text-white" onclick="window.open('http://blog.naver.com/h0661h') ">더보기..</button> 
            </h2>
              <div class="px-4">
                <div class="block md:flex justify-between md:-mx-2">
					${list}
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
      
	
	let list = '<ul class = "icon_list">';
	dataList.forEach((data, index)=>{
		
		if(index > 0){
			list += '<div class="icon_arrow"><img src="images/s_images/icon_arrow.png" alt=""></div>';
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
		  content   : "한국건축설비누수는 가스2종 난방2종 전문건설업 등록업체이며 가스탐지기, 관로탐지기, 열화상카메라 등의 전문장비를 보유하고있는 누수탐지전문공사업체 입니다.",
		  img       : "company_02.jpg"  
		},
		{ titleList : ["#부부출장","#블로그운영"] , 
		  content   : `부부가 함께 출장나갑니다.<br>
                            여자 혼자사셔도 걱정마세요! 사장님이 시공하시고 사모님이 옆에서 친절히 설명드립니다. 사모님이 직접 운영하시는 블로그에서는 다양한 시공사례도 확인 하실수 있습니다. <br>
                           <a href="http://blog.naver.com/h0661h" target="_blank" class="text-blue-500 underline font-semibold pt-2">한국건축설비누수 블로그 보러가기</a>`,
		  img       : "company_03.jpg"  
		},
		{ titleList : ["#하자보수","#최대 2년간 보증","#무료 A/S"] , 
		  content   : "저희가 시공한 부분에서 하자가 발생한 경우 최대 2년까지 무료로 보수해드립니다. (방수 1년 / 배관 2년 )  <br>20년 동안 같은위치에서 일해오신 사장님은 어디 도망안갑니다",
		  img       : "company_04.jpg"  
		},
	  ];
      
	
	let list = '<ul class = "company_list">';
	dataList.forEach((data, index)=>{
		
		if(index > 0){
			list += '<div class="icon_arrow"><img src="images/s_images/icon_arrow.png" alt=""></div>';
		}
					 
		list += `<div class="companyBox swiper-slide px-4">
                    <img src="images/p_images/${data.img}" alt="">
                    <div class="company_contents" >
                      ${template.list(data.titleList)}
                      <div>${data.content}</div>
                    </div>
                </div>`;
	});		
			
	return `<section class="company_section bg-gray-200 ">
            <span class="text-center pt-12 pb-6 font-bold text-xl">한국건축설비누수를 선택해야하는 이유!</span>
            <div class="company_page swiper-container">
              <div class="swiper-wrapper pb-4">
               ${list}
              </div>
              
              <!-- Add Pagination -->
              <div class="companyPagin swiper-pagination"></div>
              
              <!-- Add Arrows -->
              <span class="companyPrevBtn swiper-button-prev"></span>
              <span class="companyNextBtn swiper-button-next"></span>
              
            </div>

            <div class="w-full text-center"><button id="reqEstimateBtn"  class="slider_txt bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded " onclick="location.href='reqQuote'">견적문의요청</button></div>
        </section>`;
}		
		
function socialSection(){
				
	return `<section class="social_section">
    			<div class="social_list w-1/2">
    			  <a href="http://blog.naver.com/h0661h" target="_blank"><div class="flex flex-row pr-6 pb-4"><img src="images/s_images/social_01.png" alt=""><span class="my-auto ml-2 text-white">네이버블로그</span></div></a>
    			  <a href="https://www.youtube.com/channel/UC5aWLxVXVuPyJZCHWrO4Gow" target="_blank"><div class="flex flex-row"><img src="images/s_images/social_02.png" alt=""><span class="my-auto ml-2  text-white">유튜브</span></div></a>
    			</div>
    			 <div class="w-1/2 h-12 flex  m-auto justify-center"><a class="inline-flex" href="tel:010-7504-1822"><img src="images/s_images/social_02.png" alt=""><span class="social_call my-auto ml-2 text-blue-400 font-semibold underline">010-7504-1822</span></div></a>

    		</section>`;			
}