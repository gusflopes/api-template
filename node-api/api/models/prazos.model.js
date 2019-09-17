'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrazoSchema = new Schema({
    escritorio_id : {
        type: String,
        //required: true
    },
    
    numero_processo: {
        type: String,
        required: false
    },
    tipo : {
        type: String,
        required: true
    },
    descricao : {
        type: String,
    },
    responsavel : {
       type: String,
       required: true
    },
    prazo : {
        type: Date,
        required: true
    },
    pendente : {
        type: Boolean,
        default: true
    },
    is_active : {
        type: Boolean,
        default: true
    }
},{
    id: false,
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: { 
        virtuals: true,
        getters: true, 
        setters: false 
    },
    timestamps: true
});

PrazoSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Prazo', PrazoSchema);