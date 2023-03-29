const { it, describe, expect } = require('@jest/globals');

const sum = (a, b) => a - b;

describe('sum()', () => {
  it('should sum is sum', () => {
    //  Подготовка
    const line = sum(1, 2);
    const expected = 3;
    // Действие
    const result = sum(line);
    // Сверка
    expect(sum(1, 2)).toBe(expected);
  });
});
