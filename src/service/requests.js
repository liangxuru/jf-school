import { URL } from './api'
import { http } from './base.js'

export const Request = {};
/** 场地相关接口start **/
Request.GetProductsBySportType = (options) => {
	return http.get(`${URL.PRODUCT_LIST}`, options);
}
Request.GetPrductById = (options) =>{
	return http.get(`${URL.ONE_PRODUCT}`, options);
}
Request.GetWeekdays = (options) =>{
	return http.get(`${URL.WEEKDAYS}`, options);
}
Request.GetResourcePrice = (options) =>{
	return http.get(`${URL.RESOURCE_PRICE}`, options);
}
Request.PostOrder = (options) =>{
	return http.post(`${URL.ADD_ORDER}`, options);
}
/** 场地相关接口end **/
/** 会员相关接口start **/
Request.GetMemberCardInfo = (options) =>{
	return http.get(`${URL.MEMBER_CARD}`, options);
}
/** 会员相关接口end **/