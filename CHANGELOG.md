# Changelog

All notable changes to the Priority One Deep Roots app are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries are grouped by the date they
land on `main` rather than by release number, because the app deploys continuously through Amplify Hosting. When you
commit a user-visible change, add a line under today's date (create the heading if it does not exist yet), newest
date first.

Entry types: `Added`, `Changed`, `Fixed`, `Removed`, `Content` (Deep Roots weekly material), `Docs`.

## 2026-09-12

### Added

- Named completion items for partial-scoring sections (`completionItems` in YAML). The weekly Chapter Challenge shows
  Monday-Friday checkboxes and multi-part Chapter Reading shows one checkbox per chapter instead of a `0-N` picker.
  Validation warns when the item count differs from `maxCompletions`.
- Admins can show or hide an imported week per team from the team detail page and the programs page without deleting
  it. Show/hide actions are recorded as `show_week` / `hide_week` audit events.
- "Make imported weeks visible to team members immediately" toggle on the import page.
- Getting Started guide download (`public/drix-getting-started.pdf`) on the dashboard.
- `.gitattributes` normalizing line endings to LF.
- This changelog.

### Changed

- Zero-point sections are display-only: no checkbox, point label, or fallback reflection box, so instructions, breath
  prayers, and "Apply God's Truth" prompts read as content rather than scored items.
- Admin wording moved from "publish" to "import"; the "Source PDF attached" link was removed from the preview because
  the week download button already exposes the handout.
- Week dropdowns show `Week N` only; leaderboard tabs renamed to `My Team's Leaderboard` and
  `Deep Roots Team Leaderboard`.
- Team scores on the program leaderboard are normalized to the team's average individual score multiplied by 3
  (maximum 120 for a 40-point week).
- Branding copy, metadata, and logo updated to "Deep Roots".
- The import page starter template now follows the current YAML conventions instead of the old Week 5 sample.

### Removed

- Generated journal PDF export (`lib/pdfExport.ts`, `loadJournalExport`); the week download has served the original
  handout since 2026-09-04.
- Week removal actions (`removeWeekFromGroups`, `removeWeekFromActiveProgram`), superseded by show/hide.
- Unused `AdminHome` component, `ProgramPrompt.optional` field, `.eslintrc.json` (flat config is active), stale
  `schemas/program.schema.yaml`, the DRVIII-era Week 5 PDF, and unreferenced CSS.

### Content

- Week 1 and Week 2 missions (`imports/deep-roots-week-1.yaml`, `imports/deep-roots-week-2.yaml`) with their source
  PDFs, each totaling 40 points.

### Docs

- `docs/deep-roots-yaml-reference.md` is the source of truth for YAML conventions, scoring rules, and the import
  review checklist.
- README refreshed to match the current admin flows, project structure, and known gaps.

## 2026-09-04

### Added

- Structured breath prayers (`breathPrayer` inhale/exhale pairs) rendered with alternating styling.
- Week download button serves the original Deep Roots handout (`sourcePdfUrl`) instead of a generated PDF.

### Changed

- Rebranded from the LifePoint men's group journal to Priority One Deep Roots.
- Cognito email uses the verified SES domain and a Deep Roots no-reply sender.
- Cleaned up navigation for unauthenticated users.

## 2026-08-14

### Added

- Amplify Hosting build spec (`amplify.yml`).

## 2026-08-02

### Added

- Initial Priority One Deep Roots app commit: Next.js App Router, Amplify Gen 2 auth/data/functions, encrypted
  journals, weekly missions with partial scoring, teams and join codes, leaderboards, and admin import/audit tooling.

## Earlier history (2026-05-23 to 2026-07-17)

Pre-rebrand development as the LifePoint men's group journal, including the initial scaffold, group directory and
join flow, admin import/export flows, journal auto-save and key-envelope fixes, V2 journal key wrapping by Cognito
`sub`, server-side `UserScore` writes, weekly/all-time leaderboards, unconfirmed-account verification, and
self-service password reset. See `git log` for the full record.
