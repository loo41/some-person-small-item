import request from '@/utils/request'

export function uploadHtmls(params) {
  return request({
    url: '/notice/upload',
    method: 'post',
    data: params
  })
}

export function getNoticeList(params) {
  return request({
    url: '/notice/MorePageList',
    method: 'get',
    params
  })
}

export function delectNotice(params) {
  return request({
    url: '/notice/delectNotice',
    method: 'get',
    params
  })
}

export function getHtml(params) {
  return request({
    url: '/notice/htmlString',
    method: 'get',
    params
  })
}

export function changeHtml(params) {
  return request({
    url: '/notice/changeNotice',
    method: 'post',
    data: params
  })
}

export function delectFILE(params) {
  return request({
    url: '/notice/delectFile',
    method: 'post',
    data: params
  })
}
