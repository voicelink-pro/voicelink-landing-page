"use client";

import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type ConversationPlayerProps = {
  src: string;
  playLabel: string;
  pauseLabel: string;
  unavailableMessage: string;
};

export function ConversationPlayer({
  src,
  playLabel,
  pauseLabel,
  unavailableMessage,
}: ConversationPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedPlayback = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  function updateProgress() {
    const audio = audioRef.current;

    if (!audio?.duration) {
      return;
    }

    setProgress(audio.currentTime / audio.duration);
  }

  async function handlePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    hasStartedPlayback.current = true;

    try {
      await audio.play();
      setMessage("");
    } catch {
      setIsPlaying(false);
      setMessage(unavailableMessage);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onError={() => {
          if (!hasStartedPlayback.current) {
            return;
          }

          setIsPlaying(false);
          setMessage(unavailableMessage);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={updateProgress}
      />
      <Button
        className="h-11 bg-white px-6 text-base text-black hover:bg-white/90"
        onClick={() => void handlePlayback()}
        size="lg"
        type="button"
      >
        {isPlaying ? (
          <PauseIcon data-icon="inline-start" />
        ) : (
          <PlayIcon data-icon="inline-start" />
        )}
        {isPlaying ? pauseLabel : playLabel}
      </Button>
      <div
        aria-hidden="true"
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/25"
      >
        <div
          className="h-full rounded-full bg-white transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {message ? (
        <p aria-live="polite" className="text-sm text-white">
          {message}
        </p>
      ) : null}
    </div>
  );
}
