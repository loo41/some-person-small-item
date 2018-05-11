'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var opus = function () {
    function opus() {
        _classCallCheck(this, opus);

        this.root = [];
        this.H = document.documentElement.clientHeight;
        this.W = document.documentElement.clientWidth;
        this.init();
        this.transfromNve();
    }

    _createClass(opus, [{
        key: 'transfromNve',
        value: function transfromNve() {
            var indexValue = location.href.split('/')[location.href.split('/').length - 1].split('.')[0];
            var index_Value = ['zp', 'grzp', 'stzp'];
            var selectClass = function selectClass(select) {
                return document.getElementsByClassName(select);
            };
            var less = selectClass('opus-list');
            var flag = false;
            for (var i = 0; i < less.length; i++) {
                less[i].className = 'opus-list';
                if (index_Value[i] === indexValue) {
                    flag = true;
                    less[i].className = 'opus-nowList opus-list';
                }
            }
            if (!flag) less[0].className = 'opus-nowList opus-list';
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            var selectFun = function selectFun(select) {
                return document.querySelector(select);
            };
            var selectClass = function selectClass(select) {
                return document.getElementsByClassName(select);
            };
            selectFun('#search-arise').onclick = function () {
                var less = selectFun('.input-box');
                less.style.cssText = 'height: ' + _this.H + 'px; width: ' + _this.W + 'px;';
                less.style.display = 'flex';
                selectFun('body').appendChild(less);
                selectFun('.input-box').onclick = function () {
                    selectFun('.input-box').style.display = 'none';
                };
            };
            selectFun('.input_').onclick = function (event) {
                event.stopPropagation();
            };
            var root = document.getElementsByClassName('opus-lists')[0];
            this.root = root.getElementsByTagName('div');

            var _loop = function _loop(i) {
                _this.root[i].onclick = function () {
                    _this.show(i);
                };
            };

            for (var i = 0; i < this.root.length; i++) {
                _loop(i);
            }
            selectFun('.slider-box').onmousemove = function () {
                selectFun('.but').style.display = 'block';
            };
            selectFun('.slider-box').onmouseout = function () {
                selectFun('.but').style.display = 'none';
            };
        }
    }, {
        key: 'show',
        value: function show(i) {
            var less = document.createElement('div');
            less.className = 'show';
            less.style.cssText = 'height: ' + this.H + 'px; width: ' + this.W + 'px;';
            var child = document.createElement('img');
            child.className = 'child';
            child.src = this.root[i].childNodes[0].src;
            less.appendChild(child);
            document.body.appendChild(less);
            less.onclick = function () {
                document.body.removeChild(document.getElementsByClassName('show')[0]);
            };
        }
    }]);

    return opus;
}();

window.onload = function () {
    new opus();
};