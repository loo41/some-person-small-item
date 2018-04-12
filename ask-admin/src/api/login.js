import request from '../utils/request.js';

export function login (params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params
    });
}
