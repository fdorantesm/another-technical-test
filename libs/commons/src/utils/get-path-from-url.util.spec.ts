import { getPathFromUrl } from './get-path-from-url.util';

describe('Util: getPathFromUrl()', () => {
  it('should return a path from an url', () => {
    const path = getPathFromUrl('https://nestjs.com/docs/get-started');
    expect(path).toBe('docs/get-started');
  });
});
