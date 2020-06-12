const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//防抖start
const debounce = {
  timeoutId: null,
  debounce: function (fn, ms) {
    let { timeoutId = null } = debounce;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      debounce.timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, ms);
    }
  }
}
//防抖end
//节流start
const throttle = {
  throttleId: null,
  throttle: function (fn, ms) {
    let { throttleId = null } = throttle;
    return function (...args) {
      if (!throttleId) {
        fn.apply(this, args);
        throttle.throttleId = setTimeout(() => {
          throttle.throttleId = null
        }, ms);
      }
    }
  }
}
//节流end
module.exports = {
  formatTime: formatTime,
  debounce: debounce.debounce,
  throttle: throttle.throttle
}
