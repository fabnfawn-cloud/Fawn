import fawnSignatureImg from '../assets/images/fawn_signature_1789231315960.jpg';
import fawnBubbleForestImg from '../assets/images/fawn_bubble_forest_1789231336282.jpg';
import fawnBeachImg from '../assets/images/fawn_beach_1789231353038.jpg';
import fawnDragonImg from '../assets/images/fawn_dragon_1789231373246.jpg';
import pippaImg from '../assets/images/pippa_owl_1789229889402.jpg';
import miloImg from '../assets/images/milo_bunny_1789229899628.jpg';
import barnabyImg from '../assets/images/barnaby_bear_1789229877348.jpg';
import willowImg from '../assets/images/willow_fox_1789229913173.jpg';

export {
  fawnSignatureImg,
  fawnBubbleForestImg,
  fawnBeachImg,
  fawnDragonImg
};

export interface Character {
  id: string;
  name: string;
  species: string;
  title: string;
  domain: 'Brand Guide & AI' | 'Literacy & Phonics' | 'Writing & Tracing' | 'Math & Counting' | 'Social-Emotional';
  tagline: string;
  greeting: string;
  themeColor: string;
  badgeBg: string;
  borderColor: string;
  bgGradient: string;
  image: string;
  skills: string[];
}

export const CHARACTERS: Character[] = [
  {
    id: 'fawn',
    name: 'Fawn',
    species: 'Storybook Wonder Fawn',
    title: 'Brand Guide & Playful Mentor',
    domain: 'Brand Guide & AI',
    tagline: 'Heart of Fawn & Fable, welcoming every little explorer.',
    greeting: "Hello sweet friend! Welcome to our joyful world of storybooks, games, and wonder.",
    themeColor: '#059669',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    borderColor: 'border-emerald-400',
    bgGradient: 'from-emerald-50 via-pink-50 to-amber-50',
    image: fawnSignatureImg,
    skills: ['Storybook Adventures', 'Parent Coaching', 'Bedtime Rituals', 'Interactive Wonder']
  },
  {
    id: 'pippa',
    name: 'Pippa the Owl',
    species: 'Curious Story Owlet',
    title: 'Early Literacy & Phonics Guide',
    domain: 'Literacy & Phonics',
    tagline: 'Singing letter sounds and opening enchanting storybooks.',
    greeting: "Hoo-hoo! Let's listen to the soft sounds letters make in the quiet forest.",
    themeColor: '#8B5CF6',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    borderColor: 'border-purple-400',
    bgGradient: 'from-purple-50/80 via-indigo-50/50 to-purple-100/50',
    image: pippaImg,
    skills: ['Letter Sounds (Phonics)', 'Rhyme Recognition', 'First Story Words', 'Listening Games']
  },
  {
    id: 'milo',
    name: 'Milo the Bunny',
    species: 'Playful Meadow Bunny',
    title: 'Writing, Shapes & Fine Motor Guide',
    domain: 'Writing & Tracing',
    tagline: 'Hopping crayons, swirling lines, and joyful finger tracing.',
    greeting: "Hop, swirl, and doodle! Tracing shapes and letters is as fun as a bunny hop!",
    themeColor: '#10B981',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    borderColor: 'border-emerald-400',
    bgGradient: 'from-emerald-50/80 via-teal-50/50 to-emerald-100/50',
    image: miloImg,
    skills: ['Line & Loop Tracing', 'Letter Formation', 'Shape Drawing', 'Pencil Grasp Confidence']
  },
  {
    id: 'barnaby',
    name: 'Barnaby the Bear',
    species: 'Cuddly Forest Bear',
    title: 'Toddler Math & Counting Guide',
    domain: 'Math & Counting',
    tagline: 'Counting wild blackberries and sorting wooden forest blocks.',
    greeting: "Warm bear hugs! Let's count our favorite forest treasures together: one, two, three!",
    themeColor: '#3B82F6',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    borderColor: 'border-blue-400',
    bgGradient: 'from-blue-50/80 via-sky-50/50 to-blue-100/50',
    image: barnabyImg,
    skills: ['Number Counting (1-10)', 'Shape Sorting', 'More or Less', 'Pattern Matching']
  },
  {
    id: 'willow',
    name: 'Willow the Fox',
    species: 'Mindful Woodland Fox',
    title: 'Social-Emotional & Calming Guide',
    domain: 'Social-Emotional',
    tagline: 'Understanding big feelings with deep dandelion breaths.',
    greeting: "It is okay to feel big feelings. Let's take a calm, gentle breath together.",
    themeColor: '#F97316',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    borderColor: 'border-rose-400',
    bgGradient: 'from-rose-50/80 via-orange-50/50 to-rose-100/50',
    image: willowImg,
    skills: ['Naming Big Emotions', 'Dandelion Breathing', 'Kindness & Empathy', 'Calm-Down Strategies']
  }
];

