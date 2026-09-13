export interface ToddlerStreakData {
  totalStars: number;
  streakDays: number;
  badgesUnlocked: string[];
  bubblesPoppedTotal: number;
  lastPlayedDate: string;
  activitiesCompletedToday: number;
}

const STORAGE_KEY = 'fawn_fable_toddler_progress';

export function getToddlerProgress(): ToddlerStreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  return {
    totalStars: 12,
    streakDays: 3,
    badgesUnlocked: ['first_wonder', 'bubble_popper', 'word_finder'],
    bubblesPoppedTotal: 24,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    activitiesCompletedToday: 2,
  };
}

export function saveToddlerProgress(data: ToddlerStreakData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Unable to persist toddler progress', err);
  }
}

export function awardStarAndCheckBadge(badgeId?: string): ToddlerStreakData {
  const current = getToddlerProgress();
  const today = new Date().toISOString().split('T')[0];

  let streak = current.streakDays;
  if (current.lastPlayedDate !== today) {
    streak = current.streakDays + 1;
  }

  const updatedBadges = [...current.badgesUnlocked];
  if (badgeId && !updatedBadges.includes(badgeId)) {
    updatedBadges.push(badgeId);
  }

  const updated: ToddlerStreakData = {
    ...current,
    totalStars: current.totalStars + 1,
    streakDays: streak,
    badgesUnlocked: updatedBadges,
    lastPlayedDate: today,
    activitiesCompletedToday: current.activitiesCompletedToday + 1,
  };

  saveToddlerProgress(updated);
  return updated;
}
