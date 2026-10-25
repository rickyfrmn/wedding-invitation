"use client";
import Image from "next/image";
import "./animations.css";
import "./gallery-lightbox.css";
import { useEffect, useRef, useState } from "react";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/MusicPlayer";
import Cover from "@/components/Cover";
import OpeningSection from "@/components/OpeningSection";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import { wedding } from "@/data/wedding";
import RSVPForm from "@/components/RSVPForm";
import Wishes from "@/components/Wishes";

function timeLeft(): number[] {
 const diff=Math.max(0,new Date(wedding.dateISO).getTime()-Date.now());
 return [Math.floor(diff/86400000),Math.floor((diff/3600000)%24),Math.floor((diff/60000)%60),Math.floor((diff/1000)%60)];
}
export default function Home(){
 const musicRef = useRef<MusicPlayerHandle>(null);
 const [opened,setOpened]=useState(false);const [countdown,setCountdown]=useState<number[]|null>(null);
 useEffect(()=>{const update=()=>setCountdown(timeLeft());const timer=window.setInterval(update,1000);return ()=>window.clearInterval(timer);},[]);
 return <main className="invitation">
 <MusicPlayer ref={musicRef} opened={opened} />
 {!opened ? (
   <Cover onStartMusic={() => musicRef.current?.play()} onOpen={() => { setOpened(true); window.scrollTo({ top: 0, behavior: "instant" }); }} />
 ) : <>
  <OpeningSection />
  <Reveal><section className="couple-section panel-cream ornate-section ornate-section-cream" id="couple"><div className="orn-corner orn-corner-top-left" aria-hidden="true" /><div className="orn-corner orn-corner-top-right" aria-hidden="true" /><div className="orn-side-branch orn-side-left" aria-hidden="true" /><div className="orn-side-branch orn-side-right" aria-hidden="true" /><p className="eyebrow gold-text">DUA HATI, SATU JANJI</p><h2 className="section-title">Kedua Mempelai</h2><div className="section-divider" aria-hidden="true"><span className="section-divider-line" /><span className="section-divider-mark">❦</span><span className="section-divider-line" /></div><div className="symbol">❧</div><h3>{wedding.groomFull}</h3><p>{wedding.groomParents}</p><div className="ampersand">&amp;</div><h3>{wedding.brideFull}</h3><p>{wedding.brideParents}</p></section></Reveal>
  <Reveal><section className="photo-interlude"><Image src="/images/romantic.webp" alt="Nazil dan Tiara bergandengan tangan" fill sizes="100vw"/><div className="photo-gradient"/><div className="interlude-words"><span>OUR STORY</span><h2>Berjalan Bersama,<br/>Selamanya</h2></div></section></Reveal>
  <Reveal><section className="countdown-section panel-dark ornate-section ornate-section-dark"><div className="orn-corner orn-corner-top-left" aria-hidden="true" /><div className="orn-corner orn-corner-top-right" aria-hidden="true" /><div className="orn-gunungan-watermark orn-gunungan-left" aria-hidden="true" /><div className="orn-gunungan-watermark orn-gunungan-right" aria-hidden="true" /><p className="eyebrow gold-text">SAVE THE DATE</p><h2 className="section-title">Menuju Hari Bahagia</h2><div className="section-divider" aria-hidden="true"><span className="section-divider-line" /><span className="section-divider-mark">✦</span><span className="section-divider-line" /></div><div className="countdown-grid">{["Hari","Jam","Menit","Detik"].map((label,i)=><div className="count-box" key={label}><b>{String(countdown?.[i]??0).padStart(2,"0")}</b><span>{label}</span></div>)}</div></section></Reveal>
  <Reveal><section className="event-section panel-cream ornate-section ornate-section-cream" id="acara"><div className="orn-corner orn-corner-top-left" aria-hidden="true" /><div className="orn-corner orn-corner-top-right" aria-hidden="true" /><div className="orn-corner orn-corner-bottom-left" aria-hidden="true" /><div className="orn-corner orn-corner-bottom-right" aria-hidden="true" /><p className="eyebrow gold-text">WEDDING EVENTS</p><h2 className="section-title">Rangkaian Acara</h2><div className="section-divider" aria-hidden="true"><span className="section-divider-line" /><span className="section-divider-mark">❦</span><span className="section-divider-line" /></div><div className="event-grid">{[wedding.akad].map(event=><article className="event-card" key={event.title}><div className="symbol">❦</div><h3>{event.title}</h3><p>{wedding.dateLabel}</p><strong>{event.time}</strong><p>{event.location}</p><p>{event.address}</p></article>)}</div><a href={wedding.mapsUrl} className="dark-button" target="_blank" rel="noopener noreferrer">Lihat Lokasi di Google Maps ↗</a></section></Reveal>
  <Reveal><GalleryLightbox /></Reveal>
  <Reveal><RSVPForm/></Reveal><Reveal><Wishes/></Reveal>
  <Reveal><section className="closing-section panel-cream ornamental-closing ornate-section ornate-section-cream"><div className="orn-corner orn-corner-top-left" aria-hidden="true" /><div className="orn-corner orn-corner-top-right" aria-hidden="true" /><div className="ornamental-closing-gunungan" aria-hidden="true" /><div className="section-divider" aria-hidden="true"><span className="section-divider-line" /><span className="section-divider-mark">❦</span><span className="section-divider-line" /></div><h2>Terima Kasih</h2><p>Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p><h3>{wedding.groom} <em>&amp;</em> {wedding.bride}</h3></section></Reveal>
 </>}
 </main>
}
