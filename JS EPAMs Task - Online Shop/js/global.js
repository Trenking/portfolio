if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
};
function gId(id){
    return document.getElementById(id);
};
function gClass(className){
    return document.getElementsByClassName(className);
};
function gTag(tagName){
    return document.getElementsByTagName(tagName);
};
function calculateBag(){
    var bagElement = gClass('bag')[0].children[0];
    if(!localStorage.getItem('itemCounter')||localStorage.getItem('itemCounter')==0){
        bagElement.innerHTML='Bag';
    }else{
        let itemNum = localStorage.getItem('itemCounter');
        let totalPrice = parseFloat(localStorage.getItem('totalPrice')).toFixed(2);
        if(parseInt(totalPrice)>=1000){
            let fixedPart = Math.floor(totalPrice);
            let posToInsert = fixedPart.toString().length-3;//for example 1 000 ('3'  = means '000')
            let chancgetPrice = totalPrice.toString().splice(posToInsert,0,' ');
            bagElement.innerHTML='Bag £'+chancgetPrice+' ('+itemNum+')';
        }else{ 
            bagElement.innerHTML='Bag £'+totalPrice+' ('+itemNum+')';
        };
    }; 
};

var clientWidth;
var mobileWidth = 480;
var tabletWidth = 1024;

(function(){
    
    var topMenuBut,
        topMenu,
        main,
        logo;

    window.addEventListener('load',init);
    window.addEventListener('resize',changeProp);

    function init(e){

        topMenuBut = gId('icon_menu');
        topMenu = gId('top_menu');
        logo = gClass('logo')[0];


        topMenuBut.addEventListener('click',function(){
             if(topMenuBut.className){
                 topMenuBut.className='';
                 topMenu.className='';
             }else{
                 topMenuBut.className='activated';
                 topMenu.className='activated';
             };
        });

        main = gTag('main');
        clientWidth = main[0].clientWidth;
        changeProp();
        
        if(!localStorage.getItem('itemCounter')){
            localStorage.setItem('itemCounter',0);
            localStorage.setItem('totalPrice',0);
        };
        
        calculateBag();
    };

    function changeProp(){
        clientWidth = main[0].clientWidth;

        if(clientWidth<=mobileWidth){
            //mobile styles
            if(logo.innerHTML!='TL'){
                logo.innerHTML='TL';
            };

        }else if(clientWidth>=mobileWidth&&clientWidth<=tabletWidth){
            //tablet styles
            if(logo.innerHTML!='Template'){
                logo.innerHTML='Template';
            };

        }else if(clientWidth>tabletWidth){
            //desctop styles
            if(logo.innerHTML!='Template'){
                logo.innerHTML='Template';
            };
        };
    };

}());