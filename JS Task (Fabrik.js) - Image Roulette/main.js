;// для избежания ошибок, если в предыдущем скрипте не указали ";" вконце
var images = [];//массив который будет содержать ссылки на все картинки в нашей очереди
var queue = []; //массив который будет содержать сами картинки, будет служить для них общей группой
var win1,win2,win3;//переменные для запоминания картинок, которые хотим вывести всконцу (условно назовем их "победными")

//функция для генерации строк, которые будут указывать, какую картинку нужно брать
var generateImageLocation = function(number){
    return 'images/r'+number+'.gif';
}

//функция для задания путей к попедным картинкам, нужно указать цифры окончания каждой картинки, в ТЗ это были "десятка,десятка,туз" ~ 1,1,12
var createWinCombo = function(firstIndex,secondIndex,thirdIndex){
    win1=generateImageLocation(firstIndex);
    win2=generateImageLocation(secondIndex);
    win3=generateImageLocation(thirdIndex);
}

//функция для создания случайно очереди из имеющихся картинок 
var createImageQueue = function(){
    for (var i=0; i<15; i++){
        images[i]=generateImageLocation(Math.floor(Math.random() * 13));
    }
    images[15]=win1;//первая победная картинка
    images[16]=win2;//вторая 
    images[17]=win3;//третья
}

//главная функция, выполняется по окончанию загрузки содержимого window
window.onload=function(){
    var canvas = new fabric.StaticCanvas('canvas');
    
    createWinCombo(1,1,12);//задаем какие картинки хотим увидеть вконце
    createImageQueue();
    var group = new fabric.Group;
    for (var i=0; i<images.length;i++){
        fabric.Image.fromURL(images[i], function(Img) {
            group.addWithUpdate(Img);
            canvas.remove(Img);
        },{top:i*100});  
    };

    canvas.add(group);
    
    document.getElementById('button').onclick = function(){
        group.animate('top', -1500, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 5000,
            easing: fabric.util.ease.easeInOutQuad
        });
    };

    //создаем последовательность из картинок, где картинки из WinCombo будут вконце 
    console.log(images);
    console.log(images.length);
};

