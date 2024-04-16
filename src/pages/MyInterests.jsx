import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MyInterests = () => {
    // State to store the fetched posts
    const [posts, setPosts] = useState([]);

    const { token } = useSelector((state) => state.login);

    const myToken = token;

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, [myToken]);

    // Function to fetch posts
    const fetchPosts = async () => {
        try {
            const response = await fetch("https://fast-quora.onrender.com/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${myToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data.interest); // Update state with fetched posts
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    console.log(Object.values(posts))

    return (
        <div>
            <h2>My Interests</h2>
            <div>
                <ul className="posts">
                    {Object.values(posts).map((post, index) => (
                        <li className="singlePost" key={index}>
                            <p>Category: {post}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyInterests;
