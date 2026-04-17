import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('helpers', () => {
    it('formats a number as USD currency', () => {
        expect(formatPrice(12.5)).toBe('$12.50');
    });

    it('calculates total from price and quantity items', () => {
        expect(calculateTotal([
            { price: 10, quantity: 2 },
            { price: 1.5, quantity: 4 }
        ])).toBe(26);
    });

    it('returns zero for empty item list', () => {
        expect(calculateTotal([])).toBe(0);
    });

    it('validates well-formed email and rejects invalid values', () => {
        expect(validateEmail('admin@example.com')).toBe(true);
        expect(validateEmail('adminexample.com')).toBe(false);
        expect(validateEmail('admin@')).toBe(false);
    });
});
