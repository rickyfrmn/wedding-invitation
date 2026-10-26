"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/images/cover.webp", alt: "Nazzil dan Tiara berfoto bersama" },
  { src: "/images/romantic.webp", alt: "Nazzil dan Tiara berjalan bergandengan" },
  { src: "/images/gallery.webp", alt: "Nazzil dan Tiara memberi salam" },
];

export default function GalleryLightbox() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const open = activeIndex !== null;

  function showPhoto(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }
  function closePhoto() { setActiveIndex(null); }
  function goTo(offset: number) {
    setActiveIndex(current => current === null ? null : (current + offset + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex(current => current === null ? null : (current + 1) % photos.length);
      if (event.key === "ArrowLeft") setActiveIndex(current => current === null ? null : (current + photos.length - 1) % photos.length);
      if (event.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lightbox-overlay button"));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <section className="gallery-section panel-cream ornate-section ornate-section-cream" id="galeri">
      <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
      <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
      <div className="orn-corner orn-corner-bottom-left" aria-hidden="true" />
      <div className="orn-corner orn-corner-bottom-right" aria-hidden="true" />
      <p className="eyebrow gold-text">OUR MOMENT</p>
      <h2 className="section-title">Galeri Kami</h2>
      <div className="section-divider" aria-hidden="true">
        <span className="section-divider-line" />
        <span className="section-divider-mark">✦</span>
        <span className="section-divider-line" />
      </div>
      <p className="gallery-hint">Ketuk foto untuk melihat lebih besar</p>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            className="gallery-photo-button"
            type="button"
            aria-label={`Perbesar foto ${index + 1}: ${photo.alt}`}
            onClick={(event) => showPhoto(index, event.currentTarget)}
          >
            <Image src={photo.src} width={853} height={1280} alt={photo.alt} sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="gallery-zoom-icon" aria-hidden="true">⤢</span>
          </button>
        ))}
      </div>
      {open && activeIndex !== null && createPortal(
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Foto galeri Nazil dan Tiara"
          onClick={(event) => { if (event.target === event.currentTarget) closePhoto(); }}
          onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
            const difference = endX - touchStartX.current;
            if (Math.abs(difference) > 60) goTo(difference < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button ref={closeButtonRef} type="button" className="lightbox-close" onClick={closePhoto} aria-label="Tutup galeri">×</button>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={() => goTo(-1)} aria-label="Foto sebelumnya">‹</button>
          <div className="lightbox-photo-wrap" key={activeIndex} style={{position: "relative", width: "min(85vw, 1000px)", height: "85dvh", maxHeight: "85dvh", margin: "auto"}}>
            <Image src={photos[activeIndex].src} alt={photos[activeIndex].alt} fill sizes="85vw" className="lightbox-photo" style={{objectFit: "contain", objectPosition: "center"}} unoptimized />
          </div>
          <button type="button" className="lightbox-nav lightbox-next" onClick={() => goTo(1)} aria-label="Foto berikutnya">›</button>
          <p className="lightbox-counter">{activeIndex + 1} / {photos.length}</p>
        </div>,
        document.body
      )}
    </section>
  );
}
