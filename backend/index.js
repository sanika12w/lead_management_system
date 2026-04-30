const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// use routes
app.use("/leads", leadRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});