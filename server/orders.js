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
        let  userTableQuery = "CREATE TABLE IF NOT EXISTS orders (orderId VARCHAR(255) PRIMARY KEY, " +
            "date VARCHAR(255), customerId Varchar(255))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
           // console.log(result);
            if(result.warningCount === 0){
                console.log('Order table created');

            }
        })
    }
})



connection.connect(function (err) {

    if(err){

    }else{

        let orderDetailQuery = "CREATE TABLE IF NOT EXISTS orderDetail(" +
            "    orderId VARCHAR(6)," +
            "    itemCode VARCHAR(6)," +
            "    orderQty int," +
            "    cost DOUBLE," +
            "    CONSTRAINT PRIMARY KEY (orderId,itemCode)," +
            "    CONSTRAINT FOREIGN KEY (orderId) REFERENCES orders(orderId) ON DELETE CASCADE ON UPDATE CASCADE," +
            "    CONSTRAINT FOREIGN KEY (itemCode) REFERENCES items(code) ON DELETE CASCADE ON UPDATE CASCADE" +
            "" +
            ");"


        connection.query(orderDetailQuery, function (err,result) {
            if(err) throw  err

            if(result.warningCount == 0){
                console.log('OrderDetail table created');
            }
        })

    }

})






module.exports = router;