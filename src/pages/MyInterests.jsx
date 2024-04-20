/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPersonalInterests } from "../store/interestSlice";
import { GetAxios } from "../utils/getAxios";
import axios from "axios";

const MyInterests = () => {
    const { personalInterest, loading } = useSelector((state) => state.interests);
    const dispatch = useDispatch()

    const { token } = useSelector((state) => state.login);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAxios("https://fast-quora.onrender.com/users/me", token);
                dispatch(fetchPersonalInterests(response.data.interests))
                console.log("🚀 ~ fetchData ~ response.data.interests:", response.data.interests)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const deleteInterest = async (interestId) => {
        try {
            await axios.delete('https://fast-quora.onrender.com/category', {
                data: { category_id: interestId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            // Filter the personalPosts array to remove the deleted post
            const updatedInterest = personalInterest.filter((post) => post.id !== interestId);

            // Dispatch an action to update the state with the filtered array
            dispatch(fetchPersonalInterests(updatedInterest));
        } catch (error) {
            console.log(error); // Handle error properly
        }
    };


    if (loading) {
        return <>
            <h1>Yuklenir</h1>
        </>
    }



    return (
        <div className="myInterest">
            <h2>My Interests</h2>
            <div>
                <ul className="posts">
                    {personalInterest?.map((interest) => (
                        <li className="myInterests" key={interest.id}>
                            <p>{interest.name}</p> -
                            <button onClick={() => deleteInterest(interest.id)}>✘</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyInterests;
