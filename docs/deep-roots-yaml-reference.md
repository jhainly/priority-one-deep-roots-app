# Deep Roots YAML Reference

This guide captures the Deep Roots YAML conventions used by the app. Update this file whenever YAML structure, wording rules, scoring behavior, or import expectations change.

## Purpose

Each uploaded week should be represented as YAML that can be imported from the admin program import page. The YAML should preserve the weekly mission content from the source PDF while adapting it to the app experience.

## File And Asset Conventions

- Store week YAML files in `imports/`.
- Name week files clearly, such as `deep-roots-week-1.yaml`.
- Store source PDFs in `public/program-pdfs/`.
- Use a site-relative `sourcePdfUrl`, such as `/program-pdfs/deep-roots-week-1.pdf`.
- Do not add a visible Markdown link like `[Source PDF attached](...)` inside YAML descriptions, summaries, bodies, or prompts. The app exposes the PDF through the week PDF download/export button.
- Keep the separate Getting Started guide as `/drix-getting-started.pdf`; do not attach it to weekly YAML content.

## Required YAML Shape

```yaml
program:
  id: priority-one-deep-roots-week-1
  title: Deep Roots
  version: "1.0.0"
  description: Week One Mission from the Deep Roots weekly missions format.
weeks:
  - weekNumber: 1
    title: Week One Mission
    summary: Complete the Week One mission, including the daily Reading and Reflection, by Friday at midnight.
    sourcePdfUrl: /program-pdfs/deep-roots-week-1.pdf
    days:
      - dayNumber: 1
        label: Weekly Mission
        title: Weekly Mission
        sections:
          - id: chapter-challenge
            title: Chapter Challenge
            body: Weekly challenge instructions from the source PDF.
            completionUnit: day
            completionItems:
              - id: monday
                label: Monday
              - id: tuesday
                label: Tuesday
              - id: wednesday
                label: Wednesday
              - id: thursday
                label: Thursday
              - id: friday
                label: Friday
            maxCompletions: 5
            points: 5
            pointsPerCompletion: 1
          # Other Weekly Mission sections go here.
          # Weekly Check-In belongs at the bottom of Day 1.
          - id: weekly-check-in
            title: Weekly Check-In
            body: Report your score from Week One to your TEAM Captain by Friday at midnight.
            points: 1
```

## Program Rules

- `program.id` should be unique for the imported content.
- `program.title` should be `Deep Roots`.
- `program.version` should be a string.
- `program.description` should describe the imported week without adding user-facing PDF links.
- A YAML file may include one or more weeks, but current workflow usually imports one week at a time.

## Week Rules

- `weekNumber` must be a positive integer and must not duplicate another week in the same YAML file.
- `title` should match the source content, such as `Week One Mission`.
- The app dropdowns show only `Week 1`, `Week 2`, etc., so the week title does not need to be shortened for dropdown readability.
- `summary` should give the completion deadline and should include the daily Reading and Reflection requirement when the PDF requires it.
- `sourcePdfUrl` must start with `/`, must not start with `//`, and must end in `.pdf`.
- Remove references to `VIII` from YAML content and titles.

## Day Rules

- Day 1 should be the weekly challenge overview:
  - `label: Weekly Mission`
  - `title: Weekly Mission`
- Do not use `Mission: Scorecard` for Day 1.
- Use singular `Weekly Mission`, not `Weekly Missions`, for the section users open in the app.
- Daily reflection days should use:
  - `label: Monday`, `Tuesday`, etc.
  - `title: Reading and Reflection`
- `dayNumber` must be unique within a week.

## Section Rules

- Every section needs:
  - `id`
  - `title`
  - `points`
