import './App.css'
import './index.css'
import { useTicTacToe } from './hooks/useTicTacToe';
import Header from './components/layouts/Header';
import { GameSettings } from './components/game/GameSettings';
import { GameStatus } from './components/game/GameStatus';
import { GameControls } from './components/game/GameControls';
import { ScoreBoard } from './components/game/ScoreBoard';
import { GameBoard } from './components/game/GameBoard';

function App() {
  const { gameState, makePlayerMove, startNewGame, resetGame, resetScores } = useTicTacToe();
  const { board, currentPlayer, gameMode, difficulty, status, winner, scores } = gameState;

  const getStatusMessage = () => {
    if (status === 'won') {
      const winnerName = (gameMode === 'vsAI' ? (winner === 'X' ? 'You' : 'AI') : `Player ${winner}`);
      return `${winnerName} Wins!`;
    }

    if (status === 'draw') return 'Draw!';

    const currentPlayerTurn = (gameMode === 'vsAI' ? (currentPlayer === 'X' ? 'Your turn!' : 'AI is thinking...') : `Player ${currentPlayer} turn!`);
    return currentPlayerTurn;
  };

  const getPlayerLabels = () => {
    if (gameMode === 'vsAI') {
      return { player1: 'You (X)', player2: 'AI (O)' };
    }
    
    return { player1: 'Player 1 (X)', player2: 'Player 2 (O)' };
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#667EEA] to-[#764BA2] text-white">
        <Header/>

        <main className="w-full flex-1 flex flex-col items-center px-4 py-8">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <GameSettings
                  gameMode={gameMode}
                  difficulty={difficulty}
                  onStartGame={startNewGame}
                />

                <GameStatus
                  status={status}
                  currentPlayer={currentPlayer}
                  gameMode={gameMode}
                  winner={winner}
                  getStatusMessage={getStatusMessage}
                />

                <GameControls
                  status={status}
                  onResetGame={resetGame}
                  onNewGame={() => startNewGame(gameMode, difficulty)}
                  onResetScores={resetScores}
                />
              </div>
              <div className="lg:col-span-2">
                <ScoreBoard scores={scores} playerLabels={getPlayerLabels()} />

                <GameBoard
                  board={board}
                  status={status}
                  gameMode={gameMode}
                  currentPlayer={currentPlayer}
                  winner={winner}
                  onCellClick={makePlayerMove}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
