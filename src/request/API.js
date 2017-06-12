/**
 * Created by zhangweiwei on 2017/04/10.
 */

import Vue from 'vue'
import axios from 'axios'
import config from './config'
import Qs from 'qs'
import {EventBus, Constants} from  '../service/index';


let test = 'http://10.1.40.42/bang/www/';
let test1 = 'http://bpre.uz.com/';
let test2 = 'http://bang.uz.com/';

class API {

    constructor(view) {
        this.that = view;
    }

    //http://bang.uz.com/
    method = {
        baseURL: test2 + 'index.php',
        login: "m=bang&f=memberSt&v=login",
        orderlist: 'm=hkapp&f=order2&v=orderList',
        nodelist: 'm=hkapp&f=order&v=nodeList',
        myLoglist: 'm=hkapp&f=orderLog&v=myLoglist',
        hkDataList: 'm=hkapp&f=evaluate&v=hkDataList',          //个人中心-管家数据
        schedule: 'm=hkapp&f=evaluate&v=schedule',              //个人中心-badge
        evaluateList:'m=hkapp&f=evaluate&v=evaluateList'        //业主评价列表
    }

    post(url, param, success, fail, finish) {
        let _url = this.method.baseURL + '?' + url;
        return this._request(_url, 'post', param, success, fail, finish)
    }

    get(url, param) {
        // config.params = param;
        //return axios.get("", config);

        let _url = url;
        if (param)
            _url = _url + '?' + Qs.stringify(param)

        return this._request(_url, 'get')
    }

    _request(url, type, param, success, fail, finish) {

        if (!param) {
            param = {};
        }

        //默认添加登录参数
        let userStr = Vue.localStorage.get('user');
        if (userStr) {
            let user = JSON.parse(userStr);
            param.uid = user.uid;
        }

        if (type === 'get') {
            config.params = param;
        } else {
            config.data = param;
        }

        config.method = type;

        let request;
        if (type === 'get') {
            request = axios.get(url, config)
        } else {
            request = axios[type](url, null, config)
        }

        request.then((response) => {
            let result = response.data;

            if (!('code' in result)) {
                success(result);
                return;
            }
            if (result.code == 1) {
                if (success) {
                    success(result);
                }
            } else {
                if (fail) {
                    fail(result);
                }
                EventBus.$emit(Constants.EventBus.showToast, {
                    message: result.message
                });
            }
        }).catch((error) => {
        })

        return request;
    }

}
export default API;