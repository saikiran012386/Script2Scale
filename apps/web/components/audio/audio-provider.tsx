"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export interface AudioContextType {
  hasEntered: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isDucked: boolean;
  enterWithSound: () => void;
  enterMuted: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  pauseForVideo: () => void;
  resumeAfterVideo: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const STORAGE_KEY = "s2s_audio_pref";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.5);
  const [isDucked, setIsDucked] = useState<boolean>(false);
  const wasPlayingBeforeDuck = useRef<boolean>(false);

  // Load audio preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedPref = localStorage.getItem(STORAGE_KEY);
      if (savedPref) {
        const parsed = JSON.parse(savedPref);
        setHasEntered(true);
        setIsMuted(parsed.isMuted ?? false);
        setVolumeState(parsed.volume ?? 0.5);
      }
    } catch (e) {
      console.warn("Failed to load audio preference", e);
    }
  }, []);

  // Save audio preferences whenever state changes
  const savePreference = (entered: boolean, muted: boolean, vol: number) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ hasEntered: entered, isMuted: muted, volume: vol }));
    } catch (e) {
      console.warn("Failed to save audio preference", e);
    }
  };

  const enterWithSound = useCallback(() => {
    setHasEntered(true);
    setIsMuted(false);
    setIsPlaying(true);
    savePreference(true, false, volume);
  }, [volume]);

  const enterMuted = useCallback(() => {
    setHasEntered(true);
    setIsMuted(true);
    setIsPlaying(false);
    savePreference(true, true, volume);
  }, [volume]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      savePreference(hasEntered, isMuted, volume);
      return next;
    });
  }, [hasEntered, isMuted, volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      savePreference(hasEntered, next, volume);
      return next;
    });
  }, [hasEntered, volume]);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    savePreference(hasEntered, isMuted, clamped);
  }, [hasEntered, isMuted]);

  const pauseForVideo = useCallback(() => {
    setIsDucked(true);
    wasPlayingBeforeDuck.current = isPlaying;
    setIsPlaying(false);
  }, [isPlaying]);

  const resumeAfterVideo = useCallback(() => {
    setIsDucked(false);
    if (wasPlayingBeforeDuck.current) {
      setIsPlaying(true);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        hasEntered,
        isPlaying,
        isMuted,
        volume,
        isDucked,
        enterWithSound,
        enterMuted,
        togglePlay,
        toggleMute,
        setVolume,
        pauseForVideo,
        resumeAfterVideo
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
