import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import { useState } from "react";

function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex" }}>

      <Sidebar setPage={setPage} />

      <div style={{ flex: 1, padding: "20px" }}>

        <h2>🌍 Breathe ESG Dashboard</h2>

        {page === "dashboard" && <Dashboard />}
        {page === "upload" && <Upload />}

      </div>
    </div>
  );
}

export default App;