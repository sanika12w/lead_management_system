// // const express = require("express");
// // const router = express.Router();

// // const {
// //   getLeads,
// //   createLead,
// //   updateLead,
// //   deleteLead,
// // } = require("../controllers/leadController");

// // router.get("/", getLeads);
// // router.post("/", createLead);
// // router.put("/:id", updateLead);
// // router.delete("/:id", deleteLead);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// // GET all leads
// router.get("/", async (req, res) => {
//   const db = req.app.get("db");
//   const result = await db.query("SELECT * FROM leads ORDER BY id ASC");
//   res.json(result.rows);
// });

// // ADD lead
// router.post("/", async (req, res) => {
//   const db = req.app.get("db");
//   const { name, phone, source } = req.body;

//   await db.query(
//     "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3)",
//     [name, phone, source]
//   );

//   res.send("Lead added");
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   const db = req.app.get("db");
//   const { status } = req.body;

//   await db.query(
//     "UPDATE leads SET status=$1 WHERE id=$2",
//     [status, req.params.id]
//   );

//   res.send("Updated");
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   const db = req.app.get("db");

//   await db.query("DELETE FROM leads WHERE id=$1", [req.params.id]);

//   res.send("Deleted");
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../db");   // ✅ use your db.js

// GET all leads
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM leads ORDER BY id ASC");
  res.json(result.rows);
});

// ADD lead
router.post("/", async (req, res) => {
  const { name, phone, source } = req.body;

  await pool.query(
    "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3)",
    [name, phone, source]
  );

  res.send("Lead added");
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  await pool.query(
    "UPDATE leads SET status=$1 WHERE id=$2",
    [status, req.params.id]
  );

  res.send("Updated");
});

// DELETE
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM leads WHERE id=$1", [req.params.id]);
  res.send("Deleted");
});

module.exports = router;