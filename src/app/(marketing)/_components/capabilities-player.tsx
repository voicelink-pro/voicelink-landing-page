"use client";

import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type CapabilitiesPlayerProps = {
  src: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  playLabel: string;
  pauseLabel: string;
  unavailableMessage: string;
};

export function CapabilitiesPlayer({
  src,
  imageSrc,
  title,
  subtitle,
  playLabel,
  pauseLabel,
  unavailableMessage,
}: CapabilitiesPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedPlayback = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState("");

  function updateProgress() {
    const audio = audioRef.current;

    if (!audio?.duration) {
      return;
    }

    setElapsed(audio.currentTime);
    setDuration(audio.duration);
    setProgress(audio.currentTime / audio.duration);
  }

  function seek(ratio: number) {
    const audio = audioRef.current;

    if (!audio?.duration || !Number.isFinite(audio.duration)) {
      return;
    }

    const next = Math.min(1, Math.max(0, ratio));
    audio.currentTime = next * audio.duration;
    setProgress(next);
    setElapsed(audio.currentTime);
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
    <figure
      className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-white/15 bg-primary bg-cover bg-center p-6 text-white sm:p-8 lg:aspect-square"
      style={{ backgroundImage: `url("${imageSrc}")` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
      <figcaption className="relative flex flex-col items-center gap-5 text-center">
        <div className="flex max-w-sm flex-col gap-2">
          <p className="text-2xl leading-tight font-normal tracking-[-0.03em] text-balance text-white">
            {title}
          </p>
          <p className="text-sm leading-6 text-pretty text-white/80">
            {subtitle}
          </p>
        </div>
        <audio
          ref={audioRef}
          preload="metadata"
          src={src}
          onDurationChange={updateProgress}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
            setElapsed(0);
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
          className="bg-white text-foreground hover:bg-white/90"
          onClick={() => void handlePlayback()}
          type="button"
        >
          {isPlaying ? (
            <PauseIcon data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          {isPlaying ? pauseLabel : playLabel}
        </Button>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <div
            aria-label="Postęp nagrania"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={Math.round(progress * 100)}
            className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/30"
            role="slider"
            tabIndex={0}
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              seek((event.clientX - bounds.left) / bounds.width);
            }}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                return;
              }

              event.preventDefault();
              seek(progress + (event.key === "ArrowRight" ? 0.05 : -0.05));
            }}
          >
            <div
              className="h-full rounded-full bg-white motion-safe:transition-[width] motion-safe:duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-xs text-white/75">
            {formatTime(elapsed)} / {formatTime(duration)}
          </p>
        </div>
        {message ? (
          <p aria-live="polite" className="text-sm text-white/80">
            {message}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}
