import request from '@/utils/request'
import { downFile } from '@/utils/request'

/**
 * 出库分页查询
 * @param {查询条件} data
 */
export function listOuWarehouset(query) {
  return request({
    url: 'business/OuWarehouset/list',
    method: 'get',
    params: query,
  })
}

/**
 * 新增出库
 * @param data
 */
export function addOuWarehouset(data) {
  return request({
    url: 'business/OuWarehouset',
    method: 'post',
    data: data,
  })
}



export function aLLADDplanStock(data) {
  return request({
    url: 'business/OuWarehouset/stockAdd',
    method: 'post',
    data: data,

  })
}
/**
 * 修改出库
 * @param data
 */
export function updateOuWarehouset(data) {
  return request({
    url: 'business/OuWarehouset',
    method: 'PUT',
    data: data,
  })
}
/**
 * 获取出库详情
 * @param {Id}
 */
export function getOuWarehouset(id) {
  return request({
    url: 'business/OuWarehouset/' + id,
    method: 'get'
  })
}

/**
 * 删除出库
 * @param {主键} pid
 */
export function delOuWarehouset(pid) {
  return request({
    url: 'business/OuWarehouset/delete/' + pid,
    method: 'delete'
  })
}
// 清空出库
export function clearOuWarehouset() {
  return request({
    url: 'business/OuWarehouset/clean',
    method: 'delete'
  })
}
// 导出出库
export async function exportOuWarehouset(query) {
  await downFile('business/OuWarehouset/export', { ...query })
}
