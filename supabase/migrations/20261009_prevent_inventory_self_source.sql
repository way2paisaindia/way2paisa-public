create or replace function public.prevent_inventory_self_source()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  if new.active is true
     and coalesce(new.source_url, '') ~* '(^https?://)?(www\.)?way2paisa\.in(/|$)'
     and (
       tg_op = 'INSERT'
       or new.source_url is distinct from old.source_url
       or (new.active is distinct from old.active and new.active is true)
     )
  then
    raise exception 'Active inventory source_url cannot reference way2paisa.in; use an external current/primary source';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_inventory_self_source on public.inventory;

create trigger trg_prevent_inventory_self_source
before insert or update on public.inventory
for each row
execute function public.prevent_inventory_self_source();
