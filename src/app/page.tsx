
"use client";

import Image from "next/image";
import "./animations.css";
import "./gallery-lightbox.css";

import { useEffect, useRef, useState } from "react";

import MusicPlayer, {
  type MusicPlayerHandle,
} from "@/components/MusicPlayer";

import Cover from "@/components/Cover";
import OpeningSection from "@/components/OpeningSection";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import RSVPForm from "@/components/RSVPForm";
import Wishes from "@/components/Wishes";
import { wedding } from "@/data/wedding";

// Menghitung waktu menuju pernikahan
function timeLeft(): number[] {
  const diff = Math.max(
    0,
    new Date(wedding.dateISO).getTime() - Date.now()
  );

  return [
    Math.floor(diff / 86400000),
    Math.floor((diff / 3600000) % 24),
    Math.floor((diff / 60000) % 60),
    Math.floor((diff / 1000) % 60),
  ];
}

// Dekorasi pembatas section
function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider-line" />
      <span className="section-divider-mark">❦</span>
      <span className="section-divider-line" />
    </div>
  );
}

// Foto dan identitas masing-masing mempelai
function CoupleProfile({
  image,
  name,
  parents,
  position,
}: {
  image: string;
  name: string;
  parents: string;
  position: "groom" | "bride";
}) {
  return (
    <article className="couple-person">
      <div className={`couple-photo couple-photo-${position}`}>
        <Image
          src={image}
          alt={`Foto ${name}`}
          fill
          sizes="(max-width: 700px) 260px, 300px"
          className={`couple-photo-img ${position}-img`}
        />
      </div>

      <div className="symbol couple-symbol">❧</div>

      <h3>{name}</h3>
      <p>{parents}</p>
    </article>
  );
}

