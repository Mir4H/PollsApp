import axios from 'axios'
import { Endpoints } from '../types'

export const BASE_URL: string = 'https://localhost:7120'

export const ENDPOINTS: Endpoints = {
  polls: 'polls',
  choices: 'choices',

}

export const apiEndpoint = (endpoint: string) => {
  const url: string = `${BASE_URL}/${endpoint}/`
  return {
    fetch: () => axios.get(url),
    fetchById: (id: number) => axios.get(url + id),
    post: (newRecord: string) => axios.post(url, newRecord),
    put: (pollId: number, id: number, updatedRecord: string) => axios.put(url+pollId+'/vote/'+id, updatedRecord),
    delete: (id: number) => axios.delete(url + id)
  }
}

//put: (updatedRecord: string, pollId: number, id: number) => axios.put(url+pollId+'/vote/'+id, updatedRecord),