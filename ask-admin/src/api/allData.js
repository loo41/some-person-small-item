import request from '../utils/request.js';

export function getAllData (params) {
    return request({
        url: '/all/getAllData',
        method: 'get',
        params
    });
}
