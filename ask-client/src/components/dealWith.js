export const dealWith = (reword) => {
  let rewordArray = []
  let rewordInfo = []
  let maybe = []
  reword.reword.forEach(element => {
    rewordArray.push(element.rewordName)
    let f = parseInt(element.index) + 1
    rewordInfo.push(`恭喜你获得${f}等奖`)
    maybe.push(element.rwordChance / 10)
  })
  let gared = 0
  maybe.forEach((item) => {
    gared = parseInt(gared) + item
  })
  let noMaby = (10 - gared) / parseInt(8 - maybe.length)
  for (let i = rewordArray.length; i < 8; i++) {
    let u = Math.floor(Math.random() * rewordArray.length)
    rewordArray.splice(u, 0, `谢谢参与`)
    rewordInfo.splice(u, 0, `再接再厉`)
    maybe.splice(u, 0, noMaby)
  }
  return [rewordArray, rewordInfo, maybe]
}
