import type { Candy, CandyColor, Grid } from "../types/game";
import { CANDY_COLORS, cloneGrid, findAllMatches } from "./matchDetection";

export const ROWS = 8;
export const COLS = 8;

function randomColor(exclude?: CandyColor[]): CandyColor {
  const pool = exclude
    ? CANDY_COLORS.filter((c) => !exclude.includes(c))
    : CANDY_COLORS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Build initial grid — guaranteed no matches.
 */
export function buildInitialGrid(): Grid {
  const grid: Grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Avoid creating matches at generation time
      const leftColor = c >= 2 ? grid[r][c - 1]?.color : undefined;
      const leftColor2 = c >= 2 ? grid[r][c - 2]?.color : undefined;
      const topColor = r >= 2 ? grid[r - 1]?.[c]?.color : undefined;
      const topColor2 = r >= 2 ? grid[r - 2]?.[c]?.color : undefined;

      const exclude: CandyColor[] = [];
      if (leftColor && leftColor === leftColor2) exclude.push(leftColor);
      if (topColor && topColor === topColor2) exclude.push(topColor);

      const color = randomColor(exclude.length > 0 ? exclude : undefined);
      grid[r][c] = { id: crypto.randomUUID(), color, row: r, col: c };
    }
  }
  return grid;
}

/**
 * Perform swap in-place on a cloned grid, returns new grid.
 */
export function swapCandies(
  grid: Grid,
  r1: number,
  c1: number,
  r2: number,
  c2: number,
): Grid {
  const next = cloneGrid(grid);
  const tmp = next[r1][c1];
  next[r1][c1] = next[r2][c2];
  next[r2][c2] = tmp;
  if (next[r1][c1]) {
    next[r1][c1]!.row = r1;
    next[r1][c1]!.col = c1;
  }
  if (next[r2][c2]) {
    next[r2][c2]!.row = r2;
    next[r2][c2]!.col = c2;
  }
  return next;
}

/**
 * Remove matched cells from grid (set to null).
 */
export function removeMatches(grid: Grid, matched: Set<string>): Grid {
  const next = cloneGrid(grid);
  for (const key of matched) {
    const [r, c] = key.split(",").map(Number);
    next[r][c] = null;
  }
  return next;
}

/**
 * Cascade: candies fall down into empty cells, new candies fill from top.
 */
export function applyCascade(grid: Grid): Grid {
  const next = cloneGrid(grid);

  for (let c = 0; c < COLS; c++) {
    // Collect existing (non-null) candies from bottom to top
    const column: Candy[] = [];
    for (let r = ROWS - 1; r >= 0; r--) {
      if (next[r][c]) column.push(next[r][c]!);
    }
    // Fill from bottom up
    for (let r = ROWS - 1; r >= 0; r--) {
      if (column.length > 0) {
        const candy = column.shift()!;
        candy.row = r;
        candy.col = c;
        next[r][c] = candy;
      } else {
        // Generate new candy
        next[r][c] = {
          id: crypto.randomUUID(),
          color: randomColor(),
          row: r,
          col: c,
        };
      }
    }
  }

  return next;
}

/**
 * Score multiplier for chain reactions.
 */
export function scoreForMatches(matchedCount: number, multiplier = 1): number {
  return matchedCount * 10 * multiplier;
}

export function resolveBoard(
  grid: Grid,
  onCascade: (next: Grid, matched: Set<string>, chain: number) => void,
): void {
  let current = cloneGrid(grid);
  let chain = 0;

  const step = () => {
    const matched = findAllMatches(current);
    if (matched.size === 0) return;
    chain++;
    const afterRemove = removeMatches(current, matched);
    onCascade(afterRemove, matched, chain);
    current = applyCascade(afterRemove);
    setTimeout(step, 700);
  };

  step();
}
