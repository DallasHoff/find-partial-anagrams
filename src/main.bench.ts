import { bench, describe } from 'vitest';
import { findPartialAnagrams } from './main';
import words from '../public/english-words';

describe('findPartialAnagrams', () => {
	bench('3 letters', () => {
		findPartialAnagrams('ujt', words);
	});

	bench('9 letters', () => {
		findPartialAnagrams('velredpoe', words);
	});

	bench('12 letters', () => {
		findPartialAnagrams('uetramnesoin', words);
	});

	bench('16 letters', () => {
		findPartialAnagrams('mknlnctwdeagseoe', words);
	});
});
