const express = require("express");
const cors = require("cors");
// const dotEnv = require("dotenv");
require("./utils/envParser").getEnv()

const app = express();

//registering middlewares
// dotEnv.config();
require("./passport/passport");
const routes = require("./routes");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/", routes);
//listening to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
