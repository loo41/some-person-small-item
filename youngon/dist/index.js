'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 首页脚本
 */
var index = function () {
    function index() {
        _classCallCheck(this, index);

        this.info = {
            H: 0,
            W: 0
        };
        this.fun = {
            getID: new Function(),
            getClass: new Function(),
            selectFun: new Function(),
            tagName: new Function()
        };
        this.screenMv = {
            pageY: 0,
            relativeY: 0
        };
        this.less = {
            appScreen: {},
            inputScreen: {}
        };
        this.init();
        this.notMove = false;
    }

    _createClass(index, [{
        key: 'init',
        value: function init() {
            this.initInfo();
            this.nveScript();
            this.newScreen();
            this.initEvent();
        }
    }, {
        key: 'shareTo',
        value: function shareTo(stype) {
            if (stype == 'qzone') {
                this._loginQQ();
            }
            //新浪微博接口的传参
            if (stype == 'sina') {
                this._loginSina();
            }
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;

            this.fun.selectFun('#more').onclick = function () {
                var body = _this.fun.selectFun('.sidebar-top');
                _this.bg = new MaterialImage({
                    el: body,
                    output: 'background'
                });
                _this.fun.selectFun('.sidebar').style.transform = 'translateX(0rem)';
            };
            this.fun.selectFun('#index').onclick = function () {
                _this.fun.selectFun('.sidebar').style.transform = 'translateX(40rem)';
            };
            this.fun.selectFun('.sidebar-bottom').onclick = function () {
                _this.fun.selectFun('.sidebar').style.transform = 'translateX(40rem)';
            };
            this.fun.selectFun('#search-arise').onclick = function () {
                var less = _this.fun.selectFun('.input-box');
                _this.less.inputScreen = less;
                less.style.cssText = 'height: ' + _this.info.H + 'px; width: ' + _this.info.W + 'px;';
                less.style.display = 'flex';
                _this.fun.selectFun('body').appendChild(less);
                _this.fun.selectFun('.input-box').onclick = function () {
                    _this.fun.selectFun('.input-box').style.display = 'none';
                };
            };
            this.fun.selectFun('.input_').onclick = function (event) {
                event.stopPropagation();
            };
            var body = this.fun.selectFun('.sidebar-top');
            this.bg = new MaterialImage({
                el: body,
                output: 'background'
            });
            body.onclick = function () {
                _this.bg.protract();
            };
            this.fun.selectFun('.slider-box').onmousemove = function () {
                _this.fun.selectFun('.but').style.display = 'block';
            };
            this.fun.selectFun('.slider-box').onmouseout = function () {
                _this.fun.selectFun('.but').style.display = 'none';
            };
            this.fun.selectFun('#vod-play').onclick = function () {
                var src = _this.fun.selectFun('#vod-play').alt;
                var srcImg = _this.fun.selectFun('#vod-play').src;
                _this.fun.selectFun('#vodScreen').style.cssText = 'display: flex!important; height: ' + _this.info.H + 'px; width: ' + _this.info.W + 'px;';
                _this.fun.selectFun('#vod-source').src = src;
                _this.fun.selectFun('#my-player').poster = srcImg;
                _this.fun.selectFun(".vod-box").load();
                _this.fun.selectFun('#vodScreen').onclick = function () {
                    _this.fun.selectFun(".vod-box").pause();
                    _this.fun.selectFun('#vodScreen').style.cssText = 'display: none;';
                };
            };
            this.fun.selectFun('.icon-user').onclick = function () {
                _this._loginQQ();
            };
            var lessShare = this.fun.selectFun('.share');
            lessShare.style.height = this.H + 'px';
            var shareLess = lessShare.getElementsByTagName('div');

            var _loop = function _loop(i) {
                shareLess[i].onclick = function () {
                    _this.shareTo(shareLess[i].title);
                };
            };

            for (var i = 0; i < shareLess.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: '_loginSina',
        value: function _loginSina() {
            var txtVal = "阳光网站";
            var url = "http://youngon.cn";
            window.open("http://v.t.sina.com.cn/share/share.php?appkey=4120396272&title=" + encodeURIComponent(txtVal) + "&url=" + url);
        }
    }, {
        key: '_loginQQ',
        value: function _loginQQ() {
            var p = {
                url: 'http://youngon.cn',
                showcount: '1', /* 是否显示分享总数,显示：'1'，不显示：'0'     */
                desc: '阳光网站', /* 默认分享理由(可选)                         */
                summary: '', /* 分享摘要(可选)                             */
                title: '', /* 分享标题(可选)                             */
                site: 'http://youngon.cn', /* 分享来源 如：腾讯网(可选)                   */
                pics: 'www.baidu.com/img/bd_logo1.png', /* 分享图片的路径(可选)                        */
                style: '203',
                width: 98,
                height: 22
            };
            var s = [];
            for (var i in p) {
                s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&') + '&otype=share');
        }
    }, {
        key: 'initInfo',
        value: function initInfo() {
            this.info.H = document.documentElement.clientHeight;
            this.info.W = document.documentElement.clientWidth;
            this.fun.getID = function (id) {
                return document.getElementById(id);
            };
            this.fun.getClass = function (classN) {
                return document.getElementsByClassName(classN);
            };
            this.fun.selectFun = function (select) {
                return document.querySelector(select);
            };
            this.fun.tagName = function (father, tag) {
                return father.getElementsByTagName(tag);
            };
        }
    }, {
        key: 'newScreen',
        value: function newScreen() {
            var _this2 = this;

            if (document.documentElement.clientWidth <= 1024) {
                this.less.appScreen = this.fun.getID('appScreen');
                this.fun.selectFun('.box').style.position = 'fixed';
                appScreen.style.cssText = 'height: ' + this.info.H + 'px; width: ' + this.info.W + 'px; display: block!important;';
                var appScreen_box = this.fun.getID('appScreen_box');
                appScreen_box.style.cssText = 'height: ' + this.info.H + 'px; width: ' + this.info.W + 'px;';
                addEventListener('touchmove', function (event) {
                    _this2.touchMove(event);
                }, false);
                addEventListener('touchstart', function (event) {
                    _this2.touchStart(event);
                }, false);
                addEventListener('touchend', function (event) {
                    _this2.touchEnd(event);
                }, false);
            } else {
                return null;
            }
        }
    }, {
        key: 'touchMove',
        value: function touchMove(event) {
            if (this.notMove) return;
            var Y = event.targetTouches[0].pageY;
            this.screenMv.relativeY = Y - this.screenMv.pageY;
            this.less.appScreen.style.top = this.screenMv.relativeY + 'px';
            if (parseInt(this.less.appScreen.style.top) >= 0) {
                this.less.appScreen.style.top = '0px';
                return;
            }
        }
    }, {
        key: 'touchStart',
        value: function touchStart(event) {
            if (this.notMove) return;
            this.screenMv.pageY = event.targetTouches[0].pageY;
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd(event) {
            var _this3 = this;

            if (this.notMove) return;
            if (parseInt(this.less.appScreen.style.top) <= -2) {
                this.notMove = true;
                this.less.appScreen.style.transform = 'translate3d(0px, -' + this.info.H + 'px, 0px)';
                setInterval(function () {
                    document.removeEventListener('touchmove', _this3, false);
                    document.removeEventListener('touchstart', _this3, false);
                    document.removeEventListener('touchend', _this3, false);
                    _this3.fun.selectFun('#appScreen').style.display = 'none';
                    _this3.fun.selectFun('.box').style.position = 'absolute';
                }, 1000);
            } else {
                return;
            }
        }
    }, {
        key: 'nveScript',
        value: function nveScript() {
            var nve = this.fun.selectFun('.nve');
            var nveChild = this.fun.tagName(nve, 'div');

            var _loop2 = function _loop2(i) {
                nveChild[i].onclick = function () {
                    changeStyle(nveChild[i]);
                };
            };

            for (var i = 0; i < nveChild.length; i++) {
                _loop2(i);
            }
            var changeStyle = function changeStyle(less) {
                for (var o = 0; o < nveChild.length; o++) {
                    nveChild[o].id = '';
                }
                less.id = 'nveTitleStyle';
            };
        }
    }]);

    return index;
}();

window.onload = function () {
    new index();
    console.log('欢迎查看youngon站点');
    console.log('一张网页要经历怎样的过程才能呈现在用户的眼前');
    console.log('一个年纪人要经历怎样的磨练才能达到技术之巅');
    console.log('这里是阳光网站欢迎你的加入,让我们共同成长');
    console.log('我们等的就是你');
};