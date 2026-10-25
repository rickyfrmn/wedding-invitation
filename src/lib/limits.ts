// Pembatasan sederhana per proses. Pada serverless produksi tambahkan rate limiter persisten
// (mis. Upstash Redis / Cloudflare Turnstile), karena instance dapat bertambah/restart.
const calls = new Map<string, { count: number; reset: number }>();
export function allowRequest(request: Request) {
 const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
 const now=Date.now();const previous=calls.get(ip);
 if(!previous||previous.reset<now){calls.set(ip,{count:1,reset:now+60_000});return true;}
 if(previous.count>=6)return false;
 previous.count++;return true;
}
export function cleanText(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):"";}
