import request from '@/utils/request'
import { downFile } from '@/utils/request'

/**
 * 供应商基础功能分页查询
 * @param {查询条件} data
 */
export function listSupplier(query) {
  return request({
    url: 'business/Supplier/list',
    method: 'get',
    params: query,
  })
}
export function AlllistSupplier(query) {
  return request({
    url: 'business/Supplier/AllList',
    method: 'get',
    params: query,
  })
}

/**
 * 新增供应商基础功能
 * @param data
 */
export function addSupplier(data) {
  return request({
    url: 'business/Supplier',
    method: 'post',
    data: data,
  })
}
/**
 * 修改供应商基础功能
 * @param data
 */
export function updateSupplier(data) {
  return request({
    url: 'business/Supplier',
    method: 'PUT',
    data: data,
  })
}
/**
 * 获取供应商基础功能详情
 * @param {Id}
 */
export function getSupplier(id) {
  return request({
    url: 'business/Supplier/' + id,
    method: 'get'
  })
}

/**
 * 删除供应商基础功能
 * @param {主键} pid
 */
export function delSupplier(pid) {
  return request({
    url: 'business/Supplier/delete/' + pid,
    method: 'delete'
  })
}
// 清空供应商基础功能
export function clearSupplier() {
  return request({
    url: 'business/Supplier/clean',
    method: 'delete'
  })
}
// 导出供应商基础功能
export async function exportSupplier(query) {
  await downFile('business/Supplier/export', { ...query })
}