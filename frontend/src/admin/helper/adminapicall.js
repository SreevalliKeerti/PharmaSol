import { API } from "../../backend";

//category calls

//create
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//read all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
            method: "GET"
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//read a category
export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
            method: "GET"
        }).then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//update
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//delete
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//product calls

//create 
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//read all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
            method: "GET"
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//read a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
            method: "GET"
        }).then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//update
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//delete
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//order calls

//read all orders
export const getOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//read order status
export const updateOrderStatus = (orderId, userId, token, order) => {
    return fetch(`${API}/order/status/${orderId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            return (response.json());
        })
        .catch(err => console.log(err));
};

//get order status
export const getOrderStatuses = (userId) => {
    return fetch(`${API}/order/status/${userId}`, {
            method: "GET"
        }).then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};