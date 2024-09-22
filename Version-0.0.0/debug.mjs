
import { LOG_LEVEL } from "./logLevel.mjs";
import { ANSI } from "./ansi.mjs";

class Debug {
	
	/**
	 * Creates a new instance of the Debug class object.
	 */
	constructor() {
		this.enabled = true;
		this.loggingLevel = LOG_LEVEL.IMPORTANT;
	}
	/**
	 * Outputs to the console.
	 * @param  {...any} data The data to display to the console.
	 */
	log(...data) {
		if(this.enabled && this.loggingLevel >= LOG_LEVEL.NORMAL) {
			this.#internalWrite(ANSI.RESET, data);
		}
	}
	/**
	 * Outputs to the console.
	 * @param  {...any} data The data to display to the console.
	 */
	info(...data) {
		if(this.enabled && this.loggingLevel >= LOG_LEVEL.VERBOSE) {
			this.#internalWrite(ANSI.COLOR.BLUE, data);
		}
	}
	/**
	 * Outputs to the console.
	 * @param  {...any} data The data to display to the console.
	 */
	warn(...data) {
		if(this.enabled && this.loggingLevel >= LOG_LEVEL.WARNING) {
			this.#internalWrite(ANSI.COLOR.YELLOW, data);
		}
	}
	/**
	 * Outputs to the console.
	 * @param  {...any} data The data to display to the console.
	 */
	error(...data) {
		if(this.enabled && this.loggingLevel >= LOG_LEVEL.ERROR) {
			this.#internalWrite(ANSI.COLOR.RED, data);
		}
	}
	/**
	 * Outputs to the console.
	 * @param  {...any} data The data to display to the console.
	 */
	write(...data) {
		console.log(data);
	}
	/**
	 * Outputs to the console.
	 * @param  {*} value The data to display to the console.
	 */
	writeLine(value) {
		console.log(ANSI.NEW_LINE + value);
	}
	/**
	 * Clears the console screen.
	 */
	clearScreen() {
		console.log(ANSI.CLEAR_SCREEN);
	}
	
	#internalWrite(color, ...data) {
		for(let i=0;i<data.length;i++) {
			console.log(ANSI.NEW_LINE + color + data[i]);
		}
	}
	
}

export { Debug, LOG_LEVEL };