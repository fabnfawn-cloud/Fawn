import confetti from 'canvas-confetti';

export function fireCelebrationConfetti(opts?: confetti.Options) {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f43f5e'],
      ...opts,
    });
  } catch (err) {
    console.debug('Confetti disabled or not supported', err);
  }
}

export function fireSparkleBurst(xNormalized = 0.5, yNormalized = 0.5) {
  try {
    confetti({
      particleCount: 30,
      spread: 50,
      startVelocity: 25,
      ticks: 120,
      origin: { x: xNormalized, y: yNormalized },
      colors: ['#fbbf24', '#f472b6', '#38bdf8', '#34d399', '#c084fc'],
      shapes: ['star', 'circle'],
    });
  } catch (err) {
    console.debug('Confetti burst err', err);
  }
}
