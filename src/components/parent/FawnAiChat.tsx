import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';
import { fawnSignatureImg } from '../../data/characters';
import { sound } from '../../utils/audio';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'How do I handle 2-year-old tantrums with gentle co-regulation?',
  'Quick 5-minute phonics games with household items',
  'Gentle bedtime wind-down rhythm for an active toddler',
  'How do I encourage early pencil grasp without pressure?',
  'What should I do when my toddler screams "MINE!"?'
];

const AGE_OPTIONS = [
  '12-18 Months (Baby Explorer)',
  '18-24 Months (Curious Toddler)',
  '2-3 Years (Budding Independent)',
  '3-4 Years (Preschool Discoverer)'
];

export function FawnAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello, dearest parent! I am Fawn from Fawn & Fable.

Whether your little one is having big emotional storms, exploring their first letter sounds with Pippa, or needing a peaceful bedtime rhythm, I am right here with you. What is on your heart today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedAge, setSelectedAge] = useState(AGE_OPTIONS[2]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isLoading) return;

    sound.playPop();
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/parent-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.slice(-6),
          childAge: selectedAge,
          topic: 'Toddler Development & Gentle Parenting'
        })
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      sound.playSuccess();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      // Graceful fallback
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `Dearest parent, remember to take a slow breath. When little ones feel overwhelmed, lowering your posture and offering gentle validation creates deep safety. Try our dandelion breath with Willow the Fox above!`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-amber-200/80">
        <div className="relative">
          <img
            src={fawnSignatureImg}
            alt="Fawn AI"
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-400 shadow-md"
          />
          <span className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white" title="Online" />
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Powered by Gemini & Fawn & Fable Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Ask Fawn: Your Gentle Parenting Companion
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            A safe, non-judgmental space for parents to ask questions about early literacy, tantrums, gentle rhythms, and toddler development.
          </p>
        </div>

        {/* Age Selector */}
        <div className="flex flex-col text-right">
          <label className="text-[11px] font-bold text-stone-500 uppercase mb-1">Child's Stage:</label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="bg-white border-2 border-amber-200 rounded-xl py-1.5 px-3 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-400 shadow-xs"
          >
            {AGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="mb-6">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
          Popular Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-amber-50 border border-amber-200 text-stone-700 font-medium py-1.5 px-3 rounded-full transition-colors active:scale-95 text-left"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-amber-200/80 shadow-inner h-[380px] sm:h-[440px] overflow-y-auto space-y-4 mb-4">
        {messages.map((m, idx) => {
          const isFawn = m.role === 'assistant';
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${isFawn ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {isFawn ? (
                <img
                  src={fawnSignatureImg}
                  alt="Fawn"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-300 shrink-0 self-end"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-stone-800 text-amber-100 flex items-center justify-center text-xs font-bold shrink-0 self-end">
                  You
                </div>
              )}

              <div
                className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  isFawn
                    ? 'bg-[#FAF7F2] text-stone-800 border border-amber-200 shadow-xs whitespace-pre-line'
                    : 'bg-amber-600 text-white shadow-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[85%] animate-pulse">
            <img
              src={fawnSignatureImg}
              alt="Fawn"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border-2 border-amber-300 shrink-0 self-end"
            />
            <div className="p-4 rounded-3xl bg-[#FAF7F2] border border-amber-200 text-xs font-medium text-stone-600 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              Fawn is whispering with the meadow friends...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Fawn about bedtime routines, gentle boundaries, phonics..."
          className="flex-1 py-3.5 px-5 bg-white rounded-2xl border-2 border-stone-200 focus:border-amber-500 focus:outline-none text-sm text-stone-800 shadow-xs"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Fawn</span>
        </button>
      </form>

      <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400">
        <span>💡 Grounded in gentle parenting & Fawn & Fable Substack articles</span>
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> Fawn AI Safe Parent Space
        </span>
      </div>
    </div>
  );
}
