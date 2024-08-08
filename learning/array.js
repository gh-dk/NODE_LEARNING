const array = [1, 2, 3, 4, 5];

array.forEach((element) => {
  console.log(element);
});

const doubled = array.map((element) => element * 2);
console.log(doubled);

const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);

const found = array.find((element) => element > 3);
console.log(found);

const filtered = array.filter((element) => element > 3);
console.log(filtered); 