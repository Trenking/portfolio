// var car = {
// 	name:'Volvo',
// 	weight:25,
// 	circles:4
// }
// for(var i=0;i<21;i++){
// 	console.log(car['name']);
// }
var a =[{x:7,y:7},{x:1,y:1}];
console.log();

console.log(a[0]['x']);
a[1].z=1;
console.log(a[1]['z'],a[1]);
console.log(a[0].x+a[1].x);

// (function plus1(x){
// 	console.log(x+1);
// })('asdasdad1');

// var b =[]
// b.push(1,2,3,4,5);
// console.log(b);
// console.log(b.reverse());
// console.log(b);

// a.dist=function(){
// 	var p1 = this[0]['x']-this[1]['x'];
// 	var p2 = this[0]['y']-this[1]['y'];
// 	return Math.sqrt(p1*p1+p2*p2);
// }
// console.log(a.dist());

// //example of classes and inheriting
// //making constructor
// function Name(first,last){
// 	this.first=first;
// 	this.last=last;
// }
// //exemplar of class
// var p1 = new Name('Andrew','Cramor');
// //creating and inheriting the 'cb()' method for othe exemplars of class
// Name.prototype.cb = function(){
// 	return "hello " + this.first+' '+this.last;
// }
// console.log(p1.cb());

// //var answer=confirm('Перейти в вк?');
// //if (answer) {window.location='http://vk.com'};

// function hiding(e, reflow){
// 	if(reflow){
// 		e.style.display = 'none';
// 	}
// 	else{
// 		e.style.visibility='hidden';
// 	}
// }

// for( var i=0; i<9; i+=2 ) 
// { 
//     if( ++i==5 ) break; 
//     else continue; 
// } 
// alert( i++ ); 
  var ev = new Event("click");
  console.log(document.getElementById('elem'));
  var huy = document.getElementById('elem')
  huy.dispatchEvent(ev);