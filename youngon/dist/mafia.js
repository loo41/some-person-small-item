'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mafig = function () {
    function mafig() {
        _classCallCheck(this, mafig);

        this.H = document.documentElement.clientHeight;
        this.W = document.documentElement.clientWidth;
        this.init();
    }

    _createClass(mafig, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var selectFun = function selectFun(select) {
                return document.querySelector(select);
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
        }
    }]);

    return mafig;
}();

window.onload = function () {
    new mafig();
};