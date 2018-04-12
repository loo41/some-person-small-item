const {Ask, Reword} = require('../models');

exports.delect = async (ctx) => {
    const {id} = ctx.query;
    Reword.remove({askID: id});
    ctx.body = {code: 20000};
}

exports.setStatus = async (ctx) => {
    const {id, prizesStatus} = ctx.query;
    await Ask.update({_id: id},{$set: {prizesStatus}});
    ctx.body = {code: 20000};
}

exports.setReword = async (ctx) => {
  const {id, reword, noreword, awardAddress} = ctx.request.body;
  const isSet = await Reword.find({askID: id});
  if (isSet.length !== 0) {
    await Reword.update({askID: id}, {$set: {reword, noreword, awardAddress}})
    await Ask.update({_id: id},{$set: {isSetReword: true}})
    ctx.body = {code: 20000};
    return
  }
  const newReword = new Reword({askID: id, reword, noreword, awardAddress});
  await Ask.update({_id: id},{$set: {isSetReword: true}})
  await newReword.save();
  ctx.body = {code: 20000};
}

exports.getReword = async (ctx) => {
    const {id, prizesStatus} = ctx.query;
    const data = await Reword.find({askID: id});
    ctx.body = {code: 20000, data};
}