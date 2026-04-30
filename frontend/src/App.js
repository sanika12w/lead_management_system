import React from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Lead Management System</h1>
      <LeadForm />
      <LeadList />
    </div>
  );
}

export default App;