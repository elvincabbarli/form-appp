/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAxios } from "../utils/getAxios";
import { fetchAllInterests } from "../store/interestSlice";

const AddPost = () => {
  const [postData, setPostData] = useState({
    heading: "",
    content: "",
    categoryId: "",
    images: [],
  });
  const { interestAll } = useSelector((state) => state.interests);
  const { token } = useSelector((state) => state.login);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (content) => {
    setPostData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPostData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const sendToServer = async () => {
    if (!postData.heading || !postData.content || !postData.categoryId) {
      toast.error("Bütün sahələri doldurun.");
      return;
    }

    const formData = new FormData();
    formData.append("heading", postData.heading);
    formData.append("content", postData.content);
    formData.append("category_id", postData.categoryId);

    // Append images in the order they were selected
    postData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://195.35.56.202:8080/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPostData({
        heading: "",
        content: "",
        categoryId: "",
        images: [],
      });
      toast.success("Paylaşıldı");
      return response;
    } catch (error) {
      toast.error("Xeta Baş verdi");
      console.error("Error sending value to server:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAxios(
          "http://195.35.56.202:8080/category",
          token
        );
        dispatch(fetchAllInterests(response.data));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  return (
    <div>
      <div className="post-heading">
        <div className="post-header">
          <label htmlFor="heading">
            <b>Başlıq</b>
          </label>
          <input
            type="text"
            value={postData.heading}
            onChange={(e) =>
              setPostData((prevData) => ({
                ...prevData,
                heading: e.target.value,
              }))
            }
            placeholder="Post başlığı"
          />
        </div>

        <div className="post-header">
          <label htmlFor="category">
            <b>Kateqoriya</b>
          </label>
          <select
            name="category"
            id="category"
            value={postData.categoryId}
            onChange={(e) =>
              setPostData((prevData) => ({
                ...prevData,
                categoryId: e.target.value,
              }))
            }
          >
            <option value="">Seçin</option>
            {interestAll?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ReactQuill
        value={postData.content}
        onChange={handleChange}
        theme="snow"
      />

      <div className="post-header-2">
        <label style={{ marginBottom: "10px" }} htmlFor="images">
          <b>Şəkillər</b>
        </label>
        <input
          type="file"
          className="custom-file-input"
          accept="image/*,image/gif"
          id="images"
          multiple
          onChange={handleImageChange}
        />
      </div>

      <div className="add-post">
        <button
          style={{ margin: "15px 0" }}
          className="upload-pic"
          onClick={sendToServer}
        >
          Paylaş
        </button>
      </div>
      <ToastContainer />

      {error && <h1>{error.message}</h1>}
    </div>
  );
};

export default AddPost;
