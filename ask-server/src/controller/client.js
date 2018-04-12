const {Client, Reword} = require('../models');


exports.getList = async (ctx) => {
    const {page} = ctx.query;
    const pageSize = 20;
    const currentPage = page;
    const skipnum = (currentPage - 1) * pageSize;
    const data = await Client
                            .find({})
                            .skip(skipnum)
                            .limit(pageSize);
    ctx.body = {code: 20000, data}
}

exports.lookForUser = async (ctx) => {
    if (ctx.query.type === '姓名') {
        const data = await Client.find({nickname: ctx.query.info})
        ctx.body = {code: 20000, data}
    } else if (ctx.query.type === 'openid') {
        const data = await Client.find({openid: ctx.query.info})
        ctx.body = {code: 20000, data}
    }
}