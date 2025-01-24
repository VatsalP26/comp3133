const calculator = require("../app/calculator.js"); 
const { expect } = require("chai");

function testCalculation(func, input, expected) {
    const result = func(...input);
    const status = result === expected ? "PASS" : "FAIL";
    console.log(`${func.name}(${input.join(', ')}): expected ${expected} - ${status}`);
    expect(result).to.equal(expected);
}

describe("Calculator Tests", function () {
    it("should return 7 for add(5, 2)", function () {
        testCalculation(calculator.add, [5, 2], 7);
    });

    it("should fail and return 8 for add(5, 2)", function () {
        testCalculation(calculator.add, [5, 2], 8);
    });

    it("should return 3 for sub(5, 2)", function () {
        testCalculation(calculator.sub, [5, 2], 3);
    });

    it("should fail and return 5 for sub(5, 2)", function () {
        testCalculation(calculator.sub, [5, 2], 5);
    });

    it("should return 10 for mul(5, 2)", function () {
        testCalculation(calculator.mul, [5, 2], 10);
    });

    it("should fail and return 12 for mul(5, 2)", function () {
        testCalculation(calculator.mul, [5, 2], 12);
    });

    it("should return 5 for div(10, 2)", function () {
        testCalculation(calculator.div, [10, 2], 5);
    });

    it("should fail and return 2 for div(10, 2)", function () {
        testCalculation(calculator.div, [10, 2], 2);
    });
});
