const OAuth = require('co-wechat-oauth');
const config = require('config');
const moment = require('moment');
const {Client, Note, Ask, Answer} = require('../models');
const _Token = require('../util/token');
const _Split = require('../util/split');
const appid = config.get('appid');
const appsecret = config.get('appsecret');
const server = new OAuth(appid, appsecret);

exports.getUserInfo = async(ctx) => {
    const {code, state} = ctx.query;
    const info = await server.getAccessToken(code)
    const accessInfo = info.data
    const getUserInfo = await server.getUser(accessInfo.openid)
    let {openid, nickname,
        sex, province, city, 
        country, headimgurl, 
        privilege} = getUserInfo
        if (getUserInfo.unionid === undefined) {
            unionid = null
        }
    const userIsExist = await Client.find({openid})
    if (userIsExist.length !== 0) {
        const noteIsExist = await Note.find({openid, state})
        if (noteIsExist.length === 0) {
            const exitExpireTime = new Date().getTime()
            const exitNote = new Note ({
                openid, state, exitExpireTime
            })
            exitNote.save()
        }
        const token = await _Token.creatToken(openid)
        ctx.body = {code: 200, token, userIsExist}
        return
    }
    const client = new Client({
        openid, nickname, sex,
        province, city, country,
        headimgurl, privilege,
        unionid
    })
    const expireTime = new Date().getTime()
    const note = new Note ({
        openid, state, expireTime
    })
    const token = await _Token.creatToken(openid)
    let user = await client.save()
    await note.save()
    ctx.body = {code: 200, token, user}
}

exports.getRewordInfo = async(ctx) => {
   let {openid, state} = ctx.query;
   if (!(openid)) {
     const client = await _Token.istoken(ctx)
     if (!(client)) {
        ctx.body = {code: 500, mes: `信息错误`}
        return
     }
     openid = client.openid
   }
   const data = await Note.findOne({openid, state})
   ctx.body = {code: 200, data}
}

exports.getSbject = async (ctx) => {
    const {state} = ctx.query;
    const data = await Ask.findOne({_id: state})
    const dataInfo = await _Split.splitQuAW(data)
    const dealWiSb = await _Split.randomSubject(dataInfo[1])
    if (!(data.isAnswer)) {
      const answerInfo = new Answer({
        answer: dataInfo[0],
        askID: state
      })
      await answerInfo.save()
      await Ask.update({_id: state},{$set: {isAnswer: true}})
    }
    ctx.body = {code: 200, data: dealWiSb}
}

exports.getGrade = async(ctx) => {
    const client = await _Token.istoken(ctx)
    if (!(client)) {
       ctx.body = {code: 500, mes: `信息错误`}
       return
    }
    const {answer, state, lotteryDraw} = ctx.request.body;
    const answers = await Answer.find({askID: state})
    const grade = await _Split.subjectGrade(answer, answers[1])
    const times = moment().add(answer.askSetTime, 'hour').valueOf()
    let data = {date: moment().format('YYYY-MM-DD HH:mm:ss'), grade}
    let lotteryDrawMath = lotteryDraw + 1
    if (grade >= answer.askSetGrade) {
      await Note.update({openid: client.openid, state}, {$set: {expireTime: times, lotteryDraw: lotteryDrawMath}, $push: {rewordData: data}})
      ctx.body = {code: 200, grade}
      return
    }
    await Note.update({openid: client.openid, state}, {$set: {expireTime: times}, $push: {rewordData: data}})
    ctx.body = {code: 200, grade}
}

exports.isExit = async (ctx) => {
  const {code} = ctx.query
  const token = await server.getAccessToken(code)
  const accessToken = token.data.access_token
  const openid = token.data.openid
  const isExitClient = await Client.find({openid})
  if (isExitClient.length !== 0) {
    ctx.body = {code: 200, isExit: true, openid}
    return
  } else {
    ctx.body = {code: 200, isExit: false, openid}
    return
  }
}

exports.noCodeUSIN = async (ctx) => {
    const {openid, rewordState} = ctx.query;
    const token = await _Token.creatToken(openid)
    const userIsExist = await Client.find({openid})
    ctx.body = {code: 200, token, userIsExist}
}

exports.getCliReoInf = async(ctx) => {
    const {state, openid} = ctx.query;
    const data = await Note.findOne({openid, state})
    ctx.body = {code: 20000, data}
}

exports.closeReword = async(ctx) => {
    const {openid, state, trueFalse} = ctx.query;
    Note.updateOne({openid, state, 'winNotes.state': trueFalse}, {$set: {'winNotes.$.state': true}})
    ctx.body = {code: 20000}
}