import axios from "axios";

const instance = axios.create({
    baseURL: "https://quotes15.p.rapidapi.com/"
});

export { instance };