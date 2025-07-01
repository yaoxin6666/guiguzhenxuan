//封装函数，获取现在早上/上午/下午/晚上
export const getTime = () =>{
  let message = ''
  const hours = new Date().getHours()
  if(hours<=10) {
    message = '早上'
  }else if (hours<=14) {
    message = '上午'
  }else if (hours<=18){
    message = '下午'
  }else {
    message = '晚上'
  }
  return message
}