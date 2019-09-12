'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    organization_id : {
        type: String,
        //required: true
    },
    
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
    },
    assignedTo : {
       type: String,
       required: true
    },
    dueDate : {
        type: Date,
        required: true
    },
    pending : {
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

TaskSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Task', TaskSchema);