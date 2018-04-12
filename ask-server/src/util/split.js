exports.splitQuAW = async(data) => {
    let answers = []
    let questions = data.allQuestion
    data.allQuestion.forEach((element, index) => {
        answers.push({index, value: element.trueSubject, grade: element.grade})
        element.index = index
        if (element.type === 1) {
            element.trueSubject = {index, value: 15}
        } else if (element.type === 2) {
            element.trueSubject = {index, value: []}
        }
    });
    return [answers, data]
}

exports.randomSubject = async(ask) => {
    while (ask.allQuestion.length > ask.askAmount) {
        ask.allQuestion.splice(Math.floor(Math.random()*ask.allQuestion.length), 1)
    } 
    return ask
}

exports.subjectGrade = async(ask, answers) => {
    let grade = 0
    ask.allQuestion.forEach((item, index) => {
        if(item.type === 1 && item.trueSubject.value === answers.answer[item.index].value && item.grade === answers.answer[item.index].grade) {
            grade = parseInt(grade) + parseInt(item.grade)
        } else if (item.type === 2 && item.trueSubject.value.sort().toString() === answers.answer[item.index].value.sort().toString() && item.grade === answers.answer[item.index].grade) {
            grade = parseInt(grade) + parseInt(item.grade)
        }
    })
    return grade
}