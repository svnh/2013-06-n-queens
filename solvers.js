// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

var makeEmptyMatrix = function (n) {
  return _(_.range(n)).map(function () {
    return _(_.range(n)).map(function () {
      return 0;
    });
  });
};

window.findNRooksSolution = function (n) {
  var board = new Board(makeEmptyMatrix(n));
  var solution = false;

  var iterate = function (row) {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (row === n-1){
          solution = true;
          return;
        }
        if (board.hasAnyRooksConflicts) {
          board.togglePiece(row, i);
        } else {
          return iterate(row + 1);
        }
      }
    };
    //if I successfully place a queen AND im in the last row, print my current board!

 iterate(0);

console.log('Single solution for ' + n + ' rooks:', board);
return board;
};

// function factorial(n) {
//   if (n < 0) {
//     // Termination condition to prevent infinite recursion
//     console.log("ALERT: you entered a negative number which will break ths code");
//     return;
//   }
//   // Base case
//   if (n === 0) {
//     return 1;
//   }
//   // Recursive case
//   return n * factorial(n - 1);
// }

window.countNRooksSolutions = function (n) {

  var solutionCount = function (n) {
    if (n < 0) {
      return;
    }
    // Base case
    if (n === 0) {
      return 1;
    }
    // Recursive case
    return n * solutionCount(n - 1);
  };

  return solutionCount(n);
};

window.findNQueensSolution = function (n) {
  var board = new Board(makeEmptyMatrix(n));
  var solution = false;

  var iterate = function (row) {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (row === n-1){
          solution = true;
          return;
        }
        if (board.hasAnyQueensConflicts) {
          board.togglePiece(row, i);
        } else {
          return iterate(row + 1);
        }
      }
    };
    //if I successfully place a queen AND im in the last row, print my current board!

 iterate(0);

console.log('Single solution for ' + n + ' queens:', board);
return board;
};

window.countNQueensSolutions = function (n) {
  // var board = new Board(makeEmptyMatrix(n));
  // var solution = false;
  // var count = 0;

  // var iterate = function (row) {
  //     for (var i = 0; i < n; i++) {
  //       board.togglePiece(row, i);
  //       if (row === n-1){
  //         solution = true;
  //         count++;
  //         return;
  //       }
  //       if (board.hasAnyQueensConflicts) {
  //         board.togglePiece(row, i);
  //       } else {
  //         return iterate(row + 1);
  //       }
  //     }
  //   };
    //if I successfully place a queen AND im in the last row, print my current board!

 // iterate(0);

  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;

};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function (matrix) {
  $('body').html(
    new BoardView({
    model: new Board(matrix)
  }).render());
};