
import { GameTable } from "./gameTable.mjs";
import { ANSI } from "./ansi.mjs";

class Graphics extends GameTable {
	
	static lineBorder = ANSI.BLOCKS.H_LINE.repeat(13);
	static gameIcons = {
		PLAYER1: ANSI.COLOR.RED + ANSI.SHAPES.X.ALT + ANSI.RESET,
		PLAYER2: ANSI.COLOR.BLUE + ANSI.SHAPES.CIRCLE.OUTLINE + ANSI.RESET,
		DEFAULT: " "
	};
	
	constructor() {
		super();
	}
	/**
	 * Gets the string representation of the game table.
	 * @returns {string}
	 */
	toString() {
		//let res=Graphics.lineBorder;
		let res="";
		for(let row=0;row<this.length;row++) {
			for(let i=0;i<this.length+1;i++) {
				res+=Graphics.getCrossSectionText(row, i, this.length);
			}
			res+=ANSI.NEW_LINE;
			for(let col=0;col<this.length+1;col++) {
				const selectedChar = Graphics.getVisualRepresentation(this[row][col]);
				const isCharGood = selectedChar === Graphics.gameIcons.DEFAULT;
				//let preText = Graphics.getCrossSectionText(row, col);
				res+=ANSI.BLOCKS.V_LINE + " " + selectedChar + " ";
				//res+=Graphics.getCrossSectionText(row, col, this.length+1) + " " + Graphics.getVisualRepresentation(this[row][col]) + " ";
			}
			res+=ANSI.NEW_LINE;
			
			//res+=ANSI.NEW_LINE + Graphics.lineBorder;
			//res+=ANSI.NEW_LINE + Graphics.lineBorder;
		}
		for(let i=0;i<this.length+1;i++) {
			res+=Graphics.getCrossSectionText(this.length, i, this.length);
		}
		return res;
	}
	
	static getCrossSectionText(row, column, max=3) {
		let tmp = ANSI.BLOCKS.H_LINE.repeat(3);
		//max-=1;
		//max*=max;
		if(row===0) {
			if(column===0) {
				tmp=ANSI.CORNER.TOP_LEFT;
			} else if(column === max) {
				tmp+=ANSI.CORNER.TOP_RIGHT;
			} else {
				tmp+=ANSI.EDGES.TOP;
			}
		} else if(row < max) {
			if(column===0) {
				tmp=ANSI.EDGES.LEFT;
			} else if(column === max) {
				tmp+=ANSI.EDGES.RIGHT;
			} else {
				tmp+=ANSI.BLOCKS.CROSS;
			}
		} else {
			if(column===0) {
				tmp=ANSI.CORNER.BOTTOM_LEFT;
			} else if(column === max) {
				tmp+=ANSI.CORNER.BOTTOM_RIGHT;
			} else {
				tmp+=ANSI.EDGES.BOTTOM;
			}
		}
		return tmp;
	}
	
	static getVisualRepresentation(value) {
		switch(value) {
			case -1:
				return Graphics.gameIcons.PLAYER2;
			case 1:
				return Graphics.gameIcons.PLAYER1;
			default:
				return Graphics.gameIcons.DEFAULT;
		}
	}
	
}

export { Graphics };