import axios from 'axios'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: 'http://ask.tianchenyong.top/ask_youngon',
  headers: { 'Access-Control-Allow-Origin': '*' },
  timeout: 15000
})

service.interceptors.request.use(config => {
  if (Cookies.get('token')) {
    config.headers['token'] = Cookies.get('token')
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      this.$message({
        type: 'error',
        message: res.mes
      })
      return null
    } else {
      return response
    }
  }, error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
