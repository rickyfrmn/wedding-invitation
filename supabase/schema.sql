-- Jalankan di Supabase > SQL Editor. Hindari menjalankan berulang kali tanpa review.
create table if not exists public.rsvp (
 id uuid primary key default gen_random_uuid(),
 guest_name text not null check (char_length(guest_name) between 1 and 80),
 attendance text not null check (attendance in ('hadir','tidak_hadir','diusahakan')),
 guest_count integer not null default 1 check (guest_count between 0 and 3),
 note text not null default '' check (char_length(note) <= 500),
 created_at timestamptz not null default now()
);
create table if not exists public.wishes (
 id uuid primary key default gen_random_uuid(),
 guest_name text not null check (char_length(guest_name) between 1 and 80),
 message text not null check (char_length(message) between 3 and 1000),
 is_visible boolean not null default true,
 created_at timestamptz not null default now()
);
create index if not exists wishes_created_at_idx on public.wishes (created_at desc);
alter table public.rsvp enable row level security;
alter table public.wishes enable row level security;
-- Tidak ada policy untuk anon/authenticated: hanya backend server dengan secret key.
revoke all on public.rsvp from anon, authenticated;
revoke all on public.wishes from anon, authenticated;
grant all on public.rsvp to service_role;
grant all on public.wishes to service_role;
