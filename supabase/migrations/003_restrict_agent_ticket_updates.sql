-- Restrict agent ticket updates to workflow fields only.
-- Run in Supabase SQL Editor if your database was created before this migration.

create or replace function public.enforce_agent_ticket_update()
returns trigger
language plpgsql
as $$
begin
  if old.requester_id is distinct from new.requester_id
    or old.title is distinct from new.title
    or old.description is distinct from new.description
    or old.category is distinct from new.category
    or old.priority is distinct from new.priority
    or old.created_at is distinct from new.created_at
  then
    raise exception 'Agents may only update status and assignee';
  end if;

  return new;
end;
$$;

drop trigger if exists tickets_enforce_agent_update on public.tickets;

create trigger tickets_enforce_agent_update
  before update on public.tickets
  for each row
  execute function public.enforce_agent_ticket_update();
