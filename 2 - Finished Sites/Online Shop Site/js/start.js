window.addEventListener('load',init);

var slideTime = 2100;

function init(){
    var slider = gId('slider');
    var slides = document.getElementsByClassName('slider_element');
    var checkers = document.getElementsByClassName('checkers')[0];
    var currentSlide = 0;
    //по-умолчанию не задан сдвиг влево, проставляем для всех элементов
    for(let k = 0; k<slides.length; k++){
        slides[k].style.left = k*100+'%';
    };

    var letsSlide = setInterval(sliding,slideTime);
    
    slider.addEventListener('mouseover',function(){
        clearInterval(letsSlide);
    });
    slider.addEventListener('mousmove',function(){
        clearInterval(letsSlide);
    });
    slider.addEventListener('mouseout',function(){
        letsSlide = setInterval(sliding,slideTime);
    });
    
    for(let j = 0; j<slides.length; j++){
        let curChecker = document.createElement('span');
        curChecker.className = 'sl_checker';
        if(j==0){
            curChecker.className+=' current_slide'
        }
        curChecker.style.order=j;// kостыль для IE  и Edge
        checkers.appendChild(curChecker);
        curChecker.onclick = function(e){
            for(let i = 0; i<slides.length; i++){
                slides[i].style.left = parseInt(slides[i].style.left)-(100*(this.style.order-currentSlide)) + '%'   ;
            };
            let curChecker = gClass('current_slide')[0];
            curChecker.classList.remove('current_slide');
            this.classList.add('current_slide');
            currentSlide = this.style.order;
        };
    };
    
    function sliding(){
        var checks = gClass('sl_checker');
        if(!parseInt(slides[slides.length-1].style.left)){
            for(let k = 0; k<slides.length; k++){
                slides[k].style.left = k*100+'%';
                if(checks[k].className.indexOf('current_slide')){
                    checks[k].classList.remove('current_slide');
                };
                if(!parseInt(slides[k].style.left)){
                    currentSlide=k;
                    checks[k].classList.add('current_slide');
                };
            };
        }else{
            for(let i = 0; i<slides.length; i++){
                slides[i].style.left = parseInt(slides[i].style.left)-100+'%';
                if(checks[i].className.indexOf('current_slide')){
                    checks[i].classList.remove('current_slide');
                };
                if(!parseInt(slides[i].style.left)){
                    currentSlide=i;
                    checks[i].classList.add('current_slide');
                };
            };
        };
    };
};
