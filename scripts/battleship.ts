// Game
//     players
//         Scores
//     Grid
//         cells 2d arrays

class Game{

    players:[]
    // grid:[] []
    grid: string[][] =[]  //more correct .. an array of string arrays
    guessesLeft:number 
    // score:Scores

    private makeGrid(rows:number, columns:number){
                
        for(let i = 0; i<=rows; i++){
            
            this.grid.push([]) //puts in an empty row

            for(let j =0; j<=columns; j++){
                    this.grid[i].push(".")  //pushes dots into this row array
                }
            }
        }
    private positionShips(shipAmount:number){
        
        for(let i = 0; i<=shipAmount; i++){
        
            let y = Math.floor(Math.random()*this.grid.length)
            let x = Math.floor(Math.random()*this.grid[0].length) 

            this.grid[y][x]="s"

            

        }

    
    }

    constructor (rows:number, columns:number, players:string[]){
        this.grid = []
        this.players=[]
        this.guessesLeft = 10
        alert("constructing")
        // this.score = 0
        this.makeGrid(rows, columns)
        this.positionShips(10)

        
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
    
       
    
    renderGrid(){
        
        // generate html based on values in grid - table -flexgrid
       // genarates a view of the grid to the player
        
        for(let i = 0; i<this.grid.length; i++){

            let row = document.createElement("div")
            row.className = "gridRow"
            document.body.appendChild(row)

            for(let j = 0; j<this.grid[i].length; j++){
                
            
            if(this.grid[i] [j] == "."){ //i is rows j are columns

                    let water = document.createElement("div")    
                    water.className = "water"
                    row.appendChild(water)    
                
                }    
                
                else{
                    
                    let square = document.createElement("div")
                    square.className = "square"
                    row.appendChild(square)    

                }    
                
            
            }
                
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

const game=new Game(10, 40, ["human","computer"])
game.renderGrid()