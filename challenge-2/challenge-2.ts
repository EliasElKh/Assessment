function countVowels(str: string): number {
    const vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'y'];
    let numberOfVowels = 0;

    for (let i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i].toLowerCase()) !== -1) { // check if str[i] is in the vowels array
            numberOfVowels++;
        }
    }
    return numberOfVowels;
}

const numberOfVowels = countVowels("TypeScript");
console.log(numberOfVowels);
