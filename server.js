const express = require('express');

const app = express();




app.get('/',(req,res)=>{
    res.send("application start");
})


app.listen(4000,()=>{console.log(`server is running on http://localhost:${4000}`)});



