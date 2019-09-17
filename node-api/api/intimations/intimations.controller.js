'use strict';

const Intimation = require('./intimation.model');
const NewToken = require('../auths/newToken');

module.exports = {

    create: (req, res) => {
        let token = req.headers['x-access-token'];

        Intimation.create(req.body, (err, intimationDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({auth: true, token: token , data: intimationDetails, message: "Intimation Created Successfully" });

        })
    },

    index: (req, res) => {
        let token = req.headers['x-access-token'];
        Intimation
        .find({ organization_id: req.body.organization_id })
        .exec((err, intimationDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: intimationDetails, message: "Intimation Details fetched Successfully" });
        })
    },

    retrieve: (req, res) => {
        let token = req.headers['x-access-token'];
        const intimationId = req.params.id;

        Intimation
        .findOne({_id:intimationId} && { organization_id: req.body.organization_id })
        .exec((err, intimationDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: intimationDetails, message: "Intimation Details fetched Successfully" });
        })
    },

    update: (req, res)=>{
        let token = req.headers['x-access-token'];
        const intimationId = req.params.id;
        Intimation
        .findByIdAndUpdate(intimationId, { $set: req.body }).exec((err, intimationDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: intimationDetails, message: "Intimation updated" });

        })
    },    
    
    delete: (req, res)=>{
        let token = req.headers['x-access-token'];

        const intimationId = req.params.id;
        Intimation
        .findByIdAndUpdate(intimationId, { $set: { is_active: false } }).exec((err, intimationDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: intimationDetails, message: "Intimation Deleted" });

        })
    },

}