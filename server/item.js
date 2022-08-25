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
        let userTableQuery = "CREATE TABLE IF NOT EXISTS items (code VARCHAR(255) PRIMARY KEY, name VARCHAR(255), discription Varchar(255), price double, qtyOnHand int(10))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
          //  console.log(result);
            if(result.warningCount === 0){
                console.log('Item table created');
            }
        })
    }
})



router.post('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const discription = req.body.discription
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand

    console.log(qtyOnHand);



    var query = "INSERT INTO items (code, name, discription, price, qtyOnHand) VALUES (?,?,?,?,?)"


    connection.query(query, [code, name, discription, price, qtyOnHand], (err) =>{
        if(err){
            //console.log(err);
            res.send({"message" : err});
        }else{
            res.send({"message" : "Item successfully added!"})
        }
    })
})


router.get('/',(req, res) =>{
    let query = "SELECT * FROM items"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})


router.put('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const discription = req.body.discription
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand

    var query = "UPDATE items SET name=?, discription=?, price=?, qtyOnHand=? WHERE code=?"

    connection.query(query, [name, discription, price, qtyOnHand, code], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'Item Successfully Updated'})
        }else{
            res.send({'message' : 'Item not found'})
        }
    })
})

router.delete('/:code', (req, res) => {
    const code = req.params.code

    var query = "DELETE FROM items WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Item deleted' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})




module.exports = router