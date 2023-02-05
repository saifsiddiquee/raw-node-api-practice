/*
 * Title: Enviroments
 * Description: Handle All App enviroment realated stuffs
 * Author: Saif
 * Date: 03/02/2023
 *
 */

//dependencies

//module scaffolding

const enviroments = {};

enviroments.staging = {
    port: 3000,
    envname: 'staging',
    secret: 'AsDf1234'
};

enviroments.production = {
    port: 6000,
    envname: 'production',
    secret: 'B07$VB#44@'
};

//determining the enviroment
const currEnv = typeof (process.env.NODE_ENV) === 'string'
    ? process.env.NODE_ENV
    : enviroments.staging.envname;

//export the corresponding enviroment object    
const envToBeExported = typeof (enviroments[currEnv]) === 'object'
    ? enviroments[currEnv]
    : enviroments.staging;

module.exports = envToBeExported;


