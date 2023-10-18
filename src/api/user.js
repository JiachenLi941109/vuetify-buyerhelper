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

export function resetPassword (data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}

export function getRegisterAuthCode (data) {
  return request({
    url: '/user/getRegisterAuthCode',
    method: 'post',
    data
  })
}

export function getPasswordFoundAuthCode (data) {
  return request({
    url: '/user/getPasswordFoundAuthCode',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
