const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { auth } = require('../models/index'); 

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ message: "Anda tidak memiliki akses" });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) {
                res.status(401).json({ message: "Token sudah habis" });
            } else {
               let auths = auth.findByPk(decoded.auth).then(auths => {
                  req.auths = auths;
                  next();
                }).catch(err => {
                    res.status(401).json({ message: "Anda tidak memiliki akses" });
            });
            }
        })
    }

};