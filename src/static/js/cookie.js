const Cookie = (() => {
  return {
    set: (key, val, day) => {
      let date = new Date()
      let expires = day ? +day : 1
      date.setTime(+date + (expires * (24*36e5)))
      document.cookie = key + '=' + val + '; expires=' + date.toGMTString()
      console.log('date is => ', date);
      console.log('toGMTString is => ', date.toGMTString());
    },
    get: (key) => {
      let str = document.cookie.replace(/[ ]/g, '')
      let cookieArr = str.split(';')
      let val
      for (let i=0; i<cookieArr.length; i++) {
        let arr = cookieArr[i].split('=')
        if (key === arr[0]) {
          val = arr[1]
          break
        }
      }
      return val
    },
    del: (key) => {
      let date = new Date()
			let times = date.getTime()
			let st = times - 10000
			date.setTime(st);
			document.cookie = key +'=v; expires='+ date.toGMTString();
    }
  }
})()
export default Cookie
