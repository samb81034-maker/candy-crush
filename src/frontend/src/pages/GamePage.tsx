import { GameBoard } from "@/components/GameBoard";
import { GameOverlay } from "@/components/GameOverlay";
import { HUD } from "@/components/HUD";
import { Button } from "@/components/ui/button";
import { useGameEngine } from "@/hooks/useGameEngine";
import { RotateCcw } from "lucide-react";

export default function GamePage() {
  const { state, handleCellClick, restart, COLS } = useGameEngine();
  const { score, movesLeft, gameOver } = state;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start overflow-auto">
      {/* Header */}
      <header className="w-full bg-card border-b border-border shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none" aria-hidden="true">
              🍬
            </span>
            <h1 className="font-display font-bold text-xl text-foreground tracking-tight">
              Candy Crush
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={restart}
            data-ocid="restart-btn"
            className="gap-1.5 font-display font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Game
          </Button>
        </div>
      </header>

      {/* HUD — score, moves, progress bar */}
      <HUD score={score} movesLeft={movesLeft} />

      {/* Game Board */}
      <div className="w-full max-w-lg px-4 pb-8 relative">
        <GameBoard state={state} onCellClick={handleCellClick} cols={COLS} />
        <GameOverlay visible={gameOver} score={score} onRestart={restart} />
      </div>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border mt-auto">
        <div className="max-w-lg mx-auto px-4 py-3 text-center text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
