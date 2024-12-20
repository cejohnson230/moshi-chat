export const extractUrls = (text: string): string[] => {
  const urlRegex = /<(https?:\/\/[^\s>]+)>/g;
  const matches = [...text.matchAll(urlRegex)];
  return matches.map(match => match[1]);
}; 