/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInterests, fetchPersonalInterests } from "../store/interestSlice";
import { GetAxios } from "../utils/getAxios";

function InterestsField() {
  const { token } = useSelector((state) => state.login);
  const { interestAll, personalInterest } = useSelector((state) => state.interests);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  useEffect(() => {
    (async function fetchCategoryData() {
      try {
        const response = await GetAxios('http://195.35.56.202:8080/category', token);
        dispatch(fetchAllInterests(response.data));
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  const handleCheckboxChange = async (item, event) => {
    const value = parseInt(event.target.value);
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      const updatedInterest = [...personalInterest, item];
      dispatch(fetchPersonalInterests(updatedInterest));
    } else {
      setDeletedId(value);
      const updatedInterest = personalInterest.filter((post) => post.id !== value);
      dispatch(fetchPersonalInterests(updatedInterest));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const personalInterestId = personalInterest.map((item) => item.id);

      const postData = {
        categories: personalInterestId,
      };

      if (isChecked) {
        await axios.post(
          "http://195.35.56.202:8080/category",
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.delete('http://195.35.56.202:8080/category', {
          data: { category_id: deletedId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
      }
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
              onChange={(event) => handleCheckboxChange(item, event)}
              // checked={!!personalInterest.find(arg => arg.id === item.id)}
              className="interest-checkbox"
            />
            {item.name}
          </label>
        ))}
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
