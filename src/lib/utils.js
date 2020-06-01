"use strict";
exports.__esModule = true;
exports.sumMultiValues = exports.addZero = void 0;
exports.addZero = function (x) {
    return x < 10 ? "0" + x : "" + x;
};
exports.sumMultiValues = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var func = function (a, b) { return a * b; };
    return values.reduce(
    // (result: number, value: number): number => result + value,
    func, 1);
};
var s = exports.sumMultiValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(s);
