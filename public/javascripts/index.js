const slider_section = document.querySelector(".slider_section"),
slideImg = document.querySelector(".slider_img"),
slideli  = slideImg.querySelector("li"),
dots = document.querySelectorAll(".dot");

let currIdx = 0;
let autoSlider = "";

//슬라이드 이미지 페이지 표시 
function fn_setDots(idx){
    dots.forEach(i => i.classList.remove('active'));
    dots[idx].classList.add('active');
}

//슬라이드 이미지 이동 
function fn_moveImg(){
    slideImg.style.transform = "translate(-"+currIdx*slideli.offsetWidth+"px, 0px)";
}

//이전 슬라이드 표시
function fn_minusSlide(){
    // console.log("prev!!!!!!");
    currIdx--;
    currIdx = currIdx < 0 ? 0 : currIdx;
    fn_moveImg(); //슬라이드 이미지 이동
    fn_setDots(currIdx); // 페이지 점 표시 
}

//다음 슬라이드 표시   
function fn_plusSlide(){
    // console.log("next!!!!!!");
    currIdx++;
    const slideCnt = slideImg.childElementCount-1;
    //console.log("currIdx : "+currIdx+" slideCnt : "+slideCnt)
    currIdx = currIdx > slideCnt ? 0 : currIdx;
    fn_moveImg(); //슬라이드 이미지 이동
    fn_setDots(currIdx); // 페이지 점 표시 
}


//메뉴 토글 버튼
function fn_menuToggle(){
     const gnb = document.querySelector(".gnb"); //메뉴 
     if( gnb.style.display == "block"){
        gnb.style.display = "none";
     }else{
       gnb.style.display = "block";
     }
}

function init(){
    const prevBtn = document.querySelector("#prev_btn"), //이전버튼 
    nextBtn = document.querySelector("#next_btn");       //다음버튼 

    prevBtn.addEventListener("click", fn_minusSlide); 
    nextBtn.addEventListener("click", fn_plusSlide); 

    //첫번째 점으로 선택
    fn_setDots(0);

    //홈페이지 크기 변경시 슬라이드 이미지 크기 조정  
    window.onresize = function(){
        fn_moveImg();
    }

    //슬라이드 자동 재생 
    autoSlider = setInterval(function () {
        fn_plusSlide();
    }, 3000);

    //마우스 올리면 슬라이드 멈춤
    slider_section.addEventListener('mouseover', () => {
        //  this.classList.add('active');
        clearInterval(autoSlider);
    });

    //마우스 안올리면 슬라이드 진행 
    slider_section.addEventListener('mouseleave', () => {
        //  this.classList.remove('active');
        autoSlider = setInterval(function () {
            fn_plusSlide();
        }, 3000);
    });
    
    
    //메뉴버튼 
    document.querySelector(".menu_toggle_btn").addEventListener("click", () => {
        const gnb = document.querySelector(".gnb"); //메뉴 
       if( gnb.style.display == "block"){
          gnb.style.display = "none";
       }else{
         gnb.style.display = "block";
       }
    }); 

}



init();