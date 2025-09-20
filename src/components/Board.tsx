import { X, Circle } from "lucide-react";
import { useState } from "react";

function Board() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isAiTurn, setIsAiTurn] = useState(false);
	const [isHumanGoesFirst, setIsHumanGoingFirst] = useState(true);
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

	const handleTileClick = (i: number) => {
		setBoard((prev) => {
			if (i < 0 || i >= prev.length || (prev[i] !== "" && !isAiTurn))
				return prev;

			const next = [...prev];
			next[i] = isHumanGoesFirst ? "F" : "S";
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
							className="w-30 h-30 bg-white rounded-md flex items-center justify-center"
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
					<>no</>
				) : (
					<>
						<button className="bg-white rounded-md p-2">
							I want to play first
						</button>
						<button className="bg-white rounded-md p-2">
							AI plays first
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default Board;