- `id` values should be lowercase, stable, and hyphenated, such as `aerobic-exercise`.
- Section IDs must be unique within a day.
- Use `body` for instructions copied or adapted from the PDF.
- Use `points: 0` for instructional sections that should not award points.
- Zero-point sections are display-only in the app: they do not show scoring controls, but they may still show instructions, breath prayers, or response prompts.
- Do not include the old manual instruction `TEAM Captain records TEAM score by midnight Sunday` because the app tracks team scores automatically.
- The weekly reporting/check-in instruction may preserve the PDF language that tells the participant to report their score to their TEAM Captain by Friday at midnight.
- Place `Weekly Check-In` at the bottom of the Day 1 `Weekly Mission` section list.
- The weekly chapter challenge belongs on Day 1 and should be titled `Chapter Challenge`.
- The weekly `Chapter Challenge` should use partial scoring with one named checkbox per weekday when it is worth `1 point per day`.
- Daily book-question prompts may still appear on daily Reading and Reflection days, but they should be zero-point prompt sections when the weekly `Chapter Challenge` section already awards those points.
- Daily book-question sections should use `title: Answer the daily book question.` and should not repeat that same text in `body`.
- If a `Chapter Reading` item lists multiple chapters or readings with separate point values, keep it as one `Chapter Reading` section with one named checkbox per chapter or reading.
- Daily Reading and Reflection should have one scored section per day. Supporting breath prayer and application prompt sections should be zero-point sections so the day is not split into multiple scored boxes.

Example:

```yaml
- id: chapter-reading
  title: Chapter Reading
  body: Complete the assigned reading.
  completionUnit: reading
  completionItems:
    - id: introduction
      label: Introduction
    - id: chapter-1
      label: Chapter 1
  maxCompletions: 2
  points: 6
  pointsPerCompletion: 3
```

## Partial Scoring Rules

Use partial scoring for any item that awards points per repeated completion, especially PDF items phrased like `1 point per day`.

For example, if the PDF says `Aerobic Exercise: 10 minutes, 2 days this week`, use:

```yaml
- id: aerobic-exercise
  title: Aerobic Exercise
  body: 10 minutes, 2 days this week. Some suggestions are walking, running, hiking, bike riding, swimming, etc.
  completionUnit: day
  maxCompletions: 2
  points: 2
  pointsPerCompletion: 1
```

Rules:

- `points` is the maximum total available for the section.
- `pointsPerCompletion` is the number of points earned for each completed unit.
- `maxCompletions` is the maximum count users can report.
- `completionUnit` should be singular, such as `day`, because the app pluralizes it.
- Do not model repeated day-based work as a single all-or-nothing checkbox.
- The import preview and journal UI will show a picker from `0` through `maxCompletions` unless `completionItems` is provided.
- Use `completionItems` when the user should see named checkboxes, such as Monday-Friday for a weekly Chapter Challenge or chapter names for Chapter Reading.
- When using `completionItems`, keep `maxCompletions` equal to the number of items.

Example weekly Chapter Challenge:

```yaml
- id: chapter-challenge
  title: Chapter Challenge
  body: You'll be practicing the physical/spiritual discipline of breath prayers this week.
  completionUnit: day
  completionItems:
    - id: monday
      label: Monday
    - id: tuesday
      label: Tuesday
    - id: wednesday
      label: Wednesday
    - id: thursday
      label: Thursday
    - id: friday
      label: Friday
  maxCompletions: 5
  points: 5
  pointsPerCompletion: 1
```

## Prompts And Reflections

- Use `prompts` for questions that need a written response.
- Each prompt needs:
  - `id`
  - `label`
- Prompt IDs should be unique within a section.
- Avoid wording that implies a response is optional unless the source content explicitly makes it optional.
- Do not label app response areas as `Optional Reflection`.
- Prefer source-faithful labels from the PDF for questions and reflection prompts.

Example:

```yaml
prompts:
  - id: monday-apply-summary
    label: Write down one or two sentences that summarize what God might be saying to you through reading and praying His word.
```

## Breath Prayer Rules

Use `breathPrayer` for inhale/exhale prayer pairs.

