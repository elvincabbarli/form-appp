/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postSuccess } from "../store/postSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextEditor = () => {
  const [value, setValue] = useState("");
  const [heading, setHeading] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
  };

  const sendToServer = () => {
    axios
      .post(
        "https://fast-quora.onrender.com/post",
        {
          heading: heading,
          content: value,
          category_id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setHeading("");
        setValue("");
        setCategoryId("");
        toast.success("Paylaşıldı");
      })
      .catch((error) => {
        toast.error("Xeta Baş verdi");
        console.error("Error sending value to server:", error);
      });
  };

  return (
    <div>
      <div className="post-heading">
        <div>
          <label htmlFor="heading">Başlıq</label> &nbsp;&nbsp;
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Post başlığı"
          />
        </div>

        <select
          name="category"
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select</option>
          <option value="1">Select2</option>
          <option value="2">Select3</option>
        </select>
      </div>

      <ReactQuill value={value} onChange={handleChange} theme="snow" />
      <button
        style={{ marginTop: "15px" }}
        className="upload-pic"
        onClick={sendToServer}
      >
        Paylaş
      </button>
      <ToastContainer />
    </div>
  );
};

export default TextEditor;
