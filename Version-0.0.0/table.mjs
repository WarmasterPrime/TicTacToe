
import { CHOICE_TYPE } from "./choiceType.mjs";
import { ChoiceItem } from "./choiceItem.mjs";

class Table {
	
	#rows;
	#columns;
	#items;
	#userWinValue;
	#machineWinValue;
	
	constructor(size) {
		this.#rows = size;
		this.#columns = size;
		this.#userWinValue = CHOICE_TYPE.USER * size;
		this.#machineWinValue = CHOICE_TYPE.MACHINE * size;
		this.#items = Table.generateTable(size, size);
	}
	
	get rows() {
		return this.#rows;
	}
	
	get columns() {
		return this.#columns;
	}
	
	get items() {
		return this.#items;
	}
	
	get userWinValue() {
		return this.#userWinValue;
	}
	
	get machineWinValue() {
		return this.#machineWinValue;
	}
	
	/**
	 * Creates a table array that of a specified size.
	 * @param {int} rows 
	 * @param {int} columns 
	 * @returns 
	 */
	static generateTable(rows, columns) {
		let table = [];
		for(let row=0;row<rows;row++) {
			table.push([]);
			for(let col=0;col<columns;col++) {
				table[row].push(CHOICE_TYPE.EMPTY);
			}
		}
		return table;
	}
	/**
	 * Sets the choice at the given location.
	 * @param {int} row 
	 * @param {int} column 
	 * @param {CHOICE_TYPE} choiceType 
	 */
	setChoice(row, column, choiceType) {
		const tableValue = this.getValue(row, column);
		if(tableValue===CHOICE_TYPE.EMPTY) {
			this.#items[row][column] = choiceType;
		} else {
			throw new Error("Matrix index is invalid.");
		}
	}
	/**
	 * Gets the value at the given matrix index.
	 * @param {int} row 
	 * @param {int} column 
	 * @returns {CHOICE_TYPE|undefined}
	 */
	getValue(row, column) {
		return Graphics.inRange(row, 0, this.#items.length-1) && Graphics.inRange(column, 0, this.#items[this.#items.findIndex()].length-1) ? this.#items[row][column] : undefined;
	}
	/**
	 * 
	 * @param {*} source 
	 * @param {*} min 
	 * @param {*} max 
	 * @returns 
	 */
	static inRange(source, min, max) {
		return source>=min && source<=max;
	}
	
	static checkWhoWon(table, playerOneValue, playerTwoValue) {
		let data = {
			topRow: 0,
			midRow: 0,
			bottomRow: 0,
			
			leftCol: 0,
			midCol: 0,
			rightCol: 0,
			
			leftDiag: 0,
			rightDiag: 0
		};
		let i=0;
		for(let row=0;row<table.rows;row++) {
			const rowSelection = row % table.rows;
			for(let col=0;col<table.columns;col++) {
				const value=table.getValue(row, col);
				switch(row % table.rows) {
					case 0:
						data.topRow+=value;
						break;
					case 1:
						data.midRow+=value;
						break;
					case 2:
						data.bottomRow+=value;
						break;
				}
				switch(col % table.columns) {
					case 0:
						data.leftCol+=value;
						break;
					case 1:
						data.midCol+=value;
						break;
					case 2:
						data.rightCol+=value;
						break;
				}
				if(i % 4 === 0) {
					data.leftDiag+=value;
				}
				i++;
			}
		}
		
		
		
	}
	
}
