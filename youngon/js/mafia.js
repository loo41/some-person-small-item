
class mafig {
    constructor () {
        this.H = document.documentElement.clientHeight
        this.W = document.documentElement.clientWidth
        this.init()
    }
    init() {
        let selectFun = (select) => {
            return document.querySelector(select)
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
    }
}



window.onload = () => {
    new mafig()
}