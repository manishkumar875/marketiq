# Prime Eye Research — Supabase Backend Setup

This document covers everything needed to stand up the database, security
policies, and first admin login for the production site.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account (or sign in).
2. Click **New Project**.
3. Choose an organization, name the project (e.g. `prime-eye-research`), set a
   strong database password (save it somewhere safe — you won't need it for
   day-to-day use, but you'll need it if you ever connect a direct Postgres
   client), and pick a region close to your primary audience.
4. Wait for the project to finish provisioning (~2 minutes).

## 2. Run the database schema

1. In the Supabase dashboard, open **SQL Editor**.
2. Open `supabase/schema_combined.sql` from this repo, copy its entire
   contents, paste into the SQL Editor, and click **Run**.
   - Alternatively, run the 6 files in `supabase/migrations/` individually,
     in numeric order (001 through 006), if you're using the Supabase CLI
     or prefer to review each step separately.
3. Confirm success: in **Table Editor**, you should now see `leads`,
   `research_requests`, `projects`, `notes`, `admin_roles`, `audit_log`, and
   `rate_limit_log` — all empty. **This is expected.** No table is seeded
   with sample data. Rows only appear from real form submissions or
   explicit admin actions.

## 3. Get your API keys

1. In the Supabase dashboard, go to **Project Settings > API**.
2. You'll need two values:
   - **Project URL** (e.g. `https://abcxyzcompany.supabase.co`)
   - **anon / public key** (safe to expose in the browser — it's restricted
     by the Row Level Security policies you just installed)
3. You will also see a **service_role key**. This key bypasses Row Level
   Security entirely. It is used ONLY by trusted server-side code (the audit
   log writer). **Never expose this key to the browser, never prefix it with
   `NEXT_PUBLIC_`, never commit it to git.**

## 4. Set environment variables

Create a `.env.local` file in the project root (this file is already
git-ignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional, for email notifications on new leads/requests:
RESEND_API_KEY=your-resend-key-here
NOTIFICATION_EMAIL=team@prime-eyeresearch.com
```

When you deploy to Vercel, add the same variables under
**Project Settings > Environment Variables** there too. Do not commit
`.env.local` to git — it is already covered by `.gitignore`.

## 5. Create your first admin login

There is no public sign-up for the admin panel — this is intentional
(see Security section below). To create your own admin account:

1. In the Supabase dashboard, go to **Authentication > Users > Add User**.
2. Enter your email and a password (or use "send invite" to set it via
   email instead).
3. Copy the new user's **UUID** from the users list.
4. Go to **SQL Editor** and run:
   ```sql
   insert into public.admin_roles (user_id, role)
   values ('paste-the-uuid-here', 'admin');
   ```
5. You can now log in at `/admin/login` on the live site with that email
   and password.

To add a teammate as an admin later, repeat the same two steps (create
the user in Authentication, then insert their UUID into `admin_roles`).
There is no in-app "invite a teammate" flow — this is by design, so admin
access can never be granted except by someone with direct database access.

## 6. (Optional) Email notifications

If you want an email alert whenever a lead or research request comes in:

1. Create a free account at [resend.com](https://resend.com).
2. Verify a sending domain (or use their test domain while developing).
3. Generate an API key and add it as `RESEND_API_KEY` in your environment
   variables, along with `NOTIFICATION_EMAIL` (where alerts should go).
4. If these two variables are not set, the site still works fine — it
   simply skips sending the notification email.

## Security summary

- **Authentication**: Supabase Auth, email/password. No public admin
  sign-up exists anywhere in the app.
- **Authorization**: a user being logged in is not enough — they must also
  have a row in `admin_roles`. This is checked both in the app (middleware)
  and at the database level (RLS policies via the `is_admin()` function).
- **Row Level Security**: enabled on every table. Anonymous users can only
  `INSERT` into `leads` and `research_requests` — they cannot read, update,
  or delete anything, ever, even via a direct API call. Only authenticated
  admins can read/update/delete business data.
- **Rate limiting**: enforced by a database trigger — max 5 submissions per
  IP per 10 minutes on each public form table. This cannot be bypassed by
  calling the API directly, since the trigger runs inside Postgres itself.
- **Audit log**: append-only; only writable via the service-role key from
  trusted server code, never from the browser or by an authenticated admin
  directly. Admins can read it but cannot edit or delete entries.
- **No mock/seed data**: every table starts genuinely empty. Nothing in
  `/admin` shows up until a real form submission or a real admin action
  (e.g. converting a request to a project) occurs.
