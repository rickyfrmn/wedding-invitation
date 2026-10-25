
"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

function getRemainingTime() {
  const distance = Math.max(
    0,
    new Date(wedding.dateISO).getTime() - Date.now()
  );

  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<
    typeof getRemainingTime
  > | null>(null);

  useEffect(() => {
    const update = () => setTime(getRemainingTime());
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "Hari", value: time?.days ?? 0 },
    { label: "Jam", value: time?.hours ?? 0 },
    { label: "Menit", value: time?.minutes ?? 0 },
    { label: "Detik", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="bg-[#F5EBDC] px-4 py-20 text-center">
      <h2 className="font-serif text-4xl text-[#38251F]">
        Menuju Hari Bahagia
      </h2>

      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-lg bg-[#38251F] px-2 py-5 text-[#F5EBDC]"
          >
            <p className="font-serif text-2xl sm:text-4xl">
              {String(unit.value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs">{unit.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
