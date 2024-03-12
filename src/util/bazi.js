import { sysData } from "@/util/sys";
import moment from 'moment';


const bazi = {};
const y_d = moment();
const y_t = y_d.valueOf();

const y = Number(y_d.format("YYYY")) ;
const m = Number(y_d.format("M")) - 1;
const d = Number(y_d.format("D")); 
const h = Number(y_d.format("H"));

// ---------------------------------------------------------------------------------------------------------------  年干
bazi.yGan = function(){  //年干
  
  return sysData.tg[(y+6)%10];
}

bazi.yZhi = function(){  //年支
  var nz;
  let dz0 = sysData.dz0;
  if(y-1984<=0) {
    nz= dz0[11+(y-1984)%12];
  }else{
    ((y-1984)%12-1)==-1?nz=dz0[11]:nz=dz0[(y-1984)%12-1];
  }
  return nz;
}
// ---------------------------------------------------------------------------------------------------------------  年干结束


bazi.mGan = function(){  //月干
  var ng = bazi.yGan();
  let tg = sysData.tg;
  var mg;

  if(ng=="甲"||ng=="己") mg = tg[(1+m)%10];
  if(ng=="乙"||ng=="庚") mg = tg[(3+m)%10];
  if(ng=="丙"||ng=="辛") mg = tg[(5+m)%10];
  if(ng=="丁"||ng=="壬") mg = tg[(7+m)%10];
  if(ng=="戊"||ng=="癸") mg = tg[(9+m)%10];

  if( y_t < ((y-1984)*31556926009 + sysData.jq84[m] )){

    (tg.indexOf(mg) -1) == -1 ? mg = tg[9] : mg = tg[tg.indexOf(mg)-1];
  }  

  return mg;
}

bazi.mZhi = function(){  //月支
 
  let yz = sysData.dz0[m];

  if(y_t < ((y-1984)*31556926009 + sysData.jq84[m]) ){
    yz = sysData.dz0[sysData.dz.indexOf(yz)-1];
  }

  return yz;
} 


bazi.dGan = function(){  //日干

  let y_d84 = sysData.y_d84;
  let tg    = sysData.tg;
  let dz0   = sysData.dz0;

  var y_r = Math.floor((y_t-y_d84)/86400000)%60;
      var rg;
      y_r >=0 ? rg = tg[y_r%10] : rg = tg[(4+(60+y_r)%10)%10];
      return rg;
}

bazi.dZhi = function(){  //日支

  let y_d84 = sysData.y_d84;
  let dz0   = sysData.dz0;

  var y_r=Math.floor((y_t-y_d84)/86400000)%60;
      var rz;
      y_r>=0?rz=dz0[(5+y_r%12)%12]:rz=dz0[(5+(60+y_r)%12)%12];
      return rz;
}


bazi.hGan = function(){  //时干
  var rg = bazi.dGan();
  var sz = bazi.hZhi();

  let y_d84 = sysData.y_d84;
  let dz0   = sysData.dz0;
  let tg    = sysData.tg;

  var sg;
  if(rg=="甲"||rg=="己") sg=tg[(1+dz0.indexOf(sz))%10];
      if(rg=="乙"||rg=="庚") sg=tg[(3+dz0.indexOf(sz))%10];
      if(rg=="丙"||rg=="辛") sg=tg[(5+dz0.indexOf(sz))%10];
      if(rg=="丁"||rg=="壬") sg=tg[(7+dz0.indexOf(sz))%10];
      if(rg=="戊"||rg=="癸") sg=tg[(9+dz0.indexOf(sz))%10];
      return sg;
}
bazi.hZhi = function(){  //时支

  let dz0   = sysData.dz0;

  var sz;
      if(h>=0) sz=dz0[11];
      if(h>=1) sz=dz0[0];
      if(h>=3) sz=dz0[1];
      if(h>=5) sz=dz0[2];
      if(h>=7) sz=dz0[3];
      if(h>=9) sz=dz0[4];
      if(h>=11) sz=dz0[5];
      if(h>=13) sz=dz0[6];
      if(h>=15) sz=dz0[7];
      if(h>=17) sz=dz0[8];
      if(h>=19) sz=dz0[9];
      if(h>=21) sz=dz0[10];
      if(h>=23) sz=dz0[11];
      return sz;
}


bazi.naYin = function(zhu){  //纳音
  var na=[];
  let nayin   = sysData.nayin;
  na=na.concat(nayin[zhu]); 
  return na[0];
}

bazi.yZhu = function(){  //年柱
  return bazi.yGan(y) + bazi.yZhi(y);
}

bazi.mZhu = function(){  //月柱
  let mGan = bazi.mGan();
  let mZhi = bazi.mZhi();
  if(mGan === "丙" && mZhi === "卯"){
    mZhi = "寅"
  }
  return mGan +  mZhi;
}

bazi.dZhu = function(){  //日柱
  return bazi.dGan() + bazi.dZhi();
}

bazi.hZhu = function(){  //时柱
  return bazi.hGan() + bazi.hZhi();
}


export {
  bazi
}