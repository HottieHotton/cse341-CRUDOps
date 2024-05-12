const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const {initDb} = require("./db/connect");

initDb((err) =>{
    if(err){
        console.error(err);
    }else{
        app.listen(port, () => {console.log(`Database Online. Listening on port ${port}`);});
        app.use(bodyParser.json());
        app.use('/', require("./routes"));
    }
})