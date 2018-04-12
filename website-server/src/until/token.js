const jwt = require('jwt-simple');
const secret = 'youngon';
const moment = require('moment');

exports.creatToken = async (user, id) => {
  const times = moment().add(1, 'days').valueOf();
  let payload = {
    username: user,
    id: id,
    exp: times
  }
  return jwt.encode(payload, secret)
}

exports.istoken = async (ctx) => {
  let token = ctx.headers.token;
  if (!token) {
    ctx.status = 40004;
    ctx.body = {state: 40004, mes: '用户不存在'};
    return false;
  }
  let user = jwt.decode(token, secret, 'HS256')
  if (user.exp + 86400 < Date.now()) {
    ctx.status = 401;
    ctx.body = {state: 105, mes: 'token过期'};
    return false;
  }
  return user;
}
