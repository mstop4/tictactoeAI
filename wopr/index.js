let count = 0;

const swap = (array, indexA, indexB) => {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

const permute = (array, indexA, indexB) => {
  // Base case 
  if (indexA === indexB) {
    count++;
    console.log(count);
  } else {
    // Permutations made 
    for (let i = indexA; i <= indexB; i++) {
      // Swapping done 
      swap(array, indexA, i);

      // Recursion called 
      permute(array, indexA + 1, indexB);

      // Backtrack 
      swap(array, indexA, i);
    }
  }
}

const startPermutation = (arraySize) => {
  const numArray = [];

  for (let i = 0; i < arraySize; i++) {
    numArray.push(i);
  }

  permute(numArray, 0, numArray.length - 1)
};

startPermutation(9);