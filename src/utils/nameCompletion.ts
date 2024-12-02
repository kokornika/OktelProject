const nameMap: Record<string, string> = {
  m: 'Máté',
  s: 'Szabi',
  a: 'Attila',
  c: 'Csabi',
  g: 'Gyuszi',
  f: 'Feri',
  n: 'Norbi',
  v: 'Viktor',
  l: 'Lajos',
  va: 'Varga Zoltán',
  ve: 'Vecsei Zoltán'
};

export function expandNameShortcut(input: string): string {
  // Match pattern: number followed by one or two letters at the end of input
  const match = input.match(/(\d+)([a-zA-Z]{1,2})$/);
  
  if (match) {
    const [fullMatch, number, letter] = match;
    const name = nameMap[letter.toLowerCase()];
    
    if (name) {
      // Replace the shortcut with the expanded name
      return input.slice(0, input.length - fullMatch.length) + `${number} ${name}`;
    }
  }
  
  return input;
}