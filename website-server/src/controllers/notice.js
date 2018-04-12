const moment = require('moment');
const hashUtil = require('../until/hash');
const {Html, ListInformation} = require('../models');
const fs = require('fs');

/**
 * 测试通过
 */

exports.upload = async(ctx, next) => {
  try {
    let {title, company, date, htmlString} = ctx.request.body;
    if (date == null || date.length <= 3) {
      date = moment().format(`YYYY-MM-DD`);
    }
    if (htmlString == null || htmlString.length <= 3) {
      htmlString = `<p>没有文章内容哦</p>`;
    }
    const nowDate = new Date().getTime();
    const id = hashUtil.createHash(`${nowDate}${title}`);
    const list = ListInformation({id, title, company, date});
    const htmlList = Html({id, htmlString});
    await list.save();
    await htmlList.save();
    ctx.body = {code: 20000}
  } catch(e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}

exports.delect = async(ctx, next) => {
  try {
    const {id} = ctx.query;
    await Html.remove({id});
    await ListInformation.remove({id});
    ctx.body = {code: 20000}
  } catch(e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}

exports.getHtmlString = async(ctx) => {
  try {
    const {id} = ctx.query;
    const data = await Html.find({id});
    ctx.body = {code: 20000, data}
  } catch (e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}


exports.changeNotice = async(ctx, next) => {
  try {
    const {id, title, company, date, htmlString} = ctx.request.body;
    await ListInformation.update({id},{$set: {title, company, date, }});
    await Html.update({id},{$set: {htmlString}});
    ctx.body = {code: 20000}
  } catch(e) {
    console.log(e);
    ctx.body={code: 50000};
  }
}


exports.delectFAI = async(ctx, next) => {
  let i = 0;
  try {
    const {fileArray} = ctx.request.body;
    fileArray.forEach(path => {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
        i++
      }
    });
    ctx.body = {code: 20000, i}
  } catch(e) {
    console.log(e)
    ctx.body = {code: 40000, e}
  }
}