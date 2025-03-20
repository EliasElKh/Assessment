function findMissingNumber(arr: number[]): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) { 
            return i + 1; // The missing number
        }
    }
    return -1; // Return -1 if no missing number is found
}

console.log(findMissingNumber([1, 2, 4, 5, 6]));

