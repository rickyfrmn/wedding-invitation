
import { wedding } from "@/data/wedding";

export default function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-[#F5EBDC] px-6 py-20 text-center">
      <p className="text-sm tracking-[0.3em] uppercase">
        The Wedding Celebration
      </p>

      <div className="my-8 text-4xl text-[#B59457]">
        ❦
      </div>

      <h1 className="font-serif text-6xl leading-tight text-[#38251F]">
        {wedding.groom.name}
        <span className="block text-[#B59457]">&</span>
        {wedding.bride.name}
      </h1>

      <p className="mt-8 text-lg text-[#754B40]">
        {wedding.dateLabel}
      </p>

      <p className="mx-auto mt-10 max-w-sm leading-relaxed">
        Dengan penuh rasa syukur dan kebahagiaan,
        kami mengundang Bapak/Ibu/Saudara/i untuk
        hadir pada hari pernikahan kami.
      </p>
    </section>
  );
}
