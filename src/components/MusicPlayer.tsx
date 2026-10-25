"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type MusicPlayerHandle = { play: () => void };

const MusicPlayer = forwardRef<MusicPlayerHandle, { opened: boolean }>(
  function MusicPlayer({ opened }, ref) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [error, setError] = useState(false);

    async function play() {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.4;
      try {
        await audio.play();
        setPlaying(true);
        setError(false);
      } catch {
        setPlaying(false);
        // Browser might refuse autoplay, or MP3 file might be missing.
        setError(true);
      }
    }
    useImperativeHandle(ref, () => ({ play }));

    function toggle() {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) void play();
      else { audio.pause(); setPlaying(false); }
    }

    return (
      <>
        <audio
          ref={audioRef}
          src="/audio/wedding.mp3"
          loop
          preload="none"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onError={() => { setPlaying(false); setError(true); }}
        />
        {opened && (
          <button
            className={`wedding-music-toggle${playing ? " is-playing" : ""}`}
            type="button"
            aria-label={playing ? "Jeda musik" : "Putar musik"}
            title={error ? "Musik belum tersedia. Tambahkan public/audio/wedding.mp3" : playing ? "Jeda musik" : "Putar musik"}
            aria-pressed={playing}
            onClick={toggle}
          >
            <span aria-hidden="true">{playing ? "♫" : "♪"}</span>
          </button>
        )}
      </>
    );
  }
);
export default MusicPlayer;
