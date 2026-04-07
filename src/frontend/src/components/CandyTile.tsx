import { memo } from "react";
import type { CandyColor } from "../types/game";

interface CandyTileProps {
  color: CandyColor;
  row: number;
  col: number;
  isSelected: boolean;
  isMatched: boolean;
  isSwapping: boolean;
  isInvalidSwap: boolean;
  onClick: (row: number, col: number) => void;
}

const CANDY_STYLES: Record<
  CandyColor,
  { bg: string; shadow: string; icon: string; shine: string }
> = {
  red: {
    bg: "bg-[oklch(var(--candy-red))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-red)/0.6)]",
    icon: "🔴",
    shine: "from-[oklch(var(--candy-red)/0.6)]",
  },
  orange: {
    bg: "bg-[oklch(var(--candy-orange))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-orange)/0.6)]",
    icon: "🟠",
    shine: "from-[oklch(var(--candy-orange)/0.6)]",
  },
  yellow: {
    bg: "bg-[oklch(var(--candy-yellow))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-yellow)/0.6)]",
    icon: "🌟",
    shine: "from-[oklch(var(--candy-yellow)/0.6)]",
  },
  green: {
    bg: "bg-[oklch(var(--candy-green))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-green)/0.6)]",
    icon: "💚",
    shine: "from-[oklch(var(--candy-green)/0.6)]",
  },
  blue: {
    bg: "bg-[oklch(var(--candy-blue))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-blue)/0.6)]",
    icon: "💎",
    shine: "from-[oklch(var(--candy-blue)/0.6)]",
  },
  purple: {
    bg: "bg-[oklch(var(--candy-purple))]",
    shadow: "shadow-[0_4px_12px_oklch(var(--candy-purple)/0.6)]",
    icon: "🔮",
    shine: "from-[oklch(var(--candy-purple)/0.6)]",
  },
};

export const CandyTile = memo(function CandyTile({
  color,
  row,
  col,
  isSelected,
  isMatched,
  isSwapping,
  isInvalidSwap,
  onClick,
}: CandyTileProps) {
  const style = CANDY_STYLES[color];

  let animClass = "";
  if (isMatched) animClass = "animate-match-pop";
  else if (isSwapping) animClass = "animate-swap";
  else if (isInvalidSwap) animClass = "animate-shake";

  return (
    <button
      type="button"
      data-ocid={`candy-tile-${row}-${col}`}
      onClick={() => onClick(row, col)}
      className={[
        "relative w-full aspect-square rounded-[12px] cursor-pointer select-none",
        "transition-all duration-150 active:scale-95",
        style.bg,
        style.shadow,
        isSelected
          ? "scale-110 ring-4 ring-white/70 ring-offset-2 ring-offset-transparent brightness-125 z-10"
          : "hover:scale-105 hover:brightness-110",
        isMatched ? "brightness-150" : "",
        animClass,
      ].join(" ")}
      aria-label={`${color} candy at row ${row + 1}, column ${col + 1}`}
    >
      {/* Shine highlight */}
      <div
        className={`absolute inset-0 rounded-[12px] bg-gradient-to-br ${style.shine} to-transparent opacity-30 pointer-events-none`}
      />
      {/* Inner gloss dot */}
      <div className="absolute top-[15%] left-[18%] w-[28%] h-[22%] rounded-full bg-white/40 blur-[2px] pointer-events-none" />
      {/* Icon */}
      <span className="absolute inset-0 flex items-center justify-center text-[1.4rem] drop-shadow-sm pointer-events-none select-none">
        {style.icon}
      </span>
    </button>
  );
});
