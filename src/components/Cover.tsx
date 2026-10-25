"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

type CoverProps = { onOpen: () => void };

export default function Cover({ onOpen }: CoverProps) {
  const [guest, setGuest] = useState("Tamu Undangan");
  const [leaving, setLeaving] = useState(false);

  function handleOpen() {
    if (leaving) return;
    setLeaving(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onOpen, reduceMotion ? 0 : 650);
  }

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("to")?.trim();
    if (name) setGuest(name.slice(0, 80));
  }, []);

  return (
    <section className={`cover-screen animated-cover ${leaving ? "cover-leaving" : ""}`}>
      <div className="cover-backdrop" aria-hidden="true" style={{ backgroundImage: "url('/images/cover.webp')" }} />
      <div className="cover-portrait">
        <Image src="/images/cover.webp" alt="Nazil dan Tiara mengenakan busana Jawa" fill priority sizes="(max-width: 700px) 100vw, 530px" className="cover-photo" />
      </div>
      <div className="cover-shade" />
      <div className="gold-frame" aria-hidden="true"><span>✦</span></div>
      <div className="cover-content">
        <div className="ornament">❦</div>
        <p className="eyebrow">THE WEDDING OF</p>
        <h1>{wedding.groom} <em>&amp;</em> {wedding.bride}</h1>
        <p className="cover-date">{wedding.dateLabel}</p>
        <div className="fine-rule" />
        <p className="invited-caption">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <p className="guest-name" aria-live="polite">{guest}</p>
        <button type="button" className="gold-button" onClick={handleOpen} disabled={leaving}>
          ✉ &nbsp; Buka Undangan
        </button>
      </div>
    </section>
  );
}
