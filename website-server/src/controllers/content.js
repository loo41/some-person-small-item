const {Html} = require('../models');
let [mathPeople, state, mes, data] = [0, '', '', ''];

exports.getContentData = async(ctx, next) => {
  try {
    const {id} = ctx.query;
    if (!id) {
      state = 503;
      mes = '不存在';
      return
    }
    data = await Html.find({id});
    if (data === '') {
      state = 404;
      mes = '文章不存在';
      return
    }
    state = 200;
    mes = 'success';
  } catch(e) {
    console.log(e)
  } finally {
    ctx.body = {state, data, mes};
  }
}