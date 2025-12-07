import { X, Circle } from 'lucide-react';

interface GameBoardProps {
  board: ('X' | 'O' | null)[];
  status: 'playing' | 'won' | 'draw';
  gameMode: '1vs1' | 'vsAI';
  currentPlayer: 'X' | 'O' | null;
  winner: 'X' | 'O' | null;
  onCellClick: (position: number) => void;
}

export const GameBoard = ({ board, status, gameMode, currentPlayer, winner, onCellClick }: GameBoardProps) => {
  const isCellDisabled = (position: number) => {
    if (board[position] !== null) return true;
    if (status !== 'playing') return true;
    if (gameMode === 'vsAI' && currentPlayer === 'O') return true;

    return false;
  };

  const isWinningCell = (position: number) => {
    if (!winner) return false;
    
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    
    for (const line of lines) {
      if (line.every(cell => board[cell] === winner)) {
        return line.includes(position);
      }
    }
    
    return false;
  };

  return (
    <div className="bg-white bg-opacity-10 border border-white border-opacity-50 rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {board.map((cell, index) => (
          <button key={index} onClick={() => onCellClick(index)} disabled={isCellDisabled(index)} className={`aspect-square rounded-xl flex items-center justify-center text-5xl font-bold transition-all duration-300
              ${isWinningCell(index) 
                ? 'bg-gradient-to-br from-green-500/20 to-green-500/40 border-2 border-green-400 shadow-lg' 
                : 'bg-gray-900/50 hover:bg-gray-800 border border-gray-700'
              }
              ${isCellDisabled(index) ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
              ${cell === 'X' ? 'text-blue-400' : cell === 'O' ? 'text-red-400' : ''}
            `} aria-label={`Cell ${index + 1}, ${cell || 'empty'}`}
          >
            {cell === 'X' && <X size={40} />}
            {cell === 'O' && <Circle size={40} />}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full">
          <div className={`w-3 h-3 rounded-full ${status === 'playing' ? 'animate-pulse bg-[#01EE74]' : 'bg-red-500'}`}></div>
          <span className="text-gray-300">
            {gameMode === 'vsAI' ? 'Playing against AI' : 'Local multiplayer'}
          </span>
        </div>
      </div>
    </div>
  );
};