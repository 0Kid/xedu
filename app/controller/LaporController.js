const { lapor } = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");
const randomstring = require("randomstring");

module.exports = {
    async create(req, res) {   
        let result = await lapor.create({
            nama_pelaku: req.body.nama_pelaku,
            tempat_kejadian: req.body.tempat_kejadian,
            tanggal_kejadian: req.body.tanggal_kejadian,
            hubungan: req.body.hubungan,
            uraian: req.body.uraian,
            gambar: req.body.gambar,
            authId: req.body.authId,
            sekolahId: req.body.sekolahId,
            status: req.body.status,
            isAnonym: req.body.isAnonym,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let result = await lapor.findByPk(req.params.id);
        if (!result) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.result = result;
            next();
        }
    },

    async index(req, res) {
        let result = await lapor.findAll({
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexByAuth(req, res) {
        let result = await lapor.findAll({
            where:{
                authId: req.query.authId
            }
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexBySekolah(req, res) {
        let result = await lapor.findAll({
            where:{
                sekolahId: req.query.sekolahId
            }
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
        req.result.nama_pelaku = req.body.nama_pelaku;
        req.result.tempat_kejadian = req.body.tempat_kejadian;
        req.result.tanggal_kejadian = req.body.tanggal_kejadian;
        req.result.hubungan = req.body.hubungan;
        req.result.uraian = req.body.uraian;
        req.result.gambar = req.body.gambar;
        req.result.authId = req.body.authId;
        req.result.sekolahId = req.body.sekolahId;
        req.result.status = req.body.status;
        req.result.isAnonym = req.body.isAnonym;
        req.result.save().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        })
    },
    
    //delete
    async delete(req, res) {
            req.result.destroy().then(result => {
                res.json({ msg: "Delete Success!" });
        })
    }


}