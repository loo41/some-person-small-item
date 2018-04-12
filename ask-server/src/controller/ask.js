const hashUtil = require('../util/hash')
const split = require('../util/split')
const {Ask, Answer, Reword} = require('../models');


exports.putAskQuestion = async(ctx, next) => {
  const {
    askName, askUnit,
    askDicripution,
    allQuestion, askType,
    prizesStatus,
    isSetReword, askAmount,
    publishName
  } = ctx.request.body;
  const date = new Date().getTime();
  let questionAsk = null
  if (askType === 1) {
    const { askSetTime, askSetGrade} = ctx.request.body;
    questionAsk = new Ask({
        askName, askUnit,
        askDicripution, allQuestion,
        askType, prizesStatus,
        askAmount, isSetReword,
        askSetTime, askSetGrade, publishName
    })
  } else {
    questionAsk = new Ask({
        askName, askUnit,
        askDicripution, allQuestion,
        askType, prizesStatus,
        askAmount, isSetReword, publishName
    })
  }
  const id = questionAsk.id
  const answerModel = new Answer({askID: id})
  await Promise.all[questionAsk.save(), answerModel.save()]
  ctx.body = {code: 20000}
}

exports.askList = async(ctx) => {
    const data = await Ask.find({})
    ctx.body = {code: 20000, data}
}

exports.delectAsk = async (ctx) => {
  try {
    const {id} = ctx.query;
    await Ask.remove({_id: id})
    await Answer.remove({askID: id});
    await Reword.remove({askID: id});
    ctx.body = {code: 20000}
  } catch (e) {
    console.log(e)
  }
}