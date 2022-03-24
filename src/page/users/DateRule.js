import dayjs from "dayjs"

//判断是否没值
const isNull = (data)=>{
  if(!data){
    return true
  }
  if(JSON.stringify(data) == '{}'){
    return true
  }
  if(JSON.stringify(data) == '[]'){
    return true
  }
}


const filterTime = (val,format = 'YYYY-MM-DD') => {
  if(!isNull(val)){
    val = parseInt(val) * 1000 //给的时间位数不对 需要*10
    return dayjs(val).format(format)
  }else{
    return "--"
  }
}


export default filterTime