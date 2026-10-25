"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/images/cover.webp", alt: "Nazil dan Tiara berfoto bersama" },
  { src: "/images/romantic.webp", alt: "Nazil dan Tiara berjalan bergandengan" },
  { src: "/images/gallery.webp", alt: "Nazil dan Tiara memberi salam" },
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
  function closePhoto() {
    setActiveIndex(null);
  }
  function goTo(offset: number) {
    setActiveIndex((current) => current === null ? null : (current + offset + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLButtonElement>(".lightbox-overlay button");
        const buttons = Array.from(focusable);
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
    <section className="gallery-section panel-dark ornate-section ornate-section-dark" id="galeri">
      <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
      <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
      <div className="orn-gunungan-watermark orn-gunungan-left" aria-hidden="true" />
      <div className="orn-gunungan-watermark orn-gunungan-right" aria-hidden="true" />
      <p className="eyebrow gold-text">OUR MOMENT</p>
      <h2 className="section-title">Galeri Kami</h2>
      <div className="section-divider" aria-hidden="true"><span className="section-divider-line" /><span className="section-divider-mark">✦</span><span className="section-divider-line" /></div>
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
      {open && activeIndex !== null && (
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
          <div className="lightbox-photo-wrap" key={activeIndex}>
            <Image src={photos[activeIndex].src} alt={photos[activeIndex].alt} fill sizes="100vw" className="lightbox-photo" priority />
          </div>
          <button type="button" className="lightbox-nav lightbox-next" onClick={() => goTo(1)} aria-label="Foto berikutnya">›</button>
          <p className="lightbox-counter">{activeIndex + 1} / {photos.length}</p>
        </div>
      )}
    </section>
  );
}
