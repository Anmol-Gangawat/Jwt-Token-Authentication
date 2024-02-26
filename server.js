const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cron = require("node-cron");
const dotenv = require("dotenv").config();

connectDb()
const app = express();

const port = process.env.PORT || 5000;

//cron schedule
// cron.schedule("*/10 * * * * *", function() { 
//     console.log("running a task every 10 second"); 
// });

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler)


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})