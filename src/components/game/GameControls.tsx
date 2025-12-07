import { RefreshCw, Home, Trophy, Joystick } from 'lucide-react';

interface GameControlsProps {
  status: 'playing' | 'won' | 'draw';
  onResetGame: () => void;
  onNewGame: () => void;
  onResetScores: () => void;
}

export const GameControls = ({ onResetGame, onNewGame, onResetScores }: GameControlsProps) => {
  return (
    <div className="bg-white bg-opacity-10 border border-white border-opacity-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
        <Joystick size={20} />
        Controls
       New Game</h2>
      <div className='flex flex-col gap-3'>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onNewGame} className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/75 hover:bg-gray-800 rounded-lg font-semibold transition-colors border border-white/50" >
            <Home size={18} />
            New Game
          </button>
          
          <button onClick={onResetGame} className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/75 hover:bg-blue-600 rounded-lg font-semibold transition-colors border border-white/50" >
            <RefreshCw size={18} />
            Restart Game
          </button>
        </div>
        <div className="grid">
          <button onClick={onResetScores} className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/75 hover:bg-red-600 rounded-lg font-semibold transition-colors border border-white/50" >
            <Trophy size={18} />
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
};