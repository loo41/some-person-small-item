
class corp {
    constructor(){
        this.W = null
        this.H = null
        this.anim = null
        this.i = 0
        this.p = 0
        this.y = 0
        this.init()
        this.anmation()
    }
    init () {
        let less = document.querySelector('.list-db-ani')
        let maxH = document.querySelector('.list-body-top')
        let right = document.querySelector('.list-body-right')
        this.anim = document.querySelector('.list-animation')
        this.H = less.offsetHeight
        this.W = less.offsetWight
        this.y = Math.floor(this.H / 270)
        this.i = document.querySelector('.list-animation').getElementsByTagName('div').length
        right.style.cssText =`max-height: ${maxH.offsetHeight}px`
        less.style.cssText =`max-height: ${maxH.offsetHeight}px; 
                            height: ${maxH.offsetHeight}px;`
    }
    anmation () {
        let h = this.y * 300
        var timer = setTimeout(() => {this.anmation()}, 2000)    
        if (this.p <= this.i - this.y) {
            this.anim.style.transform = `translate3d(0px, -${this.p * 300}px, 0px)`
            this.p++
        } else {
            let k = this.p
            clearTimeout(timer)
            let time = setInterval(() => {
                k --
                if (k === 0) {
                    clearInterval(time)
                    this.p = 0
                    this.anmation.call(this)
                }
                this.anim.style.transform = `translate3d(0px, -${k * 300}px, 0px)`
            }, 2000)
        }
    }
}


window.onload = () => {
    /* 看代码的不要喷我，太懒了不想以更好的方式写 */
    new corp()
}