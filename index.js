var xl =require('xlsx');
var fs = require("fs");
var _ = require('lodash');

//workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
var workbook =  xl.readFile("./data/TIME日记产品表5.6总表的副本.xlsx")



// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const worksheet = workbook.Sheets[sheetNames[0]];

// console.log(sheetNames,worksheet)

//返回json数据
var dataa =xl.utils.sheet_to_json(worksheet);

// console.log(dataa);

var productArr = [];

_.forEach(dataa,(item)=>{
  // if(!obj[item['模块代码']]){
  //   obj[item['模块代码']] = {};
  // }
  // obj[item['模块代码']][item['代码(不加模块)']] = item['中文']  
  let obj = {}
  obj['img'] = item['主图'];
  obj['code'] = item['货号'];
  obj['price'] = item['直播价'];
  obj['desc'] = item['库存备注'];
  productArr.push(obj);
})

// dataa.forEach(item => {
//   console.log(item['主图'])
//   obj['img'] = item['主图'];
//   obj['code'] = item['货号'];
// })


fs.writeFile('./dist/result.json',JSON.stringify(productArr),{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
  if(err){
      console.log("文件写入失败", err)
  }else{
      console.log("文件写入成功");

  }

})