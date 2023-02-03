/*
 * Title: Uptime monotoring application
 * Description: A Restful API to monotor up and down time of defined urls
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes')

//app object - module scaffolding
const app = {};

//configs
app.config = {
  port: 3000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Listening to port ${app.config.port}`);
  });
};

//handle request and renponse
app.handleReqRes = handleReqRes;

//start server
app.createServer();
