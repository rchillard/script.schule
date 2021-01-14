// arr.findIndex(callback( element[, index[, array]] )[, thisArg])
// given this array
var snacks = [{ name: 'apple', type: 'fruit'}, { name: 'oreos', type: 'junk'}, { name: 'beef jerky', type: 'meat'}]

// this will return 1 for oreos
snacks.findIndex(function(snack) {
    return snack.type === 'junk';
})