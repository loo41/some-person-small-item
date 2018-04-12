import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function changeUser(params) {
  return request({
    url: '/user/changeUser',
    method: 'post',
    data: params
  })
}

export function delectUser(params) {
  return request({
    url: '/user/delectUser',
    method: 'get',
    params
  })
}

export function addUser(params) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data: params
  })
}

