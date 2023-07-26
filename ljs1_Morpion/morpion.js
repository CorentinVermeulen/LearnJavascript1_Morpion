
var board = [["", "", ""], ["", "", ""], ["", "", ""]];
var player = "X";
var score = [0,0];


function initialize(){
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    player = "X";
    displayBoard();
}

function play(row, col){
    if(board[row][col] === "") {
        board[row][col] = player;

        if(checkWin(player)){
            updateScore(player);
            displayBoard(false);
            document.getElementById("playerIndicator").innerHTML = `Player ${player} won!`;
            return;
        }
        if (checkDraw()){
            updateScore("draw");
            displayBoard(false);
            document.getElementById("playerIndicator").innerHTML = `Draw!`;
            return;
        }
        player = (player === "X") ? "O" : "X";
        displayBoard(true);

    }
}

function checkWin(player){
    // Check if full row
    for (let  row =0; row < 3; row++ ){
        if( board[row][0] === player &&  board[row][1] === player &&  board[row][2] === player){
                return true;
        }
    }
    // Check if full col
    for (let col =0; col < 3; col++ ){
        if( board[0][col] === player &&  board[1][col] === player &&  board[2][col] === player){
            return true;
        }
    }

    if( board[0][0] === player &&  board[1][1] === player &&  board[2][2] === player){
        return true;
    }
    if( board[0][2] === player &&  board[1][1] === player &&  board[2][0] === player){
        return true;
    }
    return false;

}

function checkDraw(){
    for (let row =0; row < 3; row++ ){
        for (let col =0; col < 3; col++ ) {
            if (board[col][row] === "") {
                return false;
            }
        }
    }
    return true;
}


function updateScore(winner){
    if(winner === "draw"){
        score[0] +=1;
        score[1] +=1;
    }
    else if(winner === "X"){
        score[0] +=1;
    }
    else score[1] +=1;
}


function displayBoard(playable=true){
    const boardContainer = document.querySelector("#board");
    boardContainer.innerHTML = "";
    for (let row =0; row < 3; row++ ){
        for (let col =0; col < 3; col++ ) {
            const cell = document.createElement("div");
            cell.classList.add("box");
            cell.textContent = board[row][col];

            if(playable){
                cell.addEventListener("click", function(){play(row, col);});
            }
            else{
                cell.addEventListener("click", function(){initialize();});
            }

            boardContainer.appendChild(cell);
        }
    }

    // player turn indicator
    document.getElementById("playerIndicator").innerHTML = `Current Player: ${player}`;
    // score
    document.getElementById("score").innerHTML = `Score <br> X: ${score[0]} <br> O: ${score[1]}`;
}



function resetGame(){
    score = [0,0];
    initialize();
}

displayBoard(true);



