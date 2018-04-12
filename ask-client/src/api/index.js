import request from '../until/request.js'

export function sendCode (params) {
  return request({
    url: '/client/sendCode',
    method: 'get',
    params
  })
}

export function getClientREIF (params) {
  return request({
    url: '/client/clientRewordInfo',
    method: 'get',
    params
  })
}

export function getRewordSbject (params) {
  return request({
    url: '/client/getRewordSbject',
    method: 'get',
    params
  })
}

export function uploadAnswer (params) {
  return request({
    url: '/client/uploadAnswer',
    method: 'post',
    data: params
  })
}

export function isExitClient (params) {
  return request({
    url: '/client/isExitClient',
    method: 'get',
    params
  })
}

export function getClANRE (params) {
  return request({
    url: '/client/getRewordAndNote',
    method: 'get',
    params
  })
}

export function sendRewordData (params) {
  return request({
    url: '/client/sendRewordData',
    method: 'post',
    data: params
  })
}

export function getUserInfo (params) {
  return request({
    url: '/client/getUserInfo',
    method: 'get',
    params
  })
}
