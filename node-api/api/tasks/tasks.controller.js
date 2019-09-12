'use strict';

const Task = require('../tasks/tasks.model');


module.exports = {
    index: (req, res) => {
        Task
        .find({ pending: { $ne: false } })
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Task Details fetched Successfully", data : taskDetails});
        })
    },
    indexClosed: (req, res) => {
        Task
        .find({ pending: { $ne: true } })
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Task Details fetched Successfully", data : taskDetails});
        })
    },
    retrieve: (req, res) => {
        const taskId = req.params.id;
        Task
        .findOne({_id:taskId})
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Taskr Detail fetched Successfully", data : taskDetails});
        })
    },    
    create: (req, res) => {
        Task.create(req.body, (err, taskDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Task Created Successfully", data : taskDetails});
        })
    },
    update: (req, res)=>{
        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { $set: req.body }).exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Task updated" });
        })
    },    
   complete: (req, res)=>{
        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { pending: false })
        .exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Task completed" });
        })
    },
    
    delete: (req, res)=>{
        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { $set: { is_active: false } }).exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Task Deleted" });
        })
    }
    
}