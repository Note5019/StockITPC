import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Service {

  constructor(public http: HttpClient) {
    
  }

  HelloLogin(){
    return "Hello Login";
  }
  url = 'http://localhost:8088/StockITPC.asmx/'; //http://192.168.228.40:8088 //http://localhost:62660
  login(username,password){
    return this.http.get(this.url+'GetUserLogin?username='+username+'&password='+password);
  }
  GetProduct(itemcode){
    return this.http.get(this.url+'GetProduct?itemcode='+itemcode);
  }
  GetProductAll(){
    return this.http.get(this.url+'GetProductAll');
  }
  GetProductCate(){
    return this.http.get(this.url+'GetProductCate');
  }
  GetAdjustProduct(itemcode,site){
    return this.http.get(this.url+'GetAdjustProduct?itemcode='+itemcode+'&site='+site);
  }
  GetTotalProduct(itemcode){
    return this.http.get(this.url+'GetTotalProduct?itemcode='+itemcode);
  }
  GetTransactionProduct(site){
    return this.http.get(this.url+'GetTransactionProduct?site='+site);
  }
  PostStockOrder(number,date,site,status,username){
    return this.http.get(this.url+'PostStockOrder?number='+number+'&date='+date+'&site='+site+'&status='+status+'&username='+username);
  }
  PostStockOrderDetail(number,itemCode,itemName,itemLot,itemQty,itemCateId){
 
    return this.http.get(this.url+'PostStockOrderDetail?number='+number+'&itemCode='+itemCode+'&itemName='+itemName+'&itemLot='+itemLot+'&itemQty='+itemQty+'&itemCateId='+itemCateId);
  }
  PostStockAdjust(site,category,itemCode,stock,count,diff){
    return this.http.get(this.url+'PostStockAdjust?site='+site+'&category='+category+'&itemCode='+itemCode+'&stock='+stock+'&count='+count+'&diff='+diff);
  }

//   PostTest(number,date,site,status,username,products){
//     //return this.http.get('http://localhost:58548/AppMobileStockITPC.asmx/PostTest?number='+number+'&date='+date+'&site='+site+'&status='+status+'&username='+username+'&products='+JSON.stringify(products));
//     var dataProducts = '<?xml version="1.0" encoding="utf-8"?>'+
// '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
//   '<soap:Body>'+
//     '<PostTest xmlns="http://tempuri.org/">'+
//       '<number>test</number>'+
//       '<date>test</date>'+
//       '<site>test</site>'+
//       '<status>test</status>'+
//       '<username>test</username>'+
//       '<products>'+
//         '<DataProducts><itemCode>test</itemCode><itemName>test</itemName><itemLot>test</itemLot><itemQty>test</itemQty><itemCateId>test</itemCateId></DataProducts>'+
//       '</products>'+
//     '</PostTest>'+
//   '</soap:Body>'+
// '</soap:Envelope>';
//     return this.http.post('http://localhost:58548/AppMobileStockITPC.asmx?op=PostTest',dataProducts);
//   }
}
