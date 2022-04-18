import * as TYPES from './types'

export default {
  [TYPES.SET_TASKS] (state, tasks) {
    state.tasks = tasks
  },
  [TYPES.SET_USERID] (state, userid) {
    state.userid = userid
  }
}
