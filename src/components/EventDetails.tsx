
import { wedding } from "@/data/wedding";

export default function EventDetails() {
  const events = [wedding.akad];

  return (
    <section className="event-section panel-cream" id="acara">
      <p className="eyebrow gold-text">
        WEDDING EVENTS
      </p>

      <h2 className="section-title">
        Rangkaian Acara
      </h2>

      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.title}>
            <div className="symbol">❦</div>

            <h3>{event.title}</h3>

            <p>{wedding.dateLabel}</p>

            <strong>{event.time}</strong>

            <p>{event.location}</p>
            <p>{event.address}</p>
          </article>
        ))}
      </div>

      <a
        href={wedding.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="dark-button"
      >
        Lihat Lokasi di Google Maps ↗
      </a>
    </section>
  );
}
