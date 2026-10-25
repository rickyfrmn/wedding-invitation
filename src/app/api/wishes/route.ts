import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { allowRequest, cleanText } from "@/lib/limits";
export async function GET() {
 try {
  const {data,error}=await db().from("wishes").select("id,guest_name,message,created_at").eq("is_visible",true).order("created_at",{ascending:false}).limit(100);
  if(error)throw error;return NextResponse.json({items:data||[]},{headers:{"Cache-Control":"no-store"}});
 } catch(error){console.error("Read wishes error",error);return NextResponse.json({items:[],error:"Ucapan belum tersedia"},{status:503});}
}
export async function POST(request: Request) {
 try {
  if(!allowRequest(request))return NextResponse.json({error:"Terlalu banyak permintaan. Coba lagi nanti."},{status:429});
  const data=await request.json();const guest_name=cleanText(data.guestName,80);const message=cleanText(data.message,1000);
  if(!guest_name||message.length<3)return NextResponse.json({error:"Nama dan ucapan minimal 3 karakter wajib diisi."},{status:400});
  const {error}=await db().from("wishes").insert({guest_name,message,is_visible:true});if(error)throw error;
  return NextResponse.json({success:true});
 }catch(error){console.error("Insert wishes error",error);return NextResponse.json({error:"Gagal menyimpan ucapan. Periksa konfigurasi Supabase."},{status:500});}
}
