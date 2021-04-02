alert('Hey welcome to Amos\'s TIC-TAC-TOE ,if you can win this game agaisnt the computuer then you will get a $1000 😉🤣😂😂')

let cells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('.reset-btn');
let aiPlayer = 'X';
let player2 = 'O';
let turn = player2;
let player1_claim = '<h1>Player X <br>plays next </h1>',
    player2_claim = '<h1>Player O <br>palys next </h1>',
    whoIs_next =document.getElementById('turn');

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

let game_board = [0,1,2,3,4,5,6,7,8];
let previuos = null;

//It sets a click event to each playable spot in the game 
cells.forEach((ele,index)=>{
    ele.addEventListener('click',() => {
        for(let element of cells ){
            
            if(element.style.color ==='green'){
                alert('please reset the game to continue playing');
                return
            }
        }
        if(blank_spaces(game_board).length = 0){
            alert('It\s a tie game');
            return
        }
        //if checks if the spot has been played already
        if(ele.innerHTML === 'O'|| ele.innerHTML ==='X')return;
        game_board[index] = turn;
        turn === 'O'?turn =aiPlayer:turn =player2;
        ele.innerHTML = game_board[index];
        //it checks if a person  or a computer won
        let checkWin = checkWinner(game_board);
        gameOver(game_board,game_board[index],false);
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
        },500)
        return
    })
})

function play(){
    let result = aiMove();
    console.log(result)
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
    if(depth ===6){
        return {score:0}
    }

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

// return the chosen move (object) from the moves array
//   return all_moves[bestMove];
    // all_moves.sort((a,b) => {
    //     return a-b
    //})

    // return {score:all_moves[all_moves.length[-1]].score}
    
    
}

if(cells[0].onC){
    console.log('its clicked')
}
function gameOver(board,player,bool){
    let newBoard = [...board];
    if(newBoard.length ===1){
       alert('It\'s a tie game')
    }else if(bool){
        if(player==='X'){
            alert('Oops you lost')
        }else if(player ==='O'){
            alert('You win')
        }
    }
    return
}