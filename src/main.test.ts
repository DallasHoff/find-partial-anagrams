import { describe, expect, it } from 'vitest';
import { findPartialAnagrams, isChar } from './main';
import words from './word-list';

describe('isChar', () => {
	it('should validate input characters', () => {
		expect(isChar('a')).toBe(true);
		expect(isChar('A')).toBe(true);
		expect(isChar('x')).toBe(true);
		expect(isChar('?')).toBe(true);
		expect(isChar('')).toBe(false);
		expect(isChar(' ')).toBe(false);
		expect(isChar('x ')).toBe(false);
		expect(isChar('xx')).toBe(false);
		expect(isChar('3')).toBe(false);
		expect(isChar(3)).toBe(false);
		expect(isChar(null)).toBe(false);
		expect(isChar(undefined)).toBe(false);
	});
});

describe('findPartialAnagrams', () => {
	it('should reject invalid inputs', () => {
		expect(() => findPartialAnagrams('', words)).toThrowError();
		expect(() => findPartialAnagrams(' ', words)).toThrowError();
		expect(() => findPartialAnagrams('a$z', words)).toThrowError();
		expect(() => findPartialAnagrams('4', words)).toThrowError();
		expect(() => findPartialAnagrams(4 as any, words)).toThrowError();
		expect(() => findPartialAnagrams([], words)).toThrowError();
		expect(() => findPartialAnagrams(['aa'] as any, words)).toThrowError();
		expect(() => findPartialAnagrams(['7', 'x'] as any, words)).toThrowError();

		expect(() => findPartialAnagrams('nolist', [])).toThrowError();
		expect(() =>
			findPartialAnagrams('nolist', undefined as any)
		).toThrowError();
	});

	it('should find partial anagrams from given letters', () => {
		const justAnagrams = findPartialAnagrams(['s', 'u', 't', 'j'], words);

		expect(justAnagrams).toContain('just');
		expect(justAnagrams).toContain('jut');
		expect(justAnagrams).not.toContain('tub');

		const tackAnagrams = findPartialAnagrams('tcka', words);

		expect(tackAnagrams).toContain('tack');
		expect(tackAnagrams).toContain('cat');
		expect(tackAnagrams).toContain('at');
		expect(tackAnagrams).not.toContain('dog');
	});

	it('should use wildcards', () => {
		const wildcardAnagrams1 = findPartialAnagrams(['?', 'c', 'a', 't'], words);

		expect(wildcardAnagrams1).toContain('cart');
		expect(wildcardAnagrams1).toContain('cast');
		expect(wildcardAnagrams1).toContain('cut');
		expect(wildcardAnagrams1).not.toContain('actor');

		const wildcardAnagrams2 = findPartialAnagrams('c?a?t', words);

		expect(wildcardAnagrams2).toContain('actor');
		expect(wildcardAnagrams2).toContain('cast');
		expect(wildcardAnagrams2).toContain('cat');
		expect(wildcardAnagrams2).not.toContain('caped');
	});
});
