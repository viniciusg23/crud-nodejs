const express = require("express")
const app = express();
const cors = require("cors");
const functionary = require("./routes/functionaryRouter");
const occupation = require("./routes/occupationRouter");

const path = require("path");
const PORT = 3000;

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());



app.use("/", express.static(path.join(__dirname, "frontend")));

app.use("/functionary", functionary);

app.use("/occupation", occupation);




app.listen(PORT, ()=>{
    console.log("Server Running...", PORT);
})
