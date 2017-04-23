import array from 'dojo/_base/array'

var obj1 = { id: 1 },
    arr2 = [{ id: 0 }, obj1, { id: 2 }, { id: 3 }];

// This search returns 1, as obj1 is the second item
// in the array.
console.log(array.indexOf(arr2, obj1));