function countVowels(str) {
    var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    var numberOfVowels = 0;
    for (var i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i].toLowerCase()) !== -1) { // check if str[i] is in the vowels array
            numberOfVowels++;
        }
    }
    return numberOfVowels;
}
var numberOfVowels = countVowels("TypeScript");
console.log(numberOfVowels);
