import request from '../utils/request.js';

export function uploadAskQuestion (params) {
    return request({
        url: '/ask/askQuestion',
        method: 'post',
        data: params
    });
}

export function getAskList (params) {
    return request({
        url: '/ask/askList',
        method: 'get',
        params
    });
}

export function delectAsk (params) {
    return request({
        url: '/ask/delect',
        method: 'get',
        params
    });
}
