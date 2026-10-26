
import Image from "next/image";
import { wedding } from "@/data/wedding";

export default function OpeningSection() {
  return (
    <section
      className="opening-animated relative isolate overflow-hidden bg-[#211b19] text-[#f9f0e3]"
      aria-label="Pembuka undangan"
    >
      {/* BACKGROUND FOTO */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/romantic.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-[3px]"
        />
      </div>

      {/* GRADIENT GELAP */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#211b19]/85 via-[#211b19]/85 to-[#211b19]" />

      {/* BORDER EMAS */}
      <div
        className="pointer-events-none absolute inset-5 border border-[#c6a56a]/35 md:inset-8"
        aria-hidden="true"
      />

      {/* ORNAMEN */}
      <div
        className="ornamental-opening-bloom"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[85svh] max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">

        {/* BAGIAN TEKS */}
        <div className="opening-copy min-w-0 text-center md:text-left">

          <div
            className="mb-5 text-4xl text-[#c6a56a]"
            aria-hidden="true"
          >
            ❦
          </div>

          <p className="text-[11px] font-bold tracking-[0.3em] text-[#c6a56a] sm:text-xs">
            THE WEDDING OF
          </p>

          {/* NAMA MEMPELAI */}
          <h2 className="opening-couple-name mt-5 font-serif font-normal text-[#f9f0e3]">
            {wedding.groom}
            <span className="text-[#c6a56a]">
              {" "}&amp;{" "}
            </span>
            {wedding.bride}
          </h2>

          {/* GARIS PEMBATAS */}
          <div className="mx-auto my-7 h-px w-28 bg-[#c6a56a] md:mx-0" />

          {/* SAMBUTAN */}
          <p className="mx-auto max-w-md text-[14px] leading-7 text-[#f9f0e3]/90 sm:text-base sm:leading-8 md:mx-0">
            Dengan memohon rahmat dan ridho Allah SWT,
            kami mengundang Bapak/Ibu/Saudara/i untuk
            hadir dan memberikan doa restu di hari
            bahagia kami.
          </p>

          {/* TANGGAL */}
          <p className="mt-7 font-serif text-base tracking-wide text-[#e5c894] sm:text-lg">
            {wedding.dateLabel}
          </p>

          {/* TOMBOL */}
          <a
            href="#couple"
            className="mt-9 inline-block rounded-full border border-[#c6a56a] px-7 py-3 text-sm text-[#e5c894] transition hover:bg-[#c6a56a] hover:text-[#211b19]"
          >
            Lihat Undangan ↓
          </a>
        </div>

        {/* FOTO PASANGAN */}
        <div className="opening-photo relative mx-auto w-full max-w-[390px]">

          <div
            className="absolute -inset-3 rounded-t-[12rem] rounded-b-xl border border-[#c6a56a]/65"
            aria-hidden="true"
          />

          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[11rem] rounded-b-lg shadow-2xl shadow-black/40">
            <Image
              src="/images/gallery.webp"
              alt="Nazzil Romadhoni dan Tiara Faikha Suci mengenakan busana tradisional Jawa"
              fill
              sizes="(max-width: 768px) 85vw, 390px"
              className="object-cover object-[center_38%]"
            />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
