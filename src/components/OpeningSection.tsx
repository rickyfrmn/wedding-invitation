import Image from "next/image";
import { wedding } from "@/data/wedding";

export default function OpeningSection() {
  return (
    <section className="opening-animated relative isolate overflow-hidden bg-[#211b19] text-[#f9f0e3]" aria-label="Pembuka undangan">
      {/* Latar foto lembut untuk menyatukan komposisi desktop. */}
      <div className="absolute inset-0 -z-20">
        <Image src="/images/romantic.webp" alt="" fill sizes="100vw" className="object-cover opacity-20 blur-[3px]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#211b19]/85 via-[#211b19]/85 to-[#211b19]" />
      <div className="pointer-events-none absolute inset-5 border border-[#c6a56a]/35 md:inset-8" aria-hidden="true" />

      <div className="mx-auto grid min-h-[85svh] max-w-6xl items-center gap-12 px-8 py-24 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="opening-copy text-center md:text-left">
          <div className="mb-5 text-4xl text-[#c6a56a]" aria-hidden="true">❦</div>
          <p className="text-xs font-bold tracking-[0.35em] text-[#c6a56a]">THE WEDDING OF</p>
          <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            {wedding.groom} <span className="text-[#c6a56a]">&amp;</span> {wedding.bride}
          </h2>
          <div className="mx-auto my-7 h-px w-28 bg-[#c6a56a] md:mx-0" />
          <p className="mx-auto max-w-md text-base leading-8 text-[#f9f0e3]/90 md:mx-0">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu di hari bahagia kami.
          </p>
          <p className="mt-7 font-serif text-lg tracking-wide text-[#e5c894]">{wedding.dateLabel}</p>
          <a href="#couple" className="mt-9 inline-block rounded-full border border-[#c6a56a] px-7 py-3 text-sm text-[#e5c894] transition hover:bg-[#c6a56a] hover:text-[#211b19]">
            Lihat Undangan ↓
          </a>
        </div>

        <div className="opening-photo relative mx-auto w-full max-w-[390px]">
          <div className="absolute -inset-3 rounded-t-[12rem] rounded-b-xl border border-[#c6a56a]/65" aria-hidden="true" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[11rem] rounded-b-lg shadow-2xl shadow-black/40">
            <Image src="/images/gallery.webp" alt="Nazil Romadhoni dan Tiara Faika Suci mengenakan busana tradisional Jawa" fill sizes="(max-width: 768px) 85vw, 390px" className="object-cover object-[center_38%]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
          <p className="mt-7 text-center font-serif text-sm tracking-[0.2em] text-[#c6a56a]">BERSAMA DALAM SATU JANJI</p>
        </div>
      </div>
    </section>
  );
}
