import Image from "next/image";
import { wedding } from "@/data/wedding";

export default function OpeningSection() {
  return (
    <section
      className="opening-animated relative isolate overflow-hidden bg-[#211b19] text-[#f9f0e3]"
      aria-label="Pembuka undangan"
    >
      {/* Background foto samar */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/romantic.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-[3px]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#211b19]/85 via-[#211b19]/85 to-[#211b19]" />

      {/* Garis bingkai section */}
      <div
        className="pointer-events-none absolute inset-5 border border-[#c6a56a]/35 md:inset-8"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid min-h-[85svh] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12">
        {/* Teks kiri desktop / atas mobile */}
        <div className="opening-copy min-w-0 text-center md:text-left">
          <div className="mb-5 text-4xl text-[#c6a56a]" aria-hidden="true">
            ❦
          </div>

          <p className="text-[11px] font-bold tracking-[0.3em] text-[#c6a56a] sm:text-xs">
            THE WEDDING OF
          </p>

          <h2 className="opening-couple-name mt-5 font-serif font-normal text-[#f9f0e3]">
            {wedding.groom}
            <span className="text-[#c6a56a]"> &amp; </span>
            {wedding.bride}
          </h2>

          <div className="mx-auto my-7 h-px w-28 bg-[#c6a56a] md:mx-0" />

          <p className="mx-auto max-w-md text-[14px] leading-7 text-[#f9f0e3]/90 sm:text-base sm:leading-8 md:mx-0">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu
            di hari bahagia kami.
          </p>

          <p className="mt-7 font-serif text-base tracking-wide text-[#e5c894] sm:text-lg">
            {wedding.dateLabel}
          </p>

          <a
            href="#couple"
            className="mt-9 inline-block rounded-full border border-[#c6a56a] px-7 py-3 text-sm text-[#e5c894] transition-colors duration-300 hover:bg-[#c6a56a] hover:text-[#211b19]"
          >
            Lihat Undangan ↓
          </a>
        </div>

        {/* Foto dan bunga: satu container berukuran pasti */}
        <div className="opening-photo-frame">
          <div className="opening-photo-border" aria-hidden="true" />

          <div className="opening-photo-inner">
            <Image
              src="/images/gallery.webp"
              alt="Nazil Romadhoni dan Tiara Faika Suci mengenakan busana tradisional Jawa"
              fill
              sizes="(max-width: 767px) 76vw, (max-width: 1024px) 40vw, 390px"
              className="opening-photo-image"
            />
            <div className="opening-photo-gradient" aria-hidden="true" />
          </div>

          <Image
            src="/ornaments/floral-side-accent.png"
            alt=""
            aria-hidden="true"
            width={200}
            height={200}
            className="opening-flower opening-flower-top"
          />
          <Image
            src="/ornaments/floral-side-accent.png"
            alt=""
            aria-hidden="true"
            width={200}
            height={200}
            className="opening-flower opening-flower-bottom"
          />
        </div>
      </div>
    </section>
  );
}
