export default function Sidebar({ setPage }) {

  return (
    <div style={{
      width: "200px",
      height: "100vh",
      background: "#1e293b",
      color: "white",
      padding: "20px"
    }}>

      <h3>ESG Panel</h3>

      <button onClick={() => setPage("dashboard")}>
        📊 Dashboard
      </button>

      <br /><br />

      <button onClick={() => setPage("upload")}>
        📤 Upload Data
      </button>

    </div>
  );
}