import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InterestsField from "./InterestsField";
import { GetAxios } from "../utils/getAxios";
import { fetchPersonalInterests } from "../store/interestSlice";
import axios from "axios";

const PersonalInfo = () => {
  const { username, name, lastName, email } = useSelector(
    (state) => state.login,
  );
  const dispatch = useDispatch()
  const [userData, setUserdata] = useState([])
  const { token } = useSelector((state) => state.login)

  const fetchPersonalInteredtData = async () => {
    try {
      const response = await GetAxios("http://195.35.56.202:8080/users/me", token);
      setUserdata(response.data)
      dispatch(fetchPersonalInterests(response.data.interests))
      setSelectedFile(null)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPersonalInteredtData();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', selectedFile);
      const response = await axios.post('http://195.35.56.202:8080/upload/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        fetchPersonalInteredtData();
      }

    } catch (error) {
      console.error('Error uploading profile picture:', error);
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
              <img src={`http://195.35.56.202:8080/${userData?.user?.picture}`} width="200" alt="Default" />

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

      <InterestsField />
    </div>
  );
};

export default PersonalInfo;
