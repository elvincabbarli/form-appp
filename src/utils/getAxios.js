import axios from "axios";

export const GetAxios = async (baseUrl, token) => {
    try {
        const response = await axios.get(`${baseUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = response;
        return data

    } catch (error) {
        console.log(error);
        throw new error();
    }
}