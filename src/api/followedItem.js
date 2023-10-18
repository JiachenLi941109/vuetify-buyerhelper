import request from '@/utils/request'

export function getFollowedItemList (data) {
  return request({
    url: '/user/getFollowedItemList',
    method: 'get',
    data
  })
}
