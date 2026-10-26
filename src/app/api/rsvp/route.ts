import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { allowRequest, cleanText } from "@/lib/limits";
export async function POST(request: Request) {
 try {
  if(!allowRequest(request))return NextResponse.json({error:"Terlalu banyak permintaan. Coba lagi nanti."},{status:429});
  const data=await request.json();const guest_name=cleanText(data.guestName,80);
  const attendance=data.attendance;
  const guest_count=attendance==="tidak_hadir"?0:Number(data.guestCount);
  const note=cleanText(data.note,500);
  if(!guest_name||!(["hadir","tidak_hadir","diusahakan"].includes(attendance))||!Number.isInteger(guest_count)||guest_count<0||guest_count>3||(attendance!=="tidak_hadir"&&guest_count<1))return NextResponse.json({error:"Periksa kembali data RSVP."},{status:400});
  const {error}=await db().from("rsvps").insert({guest_name,attendance,guest_count,note});
  if(error)throw error;
  return NextResponse.json({success:true});
 }catch(error){console.error("RSVP error",error);return NextResponse.json({error:"Penyimpanan belum tersedia. Periksa konfigurasi Supabase di server."},{status:500});}
}
