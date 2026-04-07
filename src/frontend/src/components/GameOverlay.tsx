import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface GameOverlayProps {
  visible: boolean;
  score: number;
  onRestart: () => void;
}

export function GameOverlay({ visible, score, onRestart }: GameOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          data-ocid="game-over-overlay"
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-background/92 backdrop-blur-md z-20"
        >
          <div className="flex flex-col items-center gap-6 text-center px-8">
            {/* Animated candy emoji */}
            <motion.span
              initial={{ rotate: -15, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-7xl select-none"
              aria-hidden="true"
            >
              🍭
            </motion.span>

            {/* Title */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <h2 className="font-display font-bold text-4xl text-foreground mb-1.5 tracking-tight">
                Game Over!
              </h2>
              <p className="text-muted-foreground font-body text-sm">
                You ran out of moves
              </p>
            </motion.div>

            {/* Final score badge */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                  Final Score
                </span>
                <Badge
                  variant="secondary"
                  data-ocid="final-score-badge"
                  className="text-2xl px-6 py-2 font-display font-bold rounded-xl"
                >
                  {score.toLocaleString()} pts
                </Badge>
              </div>
            </motion.div>

            {/* Play Again */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <Button
                type="button"
                size="lg"
                onClick={onRestart}
                data-ocid="play-again-btn"
                className="font-display font-bold text-base gap-2 px-10 rounded-xl shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
