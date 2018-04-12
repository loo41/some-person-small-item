import axios from 'axios';

const http = axios.create({
  baseURL: `https://tianchenyong.top/website`,
})

const NORTICE = {
  getFristList: (params) => http.get(`/fristPageList`, {params}),
  getMoreList: (params) => http.get(`/MorePageList`, {params}),
  getContent: (params) => http.get(`/content`, {params}),
}

export {
  NORTICE
}