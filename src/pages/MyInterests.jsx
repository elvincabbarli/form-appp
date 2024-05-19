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
                const response = await GetAxios("http://195.35.56.202:8080/users/me", token);
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
            await axios.delete('http://195.35.56.202:8080/category', {
                data: { category_id: interestId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            const updatedInterest = personalInterest.filter((post) => post.id !== interestId);


            dispatch(fetchPersonalInterests(updatedInterest));
        } catch (error) {
            console.log(error);
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
