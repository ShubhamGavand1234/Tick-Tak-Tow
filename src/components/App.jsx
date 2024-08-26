import Player from "./Player";
import GameBoard from "./GameBoard";
import { useState } from "react";
import Log from "./Log";
import WINNING_COMBINATIONS from "../WINNING_COMBINATIONS";

// const WINNINT_COMBINATIONS = WINNING_COMBINATIONS;

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combi of WINNING_COMBINATIONS) {
    const firsrSymbol = gameBoard[combi[0].row][combi[0].column];
    const secondSymbol = gameBoard[combi[1].row][combi[1].column];
    const thirdSymbol = gameBoard[combi[2].row][combi[2].column];

    if (
      firsrSymbol &&
      firsrSymbol === secondSymbol &&
      firsrSymbol === thirdSymbol
    ) {
      winner = firsrSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActive) => (currActive === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
            />
            <Player
              name="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            />
          </ol>
          {winner && <p>You Won, {winner}!</p>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
