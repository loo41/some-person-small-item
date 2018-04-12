const nowIndex = {
  value: 'a'
}
  
const routerStyleContral = (state = nowIndex, action) => {
  switch(action.type){
    case '_CHANGESTYLE':
      state.Index = action.data
      return state
    default:
      return state
  }
}

const noticeList = {
  data: null
}


const noticeListData = (state = noticeList, action) => {
    switch(action.type){
      case '_NOTICEDATA':
        return Object.assign({}, state, {
          data: action.data
        })
      default:
        return state
    }
}

export {
  routerStyleContral,
  noticeListData
}