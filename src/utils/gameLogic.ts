import type { Board, GameStatus, Player } from '../types/game';

export const BOARD_SIZE = 3;
export const TOTAL_CELLS = BOARD_SIZE * BOARD_SIZE;

export const getOpponent = (player: Player): Player => {
    if(player === 'X') return 'O';
    if(player === 'O') return 'X';
    return null;
};

export const createEmptyBoard = (): Board => {
    return Array(TOTAL_CELLS).fill(null);
};

export const isValidMove = (board: Board, position: number): boolean => {
    if (position < 0 && position >= TOTAL_CELLS) {
        return false;
    }

    if (board[position] !== null) {
        return false;
    } 

    return true;
};

export const getEmptyCells = (board: Board): number[] => {
    const emptyCells: number[] = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            emptyCells.push(i);
        }
    }

    return emptyCells;
};

export const makeMove = (board: Board, player: Player, position: number): Board => {
    if(!player) {
        return board;
    }

    if(!isValidMove(board, position)) {
        return board;
    }

    const newBoard = [...board];
    newBoard[position] = player;

    return newBoard;
};

export const checkWinner = (board: Board): Player => {
    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const line of winLines) {
        const [a, b, c] = line;
        
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

export const isBoardFull = (board: Board): boolean => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            return false;
        }
    }

    return true;
};

export const isGameOver = (board: Board): boolean => {
    if (checkWinner(board) !== null) return true;
    if (isBoardFull(board)) return true;

    return false;
};

export const getGameResult = (board: Board): {winner: Player; isDraw: boolean} => {
    const winner = checkWinner(board);
    const isDraw = !winner && isBoardFull(board);
    
    return { winner, isDraw };
}

export const getGameStatus = (board: Board): GameStatus => {
    if (checkWinner(board)) return 'won';
    if (isBoardFull(board)) return 'draw';

    return 'playing';
}