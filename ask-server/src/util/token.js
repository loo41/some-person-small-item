const jwt = require('jwt-simple');
const secret = 'youngon';
const moment = require('moment');

exports.creatToken = async (openid) => {
  const times = moment().add(30, 'days').valueOf();
  let payload = {
    openid,
    exp: times
  }
  return jwt.encode(payload, secret)
}

exports.istoken = async (ctx) => {
  let token = ctx.headers.token;
  if (!token) {
    ctx.status = 404;
    ctx.body = {code: 404, mes: '用户不存在'};
    return false;
  }
  let client = jwt.decode(token, secret, 'HS256')
  if (client.exp + 86400*30 < Date.now()) {
    ctx.status = 401;
    ctx.body = {state: 105, mes: 'token过期'};
    return false;
  }
  return client;
}
