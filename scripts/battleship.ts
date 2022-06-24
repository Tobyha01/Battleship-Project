class Player{

    grid:string[][] =[]

}

class Game{

    players:[]
    grid: string[][] =[]  //more correct .. an array of string arrays
    guessesLeft:number 
    private gameArea:HTMLElement = document.getElementById("gameArea")!
    // guessSquare:string 
    // score:Scores

    private makeGrid(rows:number, columns:number){
                
        for(let i = 0; i<=rows; i++){
            
            this.grid.push([]) //puts in an empty row

            for(let j =0; j<=columns; j++){
                
                this.grid[i].push("water")  //pushes dots into this row array
            
            }
        }
    }

    private positionShips(shipAmount:number){
        
        for(let i = 0; i<shipAmount; i++){
            
            let y = Math.floor(Math.random()*this.grid.length)
            let x = Math.floor(Math.random()*this.grid[0].length) 
            
            for(let i = 0; i<5; i++){            
                
                this.grid[y][x+i]="ship"

            }
            
        }

    }

    //need to create a public method to check whether if a square is ship or water, and change it as required.
    // Need to create another square type for when a ship square is chosen.   
    
    guessShip(guessesLeft:number, shipsLeft:number, guessSquare:string){

        let row = parseInt(guessSquare[1])-1
        let column = guessSquare.charCodeAt(0)-65
        if(this.grid[row][column] == "ship"){

        
            this.grid[row][column]="hit" 
            this.renderGrid()

        } 

    }
    
    constructor (rows:number, columns:number, players:string[], guessesLeft:number, guessSquare:string){
        this.grid = []
        this.players=[]
        this.guessesLeft = 10
        alert("constructing")
        // this.score = 0
        this.makeGrid(rows, columns)
        this.positionShips(10)

        // this.guessSquare       
        this.guessesLeft = guessesLeft
        // this.players = players 
        // this.score = score
    }
    
    renderGrid(){
        
        // genarates a view of the grid to the player
    this.gameArea.innerHTML = ""

        for(let i = 0; i<this.grid.length; i++){

            const row = document.createElement("div")
            let square = document.createElement("div")
            row.appendChild(square)
            square.innerHTML = i+1+"" 
            square.className = "label"
            row.className = "gridRow"
            this.gameArea.appendChild(row)

            for(let j = 0; j<this.grid[i].length; j++){
            
                let square = document.createElement("div")
                square.className=this.grid[i] [j]
                row.appendChild(square)

            }    
            
        }
        const row = document.createElement("div")
        row.className = "gridRow"
        this.gameArea.appendChild(row)
        for(let j = 0; j<=this.grid[0].length; j++){
            let square = document.createElement("div")
            square.className = "label"
            row.appendChild(square)
            square.innerHTML=" ABCDEFGHIJKLMNOPQRSTUVWXYZ"[j]
        }

    }

}

class Scores{
     
    shipsSunk:number
    shipsLeft:number
    yourShipsLeft:number

    constructor(shipsSunk:number, shipsLeft:number, yourShipsleft:number){

        this.shipsSunk = shipsSunk
        this.shipsLeft = shipsLeft
        this.yourShipsLeft = yourShipsleft
    }
}

const game=new Game(10, 10, ["human","computer"], 50, "a0")
game.renderGrid()

function shoot(){
    //read value from from box
    game.guessShip(0, 0, (<HTMLInputElement>document.getElementById("shoot")).value)
}