```yaml
- id: breath-prayer
  title: Breath Prayer
  breathPrayer:
    - inhale: You breathed life into me...
      exhale: Every breath is Your gift to me.
  points: 0
```

Rules:

- Keep inhale and exhale text in separate fields.
- Keep the source order from the PDF.
- The app visually alternates inhale and exhale styling, so do not combine them into one prompt or body paragraph.
- To match the PDF order, place the breath prayer as a zero-point section after the Bible reading questions and before the `Apply God's Truth to Your Life` prompts.
- Do not put `breathPrayer` inside the same section as all daily prompts if the source PDF places breath prayer between question groups. The app renders each section in order, so separate sections are the clearest way to preserve source order.

Daily Reading and Reflection sections should generally be ordered like this:

```yaml
- id: chapter-challenge
  title: Answer the daily book question.
  points: 0
  prompts:
    - id: monday-growth
      label: It is easy to ignore your body. What are some ways you are ignoring your body?
- id: spiritual-action
  title: "Spiritual Action: Reading and Reflection"
  body: Read Genesis 1:26-28, Genesis 2:4-9, and Colossians 1:15-20.
  points: 1
  prompts:
    - id: monday-q1
      label: What do these passages teach you about God as the giver and sustainer of life?
- id: breath-prayer
  title: Breath Prayer
  breathPrayer:
    - inhale: You breathed life into me...
      exhale: Every breath is Your gift to me.
  points: 0
- id: apply-gods-truth
  title: Apply God's Truth to Your Life
  points: 0
  prompts:
    - id: monday-apply-summary
      label: Write down one or two sentences that summarize what God might be saying to you through reading and praying His word.
```

## Scripture Rules

Use `scripture` only when the full scripture text is included in the source content and should be displayed directly in the app.

```yaml
scripture:
  - reference: Romans 12:1
    text: And so, dear brothers and sisters...
```

If the PDF only instructs the participant to read a passage, put that instruction in `body` instead.

## PDF Language And App Adaptation

- Import exact questions from the source PDF when the request is to load a specific week.
- Preserve Deep Roots terms such as `TEAM`, `TEAM Captain`, `Weekly Mission`, and `Reading and Reflection`.
- Remove template wording from older LifePoint or men's group journal content.
- Remove references to `VIII` unless Priority One explicitly wants that generation marker shown.
- Keep app-specific automation in mind: do not include PDF instructions that only existed for manual scorekeeping when the app already handles that behavior.

## Import Review Checklist

Before importing a new week:

- Confirm the source PDF is copied to `public/program-pdfs/`.
- Confirm `sourcePdfUrl` points to that PDF and no visible PDF link is embedded in text.
- Confirm Day 1 is `Weekly Mission`.
- Confirm daily reflection days are correctly labeled Monday through Friday, or according to the source PDF.
- Confirm Day 1 uses `Chapter Challenge` for the weekly chapter challenge and scores it with one completion item per weekday when the source awards one point per day.
- Confirm `Chapter Reading` is one section with named completion items when multiple chapters/readings are listed.
- Confirm `Weekly Check-In` is the last section under Day 1.
- Confirm daily book-question sections are titled `Answer the daily book question.` and do not also include that text as `body`.
- Confirm each daily Reading and Reflection day has only one scored section.
- Confirm every question from the PDF is represented as a prompt.
- Confirm breath prayers appear after Bible reading questions and before `Apply God's Truth to Your Life` prompts.
- Confirm multi-part chapter readings use one `Chapter Reading` section with named completion items and the correct points per completion.
- Confirm day-based or count-based scoring uses partial scoring fields.
- Confirm total week points match the source PDF/scoring model. Week 1 and Week 2 currently total 40 points each (35 on Day 1 plus 1 point for each daily Reading and Reflection).
- Confirm no `VIII`, LifePoint, or men's group journal branding remains.
- Confirm there is no `TEAM Captain records TEAM score` instruction.
- Run `npm run typecheck`.
- Run `npm run lint`.
- Preview the import page before publishing to teams.
