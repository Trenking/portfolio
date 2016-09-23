var numOfClicks = 1;
window.addEventListener('load',function(){
    var itemPhotos = gClass('item_photo'),
        mainPhoto = gId('big_one'),
        sizeVariants = gClass('item_size'),
        colorVariants = gClass('item_color'),
        addToBagButton = gClass('big_button')[0];
    
    for(let i = 0; i<itemPhotos.length; i++){
        itemPhotos[i].addEventListener('click',function(e){
            mainPhoto.src = e.target.src;
            let curPhoto = gClass('current_photo')[0];
            curPhoto.classList.remove('current_photo');
            e.target.parentElement.classList.add('current_photo');
        });
    };
    
    for(let i=0; i<sizeVariants.length; i++){
        sizeVariants[i].addEventListener('click',setSize);
    };
    for(let j=0; j<colorVariants.length; j++){
        colorVariants[j].addEventListener('click',setColor);
    };
    
    function setSize(e){
        if(!~e.target.className.indexOf('chosed_size')){
            if(gClass('chosed_size')[0]){
                let prevSize = gClass('chosed_size')[0];
                prevSize.classList.remove('chosed_size');
            };
            e.target.classList.add('chosed_size');
        };
    };
    
    function setColor(e){
        if(!~e.target.className.indexOf('chosed_color')){
            if(gClass('chosed_color')[0]){
                let prevSize = gClass('chosed_color')[0];
                prevSize.classList.remove('chosed_color');
            };
            e.target.classList.add('chosed_color');
        };
    };
    
    addToBagButton.addEventListener('click',addToBag);

    function addToBag(e){
        if(gClass('chosed_color')[0]&&gClass('chosed_size')[0]){
            //new
            if(!gClass('congrat')[0]){
                var congrat  = document.createElement('div');
                congrat.className = 'congrat';
                gTag('main')[0].appendChild(congrat);
            }else{
                congrat  = gClass('congrat')[0];
            }
            congrat.innerHTML="+"+numOfClicks++;
            congrat.style.opacity=1;
            setTimeout(function(){congrat.style.opacity=0;},1200);
            

            //new
            let order = {
                name: gClass('item_name')[0].innerHTML,
                url: location.href,
                photo: mainPhoto.src,
                price: parseFloat(gClass('item_price')[0].innerHTML),
                size: gClass('chosed_size')[0].innerHTML,
                color: gClass('chosed_color')[0].innerHTML,
                num: 1
            };
   
            let totalPrice = parseFloat(localStorage.getItem('totalPrice'));
            let itemNum = parseInt(localStorage.getItem('itemCounter'));
            let sameItem = null;
            let sameItemPos = null;
            
            for(elem in localStorage){
                if(~localStorage[elem].toString().indexOf(order.name)&&
                   ~localStorage[elem].toString().indexOf(order.size)&&
                   ~localStorage[elem].toString().indexOf(order.color)){
                    sameItem = localStorage[elem];
                    sameItemPos = elem;
                };
            };
            
            localStorage.setItem('itemCounter',itemNum+1);
            localStorage.setItem('totalPrice',(totalPrice+order.price).toFixed(2));
            
            let strForStorage = '';
            
            if(sameItem){
                let posOfNum = sameItem.indexOf('num$');
                orderNum = parseInt(sameItem.substring(posOfNum+4,sameItem.length))+1;
                sameItem = sameItem.splice(posOfNum+4,orderNum.toString().length,orderNum);
                localStorage.setItem(sameItemPos,sameItem);   
            }else{
                
                for(val in order){
                    strForStorage+=val+'$'+order[val]
                    if(val!='num'){
                        strForStorage+=';';
                    };
                };
                localStorage.setItem('item_'+(itemNum+1),strForStorage);
            };
            calculateBag();
            console.log(localStorage);
        };
    };
    
});
console.log(location.href);