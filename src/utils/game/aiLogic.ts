import type { Board, Player, AIDifficulty } from '../../types/game';
import { checkWinner } from './gameLogic';

export const getEasyMove = (board: Board): number => {
    const emptyCells = board.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export const getMediumMove = (board: Board, player: Player): number => {
    for(let i = 0; i < 9; i++) {
        if(board[i] === null) {
            const testBoard = [...board];
            testBoard[i] = player;
            if(checkWinner(testBoard) === player) {
                return i;
            } 
        }
    }

    if(board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === null);

    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    return getEasyMove(board);
}

export const getHardMove = (board: Board, player: Player): number => {
    return getMediumMove(board, player);
}

export const getAIMove = (board: Board, player: Player, difficulty: AIDifficulty): number => {
    switch (difficulty) {
        case 'easy':
            return getEasyMove(board);
        case 'easy':
            return getMediumMove(board, player);
        case 'hard':
            return getHardMove(board, player);
        default:
            return getEasyMove(board);
    }
}