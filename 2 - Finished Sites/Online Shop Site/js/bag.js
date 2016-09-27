var allItems = {};
var isHaveItems = false;
for (elem in localStorage) {
    if (~elem.indexOf('item_')) {
        isHaveItems = true;
        allItems[elem] = {};
        allItems[elem].id = elem;
        let buf = localStorage.getItem(elem).split(';');
        for (let i=0; i<buf.length; i++){
            let value = buf[i].split('$');
            allItems[elem][value[0]]=value[1];
        };
    };
};

function getCurrentTotalCost(){
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')).toFixed(2);
    let changetPrice = '';
    if(parseInt(totalPrice)>=1000){
        let fixedPart = Math.floor(totalPrice);
        let posToInsert = fixedPart.toString().length-3;//for example 1 000 ('3'  = means '000')
        changetPrice = totalPrice.toString().splice(posToInsert,0,' ');
        changetPrice = '£'+changetPrice;
    }else{ 
        changetPrice='£'+totalPrice;
    };
    return changetPrice;
};

window.addEventListener('load',function(){
    let itemsContaiter = gClass('items_in_bag')[0];
    let actions = gClass('actions')[0];
    let message = gClass('message')[0];
    let itemId = [];
    var costLabel = gClass('total_cost')[0];
    costLabel.innerHTML = getCurrentTotalCost();
    addItems();//main FUNC

    function isBagEmpty(){
        if(!itemsContaiter.children.length){
            itemsContaiter.innerHTML = 'Your bag is empty';
            hideElements([actions,message]);
        }else{
            showElements([actions,message]);
        };
    };
    
    function hideElements(arr){
        for(let i = 0; i<arr.length; i++) {
            arr[i].style.display = 'none';
        };
    };
    
    function showElements(arr){
        for(let i = 0; i<arr.length; i++) {
            if(arr[i]==actions){
                arr[i].style.display = 'flex';
            }else{
                arr[i].style.display = 'block';
            };
        };
    };
    
    function makePurschese(){
        if(itemsContaiter.children.length){
            let lBuf = itemsContaiter.children.length;
            for(let i = 0; i< lBuf; i++){
                localStorage.removeItem(itemId[i]);
                itemsContaiter.removeChild(itemsContaiter.children[0]);
            };
            localStorage.setItem('itemCounter',0);
            localStorage.setItem('totalPrice',0);
            calculateBag();//in global.js file
            isBagEmpty();
            itemId = [];
            hideElements([actions,message]);
            itemsContaiter.innerHTML = 'Thank you for your purschase!';
        };
    };
    function deleteConfirm(){
        if(gClass('del_confirm')[0]){
            let delWindow = gClass('del_confirm')[0];
            let deletBut = gClass('del_but')[0];
            let dontDel = gClass('dont_del')[0];
            delWindow.style.display='block';
        }else{
            let delWindow = document.createElement('div');
            delWindow.className='del_confirm';
            delWindow.innerHTML = 'Do you realy want to delete?';
            
            let delBut = document.createElement('div');
            delBut.className ='del_but';
            delBut.innerHTML = 'Yes!'
            delWindow.appendChild(delBut);
            
            let dontDel = document.createElement('div');
            dontDel.className = 'dont_del';
            dontDel.innerHTML = 'NO!';
            delWindow.appendChild(dontDel);
            
            var main = gTag('main')[0];
            main.appendChild(delWindow);
        };
    };
    function clearAll(){
        if(itemsContaiter.children.length){
            let lBuf = itemsContaiter.children.length;
            for(let i = 0; i< lBuf; i++){
                localStorage.removeItem(itemId[i]);
                itemsContaiter.removeChild(itemsContaiter.children[0]);
            };
            localStorage.setItem('itemCounter',0);
            localStorage.setItem('totalPrice',0);
            calculateBag();//in global.js file
            isBagEmpty();
            itemId = [];
            hideElements([actions,message]);
            itemsContaiter.innerHTML = 'Your bag is empty';
        };
    };
    
    function addItems(){
        if(isHaveItems){
            for(elem in allItems){
                
                let el = allItems[elem];
                let itemBox = document.createElement('div');
                itemBox.className = 'itemBox';
                itemsContaiter.appendChild(itemBox);

                let photoWraper = document.createElement('div');
                photoWraper.className = 'photo_wraper';
                let photo = document.createElement('img');
                photo.src = el.photo;
                photo.addEventListener('click',function(){
                    location.href = el.url;
                });
                photo.addEventListener('mouseover',function(){
                    itemBox.style.opacity = '0.7';
                });
                photo.addEventListener('mouseout',function(){
                    itemBox.style.opacity = '1';
                });
                photo.className='item_photo';
                photoWraper.appendChild(photo);
                itemBox.appendChild(photoWraper);
                if(~el.url.indexOf('item_1.html')){
                    photo.style.left='-110px'  
                };

                let itemPrice = document.createElement('p');
                itemPrice.innerHTML = (el.price*el.num).toFixed(2);
                itemPrice.className = 'item_price';
                photoWraper.appendChild(itemPrice);

                let descWrap = document.createElement('div');
                descWrap.className  = 'description_wrap';
                itemBox.appendChild(descWrap);

                let itemName = document.createElement('p');
                itemName.innerHTML = el.name;
                itemName.className = 'item_name';
                descWrap.appendChild(itemName);

                let itemColor = document.createElement('p');
                itemColor.className = 'item_color';
                itemColor.innerHTML = 'Color: ' + el.color;
                descWrap.appendChild(itemColor);

                let itemSize = document.createElement('p');
                itemSize.className = 'item_size';
                itemSize.innerHTML = 'Size: ' + el.size;
                descWrap.appendChild(itemSize);

                let itemQuantity = document.createElement('p');
                itemQuantity.className = 'item_quantity';
                itemQuantity.innerHTML = 'Quantity: ' + el.num;
                descWrap.appendChild(itemQuantity);

                let removeItem = document.createElement('p');
                removeItem.className = 'remove_item';
                removeItem.innerHTML = 'Remove item';
                descWrap.appendChild(removeItem);
                
                itemId.push(el.id);

                removeItem.addEventListener('click',function(e){
                    deleteConfirm();
                    let delConfBut = gClass('del_but')[0];
                    delConfBut.addEventListener('click',function(){
                        let currentPrice = localStorage.getItem('totalPrice');
                        let itemCount = localStorage.getItem('itemCounter');
                        let parent = e.target.parentElement.parentElement;
                        let elem = e.target;

                        localStorage.setItem('itemCounter',parseInt(itemCount)-el.num);
                        localStorage.setItem('totalPrice',parseFloat(currentPrice)-(el.price*el.num));
                        localStorage.removeItem(el.id);
                        itemsContaiter.removeChild(parent);

                        for(let z = 0; z < itemId.length; z++){
                            if(itemId[z] == el.id){
                                itemId.splice(z,1);
                            };
                        };

                        calculateBag();//in global.js file
                        isBagEmpty();
                        costLabel.innerHTML = getCurrentTotalCost();
                        let delWin = gClass('del_confirm')[0];
                        delWin.style.display = 'none';
                    })
                    
                }); 
            };      
            let buyNow = gClass('big_button')[0];
            buyNow.addEventListener('click',makePurschese);
            let emptyBag = gClass('empty_bag')[0];
            emptyBag.addEventListener('click',clearAll); 
         }else{
            isBagEmpty();
        };
    };
});