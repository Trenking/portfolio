//Main object with cell's parameters
// var cell.x = '',
// 	cell.y= '',
// 	cell.active=false,
// 	cell.vacant=false;
// this is not ideal variant of game, in ideal adding events have to realized in body of createDesk() function with adding eventListener
// to cell.

//function of generation cells
var cell={}, cellArray=new Array, whiteCheckersArray=[], redCheckersArray=[];
var checkerSelected=false, redPlayer=false, whitePlayer=false;

function createDesk(){
	for(var y=1; y<=8;y++){
		cell[y]=[];
		if(y%2){
			for (var x=1;x<=8;x++){
				cell[y][x]=document.createElement('div');
				if(x%2){
					cell[y][x].classList.add('cell');
					document.getElementById('game-space').appendChild(cell[y][x]);							
				}
				else{
					cell[y][x].classList.add('black');
					cell[y][x].classList.add('cell');
					document.getElementById('game-space').appendChild(cell[y][x]);
				}
			}
		}
		else{
			for (var x=1;x<=8;x++){
				cell[y][x]=document.createElement('div');
				if(x%2){
					cell[y][x].classList.add('black');
					cell[y][x].classList.add('cell');
					document.getElementById('game-space').appendChild(cell[y][x]);
				}
				else{
					cell[y][x].classList.add('cell');
					document.getElementById('game-space').appendChild(cell[y][x]);
				}
			}
		}
	}
}

//clicking on cell
function addingEvent(checker){

	checker.addEventListener('click',function clicking(){
		//if clicked activated - deactivate cell
		if(checkerSelected&&checker.hasAttribute('active')){
			checker.removeAttribute('active');
			checkerSelected=false;
		}
		//if clicked some color - chose player
		else if(!checkerSelected){
			if(checker.classList.contains('whiteChecker')&&!redPlayer) {
				whitePlayer=true;
				checker.setAttribute('active',true);
				checkerSelected=true;
			}
			if(checker.classList.contains('redChecker')&&!whitePlayer) {
				redPlayer=true;
				checker.setAttribute('active',true);
				checkerSelected=true;
			}
		}
	});	

}
//cleaning game space and filling checkers
function fillingGameSpace(){
	checkerSelected=false, redPlayer=false, whitePlayer=false;
	cellArray=document.getElementsByClassName('cell');
	for(var i=0;i<64;i++){
		if(cellArray[i].hasAttribute('active')){
			cellArray[i].removeAttribute('active');
		}
		if(cellArray[i].classList.contains('black')){
			if(i<24) {
				cellArray[i].classList.add('whiteChecker');
				cellArray[i].color='white';cellArray[i]
				addingEvent(cellArray[i]);
			}
			else if(i>39){
				cellArray[i].classList.add('redChecker');
				addingEvent(cellArray[i]);
			} 
			else {
				if (cellArray[i].classList[2]){
					cellArray[i].classList.remove(cellArray[i].classList[2]);
				}
			}
		}
	}
}
createDesk();
