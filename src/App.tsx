import "./App.css";
import Board from "./components/Board";

function App() {
	return (
		<div className="w-full h-screen bg-slate-950 flex items-center flex-col">
			<div className="flex items-center flex-col">
				<p className="text-3xl font-bold text-white mt-20">
					Tic Tac Toe - AI
				</p>
				<p className="text-white">
					Small agent implementation for Tic Tac Toe
				</p>
			</div>
			<Board />
		</div>
	);
}

export default App;
