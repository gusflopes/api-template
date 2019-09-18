'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import ClienteSchema from '../models/clientes.model';
// import PrazosSchema from '../models/prazos.model';

const ProcessoSchema = new Schema({
   // Relacionamento
   // sera modificado quando for refazer Usuarios
   organization_id : {
      type: String,
      //required: true
   },
   /*cliente: [ClienteSchema],
   publicacao: [PublicacaoSchema],
   Prazo: [PrazoSchema],
   */

   pasta: {
      //auto incrementar no FrontEnd
      type: String,
      index: true,
      required: true
   },
   numero_processo : {
         type: String,
         required: false
   },
   cliente : {
      type: String,
      required: false
   },
   tipo: {
      type: String,
      required: false,
   },
   status: {
      type: String,
      required: false,
   },
   //Campos complementares
   propositura: {
      type: Date,
   },
   juizo: {
      type: String,
   },
   comarca: {
      type: String,
   },
   tribunal: {
      type: String,
   },
   observacoes: {
      type: String,
   },
   
   //Funcionalidade
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

   ProcessoSchema.pre('find', function () {
   this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Processo', ProcessoSchema);