const express = require("express");

const numberManagement = require("./controllers/number-management");

const app = express();

app.use(express.json());

app.use("/", (req, res) => numberManagement(req, res));

app.listen(4000, () => console.log("Server is up and running on port 4000"));
