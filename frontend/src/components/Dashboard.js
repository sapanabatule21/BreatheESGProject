import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  // FETCH DATA
  const fetchData = async () => {

    const res = await axios.get(
      "http://127.0.0.1:8000/api/emissions/"
    );

    setData(res.data);
  };

  // APPROVE FUNCTION
  const approve = async (id) => {

    await axios.post(
      `http://127.0.0.1:8000/api/emissions/approve/${id}/`
    );

    alert("Record Approved");

    fetchData();
  };

  // FILTER
  const filteredData = data.filter(item => {

    if (filter === "ALL") return true;

    return item.status === filter;
  });

  return (
    <div>

     

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: "20px" }}>

        <button onClick={() => setFilter("ALL")}>
          All
        </button>

        <button onClick={() => setFilter("PENDING")}>
          Pending
        </button>

        <button onClick={() => setFilter("APPROVED")}>
          Approved
        </button>

      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: "20px" }}>

        <h3>Total Records: {data.length}</h3>

        <h3>
          Approved:
          {
            data.filter(
              item => item.status === "APPROVED"
            ).length
          }
        </h3>

        <h3>
          Pending:
          {
            data.filter(
              item => item.status === "PENDING"
            ).length
          }
        </h3>

      </div>

      {/* TABLE */}
      <table
        border="1"
        width="100%"
        cellPadding="10"
      >

        <thead>

          <tr>

            <th>Category</th>

            <th>Scope</th>

            <th>Activity</th>

            <th>Total Emissions</th>

            <th>Status</th>

            <th>Risk</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredData.map((item) => (

            <tr
              key={item.id}

              style={{
                backgroundColor:
                  item.suspicious
                    ? "#ffcccc"
                    : "white"
              }}
            >

              <td>{item.category}</td>

              <td>{item.scope}</td>

              <td>
                {item.activity_value} {item.unit}
              </td>

              <td>
                {item.total_emissions}
              </td>

              <td
                style={{
                  color:
                    item.status === "APPROVED"
                      ? "green"
                      : "orange"
                }}
              >

                {item.status === "APPROVED"
                  ? "✅ Approved"
                  : "🟡 Pending"}

              </td>

              <td>

                {item.suspicious
                  ? "⚠️ High"
                  : "Normal"}

              </td>

              <td>

                {
                  item.status === "PENDING" && (

                    <button
                      onClick={() => approve(item.id)}
                    >
                      Approve
                    </button>

                  )
                }

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}