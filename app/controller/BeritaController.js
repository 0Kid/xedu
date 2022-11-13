const { berita } = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");
const randomstring = require("randomstring");

module.exports = {
    async create(req, res) {   
        let result = await berita.create({
            judul: req.body.judul,
            image: req.body.image,
            content: req.body.content,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let result = await berita.findByPk(req.params.id);
        if (!result) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.result = result;
            next();
        }
    },

    async index(req, res) {
        let result = await berita.findAll({
         
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
        req.result.judul = req.body.judul;
        req.result.image = req.body.image;
        req.result.content = req.body.content;
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