"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GameEngine } from "./gameEngine";
import { IntelItem, Weapon, GAME_WEAPONS, INTEL_ITEMS } from "@/data/gameData";
import { GameStats } from "./types";
import { gameAudio } from "./gameAudio";

export function useShootingGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  const [currentWeapon, setCurrentWeapon] = useState<Weapon>(GAME_WEAPONS[0]);
  const [currentWave, setCurrentWave] = useState(1);
  const [waveName, setWaveName] = useState("WAVE 1: RECONNAISSANCE");
  const [recentUnlock, setRecentUnlock] = useState<IntelItem | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    shotsFired: 0,
    shotsHit: 0,
    accuracy: 100,
    targetsDestroyed: 0,
    intelUnlockedCount: 0,
    totalIntelCount: INTEL_ITEMS.length,
  });

  const isCodexOpenRef = useRef(isCodexOpen);
  isCodexOpenRef.current = isCodexOpen;

  const isVictoryOpenRef = useRef(isVictoryOpen);
  isVictoryOpenRef.current = isVictoryOpen;

  // Load previously unlocked intel from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("shoot_game_unlocked_ids");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setUnlockedIds(parsed);
          }
        }
        setIsMuted(gameAudio.isMuted());
      } catch (e) {
        console.error("Failed to load game storage", e);
      }
    }
  }, []);

  // Save unlocked intel to localStorage
  const handleIntelUnlocked = useCallback((intel: IntelItem, isNew: boolean) => {
    setRecentUnlock(intel);
    setUnlockedIds((prev) => {
      if (!prev.includes(intel.id)) {
        const next = [...prev, intel.id];
        if (typeof window !== "undefined") {
          localStorage.setItem("shoot_game_unlocked_ids", JSON.stringify(next));
        }
        return next;
      }
      return prev;
    });
  }, []);

  const handleWaveChange = useCallback((wave: number, title: string) => {
    setCurrentWave(wave);
    setWaveName(title);
  }, []);

  const handleStatsUpdate = useCallback((newStats: GameStats) => {
    setStats(newStats);
  }, []);

  const handleVictory = useCallback((finalStats: GameStats) => {
    setStats(finalStats);
    setIsVictoryOpen(true);
  }, []);

  const handleScreenShake = useCallback((_intensity: number) => {
    // Optional CSS shake trigger
  }, []);

  const switchWeapon = useCallback((weapon: Weapon) => {
    setCurrentWeapon(weapon);
    if (engineRef.current) {
      engineRef.current.setWeapon(weapon);
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      if (engineRef.current) {
        engineRef.current.pause(next);
      }
      return next;
    });
  }, []);

  const toggleMute = useCallback(() => {
    const muted = gameAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  // Initialize Game Canvas Engine when modal opens
  useEffect(() => {
    if (!isOpen) {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine(
      canvas,
      {
        onIntelUnlocked: handleIntelUnlocked,
        onWaveChange: handleWaveChange,
        onStatsUpdate: handleStatsUpdate,
        onVictory: handleVictory,
        onScreenShake: handleScreenShake,
      },
      unlockedIds
    );

    engineRef.current = engine;
    engine.start();

    // Resize handler
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener("resize", handleResize);

    // Mouse / Touch Event Handlers on Canvas
    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getPos(e);
      engine.aimX = pos.x;
      engine.aimY = pos.y;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Left click only
      const pos = getPos(e);
      engine.isMouseDown = true;
      engine.triggerShoot(pos.x, pos.y);
    };

    const handleMouseUp = () => {
      engine.isMouseDown = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const pos = getPos(e.touches[0]);
        engine.aimX = pos.x;
        engine.aimY = pos.y;
        engine.isMouseDown = true;
        engine.triggerShoot(pos.x, pos.y);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const pos = getPos(e.touches[0]);
        engine.aimX = pos.x;
        engine.aimY = pos.y;
      }
    };

    const handleTouchEnd = () => {
      engine.isMouseDown = false;
    };

    // Keyboard controls (1-4 weapon select, M mute, C codex, Space shoot, Esc pause/close)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") switchWeapon(GAME_WEAPONS[0]);
      else if (e.key === "2") switchWeapon(GAME_WEAPONS[1]);
      else if (e.key === "3") switchWeapon(GAME_WEAPONS[2]);
      else if (e.key === "4") switchWeapon(GAME_WEAPONS[3]);
      else if (e.key === "m" || e.key === "M") toggleMute();
      else if (e.key === "c" || e.key === "C") setIsCodexOpen((v) => !v);
      else if (e.key === "Escape") {
        if (isCodexOpenRef.current) setIsCodexOpen(false);
        else if (isVictoryOpenRef.current) setIsVictoryOpen(false);
        else togglePause();
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      engine.stop();
    };
  }, [
    isOpen,
    handleIntelUnlocked,
    handleWaveChange,
    handleStatsUpdate,
    handleVictory,
    handleScreenShake,
    switchWeapon,
    toggleMute,
    togglePause,
    unlockedIds,
  ]);

  const restartGame = useCallback(() => {
    setIsVictoryOpen(false);
    if (engineRef.current) {
      engineRef.current.startWave(1);
    }
  }, []);

  const startEndlessMode = useCallback(() => {
    setIsVictoryOpen(false);
    if (engineRef.current) {
      engineRef.current.startWave(4);
    }
  }, []);

  const openGame = useCallback(() => {
    setIsOpen(true);
    setIsPaused(false);
    setIsVictoryOpen(false);
  }, []);

  const closeGame = useCallback(() => {
    setIsOpen(false);
    setIsPaused(false);
    setIsVictoryOpen(false);
  }, []);

  return {
    canvasRef,
    isOpen,
    isPaused,
    isMuted,
    isCodexOpen,
    isVictoryOpen,
    currentWeapon,
    currentWave,
    waveName,
    recentUnlock,
    unlockedIds,
    stats,
    openGame,
    closeGame,
    togglePause,
    toggleMute,
    switchWeapon,
    setIsCodexOpen,
    setIsVictoryOpen,
    setRecentUnlock,
    restartGame,
    startEndlessMode,
  };
}
