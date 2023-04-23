import test from "./regex"
import { PREVIEW_URL } from "@/settings"

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
      return Array.isArray(value)
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
* @description 深度克隆
* @param {object} obj 需要深度克隆的对象
* @returns {*} 克隆后的对象或者原值（不是对象）
*/
function deepClone(obj) {
   // 对常见的“非”值，直接返回原来值
   if ([null, undefined, NaN, false].includes(obj)) return obj
   if (typeof obj !== 'object' && typeof obj !== 'function') {
       // 原始类型直接返回
       return obj
   }
   const o = test.array(obj) ? [] : {}
   for (const i in obj) {
       if (obj.hasOwnProperty(i)) {
           o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
       }
   }
   return o
}


/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
function timeFormat(dateTime = null, formatStr = 'yyyy-mm-dd') {
  let date
    // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date()
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
    date = new Date(dateTime * 1000)
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime))
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
    date = new Date(
      typeof dateTime === 'string'
        ? dateTime.replace(/-/g, '/')
        : dateTime
    )
  }

    const timeSource = {
        'y': date.getFullYear().toString(), // 年
        'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        'd': date.getDate().toString().padStart(2, '0'), // 日
        'h': date.getHours().toString().padStart(2, '0'), // 时
        'M': date.getMinutes().toString().padStart(2, '0'), // 分
        's': date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
    }
  }

  return formatStr
}

let timeout = null
/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func, wait = 500, immediate = true) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
          timeout = null
      }, wait)
      if (callNow) typeof func === 'function' && func()
  } else {
      // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
      timeout = setTimeout(() => {
          typeof func === 'function' && func()
      }, wait)
  }
}


export default {
  deepClone,
  timeFormat,
  debounce
}

export function $parsePath(path){
  if(!path)return
  if(typeof path != 'string' || path.startsWith("http")) return
  return PREVIEW_URL+path
}