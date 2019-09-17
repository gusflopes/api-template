'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntimationSchema = new Schema({
    organization_id : {
        type: String,
        //required: true
    },
    process_number: {
        type: String,
        required: false

      },
    date : {
        type: Date,
        required: true
    },
    description : {
        type: String,
    },
    read : {
        type: Boolean,
        default: false
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

IntimationSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Intimation', IntimationSchema);