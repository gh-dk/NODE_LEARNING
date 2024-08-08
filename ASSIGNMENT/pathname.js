const path = require('path');

const filePath = '/home/user/dir/file.txt';
const baseName = path.basename(filePath);
console.log(`Base name: ${baseName}`); 

const baseNameWithSuffix = path.basename(filePath, '.txt');
console.log(`Base name with suffix removed: ${baseNameWithSuffix}`); 


console.log(`Path delimiter: ${path.delimiter}`); 

const dirName = path.dirname(filePath);
console.log(`Directory name: ${dirName}`); 


const extName = path.extname(filePath);
console.log(`Extension name: ${extName}`); 

const pathObject = {
  dir: '/home/user/dir',
  base: 'file.txt'
};

const formattedPath = path.format(pathObject);
console.log(`Formatted path: ${formattedPath}`);