export interface FawnAdventure {
  id: 'meadow-rainbow' | 'bubble-forest' | 'ocean-beach' | 'dragon-lantern';
  title: string;
  badge: string;
  outfit: string;
  image: string;
  headline: string;
  storySnippet: string;
  voiceLine: string;
  themeGradient: string;
  accentBorder: string;
  pillColor: string;
  buttonColor: string;
  interactiveProps: Array<{
    id: string;
    name: string;
    emoji: string;
    soundType: 'glissando' | 'pop' | 'boing' | 'giggle' | 'splash' | 'chime';
    speech: string;
    effectText: string;
  }>;
}

export const FAWN_ADVENTURES: FawnAdventure[] = [
  {
    id: 'meadow-rainbow',
    title: 'Rainbow Meadow Party',
    badge: 'Signature Storybook Look',
    outfit: 'Mint Cardigan, Pink Pleated Skirt & Star Bow',
    image: fawnSignatureImg,
    headline: 'Dancing in the Sunlit Rainbow Meadow',
    storySnippet: 'Fawn puts on her cozy mint knit sweater and favorite pink dress to celebrate sunny days with wildflowers, gentle rainbows, and floating love hearts!',
    voiceLine: "Hello friend! Look at our beautiful rainbow! Let's dance among the sunny flowers!",
    themeGradient: 'from-emerald-50 via-pink-50 to-amber-50',
    accentBorder: 'border-emerald-300',
    pillColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    interactiveProps: [
      { id: 'rainbow', name: 'Pastel Rainbow', emoji: '🌈', soundType: 'glissando', speech: 'Look at the sparkling rainbow in the sky!', effectText: 'Rainbow Magic!' },
      { id: 'daisy', name: 'Meadow Daisies', emoji: '🌼', soundType: 'giggle', speech: 'Tickle tickle, sweet daisy petals!', effectText: 'Flower Giggle!' },
      { id: 'heart', name: 'Floating Heart', emoji: '💖', soundType: 'boing', speech: 'So much love in our meadow!', effectText: 'Sweet Love!' },
      { id: 'starbow', name: 'Fawn’s Star Bow', emoji: '⭐', soundType: 'glissando', speech: 'Twinkle twinkle on Fawn’s bow!', effectText: 'Star Twinkle!' }
    ]
  },
  {
    id: 'bubble-forest',
    title: 'Blueberry Bubble Forest',
    badge: 'Autumn Magic Adventure',
    outfit: 'Royal White Pleated Dress & Golden Bow',
    image: fawnBubbleForestImg,
    headline: 'Reaching for Magical Shimmering Bubbles',
    storySnippet: 'In the golden autumn woods, floating soap bubbles carry sweet wild blueberries and glowing stardust trails right to Fawn!',
    voiceLine: "Ooh! A giant floating bubble! Can you help me pop the bubbles and gather sweet berries?",
    themeGradient: 'from-amber-50 via-orange-50 to-amber-100',
    accentBorder: 'border-amber-300',
    pillColor: 'bg-amber-100 text-amber-900 border-amber-300',
    buttonColor: 'bg-amber-500 hover:bg-amber-600 text-white',
    interactiveProps: [
      { id: 'bubble', name: 'Magic Soap Bubble', emoji: '🫧', soundType: 'pop', speech: 'Pop! Blueberries for everyone!', effectText: 'Bubble Pop!' },
      { id: 'berries', name: 'Wild Blueberries', emoji: '🫐', soundType: 'chime', speech: 'Yum! Sweet ripe berries!', effectText: 'Yummy Treat!' },
      { id: 'leaves', name: 'Golden Autumn Leaf', emoji: '🍂', soundType: 'boing', speech: 'Crunchy golden oak leaves dancing down!', effectText: 'Leaf Flutter!' },
      { id: 'goldbow', name: 'Golden Ribbon Bow', emoji: '✨', soundType: 'glissando', speech: 'Shiny golden bow sparkles!', effectText: 'Golden Shimmer!' }
    ]
  },
  {
    id: 'ocean-beach',
    title: 'Sparkling Ocean Beach',
    badge: 'Sunny Seaside Day',
    outfit: 'Mint Cardigan & Teal Bow with Seafoam',
    image: fawnBeachImg,
    headline: 'Splashing in Turquoise Waves & Stardust',
    storySnippet: 'The gentle tide tickles Fawn’s hooves with sea foam, while spiral rings of stardust and colorful seashells sparkle along the warm golden sand.',
    voiceLine: "Splash! The water is warm and gentle! Let's listen to the singing sea shells!",
    themeGradient: 'from-sky-50 via-teal-50 to-amber-50',
    accentBorder: 'border-teal-300',
    pillColor: 'bg-teal-100 text-teal-800 border-teal-300',
    buttonColor: 'bg-teal-500 hover:bg-teal-600 text-white',
    interactiveProps: [
      { id: 'wave', name: 'Crystal Ocean Wave', emoji: '🌊', soundType: 'splash', speech: 'Whoosh! Cool ocean wave rolls in!', effectText: 'Wave Splash!' },
      { id: 'shell', name: 'Spiral Seashell', emoji: '🐚', soundType: 'chime', speech: 'Listen close... you can hear the ocean song!', effectText: 'Ocean Song!' },
      { id: 'stardust', name: 'Magic Sparkle Ring', emoji: '✨', soundType: 'glissando', speech: 'Twirling in sparkling stardust!', effectText: 'Stardust Swirl!' },
      { id: 'hibiscus', name: 'Pink Beach Hibiscus', emoji: '🌺', soundType: 'giggle', speech: 'A fragrant tropical flower!', effectText: 'Sweet Bloom!' }
    ]
  },
  {
    id: 'dragon-lantern',
    title: 'Episode 2: The Dragon’s Lantern',
    badge: 'Storybook Fairytale Quest',
    outfit: 'Explorer Tunic with Cherry Blossom',
    image: fawnDragonImg,
    headline: 'Lantern Festival with our Dragon Friend',
    storySnippet: 'Under a twilight starry sky filled with floating lanterns, Fawn and her gentle, smiling golden dragon friend light the way for all meadow companions.',
    voiceLine: "Our dragon friend has the warmest smile! Let's lift our glowing lantern to the stars!",
    themeGradient: 'from-indigo-50 via-purple-50 to-amber-50',
    accentBorder: 'border-purple-300',
    pillColor: 'bg-purple-100 text-purple-800 border-purple-300',
    buttonColor: 'bg-purple-500 hover:bg-purple-600 text-white',
    interactiveProps: [
      { id: 'lantern', name: 'Glowing Paper Lantern', emoji: '🏮', soundType: 'chime', speech: 'Warm glowing light shines in the night!', effectText: 'Lantern Glow!' },
      { id: 'dragon', name: 'Friendly Golden Dragon', emoji: '🐉', soundType: 'giggle', speech: 'The dragon gives a happy friendly purr!', effectText: 'Dragon Friend!' },
      { id: 'blossom', name: 'Pink Cherry Blossom', emoji: '🌸', soundType: 'glissando', speech: 'Soft flower petals drift on the evening breeze.', effectText: 'Petal Dance!' },
      { id: 'skylantern', name: 'Floating Sky Lantern', emoji: '✨', soundType: 'pop', speech: 'Up, up into the stars it floats!', effectText: 'Float to Stars!' }
    ]
  }
];

