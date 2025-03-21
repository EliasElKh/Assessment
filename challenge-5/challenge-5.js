function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true; // If both are the same reference
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null)
        return false; // If not objects or null
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false; // If key lengths are different
    for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
        var key = keys1_1[_i];
        if (!(key in obj2))
            return false; // If key does not exist in obj2
        if (!deepEqual(obj1[key], obj2[key]))
            return false; // Recursively compare values
    }
    return true;
}
// **Test Cases**
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }));
