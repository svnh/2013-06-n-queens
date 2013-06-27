(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    getColumn: function (colIndex) {
      return _(_.range(this.get('n')))
        .map(function (rowIndex) {
        return this.get(rowIndex)[colIndex];
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      // console.log(this.get(rowIndex)[colIndex]);

      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)));
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n'));
    },

    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function (rowIndex) {
      var result = false;
      var row = this.get(rowIndex);
      var rowSum = _(row).reduce(function (memo, num) {
        return memo + num;
      }, 0);
      if (rowSum > 1) {
        result = true;
      }
      return result;
    },

    hasAnyRowConflicts: function () {
      var result = false;
      totalRows = this.get('n'); // --> 4

      for (var i = 0; i < totalRows; i++) {
        if (this.hasRowConflictAt(i)) {
          result = true;
        }
      }
      return result;
    },

    hasColConflictAt: function (colIndex) {
      var result = false;
      var col = this.getColumn(colIndex);
      var colSum = _(col).reduce(function (memo, num) {
        return memo + num;
      }, 0);
      if (colSum > 1) {
        result = true;
      }
      return result;
    },

    hasAnyColConflicts: function () {
      var result = false;
      totalCols = this.get('n'); // --> 4

      for (var i = 0; i < totalCols; i++) {
        if (this.hasColConflictAt(i)) {
          result = true;
        }
      }
      return result;
    },

    hasMajorDiagonalConflictAt: function (index) {
      var n = this.get('n');
      var sum = 0;
      // debugger;
      for (var i = 0; i < n; i++) {
        if (this.rows()[i][index + i]) {
          sum++;
        }
      }
      return !!(sum > 1);
    },

    hasAnyMajorDiagonalConflicts: function () {
      var result = false;
      totalDiags = this.get('n'); // --> 4

      for (var i = 0; i < totalDiags; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          result = true;
        }
      }

      return result;
    },

    hasMinorDiagonalConflictAt: function (index) {
      var n = this.get('n');
      var sum = 0;
      // debugger;
      for (var i = 0; i < n; i++) {
        if (this.rows()[i][index - i]) {
          sum++;
        }
      }
      return !!(sum > 1);
    },

    hasAnyMinorDiagonalConflicts: function () {
      var result = false;
      totalDiags = this.get('n'); // --> 4

      for (var i = 0; i < totalDiags; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          result = true;
        }
      }

      return result;
    },

  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());