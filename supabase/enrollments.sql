-- =====================================================================
-- EliteMed — inscriptions + rôle admin
-- À exécuter une fois dans Supabase → SQL Editor
-- =====================================================================

-- 1) Administrateurs ---------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.admins enable row level security;

drop policy if exists "admins: lire sa propre ligne" on public.admins;
create policy "admins: lire sa propre ligne"
  on public.admins for select
  using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- 2) Inscriptions ------------------------------------------------------
create sequence if not exists public.enrollment_ref_seq start 421;

create table if not exists public.enrollments (
  id               uuid primary key default gen_random_uuid(),
  ref              text unique not null default (
                     'REF-EM-' || extract(year from now())::int || '-' ||
                     lpad(nextval('public.enrollment_ref_seq')::text, 4, '0')
                   ),
  user_id          uuid references auth.users(id) on delete set null,
  course_id        text not null,
  course_title     text not null,
  level_label      text not null,               -- ex. "1ère Année Médecine"
  price            integer not null check (price >= 0),
  student_name     text not null,
  student_phone    text,
  receipt_channel  text check (receipt_channel in ('whatsapp', 'telegram')),
  status           text not null default 'en_attente'
                   check (status in ('en_attente', 'confirme', 'paye', 'rejete')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists enrollments_status_idx on public.enrollments (status);

alter table public.enrollments enable row level security;

drop policy if exists "etudiants: lire leurs demandes" on public.enrollments;
create policy "etudiants: lire leurs demandes"
  on public.enrollments for select
  using (user_id = auth.uid());

drop policy if exists "etudiants: créer une demande" on public.enrollments;
create policy "etudiants: créer une demande"
  on public.enrollments for insert
  with check (user_id = auth.uid() and status = 'en_attente');

drop policy if exists "admins: tout lire" on public.enrollments;
create policy "admins: tout lire"
  on public.enrollments for select
  using (public.is_admin());

drop policy if exists "admins: modifier" on public.enrollments;
create policy "admins: modifier"
  on public.enrollments for update
  using (public.is_admin())
  with check (public.is_admin());

-- Mises à jour en direct dans le dashboard (optionnel)
alter publication supabase_realtime add table public.enrollments;

-- 3) Vous donner le rôle admin (remplacez l'e-mail) ----------------------
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'VOTRE_EMAIL@exemple.com';

-- 4) Données de démo (optionnel) — correspond à la maquette Figma ------
insert into public.enrollments
   (ref, course_id, course_title, level_label, price, student_name, student_phone, receipt_channel, status, created_at)
 values
  ('REF-EM-2026-0418','anatomie-osteologie','Anatomie & Ostéologie','1ère Année Médecine',4500,'Yasmine Benali','+213 558 541 694','whatsapp','en_attente','2026-11-26'),
  ('REF-EM-2026-0419','pharmacologie-generale','Pharmacologie Générale','3ème Année Pharmacie',5200,'Amine Khelifi','+213 551 204 881','telegram','en_attente','2026-11-26'),
  ('REF-EM-2026-0420','anatomie-dentaire','Anatomie Dentaire','1ère Année Médecine Dentaire',4500,'Douaa Mansouri','+213 770 982 314',null,'en_attente','2026-11-27'),
  ('REF-EM-2026-0416','physiologie-neuro-anatomie','Physiologie & Neuro-anatomie','2ème Année Médecine',4500,'Karim Haddad','+213 661 000 111','whatsapp','confirme','2026-11-25'),
  ('REF-EM-2026-0415','chimie-biologie','Chimie & Biologie','1ère Année Pharmacie',4500,'Sara Messaoud','+213 550 222 333','telegram','paye','2026-11-24');
