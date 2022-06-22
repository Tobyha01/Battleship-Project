"use strict";
// Game
//     players
//         Scores
//     Grid
//         cells 2d arrays
class Game {
    constructor(rows, columns, players) {
        // grid:[] []
        this.grid = []; //more correct .. an array of string arrays
        this.grid = [];
        this.players = [];
        this.guessesLeft = 10;
        alert("constructing");
        // this.score = 0
        this.makeGrid(rows, columns);
        this.positionShips(10);
        // for(let i = 0; i<=rows; i++){
        //     grid.push([])
        //     for(let j =0; j<=columns; j++){
        //         grid[i].push(".")
        //     }
        // }
        // this.grid [0].push([]) 
        // this.guessesLeft = guessesLeft
        // this.players = players 
        // this.score = score
    }
    // score:Scores
    makeGrid(rows, columns) {
        for (let i = 0; i <= rows; i++) {
            this.grid.push([]); //puts in an empty row
            for (let j = 0; j <= columns; j++) {
                this.grid[i].push("."); //pushes dots into this row array
            }
        }
    }
    positionShips(shipAmount) {
        for (let i = 0; i <= shipAmount; i++) {
            let y = Math.floor(Math.random() * this.grid.length);
            let x = Math.floor(Math.random() * this.grid[0].length);
            this.grid[y][x] = "s";
        }
    }
    renderGrid() {
        // generate html based on values in grid - table -flexgrid
        // genarates a view of the grid to the player
        for (let i = 0; i < this.grid.length; i++) {
            let row = document.createElement("div");
            row.className = "gridRow";
            document.body.appendChild(row);
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == ".") { //i is rows j are columns
                    let water = document.createElement("div");
                    water.className = "water";
                    row.appendChild(water);
                }
                else {
                    let square = document.createElement("div");
                    square.className = "square";
                    row.appendChild(square);
                }
            }
        }
    }
}
class Scores {
    constructor(shipsSunk, shipsLeft, yourShipsleft) {
        this.shipsSunk = shipsSunk;
        this.shipsLeft = shipsLeft;
        this.yourShipsLeft = yourShipsleft;
    }
}
const game = new Game(10, 40, ["human", "computer"]);
game.renderGrid();
