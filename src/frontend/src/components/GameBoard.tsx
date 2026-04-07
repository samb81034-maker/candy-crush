import type { GameState } from "../types/game";
import { CandyTile } from "./CandyTile";

interface GameBoardProps {
  state: GameState;
  onCellClick: (row: number, col: number) => void;
  cols: number;
}

export function GameBoard({ state, onCellClick, cols }: GameBoardProps) {
  const { grid, selected, matchedCells, swappingCells, animationState } = state;

  const cells = grid.flatMap((rowArr, r) =>
    rowArr.map((candy, c) => {
      if (!candy) {
        return { id: `empty-${r}-${c}`, isEmpty: true, r, c, candy: null };
      }
      return { id: candy.id, isEmpty: false, r, c, candy };
    }),
  );

  return (
    <div
      data-ocid="game-board"
      className="relative p-3 rounded-2xl bg-[oklch(var(--board-bg))] shadow-[0_8px_40px_oklch(0_0_0/0.7),inset_0_1px_0_oklch(1_0_0/0.08)]"
      style={{ touchAction: "none" }}
    >
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cells.map(({ id, isEmpty, r, c, candy }) => {
          if (isEmpty || !candy) {
            return (
              <div
                key={id}
                className="w-full aspect-square rounded-[12px] bg-[oklch(var(--board-cell-bg))]"
              />
            );
          }

          const matchKey = `${r},${c}`;
          const isSelected =
            !!selected && selected.row === r && selected.col === c;
          const isMatched = matchedCells.has(matchKey);
          const isSwapping =
            animationState === "swapping" &&
            !!swappingCells &&
            ((swappingCells.from.row === r && swappingCells.from.col === c) ||
              (swappingCells.to.row === r && swappingCells.to.col === c));
          const isInvalidSwap =
            animationState === "invalid-swap" &&
            !!swappingCells &&
            ((swappingCells.from.row === r && swappingCells.from.col === c) ||
              (swappingCells.to.row === r && swappingCells.to.col === c));

          return (
            <CandyTile
              key={id}
              color={candy.color}
              row={r}
              col={c}
              isSelected={isSelected}
              isMatched={isMatched}
              isSwapping={isSwapping}
              isInvalidSwap={isInvalidSwap}
              onClick={onCellClick}
            />
          );
        })}
      </div>
    </div>
  );
}
