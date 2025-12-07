import { useState } from "react";
import type { GameState, GameMode, AIDifficulty } from "../types/game";
import { createEmptyBoard, makeMove, isValidMove, getGameResult, getGameStatus } from "../utils/gameLogic";
import { getAIMove } from "../utils/aiLogic";

const getInitialGameState = (): GameState => ({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    gameMode: '1vs1',
    difficulty: 'medium',
    status: 'playing',
    winner: null,
    scores: {player1: 0, player2: 0, draws: 0},
    history: []
});

export const useTicTacToe = () => {
    const [gameState, setGameState] = useState<GameState>(getInitialGameState);

    const makePlayerMove = (position: number) => {
        const { board, currentPlayer, status, gameMode, difficulty } = gameState;
        
        if(status !== 'playing' || !isValidMove(board, position)) return;

        try {
            const newBoard = makeMove(board, currentPlayer, position);
            const { winner, isDraw } = getGameResult(newBoard);
            const newScores = {...gameState.scores};
            if (winner) {
                if (winner === 'X') newScores.player1++;
                else newScores.player2++;
            } else if (isDraw) {
                newScores.draws++;
            }
    
            const updatedState: GameState = {
                ...gameState,
                board: newBoard,
                history: [...gameState.history, board],
                winner,
                status: winner ? 'won' : isDraw ? 'draw' : 'playing',
                scores: newScores,
                currentPlayer: (winner || isDraw) ? currentPlayer : (currentPlayer === 'X' ? 'O' : 'X')
            };
    
            setGameState(updatedState);
    
            if (gameMode === 'vsAI' && updatedState.status === 'playing' &&  updatedState.currentPlayer === 'O') {
                setTimeout(() => {
                    const aiPos = getAIMove(newBoard, 'O', difficulty);
                    // console.log('dbug pos ', aiPos);
                    if(isValidMove(newBoard, aiPos)) {
                        const aiBoard = makeMove(newBoard, 'O', aiPos);
                        const aiResult = getGameResult(aiBoard);
                        const aiScores = {...newScores};

                        if (aiResult.winner) aiScores.player2++;
                        else if (aiResult.isDraw) aiScores.draws++;

                        setGameState(prev => ({
                            ...prev,
                            board: aiBoard,
                            history: [...prev.history, newBoard],
                            winner: aiResult.winner,
                            status: getGameStatus(aiBoard),
                            scores: aiScores,
                            currentPlayer: (aiResult.winner || aiResult.isDraw) ? 'O' : 'X'
                        }));
                    }
                }, 900);
            }
        } catch (error) {
            throw error;
        }
    };

    const startNewGame = (mode: GameMode, difficulty?: AIDifficulty) => {
        setGameState({
            ...getInitialGameState(),
            gameMode: mode,
            difficulty: mode === 'vsAI' ? (difficulty || 'medium') : 'medium',
            status: 'playing'
        });
    };

    const resetGame = () => {
        setGameState(prev => ({
            ...prev,
            board: createEmptyBoard(),
            currentPlayer: 'X',
            status: 'playing',
            winner: null,
            history: []
        }));
    };

    const resetScores = () => {
        setGameState(prev => ({
            ...prev,
            scores: { player1: 0, player2: 0, draws: 0 }
        }));
    };

    return {
        gameState,
        makePlayerMove,
        startNewGame,
        resetGame,
        resetScores
    };
};