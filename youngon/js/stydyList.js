class Study {
    constructor () {
        this.transfromNve()
    }
    transfromNve () {
        let indexValue = location.href.split('/')[location.href.split('/').length - 1].split('.')[0]
        let index_Value = ['index', 'ksxx', 'tstj', 'kzfx', 'xszx', 'rjjc']
        let lessFater = document.querySelector('.nve')
        let less = lessFater.getElementsByTagName('a')
        for (let i = 0; i < less.length; i++) {
            less[i].className = 'col-lg-2 col-6 col-sm-6'
            if (index_Value[i] === indexValue) {
                less[i].className = 'col-lg-2 col-6 col-sm-6 nveStyle'
            }
        }
    }
}



window.onload = () => {
    new Study
}