export default function Home() {
  const musicRef = useRef<MusicPlayerHandle>(null);

  const [opened, setOpened] = useState(false);
  const [countdown, setCountdown] = useState<number[] | null>(
    null
  );

  useEffect(() => {
    const update = () => setCountdown(timeLeft());

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="invitation">
      <MusicPlayer ref={musicRef} opened={opened} />

      {!opened ? (
        <Cover
          onStartMusic={() => musicRef.current?.play()}
          onOpen={() => {
            setOpened(true);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      ) : (
        <>
          {/* HALAMAN PEMBUKA */}
          <OpeningSection />

          {/* KEDUA MEMPELAI */}
          <Reveal>
            <section
              className="couple-section panel-cream ornate-section ornate-section-cream"
              id="couple"
            >
              <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
              <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
              <div className="orn-side-branch orn-side-left" aria-hidden="true" />
              <div className="orn-side-branch orn-side-right" aria-hidden="true" />

              {/* QS. AR-RUM AYAT 21 */}
              <div className="quran-verse">
                <div
                  className="quran-decoration"
                  aria-hidden="true"
                >
                  ❦
                </div>

                <p
                  className="quran-arabic"
                  lang="ar"
                  dir="rtl"
                >
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ
                  أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا
                  إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً
                  وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ
                  لِقَوْمٍ يَتَفَكَّرُونَ
                </p>

                <p className="quran-translation">
                  &ldquo;Dan di antara tanda-tanda
                  (kebesaran)-Nya ialah Dia menciptakan
                  pasangan-pasangan untukmu dari jenismu
                  sendiri, agar kamu cenderung dan merasa
                  tenteram kepadanya, dan Dia menjadikan di
                  antaramu rasa kasih dan sayang. Sungguh,
                  pada yang demikian itu benar-benar terdapat
                  tanda-tanda (kebesaran Allah) bagi kaum
                  yang berpikir.&rdquo;
                </p>

                <p className="quran-reference">
                  QS. Ar-Rum: 21
                </p>
              </div>

              <p className="eyebrow gold-text">
                DUA HATI, SATU JANJI
              </p>

              <h2 className="section-title">
                Kedua Mempelai
              </h2>

              <SectionDivider />


              {/* FOTO DAN PROFIL MEMPELAI */}
              <div className="couple-people">
                <CoupleProfile
                  image="/images/nazil.webp"
                  name={wedding.groomFull}
                  parents={wedding.groomParents}
                  position="groom"
                />

                <div
                  className="couple-ampersand"
                  aria-hidden="true"
                >
                  &
                </div>

                <CoupleProfile
                  image="/images/tiara.webp"
                  name={wedding.brideFull}
                  parents={wedding.brideParents}
                  position="bride"
                />
              </div>
            </section>
          </Reveal>

          {/* FOTO PREWEDDING */}
          <Reveal>
            <section className="photo-interlude">
              <Image
                src="/images/romantic.webp"
                alt="Nazil dan Tiara bergandengan tangan"
                fill
                sizes="100vw"
                className="interlude-photo"
              />

              <div className="photo-gradient" />

              <div className="interlude-words">
                {/* <span>OUR STORY</span> */}
              </div>
            </section>
          </Reveal>

          

          {/* AKAD NIKAH */}
          <Reveal>
            <section
              className="event-section panel-cream ornate-section ornate-section-cream"
              id="acara"
            >
              <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
              <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
              <div className="orn-corner orn-corner-bottom-left" aria-hidden="true" />
              <div className="orn-corner orn-corner-bottom-right" aria-hidden="true" />

              <p className="eyebrow gold-text">
                WEDDING EVENTS
              </p>

              <h2 className="section-title">
                Rangkaian Acara
              </h2>

              <SectionDivider />

              <div className="event-grid">
                <article className="event-card">
                  <div className="symbol">❦</div>

                  <h3>{wedding.akad.title}</h3>

                  <p>{wedding.dateLabel}</p>

                  <strong>{wedding.akad.time}</strong>

                  <p>{wedding.akad.location}</p>
                  <p>{wedding.akad.address}</p>
                </article>
              </div>

              <a
                href={wedding.mapsUrl}
                className="dark-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Lokasi di Google Maps ↗
              </a>
            </section>
          </Reveal>

          {/* GALERI */}
          <Reveal>
            <GalleryLightbox />
          </Reveal>

          {/* COUNTDOWN */}
          <Reveal>
            <section className="countdown-section panel-dark ornate-section ornate-section-dark">
              <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
              <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
              <div className="orn-gunungan-watermark orn-gunungan-left" aria-hidden="true" />
              <div className="orn-gunungan-watermark orn-gunungan-right" aria-hidden="true" />

              <p className="eyebrow gold-text">
                SAVE THE DATE
              </p>

              <h2 className="section-title">
                Menuju Hari Bahagia
              </h2>

              <SectionDivider />

              <div className="countdown-grid">
                {["Hari", "Jam", "Menit", "Detik"].map(
                  (label, i) => (
                    <div
                      className="count-box"
                      key={label}
                    >
                      <b>
                        {String(
                          countdown?.[i] ?? 0
                        ).padStart(2, "0")}
                      </b>

                      <span>{label}</span>
                    </div>
                  )
                )}
              </div>
            </section>
          </Reveal>

          {/* KONFIRMASI KEHADIRAN */}
          <Reveal>
            <RSVPForm />
          </Reveal>

          {/* UCAPAN DAN DOA */}
          <Reveal>
            <Wishes />
          </Reveal>

          {/* PENUTUP */}
          <Reveal>
            <section className="closing-section panel-cream ornamental-closing ornate-section ornate-section-cream">
              <div className="orn-corner orn-corner-top-left" aria-hidden="true" />
              <div className="orn-corner orn-corner-top-right" aria-hidden="true" />
              <div
                className="ornamental-closing-gunungan"
                aria-hidden="true"
              />

              <SectionDivider />

              <h2>Terima Kasih</h2>

              <p>
                Merupakan kehormatan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir dan
                memberikan doa restu.
              </p>

              <h3>
                {wedding.groom}
                <em> &amp; </em>
                {wedding.bride}
              </h3>
            </section>
          </Reveal>
        </>
      )}
    </main>
  );
}
