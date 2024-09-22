const ESC = '\x1b';
const CSI = ESC + '[';
const CURSOR_UP = CSI + 'A';
const CURSOR_DOWN = CSI + 'B';
const CURSOR_RIGHT = CSI + 'C';
const CURSOR_LEFT = CSI + 'D';
const CLEAR_SCREEN = CSI + '2J';
const CURSOR_HOME = CSI + '1;1H';
const SAVE_CURSOR = ESC + '7';
const RESTORE_CURSOR = ESC + '8';
const moveCursorTo = (row, col) => CSI + row + ';' + col + 'H';
const BELL = '\x07';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const NEW_LINE = "\n";
const TAB = "\t";
//const V_LINE = "\uff5c";
const V_LINE = "\u2503";
const H_LINE = "\u2501";
const TOP_H_LINE = "\u2581";
const BOTTOM_H_LINE = "\u2594";

const ANSI = {
	ESC,
	CSI,
	CURSOR_UP,
	CURSOR_DOWN,
	CURSOR_RIGHT,
	CURSOR_LEFT,
	CLEAR_SCREEN,
	CURSOR_HOME,
	SAVE_CURSOR,
	RESTORE_CURSOR,
	BELL,
	RESET,
	NEW_LINE,
	TAB,
	SHAPES: {
		SQUARE: {
			OUTLINE: "\u25A1",
			SELECTED: "\u25A3",
			FILLED: "\u25A0",
			ROUNDED: "\u25A2",
		},
		TRIANGLE: {
			FILLED: "\u25B2",
			OUTLINE: "\u25B3",
			FILLED_90_DEG: "\u25B6",
			OUTLINE_90_DEG: "\u25B7",
			LEFT: "\u{1F780}",
			UP: "\u{1F781}",
			RIGHT: "\u{1F782}",
			DOWN: "\u{1F783}",
			
			
		},
		DIAMOND: {
			FILLED: "\u25C6",
			OUTLINE: "\u25C7",
			SELECTED: "\u25C8",
		},
		CIRCLE: {
			OUTLINE: "\u25CB",
			DOTTED: "\u25CC",
			DOUBLE: "\u25CE",
			FILLED: "\u25CF",
			FILLED_HALF_LEFT: "\u25D0",
			FILLED_HALF_RIGHT: "\u25D1",
			FILLED_HALF_TOP: "\u25D3",
			FILLED_HALF_BOTTOM: "\u25D2",
			FILLED_QUAD_90: "\u25D4",
			FILLED_QUAD_270: "\u25D5",
		},
		CROSS: "\u{1F7A1}",
		X: {
			ALT: "\u2A2F",
			NORMAL: "\u{1F7A8}",
			BOLD: "\u{1F7A9}",
			BOLDER: "\u{1F7AE}",
		},
	},
	BLOCKS: {
		V_LINE,
		TOP_H_LINE,
		BOTTOM_H_LINE,
		H_LINE,
		CROSS: "\u254B",
	},
	CORNER: {
		TOP_LEFT: "\u250F",
		TOP_RIGHT: "\u2513",
		BOTTOM_LEFT: "\u2517",
		BOTTOM_RIGHT: "\u251B",
	},
	EDGES: {
		LEFT: "\u2523",
		RIGHT: "\u252B",
		CROSS: "\u254B",
		TOP: "\u2533",
		BOTTOM: "\u253B",
	},
	moveCursorTo,
	COLOR: {
		GREEN,
		RED,
		YELLOW,
		BLUE
	}
}

export { ANSI }