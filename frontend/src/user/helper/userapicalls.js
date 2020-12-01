import { API } from "../../backend";

//user calls

//get user details
export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//update user details
export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};