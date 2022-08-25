const express = require('express');
const mysql = require('mysql2');
const db= require('../config/database');



const router = express.Router();
const  connection = mysql.createConnection(db.database);



connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        let  userTableQuery = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address Varchar(255), salary double)"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
           // console.log(result);
            if(result.warningCount === 0){
                console.log('Customer table created');
            }
        })
    }
})



router.get('/',(req,res)=>{
    res.send("customer get");
})


router.post('/',(req,res)=>{

    console.log("hellooo");
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary = req.body.salary

    let  query = "INSERT INTO customer (id, name, address, salary) VALUES (?,?,?,?)"

    connection.query(query, [id, name, address, salary], (err) =>{
        if(err){
            res.send({"message" : "This customer is already Exists"})
        }else{
            res.send({"message" : "Customer successfully added!"})
        }
    })




})


module.exports = router


