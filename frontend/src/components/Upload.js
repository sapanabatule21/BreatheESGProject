import { useState } from "react";
import axios from "axios";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [type, setType] = useState("SAP");

  const upload = async () => {

  try {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", type);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/emissions/upload/",
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

      <br /><br />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="SAP">SAP</option>
        <option value="UTILITY">Utility</option>
        <option value="TRAVEL">Travel</option>
      </select>

      <br /><br />

      <button onClick={upload}>
        Upload File
      </button>

    </div>
  );
}