const express = require('express');


const app = express();

PORT = 3000;
app.listen(PORT,()=>{
    console.log("\x1b[33m%s\x1b[0m",`Running in ${PORT}`);
})