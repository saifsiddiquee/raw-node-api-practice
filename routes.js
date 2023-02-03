/*
 * Title: Routes
 * Description: Application Routes
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//dependencies
const { sampleHandler } = require('./handlers/routehandlers/routeHandler');

const routes = {
    'sample': sampleHandler,
};

module.exports = routes;