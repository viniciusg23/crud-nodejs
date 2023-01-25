const express = require("express")
const app = express();
const functionary = require("./routes/functionaryRouter");

const path = require("path");
const PORT = 3000;

app.use("/", express.static(path.join(__dirname, "frontend")));

app.use("/functionary", functionary);


app.listen(PORT, ()=>{
    console.log("Server Running...", PORT);
})