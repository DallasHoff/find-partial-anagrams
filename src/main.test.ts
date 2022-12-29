import { describe, expect, it } from 'vitest';
import { findPartialAnagrams, isLetter } from './main';
import words from '../public/english-words';

describe('isLetter', () => {
	it('should validate letters', () => {
		expect(isLetter('a')).toBe(true);
		expect(isLetter('A')).toBe(true);
		expect(isLetter('x')).toBe(true);
		expect(isLetter('')).toBe(false);
		expect(isLetter(' ')).toBe(false);
		expect(isLetter('x ')).toBe(false);
		expect(isLetter('xx')).toBe(false);
		expect(isLetter('3')).toBe(false);
		expect(isLetter(3)).toBe(false);
		expect(isLetter(null)).toBe(false);
		expect(isLetter(undefined)).toBe(false);
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
});
