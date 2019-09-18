'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
   organization_id : {
      type: String,
      //required: true
   },

   nome: { type: String, index: true, required: true },
   cpf_cnpj : { type: String, required: false, minlength: 11, maxlength: 15 },
   fiscal : {
      razao_social : { type: String },
      insc_municipal: { type: String },
      insc_estadual: { type: String },
   },
   email : { type: String, required: false },
   telefone : { type: String, required: false },
   celular : { type: String, default: false },
   contato : { type: String, required: false },
   endereco: {
      cep: { type: String, required: false },
      logradouro : { type: String, required: false },
      numero : { type: String, required: false },
      complemento : { type: String, required: false },
      bairro: { type: String, require: false },
      cidade : { type: String, required: false, default: 'Campo Grande' },
      uf : { type: String, required: false, default: 'MS' },
      pais : { type: String, required: false, default: 'Brasil' },
   },  
   dados_bancarios : {
      codigo: { type: String, required: false, },
      banco: { type: String, required: false },
      agencia: { type: String, required: false, },
      conta: { type: String, required: false, },
      //Tipo = true for conta-corrente || false for Poupança
      tipo: { type: Boolean, required: false, },
      operacao: { type: String, required: false, }
   },
   
   is_active : { type: Boolean, default: true }
   },{
   id: false,
   toObject: { virtuals: true, getters: true },
   toJSON: { virtuals: true, getters: true, setters: false },
   timestamps: true
   });

   ClienteSchema.pre('find', function () {
   this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Cliente', ClienteSchema);