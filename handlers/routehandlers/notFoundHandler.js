/*
 * Title: Not found handle
 * Description: To handle the undefined url (404)
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Requested URL not found',
    });
}

module.exports = handler;