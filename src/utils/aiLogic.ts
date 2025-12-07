import type { Board, Player, AIDifficulty } from '../types/game';
import { checkWinner, getEmptyCells, getOpponent, isValidMove, makeMove } from './gameLogic';

export const getEasyMove = (board: Board): number => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return -1;

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export const winningStrategy = (board: Board, player: Player): number | undefined => {
    for(let i = 0; i < 9; i++) {
        if(isValidMove(board, i)) {
            const testBoard = makeMove(board, player, i);
            if(checkWinner(testBoard) === player) {
                return i;
            } 
        }
    }

    return undefined;
}

export const blockingStrategy = (board: Board, player: Player): number | undefined => {
    const opponent = getOpponent(player);
    
    return winningStrategy(board, opponent);
}

export const getCenterCell = (board: Board): number | undefined => {
    if(isValidMove(board, 4)) return 4;
    
    return undefined;
}

export const getCornerCell = (board: Board): number | undefined => {
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => isValidMove(board, i));

    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
}

export const getMediumMove = (board: Board, player: Player): number => {
    const win = winningStrategy(board, player);
    if (win !== undefined) return win; 

    const block = blockingStrategy(board, player);
    if (block !== undefined) return block;

    const center = getCenterCell(board);
    if (center !== undefined) return center;

    const corner = getCornerCell(board);
    if (corner !== undefined) return corner;

    return getEasyMove(board); 
}

export const getHardMove = (board: Board, player: Player): number => {   
    const opponent = getOpponent(player);

    const win = winningStrategy(board, player);
    if (win !== undefined) return win;

    const block = blockingStrategy(board, player);
    if (block !== undefined) return block;

    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];
    const center = 4;
    
    const corner = corners.filter(i => isValidMove(board, i));
    const edge = edges.filter(i => isValidMove(board, i));

    const diag = [ [0, 8], [2, 6] ];

    let hasFork = false;
    for (let i = 0; i < diag.length; i++) {
        const [a, b] = diag[i];
        if (board[a] === opponent && board[b] === opponent) {
            hasFork = true;
            break;
        }
    }

    let fork = false;
    if (board[center] === player && hasFork) {
        fork = true;
    }

    if (fork && edge.length > 0) {
        const idx = (Math.random() * edge.length) | 0;

        return edge[idx];
    }

    if (isValidMove(board, center)) return center;

    if (corner.length > 0) {
        return corner[Math.floor(Math.random() * corner.length)];
    }

    if (edge.length > 0) {
        return edge[Math.floor(Math.random() * edge.length)];
    }

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