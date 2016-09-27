(function () {
    'use strict';
    var hoverEls = gClass('hover_content'),
        filter_menu = gClass('filter')[0],
        myRangeMinVal,
        myRangeMaxVal,
        myRangeStepsNum,
        placeForMyRange = gId('my_range_line'),
        main = gTag('main')[0],
        isMobileView = false,
        chosedFilters,
        allFilters,
        mobileFilters = document.createElement('div');
        mobileFilters.className = 'mobile_filters';
        main.insertBefore(mobileFilters,filter_menu);
    var holderNames=[];
    
    for(let i = 0; i<filter_menu.children.length; i++){
        var ul = filter_menu.children[i].children[1];
        for(let j = 0; j<ul.children.length; j++){
            ul.children[j].addEventListener('click',addAsSelected);
        };
    };
    
    createFilterField();
    function createFilterField(){
        chosedFilters = document.createElement('div');
        allFilters = document.createElement('div');
        chosedFilters.className = 'chosed_filters';
        allFilters.style.display = 'none';
        allFilters.className = 'all_filters';
        for(let i = 0; i < filter_menu.children.length; i++){
            if(~filter_menu.children[i].children[0].className.indexOf('selected')){
                let el = document.createElement('span');
                el.className = filter_menu.children[i].children[0].className;
                if(i!=filter_menu.children.length-1){
                    el.innerHTML = filter_menu.children[i].children[0].children[0].innerHTML+', ';
                }else{
                    el.innerHTML = filter_menu.children[i].children[0].children[0].innerHTML;
                };
                el.className =filter_menu.children[i].className+' selected_filter';
                chosedFilters.appendChild(el);
            }else{
                let el = document.createElement('span');
                el.className = filter_menu.children[i].className;
                if(i!=filter_menu.children.length-1){
                    el.innerHTML = filter_menu.children[i].children[0].innerHTML+', ';
                }else{
                    el.innerHTML = filter_menu.children[i].children[0].innerHTML;
                };
                chosedFilters.appendChild(el);
            };
            let categName = document.createElement('div');
            categName.innerHTML = filter_menu.children[i].children[0].innerHTML;
            categName.className = 'category_name';
            allFilters.appendChild(categName);
            let elWrap = document.createElement('div');
            elWrap.className = filter_menu.children[i].className+' string_wrapper';
            allFilters.appendChild(elWrap);
            for(let j=0; j<filter_menu.children[i].children[1].children.length; j++){
                let listElem = document.createElement('span');
                    listElem.innerHTML=filter_menu.children[i].children[1].children[j].innerHTML;
                    elWrap.appendChild(listElem);
                if(j!=filter_menu.children[i].children[1].children.length-1){
                    listElem.innerHTML+=', ';
                };
            };
        };
        chosedFilters.addEventListener('click',setVisability);
        mobileFilters.appendChild(chosedFilters);
        mobileFilters.appendChild(allFilters)
        return mobileFilters;
    };
    
    var valueBuffer = {};
    function findActiveFilters(){
        for(let i=0; i<chosedFilters.children.length; i++){
            let hasActive = false;
            for(let j=0; j<allFilters.children[i*2+1].children.length; j++){
                if(~allFilters.children[i*2+1].children[j].className.indexOf('active_span')){
                    hasActive = true;
                    let strToInsert = allFilters.children[i*2+1].children[j].innerHTML;
                    if(j==allFilters.children[i*2+1].children.length-1){
                        strToInsert+=', ';
                    }
                    console.log(chosedFilters.children[i].innerHTML);
                    chosedFilters.children[i].innerHTML = strToInsert;
                    chosedFilters.children[i].className='active_span';
                };
            };
            if(!hasActive){
                let strToInsert = allFilters.children[i*2].innerHTML;
                if(i!=chosedFilters.children.length-1){
                    strToInsert+=', ';
                };
                chosedFilters.children[i].innerHTML = strToInsert;
                chosedFilters.children[i].className='';
            };
        };
    };
    
    function setVisability(){
        if (allFilters.style.display!='none'){
            allFilters.style.display='none';
        }else{
            allFilters.style.display='block';
        };
    };
    
    window.addEventListener('load',makeMoveStrings);
    function makeMoveStrings(){
        function makeActive(){
            
        };
        let allStrings = gClass('string_wrapper');
        for(let i = 0; i<allStrings.length; i++){
            let wrap = allStrings[i];
            wrap.style.left = 0;
            for(let j = 0; j<wrap.children.length; j++){
                
                var drag = false,
                    mousemove = false,
                    startX = 0;
                
                wrap.children[j].addEventListener('mousedown',function(e){
                    e.preventDefault();
                    mousemove = false;
                    drag = true;
                    startX = e.clientX;
                });
                
                wrap.children[j].addEventListener('mouseout',function(e){
                    e.preventDefault();
                    mousemove = false;
                    drag = false;
                });
                
                wrap.children[j].addEventListener('mousemove',function(e){
                    e.preventDefault();
                    if(drag){
                        e.preventDefault();
                        mousemove = true;
                        if(startX>e.clientX){
                            if(parseInt(wrap.children[wrap.children.length-1].offsetLeft)>=0){
                                wrap.style.left = parseInt(wrap.style.left)-(startX-e.clientX)+'px';
                            };
                        }else{
                            if(parseInt(wrap.style.left)<=1){
                                wrap.style.left = parseInt(wrap.style.left)+(e.clientX-startX)+'px';
                            }; 
                        };
                        startX=e.clientX;  
                        
                        for(let z = 0; z<wrap.children.length; z++){
                            if(~wrap.children[z].className.indexOf('active_span')){
                                wrap.children[z].classList.remove('active_span');
                            };
                        };
                        
                        for(let z = 0; z<wrap.children.length; z++){
                            if((parseInt(wrap.style.left)+wrap.children[z].offsetLeft)>=1){
                                if(!~wrap.children[z].innerHTML.indexOf('Not selected')){
                                    wrap.children[z].className = 'active_span';
                                }
                                
                                break;
                            };
                        };
                        findActiveFilters();
                    };
                });
                
                wrap.children[j].addEventListener('mouseup',function(e){
                    e.preventDefault();
                    console.log(drag);
                    console.log(mousemove);
                    if(drag&&!mousemove){  

                        wrap.style.left=-e.target.offsetLeft+'px';
                        for(let k = 0; k<wrap.children.length; k++){
                            if(~wrap.children[k].className.indexOf('active_span')){
                                wrap.children[k].classList.remove('active_span');
                            };
                        };
                        if(!~e.target.innerHTML.indexOf('Not selected')){
                        e.target.className = 'active_span';
                        };
                    };
                    findActiveFilters();
                    mousemove = false;
                    drag = false;
                });
            };
        };
    };
    
    function addAsSelected(e){
        let eTarget = e.target;
        let parentMenu = e.target.parentElement.parentElement.children[0];
        let chosed = false;
        var choice;
        for(let k = 0; k<parentMenu.children.length; k++){
            if(parentMenu.children[k].className==='chosed'){
                chosed = true;
                choice = parentMenu.children[k];
            };
        };
        if(!chosed){
            if(eTarget.innerHTML!=='Not selected'){
                choice = document.createElement('p');
                choice.className = 'chosed';
                choice.innerHTML = eTarget.innerHTML;
                parentMenu.appendChild(choice);
                parentMenu.classList.add('selected');
            };
        }else{
            if(eTarget.innerHTML!=='Not selected'){
                choice.innerHTML = eTarget.innerHTML;
            }else{
                parentMenu.removeChild(choice);
                parentMenu.classList.remove('selected');
            };
        };
    };
    
    var rangeslider = document.createElement('div');

    noUiSlider.create( rangeslider, {
        start: [ 200, 800 ],
        connect: true,
        step: 1,
        margin: 400,
        range: {
            'min': [  12 ],
            'max': [ 1000 ]
        },
        tooltips: [ true, true ] 
    });
    placeForMyRange.appendChild( rangeslider);
    
    rangeslider.addEventListener('mouseup',stayOpen);
    
    function stayOpen(e){
        let element = e.target;
        while(element.id!='my_range_line'){
            element = element.parentElement;
        };
        element.parentElement.classList.add('chosed-price');
    };

 }());  