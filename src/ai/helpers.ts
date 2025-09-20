export const getPossibleMoves = (board: string[]) => {
	let possibleMoves = [];
	for (let i = 0; i < board.length; i++) {
		if (board[i] == "") {
			possibleMoves.push(i);
		}
	}
	return possibleMoves;
};

export const isGameOver = (board: string[], ai: "F" | "S") => {
	const winningLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const [a, b, c] of winningLines) {
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			const winner = board[a];
			return {
				finished: true,
				winner,
				isDraw: false,
				aiWon: winner === ai,
			};
		}
	}

	if (board.every((cell) => cell !== "")) {
		return {
			finished: true,
			winner: null,
			isDraw: true,
			aiWon: false,
		};
	}

	return {
		finished: false,
		winner: null,
		isDraw: false,
		aiWon: false,
	};
};
