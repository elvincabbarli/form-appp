import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonalInterests } from "../store/interestSlice";

const MyInterests = () => {
    const { personalInterest, loading } = useSelector((state) => state.interests);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPersonalInterests())
    }, [dispatch]);

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
