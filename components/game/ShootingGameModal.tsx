"use client";

import { useEffect } from "react";
import { useShootingGame } from "@/lib/game/useShootingGame";
import GameHUD from "./GameHUD";
import IntelFullscreenModal from "./IntelFullscreenModal";
import GameCodexDrawer from "./GameCodexDrawer";
import GameVictoryModal from "./GameVictoryModal";
import { Play, BookOpen, Volume2, VolumeX, X, Crosshair } from "lucide-react";

export default function ShootingGameModal() {
  const {
    canvasRef,
    isOpen,
    isPaused,
    isMuted,
    isCodexOpen,
    isVictoryOpen,
    activeFullscreenIntel,
    intelQueueCount,
    currentWeapon,
    currentWave,
    waveName,
    unlockedIds,
    stats,
    openGame,
    closeGame,
    togglePause,
    toggleMute,
    switchWeapon,
    handleResumeFromIntel,
    setIsCodexOpen,
    restartGame,
    startEndlessMode,
  } = useShootingGame();

  // Listen for global custom events to open the game from anywhere
  useEffect(() => {
    const handleOpenEvent = () => {
      openGame();
    };

    window.addEventListener("open-shoot-game", handleOpenEvent);
    return () => {
      window.removeEventListener("open-shoot-game", handleOpenEvent);
    };
  }, [openGame]);

  if (!isOpen) return null;

  return (
    <div className="dp-game-modal-root" role="dialog" aria-modal="true">
      {/* Background Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="dp-game-canvas"
      />

      {/* Retro-Cyber HUD Overlay */}
      <GameHUD
        currentWave={currentWave}
        waveName={waveName}
        stats={stats}
        currentWeapon={currentWeapon}
        isPaused={isPaused}
        isMuted={isMuted}
        onSelectWeapon={switchWeapon}
        onTogglePause={togglePause}
        onToggleMute={toggleMute}
        onOpenCodex={() => setIsCodexOpen(true)}
        onCloseGame={closeGame}
      />

      {/* Fullscreen Decrypted Intel Overlay */}
      <IntelFullscreenModal
        intel={activeFullscreenIntel}
        queueCount={intelQueueCount}
        onResume={handleResumeFromIntel}
        onOpenCodex={() => setIsCodexOpen(true)}
      />

      {/* Pause Menu Overlay */}
      {isPaused && (
        <div className="dp-game-pause-overlay">
          <div className="dp-game-pause-menu">
            <div className="text-center mb-4">
              <Crosshair size={32} className="text-sky-400 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
                ARENA PAUSED
              </h3>
              <p className="text-xs text-slate-400">Tactical simulation in stasis.</p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                className="dp-game-btn dp-game-btn--primary w-full"
                onClick={togglePause}
              >
                <Play size={16} />
                <span>Resume Battle</span>
              </button>

              <button
                type="button"
                className="dp-game-btn dp-game-btn--secondary w-full"
                onClick={() => setIsCodexOpen(true)}
              >
                <BookOpen size={16} />
                <span>Open Intel Codex</span>
              </button>

              <button
                type="button"
                className="dp-game-btn dp-game-btn--outline w-full"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isMuted ? "Unmute Sound" : "Mute Sound"}</span>
              </button>

              <button
                type="button"
                className="dp-game-btn dp-game-btn--ghost w-full"
                onClick={closeGame}
              >
                <X size={16} />
                <span>Exit Range</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Intel Codex Drawer */}
      <GameCodexDrawer
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        unlockedIds={unlockedIds}
      />

      {/* Victory Debriefing Modal */}
      <GameVictoryModal
        isOpen={isVictoryOpen}
        stats={stats}
        onOpenCodex={() => setIsCodexOpen(true)}
        onRestart={restartGame}
        onEndless={startEndlessMode}
        onClose={closeGame}
      />
    </div>
  );
}
