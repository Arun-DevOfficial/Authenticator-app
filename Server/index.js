const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./Router/Router");
const PORT = process.env.PORT || 5050;
const db = require("./Config/Database");

//router path
app.use("/", router);


//Server & Database Connection 
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  db.connect((error) => {
    if (error) {
      console.log("INVALID CONNECTION!:",error);
    } else {
      console.log("DATABASE CONNECTED...");
    }
  });
});
