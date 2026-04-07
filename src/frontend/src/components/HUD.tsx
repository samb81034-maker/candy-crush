import { Star, Zap } from "lucide-react";
import { motion } from "motion/react";

interface HUDProps {
  score: number;
  movesLeft: number;
  totalMoves?: number;
}

const TOTAL_MOVES = 30;

export function HUD({ score, movesLeft, totalMoves = TOTAL_MOVES }: HUDProps) {
  const movesPercent = (movesLeft / totalMoves) * 100;
  const isLow = movesLeft <= 5;

  return (
    <div data-ocid="hud-panel" className="w-full max-w-lg px-4 pt-5 pb-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Score */}
        <div
          data-ocid="score-display"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-card border border-border p-4 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-display uppercase tracking-widest">
            <Star className="w-3 h-3" />
            Score
          </div>
          <motion.span
            key={score}
            initial={{ scale: 1.4, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-display font-bold text-3xl text-foreground tabular-nums"
          >
            {score.toLocaleString()}
          </motion.span>
        </div>

        {/* Moves */}
        <div
          data-ocid="moves-display"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-card border border-border p-4 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-display uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            Moves Left
          </div>
          <motion.span
            key={movesLeft}
            initial={{ scale: 1.4, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`font-display font-bold text-3xl tabular-nums ${
              isLow ? "text-primary" : "text-foreground"
            }`}
          >
            {movesLeft}
          </motion.span>
        </div>
      </div>

      {/* Move progress bar */}
      <div
        className="mt-3 h-2 rounded-full bg-muted overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${
            isLow ? "bg-primary" : "bg-secondary"
          }`}
          animate={{ width: `${movesPercent}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
