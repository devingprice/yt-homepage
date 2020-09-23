require('dotenv').config();//instatiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';
CONFIG.apiUrl       = process.env.API_URL || 'http://localhost:3001'; //3001
CONFIG.hostUrl       = process.env.HOST_URL || 'http://localhost:3000'; //3000

module.exports = CONFIG;
