/*
 * Title: Routes
 * Description: Application Routes
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//dependencies
const { sampleHandler } = require('./handlers/routehandlers/routeHandler');
const { userHandler } = require('./handlers/routehandlers/userHandler');

const routes = {
    'sample': sampleHandler,
    'user': userHandler,
};

module.exports = routes;