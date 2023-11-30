export function addBetween<T>(arr: T[], thing: T) {
  const result: T[] = [];
  return result.concat(...arr.map((n) => [n, thing])).slice(0, -1);
}

export function shuffle<T>(array: T[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
