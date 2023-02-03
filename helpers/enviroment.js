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
};

enviroments.production = {
    port: 6000,
    envname: 'production',
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


