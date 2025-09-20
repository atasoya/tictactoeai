import { isGameOver } from "./helpers";

type Player = "F" | "S";

const minimax = (
	board: string[],
	depth: number,
	isMaximizing: boolean,
	ai: Player,
): number => {
	const result = isGameOver(board, ai);

	if (result.finished) {
		if (result.isDraw) return 0;
		return result.aiWon ? 1 : -1;
	}

	const currentPlayer: Player = isMaximizing ? ai : ai === "F" ? "S" : "F";

	if (isMaximizing) {
		let bestScore = -Infinity;
		board.forEach((cell, i) => {
			if (cell === "") {
				board[i] = currentPlayer;
				const score = minimax(board, depth + 1, false, ai);
				board[i] = "";
				bestScore = Math.max(bestScore, score);
			}
		});
		return bestScore;
	} else {
		let bestScore = Infinity;
		board.forEach((cell, i) => {
			if (cell === "") {
				board[i] = currentPlayer;
				const score = minimax(board, depth + 1, true, ai);
				board[i] = "";
				bestScore = Math.min(bestScore, score);
			}
		});
		return bestScore;
	}
};

export const findBestMove = (board: string[], ai: Player): number => {
	let bestScore = -Infinity;
	let move = -1;

	board.forEach((cell, i) => {
		if (cell === "") {
			board[i] = ai;
			const score = minimax(board, 0, false, ai);
			board[i] = "";
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
	});

	return move;
};
