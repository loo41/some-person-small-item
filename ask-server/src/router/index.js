const Router = require('koa-router');
const {_User, _Login, _Ask, _Reword, _Client, _All} = require('../controller');
const {_UserInfo, _UserClient} = require('../clientController');

const router = new Router({
  prefix: '/ask_youngon'
});

router
      .post(`/user/login`, _Login.login)

router
      .get(`/user/list`, _User.list)
      .post(`/user/addUser`, _User.addUser)
      .post(`/user/changeUser`, _User.changeUser)
      .get(`/user/delectUser`, _User.delectUser)


router
      .post(`/ask/askQuestion`, _Ask.putAskQuestion)
      .get(`/ask/askList`, _Ask.askList)
      .get(`/ask/delect`, _Ask.delectAsk)


router
      .get(`/reword/delecReword`, _Reword.delect)
      .get(`/reword/openCloaseStatus`, _Reword.setStatus)
      .post(`/reword/setReword`, _Reword.setReword)
      .post(`/reword/getRewordSet`, _Reword.getReword)

router
      .get(`/client/list`, _Client.getList)
      .get(`/client/lookForUser`, _Client.lookForUser)


router
      .get(`/all/getAllData`, _All.getData)

      /**前端路由 */
      /**
       * @method {sendCode}             前端code -- 获得用户信息 --
       * @method {clientRewordInfo}     获取用户的信息
       * @method {getRewordSbject}      获取题目
       * @method {uploadAnswer}         处理问题返回分数
       * @method {isExitClient}         判断是否是已经存在的用户
       * 
       */
router
      .get(`/client/sendCode`, _UserInfo.getUserInfo)
      .get(`/client/clientRewordInfo`, _UserInfo.getRewordInfo)
      .get(`/client/getRewordSbject`, _UserInfo.getSbject)
      .post(`/client/uploadAnswer`, _UserInfo.getGrade)
      .get(`/client/isExitClient`, _UserInfo.isExit)
      .get(`/client/getRewordAndNote`, _UserClient.getNoRe)
      .post(`/client/sendRewordData`, _UserClient.deposit)
      .get(`/client/getUserInfo`, _UserInfo.noCodeUSIN)
      .get(`/client/getClientRewordInfo`, _UserInfo.getCliReoInf)
      .get(`/client/closeRewordInfo`, _UserInfo.closeReword)


module.exports = router