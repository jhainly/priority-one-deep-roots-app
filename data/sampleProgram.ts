import type { CompletedSectionKey } from "@/lib/scoring";
import type { Program, ProgramDay, ProgramPrompt, ProgramSection } from "@/types/program";

type ReflectionDay = {
  dayNumber: number;
  growthQuestion: string;
  label: string;
  reading: string;
  spiritualQuestions: string[];
};

const reflectionDays: ReflectionDay[] = [
  {
    dayNumber: 2,
    label: "Monday",
    reading: "Matthew 17:1-13",
    growthQuestion: "Why do you live where you live? What went into that decision?",
    spiritualQuestions: [
      "Jesus took His inner circle (Peter, James, and John) up a high mountain. He revealed His glory and identity to them in a deeper way than He did to any of His other followers at that time. Who are two or three men God might be encouraging you to invite into your life in a deeper way than others are? What would it look like to give them access to you and your life in a way others don't have? What would it look like for you to prioritize them in your life by making yourself available to them in ways that you aren't available to others?",
      "The disciples see Jesus' glory. Jesus' glory is something of the majesty and splendor of God being made visible through Him. Jesus is the glory of God in the flesh who makes God known (John 1:14-18). He is the image of the invisible God (Colossians 1:15). He is the radiance of God's glory (Hebrews 1:1-4). As the light and heat of the sun allow us to feel and experience something of its splendor, power, and glory, Jesus has given us the ability to experience the incomprehensible glory of God in a way that is accessible to us without destroying us. Where is Jesus trying to lift your eyes from the ordinary to see the extraordinary reality of who He truly is? In what specific ways should every aspect of your life be affected and transformed by the glory of Jesus shining into it? Your thoughts? Your words? Your actions? Your relationships? Your plans? Your house? Your car? Your entertainment? Your work? Your finances?",
      "When Jesus gives us access to who He is in deeper and fuller ways, our lives are transformed by His Holy Spirit (2 Corinthians 3:18). When we give other brothers access to who we are in deeper and fuller ways, our lives become sharpened (Proverbs 27:17), their lives become sharpened, and our relationship grows. In what specific ways could God transform your life and the lives of others more deeply as you develop authentic relationships with other men?",
      "Jesus revealed Himself to Peter in a special way. He also gave Peter a special glimpse of the man Jesus would help Peter become, in spite of his issues and failures (Matthew 16:18-19; Matthew 26:69-75; John 21:15-25). Who is a man in your life that needs to hear about who God can make them in spite of their current insecurities, inadequacies, or failures?",
      "Based on today's reading, what is one thing you can thank or praise God for? One thing you can ask forgiveness for? One thing you can ask God to do for you or others?"
    ]
  },
  {
    dayNumber: 3,
    label: "Tuesday",
    reading: "Matthew 17:14-27",
    growthQuestion:
      "Have you put down roots where you live? Why is this important? What are signs demonstrating that you put down roots?",
    spiritualQuestions: [
      "The disciples could not heal the boy, and Jesus exposes their unbelief. He reveals that a life of following after Jesus requires an attitude of dependent trust in Him. It is not necessarily the size of one's faith that is important. A mustard seed was the smallest of all the garden seeds in Jesus' time. The essential element of our faith is that it is placed in the right object, God Himself. Dependent trust in Jesus equivalent to the size of a mustard seed can move a mountain. That is not because the faith is great, but because the person is trusting in the Great One who holds all authority, power, and dominion over all things. What seemingly impossible difficulties are present in your closest relationships? What would it look like to keep planting mustard seeds of faith in these areas day after day? What would it look like to keep trusting that God can do far more abundantly beyond all that you can ask or imagine according to His power at work within you (Ephesians 3:14-21)? Take a minute to imagine what things could be like in that area of difficulty if God showed up in a powerful way. What could happen in your heart and life? What could happen in their heart and life? Trust that God can do far more abundantly beyond all that you can ask or imagine. Also, trust that God will do it in His timing.",
      "The father of the afflicted son came to Jesus for help. God has sovereignly chosen to use His people empowered by His Spirit as one of the primary means of helping hurting people in the world. Who is someone in your life that is hurting, struggling, or going through something difficult? What would it look like for you to commit to praying for them? What is one practical way you can come alongside them to help share their burden?",
      "Jesus rebuked the demon and restored the boy to full health. Where do you need Jesus' restoring power in your own life or relationships? Where do those around you need the restoring power of Jesus?",
      "Based on today's reading, what is one thing you can thank or praise God for? One thing you can ask forgiveness for? One thing you can ask God to do for you or others?"
    ]
  },
  {
    dayNumber: 4,
    label: "Wednesday",
    reading: "Matthew 18:1-14",
    growthQuestion:
      "Earley states, \"We can't properly care for our families unless we're also caring for our friendships.\" Do you agree? Why or why not?",
    spiritualQuestions: [
      "Jesus warned against causing others to stumble. How does this sharpen your awareness of how your actions influence your brothers in Christ?",
      "In what ways might your attitudes, words, or actions be unintentionally damaging someone's commitment to Jesus or His mission?",
      "What practical steps can you take to develop a protective presence in your friendships that builds your brothers up in godliness?",
      "Jesus cares about and pursues the wandering sheep. Who in your life or church is drifting right now and needs your pursuit?",
      "Based on today's reading, what is one thing you can thank or praise God for? One thing you can ask forgiveness for? One thing you can ask God to do for you or others?"
    ]
  },
  {
    dayNumber: 5,
    label: "Thursday",
    reading: "Matthew 18:15-20",
    growthQuestion: "Which of the \"Habits of Proximity\" would you like to develop? Why?",
    spiritualQuestions: [
      "Jesus instructed His followers to go directly to a brother who had sinned against them. In what ways do you avoid honest, humble truth-telling in your relationships? What fears cause you to avoid it? Where is God calling you to courageously initiate a private, honest conversation instead of avoiding conflict or slandering a brother?",
      "Jesus emphasizes winning your brother, not winning an argument. How might your tone, posture, or expectations need to change so restoration, not being right, becomes your goal? See Galatians 6:1-3.",
      "Jesus provided a relational process for addressing someone who sins against us: private first, then with witnesses, then with the church. Is there a situation you have addressed alone that now needs to be addressed with the assistance of another brother? How can you determine if a third party needs to be involved? What would need to be true about the personality, character, and beliefs of that third party to make them a wise addition who can speak words of truth in love?",
      "Jesus revealed that there is a time for someone to be cut off from deep friendship. This may be the best choice if the person continues to sin against another, refuses to acknowledge their sinfulness, and refuses to seek forgiveness. Paul gives an example of this in 1 Corinthians 5:1-12. How would you determine whether the best approach is to remove someone from your life? Do you have anyone in your life that seems to fit this category? If so, invite some trusted brothers and church leaders into the process to help you pray for the situation and determine what is best for this relationship. Remember, the ultimate goal is always to win them over and restore relationship between you, them, and Jesus. Additionally, this will rarely apply to separating yourself from your wife; though it is possible given certain situations that are supported by the Bible. Seek godly counsel if you are having deep struggles with your wife that are causing you to consider separating yourself from her.",
      "Based on today's reading, what is one thing you can thank or praise God for? One thing you can ask forgiveness for? One thing you can ask God to do for you or others?"
    ]
  },
  {
    dayNumber: 6,
    label: "Friday",
    reading: "Matthew 18:21-35",
    growthQuestion: "What is your biggest takeaway from this week's reading? What are you going to do with it?",
    spiritualQuestions: [
      "Forgiveness is costly. Jesus was willing to give His life on the cross so that we could receive God's forgiveness. In light of His willingness to forgive us even though we don't deserve it, we are called to forgive those who sin against us. Jesus hates the sin that was done to you more than you do. He understands even more deeply than you do the depth and evil of it. But He also loves the person who sinned against you and desires them to be saved from their sin and transformed into someone who brings goodness to others' lives, rather than destruction. What wound, resentment, or bitterness is Jesus inviting you to bring into the light so He can heal it?",
      "How does remembering God's forgiveness toward you soften your heart toward those who have sinned against you?",
      "Forgiving someone who has sinned against you is not admitting that what they did was okay. It is not giving them immediate access to you in the ways they've had in the past. And it is not necessarily giving them full trust again. Forgiving someone is choosing to cancel a debt that they owe you because of the pain they have caused you by sinning against you. They don't deserve your forgiveness, but you make the choice to absorb the cost of their sin against you because Jesus has absorbed all of the debt you owe God because of your sin against Him and others. Receiving forgiveness from God frees you to forgive others who have sinned against you. Are you withholding forgiveness from someone who has sinned against you in the past? How is that unforgiveness hardening your heart toward that person and others? How can your TEAM come alongside you and help you offer forgiveness to this person? What is the wisest way to approach forgiving this person? Sometimes the forgiveness can be spoken privately as an act of giving the situation over to God. Sometimes it needs to be done directly with the person who has offended you. Seek wise counsel from other brothers to determine what is best.",
      "Watch this interview I did on forgiveness with counselor Jess Meade for a deeper understanding of what forgiveness is and is not from a biblical perspective. Go to priorityone.org/dr8-videos.",
      "Based on today's reading, what is one thing you can thank or praise God for? One thing you can ask forgiveness for? One thing you can ask God to do for you or others?"
    ]
  }
];

