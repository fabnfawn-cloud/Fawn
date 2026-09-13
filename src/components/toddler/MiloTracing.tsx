import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { Eraser, Trash2, Sparkles, Volume2, Check } from 'lucide-react';
import { TRACING_TEMPLATES, TracingTemplate } from '../../data/characters';
import miloImg from '../../assets/images/milo_bunny_1789229899628.jpg';
import { sound } from '../../utils/audio';
import { fireSparkleBurst, fireCelebrationConfetti } from '../../utils/confetti';
import { awardStarAndCheckBadge } from '../../utils/toddlerStorage';

const CRAYON_COLORS = [
  { name: 'Honey Amber', value: '#D97706', bgClass: 'bg-amber-500' },
  { name: 'Clover Green', value: '#059669', bgClass: 'bg-emerald-600' },
  { name: 'Sky Blue', value: '#2563EB', bgClass: 'bg-blue-600' },
  { name: 'Berry Violet', value: '#7C3AED', bgClass: 'bg-purple-600' },
  { name: 'Sunset Rose', value: '#E11D48', bgClass: 'bg-rose-500' },
];

export function MiloTracing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TracingTemplate>(TRACING_TEMPLATES[0]);
  const [selectedColor, setSelectedColor] = useState(CRAYON_COLORS[0].value);
  const [brushWidth, setBrushWidth] = useState(16);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  // Clear and redraw background guide when template changes
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
  };

  useEffect(() => {
    clearCanvas();
  }, [selectedTemplate]);

  // Coordinate helpers for touch & mouse
  const getCoordinates = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushWidth;

    sound.playPop();
  };

  const draw = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    setStrokeCount((c) => c + 1);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (strokeCount > 18) {
      sound.playSuccess();
      sound.speak(`Wonderful doodle with Milo! You earned a shiny star!`, 'milo');
      fireSparkleBurst(0.5, 0.5);
      awardStarAndCheckBadge('master_tracer');
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm">
      {/* Milo Header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-emerald-100">
        <div className="relative">
          <img
            src={miloImg}
            alt="Milo the Bunny"
            referrerPolicy="no-referrer"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-emerald-300 shadow-md transform rotate-2"
          />
          <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
            Writing Guide
          </span>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Early Writing & Fine Motor Tracing
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Milo’s Tracing & Drawing Meadow
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Grab a chunky crayon and trace joyful letters, numbers, and shapes with Milo Bunny!
          </p>
        </div>

        <button
          onClick={() => {
            sound.speak(selectedTemplate.instruction, 'milo');
          }}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-300 shadow-xs"
        >
          <Volume2 className="w-4 h-4" /> Milo's Voice Tip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Template Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Choose What to Trace:
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {TRACING_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTemplate(tmpl);
                    sound.speak(`Let's trace ${tmpl.title}!`, 'milo');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-100 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                      : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                  }`}
                >
                  <span className="text-3xl font-black font-serif text-emerald-900 mb-1">
                    {tmpl.symbol}
                  </span>
                  <span className="text-xs font-bold text-stone-700">
                    {tmpl.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Toddler Crayon Palette */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs mt-4">
            <h4 className="text-xs font-bold text-stone-600 mb-3">Choose Crayon Color:</h4>
            <div className="flex items-center justify-between gap-2">
              {CRAYON_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    sound.playPop();
                    setSelectedColor(c.value);
                  }}
                  className={`w-10 h-10 rounded-full ${c.bgClass} flex items-center justify-center text-white transition-all transform ${
                    selectedColor === c.value ? 'scale-110 ring-4 ring-emerald-300 shadow-md' : 'hover:scale-105'
                  }`}
                  title={c.name}
                  aria-label={c.name}
                >
                  {selectedColor === c.value && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>

            {/* Brush Width */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">Crayon Size:</span>
              <div className="flex gap-2">
                {[10, 16, 24].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setBrushWidth(sz)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      brushWidth === sz ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {sz === 10 ? 'Small' : sz === 16 ? 'Medium' : 'Chunky'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tracing Canvas Area */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full bg-amber-50/70 border border-amber-200 rounded-2xl p-3 mb-3 text-center text-xs font-semibold text-amber-900 font-serif">
            💡 {selectedTemplate.instruction}
          </div>

          <div className="relative w-full max-w-[420px] aspect-square bg-white rounded-3xl border-4 border-emerald-300 shadow-lg overflow-hidden touch-none select-none">
            {/* Background Template Ghost Graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
              <span className="text-[200px] font-serif font-black text-emerald-900 leading-none">
                {selectedTemplate.symbol}
              </span>
            </div>

            {/* Dotted reference line guides */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 300 300">
              {selectedTemplate.dots.map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.x} cy={dot.y} r="8" fill="#059669" />
                  {dot.label && (
                    <text x={dot.x + 10} y={dot.y + 5} fontSize="14" fontWeight="bold" fill="#064E3B">
                      {dot.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* User Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={360}
              height={360}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full relative z-10 cursor-crosshair"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4 w-full max-w-[420px]">
            <button
              onClick={() => {
                sound.playPop();
                clearCanvas();
              }}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-stone-50 border-2 border-stone-200 rounded-2xl text-xs font-bold text-stone-700 flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
            >
              <Eraser className="w-4 h-4 text-emerald-600" /> Clear Trace
            </button>

            <button
              onClick={() => {
                sound.playSuccess();
                sound.speak(`Super job tracing ${selectedTemplate.title} with Milo!`, 'milo');
              }}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> I Did It!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
