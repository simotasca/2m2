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