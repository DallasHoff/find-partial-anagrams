/**
 * This module provides the `findPartialAnagrams` function and its
 * related types and helpers.
 * @module
 */

const wildcard = '?';

// prettier-ignore
/** Represents a single uppercase letter. */
export type UpperCaseLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/** Represents a single lowercase letter. */
export type LowerCaseLetter = Lowercase<UpperCaseLetter>;

/** Represents any single letter. */
export type Letter = LowerCaseLetter | UpperCaseLetter;

/** Represents a single letter or a wildcard character. */
export type Char = Letter | typeof wildcard;

/** Checks whether the passed value is a valid `Char`. */
export function isChar(input: unknown): input is Char {
	return typeof input === 'string' && /^[A-Za-z\?]{1}$/.test(input);
}

/**
 * Takes a set of letters and returns all the words in a given word list
 * that can be made using all or a subset of those letters.
 *
 * @param input A string or array of characters that may appear in matches
 * @param wordList An array of words to check for matches with your input
 * @returns Items from `wordList` that are partial anagrams of your `input`
 */
export function findPartialAnagrams(
	input: string | Char[],
	wordList: string[]
): string[] {
	const partialAnagrams: string[] = [];

	// Validation
	let inputChars: Char[] = [];
	const inputErrorMessage = `Input must be a string or array containing only letters (a-z) and wildcards (${wildcard}).`;
	const noWordListErrorMessage =
		'No word list was provided to search for matches. Provide an array of strings.';

	if (typeof input === 'string') {
		if (!input || !/^[A-Za-z\?]+$/.test(input)) {
			throw new Error(inputErrorMessage);
		}

		inputChars = input.toLowerCase().split('') as Char[];
	} else if (Array.isArray(input)) {
		if (input.length === 0 || input.some((char) => !isChar(char))) {
			throw new Error(inputErrorMessage);
		}

		inputChars = input;
	} else {
		throw new Error(inputErrorMessage);
	}

	if (!wordList || wordList.length === 0) {
		throw new Error(noWordListErrorMessage);
	}

	// Prune words longer than provided number of letters
	wordList = wordList.filter((word) => word.length <= inputChars.length);

	// Find partial anagrams
	wordList.forEach((testWord) => {
		const testWordLetters = testWord.split('') as Letter[];
		const unmatchedChars: Char[] = inputChars.slice();
		const matchedLetters: Letter[] = [];

		testWordLetters.forEach((testLetter) => {
			const testLetterIndex = unmatchedChars.indexOf(testLetter);
			let matchedCharIndex =
				testLetterIndex > -1
					? testLetterIndex
					: unmatchedChars.indexOf(wildcard);

			if (matchedCharIndex > -1) {
				unmatchedChars.splice(matchedCharIndex, 1);
				matchedLetters.push(testLetter);
			}
		});

		if (matchedLetters.join('') === testWord) {
			partialAnagrams.push(testWord);
		}
	});

	return partialAnagrams;
}
