// const chai = require('chai');
// let assert = chai.assert;
// const ConvertHandler = require('../controllers/convertHandler.js');

// let convertHandler = new ConvertHandler();

// suite('Unit Tests', () => {
// 	suite('ConvertHandler', () => {
// 		suite('getNum', () => {
// 			test("should correctly read a whole number input", (done) => {
// 				const wholeNumberValue = 35;
// 				const result = convertHandler.getNum(wholeNumberValue);
// 				assert.equal(typeof result, 'number');
// 				assert.equal(result, wholeNumberValue);
// 				done();
// 			})
// 			test("should correctly read a decimal number input", (done) => {
// 				const decimalNumberValue = 35.35;
// 				const result = convertHandler.getNum(decimalNumberValue);
// 				assert.equal(typeof result, 'number');
// 				assert.equal(result, decimalNumberValue);
// 				done();
// 			})
// 			test("should correctly read a fractional input", (done) => {
// 				const fractionalNumberValue = "35/6";
// 				const expectedOutput = (35 / 6);
// 				const result = convertHandler.getNum(fractionalNumberValue);
// 				assert.equal(typeof result, 'number');
// 				assert.equal(result, expectedOutput);
// 				done();
// 			})
// 			test("should correctly read a fractional input with a decimal", (done) => {
// 				const fractionalDecimalNumberValue = "35.5/6";
// 				const expectedOutput = (35.5 / 6);
// 				const result = convertHandler.getNum(fractionalDecimalNumberValue);
// 				assert.equal(typeof result, 'number');
// 				assert.equal(result, expectedOutput);
// 				done();
// 			})
// 			test("should correctly return an error on a double-fraction (i.e. 3/2/3)", (done) => {
// 				const doubleFractionValue = "3/2/3";
// 				const result = convertHandler.getNum(doubleFractionValue);
// 				assert.instanceOf(result, Error)
// 				done();
// 			})
// 			test("should correctly default to a numerical input of 1 when no numerical input is provided", (done) => {
// 				const expectedResult = 1;
// 				const result = convertHandler.getNum();
// 				assert.equal(typeof result, "number")
// 				assert.equal(result, expectedResult)
// 				done();
// 			})
// 		})
// 		suite('getUnit', () => {
// 			suite("should correctly read each valid input unit", () => {
// 				const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
// 				test('should correctly read "gal" unit', (done) => {
// 					const validInput = '1gal';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 				test('should correctly read "L" unit', (done) => {
// 					const validInput = '1L';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 				test('should correctly read "mi" unit', (done) => {
// 					const validInput = '1mi';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 				test('should correctly read "km" unit', (done) => {
// 					const validInput = '1km';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 				test('should correctly read "lbs" unit', (done) => {
// 					const validInput = '1lbs';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 				test('should correctly read "kg" unit', (done) => {
// 					const validInput = '1kg';
// 					const result = convertHandler.getUnit(validInput);
// 					assert.isDefined(result)
// 					assert.include(validUnits, result)
// 					done()
// 				})
// 			})
// 			test("should correctly return an error for an invalid input unit", (done) => {
// 				const invalidInput = '25.3m';
// 				const result = convertHandler.getUnit(invalidInput);
// 				assert.instanceOf(result, Error)
// 				done();
// 			})
// 		})
// 		suite('getReturnUnit', () => {
// 			test("should return the correct return unit for each valid input unit", (done) => {
// 				const baseUnits = new Map().set('gal','L').set('mi', 'km').set('lbs', 'kg');
// 				const fullValidUnits = new Map([...baseUnits, ...([...baseUnits]).map(([k,v])=>[v,k])])
// 				const validInput = 'L'
// 				const result = convertHandler.getReturnUnit(validInput);
// 				assert.equal(result, fullValidUnits.get(validInput));
// 				done();
// 			})
// 		})
// 		suite('spellOutUnit', () => {
// 			test("should return the correct return unit for each valid input unit", (done) => {
// 				const baseUnits = new Map()
// 					.set('gal','galons')
// 					.set('mi', 'miles')
// 					.set('lbs', 'pounds')
// 					.set('L','litres')
// 					.set('km', 'kilometers')
// 					.set('kg', 'kilograms');
// 				const validInput = 'kg'
// 				const returnUnit = convertHandler.getReturnUnit(validInput);
// 				const result = convertHandler.spellOutUnit(returnUnit);
// 				assert.isDefined(result);
// 				assert.equal(result, baseUnits.get(returnUnit));
// 				done();
// 			})
// 		})
// 		suite('convert', () => {
// 			test('should correctly convert "gal" to "L"', (done) => {
// 				const expectedResult = (3.78541).toFixed(5)
// 				const input = "1gal"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 			test('should correctly convert "L" to "gal"', (done) => {
// 				const expectedResult = (1/3.78541).toFixed(5)
// 				const input = "1L"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 			test('should correctly convert "mi" to "km"', (done) => {
// 				const expectedResult = (1.60934).toFixed(5)
// 				const input = "1mi"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 			test('should correctly convert "km" to "mi"', (done) => {
// 				const expectedResult = (1/1.60934).toFixed(5)
// 				const input = "1km"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 			test('should correctly convert "lbs" to "kg"', (done) => {
// 				const expectedResult = (0.453592).toFixed(5)
// 				const input = "1lbs"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 			test('should correctly convert "kg" to "lbs"', (done) => {
// 				const expectedResult = (1/0.453592).toFixed(5)
// 				const input = "1kg"
// 				const initNum = convertHandler.getNum(input)
// 				const initUnit = convertHandler.getUnit(input)
// 				const result = convertHandler.convert(initNum, initUnit)
// 				assert.isDefined(result)
// 				assert.notEqual(result, NaN)
// 				assert.equal(result, expectedResult)
// 				done()
// 			})
// 		})
// 	})
// });