const missionScorecardSections: ProgramSection[] = [
  {
    id: "weekly-check-in",
    title: "Weekly Check-In",
    body: "Review your Week Five mission progress in the app by Friday at midnight.",
    points: 1
  },
  {
    id: "chapter-reading",
    title: "Chapter Reading",
    body: "Chapter 6.",
    points: 3
  },
  {
    id: "memorization",
    title: "Memorization",
    body: "Matthew 6:14-15 - If you forgive those who sin against you, your heavenly Father will forgive you. But if you refuse to forgive others, your Father will not forgive your sins. (NLT)",
    points: 2
  },
  {
    id: "aerobic-exercise",
    title: "Aerobic Exercise",
    body: "20 minutes, 3 days this week.",
    completionUnit: "day",
    maxCompletions: 3,
    points: 3,
    pointsPerCompletion: 1
  },
  {
    id: "strength-training",
    title: "Strength Training",
    body: "20 minutes, 3 days this week. Your training must include 3 minutes of core exercises. (Sit-ups, planks, lower back exercises, etc.)",
    completionUnit: "day",
    maxCompletions: 3,
    points: 3,
    pointsPerCompletion: 1
  },
  {
    id: "physical-action",
    title: "Physical Action",
    body: "Avoid all screens (phone, TV, computer, etc.) for the first 60 minutes after you wake up, Monday through Thursday. If you journal or do your devotions on your computer/phone, write down your daily devos for the week ahead of time and use a notebook and actual Bible. Or do your digital devos at a different time of the day.",
    completionUnit: "day",
    maxCompletions: 4,
    points: 8,
    pointsPerCompletion: 2
  },
  {
    id: "meet-with-team",
    title: "Relational",
    body: "Meet with your TEAM.",
    points: 5
  },
  {
    id: "relational-action",
    title: "Relational Action",
    body: "Celebrate a friend's success this week - publicly or privately. Make their joy your joy (text, note, small gift, or act of kindness).",
    points: 3
  },
  {
    id: "friday-zoom",
    title: "Friday Zoom Meeting",
    body: "Join the 10-minute Friday Zoom meeting at 7:00 AM EST. Find the link in the weekly mission email. If you miss the meeting, a recording will be included in the Friday email.",
    points: 2
  }
];

