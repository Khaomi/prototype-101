create or replace view public.profile_with_auth_user
with (security_invoker = true) as
select
  p.*,
  coalesce(
    u.raw_user_meta_data->>'display_name',
    u.raw_user_meta_data->>'full_name',
    split_part(u.email, '@', 1)
  ) as display_name,
  u.email
from public.profile p
left join auth.users u on u.id = p.id
where
  auth.uid() = p.id
  or public.is_admin();

grant select on public.profile_with_auth_user to authenticated;