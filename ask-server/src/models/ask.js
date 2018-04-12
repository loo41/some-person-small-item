const moogose = require('mongoose');
const Schema = moogose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * 
 * @param {askName}         问卷的标题
 * @param {askUnit}         问卷的发布单位
 * @param {askDicripution}  问卷的描述 == 将在前端展示
 * @param {allQuestion}     问卷的题目
 * @param {askType}         问卷的类型 1: (可以抽奖) 2: (不可以抽奖)
 * @param {prizesStatus}    问卷发布的状态
 * @param {askAmount}       从allQuestion中抽出多少来展示
 * @param {isSetReword}     问卷是否设置了奖品
 * @param {askSetTime}      多少时间可以再次答题
 * @param {askSetGrade}     满足多少分可以抽奖
 * @param {publishName}     发布人
 * @param {isAnswer}       是否存在答案
 * 
 */



const ask = new Schema({
    askName: String,
    askUnit: String,
    askDicripution: String,
    allQuestion: Object,
    askType: Number,
    prizesStatus: Boolean,
    askAmount: Number,
    isSetReword: Boolean,
    askSetTime: {type: String, min: 0, default: 0},
    askSetGrade: {type: Number, min: 0, default: 0},
    publishName: String,
    isAnswer: {type: Boolean, default: false}
})

const Ask = moogose.model('ask', ask)

module.exports = Ask