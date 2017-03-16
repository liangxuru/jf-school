import Vue from 'vue'
import VueResource from 'vue-resource'

//启用http请求插件
Vue.use(VueResource);
//请求拦截
const TIMEOUT = 5000;
var request = (options) => {
    return Vue.http({
        headers: options.headers,
        url: options.url,
        method: options.method,
        body: options.body,
        params: options.params,
        timeout: TIMEOUT,
        emulateJSON: true
    }).then(response => {
        var result = JSON.parse(response.body);
        if(result.status == 1){
        	return result.data;
        }else{
        	console.error(result.massage);
        }
    }).catch((response)=>{console.error(response);});
}

//http请求方式
export const http = {};
['get', 'post', 'put', 'delete'].forEach(method => {
    http[method] = (url, params, headers = {}) => {
        if (method === 'get') {
            return request({ url, params, method: method, headers: headers });
        }
        return request({ url, body: params, method: method, headers: headers });
    };
});