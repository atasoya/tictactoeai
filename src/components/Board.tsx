import { X, Circle } from "lucide-react";
import { useState } from "react";
import { findBestMove } from "../ai/minimax";
import { isGameOver } from "../ai/helpers";

function Board() {
	const [isGameFinished, setIsGameFinished] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isAiTurn, setIsAiTurn] = useState(false);
	const [isHumanGoesFirst, setIsHumanGoingFirst] = useState(true);
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

	const handlePlayAgain = () => {
		setIsGameFinished(false);
		setIsGameStarted(false);
		setIsAiTurn(false);
		setIsHumanGoingFirst(true);
		setBoard(["", "", "", "", "", "", "", "", ""]);
	};

	const handleAiPlaysFirst = (i: number) => {
		setIsHumanGoingFirst(false);
		setBoard((prev) => {
			setIsGameStarted(true);
			if (
				i < 0 ||
				i >= prev.length ||
				prev[i] !== "" ||
				isAiTurn ||
				isGameFinished
			)
				return prev;

			const next = [...prev];
			next[i] = isHumanGoesFirst ? "F" : "S";

			return next;
		});
	};

	const handleTileClick = (i: number) => {
		setBoard((prev) => {
			setIsGameStarted(true);
			if (
				i < 0 ||
				i >= prev.length ||
				prev[i] !== "" ||
				isAiTurn ||
				isGameFinished
			)
				return prev;

			const next = [...prev];
			next[i] = isHumanGoesFirst ? "F" : "S";
			if (isGameOver(next, isHumanGoesFirst ? "F" : "S").finished) {
				setIsGameFinished(true);
			}
			setIsAiTurn(true);

			const bestMove = findBestMove(next, isHumanGoesFirst ? "S" : "F");
			next[bestMove] = isHumanGoesFirst ? "S" : "F";
			if (isGameOver(next, isHumanGoesFirst ? "F" : "S").finished) {
				setIsGameFinished(true);
			}
			setIsAiTurn(false);

			return next;
		});
	};

	return (
		<div>
			<div className="mt-10 grid grid-cols-3 gap-3">
				{board.map((tile, i) => {
					return (
						<div
							key={i}
							className="w-20 h-20 bg-white rounded-md flex items-center justify-center"
							onClick={() => handleTileClick(i)}
						>
							{tile === "F" && (
								<X size={70} strokeWidth={3} color="#ff0000" />
							)}
							{tile === "S" && (
								<Circle
									size={60}
									strokeWidth={3}
									color="#44ff00"
								/>
							)}
							{tile === "" && ""}
						</div>
					);
				})}
			</div>
			<div className="flex gap-3 mt-5">
				{isGameStarted ? (
					<button
						className="bg-white rounded-md p-2"
						onClick={() => {
							handlePlayAgain();
						}}
					>
						Play again
					</button>
				) : (
					<>
						<button className="bg-white rounded-md p-2">
							Human plays first
						</button>
						<button
							className="bg-white rounded-md p-2"
							onClick={() => {
								handleAiPlaysFirst(0);
							}}
						>
							AI plays first
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default Board;
