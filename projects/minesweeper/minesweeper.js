$(document).ready(function(){

var Config = {
	numRows: 8,
	numCols: 8,
	numMines: 10,
	container: $('.play-area')
};

function Cell(x, y){
	this.x = x;
	this.y = y;
	this.isMined = false;
	this.isRevealed = false;
	this.adjMines = 0;
}

var Timer = {	
	container : $('.timer, .time-stamp'),
	seconds : 0,
	minutes : 0,
	hours : 0,
	ivId: 0,
	start: function(){
		var timer = this;
		timer.ivId = window.setInterval( function(){
			timer.updateTime();
		}, 1000 );	
	},
	stop: function(){
		var timer = this;
		window.clearInterval(timer.ivId);
	},
	updateTime: function(){
		this.seconds++;
		if(this.seconds == 60){
			this.seconds = 0;
			this.minutes+= 1;
		}
		if(this.minutes == 60){
			this.minutes = 0;
			this.hours+= 1; 
		}
		this.printTime();
	},
	printTime: function(){
		var timeString = this.hours + ":";
		//Add another zero for format's sake
		if(this.minutes < 10){
			timeString += "0";	
		}
		timeString += this.minutes + ":";

		if(this.seconds < 10){
			timeString += "0";	
		}

		timeString += this.seconds;

		this.container.text(timeString);
	}
};

//grid: Array > Arrays (Rows) > Objects (Cells)
function Board(){
	this.grid = [];

	//Contains all mined cells placed on board.
	this.placedMines = [];

	//Used for cell revealing to avoid a recursive implosion
	this.toCheck = [];

	for(var y = 0; y < Config.numRows; y++){
		for(var x = 0; x < Config.numCols; x++){
			//Create cells
			this.grid.push( new Cell(x, y));
		}
	}
	this.placeMines();
	this.printBoard();
	this.calcMineAdj();
	Timer.printTime();
}

var victory = function(){
	Timer.stop();
	$('.screen').show();
	$('.splash.victory').show();
};

var defeat = function(){
	Timer.stop();
	$('.screen').show();
	$('.splash.blown-up').show();
};



//Returns a cell object from the grid
Board.prototype.getCell = function(x, y){
    for(var i = 0; i < this.grid.length; i++ ) {
        if(this.grid[i].x === x && this.grid[i].y === y) {
            return this.grid[i];
        }
    }
};

//Assign each mine to a random cell
Board.prototype.placeMines = function(){

	for(var i = 0; i < Config.numMines; i++){

		var randomRow = Math.floor(Math.random()*Config.numRows);
		var randomCol = Math.floor(Math.random()*Config.numCols);

		var thisCell = this.getCell(randomCol, randomRow);

		//If the mine position isn't in array of mine positions
		if(thisCell.isMined === false){
			//Changed to isMined
			thisCell.isMined = true;
			this.placedMines.push(thisCell);
		}
	}
};

//Prints out the visible version of the game board.
Board.prototype.printBoard = function(){

	//Create the board
	var board = $('<ul class="board"></ul>');
	Config.container.append(board);

	//Create a number of rows based on config variables
	//Insert cells into rows based on the grid
	for(var y = 0; y < Config.numRows; y++){
		//Add rows to the board
		board.append('<ul class="row" data-y="' + y + '"></ul>');
		//Add cells from the grid
		for( var i = 0; i < this.grid.length; i++){
			//If the cell is in the same row
			if(y == this.grid[i].y){
				$('ul.row[data-y = '+ y +']').append('<li data-x=' + this.grid[i].x + ' data-y=' + this.grid[i].y + ' ></li>');
			}
		}
	}
};

//Calculate mine adjacency for all the cells on the board
Board.prototype.calcMineAdj = function(){
	for(var i = 0; i < this.grid.length; i++ ){
		this.countAdjMines(this.grid[i]);
	}
};

//Checks whether or not a cell occurs on the game board.
Board.prototype.cellExists = function(x, y){
	if(x >= Config.numRows || x < 0 || y >= Config.numCols || y < 0){
		return false;
	}
	else return true;
};

//Checks which adjacent cells exist and returns an array
Board.prototype.whichNeighborsExist = function(cell){
	x = cell.x;
	y = cell.y;
	var toCount = [];
	var toVerify = [[(x-1), y], [(x-1), (y+1)], [x, (y+1)], [(x+1), (y+1)], [(x+1), y], [(x+1), (y-1)], [x, (y-1)], [(x-1), (y-1)]];
	//Check each of the cells to make sure that it exists on the board
	for(var i = 0; i < toVerify.length; i++){
		if(this.cellExists( toVerify[i][0], toVerify[i][1] )){
			//This cell exists on the board and should be counted.
			toCount.push(toVerify[i]);
		}
	}
	return toCount;
};

//Count how many mines are in the neighboring cells.
//Checks to see if those cells exist on the board first.
Board.prototype.countAdjMines = function(cell){
	var count = 0;
	var toCount = this.whichNeighborsExist(cell);

	for(var i = 0; i < toCount.length; i++){
		x = toCount[i][0];
		y = toCount[i][1];
		//If the cell is mined, it should be added to the count
		if(this.getCell(x, y).isMined){
			count ++ ;
		}
	}
	cell.adjMines = count;
};

Board.prototype.showMines = function(){
	//Loop through each of the mined cells and reveal
	for(var i = 0; i < this.placedMines.length; i ++){
		this.revealCell(this.placedMines[i]);
	}
};

//Checks the contents of the cell object and reveals them on the board
Board.prototype.revealCell = function(cell){
	//If the cell hasn't been revealed
	if(!cell.isRevealed){
		//The cell is still hidden, check it	
		cell.isRevealed = true;
		var physicalCell = $('.board li[data-y = '+ cell.y +'][data-x = '+ cell.x + ']');
		if(cell.isMined === true){
			physicalCell.addClass("mine");
		}
		else if(cell.adjMines === 0){
			physicalCell.addClass("cleared");
			this.revealAdj(cell);
		}
		else{
			physicalCell.text(cell.adjMines).addClass("border");
		}
	}
};

//Reveal adjacent cells
//Used if the cell has no neighboring mines (its adjMines = 0)
Board.prototype.revealAdj = function(cell){

	//Find out if neighbors exist on board
	var toCount = this.whichNeighborsExist(cell);

	//Reveal all neighbors that exist on board
	for(var i = 0; i < toCount.length; i++){
		adjCell = this.getCell(toCount[i][0], toCount[i][1]);
			this.revealCell(adjCell);
	}
};

Board.prototype.clickCell = function(jThis){
	var guessX = jThis.data("x");
	var	guessY = jThis.data("y");
	var cell = this.getCell(guessX, guessY);
	this.revealCell(cell);
	//Mine has been clicked on
	if(cell.isMined){
		defeat();
	}
};

Board.prototype.validate = function(){
	var count = 0;
	for(var i = 0; i < this.grid.length; i++){
		if(this.grid[i].isRevealed && !this.grid[i].isMined){
			count ++;
		}
	}
	if(count >= (Config.numRows * Config.numCols) - Config.numMines){
		victory();
	}
	else defeat();
};


	board = new Board();

	$('.board li').click(function(){
		if(Timer.ivId === 0){
			Timer.start();
		}
	});

	//If the cheat button is clicked, show the mines on the board
	$('.cheat').on('click',function(){
		board.showMines();
	});

	$('.board li').on('click',function(){
		var jThis = $(this);
		board.clickCell(jThis);
	});

	$('.new-game').on('click',function(){
		location.reload();
	});

	$('.validate').on('click',function(){
		board.validate();
	});

});