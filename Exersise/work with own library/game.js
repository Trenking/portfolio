var canvas,
		canvasContext,
		ballX=10,
		ballSpeedX=12,
		ballY=10,
		ballSpeedY=6.8,
		paddle1Y=250,//position of 1st player paddle
		paddle2Y=250,
		player1Score=0,
		player2Score=0,
		showWinScreen=false;

	const PADDLE_HEIGHT = 100,
		PADDLE_THICKNESS = 10,
		WINNING_SCORE = 3;

	function handleTheMouse(evt){
		if(showWinScreen){
			player1Score=0;
			player2Score=0;
			showWinScreen=false;
		}
	}

	window.onload=function(){

		canvas=document.getElementById('gameCanvas');
		canvasContext=canvas.getContext('2d');
		var  framesPerSecond = 30;//how many frame in second i want 
		
		setInterval(function(){
			moveEverything();
			drawingAll();
		}
		, 1000/framesPerSecond);

		canvas.addEventListener('mousedown',handleTheMouse);

		canvas.addEventListener('mousemove',
			function(evt){
				var mousePos = calculateMousePos(evt);
				paddle1Y=mousePos.y-PADDLE_HEIGHT/2;//y - field of object what returned from function calculateMousePos(evt);
			});

	}

	function resetBall(){
		//checking the wining condition
		if(player1Score>=WINNING_SCORE||player2Score>=WINNING_SCORE){
			showWinScreen=true;
		}
		ballX=canvas.width/2;
		ballY=canvas.height/2;
		ballSpeedX=-ballSpeedX;
	}

	function moveEverything(){
		//algorithm of ball moving
		if(showWinScreen){
			return;
		}
		ballX+=ballSpeedX;
		if (ballX<0){
			if ((ballY>paddle1Y)&&(ballY<paddle1Y+PADDLE_HEIGHT)){
				ballSpeedX=-ballSpeedX;
				var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player2Score++;//always must be BEFORE resetBall()
				resetBall();
			}
		}

		computerMovement();
		if (ballX > canvas.width){
			if ((ballY>paddle2Y)&&(ballY<paddle2Y+PADDLE_HEIGHT)){
				ballSpeedX=-ballSpeedX;
				var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player1Score++;//always must be BEFORE resetBall()
				resetBall();
			}
		}

		ballY+=ballSpeedY;
		if ((ballY > canvas.height)||(ballY<0)){
			ballSpeedY=-ballSpeedY;
		}
	}

	function computerMovement(){
		var paddle2YCenter=paddle2Y+PADDLE_HEIGHT/2;
		if(paddle2YCenter+PADDLE_HEIGHT/5<ballY){
			if((paddle2Y+PADDLE_HEIGHT/1.3)<canvas.height){
				paddle2Y+=7;
			}
		}else if(paddle2YCenter-PADDLE_HEIGHT/5>ballY){
			if(paddle2Y>-PADDLE_HEIGHT/1.3){
				paddle2Y-=7;
			}
		}
	}

	function calculateMousePos(evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x:mouseX,
			y:mouseY
		}
	}

	function colorRect(leftX,topY,width,height,color){
		canvasContext.fillStyle = color;
		canvasContext.fillRect(leftX,topY,width,height);
	}

	function colorCircle(centerX,centerY,radius,color){
		canvasContext.fillStyle = color;
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
		canvasContext.fill();
	}

	function drawingAll(){
		
		//drawing the gameSpace
		colorRect(0,0,canvas.width,canvas.height,'black');
		if(showWinScreen){
			canvasContext.fillStyle = 'white';
			canvasContext.fillText('Click To Continue',350,500);

			if(player1Score>=WINNING_SCORE){
				canvasContext.fillText('Left player won!',350,200);
			}else if(player2Score>=WINNING_SCORE){
				canvasContext.fillText('Right player won!',350,200)
			}
			return;
		}
		//drawing the ball
		colorCircle(ballX,ballY,6,'white');
		//drawing the left player paddle
		colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'red');
		//drawing the right computer paddle
		colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'blue');
		
		//display players Score and text color
		canvasContext.fillStyle = 'white';
		canvasContext.fillText(player1Score,PADDLE_HEIGHT,PADDLE_HEIGHT);
		canvasContext.fillText(player2Score,canvas.width-PADDLE_HEIGHT,PADDLE_HEIGHT);
	}