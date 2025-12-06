import type { Board, GameStatus, Player } from '../../types/game';

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
    return (
        position >= 0 &&
        position <= TOTAL_CELLS &&
        board[position] === null
    );
};

export const makeMove = (board: Board, player: Player, position: number): Board => {
    if(!player) {
        throw new Error('Player cannot be null!');
    }

    if(!isValidMove(board, position)) {
        throw new Error(`Invalid move at position: ${position}`);
    }

    const newBoard = [...board];
    newBoard[position] = player;

    return newBoard;
};

export const checkWinner = (board: Board): Player => {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    
    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // column
        [0, 4, 8], [2, 4, 6]             // diagonal
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
    return board.every(cell => cell !== null);
};

export const isGameOver = (board: Board): boolean => {
    return checkWinner(board) !== null || isBoardFull(board);
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