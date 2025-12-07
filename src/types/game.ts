export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameMode = '1vs1' | 'vsAI';
export type AIDifficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
    currentPlayer: Player;
    board: Board;
    gameMode: GameMode;
    difficulty: AIDifficulty;
    status: GameStatus;
    winner: Player;
    scores: {
        player1: number;
        player2: number;
        draws: number;
    };
    history: Board[];
}
