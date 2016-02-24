window.onload=function(){
	var USER_NAME='$User_name here ';//you can change curent user name there or you can do it on server
	var dateOptions={
		year:"numeric",
		month:"long",
		day:"numeric"
	}

	document.getElementById('write_to_consultant').onclick=function(){
		var today = new Date();
		var time=today.toLocaleString("ru", dateOptions);
		var nTime=time.substr(0,15);
		
		var nCom = document.getElementById('new_comment');//new comment what stay in 'textarea'
		var comArea = document.getElementById('comments');//area with all comments
		var comment = document.createElement('div');//curent comment
		var nameCo = document.createElement('div');//name of comment's author
		var timeCo = document.createElement('span');//day of comment adding 
		var textCo = document.createElement('div');//coomment's body
		
		comment.classList.add('comment');
		nameCo.classList.add('name');
		timeCo.classList.add('time');
		textCo.classList.add('text');
		
		nameCo.innerHTML=USER_NAME;
		timeCo.innerHTML=nTime;
		textCo.innerHTML=nCom.value;
		
		nameCo.appendChild(timeCo);
		comment.appendChild(nameCo);
		comment.appendChild(textCo);
		comArea.appendChild(comment);
	};
	
	document.getElementById("new_comment").onkeydown = function (e) {
		if (e.keyCode == 13 && e.ctrlKey) { 
			document.getElementById("write_to_consultant").click(); 			
			return false;
		}
	}
	
};




