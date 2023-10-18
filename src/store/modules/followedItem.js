import { getFollowedItemList } from '@/api/followedItem'

const state = {
  followedItemList: []
}

const mutations = {
  getFollowedItemList: (state, followedItemList) => {
    for (let i = 0; i < followedItemList.length; i++) {
      state.followedItemList[i] = {
        url: followedItemList[i].productUrl,
        name: followedItemList[i].productName,
        id: followedItemList[i].productId,
        imgUrl: followedItemList[i].productImgUrl,
        price: followedItemList[i].productPrice,
        status: followedItemList[i].productStatus
      }
    }
  }
}

const actions = {
  getFollowedItemList ({ commit }) {
    return new Promise((resolve, reject) => {
      getFollowedItemList()
        .then((response) => {
          const { data } = response
          if (!data) {
            const error = 'Verification failed, please Login again.'
            return reject(error)
          }
          commit('getFollowedItemList', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
