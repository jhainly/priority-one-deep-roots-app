# Priority One Deep Roots App

Team-based discipleship, weekly mission tracking, private reflection, and scoring app for Priority One's Deep Roots program.

Deep Roots is modeled as an 8-week training path where teams work through weekly missions, spiritual reflection, relational action, physical commitments, and team accountability. Members track progress, keep encrypted private reflections, and see healthy individual and team competition on the leaderboard.

Built with Next.js, TypeScript, AWS Amplify Gen 2, Amazon Cognito, AppSync, and DynamoDB.

## Current State

- The app is branded for Priority One Deep Roots throughout the member, leader, and admin experiences.
- The sample/import templates in `imports/` currently contain Week 1 and Week 2 content.
- Week content follows the Deep Roots weekly mission format:
  - `Weekly Mission`
  - Weekly `Chapter Challenge`
  - Monday-Friday `Spiritual Action: Reading and Reflection`
- Repeated mission items support partial scoring, either as count buttons (`0 1 2 3` days completed) or as named checkboxes (Monday-Friday, Introduction / Chapter 1) when the YAML defines `completionItems`.
- The top-left brand mark and favicon use `public/logo.png`.
- The leaderboard has two views:
  - `My Team's Leaderboard`: individual members in the selected team.
  - `Deep Roots Team Leaderboard`: team totals compared across teams in the same active program.
- Changes are tracked in [CHANGELOG.md](CHANGELOG.md).

## Local Setup

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

Run checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment, Domain, and Email (Priority One specific)

This app is Priority One's deployment and carries Priority One infrastructure that its sibling, the Lifepoint Men app (`mens-group-journal`, the repo this one was forked from), intentionally does **not** have:

- **Region:** production and sandbox run in **us-east-2**.
- **Custom email sender:** Cognito sends verification and reset emails as `Deep Roots <deeproots-no-reply@priorityone.org>` through Amazon SES using the verified `priorityone.org` domain identity. This is configured in `amplify/auth/resource.ts` (`senders.email`) and `amplify/backend.ts` (`cfnUserPool.emailConfiguration` with the SES ARN). Setup steps and the DNS records live in [docs/production-email-setup.md](docs/production-email-setup.md).
- **Custom domain:** the production site is served at **https://deeproots.priorityone.org/**, a Priority One custom domain configured in Amplify Hosting, rather than the default `amplifyapp.com` URL.

When porting changes between the two apps, leave all of the above out of the Lifepoint app: it uses the Cognito default sender, the default Amplify Hosting domain, and us-east-1.

## Amplify Backend

The backend is defined in:

- `amplify/auth/resource.ts`
- `amplify/data/resource.ts`
- `amplify/backend.ts`
- `amplify/functions/*`

Run a local sandbox backend:

```bash
npm run sandbox
```

Run a one-time sandbox deploy, or delete the sandbox:

```bash
npm run sandbox:once
npm run sandbox:delete
```

