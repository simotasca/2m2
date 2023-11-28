export function addBetween<T>(arr: T[], thing: T) {
  const result: T[] = [];
  return result.concat(...arr.map((n) => [n, thing])).slice(0, -1);
}
