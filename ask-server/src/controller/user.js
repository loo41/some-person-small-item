const {User} = require('../models');


exports.list = async(ctx) => {
  const data = await User.find({})
  ctx.body = {code: 20000, data}
}


exports.addUser = async(ctx, next) => {
    try {
      const {username, discription, password, sex, grade} = ctx.request.body;
      const seeUserisDifeent = await User.find({username})
      if (seeUserisDifeent.length !== 0) {
        ctx.body={code: 40006, mes: '用户存在'};
        return
      }
      const date = new Date().getTime();
      const newUser = new User({
          username, password,
          sex, grade, discription
        });
      await newUser.save();
      ctx.body={code: 20000};
    } catch (e) {
      console.log(e);
      ctx.body={code: 50000, mes: '服务器错误，请联系管理员'};
    }
  }

  exports.changeUser = async(ctx, next) => {
    try {
      const {_id, username, discription, password, sex, grade} = ctx.request.body;
      await User.update({_id},{$set: {username, discription, password, sex, grade}});
      ctx.body = {code: 20000}
    } catch(e) {
      console.log(e);
      ctx.body={code: 50000};
    }
  }
  
  exports.delectUser = async(ctx, next) => {
    try {
      const {_id} = ctx.query;
      await User.remove({_id});
      ctx.body = {code: 20000}
    } catch(e) {
      console.log(e);
      ctx.body={code: 50000};
    }
  }

  exports.userList = async(ctx) => {
    try {
      const list = await User.find({})
      ctx.body = {code: 20000, data: list}
    } catch (e) {
      console.log(e);
      ctx.body = {code: 50000};
    }
  }

  exports.changeUser = async (ctx) => {
     const{
      _id, grade,
      username,
      password, sex,
      discription} = ctx.request.body;
      User.update({_id},{$set: {username, password, sex, discription, grade}})
      ctx.body = {code: 20000}
  }

  exports.delectUser = async (ctx) => {
    const {id} = ctx.query;
    User.remove({id})
    ctx.body = {code: 20000}
  }