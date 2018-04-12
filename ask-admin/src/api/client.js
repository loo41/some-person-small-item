import request from '../utils/request.js';

export function clientList (params) {
    return request({
        url: '/client/list',
        method: 'get',
        params
    });
}

export function clientSetRoot (params) {
    return request({
        url: '/client/setRoot',
        method: 'get',
        params
    });
}

export function lookForUser (params) {
    return request({
        url: '/client/lookForUser',
        method: 'get',
        params
    });
}

export function getClientRewordInfo (params) {
    return request({
        url: '/client/getClientRewordInfo',
        method: 'get',
        params
    });
}

export function closeRewordInfo (params) {
    return request({
        url: '/client/closeRewordInfo',
        method: 'get',
        params
    });
}
