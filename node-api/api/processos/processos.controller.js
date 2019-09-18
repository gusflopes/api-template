'use strict';

const Processo = require('../processos/processos.model');

module.exports = {

    create: (req, res) => {
        let token = req.headers['x-access-token'];

        Processo.create(req.body, (err, processoDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({auth: true, token: token , data: processoDetails, message: "Processo Created Successfully" });

        })
    },

    index: (req, res) => {
        let token = req.headers['x-access-token'];
        Processo
        .find({ pending: { $ne: false } } && {organization_id: req.body.organization_id })
        .exec((err, processoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: processoDetails, message: "Processo Details fetched Successfully" });
        })
    },

    join_index: (req, res) => {
        let token = req.headers['x-access-token'];
        Processo
        .aggregate([{"$lookup": { from: 'clientes', localField: "cliente", foreignField: 'nome', as: 'cliente_processo'  }},
            { $unwind: '$cliente_processo' },
        ])
        //.find({ pending: { $ne: false } } && {organization_id: req.body.organization_id })
        .exec((err, processoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: processoDetails, message: "Processo Details fetched Successfully" });
        })
    },    

    retrieve: (req, res) => {
        let token = req.headers['x-access-token'];
        const processoId = req.params.id;

        Processo
        .findOne({_id:processoId})
        .exec((err, processoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: processoDetails, message: "Processo Details fetched Successfully" });
        })
    },

    update: (req, res)=>{
        let token = req.headers['x-access-token'];
        const processoId = req.params.id;
        Processo
        .findByIdAndUpdate(processoId, { $set: req.body }).exec((err, processoDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: req.body, message: "Processo updated" });

        })
    },    
    
    delete: (req, res)=>{
        let token = req.headers['x-access-token'];
        const processoId = req.params.id;
        Processo
        .findByIdAndUpdate(processoId, { $set: { is_active: false } }).exec((err, processoDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , data: processoDetails, message: "Processo Deleted" });

        })
    },

    complete: (req, res)=>{
        let token = req.headers['x-access-token'];
        const processoId = req.params.id;
        Processo
        .findByIdAndUpdate(processoId, { pending: false })
        .exec((err, processoDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({auth: true, token: token , message: "Processo concluído." });

        })
    },

    indexUser: (req, res) => {
        let token = req.headers['x-access-token'];
        Processo
        .find({ pending: { $ne: false } } && {organization_id: req.body.organization_id} && {assignedTo: req.body.client_id})
        .exec((err, processoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: processoDetails, message: "Processo Details fetched Successfully" });
        })
    },
}