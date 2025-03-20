function reverseString(str: string): string { 
    let reversestr: string = ''; // store the reversed string
    for (let i = str.length - 1; i >= 0; i--) { // for loop from end to beginning, storing characters
        reversestr += str[i];
    }
    return reversestr;
}

const answer = reverseString("hello");
console.log(answer);
