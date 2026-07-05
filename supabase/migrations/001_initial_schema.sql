-- CHMS Support Desk — initial schema, RLS, and profile trigger
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.user_role as enum ('requester', 'agent');

create type public.ticket_status as enum (
  'open',
  'in_progress',
  'resolved',
  'closed'
);

create type public.ticket_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

create type public.ticket_category as enum (
  'hardware',
  'software',
  'access',
  'other'
);

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.user_role not null default 'requester',
  created_at timestamptz not null default now()
);

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles (id) on delete restrict,
  assignee_id uuid references public.profiles (id) on delete set null,
  title text not null check (char_length(trim(title)) > 0),
  description text not null check (char_length(trim(description)) > 0),
  category public.ticket_category not null default 'other',
  priority public.ticket_priority not null default 'medium',
  status public.ticket_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete restrict,
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index tickets_requester_id_idx on public.tickets (requester_id);
create index tickets_assignee_id_idx on public.tickets (assignee_id);
create index tickets_status_idx on public.tickets (status);
create index tickets_created_at_idx on public.tickets (created_at desc);
create index comments_ticket_id_idx on public.comments (ticket_id);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_set_updated_at
  before update on public.tickets
  for each row
  execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'requester'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS helper functions
-- ---------------------------------------------------------------------------

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_agent()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'agent'
$$;

create or replace function public.can_view_ticket(ticket_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tickets t
    where t.id = ticket_id
      and (t.requester_id = auth.uid() or public.is_agent())
  )
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.tickets enable row level security;
alter table public.comments enable row level security;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "Agents can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_agent());

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
as $$
begin
  if old.role is distinct from new.role then
    raise exception 'Role cannot be changed through the application';
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_change();

-- tickets
create policy "Requesters can view own tickets"
  on public.tickets for select
  to authenticated
  using (requester_id = auth.uid());

create policy "Agents can view all tickets"
  on public.tickets for select
  to authenticated
  using (public.is_agent());

create policy "Authenticated users can create tickets"
  on public.tickets for insert
  to authenticated
  with check (requester_id = auth.uid());

create policy "Agents can update tickets"
  on public.tickets for update
  to authenticated
  using (public.is_agent())
  with check (public.is_agent());

-- comments
create policy "Users can view comments on visible tickets"
  on public.comments for select
  to authenticated
  using (public.can_view_ticket(ticket_id));

create policy "Users can comment on visible tickets"
  on public.comments for insert
  to authenticated
  with check (
    author_id = auth.uid()
    and public.can_view_ticket(ticket_id)
  );

-- ---------------------------------------------------------------------------
-- Demo agent setup (run AFTER registering agent@demo.local via the app)
-- ---------------------------------------------------------------------------
-- update public.profiles
-- set role = 'agent'
-- where email = 'agent@demo.local';