const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Testing valid whole number input", () => {
    assert.strictEqual(
      convertHandler.getNum("2kg"),
      2,
      "Correctly read valid whole number input"
    );
  });
  test("Testing valid decimal input", () => {
    assert.strictEqual(
      convertHandler.getNum("2.5lbs"),
      2.5,
      "Correctly read valid decimal input"
    );
  });
  test("Testing valid fractional input", () => {
    assert.strictEqual(
      convertHandler.getNum("1/5kg"),
      0.2,
      "Correctly read valid fractional input"
    );
  });
  test("Testing valid fractional input with decimal", () => {
    assert.strictEqual(
      convertHandler.getNum("0.2/0.5kg"),
      0.4,
      "Correctly read valid fractional input with decimal"
    );
  });
  test("Testing invalid double fraction input", () => {
    assert.strictEqual(
      convertHandler.getNum("2/2/7kg"),
      "invalid number",
      "Return error for invalid double fraction input"
    );
  });
  test("Testing no numeric input", () => {
    assert.strictEqual(
      convertHandler.getNum("lbs"),
      1,
      "correctly default to 1 when no numeric input is provided"
    );
  });

  test("Testing valid input unit", () => {
    assert.strictEqual(
      convertHandler.getUnit("2gal"),
      "gal",
      "correctly read gal"
    );
    assert.strictEqual(convertHandler.getUnit("2L"), "L", "correctly read L");
    assert.strictEqual(
      convertHandler.getUnit("2mi"),
      "mi",
      "correctly read mi"
    );
    assert.strictEqual(
      convertHandler.getUnit("2km"),
      "km",
      "correctly read km"
    );
    assert.strictEqual(
      convertHandler.getUnit("2lbs"),
      "lbs",
      "correctly read lbs"
    );
    assert.strictEqual(
      convertHandler.getUnit("2kg"),
      "kg",
      "correctly read kg"
    );
  });

  test("Testing invalid input unit", () => {
    assert.strictEqual(
      convertHandler.getUnit("2invalidUnit"),
      "invalid unit",
      "Correctly return error message for invalid input unit"
    );
  });

  test("Testing return unit for valid input unit", () => {
    assert.strictEqual(
      convertHandler.getReturnUnit("gal"),
      "L",
      "Correctly return L as output unit for gal input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("L"),
      "gal",
      "Correctly return gal as output unit for L input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("mi"),
      "km",
      "Correctly return km as output unit for mi input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("km"),
      "mi",
      "Correctly return mi as output unit for km input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("lbs"),
      "kg",
      "Correctly return kg as output unit for lbs input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("kg"),
      "lbs",
      "Correctly return lbs as output unit for kg input unit"
    );
  });

  test("Testing spelled-out string unit for valid input unit", () => {
    assert.strictEqual(
      convertHandler.spellOutUnit("GAL"),
      "gal",
      "Correctly return gal as output unit for GAL input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("l"),
      "L",
      "Correctly return L as output unit for l input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("MI"),
      "mi",
      "Correctly return mi as output unit for MI input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("KM"),
      "km",
      "Correctly return km as output unit for KM input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("LBS"),
      "lbs",
      "Correctly return lbs as output unit for LBS input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("KG"),
      "kg",
      "Correctly return kg as output unit for KG input unit"
    );
  });

  test("Converting gal to L", () => {
    assert.strictEqual(
      convertHandler.convert(2, "gal"),
      7.57082,
      "Correctly convert 2gal to 7.57082L"
    );
  });
  test("Converting L to gal", () => {
    assert.strictEqual(
      convertHandler.convert(2, "L"),
      0.52834,
      "Correctly convert 2L to 0.52834gal"
    );
  });
  test("Converting mi to km", () => {
    assert.strictEqual(
      convertHandler.convert(2, "mi"),
      3.21868,
      "Correctly convert 2mi to 3.21868km"
    );
  });
  test("Converting km to mi", () => {
    assert.strictEqual(
      convertHandler.convert(2, "km"),
      1.24275,
      "Correctly convert 2km to 1.24275mi"
    );
  });
  test("Converting lbs to kg", () => {
    assert.strictEqual(
      convertHandler.convert(2, "lbs"),
      0.90718,
      "Correctly convert 2lbs to 0.90718kg"
    );
  });
  test("Converting kg to lbs", () => {
    assert.strictEqual(
      convertHandler.convert(2, "kg"),
      4.40925,
      "Correctly convert 2kg to 4.40925lbs"
    );
  });
});