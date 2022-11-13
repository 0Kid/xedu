const { sekolah } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");

module.exports = {

    //create
    async signUp(req, res) { 
        sekolah.findOne({ where: { notelp: req.body.notelp } }).then(
            (existingEmail) => {
              if (existingEmail) {
                return apiResponse.notFoundResponse(res, "Notelp already Used!");
              }else{
                let password =  req.body.password
                if( password !== null ){
                    password = bcrypt.hashSync(req.body.password.toString(), Number.parseInt(authConfig.rounds))
                }
                let result = sekolah.create({       
                nama_sekolah: req.body.nama_sekolah,
                alamat: req.body.alamat,
                notelp: req.body.notelp,
                password: password
                        }).then(result => {
                            res.json({
                                status: 200,
                                message:"SUCCESS",
                                data: result,
                            }) 
                        }).catch(function (err){
                                return apiResponse.ErrorResponse(res, err);
                            });
                      }
                    }
                  )
        },

        signIn(req, res) {
            let { notelp, password } = req.body;
                sekolah.findOne({
                    where: {
                        notelp: notelp
                    },
                }).then(sekolah => {   
                    if (!sekolah) {
                        res.status(404).json({ message: "Account Not Found!" });
                    }
                        if (bcrypt.compareSync(password, sekolah.password)) {
                            let token = jwt.sign({ sekolah: sekolah }, authConfig.secret, {
                                expiresIn: authConfig.expires
                            });
                            res.json({
                                status: 200,
                                message:"SUCCESS",
                                data: sekolah,
                                token: token
                            })
                        } else {
                            res.status(401).json({ 
                                status: 401,
                                message:"WRONG PASSWORD",
                            })
                        }
                    }).catch(err => {
                        res.status(401).json({ 
                            status: 401,
                            message: err,
                        })
                })   
            },
    
    //find
    async find(req, res, next) {
        let result = await sekolah.findOne({
            where: {
                    id: req.params.id,
            },
        });
        if (!result) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.result = result;
            next();
        }
    },

    //findAll
    async index(req, res) {
        let result = await sekolah.findAll({
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.result);
    },

    // Update
    async update(req, res) {
        req.result.namasekolah = req.body.namasekolah;         
        req.result.alamat = req.body.alamat;   
        req.result.notelp = req.body.notelp;
        req.result.save().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        })
    },

    // Delete
    async delete(req, res) {
        req.result.destroy().then(result => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}