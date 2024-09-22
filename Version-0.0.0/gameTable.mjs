
import { Matrix } from "./matrix.mjs";

class GameTable extends Matrix {
	
	static PLAYER1 = 1;
	static PLAYER2 = -1;
	
	constructor(rowSize=3, columnSize=3) {
		super(rowSize, columnSize);
	}
	
	get boardStats() {
		const rows=this.rowWiseCalculation();
		const columns=this.columnWiseCalculation();
		const diagonals=this.diagonalCalculation();
		return { rows, columns, diagonals };
	}
	
	get hasPlayer1Won() {
		return this.isCalculationTrue(3);
	}
	
	get hasPlayer2Won() {
		return this.isCalculationTrue(-3);
	}
	
	isCalculationTrue(value) {
		for(let sel of Object.values(this.boardStats)) {
			for(let itm of sel) {
				if(itm===value) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * Sets the position for the given player.
	 * @param {int} row The row position.
	 * @param {int} column The column position.
	 */
	setPlayer1Position(row, column) {
		this.set(row, column, 1);
	}
	/**
	 * Sets the position for the given player.
	 * @param {int} row The row position.
	 * @param {int} column The column position.
	 */
	setPlayer2Position(row, column) {
		this.set(row, column, -1);
	}
	
}

export { GameTable };