import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8080",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// GET 请求
export function get(url, params) {
    return instance.get(url, { params });
}

// POST 请求
export function post(url, data) {
    return instance.post(url, data);
}

// PUT 请求
export function put(url, data) {
    return instance.put(url, data);
}

// DELETE 请求
export function del(url, params) {
    return instance.delete(url, { params });
}