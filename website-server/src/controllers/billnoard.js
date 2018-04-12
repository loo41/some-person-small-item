const { ListInformation } = require('../models');
let [mathPeople, state, mes, length, data] = [0, 200, 'success', 0, []];

const ALLOW = 10

/**
 * 
 * @param {mathPeople} 限制并发数量
 * @param {ALLOW}      并发数量常数
 * @param {state}      状态码
 * @param {mes}        状态信息
 * @param {length}     文章总数
 * 
 */

exports.getBillnoardData = async(ctx, next) => {
  try{
    if (mathPeople >= ALLOW) {
      state = 503;
      mes = `当前请求过多，请稍后在试`;
      return
    }
    mathPeople++
    const {page} = ctx.query;
    if (!page) {
      state = 400;
      mes = `错误请求`;
      return
    }
    if (page == 1) {
      length = await ListInformation.count()
    }
    const pageSize = 10;
    const currentPage = page;
    const skipnum = (currentPage - 1) * pageSize;
    const list = await ListInformation
                                    .find({})
                                    .skip(skipnum)
                                    .limit(pageSize);
    if (list.length < 9) {
      state = 400;
      data = list;
      mes = `没有下一页了`
      return
    }
    state = 200;
    data = list;
  } catch(e) {
    console.log(e)
  } finally{
    mathPeople--
    ctx.body = {state, data, mes, length};
  }
}



exports.admingetListData = async(ctx, next) => {
  try{
    if (mathPeople >= ALLOW) {
      code = 50003;
      mes = `当前请求过多，请稍后在试`;
      return
    }
    mathPeople++
    const {page} = ctx.query;
    if (!page) {
      code = 40000;
      mes = `错误请求`;
      return
    }
    if (page == 1) {
      length = await ListInformation.count()
    }
    const pageSize = 10;
    const currentPage = page;
    const skipnum = (currentPage - 1) * pageSize;
    const list = await ListInformation
                                    .find({})
                                    .skip(skipnum)
                                    .limit(pageSize);
    if (list.length < 9) {
      code = 20000;
      data = list;
      mes = `没有下一页了`
      return
    }
    code = 20000;
    data = list;
  } catch(e) {
    console.log(e)
  } finally{
    mathPeople--
    ctx.body = {code, data, mes, length};
  }
}