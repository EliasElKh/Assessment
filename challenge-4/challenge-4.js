function firstNonRepeatingChar(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.split(str[i]).length - 1 == 1) { // Count occurrences of str[i] in str
            return str[i];
        }
    }
    return null;
}
console.log(firstNonRepeatingChar("swiss"));
console.log(firstNonRepeatingChar("racecar"));
