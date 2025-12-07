import type { Board, Player, AIDifficulty } from '../../types/game';
import { checkWinner, getEmptyCells, getOpponent, isValidMove, makeMove } from './gameLogic';

export const getEasyMove = (board: Board): number => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return -1;

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export const getMediumMove = (board: Board, player: Player): number => {
    for(let i = 0; i < 9; i++) {
        if(isValidMove(board, i)) {
            const testBoard = makeMove(board, player, i);
            testBoard[i] = player;
            if(checkWinner(testBoard) === player) {
                return i;
            } 
        }
    }

    const opponent = getOpponent(player);
    for(let i = 0; i < 9; i++) {
        if(isValidMove(board, i)) {
            const testBoard = makeMove(board, opponent, i);
            if(checkWinner(testBoard) === opponent) {
                return i;
            } 
        }
    }

    if(isValidMove(board, 4)) return 4;

    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => isValidMove(board, i));

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
        case 'medium':
            return getMediumMove(board, player);
        case 'hard':
            return getHardMove(board, player);
        default:
            return getEasyMove(board);
    }
}