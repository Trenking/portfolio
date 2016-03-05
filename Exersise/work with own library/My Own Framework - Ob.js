//there my first framework for JavaScript.
//autor: Eugene Motseglov;
//Start writing on 15th Jan 2016

//concatulating objects
//add properties from second to first
(function(global,jQuery){
    function borrowProp(obj1, obj2) {
        for (i in obj2){
            if(!obj1.hasOwnProperty(i)){
                obj1[i]=obj2[i];
            }
        }
        return obj1;
    }
    //mix properies between objects if thay don't have any
    function mixProp(obj1,obj2,obj3){
        if((typeof obj1==='object')&&(typeof obj2==='object')&&(typeof obj3==='object'||!obj3)){
            for (i in obj2){
                if(!obj1.hasOwnProperty(i)){
                    obj1[i]=obj2[i];
                }
            }
            for (i in obj1){
                if(!obj2.hasOwnProperty(i)){
                    obj2[i]=obj1[i];
                }
            }
        }else{
            console.log('You mistaked in arguments. Arguments must be 3 objects.');
            return;
        }
        if(obj1===obj3||!obj3){
            return obj1;
        }else if(obj2===obj3){
            return obj2;
        }else{
            console.log('You mistaked in arguments. Funcction return first changed obj or second');
            return;
        }
    }
    //for checking some data
    function log(){
    	for (var i=0;i<arguments.length;i++){
    		console.log(i+' : '+arguments[i]);
    	}
    }
}(window,jQuery))