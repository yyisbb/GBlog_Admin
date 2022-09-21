// ! 本模块主要是进行local数据存储
import store from 'store';
const TOKEN_KEY = 'token_key';

export default {
    // 保存token
    saveToken(token) {
        store.set(TOKEN_KEY, token);
    },

    // 读取token
    getToken() {
        return store.get(TOKEN_KEY) || '';
    },

    // 删除token
    removeToken() {
        store.remove(TOKEN_KEY);
    }
};
