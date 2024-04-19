/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPersonalInterests } from "../store/interestSlice";
import { GetAxios } from "../utils/getAxios";

const MyInterests = () => {
    const { personalInterest, loading } = useSelector((state) => state.interests);
    const dispatch = useDispatch()

    const { token } = useSelector((state) => state.login);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAxios("https://fast-quora.onrender.com/users/me", token);
                dispatch(fetchPersonalInterests(Object.values(response.data.interest)))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    if (loading) {
        return <>
            <h1>Yuklenir</h1>
        </>
    }



    return (
        <div>
            <h2>My Interests</h2>
            <div>
                <ul className="posts">
                    {personalInterest?.map((post, index) => (
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
