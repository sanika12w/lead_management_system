const pool = require("../db");

// GET all leads
exports.getLeads = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ADD lead
exports.createLead = async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    const result = await pool.query(
      "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, source]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE status
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE leads SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.send("Updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM leads WHERE id = $1", [id]);

    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};