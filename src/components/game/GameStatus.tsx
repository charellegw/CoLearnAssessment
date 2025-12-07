import { X, Circle, Swords, Bot, Users } from 'lucide-react';

interface GameStatusProps {
    status: 'playing' | 'won' | 'draw';
    currentPlayer: 'X' | 'O' | null;
    gameMode: '1vs1' | 'vsAI';
    winner: 'X' | 'O' | null;
    getStatusMessage: () => string;
}

export const GameStatus = ({ status, currentPlayer, gameMode, getStatusMessage }: GameStatusProps) => {
  return (
    <div className="bg-white bg-opacity-10 border border-white border-opacity-50 rounded-2xl p-6 ">
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <Swords size={20} />
            Game Status
        </h2>
        <div className='bg-white/20 p-1 mb-4 rounded-lg'>{status.toUpperCase()}</div>

        <div className="space-y-4">
            <div className={`text-2xl font-bold text-center py-4 rounded-lg 
            ${
                status === 'won' ? 'bg-green-900/30 text-green-300' :
                status === 'draw' ? 'bg-yellow-900/30 text-yellow-300' :
                'bg-blue-900/30 text-blue-300'
            }`}>
                {getStatusMessage()}
            </div>
        
            <div className="px-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-white/75">Current Player</div>
                        <div className="text-2xl font-bold mt-1">
                            {currentPlayer === 'X' ? <X /> : <Circle/>}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-white/75 text-end">Mode</div>
                        <div className="text-lg font-semibold">
                            {gameMode === 'vsAI' ?
                                <span className="inline-flex items-center gap-2">
                                    <Bot className="w-5 h-5" />
                                    vs AI
                                </span> 
                                : <span className="inline-flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    1v1
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};