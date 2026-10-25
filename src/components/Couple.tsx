
import { wedding } from "@/data/wedding";

export default function Couple() {
  return (
    <section className="bg-[#38251F] px-6 py-20 text-center text-[#F5EBDC]">
      <p className="text-sm tracking-[0.3em] text-[#B59457]">
        THE HAPPY COUPLE
      </p>

      <h2 className="mt-4 font-serif text-4xl">
        Kedua Mempelai
      </h2>

      <div className="mx-auto mt-12 max-w-md">
        <h3 className="font-serif text-4xl text-[#B59457]">
          {wedding.groom.fullName}
        </h3>
        <p className="mt-3 text-sm leading-relaxed">
          {wedding.groom.parents}
        </p>

        <p className="my-12 font-serif text-5xl text-[#B59457]">
          &
        </p>

        <h3 className="font-serif text-4xl text-[#B59457]">
          {wedding.bride.fullName}
        </h3>
        <p className="mt-3 text-sm leading-relaxed">
          {wedding.bride.parents}
        </p>
      </div>
    </section>
  );
}
