import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: 'b4b5f9d98442f11bbdd50a5adf70f1d1',
        language: 'pt-BR'
    }
})