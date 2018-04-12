
const homeFristData = [
  {homePageOneLeftData: null},
  {homePageOneRightData: null},
  {account: null}
]


const getHomePageData = (state = homeFristData, action) => {
  switch(action.type){
    case '_CHANGEHOMEDATA':
      state[0].homePageOneLeftData = action.data
      state[2].account = action.data.account
      return state
    case '_CHANGEHOMERIGHTDATA':
      state[1].homePageOneRightData = action.data
      return state
    default:
      return state
  }
}


const blogData = {
  blogData: null,
  blogRightData: null
}

const getBlogData = (state = blogData, action) => {
  switch(action.type){
    case '_CHANGBLOGDATA':
      state.blogData = action.data[0]
      state.blogRightData = action.data[1]
      return state
    default:
      return state
  }
}

const labelData = {
  labelListValue: null,
  labelLengths: null
}

const getLabelData = (state = labelData, action) => {
  switch(action.type){
    case '_CHANGLABELDATA':
      state.labelListValue = action.data
      return state
    case '_CHANGLABELLIST':
      state.labelLengths = action.data
      return state
    default:
      return state
  }
}

const leaveMessage = {
  message: null
}

const getLeaveMessage = (state = leaveMessage, action) => {
  switch(action.type) {
    case '_LEAVEMESSAGE':
      leaveMessage.message = action.data
      return state
    default:
      return state
  }
}

export {
  getHomePageData,
  getBlogData,
  getLabelData,
  getLeaveMessage
}