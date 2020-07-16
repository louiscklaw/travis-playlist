const _ = require('lodash')

console.log(_.defaults({ a: 1 }, { a: 3, b: 2 })); // { 'a': 1, 'b': 2 }

console.log(_.partition([1, 2, 3, 4], n => n % 2)); // [[1, 3], [2, 4]]
