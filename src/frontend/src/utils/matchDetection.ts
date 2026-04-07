import type { CandyColor, Grid } from "../types/game";

export type MatchGroup = Array<{ row: number; col: number }>;

/**
 * Returns all cells that are part of a match (3+ same-color in a row/col).
 */
export function findAllMatches(grid: Grid): Set<string> {
  const matched = new Set<string>();
  const ROWS = grid.length;
  const COLS = grid[0]?.length ?? 0;

  // Horizontal matches
  for (let r = 0; r < ROWS; r++) {
    let c = 0;
    while (c < COLS) {
      const candy = grid[r][c];
      if (!candy) {
        c++;
        continue;
      }
      let end = c + 1;
      while (end < COLS && grid[r][end]?.color === candy.color) end++;
      if (end - c >= 3) {
        for (let k = c; k < end; k++) matched.add(`${r},${k}`);
      }
      c = end;
    }
  }

  // Vertical matches
  for (let c = 0; c < COLS; c++) {
    let r = 0;
    while (r < ROWS) {
      const candy = grid[r][c];
      if (!candy) {
        r++;
        continue;
      }
      let end = r + 1;
      while (end < ROWS && grid[end][c]?.color === candy.color) end++;
      if (end - r >= 3) {
        for (let k = r; k < end; k++) matched.add(`${k},${c}`);
      }
      r = end;
    }
  }

  return matched;
}

/**
 * Returns true if swapping two cells would create at least one match.
 */
export function wouldCreateMatch(
  grid: Grid,
  r1: number,
  c1: number,
  r2: number,
  c2: number,
): boolean {
  const clone = cloneGrid(grid);
  const tmp = clone[r1][c1];
  clone[r1][c1] = clone[r2][c2];
  clone[r2][c2] = tmp;
  // Update positions
  if (clone[r1][c1]) {
    clone[r1][c1]!.row = r1;
    clone[r1][c1]!.col = c1;
  }
  if (clone[r2][c2]) {
    clone[r2][c2]!.row = r2;
    clone[r2][c2]!.col = c2;
  }
  return findAllMatches(clone).size > 0;
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
}

export function hasAnyMoves(grid: Grid): boolean {
  const ROWS = grid.length;
  const COLS = grid[0]?.length ?? 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c + 1 < COLS && wouldCreateMatch(grid, r, c, r, c + 1)) return true;
      if (r + 1 < ROWS && wouldCreateMatch(grid, r, c, r + 1, c)) return true;
    }
  }
  return false;
}

export const CANDY_COLORS: CandyColor[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
];
