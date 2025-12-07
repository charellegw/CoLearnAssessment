import { Settings, Users, Bot } from 'lucide-react';
import type { GameMode, AIDifficulty } from '../../types/game';

interface GameSettingsProps {
  gameMode: GameMode;
  difficulty: AIDifficulty;
  onStartGame: (mode: GameMode, difficulty?: AIDifficulty) => void;
}

export const GameSettings = ({ gameMode, difficulty, onStartGame }: GameSettingsProps) => {
  return (
    <div className="bg-white bg-opacity-10 border border-white border-opacity-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
        <Settings size={20} />
        Game Settings
      </h2>
      
      <div className="space-y-4">
        <h3 className="text-lg text-white/75">Select Game Mode</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: '1vs1' as const, label: '1vs1 Local', desc: 'Play with a friend locally', icon: Users, color: 'bg-blue-700' },
            { id: 'vsAI' as const, label: 'vs AI', desc: 'Challenge computer', icon: Bot, color: 'bg-purple-700' }
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = gameMode === mode.id;
            
            return (
              <button
                key={mode.id}
                onClick={() => onStartGame(mode.id, difficulty)}
                className={`relative p-4 rounded-xl border border-white border-opacity-25 transition-all duration-300 ${
                  isActive ? 'bg-white bg-opacity-10 border-b border-white border-opacity-75' : 'border-gray-700 hover:bg-gray-600/20'
                } hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-3`}
              >
                {isActive && (
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${mode.color} rounded-full flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                
                <div className={`p-3 rounded-full ${mode.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  <Icon size={24} className="text-white" />
                </div>
                
                <div className="text-center">
                  <div className="font-bold text-white">{mode.label}</div>
                  <div className="text-xs text-white text-opacity-75 mt-1">{mode.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {gameMode === 'vsAI' && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg text-white/75">AI Difficulty</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'easy' as const, label: 'Easy', desc: 'Random moves', color: 'bg-[#01EE74]' },
              { id: 'medium' as const, label: 'Medium', desc: 'Strategic', color: 'bg-[#FFD83A]' },
              { id: 'hard' as const, label: 'Hard', desc: 'Challenging', color: 'bg-[#FC161B]' }
            ].map((diff) => {
              const isActive = difficulty === diff.id;
              
              return (
                <button
                  key={diff.id}
                  onClick={() => {
                    console.log('difficulty mode ', diff.id);
                    onStartGame('vsAI', diff.id)
                  }}
                  className={`relative p-3 rounded-lg border border-white border-opacity-25 transition-all duration-200 ${
                    isActive ? 'bg-white bg-opacity-10 border-b border-white border-opacity-75' : 'border-gray-700 hover:bg-gray-600/20'
                  } hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-2`}
                >
                  <div className={`p-2 rounded-full ${diff.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}></div>
                  
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white">{diff.label}</div>
                    <div className="text-xs text-white text-opacity-75 mt-1">{diff.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};