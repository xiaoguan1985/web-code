function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 1000 / 2));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//清除cookie
function clearCookie(name) {
  setCookie(name, "", -1);
}

function getRequest() {
  var url = window.location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

function trim(s){
  return s.replace(/(^s*)|(s*$)/g, "");
}

function isNumber(value){
  return typeof value === 'number' && !isNaN(value);
}

//[1,2,3,4] => ["首页","产品管理"]
// function tranMenu(array){

//   let listMenu = menu;
//   let result   = [];
//   let sa = new Set(JSON.parse(array));

//   listMenu.forEach((item)=>{

//     if(sa.has(item.id)){
//       result.push(item.Title)
//     }
//   })

//   return result;
// }

// //权限判断 显示后台传过来的菜单
// function filterMenu(array){
//   let listMenu = menu;
//   var sa = new Set(JSON.parse(array));

//   return listMenu.filter((item, index, element)=>{
//     if(sa.has(item.id) && item.child && item.child.length>0){
//       item.child = item.child.filter(c=>{
//         return sa.has(c.id)
//       })
//     }
//     return sa.has(item.id) 
//   })
// }

function timeAgo(dateTimeStamp){   
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();   //获取当前时间毫秒
  console.log(now)
  var diffValue = now - dateTimeStamp;//时间差

  if(diffValue < 0){
    return;
  }
var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
var hourC = diffValue/hour;
var dayC = diffValue/day;
var weekC = diffValue/week;
var monthC = diffValue/month;
let result = '';

if(monthC >= 1 && monthC < 4){
  result = " " + parseInt(monthC) + "月前"
}else if(weekC >= 1 && weekC < 4){
  result = " " + parseInt(weekC) + "周前"
}else if(dayC >= 1 && dayC < 7){
  result = " " + parseInt(dayC) + "天前"
}else if(hourC >= 1 && hourC < 24){
  result = " " + parseInt(hourC) + "小时前"
}else if(minC >= 1 && minC < 60){
  result =" " + parseInt(minC) + "分钟前"
}else if(diffValue >= 0 && diffValue <= minute){
    result = "刚刚"
  }else {
    var datetime = new Date();
  datetime.setTime(dateTimeStamp);
  var Nyear = datetime.getFullYear();
  var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

export {
  
  getCookie,
  setCookie,
  clearCookie,
  getRequest,
  trim,
  isNumber,
  timeAgo
}
