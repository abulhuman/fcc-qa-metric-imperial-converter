// 'use strict';

// const expect = require('chai').expect;
// const ConvertHandler = require('../controllers/convertHandler.js');

// module.exports = function (app) {
  
//   let converter = new ConvertHandler();

// 	app.get('/api/convert', (req, res) => {
// 		const input = req.query.input;

// 	try {

// 		const initNum = converter.getNum(input);
// 		const initUnit = converter.getUnit(input);
// 		const returnNum = converter.convert(initNum, initUnit);
// 		const returnUnit = converter.getReturnUnit(initUnit);
// 		const errors = []
// 			const errorCandidates = [initNum, initUnit, returnNum, returnUnit]
// 			errorCandidates.forEach((item)=>{
// 			if(item instanceof Error)
// 				errors.push(item.message)
// 		})
// 		if(errors.length) throw errors
// 		const string = converter
// 			.getString(
// 				initNum, 
// 				converter.spellOutUnit(initUnit), 
// 				returnNum, 
// 				converter.spellOutUnit(returnUnit)
// 			)

// 		res.status(200)
// 		res.json({initNum, initUnit, returnNum, returnUnit, string})

// 		} catch(errors){
// 		let errorMessage = null;
// 		errors = [...new Set([...errors])]

// 		if (errors.includes('please provide a valid unit')) {
// 			errorMessage = 'invalid unit';

// 			if (errors.includes('please provide a valid number')
// 			|| errors.includes('double fraction not allowed'))
// 			errorMessage = 'invalid number and unit';

// 		} else if (
// 			errors.includes('please provide a valid number')
// 			|| errors.includes('double fraction not allowed')
// 		) {
// 				errorMessage = 'invalid number';
// 				if (errors.includes('please provide a valid unit'))
// 				errorMessage = 'invalid number and unit';
// 			} 

// 		res.status(400)
// 		res.type('text').send(errorMessage)
// 	}
// 	})

// };

"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;
    if (!input) {
      return res.send("invalid input");
    }
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    }
    if (initNum === "invalid number") {
      return res.send("invalid number");
    }
    if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};