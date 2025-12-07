interface ScoreBoardProps {
  scores: {
    player1: number;
    player2: number;
    draws: number;
  };
  playerLabels: {
    player1: string;
    player2: string;
  };
}

export const ScoreBoard = ({ scores, playerLabels }: ScoreBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-900/30 p-4 rounded-xl text-center border border-white/50">
        <div className="text-sm text-blue-300 mb-1">{playerLabels.player1}</div>
        <div className="text-3xl font-bold">{scores.player1}</div>
        <div className="text-xs text-white mt-1">Wins</div>
      </div>
      
      <div className="bg-yellow-900/30 p-4 rounded-xl text-center border border-white/50">
        <div className="text-sm text-yellow-300 mb-1">Draws</div>
        <div className="text-3xl font-bold">{scores.draws}</div>
        <div className="text-xs text-white mt-1">Ties</div>
      </div>
      
      <div className="bg-red-700/30 p-4 rounded-xl text-center border border-white/50">
        <div className="text-sm text-red-300 mb-1">{playerLabels.player2}</div>
        <div className="text-3xl font-bold">{scores.player2}</div>
        <div className="text-xs text-white mt-1">Wins</div>
      </div>
    </div>
  );
};