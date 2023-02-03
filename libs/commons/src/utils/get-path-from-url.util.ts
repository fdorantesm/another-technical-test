export function getPathFromUrl(url: string): string {
  const path = url.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '');

  return path;
}
