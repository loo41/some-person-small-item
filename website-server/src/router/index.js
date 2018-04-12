const Router = require('koa-router');
const controller = require('../controllers');
const {uploadfile} = require('../until/upload');
const {uploadImg} = require('../until/uploadImg');

const router = new Router({
  prefix: '/website'
});

const {_List, _Content, _User, _Notice, _Upload}= controller

/**
 * @method fristPageList  获取公示公告第一页列表
 * @method MorePageList   获取公示公告更多列表
 * @method content        获取公示公告列表HTML文本
 */

router
      .get('/fristPageList', _List.getBillnoardData)
      .get('/MorePageList', _List.getBillnoardData)
      .get('/content', _Content.getContentData)

/***
 * 
 * @description admin @param{api}
 * @method /user/login            登陆
 * @method /user/addUser          增加用户
 * @method /user/info             获取用户信息
 * @method /user/list             用户列表
 * @method /user/changeUser       更改用户信息
 * @method /user/delectUser       删除用户
 * 
 */

router
      .post('/user/login', _User.login)
      .post('/user/addUser', _User.addUser)
      .get('/user/info', _User.info)
      .get('/user/list', _User.userList)
      .post('/user/changeUser', _User.changeUser)
      .get('/user/delectUser', _User.delectUser)


/***
 * 
 * @description admin/notice @param{api}
 * @method /notice/upload                HTML string upload
 * @method /notice/MorePageList          get more notice list
 * @method /notice/delectNotice          delect notice and HTML string
 * @method /notice/uploadFile            upload download file
 * @method /notice/imgUpload             front end behind upload img before (get img url)
 * @method /notice/htmlString            get notice HTML string
 * @method /notice/delectFile            delect upload file adn image but no use
 */
 
router
      .post('/notice/upload', _Notice.upload)
      .post('/notice/delectFile', _Notice.delectFAI)
      .post('/notice/changeNotice', _Notice.changeNotice)
      .get('/notice/MorePageList', _List.admingetListData)
      .get('/notice/delectNotice', _Notice.delect)
      
router
      .post(`/notice/uploadFile`, uploadfile.single('downFile'), _Upload.upload)
      .post(`/notice/imgUpload`, uploadImg.single('img'), _Upload.upload)
      .get(`/notice/htmlString`,  _Notice.getHtmlString)

module.exports = router;