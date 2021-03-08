let count = 0;
const winRows = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
]

const swap = (array, indexA, indexB) => {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

const checkEqual = (a, b, c) => {
  return a === b && a === c && a != null;
}

const permuteMoves = (movesList, indexA, indexB) => {
  // Base case 
  if (indexA === indexB) {
    count++;
    ticTacToe(movesList);
  } else {
    // Permutations made 
    for (let i = indexA; i <= indexB; i++) {
      // Swapping done 
      swap(movesList, indexA, i);

      // Recursion called 
      permuteMoves(movesList, indexA + 1, indexB);

      // Backtrack 
      swap(movesList, indexA, i);
    }
  }
}

const ticTacToe = (movesList) => {
  const grid = new Array(9);
  let whosTurn = 'X';
  let movesString = '';

  movesList.some((move, moveNum) => {
    grid[move] = whosTurn;
    movesString += move;
    
    if (moveNum+1 >= 5) {
      const winner = checkWinner(grid);
      if (winner !== 'NONE') {
        console.log(movesString);
        console.log(`WINNER: ${winner}`);
        return true;
      }
    }

    whosTurn = whosTurn === 'X' ? 'O' : 'X';
    return false;
  });

  console.log(movesString);
  console.log(`WINNER: NONE`);
}

const checkWinner = (grid) => {
  for (const row of winRows) {
    if (checkEqual(grid[row[0]], grid[row[1]], grid[row[2]])) {
      return grid[row[0]];
    }
  }

  return 'NONE';
};


const startJoshua = (numMoves) => {
  const movesList = [];

  for (let i = 0; i < numMoves; i++) {
    movesList.push(i);
  }

  permuteMoves(movesList, 0, movesList.length - 1)
};

startJoshua(9);