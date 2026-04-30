// const express = require("express");
// const cors = require("cors");

// const leadRoutes = require("./routes/leadRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());


// app.use("/leads", leadRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.set("db", pool);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/leads", leadRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});