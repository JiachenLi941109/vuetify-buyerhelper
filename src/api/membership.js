import request from '@/utils/request'
export function subscribe (data) {
  return request({
    url: '/member/subscribe',
    method: 'post',
    data
  })
}
