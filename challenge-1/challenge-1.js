function reverseString(str) {
    var reversestr = ''; // store the reversed string
    for (var i = str.length - 1; i >= 0; i--) { // for loop from end to beginning, storing characters
        reversestr += str[i];
    }
    return reversestr;
}
var answer = reverseString("hello");
console.log(answer);
