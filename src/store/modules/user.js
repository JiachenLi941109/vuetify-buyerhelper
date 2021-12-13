import { login, getInfo, register, getAuthCode } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { userEmail, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: userEmail.trim(), password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          console.log(data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user getAuthCode
  getAuthCode ({ commit }, userEmail) {
    return new Promise((resolve, reject) => {
      getAuthCode({ username: userEmail.trim() })
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user register
  register ({ commit }, userInfo) {
    const { userEmail, password, authCode } = userInfo
    return new Promise((resolve, reject) => {
      register({
        username: userEmail.trim(),
        password: password,
        authCode: authCode
      })
        .then((response) => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject('Verification failed, please Login again.')
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  // logout ({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         removeToken() // must remove  token  first
  //         resetRouter()
  //         commit('RESET_STATE')
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  logout ({ commit, state }) {
    removeToken()
    resetRouter()
    console.log('remove Token')
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
