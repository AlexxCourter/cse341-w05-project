const appDefault = require('express').Router();

appDefault.get('/', (req,res)=>{res.send("Hello!")});

module.exports = appDefault;