export interface PhonicsCard {
  letter: string;
  sound: string;
  word: string;
  iconEmoji: string;
  rhyme: string;
  sentence: string;
}

export const PHONICS_CARDS: PhonicsCard[] = [
  { letter: 'A', sound: '/æ/ as in Acorn', word: 'Acorn', iconEmoji: '🌰', rhyme: 'An acorn falls from high in the tree!', sentence: 'A little acorn grows into a mighty oak.' },
  { letter: 'B', sound: '/b/ as in Bear', word: 'Barnaby Bear', iconEmoji: '🐻', rhyme: 'Bouncy big bear Barnaby smiles bright!', sentence: 'Barnaby loves gathering sweet blueberries.' },
  { letter: 'C', sound: '/k/ as in Clover', word: 'Clover', iconEmoji: '☘️', rhyme: 'Crisp green clover in the sunny morning light.', sentence: 'Fawn nibbles a sweet four-leaf clover.' },
  { letter: 'D', sound: '/d/ as in Deer', word: 'Deer Fawn', iconEmoji: '🦌', rhyme: 'Dancing deer dashing through the dew.', sentence: 'Our gentle Fawn greets every friend.' },
  { letter: 'E', sound: '/ɛ/ as in Elm', word: 'Elm Tree', iconEmoji: '🌳', rhyme: 'Early sun glows on the tall elm boughs.', sentence: 'The elm tree gives shade to all forest friends.' },
  { letter: 'F', sound: '/f/ as in Fable', word: 'Fable Book', iconEmoji: '📖', rhyme: 'Fables tell wonders of bravery and grace.', sentence: 'Every fable holds a warm lesson.' },
  { letter: 'G', sound: '/ɡ/ as in Garden', word: 'Garden', iconEmoji: '🌻', rhyme: 'Growing golden sunflowers in our plot.', sentence: 'The garden smells like honey and summer rain.' },
  { letter: 'H', sound: '/h/ as in Honey', word: 'Honey', iconEmoji: '🍯', rhyme: 'Happy buzzing bees make honey golden sweet.', sentence: 'Barnaby licks sweet clover honey from a wooden spoon.' },
  { letter: 'M', sound: '/m/ as in Milo', word: 'Milo Bunny', iconEmoji: '🐰', rhyme: 'Milo makes magical marks with his crayon!', sentence: 'Milo hops happily across the page.' },
  { letter: 'O', sound: '/ɒ/ as in Owl', word: 'Owl Pippa', iconEmoji: '🦉', rhyme: 'Owlet Pippa reads under the starry night.', sentence: 'Pippa turns the soft page of a bedtime tale.' },
  { letter: 'S', sound: '/s/ as in Sun', word: 'Sunny Day', iconEmoji: '☀️', rhyme: 'Sunbeams shine softly on sleeping animals.', sentence: 'The warm sun kisses our cheeks.' },
  { letter: 'W', sound: '/w/ as in Willow', word: 'Willow Fox', iconEmoji: '🦊', rhyme: 'Wise Willow whispers warm words of peace.', sentence: 'Willow breathes slowly with the dandelion seeds.' }
];

