
import { ANSI } from "./ansi.mjs";
import { REGEX_PATTERNS } from "./regexPatterns.mjs";

class MenuItem {
	/**
	 * Creates a new instance of the MenuItem class object.
	 * @param {string} title The title of the menu page.
	 * @param {string[]} options The options where the selection is determined by the index position of each item within the array.
	 */
	constructor(title, options) {
		this.title=title;
		this.options=options;
	}
	/**
	 * Generates a string representation of the menu to be displayed to the console.
	 * @returns {string}
	 */
	toString() {
		const OFFSET = 2;
		let res="";
		let maxWidth=this.title.length;
		for(let i=0;i<this.options.length;i++) {
			const line = ANSI.BLOCKS.V_LINE + " " + i.toString() + ".) " + this.options[i];
			if(line.length>maxWidth) {
				maxWidth=line.length;
			}
		}
		
		if(MenuItem.isOdd(maxWidth)) {
			maxWidth++;
		}
		
		let numberOfSpacesToCenterTitle = MenuItem.calculateSpacing(this.title, maxWidth);
		if(MenuItem.isOdd(numberOfSpacesToCenterTitle)) {
			let regexResult = REGEX_PATTERNS.WORD_SPACE_SEPARATION.exec(this.title);
			if(regexResult) {
				const whitespaceCharCount = regexResult.groups.value.length;
				if(MenuItem.isOdd(whitespaceCharCount)) {
					this.title=this.title.replace(REGEX_PATTERNS.WORD_SPACE_SEPARATION, " ".repeat(whitespaceCharCount+1));
				}
				numberOfSpacesToCenterTitle = MenuItem.calculateSpacing(this.title, maxWidth);
				const titleTextLength=this.title.length + numberOfSpacesToCenterTitle;
				if(maxWidth<titleTextLength) {
					maxWidth=titleTextLength;
				}
				numberOfSpacesToCenterTitle = MenuItem.calculateSpacing(this.title, maxWidth);
			}
		}
		
		for(let i=0;i<this.options.length;i++) {
			const line = i.toString() + ".) " + this.options[i];
			res+=ANSI.NEW_LINE + ANSI.BLOCKS.V_LINE + " " + line + (" ".repeat(maxWidth - line.length)) + " " + ANSI.BLOCKS.V_LINE;
		}
		
		const titleSpacesString = " ".repeat(numberOfSpacesToCenterTitle);
		const titleString = ANSI.BLOCKS.V_LINE + " " + titleSpacesString + this.title + titleSpacesString + " " + ANSI.BLOCKS.V_LINE;
		const lineBorder = "" + (ANSI.BLOCKS.H_LINE.repeat(titleString.length - OFFSET));
		
		const TOP_LINE_BORDER = ANSI.CORNER.TOP_LEFT + lineBorder + ANSI.CORNER.TOP_RIGHT;
		const BOTTOM_LINE_BORDER = ANSI.CORNER.BOTTOM_LEFT + lineBorder + ANSI.CORNER.BOTTOM_RIGHT;
		const MIDDLE_LINE_BORDER = ANSI.EDGES.LEFT + lineBorder + ANSI.EDGES.RIGHT;
		
		
		return TOP_LINE_BORDER + ANSI.NEW_LINE + titleString + ANSI.NEW_LINE + MIDDLE_LINE_BORDER + res + ANSI.NEW_LINE + BOTTOM_LINE_BORDER;
	}
	/**
	 * Calculates a number that is used to space the given text equally so that it is displayed in the center of the UI.
	 * @param {string} stringValue The string value to process.
	 * @param {int} maxWidth The maximum width acquired from the pre-generated text structure of the entire menu.
	 * @param {int} offset The offset position.
	 * @returns {int|float}
	 */
	static calculateSpacing(stringValue, maxWidth, offset=0) {
		return (((maxWidth + offset) / 2) - (stringValue.length / 2));
	}
	/**
	 * Determines if the number is even.
	 * @param {int|float|double} numberValue The number to check.
	 * @returns {boolean}
	 */
	static isEven(numberValue) {
		return numberValue % 2 === 0;
	}
	/**
	 * Determines if the number is odd.
	 * @param {int|float|double} numberValue The number to check.
	 * @returns {boolean}
	 */
	static isOdd(numberValue) {
		return !MenuItem.isEven(numberValue);
	}
	
	
}

export { MenuItem };