$(document).ready(function($) {

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	Canvas = {
		color: '#000',
		stroke: '#CCC',
		draw: function(){
			drawRect(Canvas.color, Canvas.stroke, 0, 0, canvas.width, canvas.height);
		}
	};

	Game = {
		over: false,
		paused: false,
		atStart: true,
		score: 0,
		scoreIncrement: 10,
		fps: 10,
		font: '32px Silkscreen',
		fontColor: '#FFFFFF',

		init: function(){
			Snake.init();
			Game.writeScore();
		},
		start: function(){
			Game.atStart = false;
		},
		end: function(){
			Game.over = true;
			//Write game over to the canvas
			Game.writeToScreen("Game Over");
		},
		writeScore: function(){
			$('#score-box').text(Game.score);
		},
		pause: function(){
			if(!Game.over){
				if(Game.paused === true){
					Game.paused = false;
					requestAnimFrame(gameLoop);
				}
				else{
					Game.paused = true;
					Game.writeToScreen("Paused");
				}	
			}	
		},
		writeToScreen: function(text){
			ctx.font = Game.font;
			ctx.textAlign = 'center';
			ctx.fillStyle = Game.fontColor;
			ctx.fillText(text, canvas.width/2, canvas.height/2);
		}
	};

	Snake = {
		direction : 'up',
		color: '#5ed962',
		stroke: '#559144',
		//An array of x,y positions (top left corners) forming sections of the snake
		segments: [[canvas.width / 2, canvas.height / 2]],
		startingLen: 3,
		size: 20,
		
		//Create the snake and add section positions to the segments
		init: function(){
			for(i = 1; i < Snake.startingLen; i ++){
				var yOffset = i * Snake.size; 
				newSegment = [Snake.x, Snake.y + yOffset];
				Snake.segments.push(newSegment);
			}
		},

		draw: function(){
			for(i = 0; i < Snake.segments.length; i++){
				drawRect(Snake.color, Snake.stroke, Snake.segments[i][0], Snake.segments[i][1], Snake.size, Snake.size);
			}
		},

		addSegment: function(){
			//Add a new link
			var clonedSeg = Snake.segments[Snake.segments.length - 1];
			Snake.segments.push(clonedSeg);
		},

		hitApple : function(){
			if(Snake.segments[0][0] == Apple.x && Snake.segments[0][1] == Apple.y){
				//Add a segment
				Snake.addSegment();
				//Generate a new position
				Apple.newPos();
				//Add points
				Game.score += Game.scoreIncrement;
				Game.writeScore();
			}
		},

		hitSnake : function(x , y){
			//Set default values
			x = x || Snake.segments[0][0];
			y = y || Snake.segments[0][1];

			for( i = 1; i < Snake.segments.length ; i += 1 ){
				if(Snake.segments[i][0] == x && Snake.segments[i][1] == y){
					return true;
				}
			}
		},

		changeDirection : function(key){
		
			Snake.lastDirection = Snake.direction;
			switch(key){
				case 38 || 87:
					if(Snake.direction != 'down'){
						Snake.direction = 'up';
					}
					break;
				case 40 || 83:
					if(Snake.direction != 'up'){
						Snake.direction = 'down';
					}
					break;
				case 37 || 64:
					if(Snake.direction != 'right'){
						Snake.direction = 'left';
					}
					break;
				case 39 || 68:
					if(Snake.direction != 'left'){
						Snake.direction = 'right';	
					}
					break;
			}
		},
		
		//Moves one unit;
		move: function(){

			var newHead = [];
			//If the snake has run into a border, draw the snake on the opposite side of the canvas
			if(Snake.segments[0][0] + Snake.size > canvas.width){
				Game.end();
				Game.over = true;	
			}
			if(Snake.segments[0][0] < 0){
				//newHead[0] = Snake.segments[0][0] += (canvas.width);
				Game.end();
				Game.over = true;
			}
			if(Snake.segments[0][1] + Snake.size > canvas.height){
				//newHead[1] = Snake.segments[0][1] -= (canvas.height);
				Game.end();
				Game.over = true;
			}
			if(Snake.segments[0][1] < 0){
				//newHead[1] = Snake.segments[0][1] += (canvas.height);
				Game.end();
				Game.over = true;
			}
			switch(Snake.direction){
				case 'left':
					newHead = [(Snake.segments[0][0] - Snake.size), Snake.segments[0][1]];
					break;
				case 'right':
					newHead = [(Snake.segments[0][0] + Snake.size), Snake.segments[0][1]];
					break;
				case 'up':
					newHead = [Snake.segments[0][0], (Snake.segments[0][1] - Snake.size)];
					break;
				case 'down':
					newHead = [Snake.segments[0][0], (Snake.segments[0][1] + Snake.size)];
					break;
			}

			//Add the new head, remove the tail 
			Snake.segments.unshift(newHead);
			Snake.segments.pop();

			//Check for apple collisions
			Snake.hitApple();
			Snake.draw();
			//If the snake has collided with itself
			if(Snake.hitSnake()){
				//End Game
				Game.end();
				Game.over = true;
			}
		}
	};

	Apple = {
		x: randomX(),
		y: randomY(),
		size: Snake.size,
		color: '#FF2E1C',
		stroke: '#874c46',
		newPos: function(){
			Apple.x = randomX();
			Apple.y = randomY();

			//Avoid regenerating the apple on top of the snake
			if(Snake.hitSnake(Apple.x, Apple.y)){
				Apple.newPos();
			}
			Apple.draw();
		},

		draw: function(){
			drawCirc(Apple.color, Apple.stroke, Apple.x, Apple.y, Apple.size);	
		}
	};

	//Generates a random position within the canvas
	function randomX(){
		return Math.floor(Math.random() * Snake.size) * canvas.width / Snake.size;
	}
	function randomY(){
		return Math.floor(Math.random() * Snake.size) * canvas.height / Snake.size;
	}

	//Draws a solid rectangle to the canvas
	function drawRect(color, strokeColor, x, y, width, height){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = strokeColor;
		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width,height);
		ctx.closePath();

	}

	function drawCirc(color, strokeColor, x, y, size){
		//Generate the center coordinate
		var centerX = x + (size/2);
		var centerY = y + (size/2);
		var radius = size/2;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = strokeColor;
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}	
	
	addEventListener('keydown', function(e){
		var key = e.keyCode;
		if(key == 38 || key == 87 || key == 40 || key == 283){
			e.preventDefault();
		}
		Snake.changeDirection(key);
	});

	//Adjust requestAnimationFrame compatibility
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	Game.init();
	function gameLoop(){
		if(!Game.over && !Game.paused){
			Canvas.draw();
			if(!Game.atStart){
				Snake.move();
				Apple.draw();

				setTimeout(function(){
					requestAnimFrame(gameLoop);
				}, 1000 / Game.fps);
			}
		}		
	}
	requestAnimFrame(gameLoop);

	$('#pause').click(function(){
		Game.pause();
	});
	$('#start').click(function(){
		if(Game.atStart){
			Game.start();
			gameLoop();
		}		
	})
	$('#new-game').click(function(){
		location.reload();
	});
});
