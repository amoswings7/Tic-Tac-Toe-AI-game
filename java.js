alert('Hey welcome to Amos\'s TIC-TAC-TOE ,Try to PLAY and see if you can win that\'s if you can win!!😉🤣😂😂')

let cells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('.reset-btn');
let aiPlayer = 'X';
let player2 = 'O';
let turn = player2;
let player1_claim = '<h1>Player X <br>plays next </h1>',
    player2_claim = '<h1>Player O <br>palys next </h1>',
    whoIs_next =document.getElementById('turn');

//all the winning combos of a match
let matched = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];
let num =0;

//this is a visual representation of the current board displaed by positions
let game_board = [0,1,2,3,4,5,6,7,8];
//previous player
let previuos = null;

//It sets a click event to each playable spot in the game 
cells.forEach((ele,index)=>{
    ele.addEventListener('click',() => {

        //calls the gameover function to check if game is a tie to change the game appearamce
        if(gameOver(game_board,game_board[index],false)){
            for(let element of cells){
                element.style.background ='black';
                element.style.color ='white';
            }
        }
        //checks if there is no more games to play or if there is already a winner
        for(let element of cells ){
            
            if(element.style.color ==='green'){
                alert('please reset the game to continue playing');
                return
            }
        }
       
        //if checks if the spot has been played already
        if(ele.innerHTML === 'O'|| ele.innerHTML ==='X')return;
        game_board[index] = turn;
        turn === 'O'?turn =aiPlayer:turn =player2;
        ele.innerHTML = game_board[index];
        //it checks if a person  or a computer won
        let checkWin = checkWinner(game_board);//returns all the winning positions if a win is found
        let game_over =gameOver(game_board,game_board[index],false); //returns a boolen value

        //if theres a draw in the game
        if(game_over){
            for(let element of cells){
                element.style.background ='black';
                element.style.color ='white';
            }
        }

        //if theres a win in the game then this function runs
        if(checkWin){
            for(let num of checkWin.nums){
                cells[num].style.color = 'green'
            }
            gameOver(game_board,game_board[index],true);
            return
        }
        previuos = player2
        setTimeout(()=>{
            if(previuos === aiPlayer){
                return
            }else{
                play()
                previuos =aiPlayer
            }
        },0)
        return
    })
})
function play(){
    let result = aiMove();
    cells[result.index].click()
    return 
}

//checks if a person or a computer won
function checkWinner(gameBoard){
    for(let combo of matched){
        let [a,b,c] =combo;
        if(gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            return {state:true,nums:[a,b,c]}
        }
    }
    return false
}
//its a reset button 
resetBtn.addEventListener('click',()=>{
    cells.forEach((cell)=>{
        cell.innerHTML='';
        cell.style.color ='black';
        cell.style.background ='white'
        turn = player2
    });
    for(let i =0;i<9;i++){
        game_board[i] = i;
    }
    return
})
//searches for all spaces that hasnt been played yet
function blank_spaces(gameBoard){
    let empty  = gameBoard.filter(cell => typeof cell === 'number');
    return empty
}


let aiMove = ()=>{
  return minimax(game_board,aiPlayer,0)
}

//The computer player
function minimax(gameBoard,player,depth){
    let board_shadow =[...gameBoard]
    let ifWinner = checkWinner(board_shadow);
    let emptySpots = blank_spaces(board_shadow)
    if(ifWinner){
        if(player ===aiPlayer){
            return {score:-10}
        }else{
            return {score:10}
        }
    }
    if(emptySpots.length ===0){
        return {score:0}
    }
    // if(depth ===6){
    //     return {score:0}
    // }
    let all_moves = []
    for(let i = 0;i<emptySpots.length;i++){
        let move = {};
        move.index = board_shadow[emptySpots[i]];
        board_shadow[emptySpots[i]] = player;
        if (player == aiPlayer){
            var result = minimax(board_shadow, player2,depth+1);
            move.score = result.score;
          }
          else{
            var result = minimax(board_shadow, aiPlayer,depth+1);
            move.score = result.score;
          }
        board_shadow[emptySpots[i]] = move.index;
        all_moves.push(move)
    }
  if(player === aiPlayer){
      all_moves.sort((a,b) => {
        return a.score-b.score
     })

     return all_moves[all_moves.length-1]

  }else{
    all_moves.sort((a,b) => {
        return a.score-b.score
     })
     return all_moves[0]
  }
}
//It checks if game is over
function gameOver(board,player,bool){
    //returns a newboard consisting only of positions that hasnt been played yet
    let newBoard = [...board].filter(item => typeof item === 'number');
    console.log(newBoard)

    //if no winner or when its a tie game
    if(newBoard.length ===0){
       alert('It\'s a tie game')
       return true
    }else if(bool){
        //if winner is found
        if(player==='X'){
            alert('Oops you lost')
        }else if(player ==='O'){
            alert('You win')
        }
    }
}