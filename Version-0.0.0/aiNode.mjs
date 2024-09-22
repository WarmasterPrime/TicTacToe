
import { Graphics } from "./graphics.mjs";

class AiNode {
	static difficulties = {
		easy: 0,
		normal: 1,
		hard: 2
	};
	/**
	 * Creates a new instance of the AI Node class object.
	 * @param {Game} gameObject 
	 */
	constructor(gameObject, difficultyLevel=AiNode.difficulties.easy) {
		this.gameObject=gameObject;
		this.graphics=this.gameObject.graphics;
		this.difficulty=difficultyLevel;
	}
	/**
	 * Selects a location that the player has not already selected.
	 */
	selectLocation() {
		let coords;
		switch(this.difficulty) {
			case AiNode.difficulties.easy:
				coords  = this.#easySelectLocation();
				break;
			case AiNode.difficulties.normal:
				coords = this.#normalSelectLocation();
				break;
			default:
				coords = this.#hardSelectLocation();
				break;
		}
		this.setSelection(coords[0], coords[1]);
	}
	
	#normalSelectLocation() {
		return AiNode.getRandom(0, 100)<50 ? this.#hardSelectLocation() : this.#easySelectLocation();
	}
	
	#hardSelectLocation() {
		let dataSet = {
			topRow: {
				coords: [[0,0], [0,1], [0,2]],
				canDo: this.areCoordsFree(0,0, 0,1, 0,2)
			},
			middleRow: {
				coords: [[1,0], [1,1], [1,2]],
				canDo: this.areCoordsFree(1,0, 1,1, 1,2)
			},
			bottomRow: {
				coords: [[2,0], [2,1], [2,2]],
				canDo: this.areCoordsFree(2,0, 2,1, 2,2)
			},
			
			leftCol: {
				coords: [[0,0], [1,0], [2,0]],
				canDo: this.areCoordsFree(0,0, 1,0, 2,0)
			},
			middleCol: {
				coords: [[0,1], [1,1], [2,1]],
				canDo: this.areCoordsFree(0,1, 1,1, 2,1)
			},
			rightCol: {
				coords: [[2,0], [2,1], [2,2]],
				canDo: this.areCoordsFree(2,0, 2,1, 2,2)
			},
			
			topLeftDiag: {
				coords: [[0,0], [1,1], [2,2]],
				canDo: this.areCoordsFree(0,0, 1,1, 2,2)
			},
			topRightDiag: {
				coords: [[0,2], [1,1], [0,2]],
				canDo: this.areCoordsFree(0,2, 1,1, 0,2)
			},
		};
		
		let item,value;
		for([item, value] of Object.entries(dataSet)) {
			dataSet[item].coords=AiNode.randomizeArray(dataSet[item].coords);
		}
		
		
		
		let tmpDataSet = AiNode.randomizeDataSet(dataSet);
		
		console.log(tmpDataSet);
		
		for([item, value] of Object.entries(tmpDataSet)) {
			if(value.canDo===true) {
				const selectedPosition = this.#selectFromDataSet(value.coords);
				return [selectedPosition[0], selectedPosition[1]];
			}
		}
		return this.#easySelectLocation();
	}
	
	
	
	#selectFromDataSet(dataSetValue) {
		for(let i=0;i<dataSetValue.length;i++) {
			const sel=dataSetValue[i];
			if(!this.isOccupied(sel[0], sel[1])) {
				return sel;
			}
		}
	}
	
	#easySelectLocation() {
		const coords={
			row:AiNode.getRandom(0, this.graphics.length-1),
			column:AiNode.getRandom(0, this.graphics.length-1)
		};
		while(this.isOccupied(coords.row, coords.column)) {
			coords.row=AiNode.getRandom(0, this.graphics.length-1);
			coords.column=AiNode.getRandom(0, this.graphics.length-1);
		}
		return coords;
	}
	
	setSelection(row, column) {
		this.graphics.setPlayer2Position(row, column);
		//this.graphics.set(row, column, Graphics.PLAYER2);
	}
	/**
	 * Determines if the specified location is occupied already.
	 * @param {*} row 
	 * @param {*} column 
	 * @returns {boolean}
	 */
	isOccupied(row, column) {
		let tmp=this.gameObject.graphics[row][column];
		return tmp===Graphics.PLAYER1 || tmp===Graphics.PLAYER2;
	}
	
	isOccupiedByPlayer(row, column) {
		return this.gameObject.graphics[row][column]===Graphics.PLAYER1;
	}
	
	areCornersOccupied() {
		return !this.isOccupied(0, 0) || !this.isOccupied(0, 2) || !this.isOccupied(2, 0) || !this.isOccupied(2, 2);
	}
	/**
	 * Determines if the given coordinates are free or not.
	 * @param  {...any} coords 
	 * @returns {boolean}
	 */
	areCoordsFree(...coords) {
		for(let i=0;i<coords.length;i+=2) {
			const row = coords[i];
			const col = coords[i+1];
			if(this.isOccupiedByPlayer(row, col)) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Gets a random number within a given range.
	 * @param {*} min 
	 * @param {*} max 
	 * @returns 
	 */
	static getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	static randomizeDataSet(dataSet) {
		let res={};
		let keys=AiNode.randomizeArray(Object.keys(dataSet));
		for(let i=0;i<keys.length;i++) {
			let key=keys[i];
			res[key] = dataSet[key];
		}
		return res;
	}
	
	static randomizeArray(array) {
		let res=array;
		for(let i=0;i<res.length;i++) {
			let randomSel=AiNode.getRandom(0, res.length-1);
			let original=res[i];
			let random=res[randomSel];
			res[randomSel]=original;
			res[i]=random;
		}
		return res;
	}
	
}

export { AiNode };