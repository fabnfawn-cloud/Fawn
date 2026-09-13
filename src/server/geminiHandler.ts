import { GoogleGenAI } from '@google/genai';

// Lazy initialization of Gemini API client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const FAWN_SYSTEM_INSTRUCTION = `You are Fawn, the gentle, wise, and nurturing deer character and parenting mentor from the brand Fawn & Fable (fawnandfable.store).
You are speaking directly to a parent or caregiver who is nurturing a toddler (ages 1 to 4).
Your tone is soothing, warm, deeply encouraging, and grounded in early childhood developmental psychology and gentle parenting.

Key Brand & Philosophy Anchors:
- Fawn & Fable Brand: fawnandfable.store (offering organic heirloom plushies, wooden phonics blocks, and bedtime story collections).
- Substack Articles: Reference themes from Fawn & Fable Substack (unhurried morning rhythms, phonics in the wild, co-regulation during tantrums, tactile math).
- Spotify Music: Reference calming lullabies and peaceful acoustic learning melodies (from Fawn & Fable on Spotify).
- Animal Guides:
  * Pippa the Owl: Early literacy, phonics, rhyming games, storybook wonder.
  * Milo the Bunny: Early writing, fine motor control, finger tracing in sand/flour, crayon confidence.
  * Barnaby the Bear: Toddler math, counting natural treasures (pinecones, berries, pebbles), shape sorting.
  * Willow the Fox: Social-emotional growth, identifying big emotions, calming dandelion breaths.

Guidelines:
1. Always validate the parent's feelings and their child's developmental stage first.
2. Provide practical, playful, zero-pressure activity ideas using simple household items or nature.
3. Keep suggestions toddler-developmentally appropriate (e.g. 2-year-olds need sensory play, not rigid drills).
4. Keep answers clear, structured with gentle bullet points or numbered play steps, and concise.`;

export async function handleParentAiQuery(payload: {
  message: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  childAge?: string;
  topic?: string;
}): Promise<{ reply: string }> {
  const { message, history = [], childAge, topic } = payload;
  const ai = getAiClient();

  if (!ai) {
    // Graceful fallback response when API key is not yet configured
    return {
      reply: getCuratedFawnAdvice(message, childAge, topic),
    };
  }

  try {
    const formattedHistory = history.map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    }));

    const promptContext = `Child Age: ${childAge || 'Toddler (2-3 years)'}\nTopic: ${topic || 'General Toddler Guidance'}\nParent Question: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: promptContext }],
        },
      ],
      config: {
        systemInstruction: FAWN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text?.trim() || getCuratedFawnAdvice(message, childAge, topic);
    return { reply: replyText };
  } catch (error) {
    console.error('Error in handleParentAiQuery:', error);
    return {
      reply: getCuratedFawnAdvice(message, childAge, topic),
    };
  }
}

