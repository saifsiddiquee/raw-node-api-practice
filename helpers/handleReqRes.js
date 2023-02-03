/*
 * Title: Handle Request Response
 * Description: Handle Request Response
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routehandlers/notFoundHandler');

//module scaffolding
const handler = {};

handler.handleRequest = (req, res) => {
    //request handling and parsing url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;


    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const selectedHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    selectedHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
        payload = typeof (payload) === 'object' ? payload : {};

        const payLoadString = JSON.stringify(payload);

        //return the final result
        res.writeHead(statusCode);
        res.end(payLoadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end;

        console.log(realData);
        //response handle
        res.end("Hello World");

    });
};

module.exports = handler;
