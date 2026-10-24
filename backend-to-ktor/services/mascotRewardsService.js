const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const MASCOT_ACCESSORIES = [
  { id: 'scarf', slot: 'neck', label: 'Pañuelo', emoji: '🧣', streakDays: 1 },
  { id: 'glasses', slot: 'eyes', label: 'Gafas', emoji: '🕶️', streakDays: 3 },
  { id: 'cap', slot: 'head', label: 'Gorro', emoji: '🧢', streakDays: 7 },
  { id: 'shirt', slot: 'shirt', label: 'Camiseta', emoji: '👕', streakDays: 14 },
  { id: 'backpack', slot: 'back', label: 'Mochila', emoji: '🎒', streakDays: 30 },
  { id: 'star', slot: 'charm', label: 'Estrella', emoji: '⭐', streakDays: 60 },
];

function sessionDateKey(session) {
  const date = new Date(session?.completedAt);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function longestStreak(sessions) {
  const dates = [...new Set(sessions.map(sessionDateKey).filter(Boolean))].sort();
  let longest = 0;
  let current = 0;
  let previous = null;

  dates.forEach((key) => {
    const date = new Date(`${key}T00:00:00`);
    const gap = previous ? (date.getTime() - previous.getTime()) / 86400000 : null;
    current = gap === 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = date;
  });

  return longest;
}

export function getMascotProgress(user, sessions = user.sessions || []) {
  const previousMascot = user.mascot || {};
  const previouslyUnlocked = Array.isArray(previousMascot.unlockedAccessoryIds)
    ? previousMascot.unlockedAccessoryIds.filter((id) => MASCOT_ACCESSORIES.some((item) => item.id === id))
    : [];
  const dates = new Set([
    ...(Array.isArray(user.learningDayKeys) ? user.learningDayKeys : []),
    ...sessions.map(sessionDateKey),
  ].filter((key) => typeof key === 'string' && DATE_KEY_PATTERN.test(key)));
  const historicalLongestStreak = Math.max(
    Number.isFinite(user.longestStreak) ? user.longestStreak : 0,
    longestStreak(sessions),
  );
  const unlockedAccessoryIds = [...new Set([
    ...previouslyUnlocked,
    ...MASCOT_ACCESSORIES
      .filter((item) => historicalLongestStreak >= item.streakDays)
      .map((item) => item.id),
  ])];
  const unlockedSet = new Set(unlockedAccessoryIds);
  const newlyUnlockedAccessoryIds = MASCOT_ACCESSORIES
    .filter((item) => unlockedSet.has(item.id) && !previouslyUnlocked.includes(item.id))
    .map((item) => item.id);

  return {
    totalLearningDays: Math.max(
      Number.isFinite(user.totalLearningDays) ? user.totalLearningDays : 0,
      dates.size,
    ),
    learningDayKeys: [...dates].sort(),
    longestStreak: historicalLongestStreak,
    mascot: {
      unlockedAccessoryIds,
      selectedAccessories: previousMascot.selectedAccessories || {},
      newlyUnlockedAccessoryIds: [...new Set([
        ...(Array.isArray(previousMascot.newlyUnlockedAccessoryIds)
          ? previousMascot.newlyUnlockedAccessoryIds
          : []),
        ...newlyUnlockedAccessoryIds,
      ])].filter((id) => unlockedSet.has(id)),
    },
  };
}

export function selectMascotAccessory(mascot = {}, slot, accessoryId) {
  if (!MASCOT_ACCESSORIES.some((item) => item.slot === slot)) {
    throw new Error('La categoría de accesorio no es válida.');
  }

  if (accessoryId !== null) {
    const accessory = MASCOT_ACCESSORIES.find((item) => item.id === accessoryId);
    if (!accessory || accessory.slot !== slot) {
      throw new Error('El accesorio no corresponde a esta categoría.');
    }
    if (!(mascot.unlockedAccessoryIds || []).includes(accessoryId)) {
      throw new Error('Desbloquea este accesorio antes de seleccionarlo.');
    }
  }

  return {
    ...mascot,
    selectedAccessories: {
      ...(mascot.selectedAccessories || {}),
      [slot]: accessoryId,
    },
  };
}
