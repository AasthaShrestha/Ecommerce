const express = require("express");
const cors = require("cors")
require("express-async-errors");
const connectDB =require("./config/db");
const productRoutes=require('./routes/product.route');
const authRoutes=require('./routes/auth.route');
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

connectDB();

app.use(express.static("uploads"));

app.use(cors())
app.use(cookieParser());
app.use(express.static("uploads"));

app.use(express.json())
app.use('/api/products',productRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next) =>{
  console.log(err);
  res.json("error appear");

});
// app.get("/", (req, res) => {
//   res.send("Bello World!");
// });
// app.get("/test", (req, res) => {
//   res.send("Bello!I am Aastha Shrestha");
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
