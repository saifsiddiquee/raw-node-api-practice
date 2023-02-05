/*
 * Title: Data Business
 * Description: Data Business
 * Author: Saif
 * Date: 04/02/2023
 *
 */

//dependencies
const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//base directory of data
lib.basedir = path.join(__dirname, '../.data/');

//write data to file system
lib.create = function (path, file, data, callback) {
    //open file for writing
    fs.open(`${lib.basedir + path}/${file}.json`, 'wx', function (err, fileDescriptor) {

        if (!err && fileDescriptor) {
            //convert object to string
            const stringData = JSON.stringify(data);

            //write data to file and close
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing file!');
                        }
                    })
                } else {
                    callback('File Writing Error!');
                }
            });

        } else {
            callback('Unable to create new file. It may already exists!');
        }
    });
};

//read data from file
lib.read = (path, file, callback) => {
    fs.readFile(`${lib.basedir + path}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};

//update data in existing file
lib.update = (path, file, data, callback) => {
    fs.open(`${lib.basedir + path}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
             // convert the data to string
            const stringData = JSON.stringify(data);

            //truncate the file
            fs.ftruncate(fileDescriptor, (trucateError) => {
                if (!trucateError) {
                    //write to the file and close
                    fs.writeFile(fileDescriptor, stringData, (writeErr) => {
                        if (!writeErr) {
                            fs.close(fileDescriptor, (closeErr) => {
                                if (!closeErr) {
                                    callback(false);
                                } else {
                                    callback('Error closing file');
                                }
                            });
                        } else {
                            callback('Write Error!');
                        }
                    })

                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('File may not exists!');
        }
    });
};

//delete existing file
lib.delete = (path, file, callback) => {
    //unlink file
    fs.unlink(`${lib.basedir + path}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback("Error Deleting File!");
        }
    });

};

module.exports = lib;