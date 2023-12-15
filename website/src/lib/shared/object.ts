export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export function isEmail(email: string) {
  const match = email.match(emailRegex);
  if (!match) return false;
  return match.length > 0;
}

export function walk(obj: any, key: string) {
  if (!obj) return undefined;

  const keys = key.split(".");
  let level = { ...obj };

  for (const levelKey of keys) {
    if (!levelKey) continue;
    level = level[levelKey];
    if (!level) return null;
  }

  return level;
}
