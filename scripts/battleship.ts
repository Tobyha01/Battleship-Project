class Player{
    
    gameArea:HTMLDivElement 
    grid:string[][] =[] //more correct .. an array of strings arrays
        
    constructor(private name:string){
        this.gameArea = <HTMLDivElement> document.getElementById("gamearea")!.appendChild(document.createElement("div")) 
        this.gameArea.className="grid"
        this.makeGrid(9,9)
        this.positionShips(4)
        this.renderGrid()
    }
    
    private makeGrid(rows:number, columns:number){
                
        for(let i = 0; i<=rows; i++){
            this.grid.push([]) //puts in an empty row

            for(let j =0; j<=columns; j++){
                this.grid[i].push("water")  //pushes dots into this row array
            }
        }
    }
    
    renderGrid(){
        
        // genarates a view of the grid to the player
        this.gameArea.innerHTML = ""  

        for(let i = 0; i<this.grid.length; i++){

            const row = document.createElement("div")  
            let square = document.createElement("div") 
            row.appendChild(square) 
            square.innerHTML="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i] 
            square.className = "label"
            row.className = "gridRow"
            this.gameArea!.appendChild(row)

            for(let j = 0; j<this.grid[i].length; j++){
            
                let square = document.createElement("div")
                let content = this.grid[i][j]
                
                if(content == "ship" && this.name.toLowerCase() == "computer") //if computers grid
                { square.className = "water" } //display water not ships 
                
                else { square.className=this.grid[i] [j] }

                row.appendChild(square)
            }    
        }

        const row = document.createElement("div") 
        row.className = "gridRow"
        this.gameArea!.appendChild(row)
        
        for(let j = 0; j<=this.grid[0].length; j++){
            
            let square = document.createElement("div")
            square.className = "numbers"
            row.appendChild(square)
            if(j==0){
                square.innerHTML = ""    
            }
            else{
                square.innerHTML = j+""
                                
            }

        }

    }
    
    checkGrid(guessesLeft:number, shipsLeft:number, guessSquare:string){

        let column = parseInt(guessSquare[1])-1
        let row = guessSquare.charCodeAt(0)-65

        if(this.grid[row][column] == "ship")
        { this.grid[row][column]="hit" }

        else { this.grid[row][column]="miss" } 
        
        this.renderGrid()
    }

    private positionShips(shipAmount:number){
        
    //create a separate for loop for vertical and hrizontal position, which takes half the shipamount each    
        
        for(let i = 0; i<shipAmount; i++){

            let x = 0
            let y = 0

            for(let attempt = 0; attempt<100; attempt++){

                y = Math.floor(Math.random()*(this.grid.length-4))
                x = Math.floor(Math.random()*(this.grid[0].length-1)) //has to be -4 when laying across instead of down 
                let laid = 0
                    
                for(let j = 0; j<5; j++){            

                    // if(this.grid[y][x+j] = laid/2) //while column has less than half ship amount, x=, y=, grid y+ half ship amount 
                    
                    
                    
                    if(this.grid[y+j][x] === "ship"){ break }
                    // if(this.grid[y+j][x] || this.grid[y][x+j] === "ship"){ break }
                    
                    laid++            
                }
                
                if(laid == shipAmount){ break }
            }
            
            for(let j = 0; j<5; j++){            

                this.grid[y+j][x] = "ship" 
                // this.grid[y][x+j] = "ship"
            }
            
        }

    }
}

class Game{

    players:Player[] = []
    guessesLeft:number 
    private gameArea:HTMLElement = document.getElementById("gameArea")!
    // guessSquare:string 
    // score:Scores

    constructor (playerNames:string[], guessesLeft:number, guessSquare:string){
        
        this.players=[]
        for(let i = 0; i<playerNames.length; i++){
          this.players.push(new Player(playerNames[i]))
        }
        
        this.guessesLeft = 10
                
        // this.score = 0
        // this.guessSquare       
        
        this.guessesLeft = guessesLeft
        // this.score = score
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

const game=new Game(["human","computer"], 50, " ")

function shoot(){
    //read value from from box
    game.players[1].checkGrid(0, 0, (<HTMLInputElement>document.getElementById("shoot")).value) //players shot on computers grid
    let guessRow = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*game.players[0].grid.length)] //computers shot on player
    let guessColumn = Math.floor(Math.random()*game.players[0].grid[0].length).toString()
    game.players[0].checkGrid(0, 0, guessRow+guessColumn)  //computer guess will be random everytime
}