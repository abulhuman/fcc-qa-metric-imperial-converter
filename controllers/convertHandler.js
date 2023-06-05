// function ConvertHandler() {

// 	this.parseFraction = function(inputString) {
// 		const inputElements = inputString.split('/')

// 		if (inputElements.length > 2)
// 			return new Error("double fraction not allowed")

// 		return parseFloat(inputElements[0]) / parseFloat(inputElements[1])
// 	}

// 	this.getNum = function(input) {
// 		if (!input) input = 1
// 		input = String(input)
// 		let result = !input.includes("/") ? parseFloat(input) : this.parseFraction(input)

// 		if (!result) result = 1

// 		return result;
// 	};

// 	this.getUnit = function(input) {
// 		const validUnits = ['L', 'gal', 'mi', 'km', 'lbs', 'kg', 'l']
// 		let result = null;

// 		for (let index = 0; index < validUnits.length; index++) {
// 			const unit = validUnits[index];
// 			const inputUnitIndex = input.toLowerCase().lastIndexOf(unit)

// 			if (inputUnitIndex === -1) {
// 				if ((index + 1) === validUnits.length)
// 					result = new Error("please provide a valid unit");
// 				continue;
// 			}
// 			else {
// 				result = input.slice(inputUnitIndex)
// 				break;
// 			}
// 		}
// 		return result==='l'?'L':result;
// 	};

// 	this.getReturnUnit = function(initUnit) {
// 		const baseUnits = new Map().set('gal', 'L').set('mi', 'km').set('lbs', 'kg');
// 		const fullValidUnits = new Map(
// 			[
// 				...baseUnits,
// 				...([
// 					...baseUnits
// 				]).map(
// 					([k, v]) => [v, k])
// 			]
// 		)
// 		let result = fullValidUnits.get(initUnit);

// 		if (result === undefined) result = new Error('please provide a valid unit')

// 		return result;
// 	};

// 	this.spellOutUnit = function(unit) {
// 		const baseUnits = new Map()
// 			.set('gal', 'gallons')
// 			.set('mi', 'miles')
// 			.set('lbs', 'pounds')
// 			.set('L', 'liters')
// 			.set('km', 'kilometers')
// 			.set('kg', 'kilograms');
// 		const result = baseUnits.get(unit);

// 		return result;
// 	};

// 	this.convert = function(initNum, initUnit) {
// 		const galToL = 3.78541;
// 		const lbsToKg = 0.453592;
// 		const miToKm = 1.60934;
// 		let result;
// 		switch (initUnit) {
// 			case 'gal':
// 				result = initNum * galToL;
// 				break;
// 			case 'L':
// 				result = initNum / galToL;
// 				break;
// 			case 'mi':
// 				result = initNum * miToKm;
// 				break;
// 			case 'km':
// 				result = initNum / miToKm;
// 				break;
// 			case 'lbs':
// 				result = initNum * lbsToKg;
// 				break;
// 			case 'kg':
// 				result = initNum / lbsToKg;
// 				break;
// 			default:
// 				result = NaN;
// 		}

// 		return +result.toFixed(5);
// 	};

// 	this.getString = function(initNum, initUnit, returnNum, returnUnit) {
// 		let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

// 		return result;
// 	};

// }

// module.exports = ConvertHandler;


// const { units, conversionRate, unitMapping } = require("../utils/constants");

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

const conversionRate = {
  gal: galToL,
  L: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

const unitMapping = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

function ConvertHandler() {
  this.getNum = function (input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx === 0) {
      return 1;
    }

    let quantityStr;
    if (idx < 0) {
      quantityStr = input.slice(0);
    } else {
      quantityStr = input.slice(0, idx);
    }

    const quantityArr = quantityStr.split("/");

    if (quantityArr.length === 1) {
      const quantity = quantityArr[0];
      if (quantity === "") return "invalid number";
      return isNaN(+quantity) ? "invalid number" : +quantity;
    }
    if (quantityArr.length === 2) {
      if (quantityArr.some((num) => num === "")) {
        return "invalid number";
      }
      const numerator = +quantityArr[0];
      const denominator = +quantityArr[1];
      return isNaN(numerator) || isNaN(denominator)
        ? "invalid number"
        : numerator / denominator;
    }

    return "invalid number";
  };

  this.getUnit = function (input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx < 0) {
      return "invalid unit";
    }
    const unit = input.slice(idx);
    return this.spellOutUnit(unit);
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L" || unit === "l") return "L";
    if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`;
  };
}

module.exports = ConvertHandler;