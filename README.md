# Find Partial Anagrams

Takes a set of letters and returns all the words in a given word list that can be made using all or a subset of those letters.

## Install

```
npm install find-partial-anagrams
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
