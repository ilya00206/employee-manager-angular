import { generateId } from './generate-id';

describe('generateId', () => {
  it('should generate incremental IDs', () => {
    const firstId = generateId();
    const secondId = generateId();
    const thirdId = generateId();

    expect(secondId).toBe(firstId + 1);
    expect(thirdId).toBe(secondId + 1);
  });

  it('should generate unique IDs on consecutive calls', () => {
    const ids = new Set<number>();
    for (let i = 0; i < 10; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(10);
  });

  it('should return a number', () => {
    const id = generateId();
    expect(typeof id).toBe('number');
  });

  it('should generate positive integers', () => {
    const id = generateId();
    expect(id).toBeGreaterThan(0);
    expect(Number.isInteger(id)).toBe(true);
  });
});
