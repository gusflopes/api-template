'use strict';

const Cliente = require('./clientes.model');

module.exports = {

    create: (req, res) => {
        let token = req.headers['x-access-token'];

        Cliente
        .create(req.body, (err, clienteDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({auth: true, token: token , data: clienteDetails, message: "Cliente Created Successfully" });
        })
    },

    index: (req, res) => {
        let token = req.headers['x-access-token'];
        Cliente
        .find({ pending: { $ne: false } } && {organization_id: req.body.organization_id })
        .exec((err, clienteDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: clienteDetails, message: "Cliente Details fetched Successfully" });
        })
    },

    retrieve: (req, res) => {
        let token = req.headers['x-access-token'];
        const clienteId = req.params.id;

        Cliente
        .findOne({_id:clienteId})
        .exec((err, clienteDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: clienteDetails, message: "Cliente Details fetched Successfully" });
        })
    },

    update: (req, res)=>{
        let token = req.headers['x-access-token'];
        const clienteId = req.params.id;
        Cliente
        .findByIdAndUpdate(clienteId, { $set: req.body }).exec((err, clienteDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: req.body, message: "Cliente updated" });

        })
    },    
    
    delete: (req, res)=>{
        let token = req.headers['x-access-token'];
        const clienteId = req.params.id;
        Cliente
        .findByIdAndUpdate(clienteId, { $set: { is_active: false } }).exec((err, clienteDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: req.body, message: "Cliente Deleted" });

        })
    },
}