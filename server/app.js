const express = require('express');
const app = express();
const appRoutes = require("./routes/route")
const cors = require('cors')
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use("/api",appRoutes)

app.listen(3001,()=>{
    console.log('App is running on port....')
})