export interface TracingTemplate {
  id: string;
  title: string;
  type: 'letter' | 'number' | 'shape';
  symbol: string;
  instruction: string;
  dots: Array<{ x: number; y: number; label?: string }>;
}

export const TRACING_TEMPLATES: TracingTemplate[] = [
  {
    id: 'letter-a',
    title: 'Letter A',
    type: 'letter',
    symbol: 'A',
    instruction: 'Start at top, slide down left, down right, then cross the bridge!',
    dots: [
      { x: 150, y: 50, label: '1' },
      { x: 70, y: 250, label: '2' },
      { x: 150, y: 50 },
      { x: 230, y: 250, label: '3' },
      { x: 105, y: 170, label: '4' },
      { x: 195, y: 170 }
    ]
  },
  {
    id: 'letter-b',
    title: 'Letter B',
    type: 'letter',
    symbol: 'B',
    instruction: 'Straight line down, then two round happy bellies!',
    dots: [
      { x: 90, y: 50, label: '1' },
      { x: 90, y: 250, label: '2' },
      { x: 90, y: 50 },
      { x: 190, y: 100 },
      { x: 90, y: 150, label: '3' },
      { x: 200, y: 200 },
      { x: 90, y: 250 }
    ]
  },
  {
    id: 'number-1',
    title: 'Number 1',
    type: 'number',
    symbol: '1',
    instruction: 'Number 1 is like a stick, a straight line down and very quick!',
    dots: [
      { x: 120, y: 80, label: '1' },
      { x: 150, y: 50, label: '2' },
      { x: 150, y: 250, label: '3' }
    ]
  },
  {
    id: 'number-2',
    title: 'Number 2',
    type: 'number',
    symbol: '2',
    instruction: 'Around and back on the railroad track! Choo choo!',
    dots: [
      { x: 90, y: 90, label: '1' },
      { x: 150, y: 50 },
      { x: 200, y: 90 },
      { x: 90, y: 250, label: '2' },
      { x: 210, y: 250, label: '3' }
    ]
  },
  {
    id: 'shape-circle',
    title: 'Round Sun Circle',
    type: 'shape',
    symbol: '○',
    instruction: 'Around we go, like a big yellow sun or a merry berry!',
    dots: [
      { x: 150, y: 50, label: 'Start' },
      { x: 250, y: 150 },
      { x: 150, y: 250 },
      { x: 50, y: 150 },
      { x: 150, y: 50, label: 'Finish' }
    ]
  },
  {
    id: 'shape-star',
    title: 'Twinkling Star',
    type: 'shape',
    symbol: '⭐',
    instruction: 'Up like a mountain, down, cross over, across, and back down!',
    dots: [
      { x: 150, y: 40, label: '1' },
      { x: 180, y: 120 },
      { x: 260, y: 130 },
      { x: 200, y: 180 },
      { x: 220, y: 260 },
      { x: 150, y: 210 },
      { x: 80, y: 260 },
      { x: 100, y: 180 },
      { x: 40, y: 130 },
      { x: 120, y: 120 }
    ]
  }
];

