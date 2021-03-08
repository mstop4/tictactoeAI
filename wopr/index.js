const fs = require('fs');

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
];

const output = [];
const gamesPlayed = new Set();

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
    if (count / 1000 === Math.floor(count / 1000)) {
      console.log (`Games played: ${count}`);
    }
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
  let hasWinner = false;

  const result = movesList.some((move, moveNum) => {
    grid[move] = whosTurn;
    movesString += move;
    
    if (moveNum+1 >= 5) {
      hasWinner = checkWinner(grid);
      if (hasWinner) {
        return true;
      }
    }

    whosTurn = whosTurn === 'X' ? 'O' : 'X';
    return false;
  });

  if (!gamesPlayed.has(movesString)) {
    output.push({
      moves: movesString,
      winner: hasWinner ? whosTurn : '-',
    });
    gamesPlayed.add(movesString);
  }
}

const checkWinner = (grid) => {
  for (const row of winRows) {
    if (checkEqual(grid[row[0]], grid[row[1]], grid[row[2]])) {
      return true;
    }
  }

  return false;
};


const startJoshua = (numMoves) => {
  const movesList = [];

  for (let i = 0; i < numMoves; i++) {
    movesList.push(i);
  }

  permuteMoves(movesList, 0, movesList.length - 1);

  fs.writeFileSync('test.json', JSON.stringify(output));
};

startJoshua(9);