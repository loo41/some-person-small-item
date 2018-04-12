import request from '../utils/request.js';

export function delecReword (params) {
    return request({
        url: '/reword/delecReword',
        method: 'get',
        params
    });
}

export function openCloaseStatus (params) {
    return request({
        url: '/reword/openCloaseStatus',
        method: 'get',
        params
    });
}

export function setReword (params) {
    return request({
        url: '/reword/setReword',
        method: 'post',
        data: params
    });
}

export function getRewordSet (params) {
    return request({
        url: '/reword/getRewordSet',
        method: 'post',
        params
    });
}
