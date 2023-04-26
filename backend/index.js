const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const app = express();


//registering middlewares
dotEnv.config();
require('./passport/passport');
const routes = require('./routes');
app.use(cors());
app.use(express.json());

app.use('/', routes);
//listening to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});