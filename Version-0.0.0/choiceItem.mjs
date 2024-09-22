
import { CHOICE_TYPE } from "./choiceType.mjs";

class ChoiceItem {
	
	#row;
	#column;
	#choiceType;
	/**
	 * 
	 * @param {int} row 
	 * @param {int} column 
	 * @param {CHOICE_TYPE} choiceType 
	 */
	constructor(row, column, choiceType) {
		this.#row = row;
		this.#column = column;
		this.#choiceType = choiceType;
	}
	
	get row() {
		return this.#row;
	}
	
	get column() {
		return this.#column;
	}
	
	get choiceType() {
		return this.#choiceType;
	}
	
}

export { ChoiceItem };
