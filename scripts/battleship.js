var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.grid = []; //more correct .. an array of strings arrays
        this.gameArea = document.getElementById("gamearea").appendChild(document.createElement("div"));
        this.gameArea.className = "grid";
        this.makeGrid(9, 9);
        this.positionShips(4);
        this.renderGrid();
    }
    Player.prototype.makeGrid = function (rows, columns) {
        for (var i = 0; i <= rows; i++) {
            this.grid.push([]); //puts in an empty row
            for (var j = 0; j <= columns; j++) {
                this.grid[i].push("water"); //pushes dots into this row array
            }
        }
    };
    Player.prototype.renderGrid = function () {
        // genarates a view of the grid to the player
        this.gameArea.innerHTML = "";
        for (var i = 0; i < this.grid.length; i++) {
            var row_1 = document.createElement("div");
            var square = document.createElement("div");
            row_1.appendChild(square);
            square.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
            square.className = "label";
            row_1.className = "gridRow";
            this.gameArea.appendChild(row_1);
            for (var j = 0; j < this.grid[i].length; j++) {
                var square_1 = document.createElement("div");
                var content = this.grid[i][j];
                if (content == "ship" && this.name.toLowerCase() == "computer") //if computers grid
                 {
                    square_1.className = "water";
                } //display water not ships 
                else {
                    square_1.className = this.grid[i][j];
                }
                row_1.appendChild(square_1);
            }
        }
        var row = document.createElement("div");
        row.className = "gridRow";
        this.gameArea.appendChild(row);
        for (var j = 0; j <= this.grid[0].length; j++) {
            var square = document.createElement("div");
            square.className = "numbers";
            row.appendChild(square);
            if (j == 0) {
                square.innerHTML = "";
            }
            else {
                square.innerHTML = j + "";
            }
        }
    };
    Player.prototype.checkGrid = function (guessesLeft, shipsLeft, guessSquare) {
        var column = parseInt(guessSquare[1]) - 1;
        var row = guessSquare.charCodeAt(0) - 65;
        if (this.grid[row][column] == "ship") {
            this.grid[row][column] = "hit";
        }
        else {
            this.grid[row][column] = "miss";
        }
        this.renderGrid();
    };
    Player.prototype.positionShips = function (shipAmount) {
        //create a separate for loop for vertical and hrizontal position, which takes half the shipamount each    
        for (var i = 0; i < shipAmount; i++) {
            var x = 0;
            var y = 0;
            for (var attempt = 0; attempt < 100; attempt++) {
                y = Math.floor(Math.random() * (this.grid.length - 4));
                x = Math.floor(Math.random() * (this.grid[0].length - 1)); //has to be -4 when laying across instead of down 
                var laid = 0;
                for (var j = 0; j < 5; j++) {
                    // if(this.grid[y][x+j] = laid/2) //while column has less than half ship amount, x=, y=, grid y+ half ship amount 
                    if (this.grid[y + j][x] === "ship") {
                        break;
                    }
                    // if(this.grid[y+j][x] || this.grid[y][x+j] === "ship"){ break }
                    laid++;
                }
                if (laid == shipAmount) {
                    break;
                }
            }
            for (var j = 0; j < 5; j++) {
                this.grid[y + j][x] = "ship";
                // this.grid[y][x+j] = "ship"
            }
        }
    };
    return Player;
}());
var Game = /** @class */ (function () {
    // guessSquare:string 
    // score:Scores
    function Game(playerNames, guessesLeft, guessSquare) {
        this.players = [];
        this.gameArea = document.getElementById("gameArea");
        this.players = [];
        for (var i = 0; i < playerNames.length; i++) {
            this.players.push(new Player(playerNames[i]));
        }
        this.guessesLeft = 10;
        // this.score = 0
        // this.guessSquare       
        this.guessesLeft = guessesLeft;
        // this.score = score
    }
    return Game;
}());
var Scores = /** @class */ (function () {
    function Scores(shipsSunk, shipsLeft, yourShipsleft) {
        this.shipsSunk = shipsSunk;
        this.shipsLeft = shipsLeft;
        this.yourShipsLeft = yourShipsleft;
    }
    return Scores;
}());
var game = new Game(["human", "computer"], 50, " ");
function shoot() {
    //read value from from box
    game.players[1].checkGrid(0, 0, document.getElementById("shoot").value); //players shot on computers grid
    var guessRow = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * game.players[0].grid.length)]; //computers shot on player
    var guessColumn = Math.floor(Math.random() * game.players[0].grid[0].length).toString();
    game.players[0].checkGrid(0, 0, guessRow + guessColumn); //computer guess will be random everytime
}
