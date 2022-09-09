require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth')


//Initialize
app.use('/api', authRoutes)

/* app.get("/getNinjas", (req, res) => {
    console.log("Get User");
})
 */

const port = process.env.PORT || 3005;
app.listen(port, () =>{
    console.log("Server up @ port 3000");
});