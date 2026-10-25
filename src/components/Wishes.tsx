"use client";
import { useGuestName } from "@/lib/useGuestName";
import { useCallback, useEffect, useState, type FormEvent } from "react";
type Wish = { id: string; guest_name: string; message: string; created_at: string };
export default function Wishes() {
 const guestNameFromUrl = useGuestName();
 const [name,setName]=useState<string | null>(null); const [message,setMessage]=useState("");
 const [items,setItems]=useState<Wish[]>([]); const [page,setPage]=useState(0);
 const [busy,setBusy]=useState(false); const [notice,setNotice]=useState("");
 const load = useCallback(async () => { try { const r=await fetch("/api/wishes",{cache:"no-store"}); if (!r.ok) return; const d=await r.json(); setItems(d.items || []); } catch { /* website tetap bisa dilihat tanpa database */ } },[]);
 useEffect(() => {
   let active = true;
   void Promise.resolve().then(() => { if (active) return load(); });
   return () => { active = false; };
 }, [load]);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setNotice("");try{const r=await fetch("/api/wishes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({guestName:name ?? guestNameFromUrl,message})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Gagal mengirim ucapan.");setMessage("");setPage(0);setNotice("Ucapan berhasil dikirim. Terima kasih atas doanya!");await load();}catch(err){setNotice(err instanceof Error?err.message:"Terjadi kesalahan.");}finally{setBusy(false)}}
 const shown=items.slice(page*5,page*5+5); const pageCount=Math.max(1,Math.ceil(items.length/5));
 return <section className="wishes-section panel-dark" id="wishes">
 <p className="eyebrow gold-text">DOA DAN HARAPAN</p><h2 className="section-title">Ucapan & Doa</h2>
 <p className="section-intro">Tuliskan doa terbaik untuk perjalanan kami.</p>
 <div className="wish-board"><form className="wish-form" onSubmit={submit}>
 <label>Nama<input required maxLength={80} value={name ?? (guestNameFromUrl === "Tamu Undangan" ? "" : guestNameFromUrl)} onChange={e=>setName(e.target.value)} placeholder="Nama Anda" /></label>
 <label>Ucapan<textarea required minLength={3} maxLength={1000} rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tulis doa dan harapan..." /></label>
 <button disabled={busy} className="dark-button submit">{busy?"Mengirim...":"Kirim Ucapan"}</button>
 {notice&&<p className="feedback" role="status">{notice}</p>}
 </form><div className="wish-list">{shown.length?shown.map(w=><article className="wish-item" key={w.id}><div className="wish-avatar">♥</div><div><strong>{w.guest_name}</strong><p>{w.message}</p><small>{new Date(w.created_at).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</small></div></article>):<p className="empty-wishes">Belum ada ucapan. Jadilah yang pertama mengirim doa ♡</p>}</div>
 {pageCount>1&&<div className="pagination"><button disabled={page===0} onClick={()=>setPage(n=>n-1)}>← Sebelumnya</button><span>{page+1} / {pageCount}</span><button disabled={page>=pageCount-1} onClick={()=>setPage(n=>n+1)}>Berikutnya →</button></div>}</div>
 </section>;
}
