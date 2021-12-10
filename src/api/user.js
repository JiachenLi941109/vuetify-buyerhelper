import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
