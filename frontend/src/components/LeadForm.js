import React, { useState } from "react";

function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Enter valid 10-digit phone");
      return;
    }

    await fetch("http://localhost:5000/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <select name="source" onChange={handleChange}>
        <option>Call</option>
        <option>WhatsApp</option>
        <option>Field</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}

export default LeadForm;