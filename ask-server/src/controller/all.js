const {Ask, User, Client} = require('../models');


exports.getData = async(ctx) => {
    let [i, j, k] = await Promise.all([await Ask.count(), await User.count(), await Client.count()])
    ctx.body = {code: 20000, data: [i, j, k, i+j+k]}
}