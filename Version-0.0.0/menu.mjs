
import * as readline from 'node:readline/promises';
import { MenuItem } from "./menuItem.mjs";
import { ANSI } from "./ansi.mjs";

class Menu {
	
	#instance;
	
	constructor() {
		this.#instance = readline.createInterface({ input: process.stdin, output: process.stdout });
		this.onInput;
	}
	
	get ins() {
		return this.#instance;
	}
	/**
	 * Awaits for the user's input.
	 * @param {string} text The text to present to the user.
	 * @param {Function} callBackFunction The call back function to send the user response to when the user submits their response.
	 */
	async prompt(text, callBackFunction=undefined, origin=undefined) {
		let meIns=this;
		if(origin!==undefined) {
			meIns=origin;
		}
		await this.ins.question(text).then((userResponse) => {
			if(meIns.onInput instanceof Function) {
				meIns.onInput.call(meIns, userResponse);
			}
			if(callBackFunction instanceof Function) {
				callBackFunction.call(meIns, userResponse);
			}
		});
	}
	/**
	 * Creates and displays the menu page to the console.
	 * @param {MenuItem} menuItem The menu item to render.
	 */
	displayMenu(menuItem) {
		console.log(ANSI.CLEAR_SCREEN);
		console.log(menuItem.toString());
	}
	
}

export { Menu, MenuItem };