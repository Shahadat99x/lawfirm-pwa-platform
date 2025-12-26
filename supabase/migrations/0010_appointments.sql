-- Create appointments table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  practice_area_slug text,
  message text,
  gdpr_consent boolean not null default false,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes int not null default 30,
  status text not null default 'requested', -- requested, approved, rejected, cancelled
  admin_notes text,
  rejection_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Partial unique index to prevent double-booking for active slots
create unique index if not exists appointments_unique_slot_active
on public.appointments (appointment_date, appointment_time)
where status in ('requested', 'approved');

-- Enable RLS
alter table public.appointments enable row level security;

-- Policies
-- Authenticated users (admin) can read all
create policy "auth can read appointments" on public.appointments
for select to authenticated using (true);

-- Authenticated users (admin) can update all
create policy "auth can update appointments" on public.appointments
for update to authenticated using (true) with check (true);

-- No public insert policy (handled via service role in API)
