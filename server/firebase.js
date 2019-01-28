var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/properties.ini');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: properties.get('pro.db.url')
});

module.exports = admin;