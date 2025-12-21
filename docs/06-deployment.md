# Deployment

## Vercel (Production)
1. Import repository.
2. Configure Environment Variables (from `.env.local` / `.env.example`).
3. Deploy Main branch.

## Environment Variables
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is NOT prefixed with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_` vars are exposed to browser.

## Supabase Notes
> [!NOTE]
> Free tier projects pause after inactivity.
- If API fails, check Supabase dashboard to "Resume" project.
