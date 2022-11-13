const { auth,sekolah } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");

module.exports = {

    //create
    async signUp(req, res) { 
        auth.findOne({ where: { email: req.body.email } }).then(
            (existingEmail) => {
              if (existingEmail) {
                return apiResponse.notFoundResponse(res, "Email already Used!");
              }else{
                let password =  req.body.password
                if( password !== null ){
                    password = bcrypt.hashSync(req.body.password.toString(), Number.parseInt(authConfig.rounds))
                }
                let result = auth.create({       
                    email: req.body.email,
                    nama_lengkap: req.body.nama_lengkap,
                    umur: req.body.umur,
                    alamat: req.body.alamat,
                    notelp: req.body.notelp,
                    sekolahId: req.body.sekolahId,
                    jenis_kelamin: req.body.jenis_kelamin,
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
            let { email, password } = req.body;
               auth.findOne({
                    where: {
                        email: email
                    },
                    include: [ 
                        { model: sekolah,
                            attributes: ['id','nama_sekolah']
                        }
                    ],
                }).then(auth => {   
                    if (!auth) {
                        res.status(404).json({ message: "Account Not Found!" });
                    }else{
                        if (bcrypt.compareSync(password, auth.password)) {
                            let token = jwt.sign({ auth: auth }, authConfig.secret, {
                                expiresIn: authConfig.expires
                            });
                            res.json({
                                status: 200,
                                message:"SUCCESS",
                                data: auth,
                                token: token
                            })
                        } else {
                            res.status(401).json({ 
                                status: 401,
                                message:"WRONG PASSWORD",
                            })
                        }
                    }
                    }).catch(function (err){
                        return apiResponse.notFoundResponse(res, err);
                    });
                   
            },
    
    //find
    async find(req, res, next) {
        let result = await auth.findOne({
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
        let result = await auth.findAll({
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
        req.result.nama_lengkap = req.body.nama_lengkap;   
        req.result.notelp = req.body.notelp;
        req.result.sekolahId = req.body.sekolahId;
        req.result.jenis_kelamin = req.body.jenis_kelamin;
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