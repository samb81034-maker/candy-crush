export type CandyColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

export interface Candy {
  id: string;
  color: CandyColor;
  row: number;
  col: number;
}

export type Grid = (Candy | null)[][];

export type AnimationState =
  | "idle"
  | "swapping"
  | "matching"
  | "cascading"
  | "invalid-swap";

export interface SwapPair {
  from: { row: number; col: number };
  to: { row: number; col: number };
}

export interface GameState {
  grid: Grid;
  score: number;
  movesLeft: number;
  selected: { row: number; col: number } | null;
  animationState: AnimationState;
  matchedCells: Set<string>;
  swappingCells: SwapPair | null;
  gameOver: boolean;
}
