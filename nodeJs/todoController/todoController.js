"use strict";
const request = require('request'),
    _ = require('underscore'),
    async = require("async"),
    moment = require('moment'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/";
    const mongodb = new MongoClient(url, { useUnifiedTopology: true });

module.exports = function (err) {
    if (err) throw err;
    let self = {};
    self.getUserList = (req, res) => {
        
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        mongodb.db('local').collection('userList').find({}).toArray(function (err, result) {
            if(err) return res.send(err);
            res.send(result);
        });
    })
}
self.taskDetails = (req, res) => {
        
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        mongodb.db('local').collection('taskList').findOne({task_id: Number(req.body.id)}, (err, result) => {
            console.log(err,result)
            if(err) return res.send(err);
            res.send(result);
        });
    })
}

self.getListOfTask = (req, res) => {
        
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        mongodb.db('local').collection('taskList').find({user_id: Number(req.body.id)}).toArray(function (err, result) {
            if(err) return res.send(err);
            res.send(result);
        });
    })
}
self.addTask = (req, res) => {
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        let payload = {
            user_id: req.body.user_id,
            task_name: req.body.task_name,
            created_on: moment().format(),
            modified_on: '',
            expiry: req.body.expiry,
            completion_status: req.body.completion_status,
            created_by: req.body.created_by
        }
        mongodb.db('local').collection('taskList').insertOne(payload, (err, result) => {
            if(err) return res.send(err);
            res.send({status: true, response: "Task added successfully"});
        });
    })
}
self.editTask = (req, res) => {
    var myquery = { task_id: req.body.task_id };
 
    let payload = {
        $set:   {
        user_id: req.body.user_id,
        task_name: req.body.task_name,
        created_on: req.body.created_on,
        modified_on: moment().format(),
        expiry: req.body.expiry,
        completion_status: req.body.completion_status,
        created_by: req.body.created_by
        }
    }
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        mongodb.db('local').collection('taskList').updateOne( myquery,payload, (err, result) => {
            if(err) return res.send(err);
            res.send({status: true, response: "Task updated successfully"});
        });
    })
}

self.deleteTask = (req, res) => {
    mongodb.connect((err) =>  {
        if (err) return res.send(err);
        mongodb.db('local').collection('taskList').deleteOne({task_id: req.body.id}, (err, result) => {
            if(err) return res.send(err);
            res.send({status: true, response: "Task deleted successfully"});
        });
    })
}

    return self;
}();