-- Fix role trigger so SQL Editor can promote agents (blocks self-service only).
-- Run once in Supabase SQL Editor if agent promotion fails with P0001.

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
as $$
begin
  if old.role is distinct from new.role then
    if auth.uid() is not null and auth.uid() = old.id then
      raise exception 'Role cannot be changed through the application';
    end if;
  end if;
  return new;
end;
$$;

-- Then promote agent:
-- update public.profiles set role = 'agent' where email = 'agent@demo.local';