The sandbox scripts always pass `--profile priorityone`, an AWS profile pinned to **us-east-2** (where this app's production stack lives), so the sandbox region never depends on the shell's default. Define it once in `~/.aws/config` alongside your existing SSO profile:

```ini
[profile priorityone]
sso_session = <your sso session>
sso_account_id = <account id>
sso_role_name = <role>
region = us-east-2
```

Avoid running `npx ampx sandbox` directly; without the profile it deploys to whatever region the shell resolves.

This generates `amplify_outputs.json`, which points the local app at the sandbox Cognito and AppSync resources. That file is intentionally gitignored because it is environment-specific output.

If AWS SSO credentials have expired:

```bash
aws sso login --sso-session <your sso session>
```

### Bootstrap Admin

For a sandbox where you need to bootstrap one admin user into the Cognito `ADMINS` group, deploy with:

```bash
$env:DEEP_ROOTS_BOOTSTRAP_ADMIN_EMAIL="admin@example.com"
npx ampx sandbox --once --profile priorityone --identifier deep-roots --outputs-format json --outputs-out-dir .
```

Keep that environment variable set on future deploys until you remove the bootstrap attachment intentionally.

## Local HTTPS and Journal Encryption

Journal encryption uses the browser Web Crypto API. `localhost` is a secure origin for same-machine testing. A LAN URL like `http://192.168.x.x:3000` is not a secure origin and cannot encrypt journal answers.

For LAN testing:

```bash
npm run dev:https
```

Then open the HTTPS URL shown by Next.js.

## Features

### Members

- Create an account with email verification.
- Join a Deep Roots team using a server-verified join code.
- Select among joined teams.
- View weekly and cumulative personal scores on the dashboard.
- Navigate active weeks and program days.
- Complete weekly missions, including partial scoring for repeated day-count items.
- Write private encrypted reflection responses.
- Download the current week's original Deep Roots handout PDF and the Getting Started guide.
- Update display name and password from the account page.
- Leave a joined team.

### Leaders and Admins

- Create teams with join codes.
- Edit team names and join codes.
- View team membership.
- Import Deep Roots weekly content via YAML.
- Preview the rendered member experience before publishing.
- Import one or more weeks to one or more teams.
- Choose whether imported weeks are visible to members immediately.
- Show or hide imported weeks for each team without deleting the imported content.
- View program assignment status and import, replacement, and show/hide audit events.
- Manage Cognito `ADMINS` membership from the admin user panel.

## Leaderboards

The leaderboard page supports weekly and all-time views.

- `My Team's Leaderboard` shows individual members in the selected team.
- `Deep Roots Team Leaderboard` shows cumulative team totals for teams assigned to the same active program title.
- Weekly view uses the selected week number.
- All-time view uses cumulative score rows.
- Program team scores are normalized as the team's average individual score multiplied by 3. For a 40-point week, the maximum team score is 120.

Only visible imported weeks are loaded for members and included in score sync. Scores are derived from `SectionProgress` and persisted in `UserScore` by the `syncUserScore` backend function.

## Project Structure

```text
app/                         Next.js App Router routes
  auth/                      Login page
  account/                   Signed-in account and profile settings
  create-account/            Account creation and verification
  reset-password/            Password reset flow
  join/                      Team code join flow
  dashboard/                 Member dashboard and score summary
  program/week/[...]/        Program day journal screens
  leaderboard/               Team and program leaderboards
  admin/                     Redirects to admin/groups
  admin/groups/              Admin team list and per-team drilldown (imported weeks, show/hide)
  admin/programs/            Program assignment and week visibility management
  admin/programs/import/     YAML week import, validation, rendered preview, import to teams
  admin/programs/audit/      Program import/replacement/show/hide audit log
  admin/users/               Admin role management
components/                  Shared UI and feature components
data/                        Starter YAML template shown on the admin import page
docs/                        YAML reference, architecture, and UAT notes
imports/                     Deep Roots weekly mission YAML files ready to import
lib/                         Amplify, validation, encryption, scoring, and service utilities
types/                       Program TypeScript types
amplify/                     Amplify Gen 2 auth, data, and function backend
  functions/                 AppSync resolver Lambdas
public/                      Static assets, including logo.png
```

## Documentation

- [CHANGELOG.md](CHANGELOG.md): notable changes by date.
- [docs/deep-roots-yaml-reference.md](docs/deep-roots-yaml-reference.md): YAML conventions, scoring rules, and the import review checklist.
- [docs/dynamodb-data-model.md](docs/dynamodb-data-model.md): data model notes.
- [docs/production-email-setup.md](docs/production-email-setup.md): Cognito/SES email sender setup.
- [docs/uat-program-import-active-content.md](docs/uat-program-import-active-content.md): UAT script for import and active content loading.

## Backend Functions

- `join-group-by-code`: hashes a submitted join code, finds the matching team, and creates membership.
- `manage-admin-users`: lists Cognito users and toggles Cognito `ADMINS` group membership.
- `sync-user-score`: recalculates and persists weekly/cumulative score rows from section progress.
- `sync-display-name`: updates score display names after a profile display-name change.

## Roles

| Role | Access |
| --- | --- |
| Authenticated member | Dashboard, program days, leaderboard, join flow, account page |
| `LEADERS` | Member access plus team and program management |
| `ADMINS` | Leader access plus admin-role management and full user visibility |

Admins manage role assignments from `/admin/users`.

## Security Model

The core rule: journal reflections must be encrypted in the browser before storage. The backend never receives plaintext answers, and no admin or leader can read another member's reflection content.

How it works:

1. The user authenticates with Cognito.
2. On first sign-in, the browser generates a random 32-byte per-user journal key.
3. That key is wrapped using a key derived from the user's Cognito `sub` via PBKDF2-SHA-256 with a random salt and 310,000 iterations.
4. The wrapped key envelope is stored on the user profile.
5. On later sign-ins, the browser re-derives the wrapping key from the Cognito `sub` and unwraps the journal key locally.
6. The unwrapped journal key is stored only in browser storage for the local session.
7. Each journal answer is encrypted locally with AES-GCM using a per-answer salt and IV.
8. The server stores ciphertext, IV, salt, algorithm metadata, prompt identity, completion status, and scoring metadata.

Legacy V1 journal key envelopes that were password-wrapped are still readable and are migrated to V2 on sign-in.

Additional rules:

- Do not send plaintext answers to APIs, logs, analytics, or DynamoDB.
- Do not expose another member's encrypted answers to leaders or admins.
- Week PDF export downloads the original Deep Roots handout stored with the app.

## Program YAML

Program content is structured as:

```text
program -> weeks -> days -> sections -> prompts/scripture
```

Each week can point to its original handout PDF:

```yaml
sourcePdfUrl: /program-pdfs/deep-roots-week-1.pdf
```

Store source PDFs in `public/program-pdfs/` using the convention `deep-roots-week-{weekNumber}.pdf`. The export button uses `sourcePdfUrl` when present and falls back to that naming convention for already-published weeks.

Use [docs/deep-roots-yaml-reference.md](docs/deep-roots-yaml-reference.md) as the source of truth for Deep Roots YAML conventions, including source PDF handling, weekly mission naming, partial scoring, breath prayers, and import review checks. Update that guide whenever YAML behavior or content conventions change.

Each section has a point value. Sections can optionally define partial completion fields:

```yaml
completionUnit: day
maxCompletions: 3
pointsPerCompletion: 1
points: 3
```

Admins paste YAML into `/admin/programs/import`, validate and preview it, then import one or more weeks to selected teams. If an imported week number already exists for a selected team, the import flow warns before replacing it.

The import page is pre-filled with a starter template from `data/sampleProgram.ts`. Ready-to-import weekly content lives in `imports/deep-roots-week-{weekNumber}.yaml`.

## Public Repo Hygiene

Generated and local-only artifacts are ignored:

- `.amplify/`
- `.next/`
- `node_modules/`
- `amplify_outputs.json`
- `.env*`
- local logs, scratch files, and coverage output

Line endings are normalized to LF by `.gitattributes`, so Windows checkouts do not produce CRLF-only diffs.

Before pushing publicly:

```bash
git status --short
npm run typecheck
npm run lint
npm run build
```

Do not commit `amplify_outputs.json`, local environment files, AWS credentials, or exported production data. Add a line to `CHANGELOG.md` under today's date for any user-visible change.

## Known Gaps

- Group-scoped leader authorization still needs tightening. Current `LEADERS` access is broader than the long-term target.
- Automated test coverage is not yet in place for YAML validation, encryption round trips, scoring, and authorization rules.
- `imports/` contains Weeks 1 and 2. Weeks 3-8 still need YAML and source PDFs.
- `@aws-amplify/ui-react` is listed in `package.json` but not imported anywhere; remove it with `npm uninstall @aws-amplify/ui-react` (needs registry access to refresh `package-lock.json`).
