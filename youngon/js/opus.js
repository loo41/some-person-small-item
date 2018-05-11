class opus {
    constructor () {
        this.root = []
        this.H = document.documentElement.clientHeight
        this.W = document.documentElement.clientWidth
        this.init()
        this.transfromNve()
    }
    transfromNve () {
        let indexValue = location.href.split('/')[location.href.split('/').length - 1].split('.')[0]
        let index_Value = ['zp', 'grzp', 'stzp']
        let selectClass = (select) => {
            return document.getElementsByClassName(select)
        }
        let less = selectClass('opus-list')
        let flag = false
        for (let i = 0; i < less.length; i++) {
            less[i].className = 'opus-list'
            if (index_Value[i] === indexValue) {
                flag = true
                less[i].className = 'opus-nowList opus-list'
            } 
        }
        if (!flag) less[0].className = 'opus-nowList opus-list'
    }
    init() {
        let selectFun = (select) => {
            return document.querySelector(select)
        }
        let selectClass = (select) => {
            return document.getElementsByClassName(select)
        }
        selectFun('#search-arise').onclick = () => {
            let less = selectFun('.input-box')
            less.style.cssText = `height: ${this.H}px; width: ${this.W}px;`
            less.style.display = 'flex'
            selectFun('body').appendChild(less)
            selectFun('.input-box').onclick = () => {
                selectFun('.input-box').style.display = 'none'
            }
        }
        selectFun('.input_').onclick = (event) => {
            event.stopPropagation()
        }
        let root = document.getElementsByClassName('opus-lists')[0]
        this.root = root.getElementsByTagName('div')
        for (let i = 0; i < this.root.length; i++) {
            this.root[i].onclick = () => {
                this.show(i)
            }
        }
        selectFun('.slider-box').onmousemove = () => {
            selectFun('.but').style.display = 'block'
        }
        selectFun('.slider-box').onmouseout = () => {
            selectFun('.but').style.display = 'none'
        }
    }
    show(i) {
        let less = document.createElement('div')
        less.className = 'show'
        less.style.cssText = `height: ${this.H}px; width: ${this.W}px;`
        let child = document.createElement('img')
        child.className = 'child'
        child.src = this.root[i].childNodes[0].src
        less.appendChild(child)
        document.body.appendChild(less)
        less.onclick = () => {
            document.body.removeChild(document.getElementsByClassName('show')[0])
        }
    }
}

window.onload = () => {
    new opus()
}