const mongoose = require("mongoose");

mongoose

.connect("mongodb://127.0.0.1:27017/BookApp")
.then(() => console.log("DataBase connected Successfully !"))
.catch((err) => console.log(err.message));


