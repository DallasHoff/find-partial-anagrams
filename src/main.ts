// prettier-ignore
export type UpperCaseLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type LowerCaseLetter = Lowercase<UpperCaseLetter>;
export type Letter = LowerCaseLetter | UpperCaseLetter;

export function isLetter(input: unknown): input is Letter {
	return typeof input === 'string' && /^[A-Za-z]{1}$/.test(input);
}

export function findPartialAnagrams(
	input: string | Letter[],
	wordList: string[]
): string[] {
	const partialAnagrams: string[] = [];

	// Validation
	let inputLetters: Letter[] = [];
	const inputErrorMessage = 'Input must be a string or array of letters (a-z).';
	const noWordListErrorMessage =
		'No word list was provided to search for matches. Provide an array of strings.';

	if (typeof input === 'string') {
		if (!input || !/^[A-Za-z]+$/.test(input)) {
			throw new Error(inputErrorMessage);
		}

		inputLetters = input.toLowerCase().split('') as Letter[];
	} else if (Array.isArray(input)) {
		if (input.length === 0 || input.some((letter) => !isLetter(letter))) {
			throw new Error(inputErrorMessage);
		}

		inputLetters = input;
	} else {
		throw new Error(inputErrorMessage);
	}

	if (!wordList || wordList.length === 0) {
		throw new Error(noWordListErrorMessage);
	}

	// Prune words longer than provided number of letters
	wordList = wordList.filter((word) => word.length <= inputLetters.length);

	// Find partial anagrams
	wordList.forEach((testWord) => {
		const testWordLetters = testWord.split('') as Letter[];
		const unmatchedLetters: Letter[] = inputLetters.slice();
		const matchedLetters: Letter[] = [];

		testWordLetters.forEach((testLetter) => {
			if (unmatchedLetters.includes(testLetter)) {
				matchedLetters.push(testLetter);
				unmatchedLetters.splice(
					unmatchedLetters.findIndex((letter) => letter === testLetter),
					1
				);
			}
		});

		if (matchedLetters.join('') === testWord) {
			partialAnagrams.push(testWord);
		}
	});

	return partialAnagrams;
}
