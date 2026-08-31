create or replace function public.hook_validate_signup_email(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  user_email text;
  email_domain text;
  
  allowed_domains text[] := array[
    'ku.th',
    'ku.ac.th'
  ];
begin
  user_email := lower(trim(event->'user'->>'email'));
  
  if user_email is null or user_email = '' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'Email address is required for registration.'
      )
    );
  end if;

  email_domain := split_part(user_email, '@', 2);

  if not (email_domain = any(allowed_domains)) then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'Access restricted. This application is limited to authorized personnel.'
      )
    );
  end if;

  return jsonb_build_object('decision', 'continue');
end;
$$;

revoke all on function public.hook_validate_signup_email(jsonb) from public, anon, authenticated;
grant execute on function public.hook_validate_signup_email(jsonb) to supabase_auth_admin;