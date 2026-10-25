
import { wedding } from "@/data/wedding";

export default function EventDetails() {
  const events = [
    { title: "Akad Nikah", ...wedding.akad },
    { title: "Resepsi", ...wedding.resepsi },
  ];

  return (
    <section className="bg-[#38251F] px-6 py-20 text-center text-[#F5EBDC]">
      <h2 className="font-serif text-4xl text-[#B59457]">
        Rangkaian Acara
      </h2>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {events.map((event) => (
          <article
            key={event.title}
            className="rounded-t-[5rem] border border-[#B59457] p-8"
          >
            <h3 className="font-serif text-3xl text-[#B59457]">
              {event.title}
            </h3>

            <p className="mt-6">{wedding.dateLabel}</p>
            <p className="mt-3 font-semibold">{event.time}</p>
            <p className="mt-6">{event.place}</p>
            <p className="mt-2 text-sm">{event.address}</p>

            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-[#B59457] px-6 py-3 text-sm font-semibold text-[#38251F]"
            >
              Lihat Lokasi
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
