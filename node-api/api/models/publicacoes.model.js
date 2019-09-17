'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import ProcessoSchema from './processos.model';
import ClienteSchema from './clientes.model';
import PrazosSchema from './prazos.model';

const PublicacoesSchema = new Schema({
   // Relacionamento
   escritorio_id : {
       type: String,
       required: true
   },
   numero_processo : {
      type: String
  },
  // Campos próprios
   data : {
      type: Date,
   },
   descricao: {
      type: String,
   },
   leitura: {
      type: Boolean,
      default: false
   },

   // Funcionalidades
   is_active : {
      // False = 'deletado'
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

PublicacoesSchema.pre('find', function () {
   this.where({ is_active: { $ne: false } });
});


module.exports = mongoose.model('Publicacoes', PublicacoesSchema);