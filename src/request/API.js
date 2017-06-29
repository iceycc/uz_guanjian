/**
 * Created by zhangweiwei on 2017/04/10.
 * https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/ axios全攻略
 */

import axios from 'axios'
import config from './config'
import Qs from 'qs'
import {EventBus, Constants, JsBridge} from  '../service/index';

class API {

    constructor(view) {
        this.that = view;
    }

    post(url, param, success, fail, finish) {
        let _url = config.baseURL + '?' + url;
        return this._request(_url, 'post', param, success, fail, finish)
    }

    get(url, param) {
        let _url = url;
        if (param)
            _url = url + '?' + Qs.stringify(param)
        return this._request(_url, 'get')
    }

    _request(url, type, param, success, fail, finish) {
        config.method = type;

        //添加请求参数
        if (!param) {
            param = {};
        }
        let userStr = JsBridge.getStorage('user');
        if (userStr) {
            let user = JSON.parse(userStr);
            param.uid = user.uid;
            param.app_env = '' + process.env.NODE_ENV;
            param.app_version = process.env.NODE_VERSION;
            param.app_model = navigator.userAgent;
        }

        //拦截器
        axios.interceptors.response.use((response) => {
            let result = response.data;
            return result;
        }, (error) => {

        });

        let request;
        switch (config.method) {
            case 'get':
                config.params = param;
                request = axios.get(url, config)
                break;
            default:
                config.data = param;
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