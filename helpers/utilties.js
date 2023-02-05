/*
 * Title: Utilities
 * Description: Application Utilities
 * Author: Saif
 * Date: 04/02/2023
 *
 */

//dependencies

//module scaffolding
const crypto = require('crypto');
const enviroment = require('./enviroment');
const utilities = {};

//parse JSON to Object
utilities.parseJson = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

//Hash any string
utilities.hash = (str) => {

    if (typeof (str) === 'string' && str.length > 0) {
        const hash = crypto
            .createHmac('sha256', enviroment.secret)
            .update(str)
            .digest('hex');

        return hash;
    } else {
        return false;
    }
};

//export module
module.exports = utilities;
