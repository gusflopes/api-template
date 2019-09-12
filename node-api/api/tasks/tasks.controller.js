'use strict';

const Task = require('../tasks/tasks.model');
const NewToken = require('../auths/newToken');

module.exports = {


    index: (req, res) => {
        //console.log("Chegamos no controlador? E o token?");
        //console.log(req.headers['x-access-token']);
        let token = req.headers['x-access-token'];
        
        //console.log(token);
        
        Task
        .find({ pending: { $ne: false } } && {organization_id: req.body.organization_id })
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            //res.status(200).json({ message: "Task Details fetched Successfully", data : taskDetails});
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task Details fetched Successfully" });
        })
    },
    indexClosed: (req, res) => {
        let token = req.headers['x-access-token'];
        
        Task
        .find({ pending: { $ne: true } })
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            //res.status(200).json({ message: "Task Details fetched Successfully", data : taskDetails});
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task Details fetched Successfully" });

        })
    },
    retrieve: (req, res) => {
        let token = req.headers['x-access-token'];
        const taskId = req.params.id;

        Task
        .findOne({_id:taskId})
        .exec((err, taskDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task Details fetched Successfully" });
            //res.status(200).json({ message: "Taskr Detail fetched Successfully", data : taskDetails});
        })
    },    
    create: (req, res) => {
        let token = req.headers['x-access-token'];

        Task.create(req.body, (err, taskDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            //res.status(201).json({ message: "Task Created Successfully", data : taskDetails});
            res.status(201).json({auth: true, token: token , data: taskDetails, message: "Task Created Successfully" });

        })
    },
    update: (req, res)=>{
        let token = req.headers['x-access-token'];

        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { $set: req.body }).exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            //res.status(200).json({ message: "Task updated" });
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task updated" });

        })
    },    
   complete: (req, res)=>{
        let token = req.headers['x-access-token'];

        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { pending: false })
        .exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            //res.status(200).json({ message: "Task completed" });
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task completed" });

        })
    },
    
    delete: (req, res)=>{
        let token = req.headers['x-access-token'];

        const taskId = req.params.id;
        Task
        .findByIdAndUpdate(taskId, { $set: { is_active: false } }).exec((err, taskDetails) => {
            if (err) res.status(500).json({message : err})
            //res.status(200).json({ message: "Task Deleted" });
            res.status(200).json({auth: true, token: token , data: taskDetails, message: "Task Deleted" });

        })
    }
    
}