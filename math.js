const data = [24, 12, 9, 25, 33, 13, 9, 49, 31, 43, 48, 16, 19, 9, 14, 24, 23, 8, 8, 18, 40, 42, 24, 8, 40, 35, 28, 24, 44, 41, 29, 18, 2, 37, 42, 16, 31, 32, 46, 43, 6, 44, 8, 25, 2, 4, 30, 7, 11, 38, 24];


// let sum = [24, 12, 9, 25, 33, 13, 9, 49, 31, 43, 48, 16, 19, 9, 14, 24, 23, 8, 8, 18, 40, 42, 24, 8, 40, 35, 28, 24, 44, 41, 29, 18, 2, 37, 42, 16, 31, 32, 46, 43, 6, 44, 8, 25, 2, 4, 30, 7, 11, 38, 24].reduce((a, b) => a + b, 0);

// let result = sum / [24, 12, 9, 25, 33, 13, 9, 49, 31, 43, 48, 16, 19, 9, 14, 24, 23, 8, 8, 18, 40, 42, 24, 8, 40, 35, 28, 24, 44, 41, 29, 18, 2, 37, 42, 16, 31, 32, 46, 43, 6, 44, 8, 25, 2, 4, 30, 7, 11, 38, 24].length;
// console.log(result);

let sum = 0;
for(let i = 0; i < data.length; i++){
// console.log(data[i]);
sum += data[i];
}
// console.log(sum);
let aver = sum /data.length;
console.log(aver);







// let sum = 0;

// data.forEach(function(elem) {
// 	sum += elem;
// });

// console.log(sum);
// let averFor = sum / data.length
// console.log(averFor);
    
