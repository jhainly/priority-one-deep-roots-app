import type { Program } from "@/types/program";

/**
 * Starter template shown in the admin import page.
 *
 * It follows the conventions in docs/deep-roots-yaml-reference.md. Real weekly content lives in
 * imports/deep-roots-week-{n}.yaml; paste one of those files into the import page to publish a week.
 */
export const sampleProgram: Program = {
  program: {
    id: "priority-one-deep-roots-week-1",
    title: "Deep Roots",
    version: "1.0.0",
    description: "Week One Mission from the Deep Roots weekly missions format."
  },
  weeks: [
    {
      weekNumber: 1,
      title: "Week One Mission",
      summary: "Complete the Week One mission, including the daily Reading and Reflection, by Friday at midnight.",
      sourcePdfUrl: "/program-pdfs/deep-roots-week-1.pdf",
      days: [
        {
          dayNumber: 1,
          label: "Weekly Mission",
          title: "Weekly Mission",
          sections: [
            {
              id: "chapter-challenge",
              title: "Chapter Challenge",
              body: "Weekly physical/spiritual discipline instructions from the source PDF. 1 point per day.",
              completionUnit: "day",
              completionItems: [
                { id: "monday", label: "Monday" },
                { id: "tuesday", label: "Tuesday" },
                { id: "wednesday", label: "Wednesday" },
                { id: "thursday", label: "Thursday" },
                { id: "friday", label: "Friday" }
              ],
              maxCompletions: 5,
              points: 5,
              pointsPerCompletion: 1
            },
            {
              id: "chapter-reading",
              title: "Chapter Reading",
              body: "Read the assigned chapter of the book.",
              points: 6
            },
            {
              id: "memorization",
              title: "Memorization",
              body: "Scripture reference and verse text from the source PDF.",
              points: 2
            },
            {
              id: "aerobic-exercise",
              title: "Aerobic Exercise",
              body: "10 minutes, 2 days this week. Some suggestions are walking, running, hiking, bike riding, swimming, etc.",
              completionUnit: "day",
              maxCompletions: 2,
              points: 2,
              pointsPerCompletion: 1
            },
            {
              id: "weekly-check-in",
              title: "Weekly Check-In",
              body: "Report your score from Week One to your TEAM Captain by Friday at midnight.",
              points: 1
            }
          ]
        },
        {
          dayNumber: 2,
          label: "Monday",
          title: "Reading and Reflection",
          sections: [
            {
              id: "chapter-challenge",
              title: "Answer the daily book question.",
              points: 0,
              prompts: [{ id: "monday-book-question", label: "Daily book question from the source PDF." }]
            },
            {
              id: "spiritual-action",
              title: "Spiritual Action: Reading and Reflection",
              body: "Read the assigned passage slowly two times.",
              points: 1,
              prompts: [
                { id: "monday-q1", label: "First Bible reading question from the source PDF." },
                { id: "monday-q2", label: "Second Bible reading question from the source PDF." },
                { id: "monday-q3", label: "Third Bible reading question from the source PDF." }
              ]
            },
            {
              id: "breath-prayer",
              title: "Breath Prayer",
              breathPrayer: [
                { inhale: "You breathed life into me...", exhale: "Every breath is Your gift to me." },
                { inhale: "You sustain me each moment...", exhale: "My existence depends on You." }
              ],
              points: 0
            },
            {
              id: "apply-gods-truth",
              title: "Apply God's Truth to Your Life",
              points: 0,
              prompts: [
                {
                  id: "monday-apply-summary",
                  label:
                    "Write down one or two sentences that summarize what God might be saying to you through reading and praying His word."
                },
                {
                  id: "monday-apply-action",
                  label:
                    "Write down one practical action step you will take today to live out what you learned in your reading, reflection, and prayer."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