export interface MathChallenge {
  id: string;
  targetCount: number;
  itemEmoji: string;
  itemName: string;
  prompt: string;
  color: string;
}

export const MATH_CHALLENGES: MathChallenge[] = [
  { id: 'berries', targetCount: 3, itemEmoji: '🫐', itemName: 'sweet blueberries', prompt: 'Barnaby wants 3 sweet blueberries for breakfast!', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'acorns', targetCount: 4, itemEmoji: '🌰', itemName: 'crunchy acorns', prompt: 'Help Barnaby tuck 4 crunchy acorns into the tree hollow!', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { id: 'apples', targetCount: 2, itemEmoji: '🍎', itemName: 'red forest apples', prompt: 'Pick 2 crisp red apples to share with Milo Bunny!', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'leaves', targetCount: 5, itemEmoji: '🍂', itemName: 'golden autumn leaves', prompt: 'Count 5 golden leaves floating gently in the autumn breeze!', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { id: 'flowers', targetCount: 1, itemEmoji: '🌸', itemName: 'meadow wildflower', prompt: 'Find 1 special wildflower garland for baby Fawn!', color: 'text-pink-600 bg-pink-50 border-pink-200' }
];

export interface FeelingCard {
  id: string;
  name: string;
  emoji: string;
  description: string;
  willowAdvice: string;
  colorBg: string;
  borderColor: string;
  textColor: string;
}

export const FEELING_CARDS: FeelingCard[] = [
  {
    id: 'joyful',
    name: 'Joyful & Happy',
    emoji: '☀️',
    description: 'My heart feels warm and bubbly like sunlight through the leaves.',
    willowAdvice: 'Celebrate this sunshine! Share a warm hug or dance a silly hop with Milo.',
    colorBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-900'
  },
  {
    id: 'calm',
    name: 'Calm & Peaceful',
    emoji: '🍃',
    description: 'Soft like moss and quiet like a sleeping deer under the trees.',
    willowAdvice: 'Enjoy this peaceful space. Listen to the gentle rustle of the forest leaves.',
    colorBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-900'
  },
  {
    id: 'frustrated',
    name: 'Frustrated / Mad',
    emoji: '🌋',
    description: 'My body feels tight and hot like a little volcano rumbling.',
    willowAdvice: 'It is okay to be frustrated. Let us blow out the volcano with a big, slow breath together.',
    colorBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-900'
  },
  {
    id: 'sad',
    name: 'Sad or Lonely',
    emoji: '🌧️',
    description: 'Like a gentle rain cloud passing overhead. Heavy and quiet.',
    willowAdvice: 'Even rain helps flowers grow. Fawn sits softly beside you. You are loved.',
    colorBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-900'
  },
  {
    id: 'excited',
    name: 'Bouncy & Excited',
    emoji: '⭐',
    description: 'Feet want to jump and hands want to clap! Full of energy!',
    willowAdvice: 'Shake your paws like a bear, then take one slow breath to center your wonder.',
    colorBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-900'
  }
];

export interface SubstackArticle {
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  excerpt: string;
  url: string;
}

export const SUBSTACK_ARTICLES: SubstackArticle[] = [
  {
    title: 'Gentle Rhythms: Why Toddlers Thrive on Unhurried Mornings',
    subtitle: 'Replacing rushing with connection, sensory breakfast routines, and natural curiosity.',
    readTime: '4 min read',
    category: 'Daily Rhythms',
    excerpt: 'When we slow down our morning transition, toddler tantrums decrease by over 60%. A simple song and visual flow chart creates calm stability.',
    url: 'https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1'
  },
  {
    title: 'Phonics in the Meadow: How Nature Walks Unlock Early Reading',
    subtitle: 'From spotting the letter S in a winding twig to alliteration games with birds.',
    readTime: '5 min read',
    category: 'Early Literacy',
    excerpt: 'Before children ever hold a pencil, their ears tune into the rhythm of spoken language. Discover our favorite auditory games.',
    url: 'https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1'
  },
  {
    title: 'The Calming Burrow: Navigating the 2-Year-Old Emotional Storm',
    subtitle: 'Co-regulation techniques grounded in attachment and gentle storytelling.',
    readTime: '6 min read',
    category: 'Social-Emotional',
    excerpt: 'Children do not give us a hard time; they are having a hard time. Willow the Fox teaches us how to hold space without escalating.',
    url: 'https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1'
  },
  {
    title: 'Playful Math with Pinecones & Stones',
    subtitle: 'Tactile early numeracy that builds spatial reasoning without worksheets.',
    readTime: '4 min read',
    category: 'Math & Logic',
    excerpt: 'Barnaby Bear reminds us that one-to-one correspondence is best learned when little fingers can touch, stack, and group real treasures.',
    url: 'https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1'
  }
];

export interface StoreItem {
  id: string;
  title: string;
  price: string;
  tag: string;
  description: string;
  imagePlaceholderColor: string;
  iconEmoji: string;
  url: string;
}

export const FAWN_AND_FABLE_ADS: StoreItem[] = [
  {
    id: 'plush-fawn',
    title: 'Fawn Heirloom Plush & Story Keepsake',
    price: '$34.00',
    tag: 'Bestseller',
    description: 'Handmade organic cotton baby deer companion with wildflower clover wreath, weighted with sensory glass beads for calming comfort.',
    imagePlaceholderColor: 'bg-amber-100 border-amber-300 text-amber-800',
    iconEmoji: '🦌',
    url: 'https://fawnandfable.store'
  },
  {
    id: 'wooden-alphabet',
    title: 'Meadow Wooden Phonics & Tracing Blocks',
    price: '$42.00',
    tag: 'Early Literacy',
    description: 'FSC-certified beechwood blocks with tactile carved letter grooves for finger tracing, matching animal illustrations, and storage pouch.',
    imagePlaceholderColor: 'bg-purple-100 border-purple-300 text-purple-800',
    iconEmoji: '🔤',
    url: 'https://fawnandfable.store'
  },
  {
    id: 'feelings-journal',
    title: 'Willow’s Calm & Cozy Feelings Deck',
    price: '$22.00',
    tag: 'Emotional Wellness',
    description: '24 illustrated mindfulness and emotion affirmation cards designed for toddler hands, including the dandelion breath sequence.',
    imagePlaceholderColor: 'bg-rose-100 border-rose-300 text-rose-800',
    iconEmoji: '🌸',
    url: 'https://fawnandfable.store'
  },
  {
    id: 'bedtime-bundle',
    title: 'The Fawn & Fable Storybook Collection',
    price: '$48.00',
    tag: 'Bedtime Library',
    description: 'Hardcover keepsake volume containing 12 soothing woodland stories paired with Spotify lullaby QR codes for peaceful sleep.',
    imagePlaceholderColor: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    iconEmoji: '📚',
    url: 'https://fawnandfable.store'
  }
];

export interface DriveVideo {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  category: 'Storytime' | 'Phonics Song' | 'Math Play' | 'Calm Breathing';
  description: string;
  drivePreviewUrl: string;
  thumbnailColor: string;
}

export const CURATED_DRIVE_VIDEOS: DriveVideo[] = [
  {
    id: 'video-1',
    title: 'Fawn’s First Morning: A Gentle Storytime',
    narrator: 'Fawn & Fable Studio',
    duration: '4:15',
    category: 'Storytime',
    description: 'Join baby Fawn waking up in the dew-kissed meadow and meeting Barnaby Bear and Milo Bunny.',
    drivePreviewUrl: 'https://drive.google.com/file/d/1preview-fawn-story/preview',
    thumbnailColor: 'from-amber-400 to-orange-300'
  },
  {
    id: 'video-2',
    title: 'Pippa’s Phonics Forest Sing-Along',
    narrator: 'Pippa the Owl',
    duration: '3:30',
    category: 'Phonics Song',
    description: 'Chant letter sounds with owl melodies, rhythmic claps, and forest animals.',
    drivePreviewUrl: 'https://drive.google.com/file/d/2preview-pippa-phonics/preview',
    thumbnailColor: 'from-purple-400 to-indigo-300'
  },
  {
    id: 'video-3',
    title: 'Counting Blackberry Baskets with Barnaby',
    narrator: 'Barnaby Bear',
    duration: '5:10',
    category: 'Math Play',
    description: 'Tactile counting from 1 to 5 with Barnaby in the sunlit berry patch.',
    drivePreviewUrl: 'https://drive.google.com/file/d/3preview-barnaby-count/preview',
    thumbnailColor: 'from-blue-400 to-cyan-300'
  },
  {
    id: 'video-4',
    title: 'Willow’s Dandelion Breath: Calm Down Corner',
    narrator: 'Willow the Fox',
    duration: '3:00',
    category: 'Calm Breathing',
    description: 'Guided co-regulation breathing for toddlers processing big emotions or preparing for naptime.',
    drivePreviewUrl: 'https://drive.google.com/file/d/4preview-willow-breath/preview',
    thumbnailColor: 'from-rose-400 to-amber-300'
  }
];
