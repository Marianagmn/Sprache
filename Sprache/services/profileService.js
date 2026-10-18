export function updateProfile(user, changes) {
  return {
    ...user,
    ...changes,
    preferences: changes.preferences
      ? { ...user.preferences, ...changes.preferences }
      : user.preferences,
    name: changes.name?.trim() || user.name,
  };
}

