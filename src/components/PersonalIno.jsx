import { useSelector } from "react-redux";
import profPic from "../assets/prof.jpg";
import { useState } from "react";

const PersonalIno = () => {
  const { username, name, lastName, email } = useSelector(
    (state) => state.login
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      fetch("your-backend-api-url", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from backend:", data);
          // Handle response from backend as needed
        })
        .catch((error) => {
          console.error("Error sending image to backend:", error);
        });
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div className="personal-info-cont">
      <div className="welcome">
        <div className="welcome-first">
          <div className="profile-pic">
            <label className="-label" htmlFor="file">
              <span className="glyphicon glyphicon-camera"></span>
              <span>Şəkil Əlavə Et</span>
            </label>
            <input id="file" type="file" onChange={handleFileChange} />
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                width="200"
                alt="Selected"
              />
            ) : (
              <img src={profPic} width="200" alt="Default" />
            )}
          </div>
          {selectedFile ? (
            <button className="upload-pic" onClick={handleUpload}>
              Yadda Saxla
            </button>
          ) : null}
        </div>
        <div>
          <div className="welcome-note">
            <span className="welcome-span">Xoş Gəlmisiniz: </span>{" "}
            <span>{username}</span> <br />
          </div>
          <div className="welcome-note">
            <span className="nots">Bildirim: </span>
            <span>9</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="personal-infos">
        <table>
          <tbody>
            <tr>
              <td className="info-label">Soyad: </td>
              <td className="info-value">{lastName}</td>
            </tr>
            <tr>
              <td className="info-label">Ad: </td>
              <td className="info-value">{name}</td>
            </tr>
            <tr>
              <td className="info-label">Email:</td>
              <td className="info-value">{email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </div>
  );
};

export default PersonalIno;