export const sampleProgram: Program = {
  program: {
    id: "priority-one-deep-roots-week-5",
    title: "Deep Roots",
    version: "1.0.0",
    description: "Week Five Mission from the Deep Roots weekly missions format."
  },
  weeks: [
    {
      weekNumber: 5,
      title: "Week Five Mission",
      summary: "Complete by Friday at midnight.",
      days: [makeMissionScorecardDay(), ...reflectionDays.map(makeReflectionDay)]
    }
  ]
};

export const sampleCompletedSections = new Set<CompletedSectionKey>([
  "5:1:weekly-check-in",
  "5:2:growth-challenge",
  "5:2:spiritual-action"
]);

export const leaderboardRows = [
  { displayName: "James", score: 28 },
  { displayName: "Marcus", score: 34 },
  { displayName: "Ethan", score: 23 }
];

function makeMissionScorecardDay(): ProgramDay {
  return {
    dayNumber: 1,
    label: "Weekly Missions",
    title: "Weekly Missions",
    sections: missionScorecardSections
  };
}

function makeReflectionDay(day: ReflectionDay): ProgramDay {
  return {
    dayNumber: day.dayNumber,
    label: day.label,
    title: "Reading and Reflection",
    sections: [
      {
        id: "growth-challenge",
        title: "Growth & Challenge",
        body: "Write your answer to the daily reflection question.",
        points: 1,
        prompts: [{ id: `${day.label.toLowerCase()}-growth`, label: day.growthQuestion }]
      },
      {
        id: "spiritual-action",
        title: "Spiritual Action: Reading and Reflection",
        body: `Read ${day.reading}.`,
        points: 1,
        prompts: makeQuestionPrompts(day)
      }
    ]
  };
}

function makeQuestionPrompts(day: ReflectionDay): ProgramPrompt[] {
  return day.spiritualQuestions.map((question, index) => ({
    id: `${day.label.toLowerCase()}-q${index + 1}`,
    label: `Q${index + 1}. ${question}`
  }));
}
