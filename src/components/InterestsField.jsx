/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInterests, fetchPersonalInterests } from "../store/interestSlice";
import { GetAxios } from "../utils/getAxios";

function InterestsField() {
  const { token } = useSelector((state) => state.login)
  const { interestAll } = useSelector((state) => state.interests)
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await GetAxios('https://fast-quora.onrender.com/category', token)
        dispatch(fetchAllInterests(response.data))
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  console.log(interestAll)

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCheckboxes((prevState) => [...prevState, value]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const postData = {
        categories: selectedCheckboxes,
      };

      const response = await axios.post(
        "https://fast-quora.onrender.com/category",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="interests-container">
      <h3 className="interests-heading">Maraqlar</h3>
      <div className="interest-div">
        {interestAll?.map((item) => (
          <label htmlFor={item.id} className="interest-label" key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              name="interest"
              value={item.id}
              onChange={handleCheckboxChange}
              checked={selectedCheckboxes.includes(item.id)}
              className="interest-checkbox"
            />
            {item.name}
          </label>
        ))}

        {/* Rest of your checkboxes */}
      </div>
      <button
        style={{ marginTop: "10px" }}
        className="upload-pic"
        onClick={handleSubmit}
      >
        Yadda Saxla
      </button>
    </div>
  );
}

export default InterestsField;
