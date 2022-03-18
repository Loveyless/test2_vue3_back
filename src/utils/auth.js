const TOKEN_TIME = "tokenTime";
const TOKEN_TIME_VALUE = 10 * 60 * 60 * 1000;
// const TOKEN_TIME_VALUE = 6000;

//登录时设置时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME,Date.now())
};

//是否过期
export const diffTokenTime = ()=>{
  // 当前时间
  const currentTime = Date.now()
  //用户登录时间
  const tokenTime = localStorage.getItem(TOKEN_TIME)
  //返回是否已经过期
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}