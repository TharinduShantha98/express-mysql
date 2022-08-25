const express = require('express');
const customer = require('../assigment02/server/customer');
const item = require('../assigment02/server/item')
const order = require('../assigment02/server/orders')

const app = express();



app.use(express.json())
app.get('/',(req,res)=>{
    res.send("application start");
})

app.use('/api/customer',customer);
app.use('/api/item',item)
app.listen(4000,()=>{console.log(`server is running on http://localhost:${4000}`)});



