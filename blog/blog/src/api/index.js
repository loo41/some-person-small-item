import axios from 'axios';

const http = axios.create({
  baseURL: `https://tianchenyong.top/website`,
  headers: {'Access-Control-Allow-Origin': '*'}
})

/**
 * @method overallData   获取首页数据
 * @method homeData      获取首页列表数据
 * @method blogContent   每篇文章内容
 * @method aritcle       文章列表数据
 * @method list          获取每一页留言
 * @method leaveMessage  发送留言并且得到返回更新后的留言内容
 * @method listData      不同tab的第一页数据
 */

http.interceptors.request.use((config) => {
  if (sessionStorage.token) {
    config.headers = { Authorization: `${sessionStorage.token}` }
  }
  return config
})

const HOME = {
  overallData: (params) => http.get(`/home`, {params}),
  homeData: (params) => http.get(`/homeAllData`, {params}),
}

const BLOG = {
  blogContent: (params) => http.get(`/blog${params}`),
  aritcle: (params) => http.get(`/blog?aritic=All`),
}

const LABEL = {
  listData: (params) => http.get(`/label`, {params}),
  aritcle: () => http.get(`/label?aritic=All`),
  listLengths: () => http.get(`/label?list=All`)
}

const LEAVEMESSAGE = {
  leaveMessage: (data) => http.post(`/leaveMessage`, data),
  list: (params) => http.get(`/leaveMessage`, {params}),
}

const MOREDATA = {
  getMoreData: (params) => http.get(`/more`, {params})
}

export {
  axios,
  HOME,
  BLOG,
  LABEL,
  MOREDATA,
  LEAVEMESSAGE
}