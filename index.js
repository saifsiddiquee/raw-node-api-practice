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
const env = require('./helpers/enviroment');
const data = require('./lib/data');

//app object - module scaffolding
const app = {};

//testing all function
/* data.create('test', 'newTest', { name: 'Saif', phone: '01676449264' }, (err) => {
  console.log('Error was:========>', err);
});
 */
/* data.read('test', 'newTest', (err, result) => {
  console.log(err, result);
}); */

/* data.update('test', 'newTest', { name: 'Zahin', gender: 'male' }, (err) => {
  console.log(err);
}); */

/* data.delete('test', 'newTest', (err) => {
  console.log(err);
}); */


//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(env.port, () => {
    console.log(`Listening to port ${env.port}`);
  });
};

//handle request and renponse
app.handleReqRes = handleReqRes;

//start server
app.createServer();