export async function handleLessonPlanGeneration(payload: {
  childAge: string;
  focusArea: string;
  durationMinutes: number;
  materials?: string[];
}): Promise<{
  title: string;
  characterGuide: string;
  ageGroup: string;
  duration: string;
  objective: string;
  materialsNeeded: string[];
  steps: Array<{ stepNumber: number; title: string; duration: string; description: string; parentTip: string }>;
  socialEmotionalTieIn: string;
  spotifyMusicSuggestion: string;
}> {
  const { childAge, focusArea, durationMinutes, materials = [] } = payload;
  const ai = getAiClient();

  const prompt = `Create a gentle, magical, hands-on toddler lesson plan for Fawn & Fable:
Child Age: ${childAge}
Focus Area: ${focusArea}
Target Duration: ${durationMinutes} minutes
Available Materials: ${materials.length > 0 ? materials.join(', ') : 'Common household items or nature'}

Ensure it aligns with Fawn & Fable characters (Fawn, Pippa Owl for literacy, Milo Bunny for tracing/writing, Barnaby Bear for math, Willow Fox for emotional wellness).
Return the result strictly as a JSON object matching this structure:
{
  "title": "A warm whimsical title",
  "characterGuide": "Character Name",
  "ageGroup": "${childAge}",
  "duration": "${durationMinutes} Minutes",
  "objective": "A gentle developmental milestone objective",
  "materialsNeeded": ["item 1", "item 2", "item 3"],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "duration": "5 min",
      "description": "Clear, fun, toddler-friendly instructions",
      "parentTip": "Gentle co-regulation or observation tip for the parent"
    }
  ],
  "socialEmotionalTieIn": "How Willow the Fox or Fawn would connect this to calm feelings or kindness",
  "spotifyMusicSuggestion": "Calming song mood suggestion from Fawn & Fable Spotify catalog"
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: FAWN_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return parsed;
      }
    } catch (err) {
      console.error('Error generating lesson plan via Gemini:', err);
    }
  }

  // High quality fallback lesson plan
  return getFallbackLessonPlan(childAge, focusArea, durationMinutes);
}

function getCuratedFawnAdvice(question: string, age?: string, topic?: string): string {
  const q = question.toLowerCase();
  const childAgeLabel = age ? `around ${age}` : 'toddler years';

  if (q.includes('tantrum') || q.includes('meltdown') || q.includes('crying') || q.includes('mad')) {
    return `Dearest parent, please take a gentle breath right here with me. When a little one ${childAgeLabel} has a meltdown, their logical brain is temporarily flooded by big emotions. As Willow the Fox reminds us, "A child is not giving you a hard time; they are having a hard time."

Here is a gentle 3-step co-regulation rhythm:
1. **Lower Your Posture:** Kneel down so your eyes are level with theirs. Keep your face soft and open.
2. **Name the Emotion Softly:** Say, "You really wanted the blue cup. It feels so hard when we cannot have it. I am right here with you."
3. **The Dandelion Breath:** When the crying slows slightly, hold up three fingers like dandelion petals and say, "Let's blow the fluffy seeds away together: in through the nose... soft blow out."

You are doing a beautiful job holding space for their developing heart.`;
  }

  if (q.includes('letter') || q.includes('phonics') || q.includes('read') || q.includes('literacy')) {
    return `Hello lovely parent! Pippa the Owl chirps with joy whenever parents ask about early literacy. For little ones ${childAgeLabel}, reading begins with the joy of sound, not flashcards.

Try these 3 pressure-free meadow games:
1. **Sound Safari:** As you walk through the kitchen or park, listen for sounds: "Listen to the /b/ /b/ bird!" or "Look at the /s/ /s/ sun!"
2. **Sensory Touch Letters:** Trace letter shapes with your finger in a shallow tray of cornmeal or rice, mimicking Milo Bunny's hops.
3. **Interactive Dialogic Reading:** Instead of simply reading the words on the page, ask open wonderings: "Where do you think Fawn is peeking?" or "What sound does Barnaby's bell make?"

You can also explore Pippa's Phonics Meadow right here in the app!`;
  }

  if (q.includes('math') || q.includes('count') || q.includes('number')) {
    return `Greetings from Barnaby Bear's cozy forest! In early toddlerhood, math is entirely sensory and spatial.

Here is how to weave numbers naturally into your day:
1. **One-to-One Correspondence:** Instead of rushing to count to 20, practice counting 1, 2, 3 objects by placing a finger firmly on each item.
2. **Snack Time Sorting:** "One blueberry for you, one blueberry for Barnaby Bear!" Grouping by color or shape builds foundational algebraic thinking.
3. **Staircase Steps:** Count each step as you walk upstairs together. Rhythm and physical movement help embed numerical concepts.

Keep it joyful and tactile!`;
  }

  return `Hello sweet friend! Fawn here, sending warm hugs from the Fawn & Fable meadow.

For little ones ${childAgeLabel}, the secret to deep learning is connection over perfection. When children feel safe, seen, and unhurried, their natural curiosity blossoms in literacy, math, and kindness.

Take a peek at our interactive learning games above with Pippa, Milo, Barnaby, and Willow, or put on our calming Spotify lullabies while you cuddle. How can I help you support your little explorer today?`;
}

function getFallbackLessonPlan(age: string, focus: string, duration: number) {
  return {
    title: `Meadow Wonder: ${focus} with Fawn & Friends`,
    characterGuide: focus.includes('Math') ? 'Barnaby the Bear' : focus.includes('Writing') ? 'Milo the Bunny' : focus.includes('Literacy') ? 'Pippa the Owl' : 'Willow the Fox',
    ageGroup: age,
    duration: `${duration} Minutes`,
    objective: `Sensory exploration and playful confidence in early ${focus.toLowerCase()} without performance pressure.`,
    materialsNeeded: [
      'Shallow tray with flour, oatmeal, or dry rice',
      '3-5 natural items (smooth pebbles, acorns, or wooden blocks)',
      '1 soft paint brush or colorful crayon',
      'Gentle background music from Fawn & Fable Spotify'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sensory Welcome & Wonder',
        duration: `${Math.round(duration * 0.25)} min`,
        description: 'Pour the sensory grains into the tray. Let your toddler run their fingers through, feeling the soft texture.',
        parentTip: 'Resist the urge to direct immediately. Let them enjoy the sensory feedback for 2 minutes.'
      },
      {
        stepNumber: 2,
        title: 'Guided Character Play',
        duration: `${Math.round(duration * 0.5)} min`,
        description: 'Introduce the animal friend! If writing, show Milo’s finger hops in the sensory tray. If math, count the hidden pebbles Barnaby tucked away.',
        parentTip: 'Narrate their actions with rich descriptive words: "smooth", "crunchy", "swirling", "tucking".'
      },
      {
        stepNumber: 3,
        title: 'Calm Closing & Dandelion Breath',
        duration: `${Math.round(duration * 0.25)} min`,
        description: 'Gently pack away the treasures together. Sit down and do two slow dandelion breaths with Willow the Fox.',
        parentTip: 'Praise their curiosity and effort: "You explored so joyfully today!"'
      }
    ],
    socialEmotionalTieIn: 'Willow the Fox reminds us that making mistakes in play is just discovering a new forest path.',
    spotifyMusicSuggestion: 'Fawn & Fable Morning Meadow Acoustic Playlist'
  };
}
