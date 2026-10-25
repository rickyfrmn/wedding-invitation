"use client";
import { useGuestName } from "@/lib/useGuestName";
import { useState, type FormEvent } from "react";

type Status = "hadir" | "tidak_hadir" | "diusahakan" | "";
export default function RSVPForm() {
  const guestNameFromUrl = useGuestName();
  const [name, setName] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<Status>("");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ guestName: name ?? guestNameFromUrl, attendance, guestCount: attendance === "tidak_hadir" ? 0 : guestCount, note }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Gagal menyimpan RSVP.");
      setNotice("Terima kasih! Konfirmasi kehadiran sudah tersimpan.");
    } catch (err) { setNotice(err instanceof Error ? err.message : "Terjadi kesalahan."); }
    finally { setBusy(false); }
  }
  return <section className="rsvp-section panel-cream" id="rsvp">
    <p className="eyebrow gold-text">KONFIRMASI KEHADIRAN</p><h2 className="section-title">RSVP</h2>
    <p className="section-intro">Mohon berkenan mengonfirmasi kehadiran Anda.</p>
    <form className="form-card" onSubmit={submit}>
      <label>Nama tamu<input maxLength={80} required value={name ?? (guestNameFromUrl === "Tamu Undangan" ? "" : guestNameFromUrl)} onChange={e => setName(e.target.value)} placeholder="Nama Anda" /></label>
      <label>Konfirmasi kehadiran<select required value={attendance} onChange={e => setAttendance(e.target.value as Status)}><option value="">Pilih kehadiran</option><option value="hadir">Hadir</option><option value="tidak_hadir">Tidak hadir</option><option value="diusahakan">Masih diusahakan</option></select></label>
      {attendance !== "tidak_hadir" && <label>Jumlah tamu<select value={guestCount} onChange={e => setGuestCount(Number(e.target.value))}><option value={1}>1 orang</option><option value={2}>2 orang</option><option value={3}>3 orang</option></select></label>}
      <label>Catatan (opsional)<textarea maxLength={500} rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Pesan tambahan" /></label>
      <button className="dark-button submit" disabled={busy}>{busy ? "Mengirim..." : "Kirim Konfirmasi"}</button>
      {notice && <p role="status" className="feedback">{notice}</p>}
    </form>
  </section>;
}
