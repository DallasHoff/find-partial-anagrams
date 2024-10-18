# Find Partial Anagrams

Takes a set of letters and returns all the words in a given word list that can be made using all or a subset of those letters.

## Install

```sh
npm install find-partial-anagrams
# or...
yarn add find-partial-anagrams
# or...
pnpm install find-partial-anagrams
# or...
deno add jsr:@dallashoff/find-partial-anagrams
```

## Examples

```javascript
import { findPartialAnagrams } from 'find-partial-anagrams';
import wordList from 'path/to/your/word/list'; // array of strings

const partialAnagrams = findPartialAnagrams('rbalyri', wordList);

// Example return value: ['library', 'brail', 'briar', 'lairy', 'libra', 'riyal', 'ably', 'airy', ...]
```

The letters can also be passed as an array.

```javascript
const partialAnagrams = findPartialAnagrams(
	['r', 'b', 'a', 'l', 'y', 'r', 'i'],
	wordList
);
```

Question marks can be used as wildcards, and they will match any letter.

```javascript
const partialAnagrams = findPartialAnagrams('ac?t', wordList);

// This input would match words like "cart", "cast", and "cut".
```
