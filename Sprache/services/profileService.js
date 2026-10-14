export function updateProfile(user, changes) {
  return {
    ...user,
    ...changes,
    name: changes.name?.trim() || user.name,
  };
}

