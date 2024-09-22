
import { MenuItem } from "./menuItem.mjs";
import { LANGUAGE } from "./locale/lang.mjs";

const MENU_CONFIGS = {
	MAIN_MENU: new MenuItem(LANGUAGE.mainMenu, [LANGUAGE.exit, LANGUAGE.play, LANGUAGE.stats, LANGUAGE.settings]),
	SETTINGS: new MenuItem(LANGUAGE.settings, [LANGUAGE.exit, LANGUAGE.languageCode]),
	SETTINGS_LANGUAGE: new MenuItem(LANGUAGE.language, [LANGUAGE.exit, LANGUAGE.english, LANGUAGE.norwegian, LANGUAGE.hawaiian, LANGUAGE.german, LANGUAGE.french, LANGUAGE.spanish, LANGUAGE.russian]),
};

export { MENU_CONFIGS };