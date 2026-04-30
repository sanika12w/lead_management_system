import React, { useEffect, useState } from "react";

function LeadList() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchLeads = async () => {
    const res = await fetch("http://localhost:5000/leads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
  };

  const deleteLead = async (id) => {
    await fetch(`http://localhost:5000/leads/${id}`, {
      method: "DELETE",
    });
    fetchLeads();
  };

 
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const matchesFilter =
      filter === "All" || lead.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
     
<div style={{
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap"
}}>
  <div className="stat-box">Total: {leads.length}</div>
  <div className="stat-box">
    Interested: {leads.filter(l => l.status === "Interested").length}
  </div>
  <div className="stat-box">
    Converted: {leads.filter(l => l.status === "Converted").length}
  </div>
</div>
      <h2>Leads List</h2>

      
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search by name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Interested</option>
          <option>Not Interested</option>
          <option>Converted</option>
        </select>
      </div>

      {filteredLeads.map((lead) => (
        <div key={lead.id} className="lead-card">
          <div className="lead-info">
            <strong>{lead.name}</strong><br />
            {lead.phone} | {lead.source} | {lead.status}
          </div>

          <div className="actions">
            <select
              value={lead.status}
              onChange={(e) => updateStatus(lead.id, e.target.value)}
            >
              <option>Interested</option>
              <option>Not Interested</option>
              <option>Converted</option>
            </select>

            <button onClick={() => deleteLead(lead.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeadList;