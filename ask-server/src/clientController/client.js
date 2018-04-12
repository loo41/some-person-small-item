const {Note, Reword} = require('../models');

exports.getNoRe = async (ctx) => {
    try {
      const {openid, state} = ctx.query;
      const note = await Note.findOne({openid, state})
      const reword = await Reword.findOne({askID: state})
      ctx.body = {code: 200, note, reword}
    }catch(e) {
      console.log(e)
      ctx.body = {code: 500, mes: '未知错误，请联系管理员'}
    }
}

exports.deposit = async(ctx) => {
    let {openid, state, reword, lotteryDraw} = ctx.request.body;
    if (lotteryDraw === 0) {
      ctx.body = {code: 405, mes: `抽奖失败`}
      return
    } else { lotteryDraw-- }
    rewordState = {reword, state: false}
    await Note.update({openid, state}, {$set: {lotteryDraw}, $push: {winNotes: rewordState}})
    ctx.body = {code: 200}
}