const express = require('express');
const app = express();
const appRoutes = require("./routes/route")
app.use(express.json());
app.use("/api",appRoutes)

app.listen(3001,()=>{
    console.log('App is running on port....')
})