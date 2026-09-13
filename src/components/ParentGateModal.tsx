import { useState, FormEvent } from 'react';
import { Lock, X, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetDescription?: string;
}

export function ParentGateModal({
  isOpen,
  onClose,
  onSuccess,
  targetDescription = 'access Parent Sanctuary'
}: ParentGateModalProps) {
  const [num1] = useState(() => Math.floor(Math.random() * 5) + 3); // 3 to 7
  const [num2] = useState(() => Math.floor(Math.random() * 4) + 2); // 2 to 5
  const [inputAnswer, setInputAnswer] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const correctAnswer = num1 + num2;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(inputAnswer, 10) === correctAnswer) {
      sound.playSuccess();
      onSuccess();
      onClose();
    } else {
      sound.playNote(220);
      setError(true);
      setInputAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-amber-200 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-800 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-stone-800 font-serif mb-1">Grown-Ups Gate</h3>
        <p className="text-stone-600 text-sm mb-6">
          To {targetDescription} and keep this a safe space for toddlers, please solve this quick problem:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-3xl font-bold text-amber-900 tracking-wider font-mono">
            {num1} + {num2} = ?
          </div>

          <input
            type="number"
            autoFocus
            value={inputAnswer}
            onChange={(e) => {
              setError(false);
              setInputAnswer(e.target.value);
            }}
            placeholder="Answer"
            className="w-full text-center text-2xl font-bold py-3 px-4 rounded-xl border-2 border-stone-300 focus:border-amber-500 focus:outline-none bg-white text-stone-800"
          />

          {error && (
            <p className="text-rose-600 text-sm font-medium">
              Oops! Try calculating again, sweet parent.
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-600 font-medium hover:bg-stone-100 transition-colors"
            >
              Back to Play
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Check className="w-5 h-5" /> Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
