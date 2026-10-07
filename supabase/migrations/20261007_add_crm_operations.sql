create table if not exists public.crm_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  activity_type text not null default 'note',
  note text,
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid default auth.uid() references auth.users(id),
  created_at timestamptz not null default now()
);
alter table public.crm_activities enable row level security;
drop policy if exists crm_activities_sales_access on public.crm_activities;
create policy crm_activities_sales_access on public.crm_activities
  for all to authenticated
  using (is_sales_or_admin())
  with check (is_sales_or_admin());

create table if not exists public.crm_message_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  channel text not null default 'whatsapp',
  purpose text not null default 'follow_up',
  body text not null,
  active boolean not null default true,
  created_by uuid default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.crm_message_templates enable row level security;
drop policy if exists crm_message_templates_sales_access on public.crm_message_templates;
create policy crm_message_templates_sales_access on public.crm_message_templates
  for all to authenticated
  using (is_sales_or_admin())
  with check (is_sales_or_admin());

insert into public.crm_message_templates (name,channel,purpose,body)
select v.name,v.channel,v.purpose,v.body
from (values
  ('Welcome enquiry','whatsapp','welcome','Hello {{name}}, thank you for contacting Way2Paisa. We have received your enquiry and our advisor will connect with you shortly.'),
  ('Site visit follow-up','whatsapp','follow_up','Hello {{name}}, would you like us to arrange a site visit or online presentation for {{project}}?'),
  ('Birthday wishes','whatsapp','birthday','Happy Birthday, {{name}}! Wishing you happiness and success from the Way2Paisa team.'),
  ('New opportunity','whatsapp','new_deal','Hello {{name}}, we have a new verified opportunity that may match your preferences. Reply here if you would like the details.')
) as v(name,channel,purpose,body)
where not exists (select 1 from public.crm_message_templates t where t.name=v.name);
