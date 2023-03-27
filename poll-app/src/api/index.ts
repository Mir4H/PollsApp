import axios from "axios";
type Endpoints = {
    polls: string,
    choices: string
}

export const BASE_URL: string = 'https://localhost:7120'

export const ENDPOINTS: Endpoints = {
    polls: 'polls',
    choices: 'choices'
}

export const apiEndpoint = (endpoint: string) => {
    const url: string = `${BASE_URL}/${endpoint}/`
    return {
        fetch: () => axios.get(url),
        fetchById: (id:number) => axios.get(url+id),
        post: (newRecord:object) => axios.post(url, newRecord),
        put: (id:string, updatedRecord:object) => axios.put(url + id, updatedRecord)
    }
}