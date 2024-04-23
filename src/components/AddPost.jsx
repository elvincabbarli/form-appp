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

  const sendToServer = () => {
    axios
      .post(
        "https://fast-quora.onrender.com/post",
        {
          heading: postData.heading,
          content: postData.content,
          category_id: postData.categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPostData({
          heading: "",
          content: "",
          categoryId: "",
        });
        toast.success("Paylaşıldı");
        return response;
      })
      .catch((error) => {
        toast.error("Xeta Baş verdi");
        console.error("Error sending value to server:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAxios(
          "https://fast-quora.onrender.com/category",
          token
        );
        dispatch(fetchAllInterests(response.data));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="post-heading">
        <div>
          <label htmlFor="heading">Başlıq</label> &nbsp;&nbsp;
          <input
            type="text"
            id="heading"
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

        <div>
          <label htmlFor="category">Kateqoriya Seçin</label> &nbsp;&nbsp;&nbsp;
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
      <button
        style={{ marginTop: "15px" }}
        className="upload-pic"
        onClick={sendToServer}
      >
        Paylaş
      </button>
      <ToastContainer />

      {error && <h1>{error}</h1>}
    </div>
  );
};

export default AddPost;
