var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var ball = document.getElementById("ball");

bar1.style.marginTop= "0px";
bar2.style.marginTop= "0px";
ball.style.marginLeft="400px";
ball.style.marginTop="265px";

var bar1Pos = Number(document.getElementById("bar1").style.marginTop.split("px")[0]);
var bar2Pos = Number(document.getElementById("bar2").style.marginTop.split("px")[0]);

function moveBar1(){
	document.onkeydown = function(e) {
		switch(e.keyCode){
		case 40://ABAJO
			if(bar1Pos <= 450){
				bar1Pos+=20;
				bar1.style.marginTop= bar1Pos + "px";
			}
			break;
		case 38://arriba
			if(bar1Pos > 0 ){
				bar1Pos-=20;
				bar1.style.marginTop= bar1Pos + "px";
			}
			break;
		}
	};
}

function moveBar2(){
		var direction = 0;
		while(direction != 2){
			if(bar2Pos <= 450 && direction == 0){
				for(var i = 0; i < 22; i++){
					bar2Pos+=20;
					bar2.style.marginTop= bar2Pos + "px";
				}
				direction = 1;
			}

			if(bar2Pos > 0 && direction == 1){
				for(var i = 0; i < 22; i++){
					bar2Pos -= 20;
					bar2.style.marginTop= bar2Pos + "px";
				}
				direction = 0;
			}
		}
}


var direction = 3;
var PosX = 0;
var PosY = 0;
var col = 0;

function moveBall(direction){
	var interv = setInterval(frame, 5);
	function frame(){
		if(ball.style.top == 255 + "px" || ball.style.left == 390 + "px" || ball.style.top == -265 + "px" || ball.style.left == -400 + "px" || PosX == -380 || PosX == 370){
			if(PosX == -380 || PosX == 370){
				direction = barCollision(direction,col);
				clearInterval(interv);
				if(col == 0){
					if(PosX == -380) PosX = -381;
					else PosX = 371;
				}
				else{
					if(PosX == -380) PosX = -379;
					else PosX = 369;
				}
				col = 0;
			}
			else{
			direction = wallColision(direction);
			clearInterval(interv);
			if(direction == 1 || direction == 3){
				ball.style.top = 254 + "px";
			}
			else ball.style.top = -264 + "px";
			//resetBall();
			}
			moveBall(direction);
			if(ball.style.left == 390 + "px" || ball.style.left == -400 + "px") resetBall();
		}
		else{
			switch(direction){
			case 1: //arriba derecha
				PosX++;
				PosY--;
				ball.style.top = PosY + "px";
				ball.style.left = PosX + "px";
				break;
			case 2: //abajo derecha
				PosX++;
				PosY++;
				ball.style.top = PosY + "px";
				ball.style.left = PosX + "px";
				break;
			case 3: //arriba izquierda
				PosX--;
				PosY--;
				ball.style.top = PosY + "px";
				ball.style.left = PosX + "px";
				break;
			case 4://abajo izquierda
				PosX--;
				PosY++;
				ball.style.top = PosY + "px";
				ball.style.left = PosX + "px";
				break;
			}

		}
	}
}

function barCollision(d2){
	if(PosX == -380){
		if((bar1Pos + 70) - (PosY + 265) <= 79 && (bar1Pos + 70) - (PosY + 265) >=-5 ){
			if(d2 == 4) d2 = 1;
			else if(d2 == 3) d2 = 4;
			col = 1;
		}

	}
	if(PosX == 370){
		if((bar2Pos + 70) - (PosY + 265) <= 79 && (bar2Pos + 70) - (PosY + 265) >=0){
			if(d2 == 1) d2 = 4;
			else if(d2 == 2) d2 = 3;
			col = 1;
		}
	}
	return d2;
}

function wallColision(d1){
	if(ball.style.top == 255 + "px"){
		if(d1 == 2) d1 = 1;
		else if(d1 == 4) d1 = 3;
	}
	if(ball.style.top == -265 + "px"){
		if(d1 == 1) d1 = 2;
		else if(d1 == 3) d1 = 4;
	}
	return d1;
}

function resetBall(){
	ball.style.top = 0 + "px";
	ball.style.left = 0 + "px";
	PosX = 0;
	PosY = 0;
}


moveBar1();
//moveBar2();
moveBall(direction);
