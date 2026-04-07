import { useCallback, useReducer, useRef } from "react";
import type { GameState, Grid } from "../types/game";
import {
  COLS,
  ROWS,
  applyCascade,
  buildInitialGrid,
  removeMatches,
  scoreForMatches,
  swapCandies,
} from "../utils/boardUtils";
import { findAllMatches, wouldCreateMatch } from "../utils/matchDetection";

const STARTING_MOVES = 30;

type Action =
  | { type: "SELECT"; row: number; col: number }
  | { type: "SWAP_START"; r1: number; c1: number; r2: number; c2: number }
  | { type: "SWAP_INVALID"; r1: number; c1: number; r2: number; c2: number }
  | { type: "SWAP_COMMIT"; grid: Grid; matched: Set<string> }
  | { type: "MATCH_FOUND"; grid: Grid; matched: Set<string> }
  | { type: "CLEAR_MATCHED"; grid: Grid }
  | { type: "CASCADE"; grid: Grid; matched: Set<string>; score: number }
  | { type: "SETTLE" }
  | { type: "RESTART" };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SELECT": {
      if (state.animationState !== "idle" || state.gameOver) return state;
      const { row, col } = action;
      if (!state.selected) {
        return { ...state, selected: { row, col } };
      }
      // Deselect same cell
      if (state.selected.row === row && state.selected.col === col) {
        return { ...state, selected: null };
      }
      // Adjacent?
      const dr = Math.abs(state.selected.row - row);
      const dc = Math.abs(state.selected.col - col);
      if (dr + dc === 1) {
        // Attempt swap — handled by middleware in hook
        return { ...state, selected: null };
      }
      // Select new cell
      return { ...state, selected: { row, col } };
    }
    case "SWAP_START":
      return {
        ...state,
        animationState: "swapping",
        movesLeft: state.movesLeft - 1,
        swappingCells: {
          from: { row: action.r1, col: action.c1 },
          to: { row: action.r2, col: action.c2 },
        },
      };
    case "SWAP_INVALID":
      return {
        ...state,
        animationState: "invalid-swap",
        swappingCells: {
          from: { row: action.r1, col: action.c1 },
          to: { row: action.r2, col: action.c2 },
        },
      };
    case "SWAP_COMMIT":
      return {
        ...state,
        grid: action.grid,
        animationState: "matching",
        matchedCells: action.matched,
        swappingCells: null,
      };
    case "MATCH_FOUND":
      return {
        ...state,
        grid: action.grid,
        animationState: "matching",
        matchedCells: action.matched,
        swappingCells: null,
      };
    case "CLEAR_MATCHED":
      return {
        ...state,
        grid: action.grid,
        matchedCells: new Set(),
      };
    case "CASCADE":
      return {
        ...state,
        grid: action.grid,
        score: state.score + action.score,
        matchedCells: action.matched,
      };
    case "SETTLE": {
      const gameOver = state.movesLeft <= 0;
      return {
        ...state,
        animationState: "idle",
        matchedCells: new Set(),
        gameOver,
      };
    }
    case "RESTART":
      return buildInitialState();
    default:
      return state;
  }
}

function buildInitialState(): GameState {
  return {
    grid: buildInitialGrid(),
    score: 0,
    movesLeft: STARTING_MOVES,
    selected: null,
    animationState: "idle",
    matchedCells: new Set(),
    swappingCells: null,
    gameOver: false,
  };
}

export function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);
  const processingRef = useRef(false);

  const processMatchCascade = useCallback(async (grid: Grid, chain = 0) => {
    const matched = findAllMatches(grid);
    if (matched.size === 0) {
      dispatch({ type: "SETTLE" });
      processingRef.current = false;
      return;
    }

    const scoreGain = scoreForMatches(matched.size, chain + 1);
    // Show match flash — use MATCH_FOUND for cascades (no move cost), SWAP_COMMIT only for initial swap
    dispatch({ type: "MATCH_FOUND", grid, matched });

    await delay(350); // match highlight duration

    const afterRemove = removeMatches(grid, matched);
    dispatch({ type: "CLEAR_MATCHED", grid: afterRemove });

    await delay(200);

    const afterCascade = applyCascade(afterRemove);
    dispatch({
      type: "CASCADE",
      grid: afterCascade,
      matched: new Set(),
      score: scoreGain,
    });

    await delay(500);

    processMatchCascade(afterCascade, chain + 1);
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (state.animationState !== "idle" || state.gameOver) return;

      const prev = state.selected;

      if (!prev) {
        dispatch({ type: "SELECT", row, col });
        return;
      }

      if (prev.row === row && prev.col === col) {
        dispatch({ type: "SELECT", row, col }); // deselect
        return;
      }

      const dr = Math.abs(prev.row - row);
      const dc = Math.abs(prev.col - col);

      if (dr + dc !== 1) {
        // Not adjacent — select new cell instead
        dispatch({ type: "SELECT", row, col });
        return;
      }

      dispatch({ type: "SELECT", row, col }); // clears selection

      const valid = wouldCreateMatch(state.grid, prev.row, prev.col, row, col);

      if (!valid) {
        // Show invalid swap animation
        dispatch({
          type: "SWAP_INVALID",
          r1: prev.row,
          c1: prev.col,
          r2: row,
          c2: col,
        });
        setTimeout(() => dispatch({ type: "SETTLE" }), 400);
        return;
      }

      processingRef.current = true;
      dispatch({
        type: "SWAP_START",
        r1: prev.row,
        c1: prev.col,
        r2: row,
        c2: col,
      });

      setTimeout(() => {
        const swapped = swapCandies(state.grid, prev.row, prev.col, row, col);
        processMatchCascade(swapped, 0);
      }, 300);
    },
    [
      state.animationState,
      state.gameOver,
      state.selected,
      state.grid,
      processMatchCascade,
    ],
  );

  const restart = useCallback(() => dispatch({ type: "RESTART" }), []);

  return { state, handleCellClick, restart, ROWS, COLS };
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
