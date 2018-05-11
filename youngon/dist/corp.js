'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var corp = function () {
    function corp() {
        _classCallCheck(this, corp);

        this.W = null;
        this.H = null;
        this.anim = null;
        this.i = 0;
        this.p = 0;
        this.y = 0;
        this.init();
        this.anmation();
    }

    _createClass(corp, [{
        key: 'init',
        value: function init() {
            var less = document.querySelector('.list-db-ani');
            var maxH = document.querySelector('.list-body-top');
            var right = document.querySelector('.list-body-right');
            this.anim = document.querySelector('.list-animation');
            this.H = less.offsetHeight;
            this.W = less.offsetWight;
            this.y = Math.floor(this.H / 270);
            this.i = document.querySelector('.list-animation').getElementsByTagName('div').length;
            right.style.cssText = 'max-height: ' + maxH.offsetHeight + 'px';
            less.style.cssText = 'max-height: ' + maxH.offsetHeight + 'px; \n                            height: ' + maxH.offsetHeight + 'px;';
        }
    }, {
        key: 'anmation',
        value: function anmation() {
            var _this = this;

            var h = this.y * 300;
            var timer = setTimeout(function () {
                _this.anmation();
            }, 2000);
            if (this.p <= this.i - this.y) {
                this.anim.style.transform = 'translate3d(0px, -' + this.p * 300 + 'px, 0px)';
                this.p++;
            } else {
                var k = this.p;
                clearTimeout(timer);
                var time = setInterval(function () {
                    k--;
                    if (k === 0) {
                        clearInterval(time);
                        _this.p = 0;
                        _this.anmation.call(_this);
                    }
                    _this.anim.style.transform = 'translate3d(0px, -' + k * 300 + 'px, 0px)';
                }, 2000);
            }
        }
    }]);

    return corp;
}();

window.onload = function () {
    /* 看代码的不要喷我，太懒了不想以更好的方式写 */
    new corp();
};