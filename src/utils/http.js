/**
 * 网络请求配置
 */
import axios from 'axios';
import tokenUtil from './tokenUtil';
// request 拦截器
// 可以自请求发送前对请求做一些处理
axios.interceptors.request.use(
    (config) => {
        //接受JSON数据格式
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        // 设置请求头
        config.headers['token'] = tokenUtil.getToken();

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// use(两个参数)
axios.interceptors.response.use(
    (res) => {
        // 请求成功对响应数据做处理
        if (res.data.Code === 10006 || res.data.Code === 10007 || res.data.Code === 10008 || res.data.Code === 10010) {
            tokenUtil.removeToken();
        }
        // 该返回的数据则是axios.then(res)中接收的数据
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'http://127.0.0.1:9000/v1';

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params })
            .then((response) => {
                landing(url, params, response.data);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

// 统一接口处理，返回数据
export const ApiHttp = (fetch, url, param) =>
    new Promise((resolve, reject) => {
        switch (fetch) {
            case 'get':
                console.log('begin a get request,and url:', url, param);
                get(url, param)
                    .then((response) => resolve(response))
                    .catch((error) => {
                        console.log('get request GET failed.', error);
                        reject(error);
                    });
                break;
            case 'post':
                post(url, param)
                    .then((response) => resolve(response))
                    .catch((error) => {
                        console.log('get request POST failed.', error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    if (data.code === -1) {
        console.log(data);
    }
}
