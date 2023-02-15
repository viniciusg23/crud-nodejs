const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const functionary = require("./routes/functionaryRouter");
const occupation = require("./routes/occupationRouter");

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());



app.use("/", express.static(path.join(__dirname, "frontend")));

app.use("/functionary", functionary);

app.use("/occupation", occupation);




app.listen(PORT, ()=>{
    console.log("Server Running...", PORT);
})