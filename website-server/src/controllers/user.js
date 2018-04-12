const {User, UserInformation} = require('../models');
const tokenUtil = require('../until/token')
const hashUtil = require('../until/hash')
/**
 * 
 * @method {login} success
 * @method {addUser} success
 * @method {info} success
 * @method {userList} success
 * @method {changeUser} success
 * @method {delectUser} success
 */

exports.login = async(ctx) => {
  const {username, password} = ctx.request.body;
  const data = await User.find({username, password});
  if(data.length === 0) {
    ctx.body = {code: 40004};
    return
  }
  const token = await tokenUtil.creatToken(data[0].username, data[0].id);
  ctx.body = {code: 20000, token};
}


exports.info = async(ctx, next) => {
  const user =  await tokenUtil.istoken(ctx);
  if (!user) {
    ctx.body = {code: 40004};
    return
  }
  const data = await UserInformation.find({id: user.id})
  if(data.length === 0) {
    ctx.body = {code: 40004};
    return
  }
  ctx.body = {code: 20000, data};
}


exports.userList = async(ctx) => {
  try {
    const list = await UserInformation.find({})
    ctx.body = {code: 20000, items: list}
  } catch (e) {
    console.log(e);
    ctx.body = {code: 50000};
  }
}

exports.changeUser = async(ctx, next) => {
  try {
    const {id, username, discription} = ctx.request.body;
    await User.update({id},{$set: {username}});
    await UserInformation.update({id},{$set: {username, discription}});
    ctx.body = {code: 20000}
  } catch(e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}

exports.delectUser = async(ctx, next) => {
  try {
    const {id} = ctx.query;
    await User.remove({id});
    await UserInformation.remove({id});
    ctx.body = {code: 20000}
  } catch(e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}

exports.addUser = async(ctx, next) => {
  try {
    const {username, discription, password} = ctx.request.body;
    const seeUserisDifeent = await User.find({username})
    if (seeUserisDifeent.length !== 0) {
      ctx.body={code: 40006, mes: '用户存在'};
      return
    }
    const date = new Date().getTime();
    const id = hashUtil.createHash(`${username}${discription}${password}${date}`);
    const avatar = `//www.baidu.com/img/baidu_jgylogo3.gif`;
    const newUser = new User({id, username, password});
    const newUserInformation = new UserInformation({id, username, discription, avatar});
    await newUser.save();
    await newUserInformation.save();
    ctx.body={code: 20000};
  } catch (e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}