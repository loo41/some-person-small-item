'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Study = function () {
    function Study() {
        _classCallCheck(this, Study);

        // this.transfromNve()
        this.init();
    }

    _createClass(Study, [{
        key: 'init',
        value: function init() {
            this.initEnevt();
        }
    }, {
        key: 'transfromNve',
        value: function transfromNve() {
            var indexValue = location.href.split('/')[location.href.split('/').length - 1].split('.')[0];
            var index_Value = ['index', 'ksxx', 'tstj', 'kzfx', 'xszx', 'rjjz'];
            var lessFater = document.querySelector('.nve');
            var less = lessFater.getElementsByTagName('a');
            for (var i = 0; i < less.length; i++) {
                less[i].className = 'col-lg-2 col-6 col-sm-6';
                if (index_Value[i] === indexValue) {
                    less[i].className = 'col-lg-2 col-6 col-sm-6 nveStyle';
                }
            }
        }
    }, {
        key: 'initEnevt',
        value: function initEnevt() {
            var selectFun = function selectFun(select) {
                return document.querySelector(select);
            };
            selectFun('.slider-box').onmousemove = function () {
                selectFun('.but').style.display = 'block';
            };
            selectFun('.slider-box').onmouseout = function () {
                selectFun('.but').style.display = 'none';
            };
        }
    }]);

    return Study;
}();

window.onload = function () {
    new Study();
};