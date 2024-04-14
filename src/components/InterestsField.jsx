import axios from "axios";
import { useState } from "react";

function InterestsField() {
  const [interests, setInterests] = useState([]);

  const handleInterestChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setInterests([...interests, id]);
    } else {
      setInterests(interests.filter((interest) => interest !== id));
    }
  };

  const sendSelectedItemsToBackend = () => {
    const backendEndpoint =
      "https://your-backend-service.com/api/selectedItems";

    const data = {
      selectedItems: interests.map((interest) => ({
        id: interest,
        name: `Interest ${interest}`,
      })),
    };


    axios
      .post(backendEndpoint, data)
      .then((response) => {
        console.log("Data sent to backend successfully:", response.data);
        // Handle response from backend if needed
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
        // Handle error if needed
      });
  };

  return (
    <div className="interests-container">
      <h3 className="interests-heading">Interests</h3>
      <label htmlFor="interest1" className="interest-label">
        <input
          type="checkbox"
          id="interest1"
          name="interest"
          onChange={handleInterestChange}
          checked={interests.includes("interest1")}
          className="interest-checkbox"
        />
        Interest 1
      </label>
      <label htmlFor="interest2" className="interest-label">
        <input
          type="checkbox"
          id="interest2"
          name="interest"
          onChange={handleInterestChange}
          checked={interests.includes("interest2")}
          className="interest-checkbox"
        />
        Interest 2
      </label>
      <label htmlFor="interest3" className="interest-label">
        <input
          type="checkbox"
          id="interest3"
          name="interest"
          onChange={handleInterestChange}
          checked={interests.includes("interest3")}
          className="interest-checkbox"
        />
        Interest 3
      </label>
      {/* Add more interest fields as needed */}
      <div className="selected-interests">
        Selected Interests:{" "}
        {interests.map((interest) => (
          <span key={interest}>{interest}, </span>
        ))}
      </div>
      <button
        style={{ marginTop: "10px" }}
        className="upload-pic"
        onClick={sendSelectedItemsToBackend}
      >
        Yadda Saxla
      </button>
    </div>
  );
}

export default InterestsField;
