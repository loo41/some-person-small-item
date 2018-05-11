/**
 * 首页脚本
 */
class index{
    constructor() {
        this.info = {
            H: 0,
            W: 0
        }
        this.fun = {
            getID: new Function(), 
            getClass: new Function(),
            selectFun: new Function(),
            tagName: new Function()
        }
        this.screenMv = {
            pageY: 0,
            relativeY: 0
        }
        this.less = {
            appScreen: {},
            inputScreen: {}
        }
        this.init()
        this.notMove = false
    }

    init () {
        this.initInfo()
        this.nveScript()
        this.newScreen()
        this.initEvent()
    }

    shareTo (stype) {
        if(stype == 'qzone'){
            this._loginQQ()
        }
        //新浪微博接口的传参
        if(stype=='sina'){
           this._loginSina()
        }
    }

    initEvent () {
        this.fun.selectFun('#more').onclick = () => {
            let body = this.fun.selectFun('.sidebar-top')
            this.bg = new MaterialImage({
                el: body,
                output: 'background'
            })
            this.fun.selectFun('.sidebar').style.transform = `translateX(0rem)`
        }
        this.fun.selectFun('#index').onclick = () => {
            this.fun.selectFun('.sidebar').style.transform = `translateX(40rem)`
        }
        this.fun.selectFun('.sidebar-bottom').onclick = () => {
            this.fun.selectFun('.sidebar').style.transform = `translateX(40rem)`
        }
        this.fun.selectFun('#search-arise').onclick = () => {
            let less = this.fun.selectFun('.input-box')
            this.less.inputScreen = less
            less.style.cssText = `height: ${this.info.H}px; width: ${this.info.W}px;`
            less.style.display = 'flex'
            this.fun.selectFun('body').appendChild(less)
            this.fun.selectFun('.input-box').onclick = () => {
                this.fun.selectFun('.input-box').style.display = 'none'
            }
        }
        this.fun.selectFun('.input_').onclick = (event) => {
            event.stopPropagation()
        }
        let body = this.fun.selectFun('.sidebar-top')
        this.bg = new MaterialImage({
          el: body,
          output: 'background'
        })
        body.onclick = () => {
            this.bg.protract()
        }
        this.fun.selectFun('.slider-box').onmousemove = () => {
            this.fun.selectFun('.but').style.display = 'block'
        }
        this.fun.selectFun('.slider-box').onmouseout = () => {
            this.fun.selectFun('.but').style.display = 'none'
        }
        this.fun.selectFun('#vod-play').onclick = () => {
            let src = this.fun.selectFun('#vod-play').alt
            let srcImg =  this.fun.selectFun('#vod-play').src
            this.fun.selectFun('#vodScreen').style.cssText = `display: flex!important; height: ${this.info.H}px; width: ${this.info.W}px;`
            this.fun.selectFun('#vod-source').src = src
            this.fun.selectFun('#my-player').poster = srcImg
            this.fun.selectFun(".vod-box").load()
            this.fun.selectFun('#vodScreen').onclick = () => {
                this.fun.selectFun(".vod-box").pause()
                this.fun.selectFun('#vodScreen').style.cssText = `display: none;`
            }
        }
        this.fun.selectFun('.icon-user').onclick = () => {
            this._loginQQ()
        }
        let lessShare = this.fun.selectFun('.share')
        lessShare.style.height = `${this.H}px`
        let shareLess = lessShare.getElementsByTagName('div')
        for (let i = 0; i < shareLess.length; i++) {
            shareLess[i].onclick = () => {
                this.shareTo(shareLess[i].title)
            }
        }
    }
    _loginSina () {
        let txtVal = "阳光网站"         
        let url = "http://youngon.cn"
        window.open("http://v.t.sina.com.cn/share/share.php?appkey=4120396272&title=" + encodeURIComponent(txtVal)+"&url="+url)
    }
    _loginQQ () {
        let p = {
          url:'http://youngon.cn',
          showcount:'1',                           /* 是否显示分享总数,显示：'1'，不显示：'0'     */
          desc: '阳光网站',                          /* 默认分享理由(可选)                         */
          summary: '',                             /* 分享摘要(可选)                             */
          title: '',                               /* 分享标题(可选)                             */
          site: 'http://youngon.cn',        /* 分享来源 如：腾讯网(可选)                   */
          pics: 'www.baidu.com/img/bd_logo1.png',  /* 分享图片的路径(可选)                        */
          style: '203',
          width: 98,
          height: 22
        }
          var s = [];
        for(let i in p){
          s.push(i + '=' + encodeURIComponent(p[i]||''));
        }
        window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${s.join('&')}&otype=share`)
    }

    initInfo () {
        this.info.H = document.documentElement.clientHeight
        this.info.W = document.documentElement.clientWidth
        this.fun.getID = (id) => {
            return document.getElementById(id)
        }
        this.fun.getClass = (classN) => {
            return document.getElementsByClassName(classN)
        }
        this.fun.selectFun = (select) => {
            return document.querySelector(select)
        }
        this.fun.tagName = (father ,tag) => {
            return father.getElementsByTagName(tag)
        }
    }

    newScreen () {
        if(document.documentElement.clientWidth <= 1024) {
            this.less.appScreen = this.fun.getID('appScreen')
            this.fun.selectFun('.box').style.position = 'fixed'
            appScreen.style.cssText = `height: ${this.info.H}px; width: ${this.info.W}px; display: block!important;`
            let appScreen_box = this.fun.getID('appScreen_box')
            appScreen_box.style.cssText = `height: ${this.info.H}px; width: ${this.info.W}px;`
            addEventListener('touchmove', (event) => {this.touchMove(event)}, false)
            addEventListener('touchstart', (event) => {this.touchStart(event)}, false)
            addEventListener('touchend', (event) => {this.touchEnd(event)}, false)
        } else {
            return null
        }
    }

    touchMove (event) {
        if (this.notMove) return
        let Y = event.targetTouches[0].pageY
        this.screenMv.relativeY = Y - this.screenMv.pageY
        this.less.appScreen.style.top = `${this.screenMv.relativeY}px`
        if (parseInt(this.less.appScreen.style.top) >= 0) {
            this.less.appScreen.style.top = '0px'
            return
        }
    }
    touchStart (event) {
        if (this.notMove) return
        this.screenMv.pageY = event.targetTouches[0].pageY
    }
    touchEnd (event) {
        if (this.notMove) return
        if (parseInt(this.less.appScreen.style.top) <= -2) {
            this.notMove = true
            this.less.appScreen.style.transform = `translate3d(0px, -${this.info.H}px, 0px)`
            setInterval(() => {
                document.removeEventListener('touchmove', this, false)
                document.removeEventListener('touchstart', this, false)
                document.removeEventListener('touchend', this, false)
                this.fun.selectFun('#appScreen').style.display = 'none'
                this.fun.selectFun('.box').style.position =  'absolute'
            }, 1000)
        } else {
            return
        }
    }
    
    nveScript () {
        const nve = this.fun.selectFun('.nve')
        const nveChild = this.fun.tagName(nve, 'div')
        for (let i = 0; i < nveChild.length; i++) {
            nveChild[i].onclick = () => {
                changeStyle(nveChild[i])
            }
        }
        const changeStyle = (less) => {
            for (let o = 0; o < nveChild.length; o++) {
                nveChild[o].id = ''
            }
            less.id = 'nveTitleStyle'
        }
    }
}


window.onload = () => {
    new index()
    console.log('欢迎查看youngon站点')
    console.log('一张网页要经历怎样的过程才能呈现在用户的眼前')
    console.log('一个年纪人要经历怎样的磨练才能达到技术之巅')
    console.log('这里是阳光网站欢迎你的加入,让我们共同成长')
    console.log('我们等的就是你')
}