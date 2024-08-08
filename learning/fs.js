const fs = require('fs');

const data = fs.readFileSync('text.txt',
    { encoding: 'utf8', flag: 'r' });

console.log(data);
console.log('after');


fs.readFile('text.txt', 'utf8', function (err, data) {
    console.log(data);
});

console.log('readFile called');