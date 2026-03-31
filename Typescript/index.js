"use strict";
console.log("Hlo");
console.log(1 + 1);
const a = "world";
const b = 5;
console.log(a + b);
// console.log(a-b)
// console.log(a/b)
// console.log(a*b)
/*
    Data types in TS
    Primitive Data
    string , number , boolean , array , tuple , void never

*/
const str = "Hello world";
console.log(typeof str);
const arr = [1, 2, 3, 4];
const tup = [1, 2, 2];
function greet(name) {
    console.log(name + " Good moring");
}
greet("harpreet");
function greete(name) {
    return name + " Good moring";
}
greete("harpreet");
