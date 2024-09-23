
/**
 * Manages a two-dimensional array of items.
 */
class Matrix extends Array {
	
	/**
	 * Creates a new instance of the Matrix class object.
	 * @param {int} rowSize The number of rows.
	 * @param {int} columnSize The number of columns in each row.
	 */
	constructor(rowSize, columnSize) {
		super();
		this.fill(rowSize, columnSize, 0);
	}
	/**
	 * Generates a matrix with a given row-column size and applies a default value to each cell.
	 * @param {int} rows The number of rows to generate.
	 * @param {int} columns The number of columns to apply to each row.
	 * @param {*} defaultValue The default value to set.
	 */
	fill(rows, columns, defaultValue=undefined) {
		for(let row=0;row<rows;row++) {
			if(this[row]===undefined)
				this[row]=[];
			for(let col=0;col<columns;col++)
				this[row][col]=defaultValue;
		}
	}
	/**
	 * Adds an item at the given matrix position.
	 * @param {int} row The row position in the matrix.
	 * @param {int} column The column position in the matrix.
	 * @param {*} value The value to set or add to the matrix.
	 */
	push(row, column, value) {
		if(this[row]===undefined)
			this[row]=[];
		this[row][column]=value;
	}
	/**
	 * Generates an array that calculates the sum of each individual row's values.
	 * @returns {int[]}
	 */
	rowWiseCalculation() {
		const rowSums = this.map(row => row.reduce((acc, val) => acc + val, 0));
		return rowSums;
	}
	/**
	 * Generates an array that calculates the sum of each individual column's values.
	 * @returns {int[]}
	 */
	columnWiseCalculation() {
		const numRows = this.length;
		const numCols = this[0].length;
		const columnSums = Array(numCols).fill(0);
		for(let row=0;row<numRows;row++)
			for(let col=0;col<numCols;col++)
				columnSums[col] += this[row][col];
		return columnSums;
	}
	/**
	 * Generates an object that calculates the sum of the diagonal values.
	 * @returns { [int][] }
	 */
	diagonalCalculation() {
		let mainSum = 0;
		let antiSum = 0;
		const len = this.length;
		for(let i=0;i<len;i++) {
			mainSum += this[i][i];
			antiSum += this[i][len - i - 1];
		}
		return [ mainSum, antiSum ];
	}
	/**
	 * Sets the value at the given row-column position.
	 * @param {int} rowPosition The row position.
	 * @param {int} columnPosition The column position.
	 * @param {int} value The numerical value to set.
	 */
	set(rowPosition, columnPosition, value) {
		if(this.isPositionValid(rowPosition, columnPosition))
			this[rowPosition][columnPosition] = value;
		else
			console.log("INVALID POSITION");
	}
	
	isPositionValid(row, column) {
		return this.isRowValid(row) && this.isColumnValid(column);
	}
	
	isRowValid(row) {
		return row>=0 && row<this.length;
	}
	
	isColumnValid(column) {
		return column>=0 && column<this[0].length;
	}
	
}

export { Matrix };