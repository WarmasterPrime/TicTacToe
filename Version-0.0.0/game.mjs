
import { Graphics } from "./graphics.mjs";
import { LOG_LEVEL } from "./logLevel.mjs";
import { Debug } from "./debug.mjs";
import { MenuItem } from "./menuItem.mjs";
import { Menu } from "./menu.mjs";
import { MENU_CONFIGS } from "./menuConfigs.mjs";
import { ANSI } from "./ansi.mjs";
import { LANGUAGE } from "./locale/lang.mjs";
import { AiNode } from "./aiNode.mjs";

class Game {
	
	constructor() {
		this.graphics = new Graphics();
		this.menu = new Menu();
		this.aiNode = new AiNode(this, AiNode.difficulties.hard);
		this.gameStats = [];
	}
	
	async mainMenu() {
		this.graphics.fill(3, 3, 0);
		this.menu.displayMenu(MENU_CONFIGS.MAIN_MENU());
		await this.menu.prompt(LANGUAGE.enterChoice, this.mainMenuResponse, this);
	}
	
	mainMenuResponse(answer) {
		switch(answer) {
			case "0":
				process.exit();
			case "1":
				this.playGame();
				break;
			case "2":
				this.showStats();
				break;
			case "3":
				this.showSettings();
				break;
			default:
				this.mainMenu();
				break;
		}
	}
	
	async playGame() {
		this.resetBoard();
		await this.menu.prompt(LANGUAGE.coordinatePrompt, this.updatePlayerEntry, this);
		
		if(this.graphics.hasPlayer1Won) {
			console.log(LANGUAGE.win);
			await this.menu.prompt(LANGUAGE.pressEnterToContinue, this.mainMenu, this);
		} else if(this.graphics.hasPlayer2Won) {
			console.log(LANGUAGE.lose);
			await this.menu.prompt(LANGUAGE.pressEnterToContinue, this.mainMenu, this);
		} else {
			//console.log("Draw!");
			await this.playGame();
		}
	}
	
	async updatePlayerEntry(playerResponse) {
		const resp=Game.parseCoords(playerResponse);
		if(resp.length>=2) {
			let row=Game.withinRange((resp[0]*1) - 1);
			let col=Game.withinRange((resp[1]*1) - 1);
			if(!this.aiNode.isOccupied(row, col)) {
				this.graphics.setPlayer1Position(row, col);
				this.aiNode.selectLocation();
			}
		}
		this.resetBoard();
	}
	
	clearScreen() {
		console.log(ANSI.RESET);
		console.log(ANSI.CLEAR_SCREEN);
	}
	
	resetBoard() {
		this.clearScreen();
		console.log(this.graphics.toString());
	}
	
	showSettings() {
		this.showMenu(MENU_CONFIGS.SETTINGS(), this.#settingsChoiceProcessor);
	}
	
	async showStats() {
		console.log(LANGUAGE.showStats);
		await this.menu.prompt(LANGUAGE.pressEnterToContinue, this.mainMenu, this);
	}
	
	async #settingsChoiceProcessor(answer) {
		switch(answer) {
			case "0":
				await this.mainMenu();
				break;
			case "1":
				this.showLanguageSettings();
				break;
			default:
				this.showSettings();
		}
	}
	
	showLanguageSettings() {
		this.showMenu(MENU_CONFIGS.SETTINGS_LANGUAGE(), this.#languageSettingsChoiceProcessor);
	}
	// [LANGUAGE.exit, LANGUAGE.english, LANGUAGE.norwegian, LANGUAGE.hawaiian, LANGUAGE.german, LANGUAGE.french, LANGUAGE.spanish, LANGUAGE.russian]
	#languageSettingsChoiceProcessor(answer) {
		let code = undefined;
		switch(answer) {
			case "0":
				this.showSettings();
				break;
			case "1":
				code="en";
				break;
			case "2":
				code="no";
				break;
			case "3":
				code="hi";
				break;
			case "4":
				code="de";
				break;
			case "5":
				code="fr";
				break;
			case "6":
				code="es";
				break;
			case "7":
				code="ru";
				break;
			default:
				this.showLanguageSettings();
				break;
		}
		if(code!==undefined) {
			LANGUAGE.languageCode=code;
			this.showLanguageSettings();
		}
	}
	
	async showMenu(menuItem, callBackFunction) {
		this.clearScreen();
		console.log(menuItem.toString());
		await this.menu.prompt(LANGUAGE.enterChoice, callBackFunction, this);
	}
	
	static withinRange(value, min, max) {
		if(value<min) {
			value=min;
		}
		if(value>max) {
			value=max;
		}
		return value;
	}
	
	static parseCoords(value) {
		return value.trim().toString().split("");
	}
	
}

const MAIN_GAME = new Game();
await MAIN_GAME.mainMenu();
