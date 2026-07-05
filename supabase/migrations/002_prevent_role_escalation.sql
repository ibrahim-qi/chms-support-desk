-- Prevent users from escalating their own role via the profiles UPDATE policy.
-- Run in Supabase SQL Editor if you already applied 001_initial_schema.sql.

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

drop trigger if exists profiles_prevent_role_change on public.profiles;

create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_change();
