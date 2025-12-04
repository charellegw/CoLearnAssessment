import { useState, useCallback, useEffect } from "react";
import type { GameState, GameMode, AIDifficulty, Player, Board } from "../types/game";
import { createEmptyBoard, checkWinner, isBoardFull } from "../utils/game/gameLogic";
import { getAIMove } from "../utils/game/aiLogic";

const initialGmaeState: GameState = {
    board: createEmptyBoard(),
    currentPlayer: 'X',
    gameMode: '1vs1',
    difficulty: 'easy',
    status: 'playing',
    winner: null,
    scores: {player1: 0, player2: 0, draws: 0},
    history: []
};

export const useTicTacToe = () => {
    
}