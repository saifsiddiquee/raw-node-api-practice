/*
 * Title: Userhandler
 * Description: User Handler
 * Author: Saif
 * Date: 04/02/2023
 *
 */

//dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilties');
const { parseJson } = require('../../helpers/utilties');
//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {

    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {

    const firstName = typeof (requestProperties.body.firstName) === 'string'
        && requestProperties.body.firstName.trim().length > 0
        ? requestProperties.body.firstName
        : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string'
        && requestProperties.body.lastName.trim().length > 0
        ? requestProperties.body.lastName
        : false;

    const phone = typeof (requestProperties.body.phone) === 'string'
        && requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;

    const password = typeof (requestProperties.body.password) === 'string'
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;

    const aggrement = typeof (requestProperties.body.aggrement) === 'boolean'
        ? requestProperties.body.aggrement
        : false;

    if (firstName && lastName && phone && password && aggrement) {
        //check if the user already exists.
        data.read('users', phone, (err, user) => {
            if (err) {

                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    aggrement,
                };

                //save the user to file
                data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'User created successfully'
                        })
                    } else {
                        callback(500, {
                            error: 'Internal Server Error!'
                        });
                    }
                });

            } else {
                callback(500, {
                    error: 'User already exists',
                });
            }
        });
    } else {
        callback(400, {
            error: 'Invalid request',
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string'
        && requestProperties.queryStringObject.phone.trim().length === 11
        ? requestProperties.queryStringObject.phone
        : false;

    if (phone) {
        //look up the user
        data.read('users', phone, (err, userObj) => {
            const user = { ...parseJson(userObj) };
            if (!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {
                    error: 'User not found!'
                });
            }
        });

    } else {
        callback(404, {
            error: 'User not found!'
        });
    }
};

handler._users.put = (requestProperties, callback) => {
    const phone = typeof (requestProperties.body.phone) === 'string'
        && requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;

    const firstName = typeof (requestProperties.body.firstName) === 'string'
        && requestProperties.body.firstName.trim().length > 0
        ? requestProperties.body.firstName
        : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string'
        && requestProperties.body.lastName.trim().length > 0
        ? requestProperties.body.lastName
        : false;

    const password = typeof (requestProperties.body.password) === 'string'
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;

    if (phone) {
        if (firstName || lastName || password) {
            //lookup for user
            data.read('users', phone, (err, user) => {
                const userData = { ...parseJson(user) }
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }

                    //store new data
                    data.update('users', phone, userData, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'User data updated successfully'
                            })
                        } else {
                            callback(500, {
                                error: 'Internal Server Error'
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: 'Invalid Phone Number.'
                    });
                }
            });
        } else {
            callback(400, {
                error: 'Nothing Modified.'
            });
        }
    } else {
        callback(400, {
            error: 'Invalid Phone Number.'
        });
    }
};

handler._users.delete = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string'
        && requestProperties.queryStringObject.phone.trim().length === 11
        ? requestProperties.queryStringObject.phone
        : false;

    if (phone) {
        data.read('users', phone, (err, userData) => {
            if (!err && data) {
                data.delete('users', phone, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'User was deleted successfully.'
                        })
                    } else {
                        callback(500, {
                            error: 'Unable to delete. Internal Server Error.'
                        })
                    }
                });
            } else {
                callback(500, {
                    error: 'Internal Server Error.'
                })
            }
        });
    } else {
        callback(400, {
            error: 'Can not delete. Invalid phone number.'
        });
    }
};

module.exports = handler;
