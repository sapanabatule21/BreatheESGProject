import { useState } from "react";
import axios from "axios";

const API_BASE = "https://breathe-esg-backend-t0da.onrender.com";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("SAP");

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await axios.post(
        `${API_BASE}/api/emissions/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Request Failed");
    }
  };

  return (
    <div>
      <h3>Upload Data</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="SAP">SAP</option>
        <option value="UTILITY">Utility</option>
        <option value="TRAVEL">Travel</option>
      </select>

      <br />
      <br />

      <button onClick={upload}>Upload File</button>
    </div>
  );
}