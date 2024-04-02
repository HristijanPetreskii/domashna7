const express = require("express");
const app = express();

const {getAn, postAn} = require("./controller/Ap");

app.use(express.urlencoded ({extended:false}))

app.get("/Ap", getAn);
app.post("/Ap", postAn);

app.listen(8000,(err)=>{
     console.log("server running");
})