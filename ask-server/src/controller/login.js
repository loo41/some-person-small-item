const {User} = require('../models');
/**
 * 
 * @method login 登陆方法
 *
 */


exports.login = async(ctx) => {
  const {username, password} = ctx.request.body;;
  const data = await User.find({username, password});
  if(data.length === 0) {
    ctx.body = {code: 40004};
    return
  }
  ctx.body = {code: 20000, data};
}
  